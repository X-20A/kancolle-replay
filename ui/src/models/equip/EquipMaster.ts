import { EquipType } from "@/datas/equip/base/player";
import { EquipImprovementType } from "@/datas/equip/improvement";
import { EquipTypeDatas } from "@/datas/equip/typeData";
import { TStatusComponent } from "@/types";
import { EquipId } from "@/types/brands/equip";
import { EquipDatas, EquipFlags, SkillTriggerEquipType } from "@/types/equip/player";

/** マスターデータから直接取得するデータ */
export type EquipMaster = {
    readonly master_id: EquipId,
    readonly name_en: string,
    readonly name_jp: string,
    readonly type_id: EquipType,
    readonly improvement_type: EquipImprovementType,
    /** 特殊攻撃のトリガーになる装備の種別ID 該当装備でなければ null */
    readonly skill_trigger_type: SkillTriggerEquipType | null,
    readonly status: TStatusComponent,
    readonly flags: EquipFlags,
}

export function deriveEquipMaster(
    equip_datas: EquipDatas,
    equip_type_datas: EquipTypeDatas,
    id: EquipId,
): EquipMaster {
    const equip_data = equip_datas[id];
    if (!equip_data) throw new Error(`id: ${id}の装備が見つかりませんでした`);

    const master_id = id;
    const name_en = equip_data.name;
    const name_jp = equip_data.nameJP;

    const type_id = equip_data.type;
    const improvement_type = equip_data.improvement_type;
    const skill_trigger_type = equip_data.b_type ?? (equip_type_datas[type_id].b_type ?? null);

    const status: TStatusComponent = {
        hp: 0,
        fire_power: equip_data.FP ?? 0,
        armor: equip_data.AR ?? 0,
        torpedo_power: equip_data.TP ?? 0,
        evasion: equip_data.EV ?? 0,
        anti_air: equip_data.AA ?? 0,
        asw: equip_data.ASW ?? 0,
        los: equip_data.LOS ?? 0,
        luck: 0,
        range: equip_data.RNG ?? 0,
        shell_accuracy: equip_data.ACC ?? 0,
        torpedo_accuracy: 0,
        night_battle_accuracy: 0,
        aerial_bomb_power: equip_data.AERIAL_BOMB ?? 0,
        aerial_torpedo_power: equip_data.AERIAL_TP ?? 0,
    }

    const flags: EquipFlags = {
        can_avoid_T_disadvantage: equip_data.can_avoid_T_disadvantage ?? false,
        can_shell_install_bomber: equip_data.can_shell_install_bomber ?? false,
        is_night_scout: equip_data.is_night_scout ?? false,
        is_concentrated: equip_data.is_concentrated ?? false,
        is_rocket_fighter: equip_data.is_rocket_fighter ?? false,
        is_skip_bomber: equip_data.is_skip_bomber ?? false,
        is_special_submarine_CI_torigger: equip_data.is_special_submarine_CI_torigger ?? false,
        is_DC_only: equip_data.is_DC_only ?? false,
        is_DCP: equip_data.is_DCP ?? false,
        can_ASW_penetrate: equip_data.can_ASW_penetrate ?? false,
        is_Swordfish_family: equip_data.is_Swordfish_family ?? false,
        can_barrage: equip_data.can_barrage ?? false,
        is_20th_family: equip_data.is_20th_family ?? false,
    }

    return {
        master_id,
        name_en,
        name_jp,
        type_id,
        improvement_type,
        skill_trigger_type,
        status,
        flags,
    }
}