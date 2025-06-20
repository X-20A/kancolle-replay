import { EquipType } from "@/datas/equip/base/player"
import { EquipImprovementType } from "@/datas/equip/improvement"
import { EquipTypeData } from "@/datas/equip/typeData"
import { DeepReadonly, TStatusComponent } from "@/types"
import { EquipId } from "@/types/brands/equip"
import { AbyssalEquipData, AbyssalEquipFlags } from "@/types/equip/abbysal"
import { AACITriggerEquipType, PlayerEquipData, PlayerEquipFlags, SkillTriggerEquipType, SpecialIcon } from "@/types/equip/player"

/** マスターデータから直接取得するデータ */
export type EquipMasterBase = {
    readonly master_id: EquipId,
    readonly name_en: string,
    readonly name_jp: string,
    readonly type_id: EquipType,
    /** 特殊攻撃のトリガーになる装備の種別ID 該当装備でなければ null */
    readonly skill_trigger_type: SkillTriggerEquipType | null,
    /** 対空CIのトリガーになる装備の種別ID */
    readonly aaci_trigger_type?: AACITriggerEquipType | null,
    readonly status: TStatusComponent,
}

export type PlayerEquipMaster = EquipMasterBase & {
    readonly improvement_type: EquipImprovementType,
    readonly flags: PlayerEquipFlags,
}

export type AbyssalEquipMaster = EquipMasterBase & {
    readonly flags: AbyssalEquipFlags,
}

export type EquipMaster = PlayerEquipMaster | AbyssalEquipMaster

/**
 * AACITriggerTypeを判定して返す    
 * TODO: 本当に何とかしたい
 * @param icon 
 */
export function calc_aaci_trigger_type(
    skill_trigger_type: SkillTriggerEquipType | null,
    data: PlayerEquipData | AbyssalEquipData,
    type_data: DeepReadonly<EquipTypeData>,
    icon: number,
    anti_air: number,
): AACITriggerEquipType | null {
    let atype;
    atype = data.a_type ?? type_data.a_type ?? null;
    if (skill_trigger_type == SkillTriggerEquipType.B_RADAR && anti_air >= 2) atype = AACITriggerEquipType.A_AIRRADAR;
    if (data.icon == SpecialIcon.MainHighAngleGun) atype = AACITriggerEquipType.A_HAGUN;
    if (atype == AACITriggerEquipType.A_HAGUN && anti_air >= 8) atype = AACITriggerEquipType.A_HAFD;
    if (atype == AACITriggerEquipType.A_AAGUN && anti_air <= 2) atype = null;

    return atype;
}