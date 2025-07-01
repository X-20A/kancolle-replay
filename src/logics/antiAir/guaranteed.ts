import { AACI_DATAS } from "@/datas/aaci";
import { AntiAirCutinType } from "./cutin/conditions";

/// 最低保証

const _calc_defence_guaranteed_base = (
    aaci_type: AntiAirCutinType | 'Misfire',
    initial_guaranteed: number
): number => {
    return initial_guaranteed
        + (aaci_type !== 'Misfire' ? AACI_DATAS[aaci_type].guaranteed_bonus : 0);
}

/**
 * 自艦隊による迎撃の最低保証撃墜数を返す
 * @param aaci_type 
 * @param unit 
 */
export function calc_own_defence_guaranteed(
    aaci_type: AntiAirCutinType | 'Misfire',
): number {
    const OWN_INITIAL_GUARANTEE = 1;
    return _calc_defence_guaranteed_base(aaci_type, OWN_INITIAL_GUARANTEE);
}

/**
 * 敵艦隊による迎撃の最低保証撃墜数を返す
 * @param aaci_type 
 * @param unit 
 */
export function calc_enemy_defence_guaranteed(
    aaci_type: AntiAirCutinType | 'Misfire',
): number {
    const ENEMY_INITIAL_GUARANTEE = 0;
    return _calc_defence_guaranteed_base(aaci_type, ENEMY_INITIAL_GUARANTEE);
}