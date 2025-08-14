import { PlayerFleet } from "@/models/fleet/Fleet";
import { has_ship_name, is_damage_moderatery_or_more, is_retreated, PlayerEquippedShip } from "@/models/ship/equipped";
import { FormationType } from "@/types";
import { DayOrNight } from "@/types/battle";
import { PlayerShipNameJP } from "@/types/ship/playerNameJP";
import { has_enough_valid_surface_ships, ValidSurfaceShipLength } from "../util";
import { has_formation_type } from "@/logics/formation";

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

const is_valid_combination = (
    flagship: PlayerEquippedShip,
    second_ship: PlayerEquippedShip,
): boolean => {
    const { name_jp: flagship_name } = flagship;
    const { name_jp: second_ship_name } = second_ship;

    return (
    (flagship_name === '金剛改二丙' && has_ship_name(VALID_KONGOU_PARTNERS, second_ship_name))
    || (flagship_name === '比叡改二丙' && has_ship_name(VALID_HIEI_PARTNERS, second_ship_name))
    || (has_ship_name(HARUNA_B_C, flagship_name) && has_ship_name(VALID_HARUNA_PARTNERS, second_ship_name))
    || (flagship_name === '霧島改二丙' && has_ship_name(VALID_KIRISHIMA_PARTNERS, second_ship_name)));
}

export function can_activate_Kongou_special(
    attacker_fleet: PlayerFleet,
    phase_type: DayOrNight,
    flagship: PlayerEquippedShip,
    second_ship: PlayerEquippedShip,
    valid_ship_length: ValidSurfaceShipLength,
): boolean {
    return (
        attacker_fleet.Kongou_special_activated_count < ACTIVATE_LIMIT &&
        phase_type === 'Night' &&
        has_formation_type(TRIGGERABLE_FORMATION, attacker_fleet.formation) &&
        !is_damage_moderatery_or_more(flagship) &&
        !is_retreated(second_ship) &&
        !is_damage_moderatery_or_more(second_ship) &&
        has_enough_valid_surface_ships(REQUIRED_SURFACE_SHIPS_COUNT, valid_ship_length) &&
        is_valid_combination(flagship, second_ship)
    );
}