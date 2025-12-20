import { AntiAirFormationMod } from "@/logics/formation";
import { Fleet, is_player_fleet } from "@/models/fleet/Fleet";
import { calc_player_fleet_anti_air } from "./player";
import { calc_abyssal_fleet_anti_air } from "./abyssasl";

/// 艦隊防空値

/**
 * 艦隊防空値を返す
 * @param fleet 
 * @param formation_mod 
 * @returns 
 */
export function calc_fleet_anti_air(
    fleet: Fleet,
    formation_mod: AntiAirFormationMod,
): number {
    return is_player_fleet(fleet)
        ? calc_player_fleet_anti_air(fleet, formation_mod)
        : calc_abyssal_fleet_anti_air(fleet, formation_mod);
}