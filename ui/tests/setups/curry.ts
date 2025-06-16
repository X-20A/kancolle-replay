import { derive_equip } from "@/models/equip/basic";
import { derive_equipped_ship } from "@/models/ship/equipped";
import { curryN } from "ramda";

// ! curryはオプショナル系のパラメータも渡さないと関数呼び出しが成立しない
// ! 基本的にcurryNを使うこと

export const curry_derive_equip = curryN(2, derive_equip);

export const curry_derive_ship = curryN(5, derive_equipped_ship);