import { SpecialItemDatas } from "@/datas/equip/SpecialItem";
import { TStatusComponent } from "@/types";
import { SpecialItemId } from "@/types/ship/ship";

/**
 * 海色リボン、白たすき ボーナス加算値を返す
 * @param special_item_id - 対象の特殊アイテムID
 * @returns 特殊アイテムによる加算ステータス（未定義の項目は 0）
 */
export function deriveSpecialItemAddition(
    special_item_datas: SpecialItemDatas,
    special_item_id: SpecialItemId
): TStatusComponent {
    return {
        hp: 0,
        fire_power: 0,
        armor: 0,
        torpedo_power: 0,
        evasion: 0,
        anti_air: 0,
        asw: 0,
        los: 0,
        luck: 0,
        range: 0,
        shell_accuracy: 0,
        torpedo_accuracy: 0,
        night_battle_accuracy: 0,
        aerial_bomb_power: 0,
        aerial_torpedo_power: 0,
        ...special_item_datas[special_item_id],
    };
}