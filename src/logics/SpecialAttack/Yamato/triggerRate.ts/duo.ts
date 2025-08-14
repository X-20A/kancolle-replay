import { RandValue } from "@/types/brands/other";
import { ValidYamatoSpecialAttack } from "..";
import { SpecialAttackMisfire } from "../..";
import { has_ship_name, PlayerEquippedShip } from "@/models/ship/equipped";
import { is_random_successful } from "@/effects/random";
import { PlayerShipNameJP } from "@/types/ship/playerNameJP";
import { has_high_accuracy_radar } from "../../util";
import { FirstShip, SecondShip } from "@/types/fleet/ship";

/// 大和型2隻タッチ 発動率

const YAMATO_KAI_NI_SERIES: Set<PlayerShipNameJP> = new Set([
    '大和改二', '大和改二重' // 大和、大和改はそもそも武蔵旗艦時に発動できない
]);

const MUSASHI_SERIES: Set<PlayerShipNameJP> = new Set([
    '武蔵', '武蔵改', '武蔵改二',
]);

const calc_partner_mod = (
    second_ship: SecondShip,
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
    first_ship: FirstShip,
    second_ship: SecondShip,
): number => {
    return Math.floor(
        + Math.sqrt(first_ship.lv)
        + Math.sqrt(second_ship.lv)
        + 1.25 * first_ship.edited_status.luck
        + 1.25 * second_ship.edited_status.luck
        + calc_partner_mod(second_ship)
        + calc_radar_mod(first_ship)
        + calc_radar_mod(second_ship)
        + 33
    );
}

type YamatoDuoSpecialAttack = ValidYamatoSpecialAttack<
    | 'Yamato_Duo_Special'
>

export function evaluate_Yamato_duo_special_attack(
    first_ship: FirstShip,
    second_ship: SecondShip,
    rand_value: RandValue,
): YamatoDuoSpecialAttack | SpecialAttackMisfire {
    const trigger_rate = calc_trigger_rate(
        first_ship,
        second_ship,
    );

    return is_random_successful(trigger_rate, rand_value)
        ? 'Yamato_Duo_Special'
        : 'Misfire';
}