import { SpecialAttackIneligible, SpecialAttackMisfire, ValidSpecialAttack } from "..";
import { has_at_least } from "@/types";
import { is_random_successful } from "@/effects/random";
import { RandValue } from "@/types/brands/other";
import { is_combined_fleet, PlayerFleet } from "@/models/fleet/Fleet";
import { DayOrNight } from "@/types/battle";
import { PlayerFleetUnit } from "@/models/fleet/FleetUnit";
import { calc_valid_component_ship_length } from "../util";
import { can_activate_Kongou_special } from "./activate";
import { calc_Kongou_special_trigger_rate } from "./triggerRate";

const extract_attacker_units = (
    fleet: PlayerFleet,
): PlayerFleetUnit[] => {
    return is_combined_fleet(fleet)
        ? fleet.escort_fleet_units
        : fleet.main_fleet_units;
}

type KongouClassSpecialAttack = ValidSpecialAttack<
    | 'Kongou_Special'
>

export function evaluate_Kongou_class_special_attack(
    attacker_fleet: PlayerFleet,
    phase_type: DayOrNight,
    rand_value: RandValue,
): KongouClassSpecialAttack | SpecialAttackIneligible | SpecialAttackMisfire {
    // 金剛型タッチは夜戦でしか発動できないので汎用ユニット抽出は使えない
    const attacker_units = extract_attacker_units(attacker_fleet);
    if (!has_at_least(attacker_units, 2)) return 'Ineligible';

    const valid_ship_length = calc_valid_component_ship_length(attacker_units);
    const flagship = attacker_units[0].ship;
    const second_ship = attacker_units[1].ship;

    if (
        can_activate_Kongou_special(attacker_fleet, phase_type, flagship, second_ship, valid_ship_length)
    ) return 'Ineligible';

    const trigger_rate = calc_Kongou_special_trigger_rate(
        flagship,
        second_ship,
    );

    return is_random_successful(trigger_rate, rand_value)
        ? 'Kongou_Special'
        : 'Misfire';
}

type KongouSpecialComponent = [PlayerFleetUnit, PlayerFleetUnit]

export function extract_participate_Kongou_class_special_attack(
    attacker_fleet: PlayerFleet,
): KongouSpecialComponent {
    const attacker_units = extract_attacker_units(attacker_fleet);
    if (
        !has_at_least(attacker_units, 2)
    ) throw Error('金剛型タッチの参加艦を抽出しようとしましたが、該当艦が存在しませんでした');

    return [
        attacker_units[0],
        attacker_units[1],
    ];
}