import { is_dive_bomber, is_land_based_bomber, PlaneEquip } from "@/models/equip/basic";
import { AbyssalFleet, is_combined_fleet } from "@/models/fleet/Fleet";
import { AbyssalEquippedShip, includes_abyssal_ship_id, is_PT } from "@/models/ship/equipped";
import { RandValue } from "@/types/brands/other";
import { calc_pre_cap_LBAS_attack_power } from "./preCap";
import { Rand } from "@/effects/random";
import { LBAS, Squadron } from "@/models/LBAS";
import { calc_capped_attack_power } from "../cap";
import { AbyssalShipId } from "@/types/ship/abyssalId";

export type ModBoss = { // ほんまにこんな仕様なんかと
    pre_cap: number,
    post_cap: number,
}
/**
 * 特定の目標に対する攻撃力加算値(Mod Sp1)を返す    
 * ? 確率や値はSortie Simの独自調査か暫定値?
 * @param target_ship 
 * @param rand_value 
 * @returns 
 */
const calc_mod_boss = (
    plane: PlaneEquip,
    target_ship: AbyssalEquippedShip,
    rand_value: RandValue,
): ModBoss => {
    const target_ship_id = target_ship.master_id;
    if (includes_abyssal_ship_id([1557, 1586], target_ship_id)) {
        return { // 戦艦棲姫, 空母棲姫
            pre_cap: 1,
            post_cap: rand_value < 0.35 ? 3: 1.7
        };
    }
    if (is_PT(target_ship)) return {
        pre_cap: 1,
        post_cap: rand_value < 0.4 ? 0.7 : 0.4,
    };
    if (includes_abyssal_ship_id([1653, 1654, 1655, 1656, 1657, 1658], target_ship_id)) {
        return { // 集積地系
            pre_cap: 1,
            post_cap: rand_value < 0.4 ? 3.5 : 1.7
        };
    }
    if (includes_abyssal_ship_id([1665, 1666, 1667], target_ship_id)) {
        return { // 砲台小鬼系
            pre_cap: 1,
            post_cap: rand_value < 0.5 ? 2.5 : 1.6,
        };
    }
    if (includes_abyssal_ship_id([1668, 1669, 1670, 1671, 1672], target_ship_id)) {
        return { // 離島棲姫系
            pre_cap: 1,
            post_cap: rand_value < 0.4 ? 2.0 : 1.5,
        };
    }
    if (includes_abyssal_ship_id([1696, 1697, 1698], target_ship_id)) {
        return { // 離島棲姫系
            pre_cap: 1,
            post_cap: rand_value < 0.4 ? 1.8 : 1.5,
        };
    }
    if (includes_abyssal_ship_id([1699, 1700, 1701, 1702, 1703, 1704], target_ship_id)) {
        return {// 離島棲姫系
            pre_cap: 1,
            post_cap: rand_value < 0.5 ? 1.5 : 1.2,
        };
    }
    if (target_ship_id === 1751) return { // 空母夏鬼
        pre_cap: 1,
        post_cap: rand_value < 0.4 ? 1.7 : 1.3,
    };
    if (includes_abyssal_ship_id([2178, 2179, 2196, 2197], target_ship_id)) {
        return { // トーチカ小鬼系
            pre_cap: 1,
            post_cap: rand_value < 0.5 ? 2.2 : 1.5,
        };
    }
    if (includes_abyssal_ship_id([2180, 2181], target_ship_id)) {
        return { // 対空小鬼系
            pre_cap: 1,
            post_cap: rand_value < 0.5 ? 1.6 : 1.3,
        };
    }
    if (includes_abyssal_ship_id([2188, 2189, 2190, 2191], target_ship_id)) {
        return { // トーチカ要塞棲姫系
            pre_cap: 1,
            post_cap: rand_value < 0.4 ? 1.8 : 1.4,
        };
    }

    const weak_mod = is_dive_bomber(plane)
        ? target_ship.dive_bomb_weak_mod
        : target_ship.land_based_weak_mod;
    return {
        pre_cap: weak_mod,
        post_cap: 1,
    };
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

type SupplyDepotMod = {
    new_attack_power: number,
    new_post_mod: number,
}
/**
 * 対集積地補正を返す
 * @param target_ship 
 * @param attack_power 
 * @param post_mod 
 * @returns 
 */
const calc_anti_supply_depot_mod = (
    target_ship: AbyssalEquippedShip,
    attack_power: number,
    post_mod: number,
): SupplyDepotMod => {
    // これ以降のIDの集積地は含まないみたい Sortie Simより
    // calc_mod_bossにも同様のマッチングがある
    const VALID_SUPPLY_DEPOT_IDS: AbyssalShipId[] =
        [1653, 1654, 1655, 1656, 1657, 1658];
    
    if (VALID_SUPPLY_DEPOT_IDS.includes(target_ship.master_id)) {
        return {
            new_attack_power: attack_power * target_ship.dive_bomb_weak_mod + 100,
            new_post_mod: post_mod / target_ship.dive_bomb_weak_mod,
        };
    }

    return {
        new_attack_power: attack_power,
        new_post_mod: post_mod,
    };
}

/**
 * 対PT補正を返す
 * @param target_ship 
 * @param rand_value 
 * @returns 
 */
const calc_anti_PT_mod = (
    target_ship: AbyssalEquippedShip,
    rand_value: RandValue,
): number => {
    if (!is_PT(target_ship)) return 1;

    return rand_value < 0.5
        ? 0.5
        : 0.8;
}

export function calc_final_LBAS_attack_power(
    squadron: Squadron,
    lbas: LBAS,
    target_ship: AbyssalEquippedShip,
    target_fleet: AbyssalFleet,
    contact_mod: number,
    rand: Rand,
): number {
    // TODO: 対潜攻撃の場合を分離したい 対地はなんとも、わからん
    const plane = squadron.equip;
    const {
        pre_cap: mod_boss_pre_cap,
        post_cap: mod_boss_post_cap,
    } = calc_mod_boss(plane, target_ship, rand.next());

    const pre_cap_attack_power = calc_pre_cap_LBAS_attack_power(
        squadron,
        target_ship,
        lbas,
        mod_boss_pre_cap,
        rand,
    );

    const capped_attack_power = Math.floor(
        calc_capped_attack_power(
            pre_cap_attack_power,
            'lbas',
        )
    );

    const land_based_bomber_mod = calc_land_based_bomber_mod(plane);
    const combined_fleet_mod = calc_combined_fleet_mod(target_fleet);
    // Sortie Simではここで水偵だった場合にここまでのpostModを0にしている
    // ACSimがソースであるらしい

    const {
        new_attack_power,
        new_post_mod,
    } = calc_anti_supply_depot_mod(
        target_ship,
        capped_attack_power,
        mod_boss_post_cap * land_based_bomber_mod * combined_fleet_mod,
    );
    const anti_PT_mod = calc_anti_PT_mod(target_ship, rand.next());

    return new_attack_power
        * new_post_mod
        * contact_mod
        * anti_PT_mod;
}