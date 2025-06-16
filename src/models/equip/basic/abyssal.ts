import { AbyssalEquip } from ".";
import { EquipId } from "@/types/brands/equip";
import { derive_abyssal_equip_master } from "../master/abyssal";

export function derive_abyssal_equip(
    master_id: EquipId,
): AbyssalEquip {
    const equip_master = derive_abyssal_equip_master(master_id);

    // 基本フィールド
    return {
        master_id,
        name_en: equip_master.name_en,
        name_jp: equip_master.name_jp,
        type_id: equip_master.type_id,
        skill_trigger_type: equip_master.skill_trigger_type,
        flags: equip_master.flags,
        natural_addition: equip_master.status,
    };
}