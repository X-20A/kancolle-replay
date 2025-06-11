import { PlayerShip } from "@/models/ship/Ship";

/**
 * 特定艦に対する例外的な先制対潜条件の判定を行う。
 * 条件を満たす場合は true、該当艦で条件未満なら false、それ以外の艦なら undefined を返す。
 */
export function evaluate_special_OASW_condition(ship: PlayerShip): boolean | undefined {
    const asw_flags = ship.flags.asw_equip;

    if (ship.flags.can_unconditional_OASW) return true;

    if (ship.flags.has_advantage_OASW_CVs) {
        return asw_flags.has_positive_asw_dive_bomber
            || asw_flags.has_high_asw_torpedo_bomber
            || asw_flags.has_asw_plane
            || asw_flags.has_autogyro;
    }
    switch (ship.master_id) {
        case 626: // 神州丸改
        case 916: // 大和改二重
            return asw_flags.has_any_sonar
                || asw_flags.has_seaplane_bomber
                || asw_flags.has_autogyro;
        case 943: // 熊野丸
        case 948: // 熊野丸改
            return asw_flags.has_any_sonar
                || asw_flags.has_positive_asw_dive_bomber
                || asw_flags.has_asw_plane
                || asw_flags.has_autogyro;
        case 411: // 扶桑改二
        case 412: // 山城改二
            return asw_flags.has_any_sonar
                || asw_flags.has_seaplane_bomber
                || asw_flags.has_autogyro
                || asw_flags.has_any_DC;
        case 554: // 日向改二
            return asw_flags.has_any_S51J
                || asw_flags.has_multiple_low_autogyro;
        default:
            return undefined;
    }
}
