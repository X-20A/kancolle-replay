import { has_at_least } from "@/types";
import { ValidSurfaceShipLength, SpecialAttackUnits } from "../util";
import { SpecialAttackIneligible, SpecialAttackMisfire, ValidSpecialAttack } from "..";
import { PlayerFleet } from "@/models/fleet/Fleet";
import { RandValue } from "@/types/brands/other";
import { can_Colorado_special_activate } from "./activate";
import { calc_Colorado_special_trigger_rate } from "./triggerRate";
import { is_random_successful } from "@/effects/random";
import { derive_special_attack_unit, SpecialAttackUnit } from "@/models/fleet/SpecialAttackUnit";
import { calc_Colorado_special_mods } from "./multiplier";
import { extract_first_unit, extract_second_unit, extract_third_unit, FirstUnit, SecondUnit, ThirdUnit } from "@/types/fleet/fleetUnit";
import { PlayerFleetUnit } from "@/models/fleet/FleetUnit";
import { extract_first_ship_from_units, extract_second_ship_from_units, extract_third_ship_from_units } from "@/types/fleet/pipe";

/// Coloradoタッチ

const ATTACK_COUNTS = {
    first: 1,
    second: 1,
    third: 1,
} as const;

type ColoradoClassSpecialAttack = ValidSpecialAttack<
    | 'Colorado_Special'
>

export function evaluate_Colorado_special(
    attacker_fleet: PlayerFleet,
    attacker_units: SpecialAttackUnits,
    valid_ship_length: ValidSurfaceShipLength,
    rand_value: RandValue,
): ColoradoClassSpecialAttack | SpecialAttackIneligible | SpecialAttackMisfire {
    if (!has_at_least(attacker_units, 3)) return 'Ineligible';

    const first_unit = extract_first_ship_from_units(attacker_units);
    const second_ship = extract_second_ship_from_units(attacker_units);
    const third_ship = extract_third_ship_from_units(attacker_units);

    if (
        !can_Colorado_special_activate(attacker_fleet, first_unit, second_ship, third_ship, valid_ship_length)
    ) return 'Ineligible';

    const trigger_rate = calc_Colorado_special_trigger_rate();

    return is_random_successful(trigger_rate, rand_value)
        ? 'Colorado_Special'
        : 'Misfire';
}

type ColoradoSpecialComponents = [FirstUnit, SecondUnit, ThirdUnit]

export function extract_participate_Colorado_special_components(
    attacker_units: SpecialAttackUnits,
): ColoradoSpecialComponents {
    if (
        !has_at_least(attacker_units, 3)
    ) throw Error('Colorado級タッチの参加艦を抽出しようとしましたが、該当艦が存在しませんでした');

    const components: ColoradoSpecialComponents = [
        extract_first_unit(attacker_units),
        extract_second_unit(attacker_units),
        extract_third_unit(attacker_units),
    ];

    return components;
}

const derive_Colorado_special_unit = (
    unit: PlayerFleetUnit,
    attack_count: number
): SpecialAttackUnit => {
    const mods = calc_Colorado_special_mods(unit);

    return derive_special_attack_unit(
        unit,
        mods,
        attack_count,
    );
}

export type ColoradoSpecialForce =
    [SpecialAttackUnit, SpecialAttackUnit, SpecialAttackUnit];

export function derive_Colorado_special_force_core(
    components: ColoradoSpecialComponents,
): ColoradoSpecialForce {
    const force: ColoradoSpecialForce = [
        derive_Colorado_special_unit(components[0], ATTACK_COUNTS.first),
        derive_Colorado_special_unit(components[1], ATTACK_COUNTS.second),
        derive_Colorado_special_unit(components[2], ATTACK_COUNTS.third),
    ];

    return force;
}

export function derive_Colorado_special_force(

): ColoradoSpecialForce {
    const components
}