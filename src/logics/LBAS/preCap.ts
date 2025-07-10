import { Rand } from "@/effects/random";
import { is_jet_bomber_equip, is_land_based_bomber, PlaneEquip } from "@/models/equip/basic";
import { LBAS, Squadron } from "@/models/LBAS";
import { AbyssalEquippedShip, includes_ship_type, is_install_type, is_submarine_category } from "@/models/ship/equipped";
import { RandValue } from "@/types/brands/other";
import { calc_basic_LBAS_attack_power, LbasBasePower } from "./basePower";
import { ModBoss } from "./postCap";

/// 基地航空隊のキャップ前攻撃力

const calc_mod_sp3 = (
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

    return 1;
}

/**
 * 陸偵補正値(Mod LBR)を返す
 * @param lbas 
 * @returns 
 */
const calc_land_based_scout_mod = (
    lbas: LBAS,
): number => {
    return lbas.squadrons.reduce((highest_value, squadron) => {
        const plane_name = squadron.plane.name_jp;

        // 陸偵が複数ある場合は最高値だけを返す
        if (plane_name === '二式陸上偵察機' || plane_name === 'Mosquito PR Mk.IV') {
            const MOD = 1.125;
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
    if (is_jet_bomber_equip(plane)) return 0.7071;
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

    return plane.natural_addition.asw >= 10
        ? 0.7 + rand_value * 0.3
        : 0.35 + rand_value * 0.45;
}

/**
 * ジェット爆撃機補正値(Mod Jet)を返す
 * @param plane 
 */
const calc_mod_jet_flat = (
    plane: PlaneEquip,
): number => {
    return is_jet_bomber_equip(plane)
        ? 0.5
        : 0;
}

export function calc_pre_cap_LBAS_attack_power(
    squadron: Squadron,
    target_ship: AbyssalEquippedShip,
    lbas: LBAS,
    mod_boss_pre_cap: number,
    rand: Rand,
): number {
    const base_LBAS_attack_power = calc_basic_LBAS_attack_power(
        squadron,
        target_ship,
    );
    const plane = squadron.plane;

    const mod_type = calc_mod_type(plane);
    const mod_jet_flat = calc_mod_jet_flat(plane);
    const mod_sp3 = calc_mod_sp3(plane, target_ship);

    const land_based_scout_mod = calc_land_based_scout_mod(lbas);
    const anti_submarine_mod =
        calc_anti_submarine_mod(plane, target_ship, rand.next());

    return base_LBAS_attack_power
        * mod_type
        * anti_submarine_mod
        * land_based_scout_mod
        * mod_sp3
        * mod_boss_pre_cap
        + mod_jet_flat;
}