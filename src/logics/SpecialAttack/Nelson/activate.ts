import { is_already_special_attack_activated, PlayerFleet } from "@/models/fleet/Fleet";
import { has_ship_name, has_ship_type, is_damage_moderatery_or_more, is_ship_on_the_front_line, PlayerEquippedShip } from "@/models/ship/equipped";
import { FormationType } from "@/types";
import { PlayerShipNameJP } from "@/types/ship/playerNameJP";
import { ShipType } from "@/types/ship/ship";
import { has_enough_valid_surface_ships, ValidSurfaceShipLength } from "../util";
import { has_formation_type } from "@/logics/formation";
import { FifthShip, FirstShip, ThirdShip } from "@/types/fleet/ship";

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
        is_ship_on_the_front_line(ship)
        // 大破はok
    );
}

export function can_activate_Nelson_special(
    attacker_fleet: PlayerFleet,
    first_ship: FirstShip,
    third_ship: ThirdShip,
    fifth_ship: FifthShip,
    valid_ship_length: ValidSurfaceShipLength,
): boolean {
    return (
        !is_already_special_attack_activated(attacker_fleet) &&
        has_ship_name(TRIGGERABLE_SHIP_NAMES, first_ship.name_jp) &&
        !is_damage_moderatery_or_more(first_ship) &&
        is_valid_joining_ship(third_ship) &&
        is_valid_joining_ship(fifth_ship) &&
        has_enough_valid_surface_ships(REQUIRED_SURFACE_SHIPS_COUNT, valid_ship_length) &&
        has_formation_type(TRIGGERABLE_FORMATION, attacker_fleet.formation)
    );
}