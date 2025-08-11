import { ColoradoSpecialMultiplierPreInfo } from ".";
import { SpecialAttackAccuracyMod } from "../..";

/// Colorado級タッチ命中補正
// ? 大きな命中補正があるということが分かっているだけで全体的にソースに乏しく、暫定度が非常に高い

const calc_surface_radar_mod = (
    has_surface_radar: boolean,
): number => {
    return has_surface_radar
        ? 1.15
        : 1;
}

const calc_AP_shell_mod = (
    has_AP_shell: boolean,
): number => {
    return has_AP_shell
        ? 1.15
        : 1.15;
}

export function calc_Colorado_special_accuracy_mod(
    pre_info: ColoradoSpecialMultiplierPreInfo,
): SpecialAttackAccuracyMod {
    const {
        has_surface_radar,
        has_AP_shell,
    } = pre_info;

    const BASE = 1.4;

    const surface_radar_mod =
        calc_surface_radar_mod(has_surface_radar);

    const AP_shell_mod = calc_AP_shell_mod(has_AP_shell);

    return BASE
        * surface_radar_mod
        * AP_shell_mod as SpecialAttackAccuracyMod;
}