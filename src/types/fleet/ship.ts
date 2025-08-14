import { PlayerEquippedShip } from "@/models/ship/equipped"
import { Brand } from "../brands"
import { FifthUnit, FirstUnit, FourthUnit, SecondUnit, SeventhUnit, SixthUnit, ThirdUnit } from "./fleetUnit"

export type FirstShip = Brand<PlayerEquippedShip, 'FirstShip'>
export type SecondShip = Brand<PlayerEquippedShip, 'SecondShip'>
export type ThirdShip = Brand<PlayerEquippedShip, 'ThirdShip'>
export type FourthShip = Brand<PlayerEquippedShip, 'FourthShip'>
export type FifthShip = Brand<PlayerEquippedShip, 'FifthShip'>
export type SixthShip = Brand<PlayerEquippedShip, 'SixthShip'>
export type SeventhShip = Brand<PlayerEquippedShip, 'SeventhShip'>

/**
 * 1番艦ユニットから艦を取り出す
 * @param unit 
 * @returns 
 */
export function extract_first_ship(unit: FirstUnit): FirstShip {
    return unit.ship as FirstShip;
}

/**
 * 2番艦ユニットから艦を取り出す
 * @param unit 
 * @returns 
 */
export function extract_second_ship(unit: SecondUnit): SecondShip {
    return unit.ship as SecondShip;
}

/**
 * 3番艦ユニットから艦を取り出す
 * @param unit 
 * @returns 
 */
export function extract_third_ship(unit: ThirdUnit): ThirdShip {
    return unit.ship as ThirdShip;
}

/**
 * 4番艦ユニットから艦を取り出す
 * @param unit 
 * @returns 
 */
export function extract_fourth_ship(unit: FourthUnit): FourthShip {
    return unit.ship as FourthShip;
}

/**
 * 5番艦ユニットから艦を取り出す
 * @param unit 
 * @returns 
 */
export function extract_fifth_ship(unit: FifthUnit): FifthShip {
    return unit.ship as FifthShip;
}

/**
 * 6番艦ユニットから艦を取り出す
 * @param unit 
 * @returns 
 */
export function extract_sixth_ship(unit: SixthUnit): SixthShip {
    return unit.ship as SixthShip;
}

/**
 * 7番艦ユニットから艦を取り出す
 * @param unit 
 * @returns 
 */
export function extract_seventh_ship(unit: SeventhUnit): SeventhShip {
    return unit.ship as SeventhShip;
}