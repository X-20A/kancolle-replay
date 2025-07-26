import { brandEquipId } from "@/types/brands/equip";
import { curry_derive_equip } from "../curry";
import { pipe } from "fp-ts/lib/function";
import { PlayerEquip } from "@/models/equip/basic";
import { PlayerEquipNameJP } from "@/types/equip/playerNameJP";
import { PLAYER_EQUIP_DATAS } from "@/datas/equip/base/player";

/**
 * 装備idから装備オブジェクトを生成して返す
 * 改修値: 0 固定
 */
const make_equip_from_id = curry_derive_equip(
    0,
);

/**
 * 装備idから装備オブジェクトを生成して返す
 * @param id 
 * @returns 
 */
const make_player_equip_from_id =
    (id: number): PlayerEquip => pipe(id, brandEquipId, make_equip_from_id) as PlayerEquip;

/**
 * 装備名から装備オブジェクトを生成して返す    

 */
export const make_player_equip_from_name = (name: PlayerEquipNameJP): PlayerEquip => {
    const data = Object.entries(PLAYER_EQUIP_DATAS)
        .find(([, data]) => data.name_jp === name);
    if (!data) throw new Error(`指定された名前の装備は存在しません: ${name}`);

    const id = Number(data[0]);

    return make_player_equip_from_id(id);
}