import { PlayerFleetUnit } from "@/models/fleet/FleetUnit";
import { is_equip_exsist, PlayerEquipSlot } from "@/models/ship/EquipSlot";
import { SpecialAttackMods } from "../..";
import { calc_Colorado_special_power_mod } from "./power";
import { calc_Colorado_special_accuracy_mod } from "./accuracy";

export type ColoradoSpecialMultiplierPreInfo = {
    has_surface_radar: boolean,
    has_AP_shell: boolean,
    has_SG_radar_late_model: boolean,
}

export function calc_Colorado_special_pre_info(
    equip_slots: PlayerEquipSlot[],
): ColoradoSpecialMultiplierPreInfo {
    const initial: ColoradoSpecialMultiplierPreInfo = {
        has_surface_radar: false,
        has_AP_shell: false,
        has_SG_radar_late_model: false,
    };

    const pre_info: ColoradoSpecialMultiplierPreInfo = equip_slots.reduce((total, slot) => {
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

export function calc_Colorado_special_mods(
    unit: PlayerFleetUnit,
    pre_info: ColoradoSpecialMultiplierPreInfo,
): SpecialAttackMods {
    const special_attack_power_mod =
        calc_Colorado_special_power_mod(unit, pre_info);
    const special_attack_accuracy_mod =
        calc_Colorado_special_accuracy_mod(pre_info);

    const mods: SpecialAttackMods = {
        special_attack_power_mod,
        special_attack_accuracy_mod,
    };

    return mods;
}