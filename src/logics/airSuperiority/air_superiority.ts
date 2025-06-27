import { EquippedShip } from "@/models/ship/equipped";
import { Equip, is_jet_bomber_equip, is_plane_equip, is_player_equip, PlayerPlaneEquip } from "@/models/equip/basic";
import { calc_plane_proficiency_flat } from "../proficiency";
import { concat_fleet_ships, Fleet } from "@/models/fleet/Fleet";
import { AirStateType } from "./compare";
import { Rand } from "@/effects/random";
import { match, P } from "ts-pattern";
import { EnemyCombinedFleet, EnemyFleet, EnemySingleFleet } from "@/types/brands/fleet";
import { JetSquadron } from "@/models/LBAS";
import { EquipBuilt } from "@/models/equip/EquipBuilt";

/// 制空系

/**
 * 装備と残スロット数から制空値を返す
 * @param equip 
 * @param remain_plane_count 
 * @returns 
 */
export function calc_equip_air_superiority_power(
    equip: Equip,
    remain_plane_count: number,
): number {
    if (is_player_equip(equip)) {
        const equip_air_superiority_power =
            equip.natural_addition.anti_air
            + equip.improvement_addition.air_superiority;

        return Math.floor(
            equip_air_superiority_power * Math.sqrt(remain_plane_count)
            + calc_plane_proficiency_flat(equip)
        );
    } else {
        return Math.floor(
            equip.natural_addition.anti_air * Math.sqrt(remain_plane_count)
        );
    }
}

export function calc_squadrons_air_superriority_power(
    squadrons: JetSquadron[],
): number {
    return squadrons.reduce((total, squadron) => {
        return total + calc_equip_air_superiority_power(
            squadron.unit,
            squadron.slot_count,
        );
    }, 0);
}

/**
 * 装備群の制空値を返す
 * @param equips 
 * @param slots 
 * @returns 
 */
export function calc_equips_air_superiority_power(
    equip_builts: EquipBuilt[],
    slots: readonly number[],
): number {
    return equip_builts.reduce((total, equip_built, index) => {
        const equip = equip_built.equip;
        if (
            !equip ||
            !equip.flags.is_involve_air_superiority ||
            slots[index] === 0
        ) return total;

        const remain_plane_count = slots[index];
        if (!remain_plane_count) return total;

        if (is_player_equip(equip)) {
            const equip_air_superiority_power =
                equip.natural_addition.anti_air
                + equip.improvement_addition.air_superiority;

            return total + Math.floor(
                equip_air_superiority_power * Math.sqrt(remain_plane_count)
                + calc_plane_proficiency_flat(equip)
            );
        } else {
            return total + Math.floor(
                equip.natural_addition.anti_air * Math.sqrt(remain_plane_count)
            );
        }
    }, 0);
}

/**
 * 艦の制空値を返す
 * @param ship 
 * @returns 
 */
export function calc_ship_air_superiority_power(ship: EquippedShip): number {
    return calc_equips_air_superiority_power(ship.equip_builts, ship.slot_counts);
}

/**
 * 艦群の制空値を返す
 * @param ships 
 * @returns 
 */
export function calc_ships_air_superiority_power(ships: EquippedShip[]): number {
    return ships.reduce((total, ship) => {
        return total + calc_ship_air_superiority_power(ship);
    }, 0);
}

/**
 * 艦隊の制空値を返す
 * @param fleet 
 */
export function calc_fleet_air_superiority_power(fleet: Fleet): number {
    return calc_ships_air_superiority_power(
        concat_fleet_ships(fleet),
    );
}

const AIR_STATE_CONSTANT: Record<AirStateType, number> = {
    Supremacy: 1,
    Superiority: 3,
    Parity: 5,
    Denial: 7,
    Incapability: 10,
};

type Ks = {
    K1: number,
    K2: number,
}

/**
 * 制空状態による被撃墜のカット率を返す
 * @param unit 
 * @param air_state 
 * @returns 
 */
const calc_Ks = (
    unit: PlayerPlaneEquip,
    air_state: AirStateType,
): Ks => {
    if (
        (unit.type_id === "ASW_PLANE" && !unit.flags.is_20th_family)
        || unit.type_id === "AUTOGYRO"
    ) {
        return match(air_state)
            .with(P.union('Supremacy', 'Superiority', 'Parity'), () => ({
                K1: 0.2,
                K2: 0.35,
            }))
            .with('Denial', () => ({
                K1: 0.5,
                K2: 0.5,
            }))
            .with('Incapability', () => ({
                K1: 0.85,
                K2: 0.95,
            }))
            .exhaustive();
    }

    if (is_jet_bomber_equip(unit)) return {
        K1: 0.6,
        K2: 0.6,
    }

    return {
        K1: 1,
        K2: 1,
    }
}

/**
 * 制空状態による我の被撃墜数を反映した新しいスロットを返す    
 * https://en.kancollewiki.net/Aerial_Combat#Stage_1_-_Battle_for_Air_Superiority
 * @param equips 
 * @param slots 
 * @param air_state 
 */
export function calc_own_air_state_shootdowned_slots(
    unit: PlayerPlaneEquip,
    slot_count: number,
    air_state: AirStateType,
    rand: Rand,
): number {
    const { K1, K2 } = calc_Ks(unit, air_state);
    const A1 = K1 * rand.next() * (AIR_STATE_CONSTANT[air_state] / 3);
    const A2 = K2 * AIR_STATE_CONSTANT[air_state] / 4
    
    const loss_count = Math.floor((slot_count * (A1 + A2)) / 10);

    return slot_count - loss_count;
}

const calc_B = (
    air_state: AirStateType,
    rand: Rand,
): number => {
    // 12: 0~11の乱数の生成に必要
    return Math.floor(rand.next() * (12 - AIR_STATE_CONSTANT[air_state]));
}

/**
 * 制空状態による敵側の被撃墜数を反映した新しいスロットを返す
 * @param slot_count 
 * @param air_state 
 * @param rand 
 * @returns 
 */
export function calc_enemy_air_state_shootdowned_slots(
    slot_count: number,
    air_state: AirStateType,
    rand: Rand,
): number {
    const B1 = calc_B(air_state, rand);
    const B2 = calc_B(air_state, rand);
    const loss_ratio = 0.035 * B1 + 0.065 * B2;

    const loss_count = Math.floor(slot_count * loss_ratio);
    return slot_count - loss_count;
}

/**
 * 制空状態による被撃墜数を反映した新しいLBASを返す
 * @param jet_only_squadrons 
 * @param air_state 
 * @param rand 
 * @returns 
 */
export function calc_air_state_shootdowned_lbas(
    jet_only_squadrons: JetSquadron[],
    air_state: AirStateType,
    rand: Rand,
): JetSquadron[] {
    return jet_only_squadrons.map(squadron => {
        const new_slot_count = calc_own_air_state_shootdowned_slots(
            squadron.unit,
            squadron.slot_count,
            air_state,
            rand,
        );

        return {
            ...squadron,
            slot_count: new_slot_count,
        }
    });
}

/**
 * 制空による被撃墜を反映した新しい敵艦隊を返す
 * @param ship 
 * @param air_state 
 * @param rand 
 * @returns 
 */
const calc_air_state_shootdowned_enemy_ships = (
    ship: EquippedShip,
    air_state: AirStateType,
    rand: Rand,
): EquippedShip => {
    const new_equip_builts = ship.equip_builts.map(equip_built => {
        const equip = equip_built.equip;
        if (!equip || !is_plane_equip(equip)) return equip_built;

        const new_slot_count = calc_enemy_air_state_shootdowned_slots(
            equip_built.slot_count,
            air_state,
            rand,
        );

        return {
            ...equip_built,
            slot_count: new_slot_count,
        }
    });

    return {
        ...ship,
        equip_builts: new_equip_builts,
    }
}

/**
 * 制空状態による被撃墜数を反映した新しい敵通常艦隊を返す
 * @param fleet 
 * @param air_state 
 * @param rand 
 * @returns 
 */
export function calc_air_state_shootdowned_enemy_single_fleet(
    fleet: EnemySingleFleet,
    air_state: AirStateType,
    rand: Rand,
): EnemySingleFleet {
    const new_main_fleet_ships = fleet.main_fleet_ships.map(ship => {
        return calc_air_state_shootdowned_enemy_ships(ship, air_state, rand);
    });

    return {
        ...fleet,
        main_fleet_ships: new_main_fleet_ships,
    }
}

/**
 * 制空状態による被撃墜数を反映した新しい敵連合艦隊を返す
 * @param fleet 
 * @param air_state 
 * @param rand 
 * @returns 
 */
export function calc_air_state_shootdowned_enemy_combined_fleet(
    fleet: EnemyCombinedFleet,
    air_state: AirStateType,
    rand: Rand,
): EnemyCombinedFleet {
    const new_main_fleet_ships = fleet.main_fleet_ships.map(ship => {
        return calc_air_state_shootdowned_enemy_ships(ship, air_state, rand);
    });

    const new_escort_fleet_ships = fleet.escort_fleet_ships.map(ship => {
        return calc_air_state_shootdowned_enemy_ships(ship, air_state, rand);
    });

    return {
        ...fleet,
        main_fleet_ships: new_main_fleet_ships,
        escort_fleet_ships: new_escort_fleet_ships,
    }
}