import { is_plane_equip, is_player_equip } from "@/models/equip/basic";
import { concat_fleet_ships, Fleet } from "@/models/fleet/Fleet";
import { EquippedShip, is_sunk } from "@/models/ship/equipped";
import { calc_plane_proficiency_detection_flat } from "./proficiency";
import { brandDetectionPower, brandReconPower, DetectionPower, EnemyFleet, OwnFleet, ReconPower } from "@/types/brands/fleet";
import { Rand } from "@/effects/random";

/// 索敵系

/**
 * 空母系であるか判定して返す
 * @param ship 
 * @returns 
 */
const is_CVs = (ship: EquippedShip): boolean => {
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
    if (ships_length >=  6) return 4;
    if (ships_length === 5) return 3;
    if (ships_length === 4) return 2;
    if (ships_length === 3) return 1;
    return 0; // <= 2
}

const calc_mod_carrier = (CVs_count: number): number => {
    return CVs_count === 0
        ? 0
        : 10 * (CVs_count - 1) + 30;
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
    participate_plane_count: number;
    /** 航空機熟練度ボーナス */
    proficiency_flat: number;
};

type EquipSummary = {
    /** 索敵に参加する機体の索敵値 */
    total_plane_los: number,
    /** 索敵に参加する機体の数 */
    participate_plane_count: number,
    /** 航空機熟練度ボーナス */
    proficiency_flat: number,
}

export type FleetDetectionStatus = {
    recon_power: ReconPower,
    detection_power: DetectionPower,
}

/**
 * 艦群の索敵能力評価してを返す
 * @param fleet 
 * @returns 
 */
export const analyze_ships_detection = (
    ships: EquippedShip[],
): FleetDetectionStatus => {
    const ship_summary: ShipSummary = ships.reduce((ship_total, ship, index) => {
        if (is_sunk(ship)) return ship_total;

        const equip_summary: EquipSummary = ship.equip_builts.reduce((equip_total, equip_built) => {
            const equip = equip_built.equip;
            if (
                !equip
                || !is_player_equip(equip)
                || !is_plane_equip(equip)
                || !equip.flags.can_detect
            ) return equip_total;

            // NOTE: 索敵機は残機0でも有効
            const total_plane_los = equip_total.total_plane_los
                + equip.natural_addition.los
                + equip.improvement_addition.los; // 装備ボーナス未考慮 入ってそうではあるが、どうしよっかな

            const participate_plane_count = equip_total.participate_plane_count + 1;

            const proficiency_flat =
                equip_total.proficiency_flat
                + calc_plane_proficiency_detection_flat(equip);

            return {
                total_plane_los,
                participate_plane_count,
                proficiency_flat,
            }
        }, {
            total_plane_los: 0,
            participate_plane_count: 0,
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
            participate_plane_count: equip_summary.participate_plane_count,
            proficiency_flat: equip_summary.proficiency_flat,
        }
    }, {
        position_value: 0,
        CVs_count: 0,
        participate_plane_count: 0,
        proficiency_flat: 0,
    });

    const CVs_count = ship_summary.CVs_count;
    const mod_carrier = calc_mod_carrier(CVs_count);

    const mod_ship_count = calc_mod_ship_count(ships.length);

    const recon_power =
        ship_summary.participate_plane_count
        + ship_summary.proficiency_flat
        + mod_carrier;

    const detection_power =
        ship_summary.position_value
        + mod_ship_count
        - 20
        + Math.trunc(Math.sqrt(10 * recon_power));

    return {
        recon_power: brandReconPower(recon_power),
        detection_power: brandDetectionPower(detection_power),
    }
}

const sum_fleet_detection_status = (
    a: FleetDetectionStatus,
    b: FleetDetectionStatus,
): FleetDetectionStatus => {
    return {
        recon_power: brandReconPower(a.recon_power + b.recon_power),
        detection_power: brandDetectionPower(a.detection_power + b.detection_power),
    }
}

/**
 * 艦隊の索敵能力評価してを返す    
 * NOTE: 索敵 成功/失敗 による命中・回避への補正に有意差は確認されていない    
 * NOTE: しかし、失敗時は自艦隊が航空戦に参加できない仕様があるので判定は必要    
 * @param fleet 
 * @returns 
 */
export const analyze_fleet_detection = (fleet: Fleet): FleetDetectionStatus => {
    return sum_fleet_detection_status(
        analyze_ships_detection(fleet.main_fleet_ships),
        analyze_ships_detection(fleet.is_combined ? fleet.escort_fleet_ships : []),
    );
}

/**
 * 索敵成功率を返す    
 * https://en.kancollewiki.net/Combat/Day_Battle#Detection
 * @param fleet 
 * @returns 
 */
export function calc_detection_success_rate(detection_power: DetectionPower): number {
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
 * 索敵フェイズにおける索敵機の被撃墜を反映した EquippedShip[] を返す
 * @param recon_power 
 * @param rand 
 */
const calc_shotdowned_recon_ships = (
    recon_power: ReconPower,
    ships: EquippedShip[],
    total_enemy_fighter_count: number,
    rand: Rand,
): EquippedShip[] => {
    return ships.map((ship) => {
        if (is_sunk(ship)) return ship;

        const updated_slots = ship.slot_counts.map((slot, index) => {
            const equip = ship.equip_builts[index].equip;
            if (
                !equip
                || !is_player_equip(equip)
                || !equip.flags.can_detect
                || slot > 0
            ) return slot;

            const rand_val = rand.next() * 0.4 + 1.0; // [1.0, 1.4)
            const shotdown_val =
                recon_power - Math.floor(def_fighter(total_enemy_fighter_count) * rand_val);

            if (shotdown_val <= 0) {
                const loss = Math.floor(rand.next() * 3); // 0~2
                return Math.max(slot - loss, 0);
            }

            return slot;
        });

        return { ...ship, slot_counts: updated_slots };
    });
}

/**
 * 敵艦隊の制空に関与する航空機の数を返す
 * @param enemy_fleet 
 * @returns 
 */
export function calc_enemy_fighter_count(
    enemy_fleet: EnemyFleet,
): number {
    return concat_fleet_ships(enemy_fleet).reduce((total, ship) => {
        // NOTE: 索敵フェイズ前に敵艦が沈むことは無いので判定省略
        return total + ship.equip_builts.reduce((count, equip_built) => {
            const equip = equip_built.equip;
            if (!equip || !is_player_equip(equip)) return count;

            return count + (equip.flags.is_involve_air_superiority ? 1 : 0);
        }, 0);
    }, 0);
}

/**
 * 索敵フェイズにおける索敵機の被撃墜を反映した Fleet を返す
 * @param recon_power 
 * @param rand 
 */
export function calc_shotdowned_recon_fleet(
    own_fleet: OwnFleet,
    recon_power: ReconPower,
    total_enemy_fighter_count: number,
    rand: Rand,
): OwnFleet {
    // 味方艦隊の ship ごとに撃墜処理を実施
    // ? 随伴艦隊も索敵機を飛ばすとして
    const updated_main_fleet_ships = calc_shotdowned_recon_ships(
        recon_power,
        own_fleet.main_fleet_ships,
        total_enemy_fighter_count,
        rand,
    );

    if (!own_fleet.is_combined) return {
        ...own_fleet,
        main_fleet_ships: updated_main_fleet_ships,
    };

    const updated_escort_fleet_ships = calc_shotdowned_recon_ships(
        recon_power,
        own_fleet.escort_fleet_ships,
        total_enemy_fighter_count,
        rand,
    );

    return {
        ...own_fleet,
        main_fleet_ships: updated_main_fleet_ships,
        escort_fleet_ships: updated_escort_fleet_ships,
    }
}