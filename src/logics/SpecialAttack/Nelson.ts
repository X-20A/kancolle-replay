import { PlayerShipNameJP } from "@/types/ship/playerNameJP";
import { SpecialAttacckIneligible, ValidSpecialAttack } from ".";
import { is_already_special_attack_activated, PlayerFleet } from "@/models/fleet/Fleet";
import { SpecialAttackComponentLength, SpecialAttackUnits } from "./util";
import { FormationType, has_at_least } from "@/types";
import { includes_ship_name, includes_ship_type, is_damage_moderatery_or_more, is_operational, PlayerEquippedShip } from "@/models/ship/equipped";
import { includes_formation_type } from "../formation";

const TRIGGERABLE_SHIP_NAMES: PlayerShipNameJP[] = [
    'Nelson', 'Nelson改',
    'Rodney', 'Rodney改',
] as const;

const TRIGGERABLE_FORMATION: FormationType[] = [
    'Echelon',
    'CruisingFormation_2',
] as const;

const REQUIRED_SURFACE_SHIP_COUNT = 6;

type NelsonClassSpecialAttack = ValidSpecialAttack<
    | 'Nelson_Special'
>

const is_valid_joining_ship = (
    ship: PlayerEquippedShip,
): boolean => {
    return (
        !includes_ship_type(['CV', 'CVB', 'CVL', 'SS', 'SSV'], ship.type_id) &&
        is_operational(ship)
        // 大破はok
    );
}

export function evaluate_Nagato_class_special_attack(
    attacker_fleet: PlayerFleet,
    attacker_units: SpecialAttackUnits,
    valid_ship_length: SpecialAttackComponentLength,
): NelsonClassSpecialAttack | SpecialAttacckIneligible {
    if (!has_at_least(attacker_units, 5)) return 'Ineligible';

    const flagship = attacker_units[0].ship;
    const third_ship = attacker_units[2].ship;
    const fifth_ship = attacker_units[4].ship;

    const can_trigger = (
        !is_already_special_attack_activated(attacker_fleet) &&
        includes_ship_name(TRIGGERABLE_SHIP_NAMES, flagship.name_jp) &&
        !is_damage_moderatery_or_more(flagship) &&
        is_valid_joining_ship(third_ship) &&
        is_valid_joining_ship(fifth_ship) &&
        valid_ship_length >= REQUIRED_SURFACE_SHIP_COUNT &&
        includes_formation_type(TRIGGERABLE_FORMATION, attacker_fleet.formation)
    );

    return can_trigger
        ? 'Nelson_Special'
        : 'Ineligible';
}