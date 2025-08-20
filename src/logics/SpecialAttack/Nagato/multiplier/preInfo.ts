import { is_AP_shell, is_surface_radar } from "@/models/equip/basic";
import { is_equip_exsist, PlayerEquipSlot } from "@/models/ship/EquipSlot";

/// 長門タッチ 補正計算準備

export type NagatoSpecialMultiplierPreInfo = {
    has_surface_radar: boolean,
    has_AP_shell: boolean,
}
const INITIAL: NagatoSpecialMultiplierPreInfo = {
    has_surface_radar: false,
    has_AP_shell: false,
};

export function calc_Nagato_special_pre_info(
    equip_slots: PlayerEquipSlot[],
): NagatoSpecialMultiplierPreInfo {
    const pre_info: NagatoSpecialMultiplierPreInfo = equip_slots.reduce((total, slot) => {
        const { equip } = slot;
        if (!is_equip_exsist(equip)) return total;

        if (
            is_surface_radar(equip)
        ) total.has_surface_radar = true;
        if (
            is_AP_shell(equip)
        ) total.has_AP_shell = true;

        return total;
    }, { ...INITIAL });

    return pre_info;
}