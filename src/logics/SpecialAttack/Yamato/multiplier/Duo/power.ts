import { PlayerFleetUnit } from "@/models/fleet/FleetUnit";
import { is_flagship_unit } from "@/models/fleet/predicates";
import { has_ship_name, PlayerEquippedShip } from "@/models/ship/equipped";
import { PlayerShipNameJP } from "@/types/ship/playerNameJP";
import { calc_Yamato_special_pre_info } from "../preInfo";
import { SpecialAttackPowerMod } from "@/logics/SpecialAttack";
import { Brand } from "@/types/brands";
import { calc_Yamato_special_pre_mods, YamatoSpecialPreMods } from "../mod";
import { SecondShip } from "@/types/fleet/ship";

/// 大和型2隻タッチ 火力補正

const SECOND_SHIP_TYPE = {
    YAMATO_KAI_NI_JU: 1,
    YAMATO_KAI_NI_CLASS: 2,
    OTHER: 3,
} as const;
type SecondShipType = keyof typeof SECOND_SHIP_TYPE

type BaseValue = {
    first: number,
    second: number,
}

type BaseDatas = Record<SecondShipType, BaseValue>

const BASE_DATAS: BaseDatas = {
    YAMATO_KAI_NI_JU: {
        first: 1.54, // 1.4 * 1.1
        second: 1.9375, // 1.55 * 1.25
    },
    YAMATO_KAI_NI_CLASS: {
        first: 1.54, // 1.4 * 1.1
        second: 1.86, // 1.55 * 1.2
    },
    OTHER: {
        first: 1.4,
        second: 1.55,
    },
} as const;

const YAMATO_KAI_NI_CLASS_NAMES: Set<PlayerShipNameJP> = new Set([
    '大和改二',
    '武蔵改二',
]);

const calc_second_ship_type = (
    second_ship: SecondShip,
): SecondShipType => {
    const { name_jp } = second_ship;
    if (name_jp === '大和改二重') return 'YAMATO_KAI_NI_JU';
    if (
        has_ship_name(YAMATO_KAI_NI_CLASS_NAMES, name_jp)
    ) return 'YAMATO_KAI_NI_CLASS';

    return 'OTHER';
}

type ModBase = Brand<number, 'ModBase'>

const calc_base = (
    unit: PlayerFleetUnit,
    second_ship_type: SecondShipType,
): ModBase => {
    const is_flagship = is_flagship_unit(unit);

    const data = BASE_DATAS[second_ship_type];
    return is_flagship
        ? data.first as ModBase
        : data.second as ModBase;
}

const calc_Yamato_Duo_special_power_mod_core = (
    base: ModBase,
    mods: YamatoSpecialPreMods,
): SpecialAttackPowerMod => {
    return base
        * mods.surface_radar_mod
        * mods.radar_XL_mod
        * mods.AP_shell_mod as SpecialAttackPowerMod;
}

/**
 * 大和型2隻タッチの攻撃力補正を返す
 * @param attacker_unit 
 * @param second_ship 
 * @returns 
 */
export function calc_Yamato_Duo_special_power_mod(
    attacker_unit: PlayerFleetUnit,
    second_ship: SecondShip,
): SpecialAttackPowerMod {
    const pre_info =
        calc_Yamato_special_pre_info(attacker_unit.ship.equip_slots);
    const second_ship_type =
        calc_second_ship_type(second_ship);

    const base = calc_base(attacker_unit, second_ship_type);

    const pre_mods = calc_Yamato_special_pre_mods(pre_info);

    const power_mod: SpecialAttackPowerMod =
        calc_Yamato_Duo_special_power_mod_core(base,pre_mods);

    return power_mod;
}