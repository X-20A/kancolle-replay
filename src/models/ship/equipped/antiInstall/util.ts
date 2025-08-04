import { AntiInstallPreInfo } from "./preInfo";

export type AntiInstallUtils = {
    has_special_LC: boolean,
    AB_or_armed_count: number,
    total_mortars_count: number,
    total_Type4_rocket_count: number,
}

export function calc_anti_install_utils(
    info: AntiInstallPreInfo,
): AntiInstallUtils {
    const {
        normal_LC_count,
        Landing_force_count,
        Katsu_tank_kai_count: Toku_4_tank_kai_count,
        has_army_unit,
        AB_count,
        armed_LC_count,
        mortar_count,
        mortar_concentrated_count,
        Type_4_rocket_count,
        Type_4_rocket_concentrated_count,
    } = info;

    const has_special_LC = normal_LC_count >= 1 ||
        Landing_force_count >= 1 ||
        Toku_4_tank_kai_count >= 1 ||
        has_army_unit;

    const AB_or_armed_count = AB_count + armed_LC_count;

    const total_mortars_count = mortar_count
            + mortar_concentrated_count;
    const total_Type4_rocket_count = Type_4_rocket_count
            + Type_4_rocket_concentrated_count;

    const util: AntiInstallUtils = {
        has_special_LC,
        AB_or_armed_count,
        total_mortars_count,
        total_Type4_rocket_count,
    }

    return util;
}