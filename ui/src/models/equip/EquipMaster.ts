import { EquipType } from "@/datas/equip/base/player";
import { EquipImprovementType } from "@/datas/equip/improvement";
import { StatusComponent } from "@/types";
import { EquipId } from "@/types/brands/equip";
import { EquipDatas, EquipFlags, SkillTriggerEquipType } from "@/types/equip/player";

/** マスターデータから直接取得するデータ */
export type EquipMaster = {
    readonly master_id: EquipId,
    readonly name_en: string,
    readonly name_jp: string,
    readonly type_id: EquipType,
    readonly improvement_type: EquipImprovementType,
    readonly skill_trigger_type: SkillTriggerEquipType | undefined,
    readonly status: StatusComponent,
    readonly flags: EquipFlags,
}

export function createEquipMaster(
    id: EquipId,
    equip_datas: EquipDatas,
): EquipMaster {
    const equip_data = equip_datas[id];
    if (!equip_data) throw new Error(`id: ${id}の装備が見つかりませんでした`);

    const master_id = id;
    const name_en = equip_data.name;
    const name_jp = equip_data.nameJP;

    const type_id = equip_data.type;
    const improvement_type = equip_data.improvement_type;
    const skill_trigger_type = equip_data.b_type;

    const status: StatusComponent = {
        hp: 0,
        fire_power: equip_data.FP ?? 0,
        armor: equip_data.AR ?? 0,
        torpedo_power: equip_data.TP ?? 0,
        evasion: equip_data.EV ?? 0,
        anti_air: equip_data.AA ?? 0,
        asw: equip_data.ASW ?? 0,
        los: equip_data.LOS ?? 0,
        luck: 0,
        shell_accuracy: equip_data.ACC ?? 0,
        torpedo_accuracy: 0,
        night_battle_accuracy: 0,
    }

    const flags: EquipFlags = {
        can_avoid_T_disadvantage: equip_data.can_avoid_T_disadvantage ?? false,
        can_shell_install_bomber: equip_data.can_shell_install_bomber ?? false,
        is_rocket_fighter: equip_data.is_rocket_fighter ?? false,
        is_night_scout: equip_data.is_night_scout ?? false,
        is_concentrated: equip_data.is_concentrated ?? false,
        is_special_submarine_CI_torigger: equip_data.is_special_submarine_CI_torigger ?? false,
        is_DC_only: equip_data.is_DC_only ?? false,
        is_DCP: equip_data.is_DCP ?? false,
        can_ASW_penetrate: equip_data.can_ASW_penetrate ?? false,
        is_Swordfish_family: equip_data.is_Swordfish_family ?? false,
        can_barrage: equip_data.can_barrage ?? false,
        is_skip_bomber: equip_data.is_skip_bomber ?? false,
        is_20th_family: equip_data.is_20th_family ?? false,
        can_not_op_torpedo_midgetsub: equip_data.can_not_op_torpedo_midgetsub ?? false,
        high_altitude_bomber: equip_data.high_altitude_bomber ?? false,
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