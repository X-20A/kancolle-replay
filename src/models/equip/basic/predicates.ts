import { EquipType } from "@/datas/equip/base/player";
import { AbyssalEquip, Equip, JetBomberEquip, PlaneEquip, PlayerEquip, PlayerPlaneEquip } from ".";
import { PlayerEquipNameJP } from "@/types/equip/playerNameJP";
import { AbyssalEquipId } from "@/types/equip/abyssalId";

/**
 * 艦娘装備であるか判定して返す(型ガード)
 * @param equip 
 * @returns 
 */
export function is_player_equip(equip: Equip): equip is PlayerEquip {
    return 'improvement_lv' in equip;
}

/**
 * 艦娘装備群であるか判定して返す(型ガード)
 * @param equips 
 * @returns 
 */
export function is_player_equips(equips: Equip[]): equips is PlayerEquip[] {
    return equips.every(is_player_equip);
}

/**
 * 深海装備であるか判定して返す(型ガード)
 * @param equip 
 * @returns 
 */
export function is_abyssal_equip(equip: Equip): equip is AbyssalEquip {
    return !is_player_equip(equip);
}

/**
 * 深海装備群であるか判定して返す(型ガード)
 * @param equips 
 * @returns 
 */
export function is_abyssal_equips(equips: Equip[]): equips is AbyssalEquip[] {
    return equips.every(equip => !is_player_equip(equip));
}
/**
 * 艦娘航空機系装備群であるか判定して返す
 * @param equips 
 * @returns 
 */
export function is_player_plane_equips(
    equips: Equip[],
): equips is PlayerPlaneEquip[] {
    return equips.every(equip => is_player_equip(equip) && is_player_plane_equip(equip));
}

export function includes_abyssal_equip_id(
    match_equip_ids: AbyssalEquipId[],
    search_equip_id: AbyssalEquipId,
): boolean {
    return match_equip_ids.includes(search_equip_id);
}

/**
 * 指定された艦娘装備名が対象の艦娘装備名配列に含まれているか判定して返す
 * @param match_equip_names 
 * @param search_equip_name 
 * @returns 
 */
export function includes_player_equip_name(
    match_equip_names: PlayerEquipNameJP[],
    search_equip_name: PlayerEquipNameJP,
): boolean {
    return match_equip_names.includes(search_equip_name);
}

/**
 * 指定された装備タイプが対象の装備タイプ配列に含まれているか判定して返す
 * @param match_equip_types 
 * @param search_equip_type 
 * @returns 
 */
export function includes_equip_type(
    match_equip_types: EquipType[],
    search_equip_type: EquipType,
): boolean {
    return match_equip_types.includes(search_equip_type);
}

/**
 * 航空機であるか判定して返す(型ガード)
 * @param equip 
 * @returns 
 */
export function is_plane_equip(
    equip: Equip,
): equip is PlaneEquip {
    return 'anti_air_resist_ship' in equip;
}

/**
 * プレイター側の航空機であるか判定して返す(型ガード)
 * @param equip 
 * @returns 
 */
export function is_player_plane_equip(equip: Equip): equip is PlayerPlaneEquip {
    return is_plane_equip(equip) && is_player_equip(equip);
}

export function is_fighter(equip: Equip): boolean {
    return equip.type_id === 'FIGHTER';
}

/**
 * 装備が艦爆系であるか判定して返す(含爆戦)
 * @param equip 
 * @returns 
 */
export function is_dive_bomber(equip: Equip): boolean {
    return equip.type_id === 'DIVE_BOMBER' || equip.type_id === 'FIGHTER_BOMBER';
}

/**
 * 装備が艦攻であるか判定して返す
 * @param equip 
 * @returns 
 */
export function is_torpedo_bomber(equip: Equip): boolean {
    return equip.type_id === 'TORPEDO_BOMBER';
}

/**
 * 水爆装備であるか判定して返す
 * @param equip 
 * @returns 
 */
export function is_seaplane_bomber(equip: Equip): boolean {
    return equip.type_id === 'SEAPLANE_BOMBER';
}

export function is_seaplane_fighter(equip: Equip): boolean {
    return equip.type_id === 'SEAPLANE_FIGHTER';
}

/**
 * ソナー系装備であるか判定して返す
 * @param equip 
 * @returns 
 */
export function is_sonar(equip: Equip): boolean {
    return equip.skill_trigger_type === 'B_SONAR';
}

/**
 * 陸攻系装備であるか判定して返す
 * @param plane 
 * @returns 
 */
export function is_land_based_bomber(
    equip: Equip,
): boolean {
    return equip.type_id === 'LAND_BASED_BOMBER' ||
        equip.type_id === 'LAND_BASED_BOMBER_L';
}

/**
 * 噴式爆撃機であるか判定して返す(型ガード)
 * @param equip 
 * @returns 
 */
export function is_jet_bomber(equip: Equip): equip is JetBomberEquip {
    return equip.type_id === "JET_BOMBER";
}

export function is_scamp(equip: Equip): boolean {
    return equip.type_id === 'SCAMP';
}

export function is_skip_bomber(equip: Equip): boolean {
    return equip.flags.is_skip_bomber;
}

export function can_bombing(equip: Equip): boolean {
    return equip.flags.can_bombing;
}