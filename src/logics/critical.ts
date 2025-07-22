import { RandGenerator } from "@/effects/random";
import { match } from "ts-pattern"
import { HitType } from "./hit";

type CriticalPhaseType = 
    | 'day_shelling'
    | 'support_shelling'
    | 'torpedo'
    | 'air_combat'
    | 'support_air_combat'
    | 'asw'
    | 'night_battle'

export function calc_constant_phase_mod(
    phase_type: CriticalPhaseType,
): number {
    // ? aswのソースが不統一
    // 日wiki: 1.1,
    // ENwiki: 1.3,
    // Sortie Sim: 1.3,
    // ? 対潜支援はwikiに記載なし
    return match(phase_type)
        .with('day_shelling', 'asw', () => 1.3)
        .with('support_shelling', () => 1)
        .with('torpedo', () => 1.5)
        .with('air_combat', () => 0)
        .with('support_air_combat', () => 0.2)
        .with('night_battle', () => 1.5)
        .exhaustive();
}

const CRITICAL_RATE_FLAT = 0.01;

/**
 * 基地噴式強襲のクリティカル率を返す
 * @param accuracy 
 * @returns 
 */
export function calc_jet_lbas_critical_rate(
    accuracy: number,
): number {
    // 熟練度影響なし
    return Math.floor(calc_constant_phase_mod('air_combat') * Math.sqrt(accuracy))
        + CRITICAL_RATE_FLAT;
}

const CRITICAL_ATTACK_POWER_MOD = 1.5;

/**
 * クリティカル処理後の攻撃力を返す
 * @param pre_attack_power 
 * @param critical_rate 
 */
export function calc_critical_mod(
    hit_type: HitType,
): number {
    return hit_type === 'Critical'
        ? CRITICAL_ATTACK_POWER_MOD
        : 1;
}