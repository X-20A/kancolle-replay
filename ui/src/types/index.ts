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
    accuracy: number,
}

