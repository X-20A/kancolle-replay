import { SpecialAttackIneligible, SpecialAttackMisfire, ValidSpecialAttack } from "..";
import { PlayerFleet } from "@/models/fleet/Fleet";
import { SpecialAttackComponentLength, SpecialAttackUnits } from "../util";
import { has_at_least } from "@/types";
import { RandValue } from "@/types/brands/other";
import { evaluate_Yamato_duo_special_attack } from "./triggerRate.ts/duo";
import { PlayerFleetUnit } from "@/models/fleet/FleetUnit";
import { derive_special_attack_unit, SpecialAttackUnit } from "@/models/fleet/SpecialAttackUnit";
import { can_Yamato_special_activate } from "./activate";
import { calc_Yamato_Duo_special_mods } from "./multiplier/Duo";
import { calc_Yamato_Trio_special_mods } from "./multiplier/Trio";
import { evaluate_Yamato_trio_special_attack } from "./triggerRate.ts/trio";

export type YamatoClassSpecialAttack = ValidSpecialAttack<
    | 'Yamato_Duo_Special'
    | 'Yamato_Trio_Special'
>

export type ValidYamatoSpecialAttack<K extends YamatoClassSpecialAttack> = K;

export function evaluate_Yamato_class_special_attack(
    attacker_fleet: PlayerFleet,
    attacker_units: SpecialAttackUnits,
    valid_ship_length: SpecialAttackComponentLength,
    rand_values: [RandValue, RandValue],
): YamatoClassSpecialAttack | SpecialAttackIneligible | SpecialAttackMisfire {
    if (!has_at_least(attacker_units, 3)) return 'Ineligible';

    const flagship = attacker_units[0].ship;
    const second_ship = attacker_units[1].ship;
    const third_ship = attacker_units[2].ship;

    if (
        !can_Yamato_special_activate(attacker_fleet, flagship, second_ship, valid_ship_length)
    ) return 'Ineligible';

    const Yamato_trio_special_attack_result =
        evaluate_Yamato_trio_special_attack(second_ship, third_ship, rand_values[0]);
    if (
        Yamato_trio_special_attack_result === 'Yamato_Trio_Special'
    ) return Yamato_trio_special_attack_result;

    return evaluate_Yamato_duo_special_attack(flagship, second_ship, rand_values[1]);
}

export type YamatoDuoSpecialComponent =
    [PlayerFleetUnit, PlayerFleetUnit]
export type YamatoTrioSpecialComponent =
    [PlayerFleetUnit, PlayerFleetUnit, PlayerFleetUnit]

type YamatoSpecialComponent =
    YamatoDuoSpecialComponent | YamatoTrioSpecialComponent

const is_Yamato_Duo_special_component = (
    component: YamatoSpecialComponent
): component is YamatoDuoSpecialComponent => {
    return component.length === 2;
}

export function extract_participate_Yamato_class_special_attack_units(
    attacker_units: SpecialAttackUnits,
    special_attack_type: YamatoClassSpecialAttack,
): YamatoSpecialComponent {
    if (
        !has_at_least(attacker_units, 3)
    ) throw Error('大和型タッチの参加艦を抽出しようとしましたが、該当艦が存在しませんでした');
    return special_attack_type === 'Yamato_Duo_Special'
        ? [
            attacker_units[0],
            attacker_units[1],
        ]
        : [
            attacker_units[0],
            attacker_units[1],
            attacker_units[2],
        ];
}

const DUO_ATTACK_COUNT = {
    first: 2,
    second: 1,
};

const TRIO_ATTACK_COUNT = {
    first: 1,
    second: 1,
    third: 1,
};

const derive_Yamato_Duo_special_unit = (
    attacker_unit: PlayerFleetUnit,
    second_unit: PlayerFleetUnit,
    attack_count: number,
): SpecialAttackUnit => {
    const mods = calc_Yamato_Duo_special_mods(attacker_unit, second_unit);

    const special_attack_unit: SpecialAttackUnit = derive_special_attack_unit(
        attacker_unit,
        mods,
        attack_count,
    );

    return special_attack_unit;
}

const derive_Yamato_Trio_special_unit = (
    attacker_unit: PlayerFleetUnit,
    second_unit: PlayerFleetUnit,
    third_unit: PlayerFleetUnit,
    attack_count: number,
): SpecialAttackUnit => {
    const mods =
        calc_Yamato_Trio_special_mods(attacker_unit, second_unit, third_unit);

    const special_attack_unit: SpecialAttackUnit = derive_special_attack_unit(
        attacker_unit,
        mods,
        attack_count,
    );

    return special_attack_unit;
}

export type YamatoDuoSpecialForce =
    [SpecialAttackUnit, SpecialAttackUnit]

export type YamatoTrioSpecialForce =
    [SpecialAttackUnit, SpecialAttackUnit, SpecialAttackUnit]

export type YamatoSpecialForce =
    YamatoDuoSpecialForce | YamatoTrioSpecialForce

export function derive_Yamato_special_force(
    component: YamatoSpecialComponent,
): YamatoSpecialForce {
    const second_unit = component[1];

    if (is_Yamato_Duo_special_component(component)) {
        const duo_force: YamatoDuoSpecialForce = [
            derive_Yamato_Duo_special_unit(component[0], second_unit, DUO_ATTACK_COUNT.first),
            derive_Yamato_Duo_special_unit(component[1], second_unit, DUO_ATTACK_COUNT.second),
        ];

        return duo_force;
    }

    const third_unit = component[2];
    const trio_force: YamatoTrioSpecialForce = [
        derive_Yamato_Trio_special_unit(component[0], second_unit, third_unit, TRIO_ATTACK_COUNT.first),
        derive_Yamato_Trio_special_unit(component[1], second_unit, third_unit, TRIO_ATTACK_COUNT.second),
        derive_Yamato_Trio_special_unit(component[2], second_unit, third_unit, TRIO_ATTACK_COUNT.third),
    ];

    return trio_force;
}