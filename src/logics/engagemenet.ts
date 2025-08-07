import { is_random_successful } from "@/effects/random";
import { is_player_equip } from "@/models/equip/basic";
import { concat_fleet_ships, PlayerFleet } from "@/models/fleet/Fleet"
import { is_sunk } from "@/models/ship/equipped";
import { is_equip_exsist } from "@/models/ship/EquipSlot";
import { Brand } from "@/types/brands";
import { RandValue } from "@/types/brands/other";

const ENGAGEMENT_TYPE = {
    Advantage_T: 1,
    Parallel: 2,
    Head_on: 3,
    Disadvantage_T: 4,
}

export type EngagementType = keyof typeof ENGAGEMENT_TYPE

export const ENGAGEMENT_POWER_MOD_DATA: { [key in EngagementType]: number } = {
    Advantage_T: 1.2,
    Parallel: 1,
    Head_on: 0.8,
    Disadvantage_T: 0.6,
}

/**
 * 乱数値から交戦形態を決定して返す
 * @param rand_value 
 * @returns 
 */
const calc_random_engagement_type = (
    rand_value: RandValue,
): EngagementType => {
    if (is_random_successful(0.15, rand_value)) return 'Advantage_T';
    if (is_random_successful(0.6, rand_value)) return 'Parallel';
    if (is_random_successful(0.9, rand_value)) return  'Head_on';
    return 'Disadvantage_T';
}

/**
 * 艦隊内に彩雲装備艦がいるか判定して返す
 * @param player_fleet 
 * @returns 
 */
const has_fleet_saiun = (
    player_fleet: PlayerFleet,
): boolean => {
    // ? 随伴艦隊の彩雲が常に有効か不明 暫定: 有効
    return concat_fleet_ships(player_fleet).some(ship => {
        if (is_sunk(ship)) return false;

        ship.equip_slots.some((equip_built, index) => {
            const equip = equip_built.equip;
            if (!is_equip_exsist(equip)) return false;

            return is_player_equip(equip)
                && equip.flags.can_avoid_T_disadvantage
                // ? スロットが枯れた状態で有効か不明 暫定: 無効
                && ship.slot_counts[index] >= 1;
        });
    });
}

/**
 * 交戦形態を返す
 * @param player_fleet 
 * @param rand 
 * @returns 
 */
export function calc_engagement(
    player_fleet: PlayerFleet,
    rand_value: RandValue,
): EngagementType {
    const natural_engagement = calc_random_engagement_type(rand_value);

    const has_saiun = has_fleet_saiun(player_fleet);

    return natural_engagement === 'Disadvantage_T' && has_saiun
        ? 'Head_on'
        : natural_engagement;
}

export type EngagementAttackPowerMod =
    Brand<number, 'EngagementAttackPowerMod'>

export function calc_engagement_mod(
    engagement_type: EngagementType,
): EngagementAttackPowerMod {
    return ENGAGEMENT_POWER_MOD_DATA[engagement_type] as EngagementAttackPowerMod;
}