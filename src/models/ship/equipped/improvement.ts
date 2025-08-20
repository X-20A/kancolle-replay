import { EquipImprovementAddition } from "@/datas/equip/improvement";
import { EquippedShip, is_player_equipped_ship } from ".";
import { TStatusComponent } from "@/types";

/**
 * 艦の改修値による砲撃火力ボーナスの総計を返す
 * @param ship 
 * @returns 
 */
export function calc_total_improvement_value(
    ship: EquippedShip,
    key: keyof TStatusComponent,
): number {
    return is_player_equipped_ship(ship)
        ? ship.total_equip_improvement_addition[key]
        : 0;
}