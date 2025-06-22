import { Rand } from "@/effects/random";
import { is_damage_lightly_or_more, is_player_ship, is_submarine_category} from "@/models/ship/equipped";
import { FormationType } from "@/types";
import { ExtractedShip } from "@/types/fleet";

/**
 * 陣形ごとのかばうの発動率    
 * https://wikiwiki.jp/kancolle/陣形#coverProbability
 */
const FORMATION_PROTECT_RATIO_DATA: Record<FormationType, number> = {
    LineAhead: 0.45,
    DoubleLine: 0.6,
    Diamond: 0.75,
    Echelon: 0.6,
    LineAbreast: 0.6,
    Vanguard: 0.75,
};

/**
 * 
 * @param target_ships 
 * @param formation 
 * @param rand 
 * @returns 
 */
export function calc_selected_target(
    target_ships: ExtractedShip[],
    formation: FormationType,
    rand: Rand,
): ExtractedShip {
    const provisional_target_ship =
        target_ships[Math.floor(rand.next() * target_ships.length)];

    if (!provisional_target_ship.is_flagship) return provisional_target_ship;

    if (
        !is_player_ship(provisional_target_ship.ship)
        && provisional_target_ship.ship.install_type !== 'No'
    ) return provisional_target_ship;

    const is_submarine = is_submarine_category(provisional_target_ship.ship);

    const protect_candidates = target_ships.slice(1).filter(target_ship =>
        is_submarine === is_submarine_category(target_ship.ship) // 水上艦、潜水艦同士でしか庇わない
        && is_damage_lightly_or_more(target_ship.ship)
    );

    if (!protect_candidates.length) return provisional_target_ship;

    return rand.next() < FORMATION_PROTECT_RATIO_DATA[formation]
        ? protect_candidates[Math.floor(rand.next() * protect_candidates.length)]
        : provisional_target_ship;
}