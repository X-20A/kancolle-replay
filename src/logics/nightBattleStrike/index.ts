import { EquippedShip, includes_ship_type, is_carrier_vessel_category } from "@/models/ship/equipped";
import { calc_CVs_night_battle_CI_types } from "./CVs";
import { calc_gun_ship_night_battle_strike_types } from "./gunShip";
import { calc_submarine_CIs } from "./Submarine";

/// 夜戦 連撃|CI

const NIGHT_BATTLE_STRIKE_TYPES = {
    double_attack: 1,
    Mixed_CI: 2,
    Torpedo_CI: 3,
    Sec_Gun_CI: 4,
    Main_Gun_CI: 5,

    DDCI_GTR: 7,
    DDCI_LTR: 8,
    DDCI_TTL: 9,
    DDCI_RDL: 10,
    CVCI_FFA: 61,
    CVCI_FA: 62,
    CVCI_FB: 63,
    CVCI_F_DUAL: 64,
    Night_Zuiun_CI_ZZR: 2001,
    Night_Zuiun_CI_ZZ: 2002,
    Night_Zuiun_CI_ZR: 2003,
    Night_Zuiun_CI_Z: 2004,

    // Sortie Simに無い
    SSCI_TR: 100,
    SSCI_TT: 101,
} as const;
export type NightBattleStrikeType = keyof typeof NIGHT_BATTLE_STRIKE_TYPES

/**
 * 夜戦における発動可能な 連撃|CI の種別群を返す
 * @param attacker_ship 
 * @returns 
 */
export function calc_accuracy_night_battle_CI_types(
    attacker_ship: EquippedShip,
    target_ship: EquippedShip,
): NightBattleStrikeType[] {
    if (includes_ship_type(['SS', 'SSV'], target_ship.type_id)) {
        return calc_submarine_CIs(attacker_ship);
    }
    
    if (
        is_carrier_vessel_category(attacker_ship) ||
        attacker_ship.type_id === 'AO'
    ) return calc_CVs_night_battle_CI_types(attacker_ship);

    return calc_gun_ship_night_battle_strike_types(attacker_ship);
}