import { ABYSSAL_EQUIP_DATAS } from "@/datas/equip/base/abyssal";
import { EQUIP_TYPE_DATAS } from "@/datas/equip/typeData";
import { TStatusComponent } from "@/types";
import { AbyssalEquipFlags } from "@/types/equip/abbysal";
import { AbyssalEquipMaster } from ".";
import { AbyssalEquipId } from "@/types/equip/abyssalId";

export function derive_abyssal_equip_master(
    id: AbyssalEquipId,
): AbyssalEquipMaster {
    const equip_data = ABYSSAL_EQUIP_DATAS[id];
    if (!equip_data) throw new Error(`id: ${id}の装備が見つかりませんでした`);

    const type_id = equip_data.type;
    const skill_trigger_type = equip_data.b_type ?? EQUIP_TYPE_DATAS[type_id].b_type ?? 'NONE';

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

    const flags: AbyssalEquipFlags = {
        is_concentrated: equip_data.is_concentrated ?? false,
        is_skip_bomber: equip_data.is_skip_bomber ?? false,
        can_not_op_torpedo_midgetsub: equip_data.can_not_op_torpedo_midgetsub ?? false,
        high_altitude_bomber: equip_data.high_altitude_bomber ?? false,
    
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

    const icon_id = equip_data.icon ?? type_data.icon;
    
    return {
        master_id: id,
        name_en: equip_data.name,
        name_jp: equip_data.name_jp,
        type_id,
        icon_id,
        skill_trigger_type,
        aaci_trigger_type: equip_data.aaci_type,
        AA_resist_ship: equip_data.AA_resist_ship ?? 1,
        AA_resist_fleet: equip_data.AA_resist_fleet ?? 1,
        status,
        flags,
    }
}