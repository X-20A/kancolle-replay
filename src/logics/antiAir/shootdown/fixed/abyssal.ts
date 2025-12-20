import { PlaneEquip } from "@/models/equip/basic";
import { AbyssalFleetAntiAir } from "../../adjusted.ts/fleet/abyssasl";
import { AbyssalShipAdjustedAntiAir } from "../../adjusted.ts/weighted/abyssal";
import { ShootdownCombinedFleetMod } from "../utils";
import { AACIMultiplier } from "../../cutin";

/**
 * 敵艦隊による固定撃墜数を返す    
 * https://en.kancollewiki.net/Aerial_Combat#Proportional_and_Fixed_shootdowns > Enemy Fleet > Fixed
 * @param weighted_anti_air 
 * @param target_unit 
 */
export function calc_abyssal_fixed_shootdown_count(
    weighted_anti_air: AbyssalShipAdjustedAntiAir,
    fleet_anti_air: AbyssalFleetAntiAir,
    AACI_multiplier: AACIMultiplier,
    combined_fleet_mod: ShootdownCombinedFleetMod,
    target_unit: PlaneEquip,
): number {
    return Math.floor(
        (
            Math.floor(weighted_anti_air * target_unit.anti_air_resist_ship)
            + Math.floor(fleet_anti_air * target_unit.anti_air_resist_fleet)
        ) * AACI_multiplier * combined_fleet_mod * 0.1875 // * 0.75 / 4
    );
}