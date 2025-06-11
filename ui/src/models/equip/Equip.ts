import { TStatusComponent } from "@/types";
import { EquipFlags, SkillTriggerEquipType } from "@/types/equip/player";
import { deriveEquipMaster } from "./EquipMaster";
import { EquipType } from "@/datas/equip/base/player";
import { deriveEquipImprovementAddition, EquipImprovementAddition } from "./EquipImprovement";
import { deriveTransportAddition, TransportAddition } from "./TransportPower";
import { EquipId } from "@/types/brands/equip";

export type Equip = {
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
     * 対潜攻撃力計算に関与する対潜値    
     * TODO: StatusComponentに入れるかどうか
     */
    readonly valid_asw: number,
}

export function deriveEquip(
    improvement_lv: number,
    master_id: EquipId,
): Equip {
    const equip_master = deriveEquipMaster(
        master_id,
    );

    const name_jp = equip_master.name_jp;
    const name_en = equip_master.name_en;

    const type_id = equip_master.type_id;
    const skill_trigger_type = equip_master.skill_trigger_type;
    const flags = equip_master.flags;
    const natural_addition = equip_master.status;
    const improvement_addition = deriveEquipImprovementAddition(
        equip_master.improvement_type,
        improvement_lv,
    );
    const transport_addition =
        deriveTransportAddition(equip_master);
    const valid_asw = [
        EquipType.DIVE_BOMBER,
        EquipType.FIGHTER_BOMBER,
        EquipType.TORPEDO_BOMBER,
        EquipType.SONAR_S,
        EquipType.SONAR_L,
        EquipType.DEPTH_CHARGE
    ].includes(type_id) ? equip_master.status.asw : 0;

    return {
        master_id,
        name_en,
        name_jp,
        improvement_lv,
        type_id,
        skill_trigger_type,
        flags,
        natural_addition,
        improvement_addition,
        transport_addition,
        valid_asw,
    }
}