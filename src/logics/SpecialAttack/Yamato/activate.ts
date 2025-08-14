import { is_already_special_attack_activated, PlayerFleet } from "@/models/fleet/Fleet";
import { has_ship_name, is_damage_moderatery_or_more, PlayerEquippedShip } from "@/models/ship/equipped";
import { has_enough_valid_surface_ships, ValidSurfaceShipLength } from "../util";
import { has_formation_type } from "@/logics/formation";
import { FormationType } from "@/types";
import { PlayerShipNameJP } from "@/types/ship/playerNameJP";
import { FirstShip, SecondShip } from "@/types/fleet/ship";

const TRIGGERABLE_SHIP_NAMES = new Set<PlayerShipNameJP>([
    '大和改二',
    '大和改二重',
    '武蔵改二',
]);

const TRIGGERABLE_FORMATIONS = new Set<FormationType>([
    'Echelon',
    'CruisingFormation_4',
]);

const REQUIRED_SURFACE_SHIPS_COUNT = 6;

export function can_Yamato_special_activate(
    attacker_fleet: PlayerFleet,
    first_ship: FirstShip,
    second_ship: SecondShip,
    valid_ship_length: ValidSurfaceShipLength,
): boolean {
    return (
        has_ship_name(TRIGGERABLE_SHIP_NAMES, first_ship.name_jp) &&
        !is_already_special_attack_activated(attacker_fleet) &&
        has_enough_valid_surface_ships(REQUIRED_SURFACE_SHIPS_COUNT, valid_ship_length) &&
        has_formation_type(TRIGGERABLE_FORMATIONS, attacker_fleet.formation) &&
        !is_damage_moderatery_or_more(first_ship) &&
        !is_damage_moderatery_or_more(second_ship)
    );
}