import { derive_equip, Equip } from "@/models/equip/basic";
import { derive_player_equipped_ship, PlayerEquippedShipOptions } from "@/models/ship/equipped/player";
import { ShipLv } from "@/types/brands/ship";
import { PlayerShipId } from "@/types/ship/playerShipId";
import { SpecialItemId } from "@/types/ship/ship";
import { curry, curryN } from "ramda";

// ! curryはオプショナル系のパラメータも渡さないと関数呼び出しが成立しない
// ! 基本的にcurryNを使うこと

/**
 * 装備IDと改修値から装備オブジェクトを生成するcurry関数
 * @see derive_equip
 */
export const curry_derive_equip = curryN(2, derive_equip);

/**
 * 艦Lv, ex_item, ship_id, equips, ex_equip から艦オブジェクトを生成するcurry関数
 * ex_equipは任意で渡すことができる
 * @see derive_equipped_ship
 */
export const curry_derive_player_equipped_ship = curry(
    (
        lv: ShipLv,
        special_item_id: SpecialItemId,
        ship_id: PlayerShipId,
        options: PlayerEquippedShipOptions,
        normal_slot_equips: Equip[],
        ex_slot_equip: Equip | "None"
    ) =>
        derive_player_equipped_ship(
            lv,
            special_item_id,
            ship_id,
            options,
            normal_slot_equips,
            ex_slot_equip
        )
);