import { has_formation_type } from "@/logics/formation";
import { AbyssalFleet, is_already_special_attack_activated, is_combined_fleet, PlayerFleet } from "@/models/fleet/Fleet";
import { has_ship_name, is_battle_ship_category, is_damage_heavily, is_operational } from "@/models/ship/equipped";
import { FormationType } from "@/types";
import { FirstShip, SecondShip } from "@/types/fleet/ship";
import { PlayerShipNameJP } from "@/types/ship/playerNameJP";
import { has_enough_valid_surface_ships, ValidSurfaceShipLength } from "../util";

const TRIGGERABLE_SHIP_NAMES: Set<PlayerShipNameJP> = new Set([
    '長門改二',
    '陸奥改二',
]);

const TRIGGERABLE_FORMATION: Set<FormationType> = new Set([
    'Echelon',
    'CruisingFormation_2',
]);

const REQUIRED_SURFACE_SHIPS_COUNT = 6;

export function can_activate_Nagato_special(
    first_ship: FirstShip,
    second_ship: SecondShip,
    valid_ship_length: ValidSurfaceShipLength,
    attacker_fleet: PlayerFleet,
    defender_fleet: AbyssalFleet,
): boolean {
    return (
        !is_already_special_attack_activated(attacker_fleet) &&
        has_ship_name(TRIGGERABLE_SHIP_NAMES, first_ship.name_jp) &&
        has_enough_valid_surface_ships(REQUIRED_SURFACE_SHIPS_COUNT, valid_ship_length) &&
        is_battle_ship_category(second_ship.type_id) &&
        !is_damage_heavily(second_ship) &&
        is_operational(second_ship) &&
        has_formation_type(TRIGGERABLE_FORMATION, attacker_fleet.formation) &&
        !(is_combined_fleet(attacker_fleet) && !is_combined_fleet(defender_fleet)) // 12vs6では不可
    );
}