import { brand, Brand } from ".";

/**
 * 艦ID
 */
export type ShipId = Brand<number, 'ShipId'>
/**
 * 未改造時 艦ID
 */
export type ShipBaseId = Brand<number, 'ShipBaseId'>
/**
 * 艦を一意に識別するためのID
 */
export type ShipUniqueId = Brand<string, 'ShipUniqueId'>
/**
 * 艦名(EN)
 */
export type ShipNameEN = Brand<string, 'ShipNameEN'>
/**
 * 艦Lv
 */
export type ShipLv = Brand<number, 'ShipLv'>



export const brandShipId =
    (value: number) => brand<number, 'ShipId'>(value);

export const brandShipBaseId =
    (value: number): ShipBaseId => brand<number, 'ShipBaseId'>(value);

export const brandUniqueId =
    (value: string): ShipUniqueId => brand<string, 'ShipUniqueId'>(value);

export const brandShipNameEN =
    (value: string): ShipNameEN => brand<string, 'ShipNameEN'>(value);

export const brandShipLv =
    (value: number): ShipLv => brand<number, 'ShipLv'>(value);