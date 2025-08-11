import { PlayerShipNameJP } from "@/types/ship/playerNameJP";
import { SpecialAttackIneligible, SpecialAttackMisfire, ValidSpecialAttack } from "..";
import { is_already_special_attack_activated, PlayerFleet } from "@/models/fleet/Fleet";
import { SpecialAttackComponentLength, SpecialAttackUnits } from "../util";
import { FormationType, has_at_least } from "@/types";
import { has_formation_type } from "../../formation";
import { has_ship_name, is_damage_moderatery_or_more, PlayerEquippedShip } from "@/models/ship/equipped";
import { RandValue } from "@/types/brands/other";
import { evaluate_Yamato_trio_special_attack } from "./trio";
import { evaluate_Yamato_duo_special_attack } from "./duo";
import { PlayerFleetUnit } from "@/models/fleet/FleetUnit";

const TRIGGERABLE_SHIP_NAMES = new Set<PlayerShipNameJP>([
    '大和改二',
    '大和改二重',
    '武蔵改二',
]);

const TRIGGERABLE_FORMATIONS = new Set<FormationType>([
    'Echelon',
    'CruisingFormation_4',
]);

const REQUIRED_SURFACE_SHIPS_COUNT = 6;

const can_trigger = (
    attacker_fleet: PlayerFleet,
    flagship: PlayerEquippedShip,
    second_ship: PlayerEquippedShip,
    valid_ship_length: SpecialAttackComponentLength,
): boolean => {
    return (
        has_ship_name(TRIGGERABLE_SHIP_NAMES, flagship.name_jp) &&
        !is_already_special_attack_activated(attacker_fleet) &&
        valid_ship_length >= REQUIRED_SURFACE_SHIPS_COUNT &&
        has_formation_type(TRIGGERABLE_FORMATIONS, attacker_fleet.formation) &&
        !is_damage_moderatery_or_more(flagship) &&
        !is_damage_moderatery_or_more(second_ship)
    );
}

export type YamatoClassSpecialAttack = ValidSpecialAttack<
    | 'Yamato_2_Ships_Special'
    | 'Yamato_3_Ships_Special'
>

export type ValidYamatoSpecialAttack<K extends YamatoClassSpecialAttack> = K;

export function evaluate_Yamato_class_special_attack(
    attacker_fleet: PlayerFleet,
    attacker_units: SpecialAttackUnits,
    valid_ship_length: SpecialAttackComponentLength,
    rand_values: [RandValue, RandValue],
): YamatoClassSpecialAttack | SpecialAttackIneligible | SpecialAttackMisfire {
    if (!has_at_least(attacker_units, 3)) return 'Ineligible';

    const flagship = attacker_units[0].ship;
    const second_ship = attacker_units[1].ship;
    const third_ship = attacker_units[2].ship;

    if (
        !can_trigger(attacker_fleet, flagship, second_ship, valid_ship_length)
    ) return 'Ineligible';

    const Yamato_trio_special_attack_result =
        evaluate_Yamato_trio_special_attack(second_ship, third_ship, rand_values[0]);
    if (
        Yamato_trio_special_attack_result === 'Yamato_3_Ships_Special'
    ) return Yamato_trio_special_attack_result;

    return evaluate_Yamato_duo_special_attack(flagship, second_ship, rand_values[1]);
}

export function extract_participate_Yamato_class_special_attack_units(
    attacker_units: SpecialAttackUnits,
    special_attack_type: YamatoClassSpecialAttack,
): PlayerFleetUnit[] {
    if (
        !has_at_least(attacker_units, 3)
    ) throw Error('大和型タッチの参加艦を抽出しようとしましたが、該当艦が存在しませんでした');
    return special_attack_type === 'Yamato_2_Ships_Special'
        ? [
            attacker_units[0],
            attacker_units[1],
        ]
        : [
            attacker_units[0],
            attacker_units[1],
            attacker_units[2],
        ];
}