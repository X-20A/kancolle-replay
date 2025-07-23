import { EquippedShip, includes_ship_type } from "@/models/ship/equipped";
import { NightBattleStrikeType } from "..";
import { NightScountAdditionType } from "@/logics/nightBattle/attackPower";

/// 軽巡|航巡|航戦|水母 専用夜戦CI

export function calc_cuiser_night_battle_strike_types(
    attacker_ship: EquippedShip,
): NightBattleStrikeType[] {
    const types = NightScountAdditionType[] = [];
    if (
        !includes_ship_type(['CL', 'CAV', 'BBV', 'AV'], attacker_ship.type_id)
    ) return types;


}