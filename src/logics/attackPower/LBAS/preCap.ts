import { RandGenerator } from "@/effects/random";
import { is_jet_bomber, is_land_based_bomber, PlaneEquip } from "@/models/equip/basic";
import { LBAS, LbasSquadron } from "@/models/LBAS";
import { AbyssalEquippedShip, includes_ship_type, is_install_type, is_submarine_category } from "@/models/ship/equipped";
import { RandValue } from "@/types/brands/other";
import { calc_basic_LBAS_attack_power } from "./basePower";
import { ValidLbasCombination } from "../../target/LBAS";

/// 基地航空隊のキャップ前攻撃力

/**
 * 特定の目標に対する攻撃力乗算値(Mod Sp3)を返す    
 * 現状 B-25 専用
 * @param plane 
 * @param target_ship 
 * @returns 
 */
const calc_mod_sp3_multiplier = (
    plane: PlaneEquip,
    target_ship: AbyssalEquippedShip,
): number => {
    if (plane.name_jp !== 'B-25') return 1;

    if (is_install_type(target_ship)) return 0.9;

    const target_ship_type = target_ship.type_id;
    if (target_ship_type === 'DD') return 1.9;
    if (includes_ship_type(['CL', 'CLT', 'AV'], target_ship_type)) return 1.75;
    if (includes_ship_type(['CA', 'CAV'], target_ship_type)) return 1.6;
    if (
        includes_ship_type(['CVL', 'FBB', 'BB', 'BBV', 'CV', 'AT'], target_ship_type)
    ) return 1.3;

    return 1; // 到達しないかも
}

/**
 * 陸偵補正値(Mod LBR)を返す    
 * 陸偵が複数ある場合は最高値を返す
 * @param lbas 
 * @returns 
 */
const calc_land_based_scout_mod = (
    lbas: LBAS,
): number => {
    return lbas.squadrons.reduce((highest_value, squadron) => {
        const plane_name = squadron.equip.name_jp;

        // ? 日wikiにはMosquiteの記載がない
        if (plane_name === '二式陸上偵察機' || plane_name === 'Mosquito PR Mk.IV') {
            // ? 日wiki: 1.125, ENwiki: 1.12
            const MOD = 1.12;
            return Math.max(highest_value, MOD);
        }
        if (plane_name === '二式陸上偵察機(熟練)') {
            const MOD = 1.15;
            return Math.max(highest_value, MOD);
        }

        return highest_value;
    }, 1);
}

/**
 * 基地航空隊の基本攻撃力に使用する種別倍率(Mod type)を返す
 * @param plane 
 * @returns 
 */
const calc_mod_type = (
    plane: PlaneEquip,
): number => {
    if (is_land_based_bomber(plane)) return 0.8;
    // ? 日wiki: 0.7071(1 / √2), ENwiki: 0.7
    // ? 暫定: 0.7 以下の検証より
    // https://x.com/CC_jabberwock/status/1939699963778457773/photo/1
    // https://x.com/kancolle_aki/status/1940740730487804068/photo/1
    if (is_jet_bomber(plane)) return 0.7;
    return 1;
}

/**
 * 対潜補正値を返す
 * @param target_ship 
 * @returns 
 */
const calc_anti_submarine_mod = (
    plane: PlaneEquip,
    target_ship: AbyssalEquippedShip,
    rand_value: RandValue,
): number => {
    if (!is_submarine_category(target_ship)) return 1;

    return plane.natural_addition.asw_power >= 10
        ? 0.7 + rand_value * 0.3 // 0.7 - 1.0
        : 0.35 + rand_value * 0.45; // 0.35 - 0.8
}

/**
 * ジェット爆撃機補正値(Mod Jet)を返す
 * @param plane 
 */
const calc_mod_jet_flat = (
    plane: PlaneEquip,
): number => {
    return is_jet_bomber(plane)
        ? 0.5
        : 0;
}

/**
 * キャップ前補正値を返す
 * @param squadron 
 * @param target_ship 
 * @param lbas 
 * @param mod_boss_pre_cap 
 * @param rand_value 
 * @returns 
 */
const calc_pre_cap_mod = (
    squadron: LbasSquadron,
    target_ship: AbyssalEquippedShip,
    lbas: LBAS,
    rand_value: RandValue
): number => {
    const plane = squadron.equip;

    const mod_type = calc_mod_type(plane);
    const mod_sp3 = calc_mod_sp3_multiplier(plane, target_ship);
    const land_based_scout_mod = calc_land_based_scout_mod(lbas);
    const anti_submarine_mod =
        calc_anti_submarine_mod(plane, target_ship, rand_value);

    return mod_type
        * mod_sp3
        * land_based_scout_mod
        * anti_submarine_mod;
}

/**
 * キャップ前攻撃力を返す    
 * 乱数が絡むのは対潜時のみ 分けたい
 * @param combination 
 * @param lbas 
 * @param rand 
 * @returns 
 */
export function calc_pre_cap_LBAS_attack_power(
    combination: ValidLbasCombination,
    lbas: LBAS,
    rand: RandGenerator,
): number {
    const { attacker_squadron, target_unit } = combination;
    const { ship: target_ship } = target_unit;

    const base_LBAS_attack_power =
        calc_basic_LBAS_attack_power(combination);
    
    const total_pre_cap_mod = calc_pre_cap_mod(
        attacker_squadron,
        target_ship,
        lbas,
        rand.next(),
    );
    const mod_jet_flat = calc_mod_jet_flat(attacker_squadron.equip);

    // ? Mod Jetの評価タイミングは確定していない(どちらでも有意な差が出ない)
    return base_LBAS_attack_power
        * total_pre_cap_mod
        + mod_jet_flat;
}

export const __LBAS_pre_cap_test__ = {
    calc_mod_sp3_multiplier,
    calc_land_based_scout_mod,
    calc_anti_submarine_mod,
    calc_pre_cap_LBAS_attack_power,
} as const;