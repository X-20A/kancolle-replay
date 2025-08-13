import { SpecialAttackAccuracyMod } from "../..";
import { QueenElizabethSpecialMultiplierPreInfo } from "./preInfo";

const BASE = 1.4;

const SURFACE_RADAR_COEFFIENT = 1.15;

const AP_SHELL_COEFFIENT = 1.15;

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

export function calc_QueenElizabeth_special_accuracy_mod(
    pre_info: QueenElizabethSpecialMultiplierPreInfo,
): SpecialAttackAccuracyMod {
    const {
        has_surface_radar,
        has_AP_shell,
    } = pre_info;

    const surface_radar_mod =
        calc_surface_radar_mod(has_surface_radar);

    const AP_shell_mod = calc_AP_shell_mod(has_AP_shell);

    return BASE
        * surface_radar_mod
        * AP_shell_mod as SpecialAttackAccuracyMod;
}