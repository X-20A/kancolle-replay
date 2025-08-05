import { AntiInstallPreInfo } from "../preInfo";

export function calc_anti_Northernmost_multiplier(
    info: AntiInstallPreInfo,
): number {
    const {
        WG_count,
        special_LC1_count,
        Toku_11_tank_count,
        Type_3_shell_count,
    } = info;

    let total = 1;

    if (WG_count) total *= 1.4;
    if (WG_count >= 2) total *= 1.5;
    if (special_LC1_count) total *= 1.8;
    if (Toku_11_tank_count) total *= 2.2;
    if (Type_3_shell_count) total *= 1.75;

    return total;
}