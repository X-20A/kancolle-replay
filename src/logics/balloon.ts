import { UserSettings } from "@/core/flows/SimExecuter";
import { concat_fleet_ships, Fleet } from "@/models/fleet/Fleet";
import { Node } from "@/models/Node";
import { EquippedShip, is_player_ship, is_retreated, is_sunk } from "@/models/ship/equipped";
import { Brand } from "@/types/brands";

/// 阻塞気球に関する処理
// https://en.kancollewiki.net/Barrage_Balloon 及び表のソース

/**
 * 阻塞気球使用が設定されたNodeであるか判定して返す
 * @param node 
 * @param settings 
 * @returns 
 */
const is_use_balloon_node = (
    node: Node,
    settings: UserSettings,
): boolean => {
    return settings.use_barrage_balloon_node === node.index;
}

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
export function calc_airstrike_balloon_damage_mod(
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
 * @param attacker_fleet_balloon_count 
 * @returns 
 */
export function calc_day_shelling_balloon_damage_mod(
    attacker_fleet_balloon_count: number,
): number {
    const ATTACKER_COEFFIENT = 0.02;

    return 1
        + attacker_fleet_balloon_count * ATTACKER_COEFFIENT;
}

/**
 * 対潜戦における阻塞気球のダメージ補正値を返す    
 * NOTE: Sortie Simでは対潜にも付与されているが日ENwikiには記載がない
 * @param attacker_fleet_balloon_count 
 * @returns 
 */
export function calc_ASW_balloon_damage_mod(
    attacker_fleet_balloon_count: number,
): number {
    const ATTACKER_COEFFIENT = 0.02;

    return 1
        + attacker_fleet_balloon_count * ATTACKER_COEFFIENT;
}

export type AirstrikeAccuracyBalloonMod = Brand<number, 'AirstrikeAccuracyBalloonMod'>

/**
 * 航空戦における阻塞気球の命中補正値を返す
 * @param attacker_fleet 
 * @param defender_fleet 
 * @param setting 
 */
export function calc_airstrike_balloon_accuracy_mod(
    settings: UserSettings,
    atttacker_ship: EquippedShip,
    attacker_fleet_balloon_count: number,
): AirstrikeAccuracyBalloonMod {
    // TODO: 命中に関してはwikiは不明になっている。Sortie Simのようにユーザー設定するか？
    // ? Sortie Simでは * x + y みたいな処理にしてる 暫定: 乗算のみ
    if (attacker_fleet_balloon_count === 0) return 1 as AirstrikeAccuracyBalloonMod;

    const PLAYER_ACCURACY: number[] = [1, 1, 1];
    const ABYSSAL_ACCURACY: number[] = [1, 1, 1];

    return is_player_ship(atttacker_ship)
        ? PLAYER_ACCURACY[attacker_fleet_balloon_count] as AirstrikeAccuracyBalloonMod
        : ABYSSAL_ACCURACY[attacker_fleet_balloon_count] as AirstrikeAccuracyBalloonMod;
}

export type LBASAccuracyBalloonMod = Brand<number, 'LBASAccuracyBalloonMod'>

/**
 * 基地航空隊攻撃における阻塞気球の命中補正値を返す
 * @param settings 
 * @param atttacker_ship 
 * @param attacker_fleet_balloon_count 
 * @returns 
 */
export function calc_LBAS_balloon_accuracy_mod(
    settings: UserSettings,
    atttacker_ship: EquippedShip,
    attacker_fleet_balloon_count: number,
): LBASAccuracyBalloonMod {
    if (attacker_fleet_balloon_count === 0) return 1 as LBASAccuracyBalloonMod;

    const PLAYER_ACCURACY: number[] = [1, 1, 1];
    const ABYSSAL_ACCURACY: number[] = [1, 1, 1];

    return is_player_ship(atttacker_ship)
        ? PLAYER_ACCURACY[attacker_fleet_balloon_count] as LBASAccuracyBalloonMod
        : ABYSSAL_ACCURACY[attacker_fleet_balloon_count] as LBASAccuracyBalloonMod;
}