import { EquippedShip, is_player_equipped_ship } from "@/models/ship/equipped";

export function calc_fixed_shootdown_count(
    defender_ship: EquippedShip,
    
): number {
    // 使う側の状況が分かってから実装
    return is_player_equipped_ship(defender_ship)
        ? calc_player_fixed_shootdown_count(

        )
        : calc_abyssal_fixed_shootdown_count(

        );
}