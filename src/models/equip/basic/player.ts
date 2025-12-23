import { EQUIP_TYPE_DATAS } from "@/datas/equip/typeData";
import { derive_equip_improvement_addition } from "../EquipImprovement";
import { derive_player_equip_master } from "../master/player";
import { deriveTransportAddition } from "../TransportPower";
import { PlayerOtherEquip, PlayerPlaneEquip, PlayerEquip, ImporovementLv } from ".";
import { EquipId } from "@/types/brands/equip";
import { sum_status_components } from "@/models/ship/equipped";

const DEFAULT_PROFICIENCY = 100;

export function derive_player_equip(
    improvement_lv: ImporovementLv,
    master_id: EquipId,
    proficiency?: number,
): PlayerEquip {
    const equip_master = derive_player_equip_master(master_id);
    const type_id = equip_master.type_id;

    const natural_addition = equip_master.status;
    const improvement_addition = derive_equip_improvement_addition(
        equip_master.improvement_type,
        improvement_lv,
    );

    const other_equip: PlayerOtherEquip = {
        master_id,
        name_en: equip_master.name_en,
        name_jp: equip_master.name_jp,
        fit_class: equip_master.fit_class,
        improvement_lv,
        type_id,
        skill_trigger_type: equip_master.skill_trigger_type ?? EQUIP_TYPE_DATAS[type_id] ?? 'NONE',
        aaci_trigger_type: equip_master.aaci_trigger_type,
        flags: equip_master.flags,
        natural_addition,
        improvement_addition,
        total_addtion: sum_status_components(natural_addition, improvement_addition),
        transport_addition: deriveTransportAddition(equip_master),
        contribute_asw_power: EQUIP_TYPE_DATAS[equip_master.type_id].is_contribute_asw_attack_power
            ? equip_master.status.asw_power
            : 0,
    };

    if (!equip_master.flags.is_plane) return other_equip;

    const plane_equip: PlayerPlaneEquip = {
        ...other_equip,
        plane_proficiency: proficiency ?? DEFAULT_PROFICIENCY,
        anti_air_resist_ship: equip_master.AA_resist_ship,
        anti_air_resist_fleet: equip_master.AA_resist_fleet,
    };

    return plane_equip;
}