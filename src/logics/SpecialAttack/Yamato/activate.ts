import { is_already_special_attack_activated, PlayerFleet } from "@/models/fleet/Fleet";
import { has_ship_name, is_damage_moderatery_or_more, PlayerEquippedShip } from "@/models/ship/equipped";
import { SpecialAttackComponentLength } from "../util";
import { has_formation_type } from "@/logics/formation";
import { FormationType } from "@/types";
import { PlayerShipNameJP } from "@/types/ship/playerNameJP";

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
    flagship: PlayerEquippedShip,
    second_ship: PlayerEquippedShip,
    valid_ship_length: SpecialAttackComponentLength,
): boolean {
    return (
        has_ship_name(TRIGGERABLE_SHIP_NAMES, flagship.name_jp) &&
        !is_already_special_attack_activated(attacker_fleet) &&
        valid_ship_length >= REQUIRED_SURFACE_SHIPS_COUNT &&
        has_formation_type(TRIGGERABLE_FORMATIONS, attacker_fleet.formation) &&
        !is_damage_moderatery_or_more(flagship) &&
        !is_damage_moderatery_or_more(second_ship)
    );
}