import { is_already_special_attack_activated, PlayerFleet } from "@/models/fleet/Fleet";
import { FormationType } from "@/types";
import { is_battle_ship_category, is_damage_moderatery_or_more, is_damage_heavily, has_ship_name, PlayerEquippedShip, is_retreated } from "@/models/ship/equipped";
import { PlayerShipNameJP } from "@/types/ship/playerNameJP";
import { has_formation_type } from "../../formation";
import { SpecialAttackComponentLength } from "../util";

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
    flagship: PlayerEquippedShip,
    second_ship: PlayerEquippedShip,
    third_ship: PlayerEquippedShip,
    valid_ship_length: SpecialAttackComponentLength,
): boolean {
    return (
        !is_already_special_attack_activated(attacker_fleet) &&
        has_ship_name(TRIGGERABLE_SHIP_NAMES, flagship.name_jp) &&
        !is_damage_moderatery_or_more(flagship) &&
        is_valid_joining_ship(second_ship) &&
        is_valid_joining_ship(third_ship) &&
        valid_ship_length >= REQUIRED_SURFACE_SHIPS_COUNT &&
        has_formation_type(TRIGGERABLE_FORMATION, attacker_fleet.formation)
    );
}