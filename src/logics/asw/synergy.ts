import { AswEquipFlags } from "@/types/ship/ship";

/**
 * 対潜シナジー値を計算して返す
 * @param flags 
 * @returns 
 */
export function calcAswSynergy(
    flags: AswEquipFlags,
): number {
    const has_sonar = flags.has_any_sonar;
    const has_sonar_S = flags.has_small_sonar;
    const has_DC = flags.has_any_DC;
    const has_DCP = flags.has_DCP;
    const has_DC_only = flags.has_DC;
    
    let damage_bonus = 1;

    // 爆雷投射機と爆雷のみを両方持っている場合
    if (has_DCP && has_DC_only) {
        damage_bonus *= has_sonar_S ? 1.25 : 1.1;
    }

    // ソナーと爆雷の両方を持っている場合
    if (has_sonar && has_DC) {
        damage_bonus *= 1.15;
    }

    return damage_bonus;
}