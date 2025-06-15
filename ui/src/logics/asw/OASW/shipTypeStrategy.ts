import { EquippedPlayerShip } from "@/models/ship/equipped/base";
import { match } from "ts-pattern";

/**
 * 艦種ごとの対潜攻撃の可/不可を判定して返す    
 * 特殊条件の艦は予め判定されている前提    
 * 艦・装備・艦載機残存数の判定はRust    
 * https://wikiwiki.jp/kancolle/戦闘について#AntiSubmarine
 */
export function can_OASW_by_ship_type(ship: EquippedPlayerShip): boolean {
    return match(ship.type_id)
        .with("DE", () => is_DE_capable_of_OASW(ship))
        .with(
            "DD",
            "CL",
            "CLT",
            "CT",
            "AO",
            () => has_sonar_and_view_ASW_at_least(ship, 100)
        )
        .with("CVL", () => is_CVL_capable_of_OASW(ship))
        .with(
            "CA",
            "CAV",
            "FBB",
            "BB",
            "BBV",
            "CV",
            "SS",
            "SSV",
            "AV",
            "LHA",
            "CVB",
            "AR",
            "AS",
            () => false
        )
        .exhaustive();
}

/**
 * 海防艦が先制対潜可能か判定して返す
 * @param ship 
 * @returns 
 */
function is_DE_capable_of_OASW(ship: EquippedPlayerShip): boolean {
    return has_sonar_and_view_ASW_at_least(ship, 60)
        || (has_view_ASW_at_least(ship, 75) && ship.total_natural_equip_addition.asw >= 4);
}

/**
 * 軽空母が先制対潜可能か判定して返す
 */
function is_CVL_capable_of_OASW(ship: EquippedPlayerShip): boolean {
    const asw_flags = ship.flags.asw_equip;
    const asw = ship.view_status.asw;

    if (
        asw >= 50 &&
        asw_flags.has_any_sonar &&
        (asw_flags.has_asw_plane || asw_flags.has_autogyro)
    ) return true;

    if (
        asw >= 65 &&
        (
            asw_flags.has_high_asw_torpedo_bomber ||
            asw_flags.has_asw_plane ||
            asw_flags.has_autogyro
        )
    ) return true;

    if (
        asw >= 100 &&
        asw_flags.has_any_sonar &&
        (
            asw_flags.has_positive_asw_dive_bomber ||
            asw_flags.has_high_asw_torpedo_bomber
        )
    ) return true;

    return false;
}
 
/**
 * 艦の表示対潜ステータスが指定された値以上かを判定して返す
 * @param ship 艦情報
 * @param threshold 閾値（例：60, 100）
 * @returns 閾値以上かどうか
 */
function has_view_ASW_at_least(ship: EquippedPlayerShip, threshold: number): boolean {
    return ship.view_status.asw >= threshold;
}

/**
 * ソナー系装備 && 表示対潜値が指定値以上かを判定して返す
 * @param ship 艦情報
 * @param threshold 閾値（例：60, 100）
 * @returns 条件をすべて満たすかどうか
 */
function has_sonar_and_view_ASW_at_least(ship: EquippedPlayerShip, threshold: number): boolean {
    return ship.flags.asw_equip.has_any_sonar && has_view_ASW_at_least(ship, threshold);
}