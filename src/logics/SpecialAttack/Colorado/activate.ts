import { is_already_special_attack_activated, PlayerFleet } from "@/models/fleet/Fleet";
import { FormationType } from "@/types";
import { is_battle_ship_category, is_damage_moderatery_or_more, is_damage_heavily, has_ship_name, PlayerEquippedShip, is_retreated } from "@/models/ship/equipped";
import { PlayerShipNameJP } from "@/types/ship/playerNameJP";
import { has_formation_type } from "../../formation";
import { has_enough_valid_surface_ships, ValidSurfaceShipLength } from "../util";
import { FirstShip, SecondShip, ThirdShip } from "@/types/fleet/ship";

/// Coloradoタッチ発動条件

const TRIGGERABLE_SHIP_NAMES: Set<PlayerShipNameJP> = new Set([
    'Colorado', 'Colorado改',
    'Maryland', 'Maryland改',
]);

const TRIGGERABLE_FORMATION: Set<FormationType> = new Set([
    'Echelon',
    'CruisingFormation_2',
]);

const REQUIRED_SURFACE_SHIPS_COUNT = 6;

const is_valid_joining_ship = (
    ship: PlayerEquippedShip,
): boolean => {
    return (
        is_battle_ship_category(ship.type_id) &&
        !is_damage_heavily(ship) &&
        !is_retreated(ship) 
    );
}

export function can_Colorado_special_activate(
    attacker_fleet: PlayerFleet,
    first_ship: FirstShip,
    second_ship: SecondShip,
    third_ship: ThirdShip,
    valid_ship_length: ValidSurfaceShipLength,
): boolean {
    return (
        !is_already_special_attack_activated(attacker_fleet) &&
        has_ship_name(TRIGGERABLE_SHIP_NAMES, first_ship.name_jp) &&
        !is_damage_moderatery_or_more(first_ship) &&
        is_valid_joining_ship(second_ship) &&
        is_valid_joining_ship(third_ship) &&
        has_enough_valid_surface_ships(REQUIRED_SURFACE_SHIPS_COUNT, valid_ship_length) &&
        has_formation_type(TRIGGERABLE_FORMATION, attacker_fleet.formation)
    );
}