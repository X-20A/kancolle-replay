import { Rand } from "@/effects/random"
import { is_player_equip } from "@/models/equip/basic";
import { Fleet } from "@/models/fleet/Fleet"

const ENGAGEMENT_TYPE = {
    Advantage_T: 1,
    Parallel: 2,
    Head_on: 3,
    Disadvantage_T: 4,
}

export type EngagementType = keyof typeof ENGAGEMENT_TYPE

/**
 * 交戦形態を返す
 * @param our_fleet 
 * @param rand 
 * @returns 
 */
export function calc_engagement(
    our_fleet: Fleet,
    rand: Rand,
): EngagementType {
    const rand_value = rand.next();
    const natural_engagement: EngagementType =
        rand_value > 0.85 ? 'Advantage_T' :
            rand_value > 0.4 ? 'Parallel' :
                rand_value > 0.1 ? 'Head_on' :
                    'Disadvantage_T';

    const has_saiun = our_fleet.ships.some(ship => {
        ship.equips.some(equip => {
            is_player_equip(equip) && equip.flags.can_avoid_T_disadvantage;
        });
    });

    return natural_engagement === 'Disadvantage_T' && has_saiun
        ? 'Head_on'
        : natural_engagement;
}