export type ShipStateBase = {
    hp_remain: number,
}

export type PlayerShipState =  ShipStateBase & {
    /** 残燃料割合 0-1 */
    readonly fuel_remain_ratio: number,
    /** 残弾薬割合 0-1 */
    readonly ammo_remain_ratio: number,
    /** 洋上補給 燃料追徴割合 0-1 */
    readonly maritime_resupply_fuel_ratio: number,
    /** 洋上補給 弾薬追徴割合 0-1 */
    readonly maritime_resupply_ammo_ratio: number,
    /** 疲労度 */
    readonly morale: number,

    /** 轟沈ストッパーが有効であるか */
    readonly enable_sink_safety: boolean,
    /** 退避艦であるか */
    readonly is_retreated: boolean,
}

export function derive_player_ship_state(
    hp_remain: number,
): PlayerShipState {
    return {
        hp_remain,
        fuel_remain_ratio: 1,
        ammo_remain_ratio: 1,
        maritime_resupply_fuel_ratio: 0,
        maritime_resupply_ammo_ratio: 0,
        morale: 49,
        enable_sink_safety: true,
        is_retreated: false,
    }
}