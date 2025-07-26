import { is_dive_bomber, is_fighter, is_torpedo_bomber } from "@/models/equip/basic";
import { EquippedShip, is_abyssal_ship, is_carrier_vessel_category, is_player_equipped_ship } from "@/models/ship/equipped";
import { EquipSlot } from "@/models/ship/EquipSlot";
import { AirSuperiorityStrikeType } from ".";

/// CVCI(空母カットイン)

type PreInfo = {
    has_fighter: boolean,
    dive_bomber_count: number,
    has_torpedo_bomber: boolean,
}

/**
 * CVCIの判定に必要な情報を返す
 * @param equip_slots 
 * @returns 
 */
const calc_pre_info = (
    equip_slots: EquipSlot[],
): PreInfo => {
    return equip_slots.reduce((total, slot) => {
        const { equip } = slot;
        if (!equip || slot.slot_count === 0) return total;

        if (is_fighter(equip)) total.has_fighter = true;
        if (is_dive_bomber(equip)) total.dive_bomber_count++;
        if (is_torpedo_bomber(equip)) total.has_torpedo_bomber = true;
        return total;
    }, {
        has_fighter: false,
        dive_bomber_count: 0,
        has_torpedo_bomber: false,
    } as PreInfo);
}

/**
 * 
 * @param attacker_ship 
 * @returns 
 */
export function calc_CVCI_types(
    attacker_ship: EquippedShip,
): AirSuperiorityStrikeType[] {
    const triggerables: AirSuperiorityStrikeType[] = [];
    if (
        (is_abyssal_ship(attacker_ship) && attacker_ship.flags.can_not_CVCI)
    ) return triggerables;

    const {
        has_fighter,
        dive_bomber_count,
        has_torpedo_bomber,
    } = calc_pre_info(attacker_ship.equip_slots);

    if (dive_bomber_count >= 1 && has_torpedo_bomber) triggerables.push('CVCI_BA');
    if (dive_bomber_count >= 2 && has_torpedo_bomber) triggerables.push('CVCI_BBA');
    if (has_fighter && dive_bomber_count >= 1 && has_torpedo_bomber) triggerables.push('CVCI_FBA');

    return triggerables;
}