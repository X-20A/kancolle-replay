import { EquippedShip, is_damage_moderatery_or_more, is_heavily_damaged } from "@/models/ship/equipped";

export type DamageShellingPowerMod = 0.4 | 0.7 | 1

export function calc_damage_attack_power_mod(
    attacker_ship: EquippedShip,
): DamageShellingPowerMod {
    if (is_heavily_damaged(attacker_ship)) return 0.4;
    if (is_damage_moderatery_or_more(attacker_ship)) return 0.7
    return 1;
}