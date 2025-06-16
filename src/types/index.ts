
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

export type TStatusComponent = {
    readonly hp: number;
    readonly fire_power: number;
    readonly armor: number;
    readonly torpedo_power: number;
    readonly evasion: number;
    readonly anti_air: number;
    readonly asw: number;
    readonly los: number;
    readonly luck: number;
    readonly range: number;
    readonly shell_accuracy: number;
    readonly torpedo_accuracy: number;
    readonly night_battle_accuracy: number;
    readonly aerial_bomb_power: number;
    readonly aerial_torpedo_power: number;
};

export type TransportPowerModel = {
    /** 従来型 通常海域他 */
    model_A: number,
    /** 2025早春E2 モデル */
    model_B: number,
    /** 2025早春E5 モデル */
    model_C: number,
};