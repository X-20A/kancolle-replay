import { has_formation_type } from "@/logics/formation";
import { is_already_special_attack_activated, is_combined_fleet, PlayerFleet } from "@/models/fleet/Fleet";
import { is_damage_moderatery_or_more, is_ship_on_the_front_line, is_submarine_category, PlayerEquippedShip } from "@/models/ship/equipped";
import { FormationType } from "@/types";
import { DayOrNight } from "@/types/battle";
import { ShipType } from "@/types/ship/ship";

const TRIGGERABLE_SHIP_TYPE: ShipType = 'AS';

const TRIGGERABLE_FORMATION: Set<FormationType> = new Set([
    'Echelon',
    'LineAbreast',
]);

const REQUIRED_FLAGSHIP_LV = 30;

const REQUIRED_SUBMARINE_COUNT = 2;

/**
 * 潜水艦隊攻撃の随伴として参加可能か判定して返す
 * @param ship 
 * @returns 
 */
const is_valid_joining_ship = (
    ship: PlayerEquippedShip | undefined,
): boolean => {
    return ship !== undefined &&
        !is_damage_moderatery_or_more(ship) &&
        is_submarine_category(ship) &&
        !is_ship_on_the_front_line(ship)
}

export function can_activate_Submarine_special(
    fleet: PlayerFleet,
    flagship: PlayerEquippedShip,
    second_ship: PlayerEquippedShip,
    third_ship: PlayerEquippedShip,
    fourth_ship: PlayerEquippedShip | undefined,
    phase_type: DayOrNight,
): boolean {
    const valid_SS_length = [second_ship, third_ship, fourth_ship]
        .filter(is_valid_joining_ship)
        .length;
    
    return (
        flagship.type_id === TRIGGERABLE_SHIP_TYPE &&
        flagship.lv >= REQUIRED_FLAGSHIP_LV &&
        !is_damage_moderatery_or_more(flagship) &&
        valid_SS_length >= REQUIRED_SUBMARINE_COUNT &&
        is_valid_joining_ship(second_ship) &&
        is_valid_joining_ship(third_ship) &&
        !is_combined_fleet(fleet) &&
        has_formation_type(TRIGGERABLE_FORMATION, fleet.formation) &&
        (!is_already_special_attack_activated(fleet) || phase_type === 'Night')
    );
}