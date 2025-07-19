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
}

export type HitMoraleMod = Brand<number, 'HitMoraleMod'>

/**
 * "回避側"の疲労度による"攻撃側"の命中率への補正値
 * @param ship 
 * @returns 
 */
const calc_hit_morale_mod = (
    ship: EquippedShip,
): HitMoraleMod => {
    if (!is_player_ship(ship)) return 1 as HitMoraleMod;

    const morale = ship.state.morale;
    if (morale >= MORALE_THRESHOLD.Kira) return 0.7 as HitMoraleMod;
    if (morale >= MORALE_THRESHOLD.Normal) return 1 as HitMoraleMod;
    if (morale >= MORALE_THRESHOLD.Orange) return 1.2 as HitMoraleMod;
    return 1.4 as HitMoraleMod; // morale >= MORALE_THRESHOLD.Red
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