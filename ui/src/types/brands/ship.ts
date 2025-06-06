import { brand, Brand } from ".";

/**
 * 艦ID
 */
export type ShipId = Brand<number, 'ShipId'>
/**
 * 艦を一意に識別するためのID
 */
export type UniqueId = Brand<number, 'UniqueId'>

export type ShipLv = Brand<number, 'ShipLv'>

export const brandShipId =
    (value: number) => brand<number, 'ShipId'>(value);

export const brandUniqueId =
    (value: number): UniqueId => brand<number, 'UniqueId'>(value);

export const brandShipLv =
    (value: number): ShipLv => brand<number, 'ShipLv'>(value);