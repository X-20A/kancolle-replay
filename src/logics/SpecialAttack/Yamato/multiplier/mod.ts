import { YamatoSpecialPreInfo } from "./preInfo";

/// 大和型タッチ火力補正計算に使う補正値
/// 2隻 | 3隻 両用

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

export type YamatoSpecialPreMods = {
    surface_radar_mod: SurfaceRadarMod,
    radar_XL_mod: RadarXLMod,
    AP_shell_mod: APShellMod,
}

export function calc_Yamato_special_pre_mods(
    pre_info: YamatoSpecialPreInfo,
): YamatoSpecialPreMods {
    const surface_radar_mod = calc_surface_radar_mod(pre_info);
    const radar_XL_mod = calc_radar_XL_mod(pre_info);
    const AP_shell_mod = calc_AP_shell_mod(pre_info);

    const mods: YamatoSpecialPreMods = {
        surface_radar_mod,
        radar_XL_mod,
        AP_shell_mod,
    };

    return mods;
}