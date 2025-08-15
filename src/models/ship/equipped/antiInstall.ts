import { AntiInstallImprovementMods, calc_anti_install_improvement_mods } from "@/logics/antiInstall/improvementBonus"
import { AntiInstallFlatDamageBonus, calc_anti_install_flat_damage_bonuses } from "@/logics/antiInstall/preCapMod/flatDamageBonuses"
import { AntiInstallGeneralMultiplicativeBonuses, calc_general_multiplicative_bonuses } from "@/logics/antiInstall/preCapMod/generalMultiplicativeBonuses"
import { calc_Landing_Craft_specific_bonuses, LandingCraftSpecificBonuses } from "@/logics/antiInstall/preCapMod/LandingCraftSpecificBonuses"
import { AntiInstallPreInfo, calc_anti_install_pre_info } from "@/logics/antiInstall/preInfo"
import { PlayerEquip } from "@/models/equip/basic"

type PreMod = {
    general_multiplicative_bonuses: AntiInstallGeneralMultiplicativeBonuses,
    flat_damage_bonus: AntiInstallFlatDamageBonus,
    landing_craft_specific_bonuses: LandingCraftSpecificBonuses,
    // Ship Type Bonuses(A0, B0) は含めない
    // 現在は General Multiplicative Bonuses と対象艦が同じなので事前評価できるが
    // Ship Type Bonusesだけの艦が実装されると設計が壊れる
}

const calc_pre_mods = (
    pre_info: AntiInstallPreInfo,
    improvement_mods: AntiInstallImprovementMods,
): PreMod => {
    const general_multiplicative_bonuses = calc_general_multiplicative_bonuses(
        pre_info,
        improvement_mods,
    );
    const flat_damage_bonus =
        calc_anti_install_flat_damage_bonuses(pre_info);
    const landing_craft_specific_bonuses =
        calc_Landing_Craft_specific_bonuses(pre_info);

    const pre_mods: PreMod = {
        general_multiplicative_bonuses,
        flat_damage_bonus,
        landing_craft_specific_bonuses,
    };

    return pre_mods;
}

type PostMods = {

}

const calc_post_mods = (

)

export type PrecalculatedAntiInstallMods = {
    pre_mods: PreMod,
    post_mods: PostMods,
}

export function calc_pre_calculated_anti_install_mods(
    equips: PlayerEquip[],
): PrecalculatedAntiInstallMods {
    const pre_info =
        calc_anti_install_pre_info(equips);
    const improvement_mods =
        calc_anti_install_improvement_mods(pre_info);

    const pre_mods = calc_pre_mods(
        pre_info,
        improvement_mods,
    );
    const post_mods = calc_post_mods();

    const mods: PrecalculatedAntiInstallMods = {
        pre_mods,
        post_mods,
    };

    return mods;
}