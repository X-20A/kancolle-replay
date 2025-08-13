import { is_already_special_attack_activated, PlayerFleet } from "@/models/fleet/Fleet";
import { has_ship_name, has_ship_type, includes_ship_type, is_damage_moderatery_or_more, is_operational, PlayerEquippedShip } from "@/models/ship/equipped";
import { FormationType } from "@/types";
import { PlayerShipNameJP } from "@/types/ship/playerNameJP";
import { ShipType } from "@/types/ship/ship";
import { SpecialAttackComponentLength } from "../util";
import { has_formation_type } from "@/logics/formation";

const TRIGGERABLE_SHIP_NAMES: Set<PlayerShipNameJP> = new Set([
    'Nelson', 'Nelson改',
    'Rodney', 'Rodney改',
]);

const TRIGGERABLE_FORMATION: Set<FormationType> = new Set([
    'Echelon',
    'CruisingFormation_2',
]);

const REQUIRED_SURFACE_SHIPS_COUNT = 6;

const INVALID_SHIP_TYPES: Set<ShipType> = new Set([
    'CV', 'CVB', 'CVL', 'SS', 'SSV',
]);

const is_valid_joining_ship = (
    ship: PlayerEquippedShip,
): boolean => {
    return (
        !has_ship_type(INVALID_SHIP_TYPES, ship.type_id) &&
        is_operational(ship)
        // 大破はok
    );
}

export function can_activate_Nelson_special(
    attacker_fleet: PlayerFleet,
    flagship: PlayerEquippedShip,
    third_ship: PlayerEquippedShip,
    fifth_ship: PlayerEquippedShip,
    valid_ship_length: SpecialAttackComponentLength,
): boolean {
    return (
        !is_already_special_attack_activated(attacker_fleet) &&
        has_ship_name(TRIGGERABLE_SHIP_NAMES, flagship.name_jp) &&
        !is_damage_moderatery_or_more(flagship) &&
        is_valid_joining_ship(third_ship) &&
        is_valid_joining_ship(fifth_ship) &&
        valid_ship_length >= REQUIRED_SURFACE_SHIPS_COUNT &&
        has_formation_type(TRIGGERABLE_FORMATION, attacker_fleet.formation)
    );
}