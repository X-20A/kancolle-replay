import { EngagementType } from "@/logics/engagemenet";
import { match } from "ts-pattern";
import { KongouSpecialMultiplierPreInfo } from ".";
import { SpecialAttackPowerMod } from "../..";

const calc_engagement_mod = (
    engagement_type: EngagementType,
): number => {
    return match(engagement_type)
        .with('Head_on', 'Parallel', () => 2.4)
        .with('Advantage_T', () => 3)
        .with('Disadvantage_T', () => 1.92)
        .exhaustive();
}

const calc_gun_mod = (
    valid_gun_count: number,
): number => {
    if (valid_gun_count >= 2) return 1.15;
    if (valid_gun_count === 1) return 1.11;

    return 1;
}

export function calc_Kongou_special_power_mod(
    pre_info: KongouSpecialMultiplierPreInfo,
    engagement_type: EngagementType,
): SpecialAttackPowerMod {
    const BASE = 1;

    const engagement_mod = calc_engagement_mod(engagement_type);
    const gun_mod = calc_gun_mod(pre_info.valid_gun_count);

    return BASE
        * engagement_mod
        * gun_mod as SpecialAttackPowerMod;
}