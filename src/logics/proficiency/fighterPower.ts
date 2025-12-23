import { EquipType } from "@/datas/equip/base/player";
import { has_equip_type, is_player_plane_equip, PlayerEquip, PlayerPlaneEquip } from "@/models/equip/basic";
import { Brand } from "@/types/brands";

type BonusData = Readonly<{
    min_proficiency: number,
    value: number,
}>

const FIGHTER_BONUSES: BonusData[] = [
    { min_proficiency: 100, value: 22 },
    { min_proficiency: 70, value: 14 },
    { min_proficiency: 55, value: 9 },
    { min_proficiency: 40, value: 5 },
    { min_proficiency: 25, value: 2 },
];

const SEAPLANE_BOMBER_BONUSES: BonusData[] = [
    { min_proficiency: 100, value: 6 },
    { min_proficiency: 70, value: 3 },
    { min_proficiency: 55, value: 1 },
];

const get_bonus = (
    bonus_datas: BonusData[],
    proficiency: number,
): number => {
    for (const { min_proficiency, value } of bonus_datas) {
        if (proficiency >= min_proficiency) {
            return value;
        }
    }
    return 0;
};

const FIGHTER_CATEGORY: Set<EquipType> = new Set([
    "FIGHTER",
    "SEAPLANE_FIGHTER",
    "INTERCEPTOR",
]);

const is_fighter_bonus_target = (
    equip: PlayerPlaneEquip,
): boolean =>
    has_equip_type(FIGHTER_CATEGORY, equip.type_id) ||
    equip.flags.is_20th_family;

/**
 * 制空ボーナスを返す    
 * https://wikiwiki.jp/kancolle/艦載機熟練度#ProficiencyAirpower
 * @param equip 
 * @returns 
 */
const calc_additional_air_superiority_bonus = (
    equip: PlayerPlaneEquip,
): number => {
    const {
        plane_proficiency,
        type_id,
    } = equip;

    if (is_fighter_bonus_target(equip)
    ) return get_bonus(FIGHTER_BONUSES, plane_proficiency);

    if (
        type_id === "SEAPLANE_BOMBER"
    ) return get_bonus(SEAPLANE_BOMBER_BONUSES, plane_proficiency);

    return 0;
};

/**
 * 内部熟練ボーナスを返す    
 * https://wikiwiki.jp/kancolle/艦載機熟練度#ProficiencyAirpower
 * @param plane_proficiency 
 * @returns 
 */
const calc_internal_bonus = (
    plane_proficiency: number,
): number => Math.sqrt(plane_proficiency / 10); // 切り捨てなし

type ProficiencyBreakdown = Readonly<{
    internal_bonus: number;
    additional_bonus: number;
}>;
const DEFAULT_PROFICIENCY_BREAKDOWN: ProficiencyBreakdown = {
    internal_bonus: 0,
    additional_bonus: 0,
};

/**
 * 航空機熟練度による制空値上昇値を計算する共通関数
 * @param equip 
 * @param exclude_types 
 * @returns 
 */
const calculate_proficiency_breakdown = (
    equip: PlayerEquip,
    exclude_types?: Set<EquipType>,
): ProficiencyBreakdown => {
    if (!is_player_plane_equip(equip)) return DEFAULT_PROFICIENCY_BREAKDOWN;
    if (
        equip.type_id === "ASW_PLANE" &&
        !equip.flags.is_20th_family
    ) return DEFAULT_PROFICIENCY_BREAKDOWN;

    const internal_bonus = exclude_types && (has_equip_type(exclude_types, equip.type_id))
        ? 0
        : calc_internal_bonus(equip.plane_proficiency);

    const additional_bonus = calc_additional_air_superiority_bonus(equip);
    return {
        internal_bonus,
        additional_bonus,
    };
}

/**
 * 航空機熟練度による制空値上昇値を計算する共通関数
 * @param equip 
 * @param exclude_types 
 * @returns 
 */
const calculate_proficiency_base = (
    equip: PlayerEquip,
    exclude_types?: Set<EquipType>,
): number => {
    const { internal_bonus, additional_bonus } =
        calculate_proficiency_breakdown(equip, exclude_types);

    return internal_bonus + additional_bonus;
}

const CARRIER_INTERNAL_BONUS_EXCLUDE_TYPES: Set<EquipType> = new Set([
    'CARRIER_SCOUT',
    'CARRIER_SCOUT_2',
    'LAND_BASED_BOMBER', // そもそも乗らないけど一応
    'LAND_BASED_BOMBER_L',
    'LAND_BASED_SCOUT',
    'FLYING_BOAT',
]);

export type FighterPowerProficiencyFlat =
    Brand<number, 'FighterPowerProficiencyFlat'>

/**
 * 艦載機の航空機熟練度による制空値上昇値を返す
 * @param equip 
 * @returns 
 */
export function calc_carrier_based_proficiency_flat(
    equip: PlayerEquip,
): FighterPowerProficiencyFlat {
    return calculate_proficiency_base(
        equip,
        CARRIER_INTERNAL_BONUS_EXCLUDE_TYPES,
    ) as FighterPowerProficiencyFlat;
}

/**
 * 基地航空隊機の航空機熟練度による制空値上昇値を返す
 * @param equip 
 * @returns 
 */
export function calc_land_based_proficiency_flat(
    equip: PlayerEquip,
): FighterPowerProficiencyFlat {
    return calculate_proficiency_base(
        equip,
    ) as FighterPowerProficiencyFlat;
}

export const __proficiency_fighterPower = {
    calc_additional_air_superiority_bonus,
    calc_internal_bonus,
    calculate_proficiency_breakdown,
    CARRIER_INTERNAL_BONUS_EXCLUDE_TYPES,
};