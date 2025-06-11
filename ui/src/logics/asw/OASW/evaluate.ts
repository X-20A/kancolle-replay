import { PlayerShip } from '@/models/ship/Ship';
import { evaluate_special_OASW_condition } from './specialConditions';
import { can_OASW_by_ship_type } from './shipTypeStrategy';

/**
 * 艦が先制対潜可能か判定して返す    
 * NOTE: 先制対潜は損傷状態、艦載機残存数に影響されないので、装備時点で静的に決定する
 */
export function evaluateCanOASW(ship: PlayerShip): boolean {
    return evaluate_special_OASW_condition(ship) === true
        ? true
        : can_OASW_by_ship_type(ship);
}