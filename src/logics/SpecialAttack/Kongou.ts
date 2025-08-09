import { has_ship_name, is_damage_moderatery_or_more, is_retreated, PlayerEquippedShip } from "@/models/ship/equipped";
import { SpecialAttackIneligible, SpecialAttackMisfire, ValidSpecialAttack } from ".";
import { FormationType, has_at_least } from "@/types";
import { is_random_successful } from "@/effects/random";
import { RandValue } from "@/types/brands/other";
import { is_combined_fleet, PlayerFleet } from "@/models/fleet/Fleet";
import { DayOrNight } from "@/types/battle";
import { PlayerFleetUnit } from "@/models/fleet/FleetUnit";
import { calc_valid_component_ship_length, has_high_accuracy_radar, SpecialAttackComponentLength } from "./util";
import { PlayerShipNameJP } from "@/types/ship/playerNameJP";
import { has_formation_type } from "../formation";
import { is_equip_exsist } from "@/models/ship/EquipSlot";
import { is_searchlight_L } from "@/models/equip/basic";

const ACTIVATE_LIMIT = 2;

const TRIGGERABLE_FORMATION: Set<FormationType> = new Set([
    'LineAhead',
    'Echelon',
    'CruisingFormation_2',
    'CruisingFormation_4',
]);

const REQUIRED_SURFACE_SHIPS_COUNT = 5;

const VALID_KONGOU_PARTNERS: Set<PlayerShipNameJP> = new Set([
    '比叡改二丙',
    '榛名改二', '榛名改二乙', '榛名改二丙',
    '霧島改二丙',
    'Warspite', 'Warspite改',
    'Valiant', 'Valiant改',
]);

const VALID_HIEI_PARTNERS: Set<PlayerShipNameJP> = new Set([
    '金剛改二丙',
    '霧島改二', '霧島改二丙',
    '榛名改二乙', '榛名改二丙',
]);

const HARUNA_B_C: Set<PlayerShipNameJP> = new Set([
    '榛名改二乙', '榛名改二丙',
]);

const VALID_HARUNA_PARTNERS: Set<PlayerShipNameJP> = new Set([
    '金剛改二丙',
    '比叡改二丙',
    '霧島改二丙',
]);

const VALID_KIRISHIMA_PARTNERS: Set<PlayerShipNameJP> = new Set([
    '金剛改二丙',
    '比叡改二丙',
    '榛名改二乙',
    '榛名改二丙',
    'South Dakota改',
]);

const extruct_attacker_units = (
    fleet: PlayerFleet,
): PlayerFleetUnit[] => {
    return is_combined_fleet(fleet)
        ? fleet.escort_fleet_units
        : fleet.main_fleet_units;
}

const is_valid_combination = (
    flagship: PlayerEquippedShip,
    second_ship: PlayerEquippedShip,
): boolean => {
    const { name_jp: flagship_name } = flagship;
    const { name_jp: second_ship_name } = second_ship;

    return (flagship_name === '金剛改二丙' && has_ship_name(VALID_KONGOU_PARTNERS, second_ship_name))
    || (flagship_name === '比叡改二丙' && has_ship_name(VALID_HIEI_PARTNERS, second_ship_name))
    || (has_ship_name(HARUNA_B_C, flagship_name) && has_ship_name(VALID_HARUNA_PARTNERS, second_ship_name))
    || (flagship_name === '霧島改二丙' && has_ship_name(VALID_KIRISHIMA_PARTNERS, second_ship_name));
}

const calc_radar_mod = (
    flagship: PlayerEquippedShip,
): number => {
    const { name_jp: flagship_name } = flagship;
    if (flagship_name === '霧島改二丙') return 0; // ? 不明
    if (!has_high_accuracy_radar(flagship)) return 0;

    if (flagship_name === '金剛改二丙') return 30;
    if (flagship_name === '比叡改二丙') return 10;
    if (flagship_name === '榛名改二乙') return 15;
    if (flagship_name === '榛名改二丙') return 20;

    throw new Error('金剛タッチを発動できない旗艦が渡されました');
}

const SEARCHLIGHT_BONUS_SHIP_NAMES: Set<PlayerShipNameJP> = new Set([
    '金剛改二丙',
    '比叡改二丙',
])

const calc_searchlight_mod = (
    flagship: PlayerEquippedShip,
): number => {
    const { name_jp: flagship_name } = flagship;
    if (!has_ship_name(SEARCHLIGHT_BONUS_SHIP_NAMES, flagship_name)) return 0;
    const has_searchlight_L = flagship.equip_slots.some(slot => {
        const { equip } = slot;

        return is_equip_exsist(equip) &&
            is_searchlight_L(equip);
    });
    if (!has_searchlight_L) return 0;

    if (flagship_name === '金剛改二丙') return 10;
    if (flagship_name === '比叡改二丙') return 30;

    throw new Error('金剛タッチを発動できない旗艦が渡されました');
}

const can_trigger = (
    attacker_fleet: PlayerFleet,
    phase_type: DayOrNight,
    flagship: PlayerEquippedShip,
    second_ship: PlayerEquippedShip,
    valid_ship_length: SpecialAttackComponentLength,
): boolean => {
    return (
        attacker_fleet.Kongou_special_activated_count < ACTIVATE_LIMIT &&
        phase_type === 'Night' &&
        has_formation_type(TRIGGERABLE_FORMATION, attacker_fleet.formation) &&
        !is_damage_moderatery_or_more(flagship) &&
        !is_retreated(second_ship) &&
        !is_damage_moderatery_or_more(second_ship) &&
        valid_ship_length >= REQUIRED_SURFACE_SHIPS_COUNT &&
        is_valid_combination(flagship, second_ship)
    );
}

const calc_trigger_rate = (
    flagship: PlayerEquippedShip,
    second_ship: PlayerEquippedShip,
): number => {
    const radar_mod = calc_radar_mod(flagship);
    const searchlight_mod = calc_searchlight_mod(flagship);
    return Math.floor(
        + 3.5 * Math.sqrt(flagship.lv)
        + 3.5 * Math.sqrt(second_ship.lv)
        + 1.1 * Math.sqrt(flagship.edited_status.luck)
        + 1.1 * Math.sqrt(second_ship.edited_status.luck)
        + radar_mod
        + searchlight_mod
    );
}

type KongouClassSpecialAttack = ValidSpecialAttack<
    | 'Kongou_Special'
>

export function evaluate_Kongou_class_special_attack(
    attacker_fleet: PlayerFleet,
    phase_type: DayOrNight,
    rand_value: RandValue,
): KongouClassSpecialAttack | SpecialAttackIneligible | SpecialAttackMisfire {
    const attacker_units = extruct_attacker_units(attacker_fleet);
    if (!has_at_least(attacker_units, 2)) return 'Ineligible';

    const valid_ship_length = calc_valid_component_ship_length(attacker_units);
    const flagship = attacker_units[0].ship;
    const second_ship = attacker_units[1].ship;

    if (
        can_trigger(attacker_fleet, phase_type, flagship, second_ship, valid_ship_length)
    ) return 'Ineligible';

    const trigger_rate = calc_trigger_rate(
        flagship,
        second_ship,
    );

    return is_random_successful(trigger_rate, rand_value)
        ? 'Kongou_Special'
        : 'Misfire';
}