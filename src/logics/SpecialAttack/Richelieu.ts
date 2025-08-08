import { FormationType, has_at_least } from "@/types";
import { SpecialAttacckIneligible, ValidSpecialAttack } from ".";
import { SpecialAttackComponentLength, SpecialAttackUnits } from "./util";
import { is_already_special_attack_activated, PlayerFleet } from "@/models/fleet/Fleet";
import { PlayerShipNameJP } from "@/types/ship/playerNameJP";
import { includes_ship_name, is_damage_heavily, is_damage_moderatery_or_more } from "@/models/ship/equipped";
import { includes_formation_type } from "../formation";

const TRIGGERABLE_SHIP_NAMES: PlayerShipNameJP[] = [
    'Richelieu改', 'Richelieu Deux',
    'Jean Bart改',
] as const;

const TRIGGERABLE_FORMATION: FormationType[] = [
    'Echelon',
    'CruisingFormation_2',
] as const;

const REQUIRED_SURFACE_SHIP_COUNT = 6;

type RichelieuClassSpecialAttack = ValidSpecialAttack<
    | 'Richelieu_Special'
>

export function evaluate_Nagato_class_special_attack(
    attacker_fleet: PlayerFleet,
    attacker_units: SpecialAttackUnits,
    valid_ship_length: SpecialAttackComponentLength,
): RichelieuClassSpecialAttack | SpecialAttacckIneligible {
    if (!has_at_least(attacker_units, 2)) return 'Ineligible';

    const flagship = attacker_units[0].ship;
    const second_ship = attacker_units[1].ship;

    const can_trigger = (
        !is_already_special_attack_activated(attacker_fleet) &&
        includes_ship_name(TRIGGERABLE_SHIP_NAMES, flagship.name_jp) &&
        !is_damage_moderatery_or_more(flagship) &&
        includes_ship_name(TRIGGERABLE_SHIP_NAMES, second_ship.name_jp) &&
        !is_damage_heavily(second_ship) &&
        valid_ship_length >= REQUIRED_SURFACE_SHIP_COUNT &&
        includes_formation_type(TRIGGERABLE_FORMATION, attacker_fleet.formation)
    );

    return can_trigger
        ? 'Richelieu_Special'
        : 'Ineligible';
}