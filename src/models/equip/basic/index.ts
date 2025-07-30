import { TStatusComponent } from "@/types";
import { AACITriggerEquipType, EquipFitClass, SkillTriggerEquipType } from "@/types/equip/player";
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
import { Brand } from "@/types/brands";
import { is_abyssal_equip } from "./predicates";

export * from "./predicates";

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
    readonly fit_class: EquipFitClass | 'None',
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

export type JetBomberEquip = Brand<PlayerPlaneEquip, 'JetBomberEquip'>

/** 艦娘系装備 */
export type PlayerEquip = PlayerOtherEquip | PlayerPlaneEquip

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

export function calc_equip_improvement_addition(
    equip: Equip,
    key: keyof EquipImprovementAddition,
): number {
    if (is_abyssal_equip(equip)) return 0;

    return equip.improvement_addition[key];
}