import { AbyssalEquip, AbyssalOtherEquip, AbyssalPlaneEquip, Equip, is_abyssal_equip, is_player_equip, PlaneEquip, PlayerEquip, PlayerOtherEquip, PlayerPlaneEquip } from "../equip/basic"

// TODO: 増設とかの調停
type EquipSlotBase<T extends PlayerEquip | AbyssalEquip> = {
    slot_count: number; // スライドがあるので航空機でなくても持たせる
    original_slot_count: number;
    equip: T | null;
}

export type PlayerEquipSlot = EquipSlotBase<PlayerEquip>;
export type AbyssalEquipSlot = EquipSlotBase<AbyssalEquip>;
export type EquipSlot = PlayerEquipSlot | AbyssalEquipSlot;

function derive_equip_slots<T extends PlayerEquip | AbyssalEquip>(
    equips: T[],
    slots: readonly number[]
): EquipSlotBase<T>[] {
    return slots.map((slot_count, index) => ({
        equip: equips[index] ?? null,
        slot_count,
        original_slot_count: slot_count,
    }));
}

export function derive_player_equip_built(
    equips: Equip[],
    slots: readonly number[]
): PlayerEquipSlot[] {
    if (!equips.every(is_player_equip)) throw new Error('艦娘の装備に深海の装備が含まれています');
    return derive_equip_slots(equips, slots);
}

export function derive_abyssal_equip_built(
    equips: Equip[],
    slots: readonly number[]
): AbyssalEquipSlot[] {
    if (!equips.every(is_abyssal_equip)) throw new Error('深海棲艦に艦娘の装備が含まれています');
    return derive_equip_slots(equips, slots);
}