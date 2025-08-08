import { is_already_special_attack_activated, PlayerFleet } from "@/models/fleet/Fleet";
import { SpecialAttacckIneligible, ValidSpecialAttack } from ".";
import { FormationType, has_at_least } from "@/types";
import { is_battle_ship_category, is_damage_moderatery_or_more, is_damage_heavily, is_operational, is_submarine_category, has_ship_name } from "@/models/ship/equipped";
import { PlayerShipNameJP } from "@/types/ship/playerNameJP";
import { includes_formation_type } from "../formation";
import { SpecialAttackComponentLength, SpecialAttackUnits } from "./util";

const TRIGGERABLE_SHIP_NAMES: Set<PlayerShipNameJP> = new Set([
    'Colorado', 'Colorado改',
    'Maryland', 'Maryland改',
]);

const TRIGGERABLE_FORMATION: FormationType[] = [
    'Echelon',
    'CruisingFormation_2',
] as const;

const REQUIRED_SURFACE_SHIP_COUNT = 6;

type ColoradoClassSpecialAttack = ValidSpecialAttack<
    | 'Colorado_Special'
>

export function evaluate_Colorado_class_special_attack_type(
    attacker_fleet: PlayerFleet,
    attacker_units: SpecialAttackUnits,
    valid_ship_length: SpecialAttackComponentLength,
): ColoradoClassSpecialAttack | SpecialAttacckIneligible {
    if (!has_at_least(attacker_units, 3)) return 'Ineligible';

    const flagship = attacker_units[0].ship;
    const second_ship = attacker_units[1].ship;
    const third_ship = attacker_units[2].ship;
    const can_trigger = (
        !is_already_special_attack_activated(attacker_fleet) &&
        has_ship_name(TRIGGERABLE_SHIP_NAMES, flagship.name_jp) &&
        !is_damage_moderatery_or_more(flagship) &&
        is_battle_ship_category(second_ship.type_id) &&
        is_battle_ship_category(third_ship.type_id) &&
        !is_damage_heavily(second_ship) &&
        !is_damage_heavily(third_ship) &&
        valid_ship_length >= REQUIRED_SURFACE_SHIP_COUNT &&
        includes_formation_type(TRIGGERABLE_FORMATION, attacker_fleet.formation)
    );

    return can_trigger
        ? 'Colorado_Special'
        : 'Ineligible';
}