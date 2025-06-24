import { CombinedFleetFormationType, SingleFleetFormationType } from "@/types"
import { EquippedShip, is_sunk } from "../ship/equipped"
import { EnemyFleet } from "@/types/brands/fleet"

type FleetBase = {
    main_fleet_ships: EquippedShip[],
    is_combined: boolean,
    unused_smoke: boolean,
}

export type SingleFleet = FleetBase & {
    is_combined: false,
    formation: SingleFleetFormationType,
}

export type CombinedFleet = FleetBase & {
    escort_fleet_ships: EquippedShip[],
    is_combined: true,
    formation: CombinedFleetFormationType,
}

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
    return fleet.is_combined
        ? fleet.main_fleet_ships.concat(fleet.escort_fleet_ships)
        : fleet.main_fleet_ships;
}

/**
 * 全ての艦が撃沈されているか判定して返す
 * @param enemy_fleet 
 * @returns 
 */
export function is_all_sunk(
    enemy_fleet: EnemyFleet,
): boolean {
    return concat_fleet_ships(enemy_fleet).every(is_sunk);
}

export function derive_fleet(
    main_fleet_ships: EquippedShip[],
    escort_fleet_ships: EquippedShip[],
): Fleet {
    const is_combined = escort_fleet_ships.length >= 1;

    if (is_combined) {
        return {
            main_fleet_ships: main_fleet_ships,
            escort_fleet_ships: [escort_fleet_ships[0], ...escort_fleet_ships.slice(1)],
            unused_smoke: true,
            is_combined,
            formation: 'CruisingFormation_4',
        }
    } else {
        return {
            main_fleet_ships: main_fleet_ships,
            unused_smoke: true,
            is_combined,
            formation: 'LineAhead',
        }
    }
}