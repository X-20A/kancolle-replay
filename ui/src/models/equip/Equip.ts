import { StatusComponent } from "@/types";
import { EquipDatas, EquipFlags, SkillTriggerEquipType } from "@/types/equip";
import { createEquipMaster } from "./EquipMaster";
import { EquipType } from "@/datas/equip/base";

export type Equip = {
    /** 装備マスターID */
    master_id: number,
    /** 装備名(EN) */
    name_en: string,
    /** 装備名(日) */
    name_jp: string,
    /** 装備改修値 */
    improvement: number,
    /** 装備種別ID */
    type: EquipType,
    /** 特殊攻撃のトリガーになる装備の種別ID */
    skill_trigger_type: SkillTriggerEquipType,
    /** フラグ類 */
    flags: EquipFlags,
    /** マスターデータままの装備加算値 */
    readonly master_addition: StatusComponent,
    /** 装備ボーナス加算値 */
    readonly bonus_addition: StatusComponent,
    /** 装備改修加算値 */
    readonly improvement_addition: StatusComponent,
}

export function createEquip(
    master_id: number,
    ship_id: number,
    improvement: number,
    equip_datas: EquipDatas,
): Equip {
    const equip_master = createEquipMaster(master_id, equip_datas);

    const name_jp = equip_master.name_jp;
    const name_en = equip_master.name_en;

    const type = equip_master.type;
    const flags = equip_master.flags;
    const equip_master_addition = equip_master.status;

    return {
        master_id,
        name_jp,
        name_en,
        improvement,
        type,
        flags,
        master_addition: equip_master_addition,
    }
}