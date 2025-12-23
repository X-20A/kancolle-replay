import { EquipType } from "@/datas/equip/base/player";
import { is_player_plane_equip, PlayerPlaneEquip, PlayerEquip, includes_equip_type } from "@/models/equip/basic";
import { EquipSlot } from "@/models/ship/EquipSlot";
import { AvgProficiency, brandAvgProficiency } from "@/types/brands/other";

/// 航空機熟練度系

/**
 * 航空機熟練度ランク    
 * 使わないかも
 */
export type PlaneProficiencyRank =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7

/**
 * 航空機熟練度に対応した熟練度ランクを返す
 * @param plane_proficiency 
 * @returns 
 */
const calc_plane_proficiency_rank = (
    plane_proficiency: number,
): PlaneProficiencyRank => {
    if (plane_proficiency >= 100) return 7;
    if (plane_proficiency >=  85) return 6;
    if (plane_proficiency >=  70) return 5;
    if (plane_proficiency >=  55) return 4;
    if (plane_proficiency >=  40) return 3;
    if (plane_proficiency >=  25) return 2;
    if (plane_proficiency >=  10) return 1;

    return 0;
}

/**
 * 練度ごとのクリティカル定数Cを返す    
 * @param equip 
 * @returns 
 */
const calc_critical_constant = (equip: PlayerPlaneEquip): number => {
    const plane_proficiency = equip.plane_proficiency;

    if (plane_proficiency >= 100) return 10;
    if (plane_proficiency >=  80) return 7;
    if (plane_proficiency >=  70) return 5;
    if (plane_proficiency >=  55) return 4;
    if (plane_proficiency >=  40) return 3;
    if (plane_proficiency >=  25) return 2;
    if (plane_proficiency >=  10) return 1;

    return 0;
}

/**
 * 熟練度クリティカル補正を返す
 * https://wikiwiki.jp/kancolle/艦載機熟練度#ProficiencyValue
 * @param equips 
 * @returns 
 */
export function calc_plane_proficiency_critical_mod(equips: PlayerEquip[]): number {
    return equips.reduce((total, equip, index) => {
        if (!is_player_plane_equip(equip)) return total;

        total += Math.floor(Math.sqrt(equip.plane_proficiency) + calc_critical_constant(equip))
            / (index === 0 ? 100 : 200);

        return total;
    }, 0);
}

/**
 * 索敵フェイズにおける航空機熟練度加算値    
 * https://en.kancollewiki.net/Combat/Day_Battle#Detection
 * @param equip 
 * @returns 
 */
export function calc_plane_proficiency_detection_flat(
    equip: PlayerPlaneEquip,
): number {
    if (equip.plane_proficiency >= 100) return 30;
    if (equip.plane_proficiency >=  55) return 15;
    if (equip.plane_proficiency >=  25) return  5;

    return 0;
}

/**
 * 艦載機熟練度命中補正の定数を返す
 * @param proficiency 
 * @returns 
 */
const calc_accuracy_constant = (
    proficiency: number,
): number => {
    if (proficiency >= 100) return 9;
    if (proficiency >= 85) return 6;
    if (proficiency >= 70) return 4;
    if (proficiency >= 55) return 3;
    if (proficiency >= 40) return 2;
    if (proficiency >= 25) return 1;
    return 0;
}

/**
 * 艦載機熟練度命中補正を返す
 * @param proficiency 
 * @returns 
 */
export function calc_plane_proficiency_accuracy_flat(
    proficiency: number,
): number {
    return Math.sqrt(0.1 * proficiency)
        + calc_accuracy_constant(proficiency);
}

/**
 * 装備群から平均航空機熟練度を返す
 * @param planes 
 * @returns 
 */
export function calc_average_proficiencyfrom_equips(
    planes: PlayerPlaneEquip[],
): AvgProficiency {
    const avg_proficiency = planes.reduce((total, plane) => {
        return total + plane.plane_proficiency;
    }, 0) / planes.length;

    return brandAvgProficiency(avg_proficiency);
}

export function calc_average_proficiencyfrom_equip_slots(
    slots: EquipSlot[],
): AvgProficiency {
    const avg_proficiency = slots.reduce((total, slot) => {
        const equip = slot.equip;
        if (!equip || !is_player_plane_equip(equip)) return total;
        return total + equip.plane_proficiency;
    }, 0) / slots.length;

    return brandAvgProficiency(avg_proficiency);
}