import { EquipSlot } from "@/models/ship/EquipBuilt";
import { ValidContactAirState } from ".";
import { Squadron } from "@/models/LBAS";

/**
 * 制空状態による補正値を返す
 * @param air_state 
 * @returns 
 */
const calc_air_state_mod = (
    air_state: ValidContactAirState,
): number => {
    if (air_state === 'Supremacy') return 25;
    if (air_state === 'Superiority') return 40;
    return 55; // air_state = Denial
}

/**
 * 触接第一段階の成功率を返す
 * @param candidate_slots 
 * @param air_state 
 * @returns 
 */
export function calc_phase1_success_rate(
    candidate_slots: EquipSlot[] | Squadron[],
    air_state: ValidContactAirState,
): number {
    if (!candidate_slots.length) return 1;

    const total_LOS_power = candidate_slots.reduce((total, slot) => {
        const plane = slot.equip;
        if (!plane) return total;

        // ? Sortie Simでは艦攻の索敵値を無視する
        // ? 日&EN wikiでは艦攻の触接率が著しく低いとある
        // ? 検証があるのか暫定処置か不明
        // ? ACSimとSortie Simの触接処理は結構違うかも
        // ? Sortie Simは処理の都合で最終触接率が静的に出ない
        if (plane.type_id === 'TORPEDO_BOMBER') return total;

        return total
            + Math.floor(Math.sqrt(slot.slot_count) * plane.natural_addition.los);
    }, 0);
    const air_state_mod = calc_air_state_mod(air_state);

    // 最低保証？なのか分からないがこれがあるので、たとえば触接可能機体があれば
    // 制空確保時は　1 / 25　で第一段階成功率は4%が下限となる
    const GUARANTEE = 1;
    
    return (total_LOS_power + GUARANTEE) / air_state_mod;
}