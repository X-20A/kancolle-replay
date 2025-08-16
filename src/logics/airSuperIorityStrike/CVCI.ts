import { is_dive_bomber, is_fighter, is_torpedo_bomber } from "@/models/equip/basic";
import { EquippedShip, is_abyssal_ship, is_damage_heavily, is_install_type, is_submarine_category } from "@/models/ship/equipped";
import { EquipSlot, is_equip_exsist } from "@/models/ship/EquipSlot";

/// CVCI(空母カットイン)
// https://en.kancollewiki.net/Combat/Artillery_Spotting#Aircraft_Carrier_Cut-In

const CVCI_TYPE = {
    CVCI_FBA: 71,
    CVCI_BBA: 72,
    CVCI_BA: 73,
} as const;
type CVCIType = keyof typeof CVCI_TYPE

type PreInfo = {
    has_fighter: boolean,
    dive_bomber_count: number,
    has_torpedo_bomber: boolean,
}
const INITIAL: PreInfo = {
    has_fighter: false,
    dive_bomber_count: 0,
    has_torpedo_bomber: false,
} as const;

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
        if (
            !is_equip_exsist(equip) ||
            slot.slot_count === 0
        ) return total;

        if (is_fighter(equip)) total.has_fighter = true;
        if (is_dive_bomber(equip)) total.dive_bomber_count++;
        if (is_torpedo_bomber(equip)) total.has_torpedo_bomber = true;
        return total;
    }, INITIAL);
}

/**
 * 
 * @param attacker_ship 
 * @returns 
 */
export function calc_CVCI_types(
    attacker_ship: EquippedShip,
    target_ship: EquippedShip,
): CVCIType[] {
    const triggerables: CVCIType[] = [];
    if ( // 装甲空母以外の中破は行動可否で弾かれる想定
        is_damage_heavily(attacker_ship) ||
        (is_abyssal_ship(attacker_ship) && attacker_ship.flags.can_not_CVCI) ||
        is_install_type(target_ship) ||
        is_submarine_category(target_ship)
    ) return triggerables;

    const {
        has_fighter,
        dive_bomber_count,
        has_torpedo_bomber,
    } = calc_pre_info(attacker_ship.equip_slots);

    if (
        dive_bomber_count >= 1 &&
        has_torpedo_bomber
    ) triggerables.push('CVCI_BA');
    if (
        dive_bomber_count >= 2 &&
        has_torpedo_bomber
    ) triggerables.push('CVCI_BBA');
    if (
        has_fighter &&
        dive_bomber_count >= 1 &&
        has_torpedo_bomber
    ) triggerables.push('CVCI_FBA');

    return triggerables;
}