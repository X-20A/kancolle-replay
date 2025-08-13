import { has_formation_type } from "@/logics/formation";
import { AbyssalFleet, is_already_special_attack_activated, is_combined_fleet, PlayerFleet } from "@/models/fleet/Fleet";
import { has_ship_name, is_battle_ship_category, is_damage_heavily, is_operational, PlayerEquippedShip } from "@/models/ship/equipped";
import { FormationType } from "@/types";
import { PlayerShipNameJP } from "@/types/ship/playerNameJP";

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
    flagship: PlayerEquippedShip,
    second_ship: PlayerEquippedShip,
    valid_ship_length: number,
    attacker_fleet: PlayerFleet,
    defender_fleet: AbyssalFleet,
): boolean {
    return (
        !is_already_special_attack_activated(attacker_fleet) &&
        has_ship_name(TRIGGERABLE_SHIP_NAMES, flagship.name_jp) &&
        valid_ship_length >= REQUIRED_SURFACE_SHIPS_COUNT &&
        is_battle_ship_category(second_ship.type_id) &&
        !is_damage_heavily(second_ship) &&
        is_operational(second_ship) &&
        has_formation_type(TRIGGERABLE_FORMATION, attacker_fleet.formation) &&
        !(is_combined_fleet(attacker_fleet) && !is_combined_fleet(defender_fleet)) // 12vs6は無効
    );
}