import { SpecialAttackPowerMod } from "@/logics/SpecialAttack";
import { PlayerFleetUnit } from "@/models/fleet/FleetUnit";
import { has_ship_name } from "@/models/ship/equipped";
import { PlayerShipNameJP } from "@/types/ship/playerNameJP";
import { calc_Yamato_special_pre_info, YamatoSpecialPreInfo } from "../preInfo";
import { calc_Yamato_special_pre_mods } from "../mod";

const NAGATO_KAI_NI_NAMES: Set<PlayerShipNameJP> = new Set([
    '長門改二',
    '陸奥改二',
]);

const ISE_KAI_NI_NAMES: Set<PlayerShipNameJP> = new Set([
    '伊勢改二',
    '日向改二',
]);

const COMBINATION_TYPE = {
    MUSASHI_AND_NAGATO_CLASS: 1,
    NAGATO_CLASS: 2,
    ISE_CLASS: 3,
    OTHER: 4,
} as const;
type CombinationType = keyof typeof COMBINATION_TYPE

type BaseValues = {
    first: number,
    second: number,
    third: number,
}

type BaseDatas = Record<CombinationType, BaseValues>

const BASE_DATAS: BaseDatas = {
    MUSASHI_AND_NAGATO_CLASS: {
        first: 1.65,
        second: 1.8,
        third: 1.65,
    },
    NAGATO_CLASS: {
        first: 1.65,
        second: 1.65,
        third: 1.65,
    },
    ISE_CLASS: {
        first: 1.65,
        second: 1.575,
        third: 1.65,
    },
    OTHER: {
        first: 1.5,
        second: 1.5,
        third: 1.65,
    },
} as const;

const calc_base_type = (
    second_unit: PlayerFleetUnit,
    third_unit: PlayerFleetUnit,
): CombinationType => {
    const { name_jp: second_ship_name } = second_unit.ship;
    const { name_jp: third_ship_name } = third_unit.ship;

    if (
        second_ship_name === '武蔵改二' &&
        has_ship_name(NAGATO_KAI_NI_NAMES, third_ship_name)
    ) return 'MUSASHI_AND_NAGATO_CLASS';
    if (
        has_ship_name(NAGATO_KAI_NI_NAMES, second_ship_name) &&
        has_ship_name(NAGATO_KAI_NI_NAMES, third_ship_name)
    ) return 'NAGATO_CLASS';
    if (
        has_ship_name(ISE_KAI_NI_NAMES, second_ship_name) &&
        has_ship_name(ISE_KAI_NI_NAMES, third_ship_name)
    ) return 'ISE_CLASS';

    return 'OTHER';
}

const calc_base_value = (
    attacker_unit: PlayerFleetUnit,
    second_unit: PlayerFleetUnit,
    third_unit: PlayerFleetUnit,
): number => {
    const base_type = calc_base_type(second_unit, third_unit);
    const data = BASE_DATAS[base_type];

    const { original_index } = attacker_unit;
    if (original_index === 0) return data.first;
    if (original_index === 1) return data.second;
    return data.third;
}

export function calc_Yamato_Trio_special_power_mod(
    attacker_unit: PlayerFleetUnit,
    second_unit: PlayerFleetUnit,
    third_unit: PlayerFleetUnit,
): SpecialAttackPowerMod {
    const pre_info =
        calc_Yamato_special_pre_info(attacker_unit.ship.equip_slots);
    const base = calc_base_value(
        attacker_unit,
        second_unit,
        third_unit,
    );

    const {
        surface_radar_mod,
        radar_XL_mod,
        AP_shell_mod,
    } = calc_Yamato_special_pre_mods(pre_info);

    return base
        * surface_radar_mod
        * radar_XL_mod
        * AP_shell_mod as SpecialAttackPowerMod;
}