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

export type FleetUnit = PlayerFleetUnit | AbyssalFleetUnit

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