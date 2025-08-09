import { PlayerShipNameJP } from "@/types/ship/playerNameJP";
import { SpecialAttackIneligible, SpecialAttackMisfire, ValidSpecialAttack } from ".";
import { is_already_special_attack_activated, PlayerFleet } from "@/models/fleet/Fleet";
import { SpecialAttackComponentLength, SpecialAttackUnits } from "./util";
import { FormationType, has_at_least } from "@/types";
import { has_ship_name, includes_ship_type, is_damage_moderatery_or_more, is_operational, PlayerEquippedShip } from "@/models/ship/equipped";
import { has_formation_type } from "../formation";
import { is_random_successful } from "@/effects/random";
import { RandValue } from "@/types/brands/other";

const TRIGGERABLE_SHIP_NAMES: Set<PlayerShipNameJP> = new Set([
    'Nelson', 'Nelson改',
    'Rodney', 'Rodney改',
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
        !includes_ship_type(['CV', 'CVB', 'CVL', 'SS', 'SSV'], ship.type_id) &&
        is_operational(ship)
        // 大破はok
    );
}

const can_trigger = (
    attacker_fleet: PlayerFleet,
    flagship: PlayerEquippedShip,
    third_ship: PlayerEquippedShip,
    fifth_ship: PlayerEquippedShip,
    valid_ship_length: SpecialAttackComponentLength,
): boolean => {
    return (
        !is_already_special_attack_activated(attacker_fleet) &&
        has_ship_name(TRIGGERABLE_SHIP_NAMES, flagship.name_jp) &&
        !is_damage_moderatery_or_more(flagship) &&
        is_valid_joining_ship(third_ship) &&
        is_valid_joining_ship(fifth_ship) &&
        valid_ship_length >= REQUIRED_SURFACE_SHIPS_COUNT &&
        has_formation_type(TRIGGERABLE_FORMATION, attacker_fleet.formation)
    );
}

const calc_trigger_rate = (
    flagship: PlayerEquippedShip,
    third_ship: PlayerEquippedShip,
    fifth_ship: PlayerEquippedShip,
): number => {
    return Math.floor(
        1.1 * Math.sqrt(flagship.lv)
        + Math.sqrt(third_ship.lv)
        + Math.sqrt(fifth_ship.lv)
        + 1.4 * Math.sqrt(flagship.edited_status.luck)
        + 25
    );
}

type NelsonClassSpecialAttack = ValidSpecialAttack<
    | 'Nelson_Special'
>

export function evaluate_Nagato_class_special_attack(
    attacker_fleet: PlayerFleet,
    attacker_units: SpecialAttackUnits,
    valid_ship_length: SpecialAttackComponentLength,
    rand_value: RandValue,
): NelsonClassSpecialAttack | SpecialAttackIneligible | SpecialAttackMisfire {
    if (!has_at_least(attacker_units, 5)) return 'Ineligible';

    const flagship = attacker_units[0].ship;
    const third_ship = attacker_units[2].ship;
    const fifth_ship = attacker_units[4].ship;

    if (
        !can_trigger(attacker_fleet, flagship, third_ship, fifth_ship, valid_ship_length)
    ) return 'Ineligible';

    const trigger_rate = calc_trigger_rate(
        flagship,
        third_ship,
        fifth_ship,
    );

    return is_random_successful(trigger_rate, rand_value)
        ? 'Nelson_Special'
        : 'Misfire';
}