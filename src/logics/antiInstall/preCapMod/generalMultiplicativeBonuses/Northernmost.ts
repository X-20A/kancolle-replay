import { Brand } from "@/types/brands";
import { AntiInstallPreInfo } from "../../preInfo";

type DayNorthernmostMultiplier =
    Brand<number, 'DayNorthernmostMultiplier'>

const calc_day_multiplier = (
): DayNorthernmostMultiplier => {
    // おそらく登場機会が無い為に不明
    return 1 as DayNorthernmostMultiplier;
}

type NormalNorthernmostMultiplier =
    Brand<number, 'NormalNorthernmostMultiplier'>

const calc_normal_multiplier = (
    info: AntiInstallPreInfo,
): NormalNorthernmostMultiplier => {
    const {
        WG_count,
        special_LC1_count,
        Toku_11_tank_count,
        Type_3_shell_count,
    } = info;

    let total = 1;

    // 改修効果不明

    if (WG_count) total *= 1.4;
    if (WG_count >= 2) total *= 1.5;
    if (special_LC1_count) total *= 1.8;
    if (Toku_11_tank_count) total *= 2.2;
    if (Type_3_shell_count) total *= 1.75;

    return total as NormalNorthernmostMultiplier;
}

export type NorthernmostMultipliers = {
    day_multiplier: DayNorthernmostMultiplier,
    normal_multiplier: NormalNorthernmostMultiplier,
}

/**
 * 北端上陸姫系の一般対地乗算補正(A1)を返す
 * @param pre_info 
 * @param improvement_mods 
 * @returns 
 */
export function calc_anti_Northernmost_multipliers(
    pre_info: AntiInstallPreInfo,
): NorthernmostMultipliers {
    const day_multiplier = calc_day_multiplier();
    const normal_multiplier = calc_normal_multiplier(
        pre_info,
    );

    const multipliers: NorthernmostMultipliers = {
        day_multiplier,
        normal_multiplier,
    };

    return multipliers;
}