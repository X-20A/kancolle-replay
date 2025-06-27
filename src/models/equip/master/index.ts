import { EquipType } from "@/datas/equip/base/player"
import { EquipImprovementType } from "@/datas/equip/improvement"
import { TStatusComponent } from "@/types"
import { EquipId } from "@/types/brands/equip"
import { AbyssalEquipFlags } from "@/types/equip/abbysal"
import { AACITriggerEquipType, PlayerEquipFlags, SkillTriggerEquipType } from "@/types/equip/player"

/** マスターデータから直接取得するデータ */
export type EquipMasterBase = {
    readonly master_id: EquipId,
    readonly name_en: string,
    readonly name_jp: string,
    readonly type_id: EquipType,
    readonly icon_id: number,
    /** 特殊攻撃のトリガーになる装備の種別ID 該当装備でなければ null */
    readonly skill_trigger_type: SkillTriggerEquipType,
    /** 対空CIのトリガーになる装備の種別ID */
    readonly aaci_trigger_type: AACITriggerEquipType,
    readonly AA_resist_ship: number,
    readonly AA_resist_fleet: number,
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