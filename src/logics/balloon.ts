import { UserSettings } from "@/core/flows/SimExecuter";
import { concat_fleet_ships, Fleet } from "@/models/fleet/Fleet";
import { is_retreated, is_sunk } from "@/models/ship/equipped";

/// 阻塞気球に関する処理
// https://en.kancollewiki.net/Barrage_Balloon 及び表のソース

/**
 * 艦隊内の阻塞気球装備艦の数を返す
 * @param fleet 
 * @returns 
 */
const calc_equip_balloon_ships_length = (
    fleet: Fleet,
): number => {
    return concat_fleet_ships(fleet).filter(ship => {
        !is_sunk(ship) && // ? 轟沈状態の艦娘の阻塞気球がカウントされるかは不明
        !is_retreated(ship) &&
        ship.flags.has_balloon
    }).length;
}

/**
 * 艦隊内の有効な阻塞気球装備艦の数を返す
 * @param fleet 
 * @returns 
 */
const calc_valid_equip_balloon_ship_count = (
    fleet: Fleet,
): number => {
    const VALID_LIMIT_COUNT = 3;

    return Math.min(
        VALID_LIMIT_COUNT,
        calc_equip_balloon_ships_length(fleet),
    );
}

/**
 * 航空戦における阻塞気球のダメージ補正値を返す
 * @param attacker_fleet 
 * @returns 
 */
export function calc_airstrike_barrage_balloon_damage_mod(
    attacker_fleet: Fleet,
    defender_fleet: Fleet,
): number {
    const ATTACKER_COEFFIENT = 0.02;
    const DEFENDER_COEFFIENT = 0.05;

    const valid_attacker_equip_balloon_ship_count = calc_valid_equip_balloon_ship_count(attacker_fleet);
    const valid_defender_equip_balloon_ship_count = calc_valid_equip_balloon_ship_count(defender_fleet);

    // ? 効果が 艦娘 | 深海 で固有なのか、 攻撃 | 防御 でそっくり入れ替わるのか分からない 暫定: 入れ替わる

    return (1 + valid_attacker_equip_balloon_ship_count * ATTACKER_COEFFIENT)
        * (1 - valid_defender_equip_balloon_ship_count * DEFENDER_COEFFIENT);
}

/**
 * 昼砲撃戦における阻塞気球のダメージ補正値を返す
 * @param attacker_fleet 
 * @returns 
 */
export function calc_day_shelling_barrage_balloon_damage_mod(
    attacker_fleet: Fleet,
): number {
    const ATTACKER_COEFFIENT = 0.02;

    const valid_attacker_equip_balloon_ship_count = calc_valid_equip_balloon_ship_count(attacker_fleet);

    return 1 + valid_attacker_equip_balloon_ship_count * ATTACKER_COEFFIENT;
}

/**
 * 対潜戦における阻塞気球のダメージ補正値を返す    
 * NOTE: Sortie Simでは対潜にも付与されているが日ENwikiには記載がない
 * @param attacker_fleet 
 * @returns 
 */
export function calc_ASW_barrage_balloon_damage_mod(
    attacker_fleet: Fleet,
): number {
    const ATTACKER_COEFFIENT = 0.02;

    const valid_attacker_equip_balloon_ship_count = calc_valid_equip_balloon_ship_count(attacker_fleet);

    return 1 + valid_attacker_equip_balloon_ship_count * ATTACKER_COEFFIENT;
}

/**
 * 航空戦における阻塞気球の命中補正値を返す
 * @param attacker_fleet 
 * @param defender_fleet 
 * @param setting 
 */
export function calc_airstrike_barrage_balloon_accuracy_mod(
    settings: UserSettings,
): number {
    // TODO: 命中に関してはwikiは不明になっている。Sortie Simのようにユーザー設定するか？
}