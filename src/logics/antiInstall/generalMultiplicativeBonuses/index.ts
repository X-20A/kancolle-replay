import { AntiInstallPreInfo } from "../preInfo";
import { calc_Pillbox_Multiplier } from "./Pillbox";
import { AntiInstallUtils } from "../util";
import { AntiInstallImprovementMods } from "../improvementBonus";

/**
 * 一般対地乗算補正(A1)を返す
 * @param info 
 * @param utils 
 * @param improvement_mods 
 * @returns 
 */
export function calc_general_multiplicative_bonuses(
    info: AntiInstallPreInfo,
    utils: AntiInstallUtils,
    improvement_mods: AntiInstallImprovementMods,
): number {
    const bonuses: GeneralMultiplicativeBonuses = {
        anti_pillbox_multiplier: calc_Pillbox_Multiplier(info, utils, improvement_mods, 'DayShelling'),
    }

    return bonuses;
}