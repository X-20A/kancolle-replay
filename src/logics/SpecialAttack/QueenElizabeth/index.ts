import { PlayerFleet } from "@/models/fleet/Fleet";
import { has_at_least } from "@/types";
import { is_random_successful } from "@/effects/random";
import { RandValue } from "@/types/brands/other";
import { PlayerFleetUnit } from "@/models/fleet/FleetUnit";
import { ValidSurfaceShipLength, SpecialAttackUnits } from "../util";
import { SpecialAttackIneligible, SpecialAttackMisfire, ValidSpecialAttack } from "..";
import { can_activate_QueenElizabeth_special } from "./activate";
import { derive_special_attack_unit, SpecialAttackUnit } from "@/models/fleet/SpecialAttackUnit";
import { calc_QueenElizabeth_special_mods } from "./multiplier.ts";
import { extract_first_unit, extract_second_unit, FirstUnit, SecondUnit } from "@/types/fleet/fleetUnit";
import { extract_first_ship_from_units, extract_second_ship_from_units } from "@/types/fleet/pipe";

const ATTACK_COUNTS = {
    first: 2,
    second: 1,
};

type QueenElizabethSpecial = ValidSpecialAttack<
    | 'QueenElizabeth_Special'
>

export function evaluate_QueenElizabeth_special(
    attacker_fleet: PlayerFleet,
    attacker_units: SpecialAttackUnits,
    valid_ship_length: ValidSurfaceShipLength,
    rand_value: RandValue,
): QueenElizabethSpecial | SpecialAttackIneligible | SpecialAttackMisfire {
    if (!has_at_least(attacker_units, 2)) return 'Ineligible';

    const first_ship = extract_first_ship_from_units(attacker_units);
    const second_ship = extract_second_ship_from_units(attacker_units);

    if (
        !can_activate_QueenElizabeth_special(attacker_fleet, first_ship, second_ship, valid_ship_length)
    ) return 'Ineligible';

    const trigger_rate = calc_trigger_rate();

    return is_random_successful(trigger_rate, rand_value)
        ? 'QueenElizabeth_Special'
        : 'Misfire';
}

type QueenElizabethSpecialComponents = [FirstUnit, SecondUnit]

export function extract_participate_QueenElizabeth_special_units(
    attacker_units: SpecialAttackUnits,
): QueenElizabethSpecialComponents {
    if (
        !has_at_least(attacker_units, 2)
    ) throw Error('Queen Elizabeth型タッチの参加艦を抽出しようとしましたが、該当艦が存在しませんでした');

    const components: QueenElizabethSpecialComponents = [
        extract_first_unit(attacker_units),
        extract_second_unit(attacker_units),
    ];

    return components;
}

const derive_QueenElizabeth_special_unit = (
    attacker_unit: PlayerFleetUnit,
    first_unit: FirstUnit,
    attack_count: number,
): SpecialAttackUnit => {
    const mods = calc_QueenElizabeth_special_mods(
        attacker_unit,
        first_unit,
    );
    return derive_special_attack_unit(
        attacker_unit,
        mods,
        attack_count,
    );
}

export type QueenElizabethSpecialForce =
    [SpecialAttackUnit, SpecialAttackUnit]

export function derive_QueenElizabeth_special_force(
    components: QueenElizabethSpecialComponents,
): QueenElizabethSpecialForce {
    const first_unit = components[0];
    const force: QueenElizabethSpecialForce = [
        derive_QueenElizabeth_special_unit(components[0], first_unit, ATTACK_COUNTS.first),
        derive_QueenElizabeth_special_unit(components[1], first_unit, ATTACK_COUNTS.second),
    ];

    return force;
}