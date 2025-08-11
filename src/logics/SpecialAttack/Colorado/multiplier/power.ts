import { PlayerFleetUnit } from "@/models/fleet/FleetUnit";
import { is_flagship_unit } from "@/models/fleet/predicates";
import { has_ship_name } from "@/models/ship/equipped";
import { PlayerShipNameJP } from "@/types/ship/playerNameJP";
import { SpecialAttackPowerMod } from "../..";
import { ColoradoSpecialMultiplierPreInfo } from ".";

/**
 * 補正が乗るビッグ7系の艦    
 * ? 未改造などが含まれないが検証があるかは不明    
 * Rodneyは含まれない    
 * https://wikiwiki.jp/kancolle/Colorado#ColoTouch
 */
const VALID_BIG_7_NAMES: Set<PlayerShipNameJP> = new Set([
    '長門改二', '陸奥改二',
    'Nelson改',
    'Colorado', 'Colorado改', 'Maryland', 'Maryland改',
]);

const SURFACE_RADAR_COEFFIENT = 1.15;

const AP_SHELL_COEFFIENT = 1.35;

/**
 * SGレーダー(後期型)補正値    
 * 水上電探補正値との重複可
 */
const SG_RADAR_LATE_MODEL_COEFFIENT = 1.15;

const calc_attack_power_mod_base = (
    unit: PlayerFleetUnit,
): number => {
    if (is_flagship_unit(unit)) return 1.5;
    if (has_ship_name(VALID_BIG_7_NAMES, unit.ship.name_jp)) return 1.5;

    return 1.3;
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

const calc_SG_radar_late_model_mod = (
    has_SG_radar_late_model: boolean,
): number => {
    return has_SG_radar_late_model
        ? SG_RADAR_LATE_MODEL_COEFFIENT
        : 1;
}

export function calc_Colorado_special_power_mod(
    unit: PlayerFleetUnit,
    pre_info: ColoradoSpecialMultiplierPreInfo,
): SpecialAttackPowerMod {
    const {
        has_surface_radar,
        has_AP_shell,
        has_SG_radar_late_model,
    } = pre_info;

    const base = calc_attack_power_mod_base(unit);

    const surface_radar_mod =
        calc_surface_radar_mod(has_surface_radar);

    const AP_shell_mod = calc_AP_shell_mod(has_AP_shell);

    const SG_radar_late_model_mod =
        calc_SG_radar_late_model_mod(has_SG_radar_late_model);

    return base
        * surface_radar_mod
        * AP_shell_mod
        * SG_radar_late_model_mod as SpecialAttackPowerMod;
}