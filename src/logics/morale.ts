import { EquippedShip, is_player_ship, PlayerEquippedShip } from "@/models/ship/equipped";
import { Brand } from "@/types/brands";

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
};

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

export type HitMoraleMod = Brand<number, 'HitMoraleMod'>

/**
 * "回避側"の疲労度による"攻撃側"の命中への補正値を返す
 * @param defender_ship 
 * @returns 
 */
export function calc_hit_morale_mod(
    defender_ship: EquippedShip,
): HitMoraleMod {
    if (!is_player_ship(defender_ship)) return 1 as HitMoraleMod;

    const { morale } = defender_ship.state;
    if (morale >= MORALE_THRESHOLD.Kira) return 0.7 as HitMoraleMod;
    if (morale >= MORALE_THRESHOLD.Normal) return 1 as HitMoraleMod;
    if (morale >= MORALE_THRESHOLD.Orange) return 1.2 as HitMoraleMod;
    return 1.4 as HitMoraleMod; // morale >= MORALE_THRESHOLD.Red
}

export type AccuracyMoraleMod = Brand<number, 'AccuracyMoraleMod'>

/**
 * "攻撃側"の疲労度による命中への補正値を返す
 * @param attacker_ship 
 * @returns 
 */
export function calc_accuracy_morale_mod(
    attacker_ship: EquippedShip,
): AccuracyMoraleMod {
    if (!is_player_ship(attacker_ship)) return 1 as AccuracyMoraleMod;

    const { morale } = attacker_ship.state;
    if (morale >= MORALE_THRESHOLD.Kira) return 1.2 as AccuracyMoraleMod;
    if (morale >= MORALE_THRESHOLD.Normal) return 1 as AccuracyMoraleMod;
    if (morale >= MORALE_THRESHOLD.Orange) return 0.8 as AccuracyMoraleMod;
    return 0.5 as AccuracyMoraleMod; // morale >= MORALE_THRESHOLD.Red
}