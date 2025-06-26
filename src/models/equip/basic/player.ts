import { EQUIP_TYPE_DATAS } from "@/datas/equip/typeData";
import { deriveEquipImprovementAddition } from "../EquipImprovement";
import { derive_player_equip_master } from "../master/player";
import { deriveTransportAddition } from "../TransportPower";
import { JetBomberEquip, OtherEquip, PlayerPlaneEquip, PlayerEquip } from ".";
import { EquipId } from "@/types/brands/equip";

export function derive_player_equip(
    improvement_lv: number,
    master_id: EquipId,
    proficiency?: number,
): PlayerEquip {
    const equip_master = derive_player_equip_master(master_id);

    const other_equip: OtherEquip = {
        master_id,
        name_en: equip_master.name_en,
        name_jp: equip_master.name_jp,
        improvement_lv,
        type_id: equip_master.type_id,
        skill_trigger_type: equip_master.skill_trigger_type,
        aaci_trigger_type: equip_master.aaci_trigger_type,
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

    if (!equip_master.flags.is_plane) return other_equip;

    const plane_equip: PlayerPlaneEquip = {
        ...other_equip,
        plane_proficiency: proficiency ?? 100,
        anti_air_resist_ship: equip_master.AA_resist_ship,
        anti_air_resist_fleet: equip_master.AA_resist_fleet,
    };

    if (equip_master.type_id !== "JET_BOMBER") return plane_equip;

    const jet_bomber_equip: JetBomberEquip = {
        ...plane_equip,
        total_jet_assault_cost: 0,
    }

    return jet_bomber_equip;
}