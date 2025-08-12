import { PlayerFleetUnit } from "@/models/fleet/FleetUnit";
import { is_flagship_unit } from "@/models/fleet/predicates";
import { has_ship_name, PlayerEquippedShip } from "@/models/ship/equipped";
import { PlayerShipNameJP } from "@/types/ship/playerNameJP";
import { match } from "ts-pattern";
import { calc_Yamato_special_pre_info, YamatoSpecialPreInfo } from "../preInfo";
import { SpecialAttackPowerMod } from "@/logics/SpecialAttack";
import { YamatoDuoSpecialComponent } from "../..";

type SecondShipType =
    | 'Yamato_kai_ni_ju'
    | 'Yamato_kai_ni_class'
    | 'other'

const YAMATO_KAI_NI_CLASS_NAMES: Set<PlayerShipNameJP> = new Set([
    '大和改二',
    '武蔵改二',
]);

const calc_second_ship_type = (
    second_ship: PlayerEquippedShip,
): SecondShipType => {
    const { name_jp } = second_ship;
    if (name_jp === '大和改二重') return 'Yamato_kai_ni_ju';
    if (
        has_ship_name(YAMATO_KAI_NI_CLASS_NAMES, name_jp)
    ) return 'Yamato_kai_ni_class';

    return 'other';
}

type ModBase = 1.4 | 1.54 | 1.86 | 1.96

const calc_base = (
    unit: PlayerFleetUnit,
    second_ship_type: SecondShipType,
): ModBase => {
    const is_flagship = is_flagship_unit(unit);

    return match(second_ship_type)
        .with('Yamato_kai_ni_ju', () => {
            return is_flagship
                ? 1.54
                : 1.96;
        })
        .with('Yamato_kai_ni_class', () => {
            return is_flagship
                ? 1.54
                : 1.86;
        })
        .with('other', () => {
            return is_flagship
                ? 1.4
                : 1.54;
        })
        .exhaustive();
}

type SurfaceRadarMod = 1 | 1.15

const calc_surface_radar_mod = (
    pre_info: YamatoSpecialPreInfo,
): SurfaceRadarMod => {
    return pre_info.has_surface_radar
        ? 1.15
        : 1;
}

type RadarXLMod = 1 | 1.25

const calc_radar_XL_mod = (
    pre_info: YamatoSpecialPreInfo,
): RadarXLMod => {
    return pre_info.has_radar_XL
        ? 1.25
        : 1;
}

type APShellMod = 1 | 1.35

const calc_AP_shell_mod = (
    pre_info: YamatoSpecialPreInfo,
): APShellMod => {
    return pre_info.has_AP_shell
        ? 1.35
        : 1;
}

const calc_Yamato_Duo_special_power_mod_core = (
    base: ModBase,
    surface_radar_mod: SurfaceRadarMod,
    radar_XL_mod: RadarXLMod,
    AP_shell_mod: APShellMod,
): SpecialAttackPowerMod => {
    return base
        * surface_radar_mod
        * radar_XL_mod
        * AP_shell_mod as SpecialAttackPowerMod;
}

export function calc_Yamato_Duo_special_power_mod(
    attacker_unit: PlayerFleetUnit,
    second_unit: PlayerFleetUnit,
): SpecialAttackPowerMod {
    const pre_info =
        calc_Yamato_special_pre_info(attacker_unit.ship.equip_slots);
    const second_ship_type =
        calc_second_ship_type(second_unit.ship);

    const base = calc_base(attacker_unit, second_ship_type);

    const surface_radar_mod = calc_surface_radar_mod(pre_info);
    const radar_XL_mod = calc_radar_XL_mod(pre_info);
    const AP_shell_mod = calc_AP_shell_mod(pre_info);

    return calc_Yamato_Duo_special_power_mod_core(
        base,
        surface_radar_mod,
        radar_XL_mod,
        AP_shell_mod,
    );
}