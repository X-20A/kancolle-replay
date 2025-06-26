import { Rand } from "@/effects/random";
import { EquippedShip, is_player_ship } from "@/models/ship/equipped";

const calc_base_armor = (
    ship: EquippedShip,
): number => {
    return ship.edited_status.armor
        + (is_player_ship(ship) ? ship.total_equip_improvement_addition.armor : 0);
}

export function calc_defence(
    ship: EquippedShip,
    rand: Rand,
): number {
    const base_armor = calc_base_armor(ship);

    return Math.max(0,
        0.7 * base_armor
        + 0.6 * Math.floor(Math.floor(base_armor) * rand.next())
    );
}