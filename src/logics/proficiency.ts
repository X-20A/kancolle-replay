import { EquipType } from "@/datas/equip/base/player";
import { Equip, is_plane_equip, is_player_equip, PlaneEquip, PlayerEquip } from "@/models/equip/basic";

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
const calc_plane_proficiency_rank =
    (plane_proficiency: number): PlaneProficiencyRank => {
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
 * 制空ボーナスを返す    
 * https://wikiwiki.jp/kancolle/艦載機熟練度#ProficiencyAirpower
 * @param equip 
 * @returns 
 */
const calc_air_superiority_bonus = (equip: PlaneEquip): number => {
    const plane_proficiency = equip.plane_proficiency;
    const type_id = equip.type_id;

    const is_fighter = [
        "FIGHTER",
        "SEAPLANE_FIGHTER",
        "INTERCEPTOR"
    ].includes(type_id) || equip.flags.is_20th_family;

    const is_seaplane_bomber = type_id === "SEAPLANE_BOMBER";

    return (
        plane_proficiency >= 100 ? (is_fighter ? 22 : is_seaplane_bomber ? 6 : 0) :
            plane_proficiency >= 70 ? (is_fighter ? 14 : is_seaplane_bomber ? 3 : 0) :
                plane_proficiency >= 55 ? (is_fighter ? 9 : is_seaplane_bomber ? 1 : 0) :
                    plane_proficiency >= 40 ? (is_fighter ? 5 : is_seaplane_bomber ? 1 : 0) :
                        plane_proficiency >= 25 ? (is_fighter ? 2 : is_seaplane_bomber ? 1 : 0) :
                            0
    );
};

/**
 * 内部熟練ボーナスを返す    
 * https://wikiwiki.jp/kancolle/艦載機熟練度#ProficiencyAirpower
 * @param plane_proficiency 
 * @returns 
 */
const calc_internal_bonus =
    (plane_proficiency: number): number => Math.sqrt(plane_proficiency / 10);

/**
 * 航空機熟練度による制空値上昇値を返す
 * @param equip 
 * @returns 
 */
export function calc_plane_proficiency_flat(
    equip: PlayerEquip,
): number {
    if (!is_plane_equip(equip)) return 0;
    if (equip.type_id === "ASW_PLANE" && !equip.flags.is_20th_family) return 0;

    return calc_air_superiority_bonus(equip) + calc_internal_bonus(equip.plane_proficiency);
}

/**
 * 練度ごとの定数Cを返す    
 * @param equip 
 * @returns 
 */
const calc_constant = (equip: PlaneEquip): number => {
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
        if (!is_plane_equip(equip)) return total;

        total += Math.floor(Math.sqrt(equip.plane_proficiency) + calc_constant(equip))
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
    equip: PlaneEquip,
): number {
    if (equip.plane_proficiency >= 100) return 30;
    if (equip.plane_proficiency >=  55) return 15;
    if (equip.plane_proficiency >=  25) return  5;

    return 0;
}