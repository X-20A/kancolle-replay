import { is_already_special_attack_activated, PlayerFleet } from "@/models/fleet/Fleet";
import { has_ship_name, is_damage_heavily, is_damage_moderatery_or_more, is_retreated, PlayerEquippedShip } from "@/models/ship/equipped";
import { has_enough_valid_surface_ships, ValidSurfaceShipLength } from "../util";
import { has_formation_type } from "@/logics/formation";
import { PlayerShipNameJP } from "@/types/ship/playerNameJP";
import { FormationType } from "@/types";
import { FirstShip, SecondShip } from "@/types/fleet/ship";

const TRIGGERABLE_SHIP_NAMES: Set<PlayerShipNameJP> = new Set([
    'Warspite改',
    'Valiant改',
]);

const TRIGGERABLE_FORMATION: Set<FormationType> = new Set([
    'Echelon',
    'CruisingFormation_2',
]);

const REQUIRED_SURFACE_SHIPS_COUNT = 6;

export function can_activate_QueenElizabeth_special(
    attacker_fleet: PlayerFleet,
    first_ship: FirstShip,
    second_ship: SecondShip,
    valid_ship_length: ValidSurfaceShipLength,
): boolean {
    return (
        !is_already_special_attack_activated(attacker_fleet) &&
        has_ship_name(TRIGGERABLE_SHIP_NAMES, first_ship.name_jp) &&
        !is_damage_moderatery_or_more(first_ship) &&
        !is_damage_heavily(second_ship) &&
        !is_retreated(second_ship) &&
        has_enough_valid_surface_ships(REQUIRED_SURFACE_SHIPS_COUNT, valid_ship_length) &&
        has_formation_type(TRIGGERABLE_FORMATION, attacker_fleet.formation)
    );
}