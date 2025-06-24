import { Equip } from "@/models/equip/basic";
import { concat_fleet_ships } from "@/models/fleet/Fleet";
import { EquippedShip, is_player_ship } from "@/models/ship/equipped";
import { OwnFleet } from "@/types/brands/fleet";
import { ShipUniqueId } from "@/types/brands/ship";

export type MaritimeResupplyLocation = {
    ship_unique_id: ShipUniqueId,
    equip_index: number,
}

/**
 * 艦隊内の洋上補給の数を返す    
 * ※4つ以上は数えない
 * @param own_fleet 
 * @returns 
 */
export function calc_maritime_resupply_count(
    own_fleet: OwnFleet,
): MaritimeResupplyLocation[] {
    const UNDERWAY_REPLENISHMENT_ID = 146;
    const AVAILABLE_LIMIT = 3;
    const result: MaritimeResupplyLocation[] = [];

    for (const ship of concat_fleet_ships(own_fleet)) {
        if (ship.state.is_sunk) continue;

        for (let equip_index = 0; equip_index < ship.equips.length; equip_index++) {
            const equip = ship.equips[equip_index];
            if (equip.master_id !== UNDERWAY_REPLENISHMENT_ID) continue;

            result.push({
                ship_unique_id: ship.unique_id,
                equip_index: equip_index
            });

            if (result.length >= AVAILABLE_LIMIT) return result;
        }
    }

    return result;
}

/**
 * 洋上補給の数に応じた回復割合を返す    
 * 回復上限は考慮しない
 * @param own_fleet 
 * @param maritime_resupply_count 
 * @returns 
 */
export function calc_supply_ratio(
    own_fleet: OwnFleet,
    maritime_resupply_count: number,
): number {
    if (own_fleet.is_combined) {
        return(
            maritime_resupply_count === 1 ? 15 :
                maritime_resupply_count === 2 ? 27.5 :
                    40 // maritime_resupply_count >= 3
        )
    } else {
        return (
            maritime_resupply_count === 1 ? 25 :
                maritime_resupply_count === 2 ? 36 :
                    47 // maritime_resupply_count >= 3
        )
    }
}

const calc_supplied_ships = (
    ships: EquippedShip[],
    supply_ratio: number,
    maritime_resupply_locations: MaritimeResupplyLocation[],
): EquippedShip[] => {
    // 各艦船の状態を更新
    return ships.map(ship => {
        if (!is_player_ship(ship) || ship.state.is_sunk) return ship;

        // 燃料補給計算
        const new_fuel_ratio = Math.min(
            100,
            ship.state.fuel_remain_ratio + supply_ratio,
        );

        // 弾薬補給計算
        const new_ammo_ratio = Math.min(
            100,
            ship.state.ammo_remain_ratio + supply_ratio,
        );

        // 発動した洋上補給を装備していた艦なら装備をスライド
        const new_equips = consume_equip_and_shift(
            ship,
            maritime_resupply_locations,
        )

        // 新しい艦船状態を作成
        return {
            ...ship,
            equips: new_equips,
            fuel_remain_ratio: new_fuel_ratio,
            ammo_remain_ratio: new_ammo_ratio,
            maritime_resupply_fuel: new_fuel_ratio - ship.state.fuel_remain_ratio,
            maritime_resupply_ammo: new_ammo_ratio - ship.state.ammo_remain_ratio,
        }
    });
}

/**
 * 洋上補給後のFleetを返す
 * @param own_fleet_state 
 * @param supply_ratio 
 * @param maritime_resupply_locations 
 * @returns 
 */
export function calc_supplied_fleet(
    own_fleet: OwnFleet,
    supply_ratio: number,
    maritime_resupply_locations: MaritimeResupplyLocation[],
): OwnFleet {
    const main_fleet_ships = calc_supplied_ships(
        own_fleet.main_fleet_ships,
        supply_ratio,
        maritime_resupply_locations,
    )

    if (!own_fleet.is_combined) return {
        ...own_fleet,
        main_fleet_ships
    };

    const escort_fleet_ships = calc_supplied_ships(
        own_fleet.escort_fleet_ships,
        supply_ratio,
        maritime_resupply_locations,
    );

    return {
        ...own_fleet,
        main_fleet_ships,
        escort_fleet_ships,
    };
}

/**
 * 装備を消費し、後続装備を前詰めでスライドさせる
 * 
 * @param ship - 処理対象の艦の状態
 * @param equip_index - 消費する装備のインデックス
 * @returns 更新された新しいShipStateオブジェクト
 */
export function consume_equip_and_shift(
    ship: EquippedShip,
    maritime_resupply_locations: MaritimeResupplyLocation[]
): Equip[] {
    const match = maritime_resupply_locations.find(location =>
        location.ship_unique_id === ship.unique_id
    );

    if (!match) return ship.equips;

    const new_equips = [...ship.equips];
    return new_equips.splice(match.equip_index, 1);
}