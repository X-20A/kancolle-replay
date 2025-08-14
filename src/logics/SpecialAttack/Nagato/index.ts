import { AbyssalFleet, PlayerFleet } from "@/models/fleet/Fleet";
import { has_at_least } from "@/types";
import { SpecialAttackIneligible, SpecialAttackMisfire, ValidSpecialAttack } from "..";
import { ValidSurfaceShipLength, SpecialAttackUnits } from "../util";
import { is_random_successful } from "@/effects/random";
import { RandValue } from "@/types/brands/other";
import { PlayerFleetUnit } from "@/models/fleet/FleetUnit";
import { can_activate_Nagato_special } from "./activate";
import { calc_Nagato_special_trigger_rate } from "./triggerRate";
import { derive_special_attack_unit, SpecialAttackUnit } from "@/models/fleet/SpecialAttackUnit";
import { calc_Nagato_special_mods } from "./multiplier";
import { extract_second_ship, SecondShip } from "@/types/fleet/ship";
import { extract_first_ship_from_units, extract_second_ship_from_units } from "@/types/fleet/pipe";
import { extract_first_unit, extract_second_unit, FirstUnit, SecondUnit } from "@/types/fleet/fleetUnit";

const ATTACK_COUNTS = {
    first: 2,
    second: 1,
} as const;

type NagatoClassSpecialAttack = ValidSpecialAttack<
    | 'Nagato_Special'
    | 'Mutsu_Special'
>

export function evaluate_Nagato_class_special_attack(
    attacker_fleet: PlayerFleet,
    defender_fleet: AbyssalFleet,
    attacker_units: SpecialAttackUnits,
    valid_ship_length: ValidSurfaceShipLength,
    rand_value: RandValue,
): NagatoClassSpecialAttack | SpecialAttackIneligible | SpecialAttackMisfire {
    if (!has_at_least(attacker_units, 2)) return 'Ineligible';

    const first_ship = extract_first_ship_from_units(attacker_units);
    const second_ship = extract_second_ship_from_units(attacker_units);

    if (
        !can_activate_Nagato_special(first_ship,second_ship,valid_ship_length,attacker_fleet,defender_fleet)
    ) return 'Ineligible';

    const trigger_rate = calc_Nagato_special_trigger_rate(
        first_ship,
        second_ship,
    )

    if (!is_random_successful(trigger_rate, rand_value)) return 'Misfire';

    return first_ship.name_jp === '長門改二'
        ? 'Nagato_Special'
        : 'Mutsu_Special';
}

type NagatoSpecialComponents = [FirstUnit, SecondUnit]

export function extract_participate_Nagato_class_special_attack_units(
    attacker_units: SpecialAttackUnits,
): NagatoSpecialComponents {
    if (
        !has_at_least(attacker_units, 2)
    ) throw Error('長門型タッチの参加艦を抽出しようとしましたが、該当艦が存在しませんでした');

    const components: NagatoSpecialComponents = [
        extract_first_unit(attacker_units),
        extract_second_unit(attacker_units),
    ];

    return components;
}

const derive_Nagato_special_unit = (
    attacker_unit: PlayerFleetUnit,
    second_unit: SecondUnit,
    attack_count: number,
): SpecialAttackUnit => {
    const mods = calc_Nagato_special_mods(
        attacker_unit,
        second_unit,
    );
    return derive_special_attack_unit(
        attacker_unit,
        mods,
        attack_count,
    );
}

export type NagatoSpecialForce =
    [SpecialAttackUnit, SpecialAttackUnit]

export function derive_Nagato_special_force(
    components: NagatoSpecialComponents,
): NagatoSpecialForce {
    const second_unit: SecondUnit = components[1];

    const force: NagatoSpecialForce = [
        derive_Nagato_special_unit(components[0], second_unit, ATTACK_COUNTS.first),
        derive_Nagato_special_unit(components[1], second_unit, ATTACK_COUNTS.second),
    ];

    return force;
}