import { has_at_least } from "@/types";
import { PlayerFleet } from "@/models/fleet/Fleet";
import { is_random_successful } from "@/effects/random";
import { RandValue } from "@/types/brands/other";
import { PlayerFleetUnit } from "@/models/fleet/FleetUnit";
import { can_activate_Richelieu_special } from "./activate";
import { SpecialAttackIneligible, SpecialAttackMisfire, ValidSpecialAttack } from "..";
import { SpecialAttackComponentLength, SpecialAttackUnits } from "../util";
import { calc_Richelieu_special_trigger_rate } from "./triggerRate";

type RichelieuClassSpecialAttack = ValidSpecialAttack<
    | 'Richelieu_Special'
>

export function evaluate_Richelieu_class_special_attack(
    attacker_fleet: PlayerFleet,
    attacker_units: SpecialAttackUnits,
    valid_ship_length: SpecialAttackComponentLength,
    rand_value: RandValue,
): RichelieuClassSpecialAttack | SpecialAttackIneligible | SpecialAttackMisfire {
    if (!has_at_least(attacker_units, 2)) return 'Ineligible';

    const flagship = attacker_units[0].ship;
    const second_ship = attacker_units[1].ship;

    if (
        !can_activate_Richelieu_special(attacker_fleet, flagship, second_ship, valid_ship_length)
    ) return 'Ineligible';

    const trigger_rate = calc_Richelieu_special_trigger_rate();

    return is_random_successful(trigger_rate, rand_value)
        ? 'Richelieu_Special'
        : 'Misfire';
}

export function extract_participate_Richelieu_class_special_attack_units(
    attacker_units: SpecialAttackUnits,
): PlayerFleetUnit[] {
    if (
        !has_at_least(attacker_units, 2)
    ) throw Error('Richelieu型タッチの参加艦を抽出しようとしましたが、該当艦が存在しませんでした');

    return [
        attacker_units[0],
        attacker_units[1],
    ];
}