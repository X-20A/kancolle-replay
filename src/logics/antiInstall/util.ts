import { AntiInstallPreInfo } from "./preInfo";

export type AntiInstallUtils = {
    /** 上陸用舟艇 | カツ車 | 陸軍部隊 */
    has_special_LC: boolean,
    /** 武装大発 | 装甲艇(AB艇) の数 */
    armed_boats_count: number,
    total_mortars_count: number,
    total_Type4_rocket_count: number,
}

export function calc_anti_install_utils(
    info: AntiInstallPreInfo,
): AntiInstallUtils {
    const {
        normal_LC_count,
        Landing_force_count,
        Katsu_tank_kai_count,
        AB_count,
        armed_LC_count,
        mortar_count,
        mortar_concentrated_count,
        Type_4_rocket_count,
        Type_4_rocket_concentrated_count,
        Armys_count,
        
    } = info;

    const has_special_LC = normal_LC_count >= 1 ||
        Landing_force_count >= 1 ||
        Katsu_tank_kai_count >= 1 ||
        Armys_count >= 1;

    const armed_boats_count = AB_count + armed_LC_count;

    const total_mortars_count = mortar_count
            + mortar_concentrated_count;
    const total_Type4_rocket_count = Type_4_rocket_count
            + Type_4_rocket_concentrated_count;

    const util: AntiInstallUtils = {
        has_special_LC,
        armed_boats_count,
        total_mortars_count,
        total_Type4_rocket_count,
    }

    return util;
}