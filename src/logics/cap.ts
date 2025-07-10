import { match } from "ts-pattern"

type CapPhaseType =
    | 'day_shelling'
    | 'torpedo'
    | 'air_combat'
    | 'lbas'
    | 'asw'
    | 'support'
    | 'night_battle'

const calc_cap_value = (
    phase_type: CapPhaseType,
): number => {
    return match(phase_type)
        .with('day_shelling', 'lbas', () => 220)
        .with('torpedo', () => 180)
        .with('air_combat', 'asw', 'support', () => 170)
        .with('night_battle', () => 360)
        .exhaustive();
}

export function calc_capped_attack_power(
    pre_cap_attack_power: number,
    phase_type: CapPhaseType,
): number {
    const cap_value = calc_cap_value(phase_type);
    if (pre_cap_attack_power <= cap_value) return pre_cap_attack_power;

    return Math.floor(
        cap_value
        + Math.sqrt(pre_cap_attack_power - cap_value)
    );
}