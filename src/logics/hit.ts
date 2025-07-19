import { RandValue } from "@/types/brands/other";
import { HitMoraleMod } from "./morale";
import { Brand } from "@/types/brands";
import { Accuracy } from "./accuracy";

/// Hit Rate
/// https://en.kancollewiki.net/Accuracy,_Evasion_and_Criticals#Hit_Rate

/**
 * Hit Rateの最小値制限を適用した値を返す
 * @param pre_hit_cap 
 * @returns 
 */
const calc_lower_limited = (
    pre_hit_cap: number,
): number => {
    const LOWER_LIMIT = 10;
    return Math.max(
        LOWER_LIMIT,
        pre_hit_cap,
    );
}

/**
 * Hit Rateの最大値制限を適用した値を返す
 * @param pre_hit_cap 
 * @returns 
 */
const calc_higher_limited = (
    pre_hit_cap: number,
): number => {
    const HIGHER_LIMIT = 96;
    return Math.min(
        HIGHER_LIMIT,
        pre_hit_cap,
    );
}

/**
 * 命中率(熟練度補正無し): 
 * @param accuracy 
 * @param evasion 
 * @param morale_mod 
 * @returns 
 */
const calc_capped_hit_rate = (
    accuracy: Accuracy,
    evasion: number,
    morale_mod: HitMoraleMod,
): number => {
    const base = accuracy - evasion;
    const lower_limited = calc_lower_limited(base);
    return calc_higher_limited(
        lower_limited * morale_mod
    );
}

export type HitRate = Brand<number, 'HitRate'>

/**
 * 最終命中率(Hit Rate)を返す
 * @param avg_plane_proficiency_flat 
 * @param morale_mod 
 * @param accuracy 
 * @param evasion 
 * @returns 
 */
export function calc_hit_rate(
    avg_plane_proficiency_flat: number,
    morale_mod: HitMoraleMod,
    accuracy: Accuracy,
    evasion: number,
): HitRate {
    const capped_hit = calc_capped_hit_rate(
        accuracy,
        evasion,
        morale_mod,
    );

    const CONSTANT_FLAT = 1;
    return Math.floor(capped_hit)
        + avg_plane_proficiency_flat
        + CONSTANT_FLAT as HitRate;
}

export type HitType =
    | 'Critical'
    | 'Hit'
    | 'Miss'

/**
 * ヒット種別を返す
 * @param critical_rate 
 * @param hit_rate 
 * @param rand_value 
 * @returns 
 */
export function calc_hit_type(
    critical_rate: number,
    hit_rate: HitRate,
    rand_value: RandValue,
): HitType {
    if (rand_value <= critical_rate) return 'Critical';
    if (rand_value <= hit_rate) return 'Hit';
    return 'Miss';
}