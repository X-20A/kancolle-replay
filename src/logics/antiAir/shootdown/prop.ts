import { PlaneEquip } from "@/models/equip/basic";
import { AntiAirFormationMod } from "../../formation";
import { WeightedAntiAir } from "../adjusted.ts/weighted";

/**
 * 艦娘による割合撃墜数を返す(コア)    
 * NOTE: 敵味方共通
 * https://en.kancollewiki.net/Aerial_Combat#Proportional_and_Fixed_shootdowns > Allied Fleet > Prop
 * @param weighted_anti_air 
 * @param formation_mod 
 * @param target_unit 
 * @param plane_count 
 * @returns 
 */
const calc_proportional_shotdown_count_core = (
    weighted_anti_air: WeightedAntiAir,
    formation_mod: AntiAirFormationMod,
    target_unit: PlaneEquip,
    plane_count: number,
): number => {
    return Math.floor(
        Math.floor(weighted_anti_air * target_unit.anti_air_resist_ship)
        * formation_mod
        * plane_count
        / 200
    );
}