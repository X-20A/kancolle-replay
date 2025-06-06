/** ブランド型 */
export type Brand<T, B> = T & { __brand: B };

/** ブランド化するための共通関数 */
export function brand<T, B extends string>(value: T): Brand<T, B> {
    return value as Brand<T, B>;
}