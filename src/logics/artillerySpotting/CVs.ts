import { is_dive_bomber, is_fighter, is_torpedo_bomber } from "@/models/equip/basic";
import { EquippedShip, is_abyssal_ship, is_carrier_vessel_category, is_player_ship } from "@/models/ship/equipped";
import { EquipSlot } from "@/models/ship/EquipSlot";
import { ArtillerySpottingType } from "./artillerySpotting";

type PreInfo = {
    has_fighter: boolean,
    dive_bomber_count: number,
    has_torpedo_bomber: boolean,
}

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

export function calc_CVs_artillery_spotting_types(
    attacker_ship: EquippedShip,
): ArtillerySpottingType[] {
    const triggerables: ArtillerySpottingType[] = [];
    if (
        !is_carrier_vessel_category(attacker_ship) ||
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