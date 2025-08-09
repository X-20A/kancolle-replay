import { RandValue } from "@/types/brands/other";
import { ValidYamatoSpecialAttack } from ".";
import { SpecialAttackMisfire } from "..";
import { has_ship_name, PlayerEquippedShip } from "@/models/ship/equipped";
import { is_random_successful } from "@/effects/random";
import { PlayerShipNameJP } from "@/types/ship/playerNameJP";
import { is_equip_exsist } from "@/models/ship/EquipSlot";
import { is_radar } from "@/models/equip/basic";
import { has_high_accuracy_radar } from "../util";

const YAMATO_KAI_NI_SERIES: Set<PlayerShipNameJP> = new Set([
    '大和改二', '大和改二重' // 大和、大和改はそもそも武蔵旗艦時に発動できない
]);

const MUSASHI_SERIES: Set<PlayerShipNameJP> = new Set([
    '武蔵', '武蔵改', '武蔵改二',
]);

const calc_partner_mod = (
    second_ship: PlayerEquippedShip,
): number => {
    const { name_jp } = second_ship;

    if (has_ship_name(YAMATO_KAI_NI_SERIES, name_jp)) return 4;
    if (has_ship_name(MUSASHI_SERIES, name_jp)) return 7;

    return 0;
}

const calc_radar_mod = (
    ship: PlayerEquippedShip,
): number => {
    return has_high_accuracy_radar(ship)
        ? 10
        : 0;
}

const calc_trigger_rate = (
    flagship: PlayerEquippedShip,
    second_ship: PlayerEquippedShip,
): number => {
    return Math.floor(
        + Math.sqrt(flagship.lv)
        + Math.sqrt(second_ship.lv)
        + 1.25 * flagship.edited_status.luck
        + 1.25 * second_ship.edited_status.luck
        + calc_partner_mod(second_ship)
        + calc_radar_mod(flagship)
        + calc_radar_mod(second_ship)
        + 33
    );
}

type YamatoDuoSpecialAttack = ValidYamatoSpecialAttack<
    | 'Yamato_2_Ships_Special'
>

export function evaluate_Yamato_duo_special_attack(
    flagship: PlayerEquippedShip,
    second_ship: PlayerEquippedShip,
    rand_value: RandValue,
): YamatoDuoSpecialAttack | SpecialAttackMisfire {
    const trigger_rate = calc_trigger_rate(
        flagship,
        second_ship,
    );

    return is_random_successful(trigger_rate, rand_value)
        ? 'Yamato_2_Ships_Special'
        : 'Misfire';
}