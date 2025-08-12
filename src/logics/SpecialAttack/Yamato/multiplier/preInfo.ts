import { is_AP_shell, is_radar_XL, is_surface_radar } from "@/models/equip/basic";
import { is_equip_exsist, PlayerEquipSlot } from "@/models/ship/EquipSlot";

export type YamatoSpecialPreInfo = {
    has_surface_radar: boolean,
    has_radar_XL: boolean,
    has_AP_shell: boolean,
}
const INITIAL: YamatoSpecialPreInfo = {
    has_surface_radar: false,
    has_radar_XL: false,
    has_AP_shell: false,
};

export function calc_Yamato_special_pre_info(
    equip_slots: PlayerEquipSlot[],
): YamatoSpecialPreInfo {
    const pre_info: YamatoSpecialPreInfo = equip_slots.reduce((total, slot) => {
        const { equip } = slot;
        if (!is_equip_exsist(equip)) return total;

        if (is_surface_radar(equip)) total.has_surface_radar = true;
        if (is_radar_XL(equip)) total.has_radar_XL = true;
        if (is_AP_shell(equip)) total.has_AP_shell = true;

        return total;
    }, INITIAL);

    return pre_info;
}