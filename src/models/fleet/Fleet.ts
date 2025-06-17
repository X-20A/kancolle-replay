import { EquippedShip } from "../ship/equipped"

type FleetBase = {
    main_fleet_ships: EquippedShip[],
    is_combined: boolean,
    unused_smoke: boolean,
}

type SingleFleet = FleetBase & {
    is_combined: false,
}

type CombinedFleet = FleetBase & {
    escort_fleet_ships: EquippedShip[], // 非空を保証
    is_combined: true,
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
        }
    } else {
        return {
            main_fleet_ships: main_fleet_ships,
            unused_smoke: true,
            is_combined,
        }
    }
}