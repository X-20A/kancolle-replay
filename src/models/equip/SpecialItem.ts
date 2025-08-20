import { SPECIAL_ITEM_BONUS_DATAS } from "@/datas/equip/SpecialItem";
import { INITIAL_STATUS_COMPONENT, TStatusComponent } from "@/types";
import { SpecialItemId } from "@/types/ship/ship";

/**
 * 海色リボン、白たすき ボーナス加算値を返す
 * @param special_item_id - 対象の特殊アイテムID
 * @returns 特殊アイテムによる加算ステータス（未定義の項目は 0）
 */
export function deriveSpecialItemAddition(
    special_item_id: SpecialItemId
): TStatusComponent {
    return {
        ...INITIAL_STATUS_COMPONENT,
        ...SPECIAL_ITEM_BONUS_DATAS[special_item_id],
    };
}