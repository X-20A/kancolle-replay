import { TStatusComponent } from "@/types";
import { EquipFlags, SkillTriggerEquipType } from "@/types/equip/player";
import { deriveEquipMaster } from "./EquipMaster";
import { EquipType } from "@/datas/equip/base/player";
import { deriveEquipImprovementAddition, EquipImprovementAddition } from "./EquipImprovement";
import { deriveTransportAddition, TransportAddition } from "./TransportPower";
import { EquipId } from "@/types/brands/equip";
import { EQUIP_TYPE_DATAS } from "@/datas/equip/typeData";

export type EquipBase = {
    /** 装備マスターID */
    readonly master_id: number,
    /** 装備名(EN) */
    readonly name_en: string,
    /** 装備名(日) */
    readonly name_jp: string,
    /** 装備改修値 */
    readonly improvement_lv: number,
    /** 装備種別ID */
    readonly type_id: EquipType,
    /** 特殊攻撃のトリガーになる装備の種別ID */
    readonly skill_trigger_type: SkillTriggerEquipType | null,
    /** フラグ類 */
    readonly flags: EquipFlags,
    /** マスターデータままの装備加算値 */
    readonly natural_addition: TStatusComponent,
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

// 速い話、航空機以外にはそもそも 航空機熟練度 を持たせたくないのだ

export type PlaneEquip = EquipBase & {
    /** 航空機熟練度 */
    readonly plane_proficiency: number,
}

export type Equip = EquipBase | PlaneEquip

export function is_plane_equip(equip: Equip): equip is PlaneEquip {
    return equip.flags.is_plane;
}

export function deriveEquip(
    improvement_lv: number,
    master_id: EquipId,
    proficiency?: number,
): Equip {
    const equip_master = deriveEquipMaster(master_id);

    // 基本フィールド
    const base: EquipBase = {
        master_id,
        name_en: equip_master.name_en,
        name_jp: equip_master.name_jp,
        improvement_lv,
        type_id: equip_master.type_id,
        skill_trigger_type: equip_master.skill_trigger_type,
        flags: equip_master.flags,
        natural_addition: equip_master.status,
        improvement_addition: deriveEquipImprovementAddition(
            equip_master.improvement_type,
            improvement_lv,
        ),
        transport_addition: deriveTransportAddition(equip_master),
        contribute_asw_attack_power: EQUIP_TYPE_DATAS[equip_master.type_id].is_contribute_asw_attack_power
            ? equip_master.status.asw
            : 0,
    };

    // 航空機かどうかで分岐
    if (equip_master.flags.is_plane) {
        const plane_proficiency = proficiency ?? 100;
        
        const planeEquip: PlaneEquip = {
            ...base,
            plane_proficiency,
        };
        return planeEquip;
    }
    
    return base;
}