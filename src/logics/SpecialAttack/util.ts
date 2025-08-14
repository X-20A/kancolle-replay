import { is_radar } from "@/models/equip/basic";
import { is_combined_fleet, PlayerFleet } from "@/models/fleet/Fleet";
import { PlayerFleetUnit } from "@/models/fleet/FleetUnit";
import { is_operational, is_submarine_category, PlayerEquippedShip } from "@/models/ship/equipped";
import { is_equip_exsist } from "@/models/ship/EquipSlot";
import { DayOrNight } from "@/types/battle";
import { Brand } from "@/types/brands";

export type SpecialAttackUnits =
    Brand<[PlayerFleetUnit, ...PlayerFleetUnit[]], 'SpecialAttackUnits'>

export function extract_attacker_units(
    fleet: PlayerFleet,
    phase_type: DayOrNight,
): SpecialAttackUnits {
    // ? 水上打撃部隊随伴艦隊 かつ 夜戦 なら発動できる? 暫定: 可能
    return is_combined_fleet(fleet) && phase_type === 'Night'
        ? fleet.escort_fleet_units as SpecialAttackUnits
        : fleet.main_fleet_units as SpecialAttackUnits;
}

const is_valid = (
    unit: PlayerFleetUnit,
): boolean => {
    return !is_submarine_category(unit.ship) &&
        !is_operational(unit.ship)
}

export type ValidSurfaceShipLength =
    Brand<number, 'ValidSurfaceShipLength'>

export function calc_valid_component_ship_length(
    attacker_units: PlayerFleetUnit[]
): ValidSurfaceShipLength {
    return attacker_units
        .filter(is_valid)
        .length as ValidSurfaceShipLength;
}

export function has_high_accuracy_radar(
    ship: PlayerEquippedShip,
): boolean {
    return ship.equip_slots.some(slot => {
        const { equip } = slot;

        return is_equip_exsist(equip) &&
            is_radar(equip) &&
            equip.natural_addition.los >= 8
    });
}

export function has_enough_valid_surface_ships(
    required_count: number,
    valid_surface_ship_length: ValidSurfaceShipLength,
): boolean {
    return valid_surface_ship_length >= required_count;
}