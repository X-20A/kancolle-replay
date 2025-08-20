import { Equip } from "@/models/equip/basic";
import { EquippedShip, has_ship_type } from "@/models/ship/equipped";
import { Brand } from "@/types/brands";
import { ShipType } from "@/types/ship/ship";
import { match } from "ts-pattern";

/// 徹甲弾補正(Armor-Piercing Modifier)

const AP_MOD_TARGET_SHIP_TYPES: Set<ShipType> = new Set([
    'FBB', 'BB', 'BBV',
    'CV', 'CVB', // 軽空は含まない
    'CA', 'CAV',
]);

export type ArmorPiercingType =
    | 'AP_G'
    | 'AP_G_S'
    | 'AP_G_R'
    | 'AP_G_S_R'

type PreInfo = {
    has_APShell: boolean,
    has_main_gun_L: boolean,
    has_sec_gun: boolean,
    has_radar: boolean,
}
const INITIAL: PreInfo = {
    has_APShell: false,
    has_main_gun_L: false,
    has_sec_gun: false,
    has_radar: false,
} as const;

const calc_pre_info = (
    equips: Equip[],
): PreInfo => {
    return equips.reduce((acc, equip) => {
        const { skill_trigger_type: skill_type } = equip;
        if (skill_type === 'B_AP_SHELL') acc.has_APShell = true;
        if (skill_type === 'B_MAIN_GUN') acc.has_main_gun_L = true;
        if (skill_type === 'B_SEC_GUN') acc.has_sec_gun = true;
        if (skill_type === 'B_RADAR') acc.has_radar = true;
        return acc;
    }, { ...INITIAL });
}

export function calc_AP_type(
    equips: Equip[],
): ArmorPiercingType | 'None' {
    const info = calc_pre_info(equips);
    const {
        has_APShell,
        has_main_gun_L,
        has_sec_gun,
        has_radar,
    } = info;

    if (!has_APShell || !has_main_gun_L) return 'None';

    if (has_radar && has_sec_gun) return 'AP_G_S_R';
    if (has_sec_gun) return 'AP_G_S';
    if (has_radar) return 'AP_G_R';
    return 'AP_G';
}

export type ArmorPiercingAccuracyMod =
    Brand<number, 'ArmorPiercingAccuracyMod'>

/**
 * 命中に係る徹甲弾補正(Mod_AP)を返す
 * @param AP_type 
 * @returns 
 */
export function calc_AP_accuracy_mod(
    AP_type: ArmorPiercingType | 'None'
): ArmorPiercingAccuracyMod {
    if (AP_type === 'None') return 1 as ArmorPiercingAccuracyMod;

    return match(AP_type)
        .with('AP_G', () => 1.1)
        .with('AP_G_R', () => 1.25)
        .with('AP_G_S', () => 1.2)
        .with('AP_G_S_R', () => 1.3)
        .exhaustive() as ArmorPiercingAccuracyMod;
}

export type ArmorPiercingAttackPowerMod =
    Brand<number, 'ArmorPiercingAccuracyMod'>

/**
 * 攻撃力に係る徹甲弾補正(Mod_AP)を返す
 * @param AP_type 
 * @returns 
 */
export function calc_AP_attack_power_mod(
    AP_type: ArmorPiercingType | 'None',
): ArmorPiercingAttackPowerMod {
    if (AP_type === 'None') return 1 as ArmorPiercingAttackPowerMod;

    return match(AP_type)
        .with('AP_G', () => 1.08)
        .with('AP_G_R', () => 1.1)
        .with('AP_G_S', () => 1.15)
        .with('AP_G_S_R', () => 1.15)
        .exhaustive() as ArmorPiercingAttackPowerMod;
}

/**
 * 目標艦が徹甲弾補正の対象艦種であるか判定して返す
 * @param target_ship 
 * @returns 
 */
export function is_AP_mod_target(
    target_ship: EquippedShip,
): boolean {
    return has_ship_type(AP_MOD_TARGET_SHIP_TYPES, target_ship.type_id);
}