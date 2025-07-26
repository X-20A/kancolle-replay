import { Equip } from "@/models/equip/basic";
import { concat_fleet_ships, is_combined_fleet, PlayerFleet } from "@/models/fleet/Fleet";
import { FleetUnit, PlayerFleetUnit } from "@/models/fleet/FleetUnit";
import { NavalBase } from "@/models/NavalBase";
import { is_sunk, PlayerEquippedShip } from "@/models/ship/equipped";
import { derive_equipped_player_ship, PlayerEquippedShipOptions } from "@/models/ship/equipped/player";
import { PlayerShipState } from "@/models/ship/state";
import { ShipUniqueId } from "@/types/brands/ship";

/**
 * 艦隊内における洋上補給の装備位置
 */
export type MaritimeResupplyLocation = {
    /** 洋上補給を装備していた艦のユニークID */
    ship_unique_id: ShipUniqueId,
    /** 装備していたスロット 0オリジン */
    equip_index: number,
}

/**
 * 艦隊内の洋上補給の数を返す    
 * ※4つ以上は数えない
 * @param player_fleet 
 * @returns 
 */
export function calc_maritime_resupply_locations(
    player_fleet: PlayerFleet,
): MaritimeResupplyLocation[] {
    const UNDERWAY_REPLENISHMENT_ID = 146;
    const AVAILABLE_LIMIT = 3;
    const result: MaritimeResupplyLocation[] = [];

    const ships = concat_fleet_ships(player_fleet);
    for (const ship of ships) {
        if (is_sunk(ship)) continue;

        for (let equip_index = 0; equip_index < ship.equip_slots.length; equip_index++) {
            const equip = ship.equip_slots[equip_index].equip;
            if (!equip || equip.master_id !== UNDERWAY_REPLENISHMENT_ID) continue;

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
 * https://wikiwiki.jp/kancolle/洋上補給#operation
 * @param player_fleet 
 * @param maritime_resupply_count 
 * @returns 
 */
export function calc_supply_ratio(
    player_fleet: PlayerFleet,
    maritime_resupply_count: number,
): number {
    if (is_combined_fleet(player_fleet)) {
        return(
            maritime_resupply_count === 1 ? 15 :
                maritime_resupply_count === 2 ? 27.5 :
                    40 // maritime_resupply_count >= 3
        );
    } else {
        return (
            maritime_resupply_count === 1 ? 25 :
                maritime_resupply_count === 2 ? 36 :
                    47 // maritime_resupply_count >= 3
        );
    }
}

const calc_supply_ratio_set = (
    pre_supply_ratio: number,
    supply_ratio: number,
): {
    post_supply_ratio: number,
    real_supply_ratio: number,
} => {
    const post_supply_ship_ratio = Math.min(
        100,
        pre_supply_ratio + supply_ratio,
    );
    const real_supply_ratio = pre_supply_ratio - post_supply_ship_ratio;

    return {
        post_supply_ratio: post_supply_ship_ratio,
        real_supply_ratio,
    }
}

/**
 * 洋上補給後の艦を返す(洋上補給の消滅も反映)
 * @param ships 
 * @param supply_ratio 
 * @param maritime_resupply_locations 
 * @returns 
 */
const calc_supplied_ships = (
    units: PlayerFleetUnit[],
    supply_ratio: number,
    maritime_resupply_locations: MaritimeResupplyLocation[],
): {
    supplied_units: PlayerFleetUnit[],
    total_fuel_consumed: number,
    total_ammo_consumed: number,
} => {
    let total_fuel_consumed = 0;
    let total_ammo_consumed = 0;
    const supplied_units = units.map(unit => {
        const ship = unit.ship;
        if (is_sunk(ship)) return unit;

        // 燃料補給計算
        const {
            post_supply_ratio: new_fuel_ratio,
            real_supply_ratio: real_fuel_supply_ratio,
        } = calc_supply_ratio_set(
            ship.state.fuel_remain_ratio,
            supply_ratio,
        );

        total_fuel_consumed += real_fuel_supply_ratio * ship.base_fuel;

        // 弾薬補給計算
        const {
            post_supply_ratio: new_ammo_ratio,
            real_supply_ratio: real_ammo_supply_ratio,
        } = calc_supply_ratio_set(
            ship.state.ammo_remain_ratio,
            supply_ratio,
        );

        total_ammo_consumed += real_ammo_supply_ratio * ship.base_ammo;

        // 発動した洋上補給を装備していた艦なら装備をスライド
        const maritime_resupply_location = maritime_resupply_locations.find(location =>
            location.ship_unique_id === ship.unique_id
        );
        if (!maritime_resupply_location) return unit;

        const new_equips: Equip[] = ship.equip_slots.flatMap((slot, index) => {
            if (
                index === maritime_resupply_location.equip_index ||
                !slot.equip
            ) return [];

            return slot.equip;
        });

        // 要は洋上補給の装甲-2が無くなるだけ 一応再生成の筋は通しとく
        const options: PlayerEquippedShipOptions = {
            unique_id: ship.unique_id,
            hp_remain: ship.state.hp_remain,
            slots: ship.equip_slots.map(slot => slot.slot_count),
        };
        const pre_new_ship = derive_equipped_player_ship(
            ship.lv,
            ship.special_item_id,
            ship.master_id,
            new_equips,
            options,
        );

        const new_state: PlayerShipState = {
            ...ship.state,
            fuel_remain_ratio: new_fuel_ratio,
            ammo_remain_ratio: new_ammo_ratio,
        };

        const new_ship = {
            ...pre_new_ship,
            state: new_state,
        };
        return {
            ...unit,
            ship: new_ship,
        }
    });

    return {
        supplied_units,
        total_fuel_consumed,
        total_ammo_consumed,
    }
}

/**
 * 洋上補給後のFleetを返す
 * @param player_fleet 
 * @param supply_ratio 
 * @param maritime_resupply_locations 
 * @returns 
 */
export function calc_supplied_fleet(
    player_fleet: PlayerFleet,
    supply_ratio: number,
    maritime_resupply_locations: MaritimeResupplyLocation[],
    naval_base: NavalBase,
): {
    supplied_fleet: PlayerFleet,
    billed_naval_base: NavalBase,  
} {
    const {
        supplied_units: main_fleet_units,
        total_fuel_consumed: main_fleet_fuel_consumed,
        total_ammo_consumed: main_fleet_ammo_consumed,
     } = calc_supplied_ships(
        player_fleet.main_fleet_units,
        supply_ratio,
        maritime_resupply_locations,
    );

    if (!is_combined_fleet(player_fleet)) return {
        supplied_fleet: {
            ...player_fleet,
            main_fleet_units: main_fleet_units,
        },
        billed_naval_base: {
            ...naval_base,
            fuel: main_fleet_fuel_consumed,
            ammo: main_fleet_ammo_consumed,
        }
    };

    const {
        supplied_units: escort_fleet_units,
        total_fuel_consumed: escort_fleet_fuel_consumed,
        total_ammo_consumed: escort_fleet_ammo_consumed,
    } = calc_supplied_ships(
        player_fleet.escort_fleet_units,
        supply_ratio,
        maritime_resupply_locations,
    );

    return {
        supplied_fleet: {
            ...player_fleet,
            main_fleet_units: main_fleet_units,
            escort_fleet_units: escort_fleet_units,
        },
        billed_naval_base: {
            ...naval_base,
            fuel: main_fleet_fuel_consumed + escort_fleet_fuel_consumed,
            ammo: main_fleet_ammo_consumed + escort_fleet_ammo_consumed,
        },
    };
}