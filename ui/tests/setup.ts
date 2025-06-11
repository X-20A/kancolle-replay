import { deriveEquip, Equip } from "@/models/equip/Equip";
import { derivePlayerShip } from "@/models/ship/Ship";
import { brandEquipId } from "@/types/brands/equip";
import { brandShipId, brandShipLv, brandUniqueId } from "@/types/brands/ship";
import { SpecialItemId } from "@/types/ship/ship";
import { curry, curryN } from "ramda";
import { pipe } from "fp-ts/lib/function"; // fp-tsのpipeは関数以外も渡せる

const curryDeriveEquip = curry(deriveEquip)

/**
 * 装備idから装備オブジェクトを生成して返す
 * 改修値: 0 固定
 */
const make_equip_from_id = curryDeriveEquip(
    0,
);

// ブランド型にした意味が失われるけど、まあテスト用ということで

/**
 * 装備idから装備オブジェクトを生成して返す
 * @param id 
 * @returns 
 */
export const short_make_equip_from_id = (id: number) => pipe(id, brandEquipId, make_equip_from_id)

const curryDeriveShip = curryN(5, derivePlayerShip);

/**
 * 艦IDと装備配列から艦オブジェクトを生成して返す    
 * ユニークid: 1, 艦Lv: 99 固定
 */
const make_ship_from_id_equips = curryDeriveShip(
    brandUniqueId(1),
    brandShipLv(99),
    SpecialItemId.None,
);

export const short_make_ship_from_id_equips = (id: number, equips: Equip[]) =>
    pipe(
        id,
        brandShipId,
        ship_id => make_ship_from_id_equips(ship_id, equips),
    );