import { AbyssalEquip, Equip, is_abyssal_equip, is_player_equip, PlayerEquip } from "../equip/basic"

// TODO: 増設とかの調停
type EquipSlotBase<T extends PlayerEquip | AbyssalEquip> = {
    readonly slot_count: number, // スライドがあるので航空機でなくても持たせる
    readonly original_slot_count: number,
    readonly equip: T | null,
    readonly slot_index: number,
}

// ? 装備スロットまで 艦娘 | 深海 を分ける必要あるか？ここで吸収してもいいかも
export type PlayerEquipSlot = EquipSlotBase<PlayerEquip>;
export type AbyssalEquipSlot = EquipSlotBase<AbyssalEquip>;
export type EquipSlot = PlayerEquipSlot | AbyssalEquipSlot;

function derive_equip_slots<T extends PlayerEquip | AbyssalEquip>(
    /** 実機とは違って中空を許容する */
    equips: (T | null)[],
    slots: readonly number[]
): EquipSlotBase<T>[] {
    return slots.map((slot_count, index) => ({
        equip: equips[index],
        slot_count,
        original_slot_count: slot_count,
        slot_index: index,
    }));
}

export function derive_player_equip_slot(
    equips: Equip[],
    slots: readonly number[]
): PlayerEquipSlot[] {
    if (!equips.every(is_player_equip)) throw new Error('艦娘の装備に深海の装備が含まれています');
    return derive_equip_slots(equips, slots);
}

export function derive_abyssal_equip_slot(
    equips: Equip[],
    slots: readonly number[]
): AbyssalEquipSlot[] {
    if (!equips.every(is_abyssal_equip)) throw new Error('深海棲艦に艦娘の装備が含まれています');
    return derive_equip_slots(equips, slots);
}

/**
 * 装備スロットが空であるか判定して返す
 * @param slot 
 * @returns 
 */
export function is_slot_empty(
    slot: EquipSlot,
): boolean {
    return slot.equip === null;
}