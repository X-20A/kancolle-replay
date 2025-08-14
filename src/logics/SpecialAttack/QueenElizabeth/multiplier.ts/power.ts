import { PlayerFleetUnit } from "@/models/fleet/FleetUnit";
import { is_flagship_unit } from "@/models/fleet/predicates";
import { QueenElizabethSpecialMultiplierPreInfo } from "./preInfo";
import { SpecialAttackPowerMod } from "../..";
import { extract_first_ship, FirstShip } from "@/types/fleet/ship";
import { FirstUnit } from "@/types/fleet/fleetUnit";

const FLAGSHIP_TYPE = {
    WARSPITE: 1,
    VALIANT: 2,
} as const;
type FlagshipType = keyof typeof FLAGSHIP_TYPE

type BaseValue = {
    first: number,
    second: number,
}

type BaseDatas = Record<FlagshipType, BaseValue>

const BASE_DATAS: BaseDatas = {
    WARSPITE: {
        first: 1.24,
        second: 1.24,
    },
    VALIANT: {
        first: 1.2,
        second: 1.24,
    },
} as const;

const SURFACE_RADAR_COEFFIENT = 1.15;

const AP_SHELL_COEFFIENT = 1.35;

const calc_flagship_type = (
    first_ship: FirstShip,
): FlagshipType => {
    return first_ship.name_jp === 'Warspite改'
        ? 'WARSPITE'
        : 'VALIANT';
}

const calc_base_value = (
    attacker_unit: PlayerFleetUnit,
    first_unit: FirstUnit,
): number => {
    const first_ship = extract_first_ship(first_unit);

    const flagship_type = calc_flagship_type(first_ship);
    const data = BASE_DATAS[flagship_type];

    return is_flagship_unit(attacker_unit)
        ? data.first
        : data.second;
}

const calc_surface_radar_mod = (
    has_surface_radar: boolean,
): number => {
    return has_surface_radar
        ? SURFACE_RADAR_COEFFIENT
        : 1;
}

const calc_AP_shell_mod = (
    has_AP_shell: boolean,
): number => {
    return has_AP_shell
        ? AP_SHELL_COEFFIENT
        : 1;
}

export function calc_QueenElizabeth_special_power_mod(
    attacker_unit: PlayerFleetUnit,
    first_unit: FirstUnit,
    pre_info: QueenElizabethSpecialMultiplierPreInfo,
): SpecialAttackPowerMod {
    const {
        has_surface_radar,
        has_AP_shell,
    } = pre_info;

    const base = calc_base_value(attacker_unit, first_unit);

    const surface_radar_mod =
        calc_surface_radar_mod(has_surface_radar);

    const AP_shell_mod = calc_AP_shell_mod(has_AP_shell);

    return base
        * surface_radar_mod
        * AP_shell_mod as SpecialAttackPowerMod;
}