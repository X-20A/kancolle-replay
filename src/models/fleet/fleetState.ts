import { ShipUniqueId } from "@/types/brands/ship";
import { Equip } from "../equip/basic";
import { MaritimeResupplyLocation } from "@/logics/maritimeResupply";

/// シミュで使う構造から更新され得る項を抽出した構造

export type ShipState = {
    unique_id: ShipUniqueId,
    hp_remain: number;
    slot_remains: number[];
    equips: Equip[];

    fuel_remain_ratio: number,
    ammo_remain_ratio: number,
    maritime_resupply_fuel: number,
    maritime_resupply_ammo: number,

    is_sunk: boolean,
    enable_sink_safety: boolean,
    
};

export type FleetState = {
    ships: Map<ShipUniqueId, ShipState>;
    main_fleet_order: ShipUniqueId[];
    escort_fleet_order?: ShipUniqueId[];
    smoke_used: boolean;

    // ? ここに記録用の構造があってもいいかも
};

/**
 * 装備を消費し、後続装備を前詰めでスライドさせる
 * 
 * @param ship - 処理対象の艦の状態
 * @param equip_index - 消費する装備のインデックス
 * @returns 更新された新しいShipStateオブジェクト
 */
export function consume_equip_and_shift(
    ship_state: ShipState,
    maritime_resupply_locations: MaritimeResupplyLocation[]
): Equip[] {
    const match = maritime_resupply_locations.find(location =>
        location.ship_unique_id === ship_state.unique_id
    );

    if (!match) return ship_state.equips;
    
    const new_equips = [...ship_state.equips];
    return new_equips.splice(match.equip_index, 1);
}