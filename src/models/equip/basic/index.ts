import { TStatusComponent } from "@/types";
import { AACITriggerEquipType, PlayerEquipFlags, SkillTriggerEquipType } from "@/types/equip/player";
import { EquipType } from "@/datas/equip/base/player";
import { EquipImprovementAddition } from "../EquipImprovement";
import { TransportAddition } from "../TransportPower";
import { AbyssalEquipFlags } from "@/types/equip/abbysal";
import { EquipId } from "@/types/brands/equip";
import { derive_player_equip } from "./player";
import { derive_abyssal_equip } from "./abyssal";

type EquipBase = {
    /** 装備マスターID */
    readonly master_id: number,
    /** 装備名(EN) */
    readonly name_en: string,
    /** 装備名(日) */
    readonly name_jp: string,
    /** 装備種別ID */
    readonly type_id: EquipType,
    /** 特殊攻撃のトリガーになる装備の種別ID */
    readonly skill_trigger_type: SkillTriggerEquipType | null,
    /** 対空CIのトリガーになる装備の種別ID */
    readonly aaci_trigger_type: AACITriggerEquipType,
    /** マスターデータままの装備加算値 */
    readonly natural_addition: TStatusComponent,
}

export type OtherEquip = EquipBase & {
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

/** 航空機熟練度を持つ航空機全般 */
export type PlaneEquip = OtherEquip & {
    /** 航空機熟練度 */
    readonly plane_proficiency: number,
}

/** 噴式強襲可能なジェット機系 */
export type JetBomberEquip = PlaneEquip & {
    /** 噴式強襲回数 */
    readonly jet_assault_count: number,
}

export type PlayerEquip = OtherEquip | PlaneEquip | JetBomberEquip

export type AbyssalEquip = EquipBase & {
    readonly flags: AbyssalEquipFlags,
}

export type Equip = PlayerEquip | AbyssalEquip

export function is_player_equip(equip: Equip): equip is PlayerEquip {
    return equip.master_id < 1500;
}

export function is_plane_equip(equip: PlayerEquip): equip is PlaneEquip {
    return equip.flags.is_plane;
}

export function is_jet_bomber_equip(equip: PlayerEquip): equip is JetBomberEquip {
    return equip.type_id === "JET_BOMBER";
}

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
        : derive_abyssal_equip(master_id)
}