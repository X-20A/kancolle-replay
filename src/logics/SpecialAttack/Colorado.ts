import { is_already_special_attack_activated, PlayerFleet } from "@/models/fleet/Fleet";
import { SpecialAttackIneligible, SpecialAttackMisfire, ValidSpecialAttack } from ".";
import { FormationType, has_at_least } from "@/types";
import { is_battle_ship_category, is_damage_moderatery_or_more, is_damage_heavily, has_ship_name, PlayerEquippedShip, is_retreated } from "@/models/ship/equipped";
import { PlayerShipNameJP } from "@/types/ship/playerNameJP";
import { has_formation_type } from "../formation";
import { SpecialAttackComponentLength, SpecialAttackUnits } from "./util";
import { RandValue } from "@/types/brands/other";
import { is_random_successful } from "@/effects/random";

const TRIGGERABLE_SHIP_NAMES: Set<PlayerShipNameJP> = new Set([
    'Colorado', 'Colorado改',
    'Maryland', 'Maryland改',
]);

const TRIGGERABLE_FORMATION: Set<FormationType> = new Set([
    'Echelon',
    'CruisingFormation_2',
]);

const REQUIRED_SURFACE_SHIPS_COUNT = 6;

const is_valid_joining_ship = (
    ship: PlayerEquippedShip,
): boolean => {
    return (
        is_battle_ship_category(ship.type_id) &&
        !is_damage_heavily(ship) &&
        !is_retreated(ship) 
    );
}

/**
 * ? 暫定値
 */
const TRIGGER_RATE = 0.6;

const can_trigger = (
    attacker_fleet: PlayerFleet,
    flagship: PlayerEquippedShip,
    second_ship: PlayerEquippedShip,
    third_ship: PlayerEquippedShip,
    valid_ship_length: SpecialAttackComponentLength,
): boolean => {
    return (
        !is_already_special_attack_activated(attacker_fleet) &&
        has_ship_name(TRIGGERABLE_SHIP_NAMES, flagship.name_jp) &&
        !is_damage_moderatery_or_more(flagship) &&
        is_valid_joining_ship(second_ship) &&
        is_valid_joining_ship(third_ship) &&
        valid_ship_length >= REQUIRED_SURFACE_SHIPS_COUNT &&
        has_formation_type(TRIGGERABLE_FORMATION, attacker_fleet.formation)
    );
}

const calc_trigger_rate = (): number => {
    return TRIGGER_RATE;
}

type ColoradoClassSpecialAttack = ValidSpecialAttack<
    | 'Colorado_Special'
>

export function evaluate_Colorado_class_special_attack_type(
    attacker_fleet: PlayerFleet,
    attacker_units: SpecialAttackUnits,
    valid_ship_length: SpecialAttackComponentLength,
    rand_value: RandValue,
): ColoradoClassSpecialAttack | SpecialAttackIneligible | SpecialAttackMisfire {
    if (!has_at_least(attacker_units, 3)) return 'Ineligible';

    const flagship = attacker_units[0].ship;
    const second_ship = attacker_units[1].ship;
    const third_ship = attacker_units[2].ship;

    if (
        !can_trigger(attacker_fleet, flagship, second_ship, third_ship, valid_ship_length)
    ) return 'Ineligible';

    const trigger_rate = calc_trigger_rate();

    return is_random_successful(trigger_rate, rand_value)
        ? 'Colorado_Special'
        : 'Misfire';
}