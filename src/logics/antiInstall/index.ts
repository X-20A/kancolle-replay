import { calc_anti_install_pre_info } from "./preInfo";
import { calc_anti_install_improvement_mods } from "./improvementBonus";
import { calc_anti_install_utils } from "./util";
import { EquippedShip, is_abyssal_ship, is_install_type, is_player_equipped_ship } from "../../models/ship/equipped";
import { Brand } from "@/types/brands";
import { calc_general_multiplicative_bonuses } from "./preCapMod/generalMultiplicativeBonuses";
import { DayOrNight } from "@/types/battle";

/// 対地攻撃力
/// https://en.kancollewiki.net/Combat/Anti-Installation#Calculation
/// の Mod_others 以外

export type AntiInstallPreMultiplier =
    Brand<number, 'AntiInstallPreMultiplier'>
export type AntiInstallPreFlat =
    Brand<number, 'AntiInstallPreFlat'>

export type AntiInstallPreMods = {
    anti_install_pre_multiplier: AntiInstallPreMultiplier,
    anti_install_pre_flat: AntiInstallPreFlat,
}

/**
 * 攻撃力を受け取るとややこしいので式を変形する
 * f◦ は Landing_Craft_specific_bonuses より、
 * x * α + β に変換できるので、
 * f◦((base * A0 + B0) * A1 + B1)
 * = ((base * A0 + B0) * A1 + B1) * α + β
 * 艦種よりA0が有効であるときB0は無効(逆も然り)。
 * (base * A0 * A1 + B1) * α + β
 * or
 * (base + B0 * A1 + B1) * α + β
 */

/**
 * キャップ前対地攻撃力補正を返す
 * @param attacker_ship 
 * @param equips 
 * @returns 
 */
export function calc_anti_install_pre_mods(
    attacker_ship: EquippedShip,
    target_ship: EquippedShip,
    phase_type: DayOrNight,
): AntiInstallPreMultiplier {
    if (
        !is_player_equipped_ship(attacker_ship) ||
        !is_abyssal_ship(target_ship) ||
        !is_install_type(target_ship)
    ) return 1 as AntiInstallPreMultiplier;
    
    const pre_info = calc_anti_install_pre_info(attacker_ship.equip_slots);
    const utils = calc_anti_install_utils(pre_info);
    const improvement_mods = calc_anti_install_improvement_mods(pre_info);

    const general_multiplicative_bonuses = calc_general_multiplicative_bonuses(
        target_ship,
        pre_info,
        utils,
        improvement_mods,
        phase_type,
    );
}

