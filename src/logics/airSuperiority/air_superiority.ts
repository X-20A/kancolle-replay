import { EquippedShip } from "@/models/ship/equipped";
import { Equip, is_player_equip } from "@/models/equip/basic";
import { calc_plane_proficiency_flat } from "../proficiency";

/// 制空系

export function calc_equips_air_superiority_power(
    equips: Equip[],
    slots: readonly number[],
): number {
    return equips.reduce((total, equip, index) => {
        if (
            !equip.flags.is_involve_air_superiority
            || slots[index] === 0
        ) return total;

        if (is_player_equip(equip)) {
            const equip_air_superiority_power =
                equip.natural_addition.anti_air
                + equip.improvement_addition.air_superiority;

            const remain_plane_count = slots[index];
            const plane_proficiency_flat = calc_plane_proficiency_flat(equip);

            return total + (
                equip_air_superiority_power * Math.sqrt(remain_plane_count)
                + plane_proficiency_flat
            );
        } else {
            const remain_plane_count = slots[index];
            return total + (
                equip.natural_addition.anti_air * Math.sqrt(remain_plane_count)
            );
        }
    }, 0);
}

/**
 * 艦の制空値を返す
 * @param ship 
 * @returns 
 */
export function calc_ship_air_superiority_power(ship: EquippedShip): number {
    return calc_equips_air_superiority_power(ship.equips, ship.slots);
}