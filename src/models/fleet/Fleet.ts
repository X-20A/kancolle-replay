import { CombinedFleetFormationType, SingleFleetFormationType } from "@/types"
import { AbyssalEquippedShip, EquippedShip, is_abyssal_ships, is_player_ships, is_sunk, PlayerEquippedShip } from "../ship/equipped"

type FleetBase = {
    readonly is_combined: boolean,
    readonly unused_smoke: boolean,
}

type SingleFleetBase = FleetBase & {
    readonly formation: SingleFleetFormationType,
}

export type PlayerSingleFleet = SingleFleetBase & {
    readonly main_fleet_ships: PlayerEquippedShip[],
}

export type AbyssalSingleFleet = SingleFleetBase & {
    readonly main_fleet_ships: AbyssalEquippedShip[],
}

export type SingleFleet = PlayerSingleFleet | AbyssalSingleFleet

type CombinedFleetBase = FleetBase & {
    readonly formation: CombinedFleetFormationType,
}

export type PlayerCombinedFleet = CombinedFleetBase & {
    readonly main_fleet_ships: PlayerEquippedShip[],
    readonly escort_fleet_ships: PlayerEquippedShip[],
}

export type AbyssalCombinedFleet = CombinedFleetBase & {
    readonly main_fleet_ships: AbyssalEquippedShip[],
    readonly escort_fleet_ships: AbyssalEquippedShip[],
}

export type CombinedFleet = PlayerCombinedFleet | AbyssalCombinedFleet

export type PlayerFleet = PlayerSingleFleet | PlayerCombinedFleet

export type AbyssalFleet = AbyssalSingleFleet | AbyssalCombinedFleet

export type Fleet = SingleFleet | CombinedFleet;

/**
 * 主力艦隊と随伴艦隊の艦を連結した配列を返す    
 * 通常艦隊 | 連合艦隊 は考えずに呼んでよし
 * @param fleet 
 * @returns 
 */
export function concat_fleet_ships(
    fleet: Fleet,
): EquippedShip[] {
    return is_combined_fleet(fleet)
        ? fleet.main_fleet_ships.concat(fleet.escort_fleet_ships)
        : fleet.main_fleet_ships;
}

export function is_combined_fleet(fleet: Fleet): fleet is CombinedFleet {
    return fleet.is_combined;
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
            main_fleet_ships: main_fleet_ships,
            escort_fleet_ships: escort_fleet_ships,
            unused_smoke: true,
            is_combined,
            formation: 'CruisingFormation_4',
        };
    } else {
        return {
            main_fleet_ships: main_fleet_ships,
            unused_smoke: true,
            is_combined,
            formation: 'LineAhead',
        };
    }
}

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
            main_fleet_ships: main_fleet_ships,
            escort_fleet_ships: escort_fleet_ships,
            unused_smoke: true,
            is_combined,
            formation: 'CruisingFormation_4',
        };
    } else {
        return {
            main_fleet_ships: main_fleet_ships,
            unused_smoke: true,
            is_combined,
            formation: 'LineAhead',
        };
    }
}