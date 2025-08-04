import { PlayerEquip } from "@/models/equip/basic";
import { PlayerNakedShip } from "../../naked/base";
import { AntiDockMultiplier, calc_anti_Dock_multiplier } from "./target/Dock";
import { calc_anti_install_pre_info } from "./preInfo";
import { calc_anti_install_improvement_mods } from "./improvementBonus";
import { calc_anti_install_utils } from "./util";

export type AntiInstallMods = {
    anti_dock_mod: AntiDockMultiplier,
}

export function calc_anti_install_mods(
    ship: PlayerNakedShip,
    equips: PlayerEquip[],
): AntiInstallMods {
    const info = calc_anti_install_pre_info(equips);
    const utils = calc_anti_install_utils(info);
    const improvement_mods = calc_anti_install_improvement_mods(info);

    const mods: AntiInstallMods = {
        anti_dock_mod: calc_anti_Dock_multiplier(
            ship,
            info,
            utils,
            improvement_mods,
        ),
    };

    return mods;
}