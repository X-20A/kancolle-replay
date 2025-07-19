import { CombinedFleetFormationType, FormationType, is_combined_fleet_formation, is_single_fleet_formation, SingleFleetFormationType } from "@/types"
import { EquippedShip, is_abyssal_ships, is_player_ship, is_player_ships, is_sunk } from "../ship/equipped"
import { AbyssalFleetUnit, derive_fleet_units, FleetUnit, PlayerFleetUnit } from "./FleetUnit"

export type SingleFleetType =
    | 'Normal'
    | 'Striking_Force_Fleet'
    

export type CombinedFleetType =
    | 'Carrier_Task_Force'
    | 'Surface_Task_Force'
    | 'Transport_Escort_Force'

export type FleetType = SingleFleetType | CombinedFleetType

type FleetBase = {
    readonly unused_smoke: boolean,
}

type SingleFleetBase = FleetBase & {
    readonly formation: SingleFleetFormationType,
    readonly fleet_type: SingleFleetType,
}

export type PlayerSingleFleet = SingleFleetBase & {
    readonly main_fleet_units: PlayerFleetUnit[],
}

export type AbyssalSingleFleet = SingleFleetBase & {
    readonly main_fleet_units: AbyssalFleetUnit[],
}

export type SingleFleet = PlayerSingleFleet | AbyssalSingleFleet

type CombinedFleetBase = FleetBase & {
    readonly formation: CombinedFleetFormationType,
    readonly fleet_type: CombinedFleetType,
}

export type PlayerCombinedFleet = CombinedFleetBase & {
    readonly main_fleet_units: PlayerFleetUnit[],
    readonly escort_fleet_units: PlayerFleetUnit[],
}

export type AbyssalCombinedFleet = CombinedFleetBase & {
    readonly main_fleet_units: AbyssalFleetUnit[],
    readonly escort_fleet_units: AbyssalFleetUnit[],
}

export type CombinedFleet = PlayerCombinedFleet | AbyssalCombinedFleet

export type PlayerFleet = PlayerSingleFleet | PlayerCombinedFleet

export type AbyssalFleet = AbyssalSingleFleet | AbyssalCombinedFleet

export type Fleet = SingleFleet | CombinedFleet;

export function is_player_fleet(
    fleet: Fleet,
): fleet is PlayerFleet {
    return is_player_ship(fleet.main_fleet_units[0].ship);
}

/**
 * 主力艦隊と随伴艦隊の艦ユニットを連結した配列を返す    
 * 通常艦隊 | 連合艦隊 は考えずに呼んでよし
 * @param fleet 
 * @returns 
 */
export function concat_fleet_units(
    fleet: Fleet,
): FleetUnit[] {
    return is_combined_fleet(fleet)
        ? fleet.main_fleet_units.concat(fleet.escort_fleet_units)
        : fleet.main_fleet_units;
}

/**
 * 主力艦隊と随伴艦隊の艦を連結した配列を返す    
 * 通常艦隊 | 連合艦隊 は考えずに呼んでよし
 * @param fleet 
 * @returns 
 */
export function concat_fleet_ships(
    fleet: Fleet,
): EquippedShip[] {
    const units = concat_fleet_units(fleet);

    return map_units_to_ships(units);
}

/**
 * FleetUnit[]をEquippedShip[]に変換して返す
 * @param fleet_units 
 * @returns 
 */
export function map_units_to_ships(
    fleet_units: FleetUnit[],
): EquippedShip[] {
    return fleet_units.map(unit => unit.ship);
}

/**
 * 艦隊が連合艦隊であるか判定して返す(型ガード)
 * @param fleet 
 * @returns 
 */
export function is_combined_fleet(fleet: Fleet): fleet is CombinedFleet {
    return 'escort_fleet_units' in fleet;
}

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
 * 全ての艦が撃沈されているか判定して返す
 * @param fleet 
 * @returns 
 */
export function is_all_sunk(
    fleet: Fleet,
): boolean {
    return concat_fleet_ships(fleet).every(is_sunk);
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
            main_fleet_units: derive_fleet_units(main_fleet_ships, 'main'),
            escort_fleet_units: derive_fleet_units(main_fleet_ships, 'escort'),
            fleet_type: 'Surface_Task_Force',
            unused_smoke: true,
            formation: 'CruisingFormation_4',
        };
    } else {
        return {
            main_fleet_units: derive_fleet_units(main_fleet_ships, 'single'),
            fleet_type: 'Normal',
            unused_smoke: true,
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
            main_fleet_units: derive_fleet_units(main_fleet_ships, 'main'),
            escort_fleet_units: derive_fleet_units(main_fleet_ships, 'escort'),
            fleet_type: 'Surface_Task_Force',
            unused_smoke: true,
            formation: 'CruisingFormation_4',
        };
    } else {
        return {
            main_fleet_units: derive_fleet_units(main_fleet_ships, 'single'),
            unused_smoke: true,
            fleet_type: 'Normal',
            formation: 'LineAhead',
        };
    }
}