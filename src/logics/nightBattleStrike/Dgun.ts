import { EquipSlot } from "@/models/ship/EquipSlot";
import { NightBattleStrikeType } from ".";

/// 12.7cm連装砲D型改二 | 12.7cm連装砲D型改三 補正

type PreInfo = {
    D_2_count: number,
    D_2_3_count: number,
}

const calc_pre_info = (
    equip_slot: EquipSlot[],
): PreInfo => {
    return equip_slot.reduce((total, slot) => {
        const { equip } = slot;
        if (!equip) return total;

        const { name_jp: name } = equip;
        if (name === '12.7cm連装砲D型改二') total.D_2_count++;
        if (name === '12.7cm連装砲D型改三') {
            total.D_2_count++;
            total.D_2_3_count++;
        }

        return total;
    }, {
        D_2_count: 0,
        D_2_3_count: 0,
    } as PreInfo);
}

export function calc_D_gun_mod(
    strike_type: NightBattleStrikeType,
    equip_slot: EquipSlot[],
): number {
    const VALID_CI_TYPES: NightBattleStrikeType[] = [
        'DDCI_GTR',
        'DDCI_LTR',
    ];
    if (!VALID_CI_TYPES.includes(strike_type)) return 1;

    const {
        D_2_count,
        D_2_3_count,
    } = calc_pre_info(equip_slot);

    let mod = 1;
    if (D_2_count === 1) mod *= 1.25;
    else if (D_2_count >= 2) mod *= 1.4;

    if (D_2_3_count === 1) mod *= 1.05;
    else if (D_2_3_count >= 2) mod *= 1.1;

    return mod;
}