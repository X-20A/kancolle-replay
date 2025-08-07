import { AbyssalFleet, extract_flagship, is_already_special_attack_activated, is_combined_fleet, PlayerFleet } from "@/models/fleet/Fleet";
import { includes_ship_name, is_battle_ship_category, is_heavily_damaged, is_operational, is_retreated, is_submarine_category, PlayerEquippedShip } from "@/models/ship/equipped";
import { includes_formation_type } from "../formation";
import { DayOrNight } from "@/types/battle";
import { PlayerFleetUnit } from "@/models/fleet/FleetUnit";
import { has_at_least } from "@/types";

const extract_attacker_units = (
    fleet: PlayerFleet,
    phase_type: DayOrNight,
): PlayerFleetUnit[] => {
    return is_combined_fleet(fleet) && phase_type === 'Night'
        ? fleet.escort_fleet_units
        : fleet.main_fleet_units;
}

export function can_Nagato_touch(
    attacker_fleet: PlayerFleet,
    defender_fleet: AbyssalFleet,
    phase_type: DayOrNight,
): boolean {
    const attacker_units = extract_attacker_units(attacker_fleet, phase_type);
    if (!has_at_least(attacker_units, 2)) return false;

    const { ship: flagship } = extract_flagship(attacker_fleet, phase_type);
    const second_ship = attacker_units[1].ship;

    const valid_ship_length = attacker_units
        .filter(unit => {
            return !is_submarine_category(unit.ship) &&
                !is_operational(unit.ship)
        })
        .length;

    return (
        includes_ship_name(['長門改二', '陸奥改二'], flagship.name_jp) &&
        !is_already_special_attack_activated(attacker_fleet) &&
        valid_ship_length >= 6 &&
        second_ship !== undefined &&
        is_battle_ship_category(second_ship.type_id) &&
        !is_heavily_damaged(second_ship) &&
        !is_retreated(second_ship) &&
        includes_formation_type(['Echelon', 'CruisingFormation_2'], attacker_fleet.formation) &&
        !(is_combined_fleet(attacker_fleet) && !is_combined_fleet(defender_fleet))
    );
}

export function calc_Nagato_touch_trigger_rate(
    flagship: PlayerEquippedShip,
    second_ship: PlayerEquippedShip,
): number {
    const lv_mod = Math.sqrt(flagship.lv)
        + Math.sqrt(second_ship.lv);
    const luck_mod = Math.sqrt(flagship.edited_status.luck)
        + Math.sqrt(second_ship.edited_status.luck);

    return Math.floor(
        lv_mod
        + 1.5 * luck_mod
        + 25
    );
}

export function calc_