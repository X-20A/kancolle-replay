import { brand, Brand } from ".";

/**
 * 艦ID
 */
export type ShipId = Brand<number, 'ShipId'>
/**
 * 艦を一意に識別するためのID
 */
export type ShipUniqueId = Brand<number, 'ShipUniqueId'>
/**
 * 艦名(EN)
 */
export type ShipNameEN = Brand<string, 'ShipNameEN'>
/**
 * 艦名(日)
 */
export type ShipNameJP = Brand<string, 'ShipNameJP'>
/**
 * 艦Lv
 */
export type ShipLv = Brand<number, 'ShipLv'>



export const brandShipId =
    (value: number) => brand<number, 'ShipId'>(value);

export const brandUniqueId =
    (value: number): ShipUniqueId => brand<number, 'ShipUniqueId'>(value);

export const brandShipNameEN =
    (value: string): ShipNameEN => brand<string, 'ShipNameEN'>(value);

export const brandShipNameJP =
    (value: string): ShipNameJP => brand<string, 'ShipNameJP'>(value);

export const brandShipLv =
    (value: number): ShipLv => brand<number, 'ShipLv'>(value);