import { TStatusComponent } from "@/types";
import { EquipDatas, EquipFlags, SkillTriggerEquipType } from "@/types/equip/player";
import { deriveEquipMaster } from "./EquipMaster";
import { EquipType } from "@/datas/equip/base/player";
import { EquipImprovementDatas } from "@/datas/equip/improvement";
import { deriveEquipImprovementAddition, EquipImprovementAddition } from "./EquipImprovement";
import { deriveTransportAddition, TransportAddition } from "./TransportPower";
import { TransportEquipDatas } from "@/datas/equip/transportEquip";
import { EquipId } from "@/types/brands/equip";
import { EquipTypeDatas } from "@/datas/equip/typeData";

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
}

export function deriveEquip(
    equip_datas: EquipDatas,
    equip_type_datas: EquipTypeDatas,
    equip_improvement_datas: EquipImprovementDatas,
    transport_equip_datas: TransportEquipDatas,
    master_id: EquipId,
    improvement_lv: number,
): Equip {
    const equip_master = deriveEquipMaster(
        equip_datas,
        equip_type_datas,
        master_id,
    );

    const name_jp = equip_master.name_jp;
    const name_en = equip_master.name_en;

    const type_id = equip_master.type_id;
    const skill_trigger_type = equip_master.skill_trigger_type;
    const flags = equip_master.flags;
    const natural_addition = equip_master.status;
    const improvement_addition = deriveEquipImprovementAddition(
        equip_improvement_datas,
        equip_master.improvement_type,
        improvement_lv,
    );
    const transport_addition =
        deriveTransportAddition(transport_equip_datas, equip_master);

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
    }
}