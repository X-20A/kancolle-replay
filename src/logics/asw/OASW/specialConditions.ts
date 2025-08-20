import { PlayerEquippedShip } from "@/models/ship/equipped";

/**
 * 特定艦に対する例外的な先制対潜条件の判定を行う。
 * 条件を満たす場合は true、該当艦で条件未満なら false、それ以外の艦なら undefined を返す。
 */
export function evaluate_special_OASW_condition(
    ship: PlayerEquippedShip,
): boolean | 'no_match' {
    const {
        has_positive_asw_dive_bomber,
        has_high_asw_torpedo_bomber,
        has_asw_plane,
        has_autogyro,
        has_any_sonar,
        has_seaplane_bomber,
        has_any_DC,
        has_any_S51J,
        low_autogyro_count,
    } = ship.ASW_pre_info;

    if (ship.flags.can_unconditional_OASW) return true;

    if (ship.flags.has_advantage_OASW_CVs) {
        return has_positive_asw_dive_bomber
            || has_high_asw_torpedo_bomber
            || has_asw_plane
            || has_autogyro;
    }
    switch (ship.name_jp) {
        case '神州丸改':
        case '大和改二重':
            return has_any_sonar
                || has_seaplane_bomber
                || has_autogyro;
        case '熊野丸':
        case '熊野丸改':
            return has_any_sonar
                || has_positive_asw_dive_bomber
                || has_asw_plane
                || has_autogyro;
        case '扶桑改二':
        case '山城改二':
            return has_any_sonar
                || has_seaplane_bomber
                || has_autogyro
                || has_any_DC;
        case '日向改二':
            return has_any_S51J
                || low_autogyro_count >= 1;
        default:
            return 'no_match';
    }
}
