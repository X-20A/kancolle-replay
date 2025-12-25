import { CombinedFleetFormationType, FormationType, is_combined_fleet_formation, is_single_fleet_formation, SingleFleetFormationType } from "@/types"
import { AbyssalEquippedShip, EquippedShip, is_abyssal_ships, is_player_equipped_ship, is_player_ships, PlayerEquippedShip } from "../ship/equipped"
import { AbyssalFleetUnit, derive_abyssal_fleet_units, derive_player_fleet_units, FleetUnit, is_player_fleet_units, PlayerFleetUnit } from "./FleetUnit"
import { DayOrNight } from "@/types/battle";
import { get_first_or_throw } from "@/utils/array";

const SINGLE_FLEET_TYPE = {
    Normal: 1,
    Striking_Force_Fleet: 2,
};
export type SingleFleetType = keyof typeof SINGLE_FLEET_TYPE

export const COMBINED_FLEET_TYPES = {
    Carrier_Task_Force: 11,
    Surface_Task_Force: 12,
    Transport_Escort_Force: 13,
}
export type CombinedFleetType = keyof typeof COMBINED_FLEET_TYPES

export type FleetType = SingleFleetType | CombinedFleetType

type FleetBase = {
    readonly unused_smoke: boolean,
    readonly main_fleet_units: FleetUnit[],
}

type SingleFleetBase = FleetBase & {
    readonly formation: SingleFleetFormationType,
    readonly fleet_type: SingleFleetType,
}

export type PlayerSingleFleet =
    Omit<FleetBase, 'main_fleet_units'> &
    SingleFleetBase & {
        readonly main_fleet_units: PlayerFleetUnit[];
        readonly is_activated_special_attack: boolean;
        readonly Kongou_special_activated_count: number;
    }

export type AbyssalSingleFleet =
    Omit<FleetBase, 'main_fleet_units'> &
    SingleFleetBase & {
        readonly main_fleet_units: AbyssalFleetUnit[];
    }

export type SingleFleet = PlayerSingleFleet | AbyssalSingleFleet

type CombinedFleetBase = FleetBase & {
    readonly formation: CombinedFleetFormationType,
    readonly fleet_type: CombinedFleetType,
}

export type PlayerCombinedFleet = CombinedFleetBase & {
    readonly main_fleet_units: PlayerFleetUnit[],
    readonly escort_fleet_units: PlayerFleetUnit[],
    readonly is_activated_special_attack: boolean,
    readonly Kongou_special_activated_count: number,
}

export type AbyssalCombinedFleet = CombinedFleetBase & {
    readonly main_fleet_units: AbyssalFleetUnit[],
    readonly escort_fleet_units: AbyssalFleetUnit[],
}

export type CombinedFleet = PlayerCombinedFleet | AbyssalCombinedFleet

export type PlayerFleet = PlayerSingleFleet | PlayerCombinedFleet

export type AbyssalFleet = AbyssalSingleFleet | AbyssalCombinedFleet

export type Fleet = SingleFleet | CombinedFleet

export function is_player_fleet(
    fleet: Fleet,
): fleet is PlayerFleet {
    return 'is_activated_special_attack' in fleet;
}

/**
 * 主力艦隊と随伴艦隊の艦ユニットを連結した配列を返す    
 * 通常艦隊 | 連合艦隊 は考えずに呼んでよし
 * @param fleet 
 * @returns 
 */
export function concat_fleet_units<T extends FleetUnit>(
    fleet: Fleet,
): T[] {
    return concat_fleet_units(fleet);
}

/**
 * 主力艦隊と随伴艦隊の艦を連結した配列を返す    
 * 通常艦隊 | 連合艦隊 は考えずに呼んでよし
 * @param fleet 
 * @returns 
 */
export function concat_fleet_ships<T extends Fleet>(
    fleet: T
): T extends PlayerFleet ? PlayerEquippedShip[] : AbyssalEquippedShip[] {
    const units = concat_fleet_units(fleet);
    const ships = map_units_to_ships(units);

    if (is_player_fleet(fleet)) {
        return ships as T extends PlayerFleet ? PlayerEquippedShip[] : AbyssalEquippedShip[];
    } else {
        return ships as T extends PlayerFleet ? PlayerEquippedShip[] : AbyssalEquippedShip[];
    }
}

/**
 * FleetUnit[]をEquippedShip[]に変換して返す
 * @param fleet_units 
 * @returns 
 */
export function map_units_to_ships<T extends FleetUnit>(
    fleet_units: T[],
): T extends PlayerFleetUnit ? PlayerEquippedShip[] : AbyssalEquippedShip[] {
    const ships = fleet_units.map(unit => unit.ship);

    if (is_player_fleet_units(fleet_units)) {
        return ships as T extends PlayerFleetUnit ? PlayerEquippedShip[] : AbyssalEquippedShip[];
    } else {
        return ships as T extends PlayerFleetUnit ? PlayerEquippedShip[] : AbyssalEquippedShip[];
    }
}


/**
 * 艦隊が連合艦隊であるか判定して返す(型ガード)
 * @param fleet 
 * @returns 
 */
export function is_combined_fleet(fleet: Fleet): fleet is CombinedFleet {
    return 'escort_fleet_units' in fleet;
}

/**
 * 艦隊が空母機動部隊であるか判定して返す
 * @param fleet 
 * @returns 
 */
export function is_fleet_CTF(fleet: Fleet): boolean {
    return fleet.fleet_type === 'Carrier_Task_Force';
}
/**
 * 艦隊が水上打撃部隊であるか判定して返す
 * @param fleet 
 * @returns 
 */
export function is_fleet_STF(fleet: Fleet): boolean {
    return fleet.fleet_type === 'Surface_Task_Force';
}
/**
 * 艦隊が輸送護衛部隊であるか判定して返す
 * @param fleet 
 * @returns 
 */
export function is_fleet_TEF(fleet: Fleet): boolean {
    return fleet.fleet_type === 'Transport_Escort_Force';
}

export function is_already_special_attack_activated(
    fleet: PlayerFleet,
): boolean {
    return fleet.is_activated_special_attack;
}

/**
 * 艦隊の陣形を更新して返す
 * @param fleet 
 * @param formation 
 * @returns 
 */
export function calc_formation_updated_fleet<T extends Fleet>(
    fleet: T,
    formation: FormationType,
): T {
    if (is_combined_fleet(fleet)) {
        if (!is_combined_fleet_formation(formation)) throw new Error('連合艦隊に通常艦隊の陣形は設定できません');
    
        return {
            ...fleet,
            formation: formation,
        };
    }
    if (!is_single_fleet_formation(formation)) throw new Error('通常艦隊に連合艦隊の陣形は設定できません');

    return {
        ...fleet,
        formation,
    };
}

/**
 * プレイヤー艦隊を生成して返す
 * @param main_fleet_ships 
 * @param escort_fleet_ships 
 * @returns 
 */
export function derive_player_fleet(
    main_fleet_ships: EquippedShip[],
    escort_fleet_ships?: EquippedShip[],
): PlayerFleet {
    if (!is_player_ships(main_fleet_ships)) throw new Error('自艦隊に深海棲艦が含まれています');
    const is_combined =
        escort_fleet_ships !== undefined && escort_fleet_ships.length >= 1;

    if (is_combined) {
        if (!is_player_ships(escort_fleet_ships)) throw new Error('自艦隊に深海棲艦が含まれています');
        return {
            main_fleet_units: derive_player_fleet_units(main_fleet_ships, 'main') as [PlayerFleetUnit, ...PlayerFleetUnit[]],
            escort_fleet_units: derive_player_fleet_units(escort_fleet_ships, 'escort') as [PlayerFleetUnit, ...PlayerFleetUnit[]],
            fleet_type: 'Surface_Task_Force',
            unused_smoke: true,
            is_activated_special_attack: false,
            Kongou_special_activated_count: 0,
            formation: 'CruisingFormation_4',
        };
    } else {
        return {
            main_fleet_units: derive_player_fleet_units(main_fleet_ships, 'single') as [PlayerFleetUnit, ...PlayerFleetUnit[]],
            fleet_type: 'Normal',
            unused_smoke: true,
            is_activated_special_attack: false,
            Kongou_special_activated_count: 0,
            formation: 'LineAhead',
        };
    }
}

/**
 * 深海艦隊を生成して返す
 * @param main_fleet_ships 
 * @param escort_fleet_ships 
 * @returns 
 */
export function derive_abyssal_fleet(
    main_fleet_ships: EquippedShip[],
    escort_fleet_ships?: EquippedShip[],
): AbyssalFleet {
    if (!is_abyssal_ships(main_fleet_ships)) throw new Error('深海艦隊に艦娘が含まれています');
    const is_combined =
        escort_fleet_ships !== undefined && escort_fleet_ships.length >= 1;

    if (is_combined) {
        if (!is_abyssal_ships(escort_fleet_ships)) throw new Error('深海艦隊に艦娘が含まれています');
        return {
            main_fleet_units: derive_abyssal_fleet_units(main_fleet_ships, 'main') as [AbyssalFleetUnit, ...AbyssalFleetUnit[]],
            escort_fleet_units: derive_abyssal_fleet_units(escort_fleet_ships, 'escort') as [AbyssalFleetUnit, ...AbyssalFleetUnit[]],
            fleet_type: 'Surface_Task_Force',
            unused_smoke: true,
            formation: 'CruisingFormation_4',
        };
    } else {
        return {
            main_fleet_units: derive_abyssal_fleet_units(main_fleet_ships, 'single') as [AbyssalFleetUnit, ...AbyssalFleetUnit[]],
            unused_smoke: true,
            fleet_type: 'Normal',
            formation: 'LineAhead',
        };
    }
}

export function extract_flagship(
    fleet: PlayerFleet,
    phase_type: DayOrNight,
): PlayerFleetUnit {
    if (
        is_combined_fleet(fleet) &&
        phase_type === 'Night'
    ) return get_first_or_throw(fleet.escort_fleet_units);

    return get_first_or_throw(fleet.main_fleet_units);
}