import { PlayerFleetUnit } from "@/models/fleet/FleetUnit";
import { is_flagship_unit } from "@/models/fleet/predicates";
import { has_ship_name } from "@/models/ship/equipped";
import { PlayerShipNameJP } from "@/types/ship/playerNameJP";
import { RichelieuSpecialMultiplierPreInfo } from "./preInfo";
import { SpecialAttackPowerMod } from "../..";
import { FirstShip } from "@/types/fleet/ship";

const FLAGSHIP_TYPE = {
    RICHELIEU: 1,
    JEAN_BART: 2,
} as const;
type FlagshipType = keyof typeof FLAGSHIP_TYPE

type BaseValue = {
    first: number,
    second: number,
}

type BaseDatas = Record<FlagshipType, BaseValue>

const BASE_DATAS: BaseDatas = {
    RICHELIEU: {
        first: 1.3,
        second: 1.24,
    },
    JEAN_BART: {
        first: 1.24,
        second: 1.24,
    },
} as const;

const SURFACE_RADAR_COEFFIENT = 1.15;

const AP_SHELL_COEFFIENT = 1.35;

const RICHELIEU_KAI_NAMES: Set<PlayerShipNameJP> = new Set([
    'Richelieu改', 'Richelieu Deux',
]);

const calc_flagship_type = (
    first_ship: FirstShip,
): FlagshipType => {
    return has_ship_name(RICHELIEU_KAI_NAMES, first_ship.name_jp)
        ? 'RICHELIEU'
        : 'JEAN_BART';
}

const calc_base_value = (
    attacker_unit: PlayerFleetUnit,
    first_ship: FirstShip,
): number => {
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

export function calc_Richelieu_special_power_mod(
    attacker_unit: PlayerFleetUnit,
    first_ship: FirstShip,
    pre_info: RichelieuSpecialMultiplierPreInfo,
): SpecialAttackPowerMod {
    const {
        has_surface_radar,
        has_AP_shell,
    } = pre_info;

    const base = calc_base_value(attacker_unit, first_ship);

    const surface_radar_mod =
        calc_surface_radar_mod(has_surface_radar);

    const AP_shell_mod = calc_AP_shell_mod(has_AP_shell);

    return base
        * surface_radar_mod
        * AP_shell_mod as SpecialAttackPowerMod;
}