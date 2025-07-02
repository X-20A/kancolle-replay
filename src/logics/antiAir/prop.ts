import { PlaneEquip } from "@/models/equip/basic";
import { WeightedAntiAir } from "@/types/brands/other";



/**
 * 艦の割合撃墜率を返す
 */
export function calc_prop_shotdown_rate(
    weighted_anti_air: WeightedAntiAir,
    target_unit: PlaneEquip,
): number {
    console.log('艦加重対空: ', weighted_anti_air);
    console.log('艦射撃回避: ', target_unit.anti_air_resist_ship);
    return Math.floor(weighted_anti_air * target_unit.anti_air_resist_ship) / 200;
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
    const prop_shotdown_rate = calc_prop_shotdown_rate(
        weighted_anti_air,
        target_unit,
    );
    return Math.floor(prop_shotdown_rate * target_slot_count);
}