import { AbyssalFleet, PlayerFleet } from "@/models/fleet/Fleet";
import { has_at_least } from "@/types";
import { SpecialAttackIneligible, SpecialAttackMisfire, ValidSpecialAttack } from "..";
import { SpecialAttackComponentLength, SpecialAttackUnits } from "../util";
import { is_random_successful } from "@/effects/random";
import { RandValue } from "@/types/brands/other";
import { PlayerFleetUnit } from "@/models/fleet/FleetUnit";
import { can_activate_Nagato_special } from "./activate";
import { calc_Nagato_special_trigger_rate } from "./triggerRate";
import { derive_special_attack_unit, SpecialAttackUnit } from "@/models/fleet/SpecialAttackUnit";
import { calc_Nagato_special_mods } from "./multiplier";

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
    valid_ship_length: SpecialAttackComponentLength,
    rand_value: RandValue,
): NagatoClassSpecialAttack | SpecialAttackIneligible | SpecialAttackMisfire {
    if (!has_at_least(attacker_units, 2)) return 'Ineligible';

    const flagship = attacker_units[0].ship;
    const second_ship = attacker_units[1].ship;

    if (
        !can_activate_Nagato_special(flagship,second_ship,valid_ship_length,attacker_fleet,defender_fleet)
    ) return 'Ineligible';

    const trigger_rate = calc_Nagato_special_trigger_rate(
        flagship,
        second_ship,
    )

    if (!is_random_successful(trigger_rate, rand_value)) return 'Misfire';

    return flagship.name_jp === '長門改二'
        ? 'Nagato_Special'
        : 'Mutsu_Special';
}

type NagatoSpecialComponent = [PlayerFleetUnit, PlayerFleetUnit]

export function extract_participate_Nagato_class_special_attack_units(
    attacker_units: SpecialAttackUnits,
): NagatoSpecialComponent {
    if (
        !has_at_least(attacker_units, 2)
    ) throw Error('長門型タッチの参加艦を抽出しようとしましたが、該当艦が存在しませんでした');

    const components: NagatoSpecialComponent = [
        attacker_units[0],
        attacker_units[1],
    ];

    return components;
}

const derive_Nagato_special_unit = (
    attacker_unit: PlayerFleetUnit,
    second_unit: PlayerFleetUnit,
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
    components: NagatoSpecialComponent,
): NagatoSpecialForce {
    const second_unit = components[1];
    const force: NagatoSpecialForce = [
        derive_Nagato_special_unit(components[0], second_unit, ATTACK_COUNTS.first),
        derive_Nagato_special_unit(components[1], second_unit, ATTACK_COUNTS.second),
    ];

    return force;
}