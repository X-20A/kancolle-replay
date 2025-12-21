import { PlayerShipAdjustedAntiAir } from "../../adjusted.ts/weighted/player";
import { PlaneEquip } from "@/models/equip/basic";
import { PlayerFleetAntiAir } from "../../adjusted.ts/fleet/player";
import { ShootdownCombinedFleetMod } from "../utils";
import { AACIMultiplier } from "../../cutin";

/// 艦娘による固定撃墜

/**
 * 艦娘による固定撃墜を返す    
 * https://en.kancollewiki.net/Aerial_Combat#Proportional_and_Fixed_shootdowns > Allied Fleet > Fixed
 * @param weighted_anti_air 
 * @param fleet_anti_air 
 * @param aaci_type 
 * @param combined_fleet_mod 
 * @param target_unit 
 * @returns 
 */
export function calc_player_fixed_shootdown_count(
    weighted_anti_air: PlayerShipAdjustedAntiAir,
    fleet_anti_air: PlayerFleetAntiAir,
    AACI_multiplier: AACIMultiplier,
    combined_fleet_mod: ShootdownCombinedFleetMod,
    target_unit: PlaneEquip,
): number {
    console.log('weighted_anti_air: ', weighted_anti_air);
    console.log('fleet_anti_air: ', fleet_anti_air);
    console.log('AACI_multiplier: ', AACI_multiplier);

    // ? 日wiki: floor[(AdjAAship + AdjAAfleet) * AACImultiplier / 10]
    // ? 射撃回避が組み込まれてないので使えない
    // ? ENwiki: floor[(floor[AdjAAship * AARship]) + (floor[AdjAAfleet * AARfleet]) * ModCF * AACImultiplier / 5]
    // ? 制空シミュ: floor[floor[AdjAAship * AARship] + floor[floor[AdjAAfleet * AARfleet] + 0.6 * EquipBonus] * 0.25 * 0.75 * ModCF * AACImultiplier]
    // ? Sortie Sim: 
    // ? 暫定; ENwiki なんとなく綺麗なので
    return Math.floor(
        (
            Math.floor(weighted_anti_air * target_unit.anti_air_resist_ship)
            + Math.floor(fleet_anti_air * target_unit.anti_air_resist_fleet)
        ) * combined_fleet_mod * AACI_multiplier / 5
    );
}