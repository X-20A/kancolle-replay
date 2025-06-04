type Brand<T, B> = T & { __brand: B };

/**
 * 艦ID
 */
export type ShipId = Brand<number, 'ShipId'>
/**
 * 艦を一意に識別するためのID
 */
export type UniqueId = Brand<number, 'UniqueId'>

/** ブランド化するための共通関数 */
function brand<T, B extends string>(value: T): Brand<T, B> {
    return value as Brand<T, B>;
}

export const brandShipId =
    (value: number) => brand<number, 'ShipId'>(value);

export const brandUniqueId =
    (value: number): UniqueId => brand<number, 'UniqueId'>(value);