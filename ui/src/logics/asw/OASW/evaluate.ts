import { PlayerShip } from '@/models/ship/Ship';
import { shipTypeStrategies } from './shipTypeStrategies';
import { evaluateSpecialOaswCondition } from './specialConditions';

/**
 * 艦が先制対潜可能か判定して返す    
 * NOTE: 先制対潜は損傷状態、艦載機残存数に影響されないので、装備時点で静的に決定する
 */
export function calcCanOASW(ship: PlayerShip): boolean {
    const result = evaluateSpecialOaswCondition(ship);
    if (result !== undefined) return result;

    const strategy = shipTypeStrategies[ship.type_id];
    return strategy(ship);
}