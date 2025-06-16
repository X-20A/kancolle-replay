import { EquipType } from "@/datas/equip/base/player"
import { EquipImprovementType } from "@/datas/equip/improvement"
import { TStatusComponent } from "@/types"
import { EquipId } from "@/types/brands/equip"
import { AbyssalEquipFlags } from "@/types/equip/abbysal"
import { PlayerEquipFlags, SkillTriggerEquipType } from "@/types/equip/player"

/** マスターデータから直接取得するデータ */
export type EquipMasterBase = {
    readonly master_id: EquipId,
    readonly name_en: string,
    readonly name_jp: string,
    readonly type_id: EquipType,
    /** 特殊攻撃のトリガーになる装備の種別ID 該当装備でなければ null */
    readonly skill_trigger_type: SkillTriggerEquipType | null,
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