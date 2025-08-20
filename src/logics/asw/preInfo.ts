import { includes_equip_type, includes_player_equip_name, is_sonar, PlayerEquip } from "../../models/equip/basic";

export type ASWPreInfo = {
    /** 艦攻/艦爆 が含まれるか */
    has_any_plane_bomber: boolean,
    /** 対潜値1以上の艦爆 が含まれるか */
    has_positive_asw_dive_bomber: boolean,
    /** 対潜値1以上の艦攻 が含まれるか */
    has_positive_asw_torpedo_bomber: boolean,
    /** 対潜哨戒機が含まれるか */
    has_asw_plane: boolean,
    /** 回転翼機が含まれるか */
    has_autogyro: boolean,
    /** 対潜値7以上の艦攻が含まれるか */
    has_high_asw_torpedo_bomber: boolean,
    /** 水上爆撃機が含まれるか */
    has_seaplane_bomber: boolean,
    /** S-51J/改が含まれるか */
    has_any_S51J: boolean,
    /** ソナー系が含まれるか */
    has_any_sonar: boolean,
    /** 小型ソナーが含まれるか */
    has_small_sonar: boolean,
    /** 爆雷系が含まれるか */
    has_any_DC: boolean,
    /** 爆雷投射機が含まれるか */
    has_DCP: boolean,
    /** 爆雷が含まれるか */
    has_DC: boolean,
    /** カ号/オ号改/改二 の数 */
    low_autogyro_count: number,
}
const INITIAL: ASWPreInfo = {
    has_any_plane_bomber: false,
    has_positive_asw_dive_bomber: false,
    has_positive_asw_torpedo_bomber: false,
    has_asw_plane: false,
    has_autogyro: false,
    has_high_asw_torpedo_bomber: false,
    has_seaplane_bomber: false,
    has_any_S51J: false,
    has_any_sonar: false,
    has_small_sonar: false,
    has_any_DC: false,
    has_DCP: false,
    has_DC: false,
    low_autogyro_count: 0,
} as const;

export function derive_ASW_pre_info(
    equips: PlayerEquip[],
): ASWPreInfo {
    return equips.reduce((acc, equip) => {
        const {
            type_id,
            natural_addition,
            skill_trigger_type,
            flags,
        } = equip;
        const { asw_power } = natural_addition;
        
        if (includes_equip_type([
            'DIVE_BOMBER',
            'FIGHTER_BOMBER',
            'TORPEDO_BOMBER',
        ], type_id)) acc.has_any_plane_bomber = true;
        if (
            includes_equip_type(['DIVE_BOMBER', 'FIGHTER_BOMBER'], type_id) &&
            asw_power >= 1
        ) acc.has_positive_asw_dive_bomber = true;
        if (
            type_id === 'TORPEDO_BOMBER' &&
            asw_power >= 1
        ) acc.has_positive_asw_torpedo_bomber = true;
        if (type_id === 'ASW_PLANE') acc.has_asw_plane = true;
        if (type_id === 'AUTOGYRO') acc.has_autogyro = true;
        if (
            type_id === 'TORPEDO_BOMBER' &&
            asw_power >= 7
        ) acc.has_high_asw_torpedo_bomber = true;
        if (type_id === 'SEAPLANE_BOMBER') acc.has_seaplane_bomber = true;
        if (
            includes_player_equip_name([
                'S-51J',
                'S-51J改',
            ], equip.name_jp)
        ) acc.has_any_S51J = true;
        if (
            type_id === 'AUTOGYRO' &&
            !acc.has_any_S51J
        ) acc.low_autogyro_count++;
        if (is_sonar(equip)) acc.has_any_sonar = true;
        if (type_id === 'SONAR_S') acc.has_small_sonar = true;
        if (skill_trigger_type === 'B_DEPTHCHARGE') acc.has_any_DC = true;
        if (flags.is_DCP) acc.has_DCP = true;
        if (flags.is_DC_only) acc.has_DC = true;

        return acc;
    }, { ...INITIAL });
}