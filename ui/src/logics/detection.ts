import { is_plane_equip } from "@/models/equip/Equip";
import { Fleet } from "@/models/fleet/Fleet";
import { EquippedPlayerShip } from "@/models/ship/equipped/base";
import { calc_plane_proficiency_detection_flat } from "./proficiency";
import { SeedableRand } from "@/effects/random";

/// 索敵系

/**
 * 空母系であるか判定して返す
 * @param ship 
 * @returns 
 */
const is_CVs = (ship: EquippedPlayerShip): boolean => {
    return [
        'CV',
        'CVB',
        'CVB',
    ].includes(ship.type_id);
}

/**
 * 艦の配置に応じた補正値を返す
 * @param ship_index 
 * @returns 
 */
const calc_mod_order = (ship_index: number): number => {
    if (ship_index === 0) return 2;
    if (ship_index === 1) return 5;
    return 8; // index >= 3
}

/**
 * 隻数に応じた補正値を返す
 * @param ships_length 
 * @returns 
 */
const calc_mod_ship_count = (ships_length: number): number => {
    if (ships_length >= 6) return 4;
    if (ships_length === 5) return 3;
    if (ships_length === 4) return 2;
    if (ships_length === 3) return 1;
    return 0; // <= 2
}

const calc_mod_carrier = (CVs_count: number): number => {
    return (
        20 * (CVs_count - 1)
        + 30 * (CVs_count >= 1 ? 1 : 0)
    );
}

type ShipSummary = {
    /**
     * 艦の配置を考慮した加算値    
     * (LoS ship + LoS Equipment) / Mod order
     */
    position_value: number;
    /** 艦隊内の空母系の数に応じた加算値 */
    CVs_count: number;
    /** 索敵に参加する機体の数 */
    participating_plane_count: number;
    /** 航空機熟練度ボーナス */
    proficiency_flat: number;
};

type EquipSummary = {
    /** 索敵に参加する機体の索敵値 */
    total_plane_los: number,
    /** 索敵に参加する機体の数 */
    participating_plane_count: number,
    /** 航空機熟練度ボーナス */
    proficiency_flat: number,
}

type FleetDetection = {
    recon_power: number,
    detection_power: number,
}

/**
 * 艦隊の recon_power と detection_power を返す    
 * NOTE: SRP的にはグレーなのでなんとかしたくはある
 * @param fleet 
 * @returns 
 */
const analyze_fleet_detection = (fleet: Fleet): FleetDetection => {
    const ships = fleet.ships;
    const ship_summary: ShipSummary = ships.reduce((ship_total, ship, index) => {
        const equip_summary: EquipSummary = ship.equips.reduce((equip_total, equip) => {
            if (!is_plane_equip(equip) || !equip.flags.can_detect) return equip_total;

            const total_plane_los = equip_total.total_plane_los
                + equip.natural_addition.los
                + equip.improvement_addition.los; // 装備ボーナス未考慮 入ってそうではあるが、どうしよっかな

            const participating_plane_count = equip_total.participating_plane_count + 1;

            const proficiency_flat =
                equip_total.proficiency_flat
                + calc_plane_proficiency_detection_flat(equip);

            return {
                total_plane_los,
                participating_plane_count,
                proficiency_flat,
            }
        }, {
            total_plane_los: 0,
            participating_plane_count: 0,
            proficiency_flat: 0,
        });

        const mod_order = calc_mod_order(index);

        const position_value =
            ship_total.position_value
            + (ship.naked_status.los + equip_summary.total_plane_los) / mod_order;

        const CVs_count = ship_total.CVs_count + (is_CVs(ship) ? 1 : 0);

        return {
            position_value,
            CVs_count,
            participating_plane_count: equip_summary.participating_plane_count,
            proficiency_flat: equip_summary.proficiency_flat,
        }
    }, {
        position_value: 0,
        CVs_count: 0,
        participating_plane_count: 0,
        proficiency_flat: 0,
    });

    const CVs_count = ship_summary.CVs_count;
    const mod_carrier = calc_mod_carrier(CVs_count);

    const mod_ship_count = calc_mod_ship_count(ships.length);

    const recon_power =
        ship_summary.participating_plane_count
        + ship_summary.proficiency_flat
        + mod_carrier;

    const detection_power =
        ship_summary.position_value
        + mod_ship_count
        - 20
        + Math.trunc(Math.floor(10 * recon_power));

    return {
        recon_power,
        detection_power,
    }
}

/**
 * 索敵成功率を返す    
 * https://en.kancollewiki.net/Combat/Day_Battle#Detection
 * @param fleet 
 * @returns 
 */
export function calc_detection_success_rate(detection_power: number): number {
    return (detection_power + 1) / 20;
}

// 敵制空機数を基に Def_fighter を計算
const def_fighter = (enemy_fighter_count: number) => {
    const x = enemy_fighter_count;
    if (x <= 0) return 0;
    if (x <= 30) return 1 + x / 9;
    if (x <= 120) return 2 + x / 20;
    return 6 + (x - 120) / 40;
};

/**
 * 索敵フェイズにおける、索敵機の被撃墜数を返す
 * @param recon_power 
 * @param rand 
 */
export function calc_shotdowned_recon_fleet(
    our_fleet: Fleet,
    enemy_fleet: Fleet,
    recon_power: number,
    rand: SeedableRand,
): Fleet {
    const enemy_fighter_count = enemy_fleet.ships.reduce((total, ship) => {
        return total + ship.equips.reduce((count, equip) => {
            return count + (equip.flags.is_involve_air_superiority ? 1 : 0);
        }, 0);
    }, 0);

    // 味方艦隊の ship ごとに撃墜処理を実施
    const updated_ships = our_fleet.ships.map((ship) => {
        const updated_slots = ship.slots.map((slot, i) => {
            const equip = ship.equips[i];
            if (!equip.flags.can_detect || slot > 0) return slot;

            const rand_val = rand.next() * 0.4 + 1.0; // [1.0, 1.4)
            const shotdown_val = recon_power - Math.floor(def_fighter(enemy_fighter_count) * rand_val);

            if (shotdown_val <= 0) {
                const loss = Math.floor(rand.next() * 3); // 0~2
                return Math.max(slot - loss, 0);
            }

            return slot;
        });

        return { ...ship, slots: updated_slots };
    });

    return {
        ...our_fleet,
        ships: updated_ships,
    };
}