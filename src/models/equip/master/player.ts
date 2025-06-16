import { PLAYER_EQUIP_DATAS } from "@/datas/equip/base/player";
import { EQUIP_TYPE_DATAS } from "@/datas/equip/typeData";
import { TStatusComponent } from "@/types";
import { EquipId } from "@/types/brands/equip";
import { PlayerEquipFlags } from "@/types/equip/player";
import { PlayerEquipMaster } from ".";

export function derive_player_equip_master(
    id: EquipId,
): PlayerEquipMaster {
    const equip_data = PLAYER_EQUIP_DATAS[id];
    if (!equip_data) throw new Error(`id: ${id}の装備が見つかりませんでした`);

    const type_id = equip_data.type;
    const skill_trigger_type = equip_data.b_type ?? (EQUIP_TYPE_DATAS[type_id].b_type ?? null);

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

    const type_data = EQUIP_TYPE_DATAS[type_id];

    const flags: PlayerEquipFlags = {
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

        // type_data系
        is_contribute_asw_attack_power: type_data.is_contribute_asw_attack_power ?? false,
        can_equip_land_base: type_data.can_equip_land_base ?? false,
        is_plane: type_data.is_plane ?? false,
        is_involve_air_superiority: type_data.is_involve_air_superiority ?? false,
        is_torpedo_bomber: type_data.is_torpedo_bomber ?? false,
        can_contact: type_data.can_contact ?? false,
        can_detect: type_data.can_detect ?? false,
        is_dive_bomber: type_data.is_dive_bomber ?? false,
        is_asw_plane: type_data.is_asw_plane ?? false,
        is_land_base_plane: type_data.is_land_base_plane ?? false,
        is_jet: type_data.is_jet ?? false,
        can_support_asw: type_data.can_support_asw ?? false,
    }

    return {
        master_id: id,
        name_en: equip_data.name,
        name_jp: equip_data.nameJP,
        type_id,
        improvement_type: equip_data.improvement_type,
        skill_trigger_type,
        status,
        flags,
    }
}