import { SpecialAttackType } from "@/logics/SpecialAttack"
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
    triggered_special_attack: SpecialAttackType | 'None',
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
 * プレイヤー艦隊構成艦を生成して返す
 * @param ships 
 * @param affiliation_type 
 * @returns 
 */
export function derive_player_fleet_units(
    ships: PlayerEquippedShip[],
    affiliation_type: AffiliationFleetType,
): PlayerFleetUnit[] {
    const units: PlayerFleetUnit[] = ships.flatMap((ship, index) => {
        const unit: PlayerFleetUnit = {
            affiliation_type,
            original_index: index,
            ship: ship,
            triggered_special_attack: 'None',
        };

        return unit;
    });

    return units;
}

/**
 * 深海艦隊構成艦を生成して返す
 * @param ships 
 * @param affiliation_type 
 * @returns 
 */
export function derive_abyssal_fleet_units(
    ships: AbyssalEquippedShip[],
    affiliation_type: AffiliationFleetType,
): AbyssalFleetUnit[] {
    const units: AbyssalFleetUnit[] = ships.flatMap((ship, index) => {
        const unit: AbyssalFleetUnit = {
            affiliation_type,
            original_index: index,
            ship: ship,
        };

        return unit;
    });

    return units;
}

export function is_player_fleet_unit(
    fleet_unit: FleetUnit,
): fleet_unit is PlayerFleetUnit {
    return 'triggered_special_attack' in fleet_unit;
}

/**
 * 所属艦隊が主力艦隊(含通常艦隊)であるは判定して返す
 * @param fleet_unit 
 * @returns 
 */
export function is_affiliation_fleet_main(
    fleet_unit: FleetUnit,
): boolean {
    return fleet_unit.affiliation_type !== 'escort';
}