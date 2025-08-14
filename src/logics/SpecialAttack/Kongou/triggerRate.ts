import { has_ship_name } from "@/models/ship/equipped";
import { has_high_accuracy_radar } from "../util";
import { PlayerShipNameJP } from "@/types/ship/playerNameJP";
import { is_equip_exsist } from "@/models/ship/EquipSlot";
import { is_searchlight_L } from "@/models/equip/basic";
import { FirstShip, SecondShip } from "@/types/fleet/ship";

const calc_radar_mod = (
    first_ship: FirstShip,
): number => {
    const { name_jp: flagship_name } = first_ship;
    if (flagship_name === '霧島改二丙') return 0; // ? 不明
    if (!has_high_accuracy_radar(first_ship)) return 0;

    if (flagship_name === '金剛改二丙') return 30;
    if (flagship_name === '比叡改二丙') return 10;
    if (flagship_name === '榛名改二乙') return 15;
    return 20; // flagship_name === '榛名改二丙'
}

const SEARCHLIGHT_BONUS_SHIP_NAMES: Set<PlayerShipNameJP> = new Set([
    '金剛改二丙',
    '比叡改二丙',
])

const calc_searchlight_mod = (
    first_ship: FirstShip,
): number => {
    const { name_jp: flagship_name } = first_ship;
    if (!has_ship_name(SEARCHLIGHT_BONUS_SHIP_NAMES, flagship_name)) return 0;
    const has_searchlight_L = first_ship.equip_slots.some(slot => {
        const { equip } = slot;

        return is_equip_exsist(equip) &&
            is_searchlight_L(equip);
    });
    if (!has_searchlight_L) return 0;

    if (flagship_name === '金剛改二丙') return 10;
    if (flagship_name === '比叡改二丙') return 30;

    throw new Error('金剛タッチを発動できない旗艦が渡されました');
}

export function calc_Kongou_special_trigger_rate(
    first_ship: FirstShip,
    second_ship: SecondShip,
): number {
    const radar_mod = calc_radar_mod(first_ship);
    const searchlight_mod = calc_searchlight_mod(first_ship);

    return Math.floor(
        + 3.5 * Math.sqrt(first_ship.lv)
        + 3.5 * Math.sqrt(second_ship.lv)
        + 1.1 * Math.sqrt(first_ship.edited_status.luck)
        + 1.1 * Math.sqrt(second_ship.edited_status.luck)
        + radar_mod
        + searchlight_mod
    );
}