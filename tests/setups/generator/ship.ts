import { Equip, PlayerEquip } from "@/models/equip/basic";
import { brandShipLv, ShipBaseId } from "@/types/brands/ship";
import { SpecialItemId } from "@/types/ship/ship";
import { PlayerEquippedShip } from "@/models/ship/equipped";
import { PLAYER_SHIP_DATAS } from "@/datas/ship/player";
import { derive_player_naked_ship } from "@/models/ship/naked/player";
import { derive_abyssal_naked_ship } from "@/models/ship/naked/abyssal";
import { NakedShip, PlayerNakedShip } from "@/models/ship/naked";
import { PlayerShipNameJP } from "@/types/ship/playerNameJP";
import { AbyssalShipId } from "@/types/ship/abyssalId";
import { __player_equipped_ship__, derive_player_equipped_ship } from "@/models/ship/equipped/player";
import { PlayerShipId } from "@/types/ship/playerShipId";

const {
    derive_player_equipped_ship_core,
} = __player_equipped_ship__;

export function derive_PES(
    naked_ship: PlayerNakedShip,
    normal_slot_equips: PlayerEquip[],
    ex_slot_equip?: PlayerEquip,
): PlayerEquippedShip {
    return derive_player_equipped_ship_core(
        naked_ship,
        normal_slot_equips,
        ex_slot_equip ?? 'None',
        SpecialItemId.None,
        {},
    );
}

/**
 * 艦名から艦娘IDを返す
 * @param name 
 * @returns 
 */
export function find_ship_id_from_name(
    name: PlayerShipNameJP,
): PlayerShipId {
    const data = Object.entries(PLAYER_SHIP_DATAS)
        .find(([, data]) => data.name_jp === name);
    if (!data) throw new Error(`指定された名前の装備は存在しません: ${name}`);

    return Number(data[0]) as PlayerShipId;
}

/**
 * 艦IDと装備配列、ex_equipから艦オブジェクトを生成して返す    
 * ユニークid: 1, 艦Lv: 99 固定
 * @param id 艦ID
 * @param equips 装備配列
 * @param ex_equip ex装備（任意）
 */
const make_ship_from_id_equips = (
    id: PlayerShipId,
    equips: Equip[],
    ex_equip: Equip | 'None',
): PlayerEquippedShip => {
    return derive_player_equipped_ship(
        brandShipLv(99),
        SpecialItemId.None,
        id,
        {},
        equips,
        ex_equip,
    );
}

/**
 * 艦名から装備配列・ex_equipを受け取る関数を返す
 * @param name 艦名
 */
export const pre_make_player_ship_from_name = (
    name: PlayerShipNameJP,
): (equips: Equip[], ex_equip?: Equip | null) => PlayerEquippedShip => {
    const id = find_ship_id_from_name(name);
    return (equips: Equip[], ex_equip: Equip | null = null) => {
        return make_ship_from_id_equips(id, equips, ex_equip ?? 'None');
    };
};

const derive_naked_ship = (
    ship_id: ShipBaseId,
): NakedShip => {
    return ship_id < 1500
        ? derive_player_naked_ship(brandShipLv(99), ship_id as PlayerShipId)
        : derive_abyssal_naked_ship(ship_id as AbyssalShipId)
}

/**
 * 艦名からすっぴん艦娘を返す
 * @param name 
 * @returns 
 */
export function derive_naked_ship_from_name(
    name: PlayerShipNameJP,
): PlayerNakedShip {
    const id = find_ship_id_from_name(name);
    return derive_player_naked_ship(brandShipLv(99), id);
}