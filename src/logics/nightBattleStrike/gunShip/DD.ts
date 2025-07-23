import { EquippedShip } from "@/models/ship/equipped";
import { NightBattleStrikeType } from "..";

/// 駆逐専用夜戦CI

export function calc_DD_night_battle_strike_types(
    attacker_ship: EquippedShip,
): NightBattleStrikeType[] {
    const types: NightBattleStrikeType[] = [];
    if (attacker_ship.type_id !== 'DD') return types;


}