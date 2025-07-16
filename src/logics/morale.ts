import { PlayerEquippedShip } from "@/models/ship/equipped";
import { match } from "ts-pattern";

const MORALE_STATE = {
    Kira: 1,
    Normal: 2,
    Orange: 3,
    Red: 4,
} as const;
export type MoraleType = keyof typeof MORALE_STATE

export const MORALE_THRESHOLD: Record<MoraleType, number> = {
    Kira: 50,
    Normal: 30,
    Orange: 20,
    Red: 0,
}

/**
 * 疲労度の段階を返す
 * @param ship 
 * @returns 
 */
export function calc_morale_type(
    ship: PlayerEquippedShip,
): MoraleType {
    const morale = ship.state.morale;

    if (morale >= MORALE_THRESHOLD.Kira) return 'Kira';
    if (morale >= MORALE_THRESHOLD.Normal) return 'Normal';
    if (morale >= MORALE_THRESHOLD.Orange) return 'Orange';
    return 'Red';
}