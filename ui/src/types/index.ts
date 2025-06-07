/**
 * 任意の型Tを再帰的にreadonlyにするユーティリティ型
 */
export type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends object
    ? T[P] extends Function
    ? T[P]
    : DeepReadonly<T[P]>
    : T[P];
};

export type StatusComponent = {
    hp: number,
    fire_power: number,
    armor: number,
    torpedo_power: number,
    evasion: number,
    anti_air: number,
    asw: number,
    los: number,
    luck: number,
    shell_accuracy: number,
    torpedo_accuracy: number,
    night_battle_accuracy: number,
}

export type TransportPowerModel = {
    /** 従来型 通常海域他 */
    model_A: number,
    /** 2025早春E2 モデル */
    model_B: number,
    /** 2025早春E5 モデル */
    model_C: number,
};