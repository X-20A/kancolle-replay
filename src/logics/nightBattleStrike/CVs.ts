import { EquippedShip } from "@/models/ship/equipped";
import { EquipSlot, is_equip_exsist } from "@/models/ship/EquipSlot";
import { NightBattleStrikeType } from ".";

/// 空母夜襲CI

type PreInfo = {
    fuze_Suisei_count: number,
    fighter_count: number,
    torpedo_bomber_count: number,
    bomber_count: number,
    bomber_dualrole: number,
}

const calc_pre_info = (
    equip_slots: EquipSlot[],
): PreInfo => {
    return equip_slots.reduce((total, slot) => {
        const { equip } = slot;
        if (!is_equip_exsist(equip)) return total;

        const { skill_trigger_type: skill_type } = equip;
        if (equip.name_jp === '彗星一二型(三一号光電管爆弾搭載機)') total.fuze_Suisei_count++;
        if (skill_type === 'B_NIGHT_FIGHTER') total.fighter_count++;
        if (skill_type === 'B_NIGHT_TORPEDO_BOMBER') total.torpedo_bomber_count++;
        if (skill_type === 'B_NIGHT_BOMBER') total.bomber_count++;
        if (skill_type === 'B_NIGHT_BOMBER_DUALROLE') total.bomber_dualrole++;
        return total;
    }, {
        fuze_Suisei_count: 0,
        fighter_count: 0,
        torpedo_bomber_count: 0,
        bomber_count: 0,
        bomber_dualrole: 0,
    } as PreInfo);
}

export function calc_CVs_night_battle_CI_types(
    ship: EquippedShip,
): NightBattleStrikeType[] {
    const {
        fuze_Suisei_count,
        fighter_count,
        torpedo_bomber_count,
        bomber_count,
        bomber_dualrole,
    } = calc_pre_info(ship.equip_slots);
    const night_plane_count =
        fighter_count + bomber_count + torpedo_bomber_count;

    const types: NightBattleStrikeType[] = [];
    if (
        fighter_count >= 2 &&
        torpedo_bomber_count >= 1
    ) types.push('CVCI_FFA');
    if (
        fighter_count >= 1 &&
        torpedo_bomber_count
    ) types.push('CVCI_FA');
    if (
        fuze_Suisei_count + bomber_count >= 1 &&
        night_plane_count + fuze_Suisei_count >= 2
    ) types.push('CVCI_FB');
    if (
        fighter_count >= 1 &&
        night_plane_count + bomber_dualrole >= 3
    ) types.push('CVCI_F_DUAL');
    return types;
}