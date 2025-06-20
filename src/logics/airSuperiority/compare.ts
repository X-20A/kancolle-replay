import { Rand } from "@/effects/random";

const AIR_STATE = {
    Supremacy: 1,
    Superiority: 2,
    Parity: 3,
    Denial: 4,
    Incapability: 5,
} as const;
export type AirStateType = keyof typeof AIR_STATE

export type AirStateResult = {
    own_air_state: AirStateType,
    enemy_air_state: AirStateType,
}

/**
 * 彼我の制空値から制空状態種別を返す
 * @param own 
 * @param enemy 
 * @returns 
 */
export function evaluate_air_superiority(
    own: number,
    enemy: number,
): AirStateResult {
    const ratio = own / enemy;

    if (ratio >= 3) return { own_air_state: 'Supremacy', enemy_air_state: 'Incapability' };
    if (ratio >= 1.5) return { own_air_state: 'Superiority', enemy_air_state: 'Denial' };
    if (ratio > 2 / 3) return { own_air_state: 'Parity', enemy_air_state: 'Parity' };
    if (ratio > 1 / 3) return { own_air_state: 'Denial', enemy_air_state: 'Superiority' };
    return { own_air_state: 'Incapability', enemy_air_state: 'Supremacy' };
}