import { Equip } from "@/models/equip/basic";
import { EquippedShip, is_player_equipped_ship } from "@/models/ship/equipped";
import { calc_weighted_anti_air_of_player_ship } from "./player";
import { calc_weighted_anti_air_of_abyssal_ship } from "./abyssal";
import { match } from "ts-pattern";
import { Brand } from "@/types/brands";

/// 艦の加重対空値
/// https://wikiwiki.jp/kancolle/対空砲火#AntiAircraft
/// https://en.kancollewiki.net/Aerial_Combat#Adjusted_Anti-Air

/**
 * 装備倍率(加重対空) を返す
 * @param equip 
 * @returns 
 */
export const calc_mod_equip_ship = (
    equip: Equip,
): number => {
    return match(equip.aaci_trigger_type)
        .with('A_HAGUN', 'A_HAFD', 'A_AAFD', () => 2)
        .with('A_AAGUN', () => 3)
        // ? 日wiki: 電探(大型/小型)
        // ? ENwiki: 対空電探のみ
        // ? 暫定: 対空電探のみ
        .with('A_AIRRADAR', () => 1.5)
        .with('NONE', 'A_MAINGUNL', 'A_TYPE3SHELL', 'A_GUN', 'A_XLGUN', () => 0)
        .exhaustive();
}

export type WeightedAntiAir = Brand<number, 'WeightedAntiAir'>

/**
 * 艦の加重対空値を返す
 * @param ship 
 * @returns 
 */
export function calc_weighted_anti_air_of_ship(
    ship: EquippedShip,
): WeightedAntiAir {
    return is_player_equipped_ship(ship)
        ? calc_weighted_anti_air_of_player_ship(ship)
        : calc_weighted_anti_air_of_abyssal_ship(ship);
}