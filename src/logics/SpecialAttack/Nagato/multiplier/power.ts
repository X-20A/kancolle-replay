import { PlayerFleetUnit } from "@/models/fleet/FleetUnit";
import { NagatoSpecialMultiplierPreInfo } from "./preInfo";
import { SpecialAttackPowerMod } from "../..";
import { has_ship_name } from "@/models/ship/equipped";
import { PlayerShipNameJP } from "@/types/ship/playerNameJP";
import { is_flagship_unit } from "@/models/fleet/predicates";
import { SecondShip } from "@/types/fleet/ship";

const SECOND_SHIP_TYPE = {
    NAGATO_CLASS_KAI_NI: 1,
    MUTSU_KAI: 2,
    NELSON_KAI: 3,
    OTHER: 4,
} as const;
type SecondShipType = keyof typeof SECOND_SHIP_TYPE

type BaseValue = {
    first: number,
    second: number,
}

type BaseDatas = Record<SecondShipType, BaseValue>

const BASE_DATAS: BaseDatas = {
    NAGATO_CLASS_KAI_NI: {
        first: 1.68, // 1.4 * 1.2
        second: 1.68, // 1.2 * 1.4
    },
    MUTSU_KAI: {
        first: 1.61, // 1.4 * 1.15
        second: 1.62, // 1.2 * 1.35
    },
    NELSON_KAI: {
        first: 1.54, // 1.4 * 1.1
        second: 1.5, // 1.2 * 1.25
    },
    OTHER: {
        first: 1.4,
        second: 1.2,
    },
} as const;

const SURFACE_RADAR_COEFFIENT = 1.15;

const AP_SHELL_COEFFIENT = 1.35;

const NAGATO_CLASS_KAI_NI_NAMES: Set<PlayerShipNameJP> = new Set([
    '長門改二',
    '陸奥改二',
]);

const calc_base_type = (
    second_ship: SecondShip,
): SecondShipType => {
    const { name_jp } = second_ship;
    if (
        has_ship_name(NAGATO_CLASS_KAI_NI_NAMES, name_jp)
    ) return 'NAGATO_CLASS_KAI_NI';
    if (name_jp === '陸奥改') return 'MUTSU_KAI';
    if (name_jp === 'Nelson改') return 'NELSON_KAI';
    return 'OTHER';
}

const calc_base_value = (
    attacker_unit: PlayerFleetUnit,
    second_ship: SecondShip,
): number => {
    const base_type = calc_base_type(second_ship);
    const data = BASE_DATAS[base_type];

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

export function calc_Nagato_special_power_mod(
    attacker_unit: PlayerFleetUnit,
    second_ship: SecondShip,
    pre_info: NagatoSpecialMultiplierPreInfo,
): SpecialAttackPowerMod {
    const {
        has_surface_radar,
        has_AP_shell,
    } = pre_info;

    const base = calc_base_value(attacker_unit, second_ship);

    const surface_radar_mod =
        calc_surface_radar_mod(has_surface_radar);

    const AP_shell_mod = calc_AP_shell_mod(has_AP_shell);

    return base
        * surface_radar_mod
        * AP_shell_mod as SpecialAttackPowerMod;
}