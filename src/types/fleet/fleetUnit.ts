import { PlayerFleetUnit } from "@/models/fleet/FleetUnit";
import { Brand } from "../brands";
import { AtLeast, has_at_least } from "..";

export type FirstUnit = Brand<PlayerFleetUnit, 'FirstUnit'>
export type SecondUnit = Brand<PlayerFleetUnit, 'SecondUnit'>
export type ThirdUnit = Brand<PlayerFleetUnit, 'ThirdUnit'>
export type FourthUnit = Brand<PlayerFleetUnit, 'FourthUnit'>
export type FifthUnit = Brand<PlayerFleetUnit, 'FifthUnit'>
export type SixthUnit = Brand<PlayerFleetUnit, 'SixthUnit'>
export type SeventhUnit = Brand<PlayerFleetUnit, 'SeventhUnit'>

/**
 * 1番艦ユニットを抽出する
 */
export function extract_first_unit(
    units: AtLeast<PlayerFleetUnit, 1>,
): FirstUnit {
    return units[0] as FirstUnit;
}

/**
 * 2番艦ユニットを抽出する
 */
export function extract_second_unit(
    units: AtLeast<PlayerFleetUnit, 2>,
): SecondUnit {
    return units[1] as SecondUnit;
}

/**
 * 3番艦ユニットを抽出する
 */
export function extract_third_unit(
    units: AtLeast<PlayerFleetUnit, 3>,
): ThirdUnit {
    return units[2] as ThirdUnit;
}

/**
 * 4番艦ユニットを抽出する
 */
export function extract_fourth_unit(
    units: AtLeast<PlayerFleetUnit, 4>,
): FourthUnit {
    return units[3] as FourthUnit;
}

/**
 * 5番艦ユニットを抽出する
 */
export function extract_fifth_unit(
    units: AtLeast<PlayerFleetUnit, 5>,
): FifthUnit {
    return units[4] as FifthUnit;
}

/**
 * 6番艦ユニットを抽出する
 */
export function extract_sixth_unit(
    units: AtLeast<PlayerFleetUnit, 6>,
): SixthUnit {
    return units[5] as SixthUnit;
}

/**
 * 7番艦ユニットを抽出する
 */
export function extract_seventh_unit(
    units: AtLeast<PlayerFleetUnit, 7>,
): SeventhUnit {
    return units[6] as SeventhUnit;
}