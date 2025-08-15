import { AntiInstallImprovementMods } from "../improvementBonus";
import { AntiInstallPreInfo } from "../preInfo";
import { AntiInstallFlatDamageBonus, calc_anti_install_flat_damage_bonuses } from "./flatDamageBonuses";
import { AntiInstallGeneralMultiplicativeBonuses, calc_general_multiplicative_bonuses } from "./generalMultiplicativeBonuses";
import { calc_Landing_Craft_specific_bonuses, LandingCraftSpecificBonuses } from "./LandingCraftSpecificBonuses";

export type AntiInstallPreMods = {
    general_multiplicative_bonuses: AntiInstallGeneralMultiplicativeBonuses,
    flat_damage_bonus: AntiInstallFlatDamageBonus,
    landing_craft_specific_bonuses: LandingCraftSpecificBonuses,
    // Ship Type Bonuses(A0, B0) は含めない
    // 現在は General Multiplicative Bonuses と対象艦が同じなので事前評価できるが
    // Ship Type Bonusesだけの艦が実装されると設計が壊れる
}

export function calc_anti_install_pre_mods(
    pre_info: AntiInstallPreInfo,
    improvement_mods: AntiInstallImprovementMods,
): AntiInstallPreMods {
    const general_multiplicative_bonuses = calc_general_multiplicative_bonuses(
        pre_info,
        improvement_mods,
    );
    const flat_damage_bonus =
        calc_anti_install_flat_damage_bonuses(pre_info);
    const landing_craft_specific_bonuses =
        calc_Landing_Craft_specific_bonuses(pre_info);

    const pre_mods: AntiInstallPreMods = {
        general_multiplicative_bonuses,
        flat_damage_bonus,
        landing_craft_specific_bonuses,
    };

    return pre_mods;
}