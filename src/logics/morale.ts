import { PlayerEquippedShip } from "@/models/ship/equipped";
import { match } from "ts-pattern";

const MORALE_STATE = {
    Kira: 1,
    Normal: 2,
    Orange: 3,
    Red: 4,
} as const;
export type MoraleType = keyof typeof MORALE_STATE

const MORALE_THRESHOLD: Record<MoraleType, number> = {
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

/**
 * "回避側"の疲労度による"攻撃側"の命中率への補正値
 */
const MORALE_ACURACY_MOD: Record<MoraleType, number> = {
    Kira: 0.7,
    Normal: 1,
    Orange: 1.2,
    Red: 1.4,
}

export function calc_morale_evasion_mod(
    ship: PlayerEquippedShip,
): number {
    const morale_type = calc_morale_type(ship);
    return MORALE_ACURACY_MOD[morale_type];
}