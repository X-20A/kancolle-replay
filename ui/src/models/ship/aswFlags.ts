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
        has_positive_asw_dive_bomber,
        has_positive_asw_torpedo_bomber,
        has_asw_plane,
        has_autogyro,
        has_high_asw_torpedo_bomber,
        has_seaplane_bomber,
        has_any_S51J,
        low_autogyro_count,

        has_any_sonar,
        has_small_sonar,
        has_any_DC,
        has_DCP,
        has_DC,
    } = equips.reduce(
        (acc, equip) => {
            const has_positive_asw_dive_bomber =
                [EquipType.DIVE_BOMBER, EquipType.FIGHTER_BOMBER].includes(equip.type_id)
                && equip.natural_addition.asw >= 1;
            const has_positive_asw_torpedo_bomber =
                equip.type_id === EquipType.TORPEDO_BOMBER
                && equip.natural_addition.asw >= 1;
            const has_asw_plane = equip.type_id === EquipType.ASW_PLANE;
            const has_autogyro = equip.type_id === EquipType.AUTOGYRO;
            const has_high_asw_torpedo_bomber =
                equip.type_id === EquipType.TORPEDO_BOMBER
                && equip.natural_addition.asw >= 7;
            const has_seaplane_bomber = equip.type_id === EquipType.SEAPLANE_BOMBER;
            const has_any_S51J = [
                326, // S-51J
                327, // S-51J改
            ].includes(equip.master_id);
            const is_low_autogyro = equip.type_id === EquipType.AUTOGYRO && !has_any_S51J;

            const has_any_sonar = equip.skill_trigger_type === SkillTriggerEquipType.B_SONAR;
            const has_small_sonar = equip.type_id === EquipType.SONAR_S;
            const has_any_DC = equip.skill_trigger_type === SkillTriggerEquipType.B_DEPTHCHARGE;
            const has_DCP = equip.flags.is_DCP;
            const has_DC = equip.flags.is_DC_only;

            return {
                has_positive_asw_dive_bomber: acc.has_positive_asw_dive_bomber || has_positive_asw_dive_bomber,
                has_positive_asw_torpedo_bomber: acc.has_positive_asw_torpedo_bomber || has_positive_asw_torpedo_bomber,
                has_asw_plane: acc.has_asw_plane || has_asw_plane,
                has_autogyro: acc.has_autogyro || has_autogyro,
                has_high_asw_torpedo_bomber: has_high_asw_torpedo_bomber || has_high_asw_torpedo_bomber,
                has_seaplane_bomber: has_seaplane_bomber || has_seaplane_bomber,
                has_any_S51J: has_any_S51J || has_any_S51J,
                low_autogyro_count: acc.low_autogyro_count + (is_low_autogyro ? 1 : 0),

                has_any_sonar: acc.has_any_sonar || has_any_sonar,
                has_small_sonar: acc.has_small_sonar || has_small_sonar,
                has_any_DC: acc.has_any_DC || has_any_DC,
                has_DCP: acc.has_DCP || has_DCP,
                has_DC: acc.has_DC || has_DC,
            };
        },
        {
            has_positive_asw_dive_bomber: false,
            has_positive_asw_torpedo_bomber: false,
            has_asw_plane: false,
            has_autogyro: false,
            has_high_asw_torpedo_bomber: false,
            has_seaplane_bomber: false,
            has_any_S51J: false,
            low_autogyro_count: 0,

            has_any_sonar: false,
            has_small_sonar: false,
            has_any_DC: false,
            has_DCP: false,
            has_DC: false,
        }
    );

    const has_multiple_low_autogyro = low_autogyro_count >= 2;

    return {
        has_positive_asw_dive_bomber,
        has_positive_asw_torpedo_bomber,
        has_asw_plane,
        has_autogyro,
        has_high_asw_torpedo_bomber,
        has_seaplane_bomber,
        has_any_S51J,
        has_multiple_low_autogyro,

        has_any_sonar,
        has_small_sonar,
        has_any_DC,
        has_DCP,
        has_DC,
    }
}