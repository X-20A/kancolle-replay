import { EquippedShip, includes_ship_type, is_carrier_vessel_category } from "@/models/ship/equipped";
import { calc_CVs_night_battle_CI_types } from "./CVs";
import { calc_gun_ship_night_battle_strike_types } from "./gunShip";
import { calc_submarine_CIs } from "./Submarine";
import { is_DDCI, NIGHT_BATTLE_STRIKE_DATAS } from "@/datas/nightBattle";
import { is_random_succeed, RandGenerator } from "@/effects/random";
import { Brand } from "@/types/brands";
import { calc_night_battle_CI_pre_rate } from "./preRate";
import { FleetUnit } from "@/models/fleet/FleetUnit";
import { CIRateStarShellMod } from "../nightBattleEquips/starShell";
import { CIRateSearchlightMod } from "../nightBattleEquips/searchLight";
import { calc_D_gun_mod } from "./Dgun";

/// 夜戦 連撃|CI
/// 正直かなり気持ち悪い処理になってるのでなんとか整理したい

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
export function calc_night_battle_CI_types(
    attacker_ship: EquippedShip,
    target_ship: EquippedShip | 'Not_specified',
): NightBattleStrikeType[] {
    if (includes_ship_type(['SS', 'SSV'], attacker_ship.type_id)) {
        return calc_submarine_CIs(attacker_ship);
    }
    
    if (
        is_carrier_vessel_category(attacker_ship) ||
        attacker_ship.type_id === 'AO'
    ) return calc_CVs_night_battle_CI_types(attacker_ship);

    return calc_gun_ship_night_battle_strike_types(
        attacker_ship,
        target_ship,
    );
}

export type CIPowerMod = Brand<number, 'CIPowerMod'>
export type CIAccuracyMod = Brand<number, 'CIAccuracyMod'>
export type CIChanceMod = Brand<number, 'CIChanceMod'>
export type CIAttackCount = Brand<number, 'CIAttackCount'>

export type CIInfo = {
    CI_power_mod: CIPowerMod,
    CI_accuracy_mod: CIAccuracyMod,
    CI_attack_count: CIAttackCount,
}

export function calc_triggered_night_battle_strike_info(
    fleet_unit: FleetUnit,
    strike_types: NightBattleStrikeType[],
    star_shell_mod: CIRateStarShellMod,
    searchlight_mod: CIRateSearchlightMod,
    rand: RandGenerator,
): CIInfo | 'Misfire' {
    if (strike_types.length === 0) return 'Misfire';

    const pre_rate = calc_night_battle_CI_pre_rate(
        fleet_unit,
        star_shell_mod,
        searchlight_mod,
    );
    const { ship } = fleet_unit;
    for (const strike_type of strike_types) {
        const strike_data = NIGHT_BATTLE_STRIKE_DATAS[strike_type];
        const is_two_hit_DDCI =
            is_DDCI(strike_data) &&
            ship.lv >= 80 &&
            is_random_succeed(strike_data.replace_rate, rand.next());
        const chance_mod = is_two_hit_DDCI
            ? strike_data.replace_rate
            : strike_data.chanceMod;
        const attack_count = is_two_hit_DDCI
            ? strike_data.replaced_hit_count
            : strike_data.numHits;
        const rate = strike_type === 'double_attack'
            ? 0.99 // 連撃は計算でなく固定
            : pre_rate / chance_mod;

        if (!is_random_succeed(rate, rand.next())) continue;

        const D_gun_mod = calc_D_gun_mod(strike_type, ship.equip_slots);

        return {
            CI_power_mod: strike_data.dmgMod * D_gun_mod as CIPowerMod,
            CI_accuracy_mod: strike_data.accMod as CIAccuracyMod,
            CI_attack_count: attack_count as CIAttackCount,
        };
    }

    return 'Misfire';
}