import { ASWPreInfo } from "@/logics/asw/preInfo";

/**
 * 対潜シナジー値を計算して返す
 * @param info 
 * @returns 
 */
export function calc_ASW_synergy(
    info: ASWPreInfo,
): number {
    const {
        has_any_sonar,
        has_small_sonar,
        has_any_DC,
        has_DCP,
        has_DC,
    } = info;
    
    let damage_bonus = 1;

    // 爆雷投射機と爆雷を両方持っている場合
    if (has_DCP && has_DC) {
        damage_bonus *= has_small_sonar ? 1.25 : 1.1;
    }
    // ソナーと爆雷の両方を持っている場合
    if (has_any_sonar && has_any_DC) {
        damage_bonus *= 1.15;
    }

    return damage_bonus;
}