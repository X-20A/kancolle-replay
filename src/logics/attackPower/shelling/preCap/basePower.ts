import { ShellAttackPowerBase } from "@/datas/battle/shell";
import { EquippedShip, is_CVs, is_install_type } from "@/models/ship/equipped";
import { EquipSlot } from "@/models/ship/EquipSlot";
import { Brand } from "@/types/brands";

const calc_surface_shelling_core = (
    attacker_ship: EquippedShip,
    base_power: ShellAttackPowerBase,
): number => {
    return (
        + attacker_ship.edited_status.shell_power
        + calc_total_improvement_value(attacker_ship, 'shell_power')
        * base_power as ShellingAttackPowerBase
    );
}

/**
 * https://wikiwiki.jp/kancolle/対地攻撃#AGCalcCV > 上記の対地装備を搭載しない場合
 * @param attacker_ship 
 * @param base_power 
 */
const calc_normal_CVs_shelling_core = (
    attacker_ship: EquippedShip,
    base_power: ShellAttackPowerBase,
): number => {
    return (
        + attacker_ship.edited_status.shell_power
        * base_power as ShellingAttackPowerBase
    );
}

const calc_anti_install_CVs_shelling_core = (
    attacker_ship: EquippedShip,
    base_power: ShellAttackPowerBase,
): number => {
    
}

export type ShellingAttackPowerBase = Brand<number, 'ShellingAttackPowerBase'>

export function calc_shelling_attack_power(
    attacker_ship: EquippedShip,
    target_ship: EquippedShip,
    base_power: ShellAttackPowerBase,
): ShellingAttackPowerBase {
    if (!is_CVs(attacker_ship)) {
        return calc_surface_shelling_core(
            attacker_ship,
            base_power,
        ) as ShellingAttackPowerBase;
    }

    return is_install_type(target_ship)
        ? calc_anti_install_CVs_shelling_core(attacker_ship, base_power) as ShellingAttackPowerBase
        : calc_normal_CVs_shelling_core(attacker_ship, base_power) as ShellingAttackPowerBase;
}