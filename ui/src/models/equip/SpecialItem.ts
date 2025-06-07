import { SpecialItemDatas } from "@/datas/equip/SpecialItem";
import { StatusComponent, StatusComponentKey } from "@/types";
import { SpecialItemId } from "@/types/ship/ship";

export function deriveSpecialItemAddition(
    special_item_datas: SpecialItemDatas,
    status_keys: StatusComponentKey,
    special_item_id: SpecialItemId,
): StatusComponent {
    const bonus: Partial<StatusComponent> = special_item_datas[special_item_id] ?? {};

    return status_keys.reduce((acc, key) => ({
        ...acc,
        [key]: bonus[key] ?? 0,
    }), {} as StatusComponent);
}