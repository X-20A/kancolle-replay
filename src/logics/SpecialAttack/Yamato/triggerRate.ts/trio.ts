import { PlayerEquippedShip } from "@/models/ship/equipped";
import { PlayerShipNameJP } from "@/types/ship/playerNameJP";
import { SpecialAttackIneligible, SpecialAttackMisfire } from "..";
import { ValidYamatoSpecialAttack } from ".";
import { is_random_successful } from "@/effects/random";
import { RandValue } from "@/types/brands/other";

const ANY_ORDER_COMBINATIONS: Set<PlayerShipNameJP>[] = [
    new Set(['長門改二', '陸奥改二']),
    new Set(['伊勢改二', '日向改二']),
    new Set(['扶桑改二', '山城改二']),
    new Set(['Warspite改', 'Nelson改']),
    new Set(['Warspite改', 'Valiant改']),
    new Set(['Nelson改', 'Rodney改']),
    new Set(['金剛改二丙', '比叡改二丙']),
    new Set(['金剛改二丙', '榛名改二乙']),
    new Set(['金剛改二丙', '榛名改二丙']),
    new Set(['金剛改二丙', '霧島改二丙']),
    new Set(['比叡改二丙', '霧島改二丙']),
    new Set(['South Dakota改', 'Washington改']),
    new Set(['Colorado改', 'Maryland改']),
    new Set(['Italia', 'Roma改']),
    new Set(['Richelieu改', 'Jean Bart改']),
    new Set(['Richelieu', 'Jean Bart改']),
];

const FIXED_ORDER_COMBINATIONS: [PlayerShipNameJP, PlayerShipNameJP][] = [
    ['武蔵改二', '長門改二'],
    ['武蔵改二', '陸奥改二'],
];

const TRIGGER_RATE = 0.8;

const is_any_order_match = (
    second_ship: PlayerEquippedShip,
    third_ship: PlayerEquippedShip,
): boolean => {
    return ANY_ORDER_COMBINATIONS.some(combination =>
        combination.has(second_ship.name_jp) &&
        combination.has(third_ship.name_jp)
    );
}

const is_fixed_order_match = (
    second_ship: PlayerEquippedShip,
    third_ship: PlayerEquippedShip,
): boolean => {
    return FIXED_ORDER_COMBINATIONS.some(([expected_second, expected_third]) =>
        second_ship.name_jp === expected_second &&
        third_ship.name_jp === expected_third
    );
}

const calc_trigger_rate = (): number => {
    return TRIGGER_RATE;
}

type YamatoTrioSpecialAttack = ValidYamatoSpecialAttack<
    | 'Yamato_Trio_Special'
>

export function evaluate_Yamato_trio_special_attack(
    second_ship: PlayerEquippedShip,
    third_ship: PlayerEquippedShip,
    rand_value: RandValue,
): YamatoTrioSpecialAttack | SpecialAttackIneligible | SpecialAttackMisfire {
    if (
        !is_any_order_match(second_ship, third_ship) ||
        !is_fixed_order_match(second_ship, third_ship)
    ) return 'Ineligible';

    const trigger_rate = calc_trigger_rate();

    return is_random_successful(trigger_rate, rand_value)
        ? 'Yamato_Trio_Special'
        : 'Misfire';
}