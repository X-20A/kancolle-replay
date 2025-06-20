import { Equip, PlayerEquip } from "@/models/equip/basic";

export type ShipStateBase = {
    /** 轟沈状態であるか */
    readonly is_sunk: boolean,
}

export type PlayerShipState = ShipStateBase & {
    /** 残燃料割合 0-1 */
    readonly fuel_remain_ratio: number,
    /** 残弾薬割合 0-1 */
    readonly ammo_remain_ratio: number,
    /** 洋上補給 燃料追徴割合 0-1 */
    readonly maritime_resupply_fuel_ratio: number,
    /** 洋上補給 弾薬追徴割合 0-1 */
    readonly maritime_resupply_ammo_ratio: number,

    /** 轟沈ストッパーが有効であるか */
    readonly enable_sink_safety: boolean,
}

export function derive_player_ship_state(): PlayerShipState {
    return {
        /** 残燃料割合 0-1 */
        fuel_remain_ratio: 1,
        /** 残弾薬割合 0-1 */
        ammo_remain_ratio: 1,
        /** 洋上補給 燃料追徴割合 0-1 */
        maritime_resupply_fuel_ratio: 0,
        /** 洋上補給 弾薬追徴割合 0-1 */
        maritime_resupply_ammo_ratio: 0,

        is_sunk: false,
        /** 轟沈ストッパーが有効であるか */
        enable_sink_safety: true,
    }
}

export function derive_abyssal_ship_state (): ShipStateBase {
    return {
        is_sunk: false,
    }
}