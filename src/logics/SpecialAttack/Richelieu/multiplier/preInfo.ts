import { is_AP_shell, is_surface_radar } from "@/models/equip/basic";
import { is_equip_exsist, PlayerEquipSlot } from "@/models/ship/EquipSlot";

export type RichelieuSpecialMultiplierPreInfo = {
    has_surface_radar: boolean,
    has_AP_shell: boolean,
}
const INITIAL: RichelieuSpecialMultiplierPreInfo = {
    has_surface_radar: false,
    has_AP_shell: false,
};

export function calc_Richelieu_special_pre_info(
    equip_slots: PlayerEquipSlot[],
): RichelieuSpecialMultiplierPreInfo {
    const pre_info: RichelieuSpecialMultiplierPreInfo = equip_slots.reduce((total, slot) => {
        const { equip } = slot;
        if (!is_equip_exsist(equip)) return total;

        if (
            is_surface_radar(equip)
        ) total.has_surface_radar = true;
        if (
            is_AP_shell(equip)
        ) total.has_AP_shell = true;

        return total;
    }, INITIAL);

    return pre_info;
}