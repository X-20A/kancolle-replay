import { Equip } from "@/models/equip/basic";
import { concat_fleet_ships, is_combined_fleet, PlayerFleet } from "@/models/fleet/Fleet";
import { PlayerFleetUnit } from "@/models/fleet/FleetUnit";
import { NavalBase } from "@/models/NavalBase";
import { is_ship_on_the_front_line, PlayerEquippedShip } from "@/models/ship/equipped";
import { derive_player_equipped_ship, PlayerEquippedShipOptions } from "@/models/ship/equipped/player";
import { is_equip_exsist, SlotIndex } from "@/models/ship/EquipSlot";
import { ShipUniqueId } from "@/types/brands/ship";
import { calc_consumed_resources } from "./cost/ship";

/**
 * 艦隊内における洋上補給の装備位置
 */
export type MaritimeResupplyLocation = {
    /** 洋上補給を装備していた艦のユニークID */
    ship_unique_id: ShipUniqueId,
    /** 装備していたスロット */
    equip_index: SlotIndex,
}

/**
 * 艦隊内の洋上補給の位置を返す    
 * ※4つ以上は数えない
 * @param player_fleet 
 * @returns 
 */
const calc_maritime_resupply_locations = (
    player_fleet: PlayerFleet,
): MaritimeResupplyLocation[] => {
    const AVAILABLE_LIMIT = 3;
    const locations: MaritimeResupplyLocation[] = [];

    const ships = concat_fleet_ships(player_fleet);
    for (const ship of ships) {
        if (!is_ship_on_the_front_line(ship)) continue;

        const { equip_slots } = ship;
        for (let slot_index = 0; slot_index < equip_slots.length; slot_index++) {
            const equip_slot = equip_slots[slot_index];
            if (!equip_slot) continue;

            const { equip } = equip_slot;
            if (
                !equip ||
                !is_equip_exsist(equip) ||
                equip.name_jp !== '洋上補給'
            ) continue;

            locations.push({
                ship_unique_id: ship.unique_id,
                equip_index: equip_slot.slot_index,
            });

            if (locations.length >= AVAILABLE_LIMIT) return locations;
        }
    }

    return locations;
}

type SupplyRatioData = {
    min_maritime_resupply_count: number,
    value: number,
}

const SINGLE_FLEET_SUPPLY_RATIO_DATAS: SupplyRatioData[] = [
    { min_maritime_resupply_count: 3, value: 0.47 },
    { min_maritime_resupply_count: 2, value: 0.36 },
    { min_maritime_resupply_count: 1, value: 0.25 },
];

const COMBINED_FLEET_SUPPLY_RATIO_DATAS: SupplyRatioData[] = [
    { min_maritime_resupply_count: 3, value: 0.4 },
    { min_maritime_resupply_count: 2, value: 0.275 },
    { min_maritime_resupply_count: 1, value: 0.15 },
];

const get_fleet_supply_ratio = (
    datas: SupplyRatioData[],
    maritime_resupply_count: number,
): number => {
    for (const { min_maritime_resupply_count, value } of datas) {
        if (maritime_resupply_count >= min_maritime_resupply_count) {
            return value;
        }
    }
    return 0;
};

/**
 * 洋上補給の数に応じた回復割合を返す    
 * 回復上限は考慮しない    
 * https://wikiwiki.jp/kancolle/洋上補給#operation
 * @param player_fleet 
 * @param maritime_resupply_count 
 * @returns 
 */
const calc_supply_ratio = (
    player_fleet: PlayerFleet,
    maritime_resupply_count: number,
): number => {
    return is_combined_fleet(player_fleet)
        ? get_fleet_supply_ratio(COMBINED_FLEET_SUPPLY_RATIO_DATAS, maritime_resupply_count)
        : get_fleet_supply_ratio(SINGLE_FLEET_SUPPLY_RATIO_DATAS, maritime_resupply_count);
}

/**
 * 補給後の残(燃料|弾薬)割合と補給した(燃料|弾薬)割合のセットを返す
 * @param pre_supply_ratio 
 * @param supply_ratio 
 * @returns 
 */
const calc_supply_ratio_set = (
    pre_supply_ratio: number,
    supply_ratio: number,
): {
    post_supply_ratio: number,
    real_supply_ratio: number,
} => {
    const post_supply_ratio = Math.min(
        1,
        pre_supply_ratio + supply_ratio,
    );
    const real_supply_ratio = post_supply_ratio - pre_supply_ratio;

    return {
        post_supply_ratio,
        real_supply_ratio,
    };
}

type SupplyResult = Readonly<{
    fuel_remain_ratio: number;
    ammo_remain_ratio: number;
    fuel_consumed: number;
    ammo_consumed: number;
}>;

/**
 * 補給後の残リソース割合と請求資源量のセットを返す
 * @param ship 
 * @param supply_ratio 
 * @returns 
 */
const calc_ship_supply_result = (
    ship: PlayerEquippedShip,
    supply_ratio: number,
): SupplyResult => {
    const fuel = calc_supply_ratio_set(
        ship.state.fuel_remain_ratio,
        supply_ratio,
    );
    const ammo = calc_supply_ratio_set(
        ship.state.ammo_remain_ratio,
        supply_ratio,
    );

    return {
        fuel_remain_ratio: fuel.post_supply_ratio,
        ammo_remain_ratio: ammo.post_supply_ratio,
        fuel_consumed: calc_consumed_resources(
            fuel.real_supply_ratio,
            ship.base_fuel,
            ship,
        ),
        ammo_consumed: calc_consumed_resources(
            ammo.real_supply_ratio,
            ship.base_ammo,
            ship,
        ),
    };
};

/**
 * 洋上補給を消費した艦を再生成して返す
 * @param ship 
 * @param supply_result 
 * @param maritime_resupply_location 
 * @returns 
 */
const rebuild_ship_after_resupply = (
    ship: PlayerEquippedShip,
    supply_result: SupplyResult,
    maritime_resupply_location: MaritimeResupplyLocation,
): PlayerEquippedShip => {
    const new_equips: Equip[] = ship.equip_slots.flatMap((slot, index) => {
        if (
            maritime_resupply_location.equip_index === 'ex' ||
            index === maritime_resupply_location.equip_index ||
            !is_equip_exsist(slot.equip)
        ) return [];
        return slot.equip;
    });

    const new_ex_equip: Equip | 'None' =
        ship.equip_slots.find(slot => slot.slot_index === 'ex')?.equip ?? 'None';

    const options: PlayerEquippedShipOptions = {
        unique_id: ship.unique_id,
        hp_remain: ship.state.hp_remain,
        fuel_remain_ratio: supply_result.fuel_remain_ratio,
        ammo_remain_ratio: supply_result.ammo_remain_ratio,
        slots: ship.equip_slots.map(slot => slot.slot_count),
    };

    return derive_player_equipped_ship(
        ship.lv,
        ship.special_item_id,
        ship.master_id,
        options,
        new_equips,
        new_ex_equip,
    );
};

const calc_resupplied_ships = (
    units: readonly PlayerFleetUnit[],
    supply_ratio: number,
    maritime_resupply_locations: readonly MaritimeResupplyLocation[],
): {
    supplied_units: PlayerFleetUnit[];
    total_fuel_consumed: number;
    total_ammo_consumed: number;
} => {
    let total_fuel_consumed = 0;
    let total_ammo_consumed = 0;

    const supplied_units = units.map(unit => {
        const ship = unit.ship;
        if (!is_ship_on_the_front_line(ship)) {
            return unit;
        }

        const supply_result = calc_ship_supply_result(
            ship,
            supply_ratio,
        );

        total_fuel_consumed += supply_result.fuel_consumed;
        total_ammo_consumed += supply_result.ammo_consumed;

        const maritime_resupply_location =
            maritime_resupply_locations.find(
                location => location.ship_unique_id === ship.unique_id,
            );

        // 洋上補給なし → state更新のみ
        if (!maritime_resupply_location) {
            return {
                ...unit,
                ship: {
                    ...ship,
                    state: {
                        ...ship.state,
                        fuel_remain_ratio: supply_result.fuel_remain_ratio,
                        ammo_remain_ratio: supply_result.ammo_remain_ratio,
                    },
                },
            };
        }

        // 洋上補給あり → 艦再生成
        return {
            ...unit,
            ship: rebuild_ship_after_resupply(
                ship,
                supply_result,
                maritime_resupply_location,
            ),
        };
    });

    return {
        supplied_units,
        total_fuel_consumed,
        total_ammo_consumed,
    };
};

/**
 * 洋上補給後の艦隊を返す
 * @param fleet 
 * @param supply_ratio 
 * @param maritime_resupply_locations 
 * @returns 
 */
export function calc_resupplied_fleet<T extends PlayerFleet>(
    fleet: T,
    naval_base: NavalBase,
): {
    supplied_fleet: T,
    billed_naval_base: NavalBase,  
} {
    const maritime_resupply_locations =
        calc_maritime_resupply_locations(fleet);
    const supply_ratio =
        calc_supply_ratio(fleet, maritime_resupply_locations.length);
    const {
        supplied_units: main_fleet_units,
        total_fuel_consumed: main_fleet_fuel_consumed,
        total_ammo_consumed: main_fleet_ammo_consumed,
     } = calc_resupplied_ships(
        fleet.main_fleet_units,
        supply_ratio,
        maritime_resupply_locations,
    );

    if (!is_combined_fleet(fleet)) return {
        supplied_fleet: {
            ...fleet,
            main_fleet_units: main_fleet_units as [PlayerFleetUnit, ...PlayerFleetUnit[]],
        } as T,
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
    } = calc_resupplied_ships(
        fleet.escort_fleet_units,
        supply_ratio,
        maritime_resupply_locations,
    );

    return {
        supplied_fleet: {
            ...fleet,
            main_fleet_units: main_fleet_units as [PlayerFleetUnit, ...PlayerFleetUnit[]],
            escort_fleet_units: escort_fleet_units as [PlayerFleetUnit, ...PlayerFleetUnit[]],
        } as T,
        billed_naval_base: {
            ...naval_base,
            fuel: main_fleet_fuel_consumed + escort_fleet_fuel_consumed,
            ammo: main_fleet_ammo_consumed + escort_fleet_ammo_consumed,
        },
    };
}