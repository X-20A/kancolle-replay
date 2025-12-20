import { EquippedShip, is_player_equipped_ship } from "@/models/ship/equipped";

export function calc_fixed_shootdown_count(
    defender_ship: EquippedShip,
    
): number {
    return is_player_equipped_ship(defender_ship)
        ? calc_player_fixed_shootdown_count(

        )
        : calc_abyssal_fixed_shootdown_count(

        );
}