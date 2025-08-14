import { PlayerFleetUnit } from '@/models/fleet/FleetUnit';
import { pipe } from 'fp-ts/function';
import { AtLeast } from '..';
import { extract_fifth_ship, extract_first_ship, extract_fourth_ship, extract_second_ship, extract_seventh_ship, extract_sixth_ship, extract_third_ship, FifthShip, FirstShip, FourthShip, SecondShip, SeventhShip, SixthShip, ThirdShip } from './ship';
import { extract_fifth_unit, extract_first_unit, extract_fourth_unit, extract_second_unit, extract_seventh_unit, extract_sixth_unit, extract_third_unit } from './fleetUnit';

/**
 * 1番艦を直接取り出す
 */
export function extract_first_ship_from_units(
    units: AtLeast<PlayerFleetUnit, 1>,
): FirstShip {
    return pipe(
        units,
        extract_first_unit,
        extract_first_ship,
    );
}

/**
 * 2番艦を直接取り出す
 */
export function extract_second_ship_from_units(
    units: AtLeast<PlayerFleetUnit, 2>,
): SecondShip {
    return pipe(
        units,
        extract_second_unit,
        extract_second_ship,
    );
}

/**
 * 3番艦を直接取り出す
 */
export function extract_third_ship_from_units(
    units: AtLeast<PlayerFleetUnit, 3>,
): ThirdShip {
    return pipe(
        units,
        extract_third_unit,
        extract_third_ship,
    );
}

/**
 * 4番艦を直接取り出す
 */
export function extract_fourth_ship_from_units(
    units: AtLeast<PlayerFleetUnit, 4>,
): FourthShip {
    return pipe(
        units,
        extract_fourth_unit,
        extract_fourth_ship,
    );
}

/**
 * 5番艦を直接取り出す
 */
export function extract_fifth_ship_from_units(
    units: AtLeast<PlayerFleetUnit, 5>,
): FifthShip {
    return pipe(
        units,
        extract_fifth_unit,
        extract_fifth_ship,
    );
}

/**
 * 6番艦を直接取り出す
 */
export function extract_sixth_ship_from_units(
    units: AtLeast<PlayerFleetUnit, 6>,
): SixthShip {
    return pipe(
        units,
        extract_sixth_unit,
        extract_sixth_ship,
    );
}

/**
 * 7番艦を直接取り出す
 */
export function extract_seventh_ship_from_units(
    units: AtLeast<PlayerFleetUnit, 7>,
): SeventhShip {
    return pipe(
        units,
        extract_seventh_unit,
        extract_seventh_ship,
    );
}