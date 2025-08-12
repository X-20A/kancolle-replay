import { PlayerFleetUnit } from "@/models/fleet/FleetUnit";
import { has_at_least } from "@/types";
import { SpecialAttackComponentLength, SpecialAttackUnits } from "../util";
import { SpecialAttackIneligible, SpecialAttackMisfire, ValidSpecialAttack } from "..";
import { PlayerFleet } from "@/models/fleet/Fleet";
import { RandValue } from "@/types/brands/other";
import { can_Colorado_special_activate } from "./activate";
import { calc_Colorado_special_trigger_rate } from "./triggerRate";
import { is_random_successful } from "@/effects/random";
import { derive_special_attack_unit, SpecialAttackUnit } from "@/models/fleet/SpecialAttackUnit";
import { calc_Colorado_special_mods } from "./multiplier";

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
    valid_ship_length: SpecialAttackComponentLength,
    rand_value: RandValue,
): ColoradoClassSpecialAttack | SpecialAttackIneligible | SpecialAttackMisfire {
    if (!has_at_least(attacker_units, 3)) return 'Ineligible';

    const flagship = attacker_units[0].ship;
    const second_ship = attacker_units[1].ship;
    const third_ship = attacker_units[2].ship;

    if (
        !can_Colorado_special_activate(attacker_fleet, flagship, second_ship, third_ship, valid_ship_length)
    ) return 'Ineligible';

    const trigger_rate = calc_Colorado_special_trigger_rate();

    return is_random_successful(trigger_rate, rand_value)
        ? 'Colorado_Special'
        : 'Misfire';
}

type ColoradoSpecialComponent = [PlayerFleetUnit, PlayerFleetUnit, PlayerFleetUnit]

export function extract_participate_Colorado_special_units(
    attacker_units: SpecialAttackUnits,
): ColoradoSpecialComponent {
    if (
        !has_at_least(attacker_units, 3)
    ) throw Error('Colorado級タッチの参加艦を抽出しようとしましたが、該当艦が存在しませんでした');

    return [
        attacker_units[0],
        attacker_units[1],
        attacker_units[2],
    ];
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

export function derive_Colorado_special_force(
    units: ColoradoSpecialComponent,
): ColoradoSpecialForce {
    const force: ColoradoSpecialForce = [
        derive_Colorado_special_unit(units[0], ATTACK_COUNTS.first),
        derive_Colorado_special_unit(units[1], ATTACK_COUNTS.second),
        derive_Colorado_special_unit(units[2], ATTACK_COUNTS.third),
    ];

    return force;
}