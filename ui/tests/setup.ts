import { EquipImprovementDatas } from "@/datas/equip/improvement";
import { TransportEquipDatas } from "@/datas/equip/transportEquip";
import { EquipTypeDatas } from "@/datas/equip/typeData";
import { deriveEquip, Equip } from "@/models/equip/Equip";
import { deriveAswFlags } from "@/models/ship/aswFlags";
import { EquipId } from "@/types/brands/equip";
import { EquipDatas } from "@/types/equip/player";
import { AswEquipFlags } from "@/types/ship/ship";

export function curryCreateEquip(
    equip_datas: EquipDatas,
    equip_type_datas: EquipTypeDatas,
    equip_improvement_datas: EquipImprovementDatas,
    transport_equip_datas: TransportEquipDatas,
): (master_id: EquipId, improvement_lv: number) => Equip {
    return (
        master_id: EquipId,
        improvement_lv: number,
    ): Equip => {
        return deriveEquip(
            equip_datas,
            equip_type_datas,
            equip_improvement_datas,
            transport_equip_datas,
            master_id,
            improvement_lv,
        );
    };
}

export function curryDeriveAswFlags(
    equip_type_datas: EquipTypeDatas,
): (equips: Equip[]) => AswEquipFlags {
    return (
        equips: Equip[]
    ): AswEquipFlags => {
        return deriveAswFlags(
            equip_type_datas,
            equips,
        )
    }
}