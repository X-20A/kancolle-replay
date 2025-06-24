import { EquippedShip, is_player_ship } from "@/models/ship/equipped";
import { calc_morale_type } from "./morale";

const calc_capped_evasion = (
    evasion: number,
): number => {
    if (evasion < 40) return evasion;
    if (evasion < 65) return Math.sqrt(40 + 3 * Math.sqrt(evasion - 40));
    return Math.floor(
        55 + 2 * Math.sqrt(evasion - 65)
    );
}

const calc_fuel_flat = (
    ship: EquippedShip,
): number => {
    const fuel_remain_ratio = is_player_ship(ship)
        ? ship.state.fuel_remain_ratio
        : 1;

    return fuel_remain_ratio >= 0.75
        ? 0
        : 75 - fuel_remain_ratio * 100;
}

/**
 * 基本回避項を返す
 * @param ship 
 * @returns 
 */
const calc_basic_evasion = (
    ship: EquippedShip,
): number => {
    return ship.edited_status.evasion
        + (is_player_ship(ship) ? ship.total_equip_improvement_addition.shell_evasion: 0)
        + Math.sqrt(2 * ship.edited_status.luck);
}

/**
 * 航空戦の回避項を返す
 * @param target_ship 
 * @returns 
 */
export function calc_air_combat_evasion(
    target_ship: EquippedShip,
): number {
    // NOTE: 装備回避値は砲戦回避を参照 根拠は無いが雷撃回避ではなかろうというだけ
    return calc_capped_evasion(calc_basic_evasion(target_ship))
        - calc_fuel_flat(target_ship);
}