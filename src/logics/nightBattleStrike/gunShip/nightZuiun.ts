import { EquippedShip, includes_ship_type, is_abyssal_ship, is_damage_moderatery_or_more } from "@/models/ship/equipped";
import { NightBattleStrikeType } from "..";
import { NightBattleGunShipPreInfo } from ".";
import { EquipSlot } from "@/models/ship/EquipSlot";
import { is_player_equip } from "@/models/equip/basic";

/// 夜間瑞雲

type PreInfo = NightBattleGunShipPreInfo & {
    night_Zuiun_count: number,
}

const calc_pre_info = (
    equip_slots: EquipSlot[],
    gun_ship_pre_info: NightBattleGunShipPreInfo,
): PreInfo => {
    const night_Zuiun_count = equip_slots.filter(slot =>
        slot.equip !== null &&
        slot.slot_count >= 1 &&
        is_player_equip(slot.equip) &&
        slot.equip.name_jp === '試製 夜間瑞雲(攻撃装備)'
    ).length;

    return {
        ...gun_ship_pre_info,
        night_Zuiun_count,
    }
}

export function calc_night_Zuiun_types(
    attacker_ship: EquippedShip,
    gun_ship_pre_info: NightBattleGunShipPreInfo,
): NightBattleStrikeType[] {
    const types: NightBattleStrikeType[] = [];
    if (
        is_abyssal_ship(attacker_ship) ||
        is_damage_moderatery_or_more(attacker_ship) ||
        !includes_ship_type(['CL', 'CAV', 'BBV', 'AV'], attacker_ship.type_id)
    ) return types;

    const {
        main_gun_count,
        surface_radar_count,
        night_Zuiun_count,
    } = calc_pre_info(
        attacker_ship.equip_slots,
        gun_ship_pre_info,
    );
    if (main_gun_count <= 1) return types;

    if (
        night_Zuiun_count >= 2 &&
        surface_radar_count >= 1
    ) types.push('Night_Zuiun_CI_ZZR');
    if (night_Zuiun_count >= 2) types.push('Night_Zuiun_CI_ZZ');
    if (
        night_Zuiun_count >= 1 &&
        surface_radar_count >= 1
    ) types.push('Night_Zuiun_CI_ZR');
    if (night_Zuiun_count >= 1) types.push('Night_Zuiun_CI_Z');

    return types;
}