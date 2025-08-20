

// ? 補正値や加算値が独自調査か暫定値か分からない

import { PlayerPlaneEquip } from "@/models/equip/basic";
import { AbyssalFleet, is_combined_fleet } from "@/models/fleet/Fleet";
import { AbyssalEquippedShip, includes_abyssal_ship_id, includes_ship_type, is_abyssal_ship, is_install_type, is_PT } from "@/models/ship/equipped";
import { Accuracy } from ".";
import { LBASAccuracyBalloonMod } from "../balloon";

/**
 * 陸攻の目標艦種別の命中補正値(Mod_Boss)を返す
 * @param unit 
 * @param target_ship 
 * @returns 
 */
const calc_Mod_Boss = (
    unit: PlayerPlaneEquip,
    target_ship: AbyssalEquippedShip,
): number => {
    const target_ship_id = target_ship.master_id;

    if (includes_abyssal_ship_id([1557, 1586], target_ship_id)) { // 戦艦棲姫 | 空母棲姫
        return 1.1;
    }
    if (is_abyssal_ship(target_ship) && target_ship.flags.is_Summer_BB) {
        return 1.1;
    }
    if (includes_abyssal_ship_id([1665, 1666, 1667], target_ship_id)) { // 砲台小鬼系
        return 1.06;
    }
    if (includes_abyssal_ship_id([2178, 2179, 2196, 2197], target_ship_id)) { // トーチカ系
        return 1.06;
    }
    if (includes_abyssal_ship_id([2180, 2181], target_ship_id)) { // 対空小鬼系
        return 1.15;
    }
    if (is_PT(target_ship)) {
        if (unit.name_jp === 'B-25') {
            // ? B-25が他の機体より対PT命中が低いという資料は見当たらない Sortie Simより
            return 0.85;
        }

        return 0.95;
    }

    return 1;
}

/**
 * 陸攻の目標艦種別の命中加算値(ACC_Sp)を返す
 * @param plane 
 * @param target_ship 
 * @returns 
 */
const calc_ACC_Sp = (
    plane: PlayerPlaneEquip,
    target_ship: AbyssalEquippedShip,
): number => {
    const plane_name = plane.name_jp;
    const ship_type = target_ship.type_id;

    if (plane_name === 'キ102乙') {
        if (ship_type === 'DD') return 7;
    }
    if (plane_name === 'キ102乙改+イ号一型乙 誘導弾') {
        if (ship_type === 'DD') return -17;
        if (includes_ship_type(['CL', 'CLT'], ship_type)) return 7;
        if (includes_ship_type(['CA', 'CAV', 'CVL', 'FBB', 'BB', 'BBV', 'CV'], ship_type)) return 5;
    }
    if (plane_name === '四式重爆 飛龍+イ号一型甲 誘導弾') {
        if (ship_type === 'DD') return -7;
        if (includes_ship_type(['CL', 'CLT', 'CVL', 'FBB', 'BB', 'BBV', 'CV'], ship_type)) return 7;
    }
    if (plane_name === '四式重爆 飛龍(熟練)+イ号一型甲 誘導弾') {
        if (ship_type === 'DD') return -5;
        if (includes_ship_type(['CL', 'CLT', 'CA', 'CAV', 'CVL', 'FBB', 'BB', 'BBV', 'CV'], ship_type)) return 5;
    }
    if (plane.flags.is_skip_bomber) { // B-25 & 深海の反跳爆撃系機体
        if (is_install_type(target_ship)) return -9
        if (includes_ship_type(['FBB', 'BB', 'BBV', 'CVL', 'CV', 'AT'], ship_type)) return 31;
        if (includes_ship_type(['CA', 'CAV'], ship_type)) return 22;
        if (includes_ship_type(['CL', 'CLT', 'AV'], ship_type)) return 18;
        if (ship_type === 'DD' && !is_PT(target_ship)) return 13;
    }

    return 0;
}

/**
 * 連合艦隊補正を返す
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
 * 基地航空隊の命中項を返す
 * @param unit 
 * @param target_fleet 
 * @param target_ship 
 * @returns 
 */
export function calc_lbas_accuracy(
    unit: PlayerPlaneEquip,
    target_fleet: AbyssalFleet,
    target_ship: AbyssalEquippedShip,
    balloon_mod: LBASAccuracyBalloonMod,
    // formation_mod, vanguard_modは不要
): Accuracy {
    /**
     * 命中定数    
     * https://docs.google.com/spreadsheets/d/14YMmfDkCLXbGvkg1KUJnouZEDgtl7aaK6uf7Z1NvzAk/edit?gid=0#gid=0
     */
    const ACCURACY_CONSTANT = 90;

    const mod_boss = calc_Mod_Boss(unit, target_ship);
    const acc_sp = calc_ACC_Sp(unit, target_ship);

    const combined_fleet_mod = calc_combined_fleet_mod(target_fleet);

    // NOTE: 機体の疲労度補正は見送り
    // NOTE: 熟練度補正は関係無し
    const accuracy = (
        ACCURACY_CONSTANT
        + 7 * unit.natural_addition.accuracy * mod_boss
        + acc_sp
    ) * balloon_mod * combined_fleet_mod;

    return accuracy as Accuracy;
}