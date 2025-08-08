import { AbyssalFleet, is_already_special_attack_activated, is_combined_fleet, PlayerFleet } from "@/models/fleet/Fleet";
import { includes_ship_name, is_battle_ship_category, is_damage_heavily, is_operational, PlayerEquippedShip } from "@/models/ship/equipped";
import { includes_formation_type } from "../formation";
import { FormationType, has_at_least } from "@/types";
import { SpecialAttacckIneligible, ValidSpecialAttack } from ".";
import { SpecialAttackComponentLength, SpecialAttackUnits } from "./util";
import { PlayerShipNameJP } from "@/types/ship/playerNameJP";

const TRIGGERABLE_SHIP_NAMES: PlayerShipNameJP[] = [
    '長門改二',
    '陸奥改二'
] as const;

const TRIGGERABLE_FORMATION: FormationType[] = [
    'Echelon',
    'CruisingFormation_2',
] as const;

const REQUIRED_SURFACE_SHIP_COUNT = 6;

const can_trigger = (
    flagship: PlayerEquippedShip,
    second_ship: PlayerEquippedShip,
    valid_ship_length: number,
    attacker_fleet: PlayerFleet,
    defender_fleet: AbyssalFleet,
): boolean => {
    return (
        !is_already_special_attack_activated(attacker_fleet) &&
        includes_ship_name(TRIGGERABLE_SHIP_NAMES, flagship.name_jp) &&
        valid_ship_length >= REQUIRED_SURFACE_SHIP_COUNT &&
        is_battle_ship_category(second_ship.type_id) &&
        !is_damage_heavily(second_ship) &&
        is_operational(second_ship) &&
        includes_formation_type(TRIGGERABLE_FORMATION, attacker_fleet.formation) &&
        !(is_combined_fleet(attacker_fleet) && !is_combined_fleet(defender_fleet)) // 12vs6は無効
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
): NagatoClassSpecialAttack | SpecialAttacckIneligible {
    if (!has_at_least(attacker_units, 2)) return 'Ineligible';

    const flagship = attacker_units[0].ship;
    const second_ship = attacker_units[1].ship;

    if (!can_trigger(
        flagship,
        second_ship,
        valid_ship_length,
        attacker_fleet,
        defender_fleet
    )) {
        return 'Ineligible';
    }

    return flagship.name_jp === '長門改二'
        ? 'Nagato_Special'
        : 'Mutsu_Special';
}

export function calc_Nagato_class_special_attack_trigger_rate(
    flagship: PlayerEquippedShip,
    second_ship: PlayerEquippedShip,
): number {
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