import { EquippedShip, is_install_type } from "@/models/ship/equipped";
import { NightBattleStrikeType } from "..";
import { NightBattleGunShipPreInfo } from ".";
import { EquipSlot } from "@/models/ship/EquipSlot";

/// 駆逐専用夜戦CI

type PreInfo = NightBattleGunShipPreInfo & {
    has_Drum: boolean,
    has_PICKET_category: boolean,
    has_TSSL: boolean,
}

const calc_pre_info = (
    equip_slots: EquipSlot[],
    gun_ship_pre_info: NightBattleGunShipPreInfo,
): PreInfo => {
    const DD_pre_info = equip_slots.reduce((total, slot) => {
        const { equip } = slot;
        if (!equip) return total;
        console.log('equip: ', equip.name_jp);

        const { name_jp: name } = equip;
        if (name === 'ドラム缶(輸送用)') total.has_Drum = true;
        if (equip.type_id === 'PICKET') total.has_PICKET_category = true;
        if (name === '水雷戦隊 熟練見張員') total.has_TSSL = true;
        return total;
    }, {
        has_Drum: false,
        has_PICKET_category: false,
        has_TSSL: false,
    } as PreInfo);

    return {
        ...gun_ship_pre_info,
        ...DD_pre_info,
    };
}

export function calc_DD_night_battle_strike_types(
    attacker_ship: EquippedShip,
    /**
     * UI表示等でtargetを指定しない場合の結果を得たい場合は 'Not specified'
     */
    defender_ship: EquippedShip | 'Not_specified',
    gun_ship_pre_info: NightBattleGunShipPreInfo,
): NightBattleStrikeType[] {
    const types: NightBattleStrikeType[] = [];
    if (attacker_ship.type_id !== 'DD') return types;

    const {
        main_gun_count,
        torpedo_count,
        surface_radar_count,
        has_Drum,
        has_PICKET_category,
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

    // NOTE: 陸上型に対しては、主砲を装備していないと魚雷なしとして判定される
    // https://wikiwiki.jp/kancolle/対地攻撃#AGBehavior > 夜戦
    if (
        defender_ship !== 'Not_specified' &&
        is_install_type(defender_ship) &&
        main_gun_count === 0
    ) return types;
    console.log('has_PICKET_category: ', has_PICKET_category);
    if (
        has_PICKET_category &&
        torpedo_count >= 1 &&
        surface_radar_count >= 1
    ) types.push('DDCI_LTR');
    if (
        has_TSSL &&
        torpedo_count >= 1
    ) types.push('DDCI_TTL');
    if (
        has_TSSL &&
        torpedo_count >= 1 &&
        has_Drum
    ) types.push('DDCI_RDL');
    console.log('types: ', types);

    return types;
}