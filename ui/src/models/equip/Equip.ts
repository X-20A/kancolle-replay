import { StatusComponent } from "@/types";
import { EquipDatas, EquipFlags, SkillTriggerEquipType } from "@/types/equip/player";
import { createEquipMaster } from "./EquipMaster";
import { EquipType } from "@/datas/equip/base/player";
import { EquipImprovementDatas } from "@/datas/equip/improvement";
import { createEquipImprovementAddition, EquipImprovementAddition } from "./EquipImprovement";
import { createTransportAddition, TransportAddition } from "./TransportPower";
import { TransportEquipDatas } from "@/datas/equip/transportEquip";
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
    readonly type: EquipType,
    /** 特殊攻撃のトリガーになる装備の種別ID */
    readonly skill_trigger_type: SkillTriggerEquipType | undefined,
    /** フラグ類 */
    readonly flags: EquipFlags,
    /** マスターデータままの装備加算値 */
    readonly master_addition: StatusComponent,
    /** 装備改修加算値 */
    readonly improvement_addition: EquipImprovementAddition,
    /** TP加算値 */
    readonly transport_addition: TransportAddition,
}

export function createEquip(
    equip_datas: EquipDatas,
    equip_improvement_datas: EquipImprovementDatas,
    transport_equip_datas: TransportEquipDatas,
    master_id: EquipId,
    improvement_lv: number,
): Equip {
    const equip_master = createEquipMaster(master_id, equip_datas);

    const name_jp = equip_master.name_jp;
    const name_en = equip_master.name_en;

    const type = equip_master.type_id;
    const skill_trigger_type = equip_master.skill_trigger_type;
    const flags = equip_master.flags;
    const equip_master_addition = equip_master.status;
    const improvement_addition = createEquipImprovementAddition(
        equip_improvement_datas,
        equip_master.improvement_type,
        improvement_lv,
    );
    const transport_addition =
        createTransportAddition(transport_equip_datas, equip_master);

    return {
        master_id,
        name_en,
        name_jp,
        improvement_lv,
        type,
        skill_trigger_type,
        flags,
        master_addition: equip_master_addition,
        improvement_addition,
        transport_addition,
    }
}