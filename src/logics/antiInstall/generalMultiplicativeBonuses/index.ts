import { PlayerNakedShip } from "@/models/ship/naked/base";
import { AntiInstallPreInfo } from "../preInfo";
import { AntiPillboxMultiplier, calc_Pillbox_Multiplier } from "./Pillbox";
import { AntiInstallUtils } from "../util";
import { AntiInstallImprovementMods } from "../improvementBonus";

export type GeneralMultiplicativeBonuses = {
    anti_pillbox_multiplier: AntiPillboxMultiplier,
}

/**
 * 一般対地乗算補正(A1)を返す
 * @param attacker_ship 
 * @param info 
 * @param utils 
 * @param improvement_mods 
 * @returns 
 */
export function calc_general_multiplicative_bonuses(
    attacker_ship: PlayerNakedShip,
    info: AntiInstallPreInfo,
    utils: AntiInstallUtils,
    improvement_mods: AntiInstallImprovementMods,
): GeneralMultiplicativeBonuses {
    const bonuses: GeneralMultiplicativeBonuses = {
        anti_pillbox_multiplier: calc_Pillbox_Multiplier(info, utils, improvement_mods, 'DayShelling'),
    }

    return bonuses;
}