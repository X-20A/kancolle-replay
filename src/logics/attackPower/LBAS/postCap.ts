import { is_land_based_bomber, PlaneEquip } from "@/models/equip/basic";
import { AbyssalFleet, is_combined_fleet } from "@/models/fleet/Fleet";
import { AbyssalEquippedShip, includes_abyssal_ship_id, is_PT } from "@/models/ship/equipped";
import { RandValue } from "@/types/brands/other";
import { calc_pre_cap_LBAS_attack_power } from "./preCap";
import { RandGenerator } from "@/effects/random";
import { LBAS, LbasJetSquadron } from "@/models/LBAS";
import { calc_capped_attack_power } from "../../cap";
import { ValidLbasCombination } from "../../target/LBAS";
import { HitType } from "../../accuracy";
import { calc_critical_mod } from "../../critical";

/**
 * 特定の目標に対する攻撃力乗算値(Mod Boss)を返す    
 * Mod Boss
 * ? 確率や値はSortie Simの独自調査か暫定値?
 * @param target_ship 
 * @param rand_value 
 * @returns 
 */
const calc_mod_boss = (
    target_ship: AbyssalEquippedShip,
    rand_value: RandValue,
): number => {
    const target_ship_id = target_ship.master_id;
    if (includes_abyssal_ship_id([1557, 1586], target_ship_id)) {
        return rand_value < 0.35
            ? 3
            : 1.7;
    }
    if (is_PT(target_ship)) {
        return rand_value < 0.4
            ? 0.7
            : 0.4;
    }
    if (includes_abyssal_ship_id([1653, 1654, 1655, 1656, 1657, 1658], target_ship_id)) {
        // 集積地系
        return rand_value < 0.4
            ? 3.5
            : 1.7;
    }
    if (includes_abyssal_ship_id([1665, 1666, 1667], target_ship_id)) {
        // 砲台小鬼系
        return rand_value < 0.5
            ? 2.5
            : 1.6;
    }
    if (includes_abyssal_ship_id([1668, 1669, 1670, 1671, 1672], target_ship_id)) {
        // 離島棲姫系
        return rand_value < 0.4
            ? 2.0
            : 1.5;
    }
    if (includes_abyssal_ship_id([1696, 1697, 1698], target_ship_id)) {
        // 離島棲姫系
        return rand_value < 0.4
            ? 1.8
            : 1.5;
    }
    if (includes_abyssal_ship_id([1699, 1700, 1701, 1702, 1703, 1704], target_ship_id)) {
        // 離島棲姫系
        return rand_value < 0.5
            ? 1.5
            : 1.2;
    }
    if (target_ship_id === 1751) { 
        // 空母夏鬼
        return rand_value < 0.4
            ? 1.7
            : 1.3;
    }
    if (includes_abyssal_ship_id([2178, 2179, 2196, 2197], target_ship_id)) {
        // トーチカ小鬼系
        return rand_value < 0.5
            ? 2.2
            : 1.5;
    }
    if (includes_abyssal_ship_id([2180, 2181], target_ship_id)) {
        // 対空小鬼系
        return rand_value < 0.5
            ? 1.6
            : 1.3;
    }
    if (includes_abyssal_ship_id([2188, 2189, 2190, 2191], target_ship_id)) {
        // トーチカ要塞棲姫系
        return rand_value < 0.4
            ? 1.8
            : 1.4;
    }

    // ! 以下は Mod Boss 判明前の敵で検証データが無い。再登場時には検証が必要
    // TODO: dive_bomb_weak, LB_weak と帳尻を合わせた補正値を設定
    if (target_ship_id === 1620) {
        // 空母棲姫
    }
    if (includes_abyssal_ship_id([1684, 1685, 1686, 1687, 1688, 1689], target_ship_id)) {
        // 中枢棲姫系
    }
    if (includes_abyssal_ship_id([1690, 1691, 1692], target_ship_id)) {
        // 駆逐古姫系
    }

    return 1;
}

/**
 * 陸攻補正値(Mod LBB)を返す
 * @param plane 
 * @returns 
 */
const calc_land_based_bomber_mod = (
    plane: PlaneEquip,
): number => {
    return is_land_based_bomber(plane)
        ? 1.8
        : 1;
}

/**
 * 連合艦隊補正(Mod CF)を返す
 * @param target_fleet 
 * @returns 
 */
const calc_combined_fleet_mod = (
    target_fleet: AbyssalFleet,
): number => {
    return is_combined_fleet(target_fleet)
        ? 1.1
        : 1;
}

/**
 * 索敵機補正値を返す
 * ? 水偵の対潜攻撃力は極めて低く、クリティカルですら割合圏内であり、具体的な値は分からない。暫定的に0とする
 * https://x.com/CC_jabberwock/status/966295523949817856
 * @param plane 
 * @returns 
 */
const calc_seaplane_mod = (
    plane: PlaneEquip,
): number => {
    return plane.type_id === 'SEAPLANE'
        ? 0
        : 1;
}

/**
 * 航空中隊の最終攻撃力を返す
 * @param squadron 
 * @param lbas 
 * @param target_ship 
 * @param target_fleet 
 * @param contact_mod 
 * @param rand 
 * @returns 
 */
export function calc_LBAS_attack_power(
    combination: ValidLbasCombination,
    lbas: LBAS,
    target_fleet: AbyssalFleet,
    contact_mod: number,
    hit_type: HitType,
    rand: RandGenerator,
): number {
    // TODO: 対潜攻撃の場合を分離したい 対地はなんとも、わからん
    const { attacker_squadron, target_unit } = combination;
    const { equip: plane } = attacker_squadron;
    const { ship: target_ship } = target_unit;

    const mod_boss = calc_mod_boss(target_ship, rand.next());

    const pre_cap_attack_power = calc_pre_cap_LBAS_attack_power(
        combination,
        lbas,
        rand,
    );

    const capped_attack_power = Math.floor(
        calc_capped_attack_power(
            pre_cap_attack_power,
            'lbas',
        ),
    );

    const land_based_bomber_mod = calc_land_based_bomber_mod(plane);
    const combined_fleet_mod = calc_combined_fleet_mod(target_fleet);
    const seaplane_mod = calc_seaplane_mod(plane);

    const critical_mod = calc_critical_mod(hit_type);

    return capped_attack_power
        * mod_boss
        * land_based_bomber_mod
        * combined_fleet_mod
        * seaplane_mod
        * contact_mod
        * critical_mod;
}

/**
 * 基地噴式強襲の最終攻撃力を返す
 * @param squadron 
 * @param target_ship 
 * @param hit_type 
 * @param rand_value 
 * @returns 
 */
export function calc_jet_LBAS_assault_attack_power(
    squadron: LbasJetSquadron,
    target_ship: AbyssalEquippedShip,
    hit_type: HitType,
    rand_value: RandValue,
): number {
    const { equip: plane } = squadron;
    const basic_attack_power =
        plane.natural_addition.aerial_bomb_power * Math.sqrt(squadron.slot_count)
        + 25;

    // ? 基地噴式強襲において目標別補正が有効か分からない
    const mod_boss = calc_mod_boss(target_ship, rand_value);

    const critical_mod = calc_critical_mod(hit_type);

    // 基地航空隊キャップ値(220)に届きようが無いので処理スキップ
    return Math.floor(
        Math.floor(basic_attack_power)
            * mod_boss
            * critical_mod
    );
}

export const __LBAS_post_cap_test__  = {
    calc_mod_boss,
} as const;