import { AbyssalEquippedShip, PlayerEquippedShip } from "../ship/equipped"

export type AffiliationFleetType =
    | 'single'
    | 'main'
    | 'escort'

type FleetUnitBase = {
    affiliation_type: AffiliationFleetType,
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
    return is_flag_ship(unit) && unit.affiliation_type !== 'escort';
}

export function is_combined_fleet(fleet_unit: FleetUnit): boolean {
    return fleet_unit.affiliation_type !== 'single';
}

/**
 * 艦隊構成艦を生成して返す
 * @param ships 
 * @param affiliation_type 
 * @returns 
 */
export function derive_fleet_units<T extends PlayerEquippedShip | AbyssalEquippedShip>(
    ships: T[],
    affiliation_type: AffiliationFleetType,
): Array<{
    affiliation_type: AffiliationFleetType,
    original_index: number,
    ship: T
}> {
    return ships.map((ship, index) => {
        return {
            affiliation_type,
            original_index: index,
            ship: ship,
        };
    });
}