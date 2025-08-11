import { is_equip_exsist, PlayerEquipSlot } from "@/models/ship/EquipSlot";

export type KongouSpecialMultiplierPreInfo = {
    has_surface_radar: boolean,
    has_AP_shell: boolean,
    has_SG_radar_late_model: boolean,
}

export function calc_Kongou_special_pre_info(
    equip_slots: PlayerEquipSlot[],
): KongouSpecialMultiplierPreInfo {
    const initial: KongouSpecialMultiplierPreInfo = {
        has_surface_radar: false,
        has_AP_shell: false,
        has_SG_radar_late_model: false,
    };

    const pre_info: KongouSpecialMultiplierPreInfo = equip_slots.reduce((total, slot) => {
        const { equip } = slot;
        if (!is_equip_exsist(equip)) return total;

        if (
            equip.skill_trigger_type === 'B_RADAR'
        ) total.has_surface_radar = true;
        if (
            equip.skill_trigger_type === 'B_AP_SHELL'
        ) total.has_AP_shell = true;
        if (
            equip.name_jp === 'SG レーダー(後期型)'
        ) total.has_SG_radar_late_model = true;

        return total;
    }, initial);

    return pre_info;
}