import { EquipSlot, is_non_empty_equip_slot, is_player_equip_slot, NonEmptyEquipSlot } from "@/models/ship/EquipSlot";
import { PlayerEquipNameJP } from "@/types/equip/playerNameJP"

/**
 * 対地艦爆    
 * https://en.kancollewiki.net/Category:Anti-Installation_Dive_Bombers    
 * https://wikiwiki.jp/kancolle/対地攻撃#AGCalcCV > 対地艦爆に該当する装備
 */
const ANTI_INSTALLATION_DIVE_BOMBER_NAMES: Set<PlayerEquipNameJP> = new Set([
    '彗星一二型(六三四空/三号爆弾搭載機)',
    '彗星一二型(三一号光電管爆弾搭載機)',
    '九九式艦爆二二型',
    '九九式艦爆二二型(熟練)',
    '試製南山',
    'FM-2',
    'F4U-1D',
    'F4U-4',
    'SB2C-3',
    'SB2C-5',
    'Ju87C改',
    'Ju87C改二(KMX搭載機)',
    'Ju87C改二(KMX搭載機/熟練)',
    '試製 明星(増加試作機)',
    '明星改',
    'SBD(Yellow Wings)',
    'SBD VB-2(爆撃飛行隊)',
    '九九式練爆二二型改(夜間装備実験機)',
]);

const calc_total_aerial_bomb = (
    slot: NonEmptyEquipSlot,
): number => {
    if (!is_player_equip_slot(slot)) return slot.equip.total_addtion.aerial_bomb_power;

    return (
        + slot.equip.total_addtion.aerial_bomb_power
        + slot.equip_bonus.aerial_bomb_power
    );
}

// TODO: 要テスト
export function calc_aerial_bomb_power(
    equip_slots: EquipSlot[],
): number {
    return equip_slots.reduce((total, slot) => {
        if (!is_non_empty_equip_slot(slot)) return total;

        const { equip } = slot;
        if (
            equip.type_id === 'DIVE_BOMBER' &&
            !ANTI_INSTALLATION_DIVE_BOMBER_NAMES.has(equip.name_jp)
        ) return total;

        total += calc_total_aerial_bomb(slot);

        return total;
    }, 0);
}