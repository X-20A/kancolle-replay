import { Brand } from "@/types/brands";
import { AntiInstallPreInfo } from "./preInfo";

/// 改修値による対地ボーナス
// https://en.kancollewiki.net/Combat/Anti-Installation#General_Multiplicative_Bonuses > Improvement

/**
 * 上陸用舟艇の改修ボーナス値を返す
 * @param info 
 * @returns 
 */
const calc_landing_craft_improvement_bonus = (
    info: AntiInstallPreInfo,
): number => {
    const {
        total_normal_LC_improvement,
        normal_LC_count,
        Landing_force_count,
    } = info;

    if (normal_LC_count + Landing_force_count === 0) return 0;

    const average_improvement_lv = total_normal_LC_improvement
        / (normal_LC_count + Landing_force_count);

    const CONSTANT_DIVISOR = 50;
    
    return average_improvement_lv / CONSTANT_DIVISOR;
}

/**
 * カツ車の改修ボーナス値を返す
 * @param info 
 * @returns 
 */
const calc_Katsu_tank_improvement_bonus = (
    info: AntiInstallPreInfo,
): number => {
    const {
        Katsu_tanks_count,
        total_Katsu_tanks_improvement,
    } = info;

    if (Katsu_tanks_count === 0) return 0;

    const average_improvement_lv =
        total_Katsu_tanks_improvement / Katsu_tanks_count;

    const CONSTANT_DIVISOR = 50;

    return average_improvement_lv / CONSTANT_DIVISOR;
}

export type LCAndKatsuImprovementMod = Brand<number, 'LCAndKatsuImprovementMod'>

/**
 * 上陸用舟艇とカツ車の改修補正値を返す
 * @param info 
 * @returns 
 */
const calc_LC_and_Katsu_mod = (
    info: AntiInstallPreInfo,
): LCAndKatsuImprovementMod => {
    const BASE = 1;

    return BASE
        + calc_landing_craft_improvement_bonus(info)
        + calc_Katsu_tank_improvement_bonus(info) as LCAndKatsuImprovementMod;
}

/**
 * カミ車の改修ボーナス値を返す
 * @param info 
 * @returns 
 */
const calc_Kami_tank_improvement_bonus = (
    info: AntiInstallPreInfo,
): number => {
    const {
        Amphibious_tank_count,
        total_Amphibious_tank_improvement,
    } = info;

    if (Amphibious_tank_count === 0) return 0;

    const average_improvement_lv =
        total_Amphibious_tank_improvement / Amphibious_tank_count;

    const CONSTANT_DIVISOR = 30;

    return average_improvement_lv / CONSTANT_DIVISOR;
}

export type KamiTankImprovementMod = Brand<number, 'KamiTankImprovementMod'>

/**
 * カミ車の改修補正値を返す
 * @param info 
 * @returns 
 */
const calc_Kami_tank_improvement_mod = (
    info: AntiInstallPreInfo,
): KamiTankImprovementMod => {
    const BASE = 1;

    return BASE
        + calc_Kami_tank_improvement_bonus(info) as KamiTankImprovementMod;
}

export type AntiInstallImprovementMods = {
    /** 上陸用舟艇とカツ車の改修補正値 */
    LC_and_Katsu_improvement_mod: LCAndKatsuImprovementMod,
    /** カミ車の改修補正値 */
    Kami_tank_improvement_mod: KamiTankImprovementMod,
}

/**
 * 改修補正値群を返す
 * @param pre_info 
 * @returns 
 */
export function calc_anti_install_improvement_mods(
    pre_info: AntiInstallPreInfo,
): AntiInstallImprovementMods {
    const bonuses: AntiInstallImprovementMods = {
        LC_and_Katsu_improvement_mod: calc_LC_and_Katsu_mod(pre_info),
        Kami_tank_improvement_mod: calc_Kami_tank_improvement_mod(pre_info),
    };

    return bonuses;
}