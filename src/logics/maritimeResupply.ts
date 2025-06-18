import { concat_fleet_ships } from "@/models/fleet/Fleet";
import { consume_equip_and_shift, ShipState } from "@/models/fleet/fleetState";
import { OwnFleet, OwnFleetState } from "@/types/brands/fleet";
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
    own_fleet_state: OwnFleetState,
): MaritimeResupplyLocation[] {
    const UNDERWAY_REPLENISHMENT_ID = 146;
    const AVAILABLE_LIMIT = 3;
    const result: MaritimeResupplyLocation[] = [];

    for (const ship of concat_fleet_ships(own_fleet)) {
        if (own_fleet_state.ships.get(ship.unique_id)?.is_sunk) continue;
        for (let equip_index = 0; equip_index < ship.equips.length; equip_index++) {
            const equip = ship.equips[equip_index];
            if (equip.master_id === UNDERWAY_REPLENISHMENT_ID) {
                result.push({
                    ship_unique_id: ship.unique_id,
                    equip_index: equip_index
                });

                if (result.length >= AVAILABLE_LIMIT) return result;
            }
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

/**
 * 洋上補給後のFleetStateを返す
 * @param own_fleet_state 
 * @param supply_ratio 
 * @param maritime_resupply_locations 
 * @returns 
 */
export function calc_supplied_fleet_state(
    own_fleet_state: OwnFleetState,
    supply_ratio: number,
    maritime_resupply_locations: MaritimeResupplyLocation[],
): OwnFleetState {
    const supplied_ships = new Map<ShipUniqueId, ShipState>();

    // 各艦船の状態を更新
    for (const [ship_unique_id, ship_state] of own_fleet_state.ships) {
        // 燃料補給計算
        const new_fuel_ratio = Math.min(
            100,
            ship_state.fuel_remain_ratio + supply_ratio,
        );

        // 弾薬補給計算
        const new_ammo_ratio = Math.min(
            100,
            ship_state.ammo_remain_ratio + supply_ratio,
        );

        // 発動した洋上補給を装備していた艦なら装備をスライド
        const new_equips = consume_equip_and_shift(
            ship_state,
            maritime_resupply_locations,
        )

        // 新しい艦船状態を作成
        supplied_ships.set(ship_unique_id, {
            ...ship_state,
            equips: new_equips,
            fuel_remain_ratio: new_fuel_ratio,
            ammo_remain_ratio: new_ammo_ratio,
            maritime_resupply_fuel: new_fuel_ratio - ship_state.fuel_remain_ratio,
            maritime_resupply_ammo: new_ammo_ratio - ship_state.ammo_remain_ratio,
        });
    }

    // 新しい艦隊状態を返す
    return {
        ...own_fleet_state,
        ships: supplied_ships,
    };
}