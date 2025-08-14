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
import { EngagementType } from "@/logics/engagemenet";
import { extract_first_ship_from_units, extract_second_ship_from_units } from "@/types/fleet/pipe";
import { derive_Kongou_special_force, KongouSpecialForce } from "./force";

const extract_attacker_units = (
    fleet: PlayerFleet,
): PlayerFleetUnit[] => {
    return is_combined_fleet(fleet)
        ? fleet.escort_fleet_units
        : fleet.main_fleet_units;
}

type KongouSpecial = ValidSpecialAttack<
    | 'Kongou_Special'
>

type KongouSpecialEvaluationResult =
    | KongouSpecialForce
    | SpecialAttackIneligible
    | SpecialAttackMisfire

export function evaluate_Kongou_class_special_attack(
    attacker_fleet: PlayerFleet,
    phase_type: DayOrNight,
    engagement_type: EngagementType,
    rand_value: RandValue,
): KongouSpecialEvaluationResult {
    // 金剛型タッチは夜戦でしか発動できないので汎用ユニット抽出は使えない
    const attacker_units = extract_attacker_units(attacker_fleet);
    if (!has_at_least(attacker_units, 2)) return 'Ineligible';

    const valid_ship_length = calc_valid_component_ship_length(attacker_units);
    const first_ship = extract_first_ship_from_units(attacker_units);
    const second_ship = extract_second_ship_from_units(attacker_units);

    if (
        can_activate_Kongou_special(attacker_fleet, phase_type, first_ship, second_ship, valid_ship_length)
    ) return 'Ineligible';

    const trigger_rate = calc_Kongou_special_trigger_rate(
        first_ship,
        second_ship,
    );

    return is_random_successful(trigger_rate, rand_value)
        ? derive_Kongou_special_force(engagement_type, attacker_units)
        : 'Misfire';
}