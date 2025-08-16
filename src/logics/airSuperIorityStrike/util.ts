import { EquipType } from "@/datas/equip/base/player";
import { Equip, has_equip_type } from "@/models/equip/basic";

export const VALID_TYPES: Set<EquipType> = new Set([
    'SEAPLANE',
    'SEAPLANE_BOMBER',
]);

/**
 * 弾着観測射撃・空母カットイン処理において有効な水上機であるか判定して返す
 * @param slot 
 * @returns 
 */
export function is_valid_air_superiority_strike_seaplane(
    equip: Equip
): boolean {
    return has_equip_type(VALID_TYPES, equip.type_id);
}