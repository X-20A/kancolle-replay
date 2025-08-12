import { EquipSlot, is_equip_exsist } from "@/models/ship/EquipSlot";
import { AirSuperiorityStrikeType, GunShipPreInfo } from ".";
import { EquippedShip } from "@/models/ship/equipped";

/// 弾着観測射撃

/**
 * 水偵 かつ スロットが1機以上残存しているか判定して返す
 * @param slot 
 * @returns 
 */
const is_valid_recon = (
    slot: EquipSlot,
): boolean => {
    return is_equip_exsist(slot.equip) &&
        slot.equip.skill_trigger_type === 'B_RECON' &&
        slot.slot_count >= 1;
}

/**
 * 弾着観測射撃の種別群を返す
 * @param attacker_ship 
 * @param info 
 * @returns 
 */
export function calc_artillery_spotting_types(
    attacker_ship: EquippedShip,
    info: GunShipPreInfo,
): AirSuperiorityStrikeType[] {
    const triggerables: AirSuperiorityStrikeType[] = [];
    const { equip_slots } = attacker_ship;

    const has_valid_recon = equip_slots.some(is_valid_recon);
    if (!has_valid_recon) return triggerables;

    const {
        main_gun_count,
        has_sec_gun,
        has_radar,
        has_AP_shell,
    } = info;

    if (main_gun_count === 0) return triggerables;

    if (main_gun_count >= 2) triggerables.push('double_attack');
    if (has_sec_gun) triggerables.push('Sec_CI');
    if (has_sec_gun && has_radar) triggerables.push('Radar_CI');
    if (has_sec_gun && has_AP_shell) triggerables.push('AP_Sec_CI');
    if (main_gun_count >= 2 && has_AP_shell) triggerables.push('AP_CI');
    return triggerables;
}