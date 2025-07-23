import { EquippedShip } from "@/models/ship/equipped";
import { NightBattleStrikeType } from "..";
import { calc_general_night_battle_strike_types } from "./general";
import { calc_cuiser_night_battle_strike_types } from "./cruisers";
import { calc_DD_night_battle_strike_types } from "./DD";

/// /// 空母以外の夜戦 連撃|CI

export function calc_gun_ship_night_battle_strike_types(
    attacker_ship: EquippedShip,
): NightBattleStrikeType[] {
    return [
        ...calc_general_night_battle_strike_types(attacker_ship),
        ...calc_cuiser_night_battle_strike_types(attacker_ship),
        ...calc_DD_night_battle_strike_types(attacker_ship),
    ];
}