import { derive_equip } from "@/models/equip/basic";
import { derive_equipped_ship } from "@/models/ship/equipped";
import { curryN } from "ramda";

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
export const curry_derive_ship = curryN(6, derive_equipped_ship);