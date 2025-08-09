import { FormationType, has_at_least } from "@/types";
import { SpecialAttackIneligible, SpecialAttackMisfire, ValidSpecialAttack } from ".";
import { SpecialAttackComponentLength, SpecialAttackUnits } from "./util";
import { is_already_special_attack_activated, PlayerFleet } from "@/models/fleet/Fleet";
import { PlayerShipNameJP } from "@/types/ship/playerNameJP";
import { has_ship_name, is_damage_heavily, is_damage_moderatery_or_more, is_retreated, PlayerEquippedShip } from "@/models/ship/equipped";
import { has_formation_type } from "../formation";
import { is_random_successful } from "@/effects/random";
import { RandValue } from "@/types/brands/other";

const TRIGGERABLE_SHIP_NAMES: Set<PlayerShipNameJP> = new Set([
    'Richelieu改', 'Richelieu Deux',
    'Jean Bart改',
]);

const TRIGGERABLE_FORMATION: Set<FormationType> = new Set([
    'Echelon',
    'CruisingFormation_2',
]);

const REQUIRED_SURFACE_SHIPS_COUNT = 6;

const TRIGGER_RATE = 0.6;

const can_trigger = (
    attacker_fleet: PlayerFleet,
    flagship: PlayerEquippedShip,
    second_ship: PlayerEquippedShip,
    valid_ship_length: SpecialAttackComponentLength,
): boolean => {
    return (
        !is_already_special_attack_activated(attacker_fleet) &&
        has_ship_name(TRIGGERABLE_SHIP_NAMES, flagship.name_jp) &&
        !is_damage_moderatery_or_more(flagship) &&
        has_ship_name(TRIGGERABLE_SHIP_NAMES, second_ship.name_jp) &&
        !is_damage_heavily(second_ship) &&
        !is_retreated(second_ship) &&
        valid_ship_length >= REQUIRED_SURFACE_SHIPS_COUNT &&
        has_formation_type(TRIGGERABLE_FORMATION, attacker_fleet.formation)
    );
}

const calc_trigger_rate = (): number => {
    return TRIGGER_RATE;
}

type RichelieuClassSpecialAttack = ValidSpecialAttack<
    | 'Richelieu_Special'
>

export function evaluate_Nagato_class_special_attack(
    attacker_fleet: PlayerFleet,
    attacker_units: SpecialAttackUnits,
    valid_ship_length: SpecialAttackComponentLength,
    rand_value: RandValue,
): RichelieuClassSpecialAttack | SpecialAttackIneligible | SpecialAttackMisfire {
    if (!has_at_least(attacker_units, 2)) return 'Ineligible';

    const flagship = attacker_units[0].ship;
    const second_ship = attacker_units[1].ship;

    if (
        !can_trigger(attacker_fleet, flagship, second_ship, valid_ship_length)
    ) return 'Ineligible';

    const trigger_rate = calc_trigger_rate();

    return is_random_successful(trigger_rate, rand_value)
        ? 'Richelieu_Special'
        : 'Misfire';
}