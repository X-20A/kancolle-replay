import { PlayerShip } from "@/models/ship/Ship";
import { calc_plane_proficiency_flat } from "./proficiency";

/// 制空系

/**
 * 艦の制空値を返す
 * @param ship 
 * @returns 
 */
export function calc_ship_air_superiority_power(ship: PlayerShip): number {
    return ship.equips.reduce((total, equip, index) => {
        if (!equip.flags.is_involve_air_superiority) return total;

        const equip_air_superiority_power =
            equip.natural_addition.anti_air
            + equip.improvement_addition.air_superiority;

        const remain_plane_count = ship.slots.edited[index];
        const plane_proficiency_flat = calc_plane_proficiency_flat(equip);

        return total + (
            equip_air_superiority_power * Math.sqrt(remain_plane_count)
            + plane_proficiency_flat
        );
    }, 0);
}