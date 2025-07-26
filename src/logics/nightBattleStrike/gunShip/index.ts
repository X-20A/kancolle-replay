import { EquippedShip, is_heavily_damaged } from "@/models/ship/equipped";
import { NightBattleStrikeType } from "..";
import { calc_general_night_battle_strike_types } from "./general";
import { calc_night_Zuiun_types } from "./nightZuiun";
import { calc_DD_night_battle_strike_types } from "./DD";
import { EquipSlot } from "@/models/ship/EquipSlot";

/// 空母以外の夜戦 連撃|CI

export type NightBattleGunShipPreInfo = {
    main_gun_count: number,
    sec_gun_count: number,
    torpedo_count: number,
    surface_radar_count: number,
}

const calc_pre_info = (
    equip_slots: EquipSlot[],
): NightBattleGunShipPreInfo => {
    return equip_slots.reduce((total, slot) => {
        const { equip } = slot;
        if (!equip) return total;

        const { skill_trigger_type: skill_type } = equip;
        if (skill_type === 'B_MAIN_GUN') total.main_gun_count++;
        if (skill_type === 'B_SEC_GUN') total.sec_gun_count++;
        if (skill_type === 'B_TORPEDO') total.torpedo_count++;
        if (
            skill_type === 'B_RADAR' &&
            equip.natural_addition.los >= 5
        ) total.surface_radar_count++;

        return total;
    }, {
        main_gun_count: 0,
        sec_gun_count: 0,
        torpedo_count: 0,
        surface_radar_count: 0,
    } as NightBattleGunShipPreInfo);
}

export function calc_gun_ship_night_battle_strike_types(
    attacker_ship: EquippedShip,
    defender_ship: EquippedShip | 'Not_specified'
): NightBattleStrikeType[] {
    if (is_heavily_damaged(attacker_ship)) return [];

    const pre_info = calc_pre_info(attacker_ship.equip_slots);
    return [
        ...calc_DD_night_battle_strike_types(attacker_ship, defender_ship, pre_info),
        ...calc_night_Zuiun_types(attacker_ship, pre_info),
        ...calc_general_night_battle_strike_types(pre_info, defender_ship),
    ];
}