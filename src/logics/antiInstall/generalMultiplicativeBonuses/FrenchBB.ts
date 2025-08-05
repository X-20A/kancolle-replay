import { AntiInstallPreInfo } from "../preInfo";

export function calc_anti_French_BB_multiplier(
    info: AntiInstallPreInfo,
): number {
    const {
        AP_shell_count,
        seaplane_bomber_count,
        seaplane_fighter_count,
        carrier_bomber_count,
        Late_298_count,
    } = info;

    let total = 1;

    if (AP_shell_count) total *= 1.2;
    if (
        seaplane_bomber_count + seaplane_fighter_count
    ) total *= 1.1;
    if (Late_298_count) total *= 1.2;
    if (carrier_bomber_count) total *= 1.1;
    if (carrier_bomber_count >= 2) total *= 1.15;

    return total;
}