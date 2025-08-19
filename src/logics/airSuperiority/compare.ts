const AIR_STATE = {
    Supremacy: 1,
    Superiority: 2,
    Parity: 3,
    Denial: 4,
    Incapability: 5,
} as const;
export type AirStateType = keyof typeof AIR_STATE

export type AirStateResult = {
    player_air_state: AirStateType,
    enemy_air_state: AirStateType,
}

const VALID_AIR_STTATE: Set<AirStateType> = new Set([
    'Superiority',
    'Supremacy',
]);

/**
 * 制空状態が優勢以上であるか判定して返す
 * @param air_state 
 * @returns 
 */
export function is_air_state_superiority_or_more(
    air_state: AirStateType,
): air_state is Extract<AirStateType, 'Supremacy' | 'Superiority'> {
    return VALID_AIR_STTATE.has(air_state);
}

/**
 * 彼我の制空値から制空状態種別を返す
 * @param player 
 * @param enemy 
 * @returns 
 */
export function evaluate_air_superiority(
    player: number,
    enemy: number,
): AirStateResult {
    const ratio = player / enemy;

    if (ratio >= 3) return { player_air_state: 'Supremacy', enemy_air_state: 'Incapability' };
    if (ratio >= 1.5) return { player_air_state: 'Superiority', enemy_air_state: 'Denial' };
    if (ratio > 2 / 3) return { player_air_state: 'Parity', enemy_air_state: 'Parity' };
    if (ratio > 1 / 3) return { player_air_state: 'Denial', enemy_air_state: 'Superiority' };
    return { player_air_state: 'Incapability', enemy_air_state: 'Supremacy' };
}