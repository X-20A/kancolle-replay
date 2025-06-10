import { EQUIP_DATA_SET, SHIP_DATA_SET } from "@/datas";
import { deriveEquip } from "@/models/equip/Equip";
import { derivePlayerShip } from "@/models/ship/Ship";
import { brandShipLv, brandUniqueId } from "@/types/brands/ship";
import { SpecialItemId } from "@/types/ship/ship";
import { curry, curryN } from "ramda";

const curryDeriveEquip = curry(deriveEquip)

/**
 * 装備idから装備オブジェクトを生成して返す
 * 改修値: 0 固定
 */
export const make_equip_from_id = curryDeriveEquip(
    EQUIP_DATA_SET,
    0,
);

/**
 * 改修値と装備idから装備オブジェクトを生成して返す
 */
export const make_equip_from_lv_id = curryDeriveEquip(
    EQUIP_DATA_SET,
);


const curryDeriveShip = curryN(6, derivePlayerShip);

/**
 * 艦IDと装備配列から艦オブジェクトを生成して返す    
 * ユニークid: 1, 艦Lv: 99 固定
 */
export const make_ship_from_id_equips = curryDeriveShip(
    SHIP_DATA_SET,
    brandUniqueId(1),
    brandShipLv(99),
    SpecialItemId.None,
);