import { NightBattleStrikeType } from "..";
import { NightBattleGunShipPreInfo } from ".";
import { EquippedShip, is_install_type } from "@/models/ship/equipped";

/// 空母以外の汎用夜戦CI

export function calc_general_night_battle_strike_types(
    gun_ship_pre_info: NightBattleGunShipPreInfo,
    /** UI表示等でtargetを指定しない場合の結果を得たい場合は 'Not specified' */
    defender_ship: EquippedShip | 'Not_specified',
): NightBattleStrikeType[] {
    if (defender_ship === undefined) {
        throw new TypeError('defender_shipは必須です。標的艦を指定しない場合は\'Not specified\'を明示的に渡してください。');
    }
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
    if (main_gun_count + sec_gun_count >= 2) return ['double_attack'];

    if (
        defender_ship !== 'Not_specified' &&
        is_install_type(defender_ship)
    ) return [];

    // ? 潜水CIが汎用魚雷CIを兼ねられるか不明 暫定: 不可
    if (torpedo_count >= 2) return ['Torpedo_CI'];
    if (
        torpedo_count >= 1 &&
        main_gun_count >= 1
    ) return ['Mixed_CI'];
    
    return [];
}