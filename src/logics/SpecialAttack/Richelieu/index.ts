import { has_at_least } from "@/types";
import { PlayerFleet } from "@/models/fleet/Fleet";
import { is_random_successful } from "@/effects/random";
import { RandValue } from "@/types/brands/other";
import { PlayerFleetUnit } from "@/models/fleet/FleetUnit";
import { can_activate_Richelieu_special } from "./activate";
import { SpecialAttackIneligible, SpecialAttackMisfire, ValidSpecialAttack } from "..";
import { ValidSurfaceShipLength, SpecialAttackUnits } from "../util";
import { calc_Richelieu_special_trigger_rate } from "./triggerRate";
import { extract_first_ship_from_units, extract_second_ship_from_units } from "@/types/fleet/pipe";
import { extract_first_unit, extract_second_unit, FirstUnit, SecondUnit } from "@/types/fleet/fleetUnit";
import { calc_Richelieu_special_mods } from "./multiplier";
import { derive_special_attack_unit, SpecialAttackUnit } from "@/models/fleet/SpecialAttackUnit";

const ATTACK_COUNTS = {
    first: 2,
    second: 1,
};

type RichelieuClassSpecialAttack = ValidSpecialAttack<
    | 'Richelieu_Special'
>

export function evaluate_Richelieu_class_special_attack(
    attacker_fleet: PlayerFleet,
    attacker_units: SpecialAttackUnits,
    valid_ship_length: ValidSurfaceShipLength,
    rand_value: RandValue,
): RichelieuClassSpecialAttack | SpecialAttackIneligible | SpecialAttackMisfire {
    if (!has_at_least(attacker_units, 2)) return 'Ineligible';

    const first_ship = extract_first_ship_from_units(attacker_units);
    const second_ship = extract_second_ship_from_units(attacker_units);

    if (
        !can_activate_Richelieu_special(attacker_fleet, first_ship, second_ship, valid_ship_length)
    ) return 'Ineligible';

    const trigger_rate = calc_Richelieu_special_trigger_rate();

    return is_random_successful(trigger_rate, rand_value)
        ? 'Richelieu_Special'
        : 'Misfire';
}

type RichelieuSpecialComponents = [FirstUnit, SecondUnit]

export function extract_participate_Richelieu_class_special_attack_units(
    attacker_units: SpecialAttackUnits,
): RichelieuSpecialComponents {
    if (
        !has_at_least(attacker_units, 2)
    ) throw Error('Richelieu型タッチの参加艦を抽出しようとしましたが、該当艦が存在しませんでした');

    const components: RichelieuSpecialComponents = [
        extract_first_unit(attacker_units),
        extract_second_unit(attacker_units),
    ];

    return components;
}

const derive_Richelieu_special_unit = (
    attacker_unit: PlayerFleetUnit,
    first_unit: FirstUnit,
    attack_count: number,
): SpecialAttackUnit => {
    const mods = calc_Richelieu_special_mods(
        attacker_unit,
        first_unit,
    );
    return derive_special_attack_unit(
        attacker_unit,
        mods,
        attack_count,
    );
}

export type RichelieuSpecialForce =
    [SpecialAttackUnit, SpecialAttackUnit]

export function derive_Richelieu_special_force(
    components: RichelieuSpecialComponents,
): RichelieuSpecialForce {
    const first_unit = components[0];
    const force: RichelieuSpecialForce = [
        derive_Richelieu_special_unit(components[0], first_unit, ATTACK_COUNTS.first),
        derive_Richelieu_special_unit(components[1], first_unit, ATTACK_COUNTS.second),
    ];

    return force;
}