import { Brand } from "@/types/brands";
import { AntiInstallPreInfo } from "../preInfo";

export type AntisummerBBPostCapMultiplier =
    Brand<number, 'AntisummberBBPostCapMultiplier'>

export function calc_anti_summberBB_multiplier(
    info: AntiInstallPreInfo
): AntisummerBBPostCapMultiplier {
    const {
        AP_shell_count,
        seaplane_bomber_count,
        seaplane_fighter_count,
        torpedo_bomber_swordfish_count,
    } = info;

    let total = 1;

    if (AP_shell_count) total *= 1.2;
    if (
        seaplane_bomber_count + seaplane_fighter_count
    ) total *= 1.1;
    if (torpedo_bomber_swordfish_count) total *= 1.15;
    if (torpedo_bomber_swordfish_count >= 2) total *= 1.05;

    return total as AntisummerBBPostCapMultiplier;
}