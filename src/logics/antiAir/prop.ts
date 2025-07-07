import { PlaneEquip } from "@/models/equip/basic";
import { Node } from "@/models/Node";
import { WeightedAntiAir } from "@/types/brands/other";
import { calc_combined_fleet_mod } from ".";
import { FleetUnit } from "@/models/fleet/FleetUnit";

/**
 * 艦の割合撃墜率を返す
 */
export function calc_prop_shootdown_rate(
    weighted_anti_air: WeightedAntiAir,
    target_unit: PlaneEquip,
): number {
    return Math.floor(weighted_anti_air * target_unit.anti_air_resist_ship) / 200;
}

/**
 * 連合艦隊構成艦の割合撃墜率を返す
 */
export function calc_combined_fleet_prop_shootdown_rate(
    ship_struct: FleetUnit,
    node: Node,
    target_unit: PlaneEquip,
): number {
    return calc_prop_shootdown_rate(
        ship_struct.ship.weighted_anti_air,
        target_unit,
    ) * calc_combined_fleet_mod(ship_struct, node);
}

/**
 * 艦の割合撃墜数を返す    
 * NOTE: 敵味方共通
 */
export function calc_prop_shootdown_count(
    weighted_anti_air: WeightedAntiAir,
    target_unit: PlaneEquip,
    target_slot_count: number,
): number {
    const prop_shootdown_rate = calc_prop_shootdown_rate(
        weighted_anti_air,
        target_unit,
    );
    return Math.floor(prop_shootdown_rate * target_slot_count);
}

/**
 * 連合艦隊の割合撃墜数を返す    
 * NOTE: 敵味方共通
 */
export function calc_combined_fleet_prop_shootdown_count(
    ship_struct: FleetUnit,
    node: Node,
    target_unit: PlaneEquip,
    target_slot_count: number,
): number {
    const prop_shotdown_rate = calc_combined_fleet_prop_shootdown_rate(
        ship_struct,
        node,
        target_unit,
    );
    return Math.floor(prop_shotdown_rate * target_slot_count);
}