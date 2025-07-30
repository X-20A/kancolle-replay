import { calc_total_improvement_value, EquippedShip, is_player_equipped_ship } from "@/models/ship/equipped";
import { RandValue } from "@/types/brands/other";

const calc_base_armor = (
    ship: EquippedShip,
): number => {
    return ship.edited_status.armor
        + calc_total_improvement_value(ship, 'armor');
}

export function calc_defence(
    ship: EquippedShip,
    rand_value: RandValue,
): number {
    const base_armor = calc_base_armor(ship);

    return Math.max(0,
        0.7 * base_armor
        + 0.6 * Math.floor(Math.floor(base_armor) * rand_value)
    );
}