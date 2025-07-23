import { EquippedShip, is_carrier_vessel_category } from "@/models/ship/equipped";
import { calc_CVs_night_battle_CI_types } from "./CVs";
import { calc_gun_ship_night_battle_strike_types } from "./gunShip";

/// 夜戦 連撃|CI

const NIGHT_BATTLE_STRIKE_TYPES = {
    double_attack: 1,
    Mixed_CI: 2,
    Torpedo_CI: 3,
    Sec_Gun_CI: 4,
    Main_Gun_CI: 5,
    CVCI_FFA: 61,
    CVCI_FA: 62,
    CVCI_FB: 63,
    CVCI_F_DUAL: 64,
} as const;
export type NightBattleStrikeType = keyof typeof NIGHT_BATTLE_STRIKE_TYPES

/**
 * 夜戦における発動可能な 連撃|CI の種別群を返す
 * @param attacker_ship 
 * @returns 
 */
export function calc_accuracy_night_battle_CI_types(
    attacker_ship: EquippedShip,
): NightBattleStrikeType[] {
    const { type_id: ship_type } = attacker_ship;
    if (
        is_carrier_vessel_category(attacker_ship) ||
        ship_type === 'AO'
    ) return calc_CVs_night_battle_CI_types(attacker_ship);

    return calc_gun_ship_night_battle_strike_types(attacker_ship);
}