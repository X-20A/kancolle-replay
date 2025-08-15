import { calc_anti_install_pre_info } from "./preInfo";
import { calc_anti_install_improvement_mods } from "./improvementBonus";
import { AntiInstallPostMods, calc_anti_install_post_cap_bonuses } from "./postCapMod";
import { PlayerEquip } from "@/models/equip/basic";
import { AntiInstallPreMods, calc_anti_install_pre_mods } from "./preCapMod";

/// 対地攻撃力
/// https://en.kancollewiki.net/Combat/Anti-Installation#Calculation
/// の Mod_others 以外

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

export type PreCalculatedAntiInstallMods = {
    pre_mods: AntiInstallPreMods,
    post_mods: AntiInstallPostMods,
}

export function calc_pre_calculated_anti_install_mods(
    equips: PlayerEquip[],
): PreCalculatedAntiInstallMods {
    const pre_info =
        calc_anti_install_pre_info(equips);
    const improvement_mods =
        calc_anti_install_improvement_mods(pre_info);

    const pre_mods = calc_anti_install_pre_mods(
        pre_info,
        improvement_mods,
    );
    const post_mods = calc_anti_install_post_cap_bonuses(
        pre_info,
        improvement_mods,
    );

    const mods: PreCalculatedAntiInstallMods = {
        pre_mods,
        post_mods,
    };

    return mods;
}