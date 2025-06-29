import { Equip, PlayerEquip } from "@/models/equip/basic";
import { brandEquipId } from "@/types/brands/equip";
import { brandShipId, brandShipLv, ShipId } from "@/types/brands/ship";
import { SpecialItemId } from "@/types/ship/ship";
import { pipe } from "fp-ts/lib/function"; // fp-tsのpipeは関数以外も渡せる
import { curry_derive_equip, curry_derive_ship } from "./curry";
import { PLAYER_EQUIP_DATAS } from "@/datas/equip/base/player";
import { EquippedShip } from "@/models/ship/equipped";
import { PLAYER_SHIP_DATAS } from "@/datas/ship/player";
import { derive_player_naked_ship } from "@/models/ship/naked/player";
import { derive_abyssal_naked_ship } from "@/models/ship/naked/abyssal";
import { NakedShip } from "@/models/ship/naked/base";

/**
 * 装備idから装備オブジェクトを生成して返す
 * 改修値: 0 固定
 */
const make_equip_from_id = curry_derive_equip(
    0,
);

// ブランド型にした意味が失われるけど、まあテスト用ということで

/**
 * 装備idから装備オブジェクトを生成して返す
 * @param id 
 * @returns 
 */
const make_player_equip_from_id =
    (id: number): PlayerEquip => pipe(id, brandEquipId, make_equip_from_id) as PlayerEquip;

/**
 * 装備名から装備オブジェクトを生成して返す    
 * ! 存在しない名前を渡しても必ずしも直ちにエラーが出ないことがある    
 * ! おそらくvitestの仕様で、テストコード内で生成するのでなければキャッシュ扱いになる為
 */
export const make_player_equip_from_name = (name: string): PlayerEquip => {
    const data = Object.entries(PLAYER_EQUIP_DATAS)
        .find(([, data]) => data.nameJP === name);
    if (!data) throw new Error(`指定された名前の装備は存在しません: ${name}`);

    const id = Number(data[0]);

    return make_player_equip_from_id(id);
}

/**
 * 艦IDと装備配列から艦オブジェクトを生成して返す    
 * ユニークid: 1, 艦Lv: 99 固定
 */
export const make_ship_from_id_equips = curry_derive_ship(
    brandShipLv(99),
    SpecialItemId.None,
);

export const short_make_ship_from_id_equips = (id: number, equips: Equip[]) =>
    pipe(
        id,
        brandShipId,
        ship_id => make_ship_from_id_equips(ship_id, equips),
    );

const pre_make_player_ship_from_id = (id: number) =>
    (equips: Equip[]) => short_make_ship_from_id_equips(id, equips);

export function calc_ship_id_from_name(
    name: string,
): ShipId {
    const data = Object.entries(PLAYER_SHIP_DATAS)
        .find(([, data]) => data.nameJP === name);
    if (!data) throw new Error(`指定された名前の装備は存在しません: ${name}`);

    return brandShipId(Number(data[0]));
}

export const pre_make_player_ship_from_name = (
    name: string,
): (equips: Equip[]) => EquippedShip => {
    const id = calc_ship_id_from_name(name);

    return pre_make_player_ship_from_id(id);
}

export function derive_naked_ship (
    id: number,
): NakedShip {
    const ship_id = brandShipId(id);
    return id < 1500
        ? derive_player_naked_ship(brandShipLv(99), ship_id)
        : derive_abyssal_naked_ship(ship_id)
}

export function derive_naked_ship_from_name (
    name: string,
): NakedShip {
    const id = calc_ship_id_from_name(name);

    return derive_naked_ship(id);
}