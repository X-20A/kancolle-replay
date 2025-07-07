import { AbyssalEquippedShip, PlayerEquippedShip } from "../ship/equipped"

type AffiliationFleetType =
    | 'single'
    | 'main'
    | 'escort'

type FleetUnitBase = {
    fleet_type: AffiliationFleetType,
    original_index: number,
}

export type PlayerFleetUnit = FleetUnitBase & {
    ship: PlayerEquippedShip,
}

export type AbyssalFleetUnit = FleetUnitBase & {
    ship: AbyssalEquippedShip,
}

/**
 * 艦と、艦の艦隊内での諸元
 */
export type FleetUnit = PlayerFleetUnit | AbyssalFleetUnit

/**
 * 艦が旗艦であるか判定して返す(含 随伴艦隊旗艦)
 * @param unit 
 * @returns 
 */
export function is_flag_ship(unit: FleetUnit): boolean {
    return unit.original_index === 0;
}

/**
 * 艦が旗艦であるか判定して返す(随伴艦隊旗艦 は含まない)
 * @param unit 
 * @returns 
 */
export function is_primary_flag_ship(unit: FleetUnit): boolean {
    return is_flag_ship(unit) && unit.fleet_type !== 'escort';
}

/**
 * 艦隊構成艦を生成して返す
 * @param ships 
 * @param fleet_type 
 * @returns 
 */
export function derive_fleet_units<T extends PlayerEquippedShip | AbyssalEquippedShip>(
    ships: T[],
    fleet_type: AffiliationFleetType,
): Array<{
    fleet_type: AffiliationFleetType,
    original_index: number,
    ship: T
}> {
    return ships.map((ship, index) => {
        return {
            fleet_type: fleet_type,
            original_index: index,
            ship: ship,
        };
    });
}