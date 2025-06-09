import { PlayerShip } from "@/models/ship/Ship";
import { ShipType } from "@/types/ship/ship";

type HasPotentialOAswStrategy = (ship: PlayerShip) => boolean;

/**
 * 艦種ごとの対潜攻撃のポテンシャルの有無を判定して返す    
 * 特殊条件の艦は予め判定されている前提    
 * 艦・装備・艦載機残存数の判定はRust    
 * https://wikiwiki.jp/kancolle/戦闘について#AntiSubmarine
 */
export const shipTypeStrategies: Record<ShipType, HasPotentialOAswStrategy> = {
    [ShipType.DE]: (ship) => isDeCapableOfOpeningAsw(ship),
    [ShipType.DD]: (ship) => hasSonarAndViewAswAtLeast(ship, 100),
    [ShipType.CL]: (ship) => hasSonarAndViewAswAtLeast(ship, 100),
    [ShipType.CLT]: (ship) => hasSonarAndViewAswAtLeast(ship, 100),
    [ShipType.CA]: () => false,
    [ShipType.CAV]: () => false,
    [ShipType.CVL]: (ship) => isCVLCapableOfOpeningAsw(ship),
    [ShipType.FBB]: () => false,
    [ShipType.BB]: () => false,
    [ShipType.BBV]: () => false,
    [ShipType.CV]: () => false,
    [ShipType.SS]: () => false,
    [ShipType.SSV]: () => false,
    [ShipType.AV]: () => false,
    [ShipType.LHA]: () => false,
    [ShipType.CVB]: () => false,
    [ShipType.AR]: () => false,
    [ShipType.AS]: () => false,
    [ShipType.CT]: (ship) => hasSonarAndViewAswAtLeast(ship, 100),
    [ShipType.AO]: (ship) => hasSonarAndViewAswAtLeast(ship, 100),
};

/**
 * 海防艦が先制対潜可能か判定して返す
 * @param ship 
 * @returns 
 */
function isDeCapableOfOpeningAsw(ship: PlayerShip): boolean {
    return hasSonarAndViewAswAtLeast(ship, 60)
        || (hasViewAswAtLeast(ship, 75) && ship.total_natural_equip_addition.asw >= 4);
}

/**
 * 軽空母が先制対潜可能か判定して返す
 */
function isCVLCapableOfOpeningAsw(ship: PlayerShip): boolean {
    const asw_flags = ship.flags.asw_equip;
    const asw = ship.view_status.asw;

    const cond_1 =
        asw >= 50 &&
        asw_flags.has_any_sonar &&
        (asw_flags.has_asw_plane || asw_flags.has_autogyro);

    const cond_2 =
        asw >= 65 &&
        (
            asw_flags.has_high_asw_torpedo_bomber ||
            asw_flags.has_asw_plane ||
            asw_flags.has_autogyro
        );

    const cond_3 =
        asw >= 100 &&
        asw_flags.has_any_sonar &&
        (
            asw_flags.has_positive_asw_dive_bomber ||
            asw_flags.has_high_asw_torpedo_bomber
        );

    return cond_1 || cond_2 || cond_3;
}

/**
 * 艦の表示対潜ステータスが指定された値以上かを判定して返す
 * @param ship 艦情報
 * @param threshold 閾値（例：60, 100）
 * @returns 閾値以上かどうか
 */
function hasViewAswAtLeast(ship: PlayerShip, threshold: number): boolean {
    return ship.view_status.asw >= threshold;
}

/**
 * ソナー系装備 && 表示対潜値が指定値以上かを判定して返す
 * @param ship 艦情報
 * @param threshold 閾値（例：60, 100）
 * @returns 条件をすべて満たすかどうか
 */
function hasSonarAndViewAswAtLeast(ship: PlayerShip, threshold: number): boolean {
    return ship.flags.asw_equip.has_any_sonar && hasViewAswAtLeast(ship, threshold);
}