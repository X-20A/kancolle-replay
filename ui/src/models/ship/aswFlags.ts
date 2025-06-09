import { EquipTypeDatas } from "@/datas/equip/typeData";
import { AswEquipFlags } from "@/types/ship/ship";
import { Equip } from "../equip/Equip";
import { SkillTriggerEquipType } from "@/types/equip/player";
import { EquipType } from "@/datas/equip/base/player";

export function deriveAswFlags(
    equip_type_datas: EquipTypeDatas,
    equips: Equip[],
): AswEquipFlags {
const {
        has_sonar,
        has_sonar_S,
        has_DC,
        has_DCP,
        has_DC_only,
    } = equips.reduce(
        (acc, equip) => {
            const type_data = equip_type_datas[equip.type_id];
            if (!type_data.can_asw_damage) return acc;

            return {
                has_sonar: acc.has_sonar || equip.skill_trigger_type === SkillTriggerEquipType.B_SONAR,
                has_sonar_S: acc.has_sonar_S || equip.type_id === EquipType.SONAR_S,
                has_DC: acc.has_DC || equip.skill_trigger_type === SkillTriggerEquipType.B_DEPTHCHARGE,
                has_DCP: acc.has_DCP || equip.flags.is_DCP,
                has_DC_only: acc.has_DC_only || equip.flags.is_DC_only,
            };
        },
        {
            has_sonar: false,
            has_sonar_S: false,
            has_DC: false,
            has_DCP: false,
            has_DC_only: false,
        }
    );

    return {
        has_sonar,
        has_sonar_S,
        has_DC,
        has_DCP,
        has_DC_only,
    }
}