import { EquipSlot } from "@/models/ship/EquipSlot";
import { ArtillerySpottingType } from "./artillerySpotting";
import { EquippedShip, is_player_ship } from "@/models/ship/equipped";

type PreInfo = {
    main_gun_count: number,
    has_sec_gun: boolean,
    has_radar: boolean,
    has_AP_shell: boolean,
}

const calc_pre_info = (
    equip_slots: EquipSlot[],
): PreInfo => {
    return equip_slots.reduce((acc, slot) => {
        const { equip } = slot;
        if (!equip) return acc;

        const skill_type = equip.skill_trigger_type;
        if (skill_type === 'B_MAINGUN') acc.main_gun_count++; // 小中大いずれでも可
        if (skill_type === 'B_SECGUN') acc.has_sec_gun = true;
        if (skill_type === 'B_RADAR') acc.has_radar = true;
        if (skill_type === 'B_APSHELL') acc.has_AP_shell = true;
        return acc;
    }, {
        main_gun_count: 0,
        has_sec_gun: false,
        has_radar: false,
        has_AP_shell: false,
    } as PreInfo);
}

const is_valid_recon = (
    slot: EquipSlot,
): boolean => {
    return slot.equip !== null &&
        slot.equip.skill_trigger_type === 'B_RECON' &&
        slot.slot_count >= 1;
}

const calc_Ise_class_CI = (
    attacker_ship: EquippedShip,
    main_gun_count: number,
): ArtillerySpottingType[] => {
    const triggerables: ArtillerySpottingType[] = [];
    if (
        !is_player_ship(attacker_ship) ||
        !attacker_ship.flags.has_potential_zuiun_CI ||
        main_gun_count === 0
    ) return triggerables;

    const { equip_slots } = attacker_ship;
    const {
        zuiun_count,
        suisei_count,
    } = equip_slots.reduce((total, slot) => {
        const { equip } = slot;
        if (!equip || slot.slot_count === 0) return total;

        if (
            equip.type_id === 'SEAPLANE_BOMBER' &&
            equip.name_jp.includes('瑞雲') // IDや名前よりこっちのがいい、かな？
        ) total.zuiun_count++;
        if (
            equip.type_id === 'DIVE_BOMBER' &&
            equip.name_jp.includes('六三四空')
        ) total.suisei_count++;
        return total;
    }, {
        zuiun_count: 0,
        suisei_count: 0,
    });

    if (zuiun_count >= 2) triggerables.push('Zuiun_CI');
    if (suisei_count >= 2) triggerables.push('Suisei_CI');
    return triggerables;
}

export function calc_gun_ship_artillery_spotting_types(
    attacker_ship: EquippedShip,
): ArtillerySpottingType[] {
    const triggerables: ArtillerySpottingType[] = [];
    const { equip_slots } = attacker_ship;

    const has_valid_recon = equip_slots.some(is_valid_recon);
    if (!has_valid_recon) return triggerables;

    const info = calc_pre_info(equip_slots);
    const {
        main_gun_count,
        has_sec_gun,
        has_radar,
        has_AP_shell,
    } = info;

    if (main_gun_count === 0) return triggerables;

    const Ise_class_CIs = calc_Ise_class_CI(attacker_ship, main_gun_count);
    triggerables.concat(Ise_class_CIs);

    if (main_gun_count >= 2) triggerables.push('double_attack');
    if (has_sec_gun) triggerables.push('Sec_CI');
    if (has_sec_gun && has_radar) triggerables.push('Radar_CI');
    if (has_sec_gun && has_AP_shell) triggerables.push('AP_Sec_CI');
    if (main_gun_count >= 2 && has_AP_shell) triggerables.push('AP_CI');
    return triggerables;
}