import { PlayerEquip } from "@/models/equip/basic";
import { AntiDockMultiplier, calc_anti_Dock_multiplier } from "./generalMultiplicativeBonuses/Dock";
import { calc_anti_install_pre_info } from "./preInfo";
import { calc_anti_install_improvement_mods } from "./improvementBonus";
import { calc_anti_install_utils } from "./util";
import { PlayerEquippedShip } from "../../models/ship/equipped";

/// 対地攻撃力
/// https://en.kancollewiki.net/Combat/Anti-Installation#Calculation
/// の Mod_others 以外

export type AntiInstallMods = {
    anti_dock_mod: AntiDockMultiplier,
}

/**
 * 目標種別ごとの対地攻撃力を返す
 * @param ship 
 * @param equips 
 * @returns 
 */
export function calc_anti_install_mods(
    ship: PlayerEquippedShip,
    equips: PlayerEquip[],
): AntiInstallMods {
    const info = calc_anti_install_pre_info(equips);
    const utils = calc_anti_install_utils(info);
    const improvement_mods = calc_anti_install_improvement_mods(info);

    const mods: AntiInstallMods = {
        anti_dock_mod: calc_anti_Dock_multiplier(
            info,
            utils,
            improvement_mods,
        ),
    };

    return mods;
}