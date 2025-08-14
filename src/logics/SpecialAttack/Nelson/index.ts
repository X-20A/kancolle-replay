import { SpecialAttackIneligible, SpecialAttackMisfire, ValidSpecialAttack } from "..";
import { PlayerFleet } from "@/models/fleet/Fleet";
import { ValidSurfaceShipLength, SpecialAttackUnits } from "../util";
import { has_at_least } from "@/types";
import { is_random_successful } from "@/effects/random";
import { RandValue } from "@/types/brands/other";
import { PlayerFleetUnit } from "@/models/fleet/FleetUnit";
import { can_activate_Nelson_special } from "./activate";
import { calc_Nelson_special_trigger_rate } from "./triggerRate";
import { derive_special_attack_unit, SpecialAttackUnit } from "@/models/fleet/SpecialAttackUnit";
import { calc_Nelson_special_mods } from "./multiplier";
import { EngagementType } from "@/logics/engagemenet";
import { extract_fifth_unit, extract_first_unit, extract_third_unit, FifthUnit, FirstUnit, ThirdUnit } from "@/types/fleet/fleetUnit";
import { extract_fifth_ship_from_units, extract_first_ship_from_units, extract_third_ship_from_units } from "@/types/fleet/pipe";

const ATTACK_COUNTS = {
    first: 1,
    second: 1,
    third: 1,
} as const;

type NelsonClassSpecialAttack = ValidSpecialAttack<
    | 'Nelson_Special'
>

export function evaluate_Nelson_class_special_attack(
    attacker_fleet: PlayerFleet,
    attacker_units: SpecialAttackUnits,
    valid_ship_length: ValidSurfaceShipLength,
    rand_value: RandValue,
): NelsonClassSpecialAttack | SpecialAttackIneligible | SpecialAttackMisfire {
    if (!has_at_least(attacker_units, 5)) return 'Ineligible';

    const first_ship = extract_first_ship_from_units(attacker_units);
    const third_ship = extract_third_ship_from_units(attacker_units);
    const fifth_ship = extract_fifth_ship_from_units(attacker_units);

    if (
        !can_activate_Nelson_special(attacker_fleet, first_ship, third_ship, fifth_ship, valid_ship_length)
    ) return 'Ineligible';

    const trigger_rate = calc_Nelson_special_trigger_rate(
        first_ship,
        third_ship,
        fifth_ship,
    );

    return is_random_successful(trigger_rate, rand_value)
        ? 'Nelson_Special'
        : 'Misfire';
}

type NelsonSpecialComponents = [FirstUnit, ThirdUnit, FifthUnit]

export function extract_participate_Nelson_class_special_attack_units(
    attacker_units: SpecialAttackUnits,
): NelsonSpecialComponents {
    if (
        !has_at_least(attacker_units, 5)
    ) throw Error('Nelson型タッチの参加艦を抽出しようとしましたが、該当艦が存在しませんでした');

    const components: NelsonSpecialComponents = [
        extract_first_unit(attacker_units),
        extract_third_unit(attacker_units),
        extract_fifth_unit(attacker_units),
    ];

    return components;
}

const derive_Nelson_special_unit = (
    attacker_unit: PlayerFleetUnit,
    third_unit: ThirdUnit,
    fifth_unit: FifthUnit,
    engagement_type: EngagementType,
    attack_count: number,
): SpecialAttackUnit => {
    const mods = calc_Nelson_special_mods(
        attacker_unit,
        third_unit,
        fifth_unit,
        engagement_type,
    );
    return derive_special_attack_unit(
        attacker_unit,
        mods,
        attack_count,
    );
}

export type NelsonSpecialForce =
    [SpecialAttackUnit, SpecialAttackUnit, SpecialAttackUnit]

export function derive_Nelson_special_force(
    components: NelsonSpecialComponents,
    engagement_type: EngagementType,
): NelsonSpecialForce {
    const third_unit = components[1];
    const fifth_unit = components[2];
    const force: NelsonSpecialForce = [
        derive_Nelson_special_unit(components[0], third_unit, fifth_unit, engagement_type, ATTACK_COUNTS.first),
        derive_Nelson_special_unit(components[1], third_unit, fifth_unit, engagement_type, ATTACK_COUNTS.second),
        derive_Nelson_special_unit(components[2], third_unit, fifth_unit, engagement_type, ATTACK_COUNTS.second),
    ];

    return force;
}