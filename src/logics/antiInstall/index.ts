import { calc_anti_install_pre_info } from "./preInfo";
import { calc_anti_install_improvement_mods } from "./improvementBonus";
import { calc_anti_install_utils } from "./util";
import { EquippedShip, is_install_type, is_player_equipped_ship, PlayerEquippedShip } from "../../models/ship/equipped";
import { Brand } from "@/types/brands";

/// 対地攻撃力
/// https://en.kancollewiki.net/Combat/Anti-Installation#Calculation
/// の Mod_others 以外

export type AntiInstallMod = Brand<number, 'AntiInstallMod'>

/**
 * 対地攻撃力補正を返す
 * @param attacker_ship 
 * @param equips 
 * @returns 
 */
export function calc_anti_install_mods(
    attacker_ship: EquippedShip,
    target_ship: EquippedShip,
): AntiInstallMod {
    if (
        !is_player_equipped_ship(attacker_ship) ||
        !is_install_type(target_ship)
    ) return 1 as AntiInstallMod
    
    const info = calc_anti_install_pre_info(attacker_ship.equip_slots);
    const utils = calc_anti_install_utils(info);
    const improvement_mods = calc_anti_install_improvement_mods(info);

    
}