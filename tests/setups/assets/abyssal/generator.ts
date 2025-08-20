import { ABYSSAL_EQUIP_DATAS } from "@/datas/equip/base/abyssal";
import { AbyssalEquip } from "@/models/equip/basic";
import { derive_abyssal_equip } from "@/models/equip/basic/abyssal";
import { AbyssalEquipId } from "@/types/equip/abyssalId";
import { AbyssalEquipNameJP } from "@/types/equip/abyssalNameJP";

/**
 * 装備名から深海装備を生成して返す
 * @param equip_name 
 * @returns 
 */
export function derive_abysssal_equip_from_name(
    equip_name: AbyssalEquipNameJP,
): AbyssalEquip {
    const data = Object.entries(ABYSSAL_EQUIP_DATAS)
        .find(([, data]) => data.name_jp === equip_name);
    if (!data) throw new Error(`指定された名前の装備は存在しません: ${equip_name}`);
    
    const id = Number(data[0]);
    return derive_abyssal_equip(id as AbyssalEquipId);
}