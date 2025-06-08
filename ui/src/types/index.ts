import { Range } from "./equip/player";

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

export const STATUS_COMPONENT_KEYS = [
    'hp',
    'fire_power',
    'armor',
    'torpedo_power',
    'evasion',
    'anti_air',
    'asw',
    'los',
    'luck',
    'range',
    'shell_accuracy',
    'torpedo_accuracy',
    'night_battle_accuracy',
    'aerial_bomb_power',
    'aerial_torpedo_power',
] as const;

export type StatusComponentKey = typeof STATUS_COMPONENT_KEYS[number];

export type StatusComponent = {
    [K in StatusComponentKey]: number; // number以外の型は無いという前提
}

export type TransportPowerModel = {
    /** 従来型 通常海域他 */
    model_A: number,
    /** 2025早春E2 モデル */
    model_B: number,
    /** 2025早春E5 モデル */
    model_C: number,
};