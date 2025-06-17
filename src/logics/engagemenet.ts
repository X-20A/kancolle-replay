import { Rand } from "@/effects/random"
import { is_player_equip } from "@/models/equip/basic";
import { concat_fleet_ships, Fleet } from "@/models/fleet/Fleet"
import { OwnFleet } from "@/types/brands/fleet";

const ENGAGEMENT_TYPE = {
    Advantage_T: 1,
    Parallel: 2,
    Head_on: 3,
    Disadvantage_T: 4,
}

export type EngagementType = keyof typeof ENGAGEMENT_TYPE

export const ENGAGEMENT_DAMAGE_MOD_DATA: { [key in EngagementType]: number } = {
    Advantage_T: 1.2,
    Parallel: 1,
    Head_on: 0.8,
    Disadvantage_T: 0.6,
}

/**
 * 交戦形態を返す
 * @param own_fleet 
 * @param rand 
 * @returns 
 */
export function calc_engagement(
    own_fleet: OwnFleet,
    rand: Rand,
): EngagementType {
    const rand_value = rand.next();
    const natural_engagement: EngagementType =
        rand_value > 0.85 ? 'Advantage_T' :
            rand_value > 0.4 ? 'Parallel' :
                rand_value > 0.1 ? 'Head_on' :
                    'Disadvantage_T';

    const has_saiun = concat_fleet_ships(own_fleet).some(ship => {
        ship.equips.some(equip => {
            is_player_equip(equip) && equip.flags.can_avoid_T_disadvantage;
        });
    });

    return natural_engagement === 'Disadvantage_T' && has_saiun
        ? 'Head_on'
        : natural_engagement;
}