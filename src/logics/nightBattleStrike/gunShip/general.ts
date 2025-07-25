import { EquippedShip } from "@/models/ship/equipped";
import { NightBattleStrikeType } from "..";
import { NightBattleGunShipPreInfo } from ".";

/// 空母以外の汎用夜戦CI

type PreInfo = {
    /** 潜水魚雷を含めた全ての魚雷の数 */
    all_torpedo_count: number,
}

export function calc_general_night_battle_strike_types(
    gun_ship_pre_info: NightBattleGunShipPreInfo,
): NightBattleStrikeType[] {
    const {
        main_gun_count,
        sec_gun_count,
        torpedo_count,
    } = gun_ship_pre_info;

    if (main_gun_count >= 3) return ['Main_Gun_CI']
    if (
        main_gun_count >= 2 &&
        sec_gun_count >= 1
    ) return ['Sec_Gun_CI'];
    // ? 潜水CIが汎用魚雷CIを兼ねられるか不明 暫定: 不可
    if (torpedo_count >= 2) return ['Torpedo_CI'];
    if (
        torpedo_count >= 1 &&
        main_gun_count >= 1
    ) return ['Mixed_CI'];
    if (main_gun_count + sec_gun_count >= 2) return ['double_attack'];

    return [];
}