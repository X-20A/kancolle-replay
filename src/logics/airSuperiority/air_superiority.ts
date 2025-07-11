import { AbyssalEquippedShip, EquippedShip } from "@/models/ship/equipped";
import { Equip, is_jet_bomber_equip, is_plane_equip, is_player_equip, PlayerPlaneEquip } from "@/models/equip/basic";
import { calc_plane_proficiency_flat } from "../proficiency";
import { AbyssalCombinedFleet, AbyssalSingleFleet, concat_fleet_ships, Fleet, is_combined_fleet, map_units_to_ships } from "@/models/fleet/Fleet";
import { AirStateType } from "./compare";
import { Rand } from "@/effects/random";
import { match } from "ts-pattern";
import { JetSquadron, Squadron } from "@/models/LBAS";
import { EquipSlot } from "@/models/ship/EquipBuilt";

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
    squadrons: Squadron[],
): number {
    return squadrons.reduce((total, squadron) => {
        return total + calc_equip_air_superiority_power(
            squadron.equip,
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
    equip_builts: EquipSlot[],
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
    return calc_equips_air_superiority_power(ship.equip_slots, ship.slot_counts);
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
export function calc_fleet_air_superiority_power(
    fleet: Fleet,
    calc_scope: 'main_only' | 'both_fleet'
): number {
    return match(calc_scope)
        .with('main_only', () => calc_ships_air_superiority_power(concat_fleet_ships(fleet)))
        .with('both_fleet', () => calc_ships_air_superiority_power(map_units_to_ships(fleet.main_fleet_units)))
        .exhaustive();
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
            .with('Supremacy', 'Superiority', 'Parity', () => ({
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
 * 制空状態による被撃墜数を反映した新しい航空隊を返す
 * @param squadrons 
 * @param air_state 
 * @param rand 
 * @returns 
 */
export function calc_air_state_shootdowned_lbas<T extends Squadron[] | JetSquadron[]>(
    squadrons: T,
    air_state: AirStateType,
    rand: Rand,
): T {
    return squadrons.map(squadron => {
        const new_slot_count = calc_own_air_state_shootdowned_slots(
            squadron.equip,
            squadron.slot_count,
            air_state,
            rand,
        );

        return {
            ...squadron,
            slot_count: new_slot_count,
        }
    }) as T;
}

/**
 * 制空による被撃墜を反映した新しい敵艦を返す
 * @param ship 
 * @param air_state 
 * @param rand 
 * @returns 
 */
const calc_air_state_shootdowned_enemy_ships = (
    ship: AbyssalEquippedShip,
    air_state: AirStateType,
    rand: Rand,
): AbyssalEquippedShip => {
    const new_equip_slots = ship.equip_slots.map(equip_slot => {
        const equip = equip_slot.equip;
        if (!equip || !is_plane_equip(equip)) return equip_slot;

        const new_slot_count = calc_enemy_air_state_shootdowned_slots(
            equip_slot.slot_count,
            air_state,
            rand,
        );

        return {
            ...equip_slot,
            slot_count: new_slot_count,
        }
    });

    return {
        ...ship,
        equip_slots: new_equip_slots,
    }
}

/**
 * 制空状態による被撃墜数を反映した新しい敵通常艦隊を返す
 * @param fleet 
 * @param air_state 
 * @param rand 
 * @returns 
 */
export function calc_air_state_shootdowned_enemy_fleet<T extends AbyssalSingleFleet | AbyssalCombinedFleet>(
    fleet: T,
    air_state: AirStateType,
    rand: Rand,
): T {
    const new_main_fleet_units = fleet.main_fleet_units.map(unit => {
        const new_ship =
            calc_air_state_shootdowned_enemy_ships(unit.ship, air_state, rand);

        return {
            ...unit,
            ship: new_ship,
        }
    });

    if (!is_combined_fleet(fleet)) return {
        ...fleet,
        main_fleet_units: new_main_fleet_units,
    };

    const new_escort_fleet_units = fleet.escort_fleet_units.map(unit => {
        const new_ship =
            calc_air_state_shootdowned_enemy_ships(unit.ship, air_state, rand);

        return {
            ...unit,
            ship: new_ship,
        }
    });

    return {
        ...fleet,
        main_fleet_units: new_main_fleet_units,
        escort_fleet_units: new_escort_fleet_units,
    };
}