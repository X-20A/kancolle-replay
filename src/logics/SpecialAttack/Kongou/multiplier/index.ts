import { has_equip_name } from "@/models/equip/basic";
import { PlayerFleetUnit } from "@/models/fleet/FleetUnit";
import { is_equip_exsist, PlayerEquipSlot } from "@/models/ship/EquipSlot";
import { PlayerEquipNameJP } from "@/types/equip/playerNameJP";
import { SpecialAttackMods } from "../..";
import { calc_Kongou_special_power_mod } from "./power";
import { calc_Kongou_special_accuracy_mod } from "./accuracy";
import { EngagementType } from "@/logics/engagemenet";

const VALID_GUN_NAMES: Set<PlayerEquipNameJP> = new Set([
    '35.6cm連装砲改四',
    '35.6cm連装砲改三丙',
]);

export type KongouSpecialMultiplierPreInfo = {
    valid_gun_count: number,
}

export function calc_Kongou_special_pre_info(
    equip_slots: PlayerEquipSlot[],
): KongouSpecialMultiplierPreInfo {
    const valid_gun_count = equip_slots.filter(slot => 
        is_equip_exsist(slot.equip) &&
        has_equip_name(VALID_GUN_NAMES, slot.equip.name_jp)
    ).length;

    const pre_info: KongouSpecialMultiplierPreInfo = {
        valid_gun_count,
    };

    return pre_info;
}

const calc_Kongou_special_mods_core = (
    engagement_type: EngagementType,
    pre_info: KongouSpecialMultiplierPreInfo,
): SpecialAttackMods => {
    const special_attack_power_mod =
        calc_Kongou_special_power_mod(pre_info, engagement_type);
    const special_attack_accuracy_mod =
        calc_Kongou_special_accuracy_mod();

    const mods: SpecialAttackMods = {
        special_attack_power_mod,
        special_attack_accuracy_mod,
    };

    return mods;
}

export function calc_Kongou_special_mods(
    engagement_type: EngagementType,
    unit: PlayerFleetUnit,
): SpecialAttackMods {
    const pre_info =
        calc_Kongou_special_pre_info(unit.ship.equip_slots);

    return calc_Kongou_special_mods_core(
        engagement_type,
        pre_info,
    );
}