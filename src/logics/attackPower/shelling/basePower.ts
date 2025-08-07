import { ShellAttackPowerBase } from "@/datas/battle/shell";
import { calc_total_improvement_value, EquippedShip } from "@/models/ship/equipped";
import { Brand } from "@/types/brands";

export type ShellingAttackPowerBase = Brand<number, 'ShellingAttackPowerBase'>

export function calc_shelling_attack_power(
    attacker_ship: EquippedShip,
    base_power: ShellAttackPowerBase,
): ShellingAttackPowerBase {
    return base_power
        + attacker_ship.edited_status.fire_power
        + calc_total_improvement_value(attacker_ship, 'shell_power')
        * base_power as ShellingAttackPowerBase;
}