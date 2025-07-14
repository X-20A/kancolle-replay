import { TStatusComponent } from "@/types";
import { AACITriggerEquipType, SkillTriggerEquipType } from "@/types/equip/player";
import { EquipType } from "@/datas/equip/base/player";
import { EquipImprovementAddition } from "../EquipImprovement";
import { TransportAddition } from "../TransportPower";
import { EquipId } from "@/types/brands/equip";
import { derive_player_equip } from "./player";
import { derive_abyssal_equip } from "./abyssal";
import { AbyssalEquipNameJP } from "@/types/equip/abyssalNameJP";
import { PlayerEquipNameJP } from "@/types/equip/playerNameJP";
import { AbyssalEquipId } from "@/types/equip/abyssalId";
import { AbyssalEquipFlags, PlayerEquipFlags } from "@/types/equip/flags";

type EquipBase = {
    /** 装備名(EN) */
    readonly name_en: string,
    /** 装備種別ID */
    readonly type_id: EquipType,
    /** 特殊攻撃のトリガーになる装備の種別ID */
    readonly skill_trigger_type: SkillTriggerEquipType,
    /** 対空CIのトリガーになる装備の種別ID */
    readonly aaci_trigger_type: AACITriggerEquipType,
    /** マスターデータままの装備加算値 */
    readonly natural_addition: TStatusComponent,
}

export type PlayerOtherEquip = EquipBase & {
    /** 装備マスターID */
    readonly master_id: number,
    readonly name_jp: PlayerEquipNameJP,
    /** 装備改修値 */
    readonly improvement_lv: number,
    /** フラグ類 */
    readonly flags: PlayerEquipFlags,
    /** 装備改修加算値 */
    readonly improvement_addition: EquipImprovementAddition,
    /** TP加算値 */
    readonly transport_addition: TransportAddition,
    /**
     * 対潜攻撃力計算に寄与する対潜値    
     * TODO: StatusComponentに入れるかどうか
     */
    readonly contribute_asw_attack_power: number,
}

/** 航空機特性を持つ装備（熟練度除く） */
type PlaneTrait = {
    /** 加重対空への射撃回避値 */
    readonly anti_air_resist_ship: number,
    /** 艦隊防空への射撃回避値 */
    readonly anti_air_resist_fleet: number,
}

/** 熟練度付き航空機（プレイヤー用） */
export type PlayerPlaneEquip = PlayerOtherEquip & PlaneTrait & {
    /** 航空機熟練度 */
    readonly plane_proficiency: number,
}

/** 噴式強襲可能なジェット機系 */
export type JetBomberEquip = PlayerPlaneEquip & {
    /** 噴式強襲コスト */
    readonly total_jet_assault_cost: number,
}

/** 艦娘系装備 */
export type PlayerEquip = PlayerOtherEquip | PlayerPlaneEquip | JetBomberEquip

/** 深海通常装備 */
export type AbyssalOtherEquip = EquipBase & {
    /** 装備マスターID */
    readonly master_id: AbyssalEquipId,
    /** 装備名(日) */
    readonly name_jp: AbyssalEquipNameJP,
    readonly flags: AbyssalEquipFlags,
}
/** 深海棲艦の航空機装備 */
export type AbyssalPlaneEquip = AbyssalOtherEquip & PlaneTrait

/** 艦娘 | 深海 装備のユニオン */
export type PlaneEquip = PlayerPlaneEquip | AbyssalPlaneEquip

/** 通常 | 航空機系 深海装備のユニオン */
export type AbyssalEquip = AbyssalOtherEquip | AbyssalPlaneEquip

/** 艦娘 | 深海 装備のユニオン */
export type Equip = PlayerEquip | AbyssalEquip

/**
 * 艦娘装備であるか判定して返す(型ガード)
 * @param equip 
 * @returns 
 */
export function is_player_equip(equip: Equip): equip is PlayerEquip {
    return 'improvement_lv' in equip;
}

/**
 * 艦娘装備群であるか判定して返す(型ガード)
 * @param equips 
 * @returns 
 */
export function is_player_equips(equips: Equip[]): equips is PlayerEquip[] {
    return equips.every(is_player_equip);
}

/**
 * 深海装備であるか判定して返す(型ガード)
 * @param equip 
 * @returns 
 */
export function is_abyssal_equip(equip: Equip): equip is AbyssalEquip {
    return !is_player_equip(equip);
}

/**
 * 深海装備群であるか判定して返す(型ガード)
 * @param equips 
 * @returns 
 */
export function is_abyssal_equips(equips: Equip[]): equips is AbyssalEquip[] {
    return equips.every(equip => !is_player_equip(equip));
}
/**
 * 艦娘航空機系装備群であるか判定して返す
 * @param equips 
 * @returns 
 */
export function is_player_plane_equips(
    equips: Equip[],
): equips is PlayerPlaneEquip[] {
    return equips.every(equip => is_player_equip(equip) && is_plane_equip(equip));
}

export function includes_abyssal_equip_id(
    match_equip_ids: AbyssalEquipId[],
    search_equip_id: AbyssalEquipId,
): boolean {
    return match_equip_ids.includes(search_equip_id);
}

/**
 * 指定された艦娘装備名が対象の艦娘装備名配列に含まれているか判定して返す
 * @param match_equip_names 
 * @param search_equip_name 
 * @returns 
 */
export function includes_player_equip_name(
    match_equip_names: PlayerEquipNameJP[],
    search_equip_name: PlayerEquipNameJP,
): boolean {
    return match_equip_names.includes(search_equip_name);
}

/**
 * 指定された装備タイプが対象の装備タイプ配列に含まれているか判定して返す
 * @param match_equip_types 
 * @param search_equip_type 
 * @returns 
 */
export function includes_equip_type(
    match_equip_types: EquipType[],
    search_equip_type: EquipType,
): boolean {
    return match_equip_types.includes(search_equip_type);
}

/**
 * 航空機であるか判定して返す(型ガード)
 * @param equip 
 * @returns 
 */
export function is_plane_equip(equip: Equip): equip is PlayerPlaneEquip {
    return 'anti_air_resist_ship' in equip;
}

/**
 * 装備が艦爆系であるか判定して返す(含爆戦)
 * @param equip 
 * @returns 
 */
export function is_dive_bomber(equip: Equip): boolean {
    return equip.type_id === 'DIVE_BOMBER' || equip.type_id === 'FIGHTER_BOMBER';
}

/**
 * 装備が艦攻であるか判定して返す
 * @param equip 
 * @returns 
 */
export function is_torpedo_bomber(equip: Equip): boolean {
    return equip.type_id === 'TORPEDO_BOMBER';
}

/**
 * 陸攻系装備であるか判定して返す
 * @param plane 
 * @returns 
 */
export function is_land_based_bomber(
    equip: Equip,
): boolean {
    return equip.type_id === 'LAND_BASED_BOMBER' ||
        equip.type_id === 'LAND_BASED_BOMBER_L';
}

/**
 * 噴式爆撃機であるか判定して返す(型ガード)
 * @param equip 
 * @returns 
 */
export function is_jet_bomber(equip: Equip): equip is JetBomberEquip {
    return equip.type_id === "JET_BOMBER";
}

/**
 * 装備を生成して返す
 * @param improvement_lv 
 * @param master_id 
 * @param proficiency 
 * @returns 
 */
export function derive_equip(
    improvement_lv: number,
    master_id: EquipId,
    proficiency?: number,
): Equip {
    return master_id < 1500
        ? derive_player_equip(
            improvement_lv,
            master_id,
            proficiency,
        )
        : derive_abyssal_equip(master_id as AbyssalEquipId)
}