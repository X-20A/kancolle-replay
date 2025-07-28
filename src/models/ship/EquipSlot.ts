import { AbyssalEquip, Equip, PlayerEquip } from "../equip/basic"

/// 装備スロット

type EquipSlotBase = {
    readonly slot_count: number, // スライドがあるので航空機でなくても持たせる
    readonly original_slot_count: number,
}

export type PlayerEquipSlot = EquipSlotBase & {
    readonly equip: PlayerEquip | 'None',
    readonly slot_index: number | 'ex',
}

export type AbyssalEquipSlot = EquipSlotBase & {
    readonly equip: AbyssalEquip,
    readonly slot_index: number,
};
export type EquipSlot = PlayerEquipSlot | AbyssalEquipSlot;

export function derive_player_equip_slots(
    normal_equips: (PlayerEquip | 'None')[],
    slots: readonly number[],
    ex_equip: PlayerEquip | 'None',
): PlayerEquipSlot[] {
    if (normal_equips.length > slots.length) throw new Error('スロット数を超える数の装備が渡されました');

    const normal_slots = slots.map((slot_count, index) => ({
        equip: normal_equips[index] ?? 'None',
        slot_count,
        original_slot_count: slot_count,
        slot_index: index,
    }));

    const ex_slot: PlayerEquipSlot = {
        equip: ex_equip,
        slot_count: 0,
        original_slot_count: 0,
        slot_index: 'ex',
    }

    return [
        ...normal_slots,
        ex_slot,
    ];
}

export function derive_abyssal_equip_slots(
    equips: AbyssalEquip[],
    slots: readonly number[],
): AbyssalEquipSlot[] {
    if (equips.length > slots.length) throw new Error('スロット数を超える数の装備が渡されました');

    return slots.map((slot_count, index) => ({
        equip: equips[index],
        slot_count,
        original_slot_count: slot_count,
        slot_index: index,
    }));
}

/**
 * 装備スロットが空であるか判定して返す
 * @param slot 
 * @returns 
 */
export function is_equip_exsist(
    equip: Equip | 'None',
): equip is Equip {
    return equip !== 'None';
}