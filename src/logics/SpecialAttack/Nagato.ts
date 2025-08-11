import { AbyssalFleet, is_already_special_attack_activated, is_combined_fleet, PlayerFleet } from "@/models/fleet/Fleet";
import { has_ship_name, is_battle_ship_category, is_damage_heavily, is_operational, PlayerEquippedShip } from "@/models/ship/equipped";
import { has_formation_type } from "../formation";
import { FormationType, has_at_least } from "@/types";
import { SpecialAttackIneligible, SpecialAttackMisfire, SpecialAttackMods, ValidSpecialAttack } from ".";
import { SpecialAttackComponentLength, SpecialAttackUnits } from "./util";
import { PlayerShipNameJP } from "@/types/ship/playerNameJP";
import { is_random_successful } from "@/effects/random";
import { RandValue } from "@/types/brands/other";
import { PlayerFleetUnit } from "@/models/fleet/FleetUnit";
import { is_flagship_unit } from "@/models/fleet/predicates";

const TRIGGERABLE_SHIP_NAMES: Set<PlayerShipNameJP> = new Set([
    '長門改二',
    '陸奥改二',
]);

const TRIGGERABLE_FORMATION: Set<FormationType> = new Set([
    'Echelon',
    'CruisingFormation_2',
]);

const REQUIRED_SURFACE_SHIPS_COUNT = 6;

const can_trigger = (
    flagship: PlayerEquippedShip,
    second_ship: PlayerEquippedShip,
    valid_ship_length: number,
    attacker_fleet: PlayerFleet,
    defender_fleet: AbyssalFleet,
): boolean => {
    return (
        !is_already_special_attack_activated(attacker_fleet) &&
        has_ship_name(TRIGGERABLE_SHIP_NAMES, flagship.name_jp) &&
        valid_ship_length >= REQUIRED_SURFACE_SHIPS_COUNT &&
        is_battle_ship_category(second_ship.type_id) &&
        !is_damage_heavily(second_ship) &&
        is_operational(second_ship) &&
        has_formation_type(TRIGGERABLE_FORMATION, attacker_fleet.formation) &&
        !(is_combined_fleet(attacker_fleet) && !is_combined_fleet(defender_fleet)) // 12vs6は無効
    );
}

const calc_trigger_rate = (
    flagship: PlayerEquippedShip,
    second_ship: PlayerEquippedShip,
): number => {
    const lv_mod = Math.sqrt(flagship.lv)
        + Math.sqrt(second_ship.lv);
    const luck_mod = Math.sqrt(flagship.edited_status.luck)
        + Math.sqrt(second_ship.edited_status.luck);

    return Math.floor(
        lv_mod
        + 1.5 * luck_mod
        + 25
    );
}

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
        !can_trigger(flagship,second_ship,valid_ship_length,attacker_fleet,defender_fleet)
    ) return 'Ineligible';

    const trigger_rate = calc_trigger_rate(
        flagship,
        second_ship,
    )

    if (!is_random_successful(trigger_rate, rand_value)) return 'Misfire';

    return flagship.name_jp === '長門改二'
        ? 'Nagato_Special'
        : 'Mutsu_Special';
}

export function extract_participate_Nagato_class_special_attack_units(
    attacker_units: SpecialAttackUnits,
): PlayerFleetUnit[] {
    if (
        !has_at_least(attacker_units, 2)
    ) throw Error('長門型タッチの参加艦を抽出しようとしましたが、該当艦が存在しませんでした');

    return [
        attacker_units[0],
        attacker_units[1],
    ];
}

const calc_Nagato_special_attack_mods = (
    attacker_unit: PlayerFleetUnit,
): SpecialAttackMods => {
    const is_flagship = is_flagship_unit(attacker_unit);

    
}

const calc_Mutsu_special_attack_mods = (
    flagship: PlayerEquippedShip,
    second_ship: PlayerEquippedShip,
): SpecialAttackMods => {

}

export function calc_Nagato_class_special_attack_mods(
    attacker_unit: PlayerFleetUnit,
    special_attack_type: NagatoClassSpecialAttack,
): SpecialAttackMods {
    if (
        !has_at_least(attacker_units, 2)
    ) throw Error('長門型タッチの補正値を得ようとしましたが、該当艦が存在しませんでした');

    const flagship = attacker_units[0];

    return special_attack_type === 'Nagato_Special'
        ? calc_Nagato_special_attack_mods()
        : calc_Mutsu_special_attack_mods();
}