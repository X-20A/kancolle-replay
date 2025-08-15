import { Brand } from "@/types/brands";
import { AntiInstallPreInfo } from "../preInfo";

/// WG・迫撃砲加算補正(B1)

const calc_bonus = (
    target_count: number,
    count_one: number,
    count_two: number,
    count_three: number,
    count_four_or_more: number,
): number => {
    if (target_count === 0) return 0;
    if (target_count === 1) return count_one;
    if (target_count === 2) return count_two;
    if (target_count === 3) return count_three;
    return count_four_or_more; // target_count >= 4
}

export type AntiInstallFlatDamageBonus =
    Brand<number, 'AntiInstallFlatDamageBonus'>

/**
 * WG・迫撃砲加算補正(B1)を返す
 * @param info 
 * @returns 
 */
export function calc_anti_install_flat_damage_bonuses(
    info: AntiInstallPreInfo,
): AntiInstallFlatDamageBonus {
    const {
        WG_count,
        mortar_concentrated_count,
        mortar_count,
        Type_4_rocket_count,
        Type_4_rocket_concentrated_count,
    } = info;

    return (
        calc_bonus(WG_count,
            75, 110, 140, 160)
        + calc_bonus(mortar_concentrated_count,
            60, 110, 150, 180)
        + calc_bonus(mortar_count, 
            30, 55, 75, 90)
        + calc_bonus(Type_4_rocket_count,
            55, 115, 160, 190)
        + calc_bonus(Type_4_rocket_concentrated_count,
            80, 170, 230, 260)
        );
}