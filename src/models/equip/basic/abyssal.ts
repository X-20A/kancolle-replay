import { AbyssalEquip, AbyssalOtherEquip, AbyssalPlaneEquip, is_plane_equip } from ".";
import { EquipId } from "@/types/brands/equip";
import { derive_abyssal_equip_master } from "../master/abyssal";
import { EQUIP_TYPE_DATAS } from "@/datas/equip/typeData";

export function derive_abyssal_equip(
    master_id: EquipId,
): AbyssalEquip {
    const equip_master = derive_abyssal_equip_master(master_id);
    const type_id = equip_master.type_id;

    const other_equip: AbyssalOtherEquip = {
        master_id,
        name_en: equip_master.name_en,
        name_jp: equip_master.name_jp,
        type_id,
        skill_trigger_type: equip_master.skill_trigger_type ?? EQUIP_TYPE_DATAS[type_id] ?? 'NONE',
        aaci_trigger_type: equip_master.aaci_trigger_type,
        flags: equip_master.flags,
        natural_addition: equip_master.status,
    };

    if (!equip_master.flags.is_plane) return other_equip;
    
    const plane_equip: AbyssalPlaneEquip = {
        ...other_equip,
        anti_air_resist_ship: equip_master.AA_resist_ship,
        anti_air_resist_fleet: equip_master.AA_resist_fleet,
    };

    return plane_equip;
}