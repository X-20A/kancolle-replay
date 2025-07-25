import { EquippedShip } from "@/models/ship/equipped";
import { NightBattleStrikeType } from "..";
import { NightBattleGunShipPreInfo } from ".";
import { EquipSlot } from "@/models/ship/EquipSlot";

/// 駆逐専用夜戦CI

type PreInfo = NightBattleGunShipPreInfo & {
    has_Drum: boolean,
    has_SL: boolean,
    has_TSSL: boolean,
}

const calc_pre_info = (
    equip_slots: EquipSlot[],
    gun_ship_pre_info: NightBattleGunShipPreInfo,
): PreInfo => {
    const DD_pre_info = equip_slots.reduce((total, slot) => {
        const { equip } = slot;
        if (!equip) return total;

        const { name_jp: name } = equip;
        if (name === 'ドラム缶(輸送用)') total.has_Drum = true;
        if (name === '熟練見張員') total.has_SL = true;
        if (name === '水雷戦隊 熟練見張員') total.has_TSSL = true;
        return total;
    }, {
        has_Drum: false,
        has_SL: false,
        has_TSSL: false,
    } as PreInfo);

    return {
        ...gun_ship_pre_info,
        ...DD_pre_info,
    };
}

export function calc_DD_night_battle_strike_types(
    attacker_ship: EquippedShip,
    gun_ship_pre_info: NightBattleGunShipPreInfo,
): NightBattleStrikeType[] {
    const types: NightBattleStrikeType[] = [];
    if (attacker_ship.type_id !== 'DD') return types;

    const {
        main_gun_count,
        torpedo_count,
        surface_radar_count,
        has_Drum,
        has_SL,
        has_TSSL,
    } = calc_pre_info(
        attacker_ship.equip_slots,
        gun_ship_pre_info,
    );

    if (
        main_gun_count >= 1 &&
        torpedo_count >= 1 &&
        surface_radar_count >= 1
    ) types.push('DDCI_GTR');
    if (
        has_SL &&
        torpedo_count >= 1 &&
        surface_radar_count >= 1
    ) types.push('DDCI_LTR');
    if (
        has_TSSL &&
        torpedo_count
    ) types.push('DDCI_TTL');
    if (
        has_TSSL &&
        torpedo_count &&
        has_Drum
    ) types.push('DDCI_RDL');

    return types;
}