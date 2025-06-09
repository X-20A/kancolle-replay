import { PlayerShip } from "@/models/ship/Ship";
import { ShipType } from "@/types/ship/ship";

type HasPotentialOAswStrategy = (ship: PlayerShip) => boolean;

// NOTE: 空母系の 大破 || 枯れ は発動に影響なし

/**
 * 艦種ごとの対潜攻撃のポテンシャルの有無を判定して返す    
 * 特殊条件の艦は予め判定されている前提    
 * 艦・装備・艦載機残存数の判定はRust    
 * https://wikiwiki.jp/kancolle/戦闘について#AntiSubmarine
 */
const shipTypeStrategies: Record<ShipType, HasPotentialOAswStrategy> = {
    [ShipType.DE]: (ship) => {
        return hasSonarAndViewAswAtLeast(ship, 60)
            || (hasViewAswAtLeast(ship, 75) && ship.total_natural_equip_addition.asw >= 4)
    },
    [ShipType.DD]: (ship) => hasSonarAndViewAswAtLeast(ship, 100),
    [ShipType.CL]: (ship) => hasSonarAndViewAswAtLeast(ship, 100),
    [ShipType.CLT]: (ship) => hasSonarAndViewAswAtLeast(ship, 100),
    [ShipType.CA]: () => false,
    [ShipType.CAV]: () => false,
    // NOTE: 瑞鳳改二乙 型を軽空母のデフォルトとする
    [ShipType.CVL]: (ship) => {
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
    },
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

/**
 * 艦が先制対潜可能か判定して返す    
 * NOTE: 先制対潜は損傷状態、艦載機残存数に影響されないので、装備時点で静的に決定する
 * @param ship 
 * @returns 
 */
export function calcCanOASW(ship: PlayerShip): boolean {
    const asw_flags = ship.flags.asw_equip;

    if (ship.flags.can_unconditional_OASW) return true;

    if (ship.flags.has_advantage_OASW_CVs) {
        return asw_flags.has_positive_asw_dive_bomber
            || asw_flags.has_high_asw_torpedo_bomber
            || asw_flags.has_asw_plane
            || asw_flags.has_autogyro;
    }
    if ([626, 916].includes(ship.master_id)) { // 神州丸改 || 大和改二重
        return asw_flags.has_any_sonar
            || asw_flags.has_seaplane_bomber
            || asw_flags.has_autogyro;
    }
    if ([943, 948].includes(ship.master_id)) { // 熊野丸/改
        return asw_flags.has_any_sonar // 大型ソナー装備不可なのでサボり
            || asw_flags.has_positive_asw_dive_bomber
            || asw_flags.has_asw_plane
            || asw_flags.has_autogyro;
    }
    if ([411, 412].includes(ship.master_id)) { // 扶桑改二/山城改二
        return asw_flags.has_any_sonar // 小型ソナー装備不可なのでサボり
            || asw_flags.has_seaplane_bomber
            || asw_flags.has_autogyro
            || asw_flags.has_any_DC;
    }
    if (ship.master_id === 554) { // 日向改二
        return asw_flags.has_any_S51J
            || asw_flags.has_multiple_low_autogyro;
    }

    const strategy = shipTypeStrategies[ship.type_id];
    return strategy(ship);
}