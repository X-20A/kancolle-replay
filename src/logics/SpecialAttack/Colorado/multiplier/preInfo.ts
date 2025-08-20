import { is_AP_shell, is_surface_radar } from "@/models/equip/basic";
import { is_equip_exsist, PlayerEquipSlot } from "@/models/ship/EquipSlot";

/// Coloradoタッチ 補正計算準備

export type ColoradoSpecialMultiplierPreInfo = {
    has_surface_radar: boolean,
    has_AP_shell: boolean,
    has_SG_radar_late_model: boolean,
}
const INITIAL: ColoradoSpecialMultiplierPreInfo = {
    has_surface_radar: false,
    has_AP_shell: false,
    has_SG_radar_late_model: false,
};

export function calc_Colorado_special_pre_info(
    equip_slots: PlayerEquipSlot[],
): ColoradoSpecialMultiplierPreInfo {
    const pre_info: ColoradoSpecialMultiplierPreInfo = equip_slots.reduce((total, slot) => {
        const { equip } = slot;
        if (!is_equip_exsist(equip)) return total;

        if (
            is_surface_radar(equip)
        ) total.has_surface_radar = true;
        if (
            is_AP_shell(equip)
        ) total.has_AP_shell = true;
        if (
            equip.name_jp === 'SG レーダー(後期型)'
        ) total.has_SG_radar_late_model = true;

        return total;
    }, { ...INITIAL });

    return pre_info;
}