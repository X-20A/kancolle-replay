import { EQUIP_TYPE_DATAS } from "@/datas/equip/typeData";
import { deriveEquipImprovementAddition } from "../EquipImprovement";
import { derive_player_equip_master } from "../master/player";
import { deriveTransportAddition } from "../TransportPower";
import { PlaneEquip, PlayerEquip } from ".";
import { EquipId } from "@/types/brands/equip";

export function derive_player_equip(
    improvement_lv: number,
    master_id: EquipId,
    proficiency?: number,
): PlayerEquip {
    const equip_master = derive_player_equip_master(master_id);

    // 基本プロパティ
    const base: PlayerEquip = {
        master_id,
        name_en: equip_master.name_en,
        name_jp: equip_master.name_jp,
        improvement_lv,
        type_id: equip_master.type_id,
        skill_trigger_type: equip_master.skill_trigger_type,
        flags: equip_master.flags,
        natural_addition: equip_master.status,
        improvement_addition: deriveEquipImprovementAddition(
            equip_master.improvement_type,
            improvement_lv,
        ),
        transport_addition: deriveTransportAddition(equip_master),
        contribute_asw_attack_power: EQUIP_TYPE_DATAS[equip_master.type_id].is_contribute_asw_attack_power
            ? equip_master.status.asw
            : 0,
    };

    // 航空機かどうかで分岐
    if (equip_master.flags.is_plane) {
        const plane_proficiency = proficiency ?? 100;
        
        const plane_equip: PlaneEquip = {
            ...base,
            plane_proficiency,
        };
        return plane_equip;
    }
    
    return base;
}