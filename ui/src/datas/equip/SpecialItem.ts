import { TStatusComponent } from "@/types"
import { SpecialItemId } from "@/types/ship/ship"

export type SpecialItemDatas = Record<SpecialItemId, Partial<TStatusComponent>>

export const SPECIAL_ITEM_BONUS_DATAS: SpecialItemDatas = {
    [SpecialItemId.None]: {},
    [SpecialItemId.Ribbon]: {
        torpedo_power: 1,
        armor: 1,
    },
    [SpecialItemId.Sash]: {
        fire_power: 2,
        evasion: 2,
    }
}