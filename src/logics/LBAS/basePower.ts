import { is_dive_bomber, is_land_based_bomber, PlaneEquip, PlayerPlaneEquip } from "@/models/equip/basic";
import { JetSquadron, Squadron } from "@/models/LBAS";
import { AbyssalEquippedShip, includes_abyssal_ship_id, includes_ship_type, is_battle_ship_category, is_install_type, is_PT, is_submarine_category } from "@/models/ship/equipped";
import { Brand } from "@/types/brands";
import { RandValue } from "@/types/brands/other";

/// 基地航空隊
/// {(雷装 or 爆装 + 改修強化値(基地) ) × √(搭載数補正 × 搭載数) + 25}

type RawBasePowerResult = {
    natural_status: number,
    improvement_bonus: number,
}

const calc_raw_base_power = (
    plane: PlayerPlaneEquip,
    target_ship: AbyssalEquippedShip,
): RawBasePowerResult => {
    const { natural_addition, improvement_addition } = plane;
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
    if (is_dive_bomber(plane)) {
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


/**
 * 特定の目標に対する攻撃力加算値(Mod Sp2)を返す    
 * ? 65戦隊、20戦隊(熟練) 共に素雷装0なので加算なのか上書きなのか判別できない
 * ? ENwikiは加算、Sortie Simは上書き 暫定: 加算
 * @param plane 
 * @param target_ship 
 * @returns 
 */
const calc_mod_sp2_flat = (
    plane: PlayerPlaneEquip,
    target_ship: AbyssalEquippedShip,
): number => {
    if (
        plane.name_jp === '爆装一式戦 隼III型改(65戦隊)' &&
        target_ship.type_id === 'DD'
    ) return 25;
    if (
        plane.name_jp === '一式戦 隼III型改(熟練/20戦隊)' &&
        target_ship.type_id === 'DD'
    ) return 30;

    return 0;
}

/**
 * 特定の目標に対する攻撃力加算値(Mod Sp1)を返す
 * @param plane 
 * @param target_ship 
 * @param raw_base_power 
 * @returns 
 */
const calc_mod_sp1_flat = (
    plane: PlayerPlaneEquip,
    target_ship: AbyssalEquippedShip,
    raw_base_power: number,
): number => {
    const plane_name = plane.name_jp;
    const target_ship_type = target_ship.type_id;
    
    if (
        plane_name === 'Do 217 E-5+Hs293初期型' &&
        !is_install_type(target_ship) &&
        target_ship.type_id === 'DD'
    ) return raw_base_power * 1.1;
    if (
        plane_name === 'Do 217 K-2+Fritz-X' &&
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
 * 基地航空隊の基本項計算に使用する基礎能力を返す
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

    const mod_sp1_flat =
        calc_mod_sp1_flat(plane, target_ship, natural_status);

    const mod_sp2_flat = calc_mod_sp2_flat(plane, target_ship);

    return mod_sp1_flat * natural_status
        + improvement_bonus
        + mod_sp2_flat;
}

export type LbasBasePower = Brand<number, 'LbasBasePower'>

/**
 * 基地航空隊の基本項を返す    
 * ! 基本攻撃力に非ず
 * @param squadron 
 * @param target_ship 
 * @returns 
 */
export function calc_basic_LBAS_attack_power(
    squadron: Squadron,
    target_ship: AbyssalEquippedShip,
): LbasBasePower {
    const base_power = calc_base_power(squadron.plane, target_ship);
    const slot_count = squadron.slot_count;
    const SLOT_COUNT_COEFFINENT = 1.8;
    const DEFAULT_BONUS_FLAT = 25;

    return (base_power * Math.sqrt(SLOT_COUNT_COEFFINENT * slot_count)
        + DEFAULT_BONUS_FLAT) as LbasBasePower;
}