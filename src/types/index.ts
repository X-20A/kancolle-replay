


export type TStatusComponent = {
    readonly hp: number,
    readonly shell_power: number,
    readonly shell_accuracy: number,
    readonly shell_evasion: number,
    readonly torpedo_power: number,
    readonly torpedo_accuracy: number,
    readonly torpedo_evasion: number,
    readonly night_battle_power: number,
    readonly night_battle_accuracy: number,
    readonly asw_power: number,
    readonly asw_accuracy: number,
    readonly armor: number,
    readonly evasion: number,
    readonly anti_air: number,
    readonly self_anti_air: number,
    readonly fleet_anti_air: number,
    readonly air_superiority: number,
    readonly los: number,
    readonly luck: number,
    readonly range: number,
    readonly aerial_bomb_power: number,
    readonly aerial_torpedo_power: number,
    readonly smokescreen_rate_flat: number,
};
export const INITIAL_STATUS_COMPONENT: TStatusComponent = {
    hp: 0,
    shell_power: 0,
    shell_accuracy: 0,
    shell_evasion: 0,
    torpedo_power: 0,
    torpedo_accuracy: 0,
    torpedo_evasion: 0,
    night_battle_power: 0,
    night_battle_accuracy: 0,
    asw_power: 0,
    asw_accuracy: 0,
    armor: 0,
    evasion: 0,
    anti_air: 0,
    self_anti_air: 0,
    fleet_anti_air: 0,
    air_superiority: 0,
    los: 0,
    luck: 0,
    range: 0,
    aerial_bomb_power: 0,
    aerial_torpedo_power: 0,
    smokescreen_rate_flat: 0,
} as const;

export type TransportPowerModel = {
    /** 従来型 通常海域他 */
    model_A: number,
    /** 2025早春E2 モデル */
    model_B: number,
    /** 2025早春E5 モデル */
    model_C: number,
};

const SINGLE_FLEET_FORMATION = {
    LineAhead: 1,
    DoubleLine: 2,
    Diamond: 3,
    Echelon: 4,
    LineAbreast: 5,
    Vanguard: 6,
} as const;
export type SingleFleetFormationType = keyof typeof SINGLE_FLEET_FORMATION

const COMBINED_FLEET_FORMATION = {
    CruisingFormation_1: 1,
    CruisingFormation_2: 2,
    CruisingFormation_3: 3,
    CruisingFormation_4: 4,
} as const;
export type CombinedFleetFormationType = keyof typeof COMBINED_FLEET_FORMATION

export type FormationType = SingleFleetFormationType | CombinedFleetFormationType

export function is_single_fleet_formation(
    formation: FormationType,
): formation is SingleFleetFormationType {
    return formation in SINGLE_FLEET_FORMATION;
}

export function is_combined_fleet_formation(
    formation: FormationType,
): formation is CombinedFleetFormationType {
    return !is_single_fleet_formation(formation);
}

export type AtLeast<T, N extends number> =
    N extends 1 ? [T, ...T[]] :
    N extends 2 ? [T, T, ...T[]] :
    N extends 3 ? [T, T, T, ...T[]] :
    N extends 4 ? [T, T, T, T, ...T[]] :
    N extends 5 ? [T, T, T, T, T, ...T[]] :
    N extends 6 ? [T, T, T, T, T, T, ...T[]] :
    N extends 7 ? [T, T, T, T, T, T, T, ...T[]] :
    never;

/**
 * 配列が指定数以上の要素を持つか判定して返す(型ガード)    
 * インデックスアクセスを型安全にするための儀式
 */
export function has_at_least<T, N extends number>(
    arr: readonly T[],
    count: N,
): arr is AtLeast<T, N> {
    return arr.length >= count;
}