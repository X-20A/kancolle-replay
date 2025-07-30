import { FleetUnit, is_combined_fleet } from "@/models/fleet/FleetUnit";
import { calc_total_improvement_value, EquippedShip } from "@/models/ship/equipped";
import { Brand } from "@/types/brands";

const calc_combined_fleet_mod = (
    attacker_unit: FleetUnit,
    defender_unit: FleetUnit,
): number => {
    if (
        is_combined_fleet(attacker_unit) &&
        !is_combined_fleet(defender_unit)
    ) return -5;

    return 10;
}

export type TorpedoAttackPower = Brand<number, 'TorpedoAttackPower'>

const calc_torpedo_attack_power_core = (
    attacker_ship: EquippedShip,
    combined_fleet_mod: number,
): TorpedoAttackPower => {
    const total_improvement_torpedo = calc_total_improvement_value(
        attacker_ship,
        'torpedo_power',
    );

    const ship_torpedo = attacker_ship.edited_status.torpedo_power
        + total_improvement_torpedo;

    const ATTACK_POWER_CONSTANT = 5;

    const attack_power = ship_torpedo
        + combined_fleet_mod
        + ATTACK_POWER_CONSTANT;

    return attack_power as TorpedoAttackPower;
}