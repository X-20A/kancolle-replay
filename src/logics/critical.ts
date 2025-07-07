import { match } from "ts-pattern"

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
    return match(phase_type)
        .with('day_shelling', () => 1.3)
        .with('support_shelling', () => 1)
        .with('torpedo', () => 1.5)
        .with('air_combat', () => 0)
        .with('support_air_combat', () => 0.2)
        .with('asw', () => 1.1)
        .with('night_battle', () => 1.5)
        .exhaustive();
}

const CONSTANT_FLAT = 0.01;

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
        + CONSTANT_FLAT;
}