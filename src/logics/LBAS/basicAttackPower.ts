import { is_jet_bomber_equip, is_land_based_bomber, PlaneEquip, PlayerPlaneEquip } from "@/models/equip/basic";
import { JetSquadron, LBAS } from "@/models/LBAS";
import { AbyssalEquippedShip, includes_ship_type, is_battle_ship_category, is_install_type, is_submarine_category } from "@/models/ship/equipped";

/// 基地航空隊 基本攻撃力

/**
 * 陸偵補正(Mod LBR)を返す
 * @param lbas 
 * @returns 
 */
const calc_land_based_scout_mod = (
    lbas: LBAS,
): number => {
    return lbas.squadrons.reduce((highest_value, squadron) => {
        const plane_name = squadron.plane.name_jp;

        // 陸偵が複数ある場合は最高値だけを返す
        if (plane_name === '二式陸上偵察機' || plane_name === 'Mosquito PR Mk.IV') {
            const MOD = 1.125;
            return Math.max(highest_value, MOD);
        }
        if (plane_name === '二式陸上偵察機(熟練)') {
            const MOD = 1.15;
            return Math.max(highest_value, MOD);
        }

        return highest_value;
    }, 1);
}

/**
 * 基地航空隊の基本攻撃力に使用する種別倍率(Mod type)を返す
 * @param plane 
 * @returns 
 */
const calc_plane_type_coeffinet = (
    plane: PlaneEquip,
): number => {
    if (is_land_based_bomber(plane)) return 0.8;
    if (is_jet_bomber_equip(plane)) return 0.7071;
    return 1;
}

/**
 * 陸攻補正(Mod LBB)を返す
 * @param plane 
 * @returns 
 */
const calc_land_based_bomber_mod = (
    plane: PlaneEquip,
): number => {
    return is_land_based_bomber(plane)
        ? 1.8
        : 1;
}

type RawBasePowerResult = {
    natural_status: number,
    improvement_bonus: number,
}

const calc_raw_base_power = (
    plane: PlayerPlaneEquip,
    target_ship: AbyssalEquippedShip,
): RawBasePowerResult => {
    const { natural_addition, improvement_addition, flags } = plane;
    const { asw, aerial_bomb_power, aerial_torpedo_power } = natural_addition;
    const {
        asw_power: improve_asw,
        aerial_bomb_power: improve_bomb,
        aerial_torpedo_power: improve_torpedo,
    } = improvement_addition;

    if (is_submarine_category(target_ship)) {
        return {
            natural_status: asw,
            improvement_bonus: improve_asw,
        };
    }
    if (is_land_based_bomber(plane)) {
        return {
            natural_status: is_install_type(target_ship) ? aerial_bomb_power : aerial_torpedo_power,
            improvement_bonus: is_install_type(target_ship) ? improve_bomb : improve_torpedo,
        };
    }
    if (flags.is_dive_bomber) {
        return {
            natural_status: aerial_bomb_power,
            improvement_bonus: improve_bomb,
        };
    }
    return {
        natural_status: is_install_type(target_ship)
            ? Math.floor(aerial_torpedo_power / 2)
            : aerial_torpedo_power,
        improvement_bonus: improve_torpedo,
    };
};

const calc_special_base_power = (
    plane: PlayerPlaneEquip,
    target_ship: AbyssalEquippedShip,
    raw_base_power: number,
): number => {
    const plane_name = plane.name_jp;
    const target_ship_type = target_ship.type_id;

    if (
        plane_name === '爆装一式戦 隼III型改(65戦隊)' &&
        target_ship.type_id === 'DD'
    ) return 25;
    if (
        plane_name === '一式戦 隼III型改(熟練/20戦隊)' &&
        target_ship.type_id === 'DD'
    ) return 30;
    if (
        plane_name === 'Do 217 E-5+Hs293初期型' &&
        !is_install_type(target_ship) &&
        target_ship.type_id === 'DD'
    ) return raw_base_power * 1.1;
    if (
        plane_name === 'Do 217 K-2 + Fritz-X' &&
        !is_install_type(target_ship) &&
        is_battle_ship_category(target_ship.type_id)
    ) return raw_base_power * 1.5;
    if (
        plane_name === '四式重爆 飛龍+イ号一型甲 誘導弾' &&
        !is_install_type(target_ship)
    ) {
        if (
            includes_ship_type(['DD', 'CL', 'CLT', 'CA', 'CAV'], target_ship_type)
        ) return raw_base_power * 1.15;
        if (
            includes_ship_type(['CVL', 'FBB', 'BB', 'BBV', 'CV'], target_ship_type)
        ) return raw_base_power * 1.13;
    }
    if (plane_name === 'キ102乙改+イ号一型乙 誘導弾') {
        if (
            includes_ship_type(['DD', 'CL', 'CLT', 'CA', 'CAV'], target_ship_type)
        ) return raw_base_power * 1.16;
        if (
            includes_ship_type(['CVL', 'FBB', 'BB', 'BBV', 'CV'], target_ship_type)
        ) return raw_base_power * 1.14;
    }
    if (plane_name === '四式重爆 飛龍(熟練)+イ号一型甲 誘導弾') {
        if (is_install_type(target_ship)) return raw_base_power + 2.1;
        if (
            includes_ship_type(['DD', 'CL', 'CLT', 'CA', 'CAV'], target_ship_type)
        ) return raw_base_power + 2.6;
        if (
            includes_ship_type(['CVL', 'FBB', 'BB', 'BBV', 'CV'], target_ship_type)
        ) return raw_base_power + 2.25;
    }

    return raw_base_power;
}

/**
 * 基地航空隊の基本攻撃力に使用する基礎能力を返す
 * @param plane 
 * @param target_ship 
 * @returns 
 */
const calc_base_power = (
    plane: PlayerPlaneEquip,
    target_ship: AbyssalEquippedShip,
): number => {
    const {
        natural_status,
        improvement_bonus,
    } = calc_raw_base_power(plane, target_ship);

    const special_base_power =
        calc_special_base_power(plane, target_ship, natural_status);

    return special_base_power + improvement_bonus;
}

/**
 * 基地航空隊の基本攻撃力を返す
 * @param squadron 
 * @param target_ship 
 * @returns 
 */
export function calc_basic_LBAS_attack_power(
    squadron: JetSquadron,
    target_ship: AbyssalEquippedShip,
): number {
    const plane_type_coeffient = calc_plane_type_coeffinet(squadron.plane);
    const base_power = calc_base_power(squadron.plane, target_ship);
    const slot_count = squadron.slot_count;
    const land_based_bomber_mod = calc_land_based_bomber_mod(squadron.plane);

    return plane_type_coeffient * (base_power * Math.sqrt(slot_count * land_based_bomber_mod))
        + 25;
}