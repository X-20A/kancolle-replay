import { TStatusComponent } from "@/types";
import { AbyssalEquip, Equip, is_player_equip, PlayerEquip } from "../equip/basic"
import { PlayerNakedShip } from "./naked/base";
import { derive_equip_bonus_addition } from "../equip/EquipBonus";
import { DEFAULT_STATUS_COMPONENT } from "@/datas";

/// 装備スロット

type EquipSlotBase = {
    readonly slot_count: number, // スライドがあるので航空機でなくても持たせる
    readonly original_slot_count: number,
}

export type PlayerEquipSlot = EquipSlotBase & {
    readonly equip: PlayerEquip | 'None',
    readonly slot_index: number | 'ex',
    /** 艦攻装備ボーナス用 */
    readonly equip_bonus: TStatusComponent,
}

export type AbyssalEquipSlot = EquipSlotBase & {
    readonly equip: AbyssalEquip,
    readonly slot_index: number,
};

export type EquipSlot = PlayerEquipSlot | AbyssalEquipSlot;

export type NonEmptyPlayerEquipSlot = EquipSlotBase & {
    readonly equip: PlayerEquip,  // 'None' を削除
    readonly slot_index: number | 'ex',
    readonly equip_bonus: TStatusComponent,
}

export type NonEmptyAbyssalEquipSlot = EquipSlotBase & {
    readonly equip: AbyssalEquip,
    readonly slot_index: number,
}

export type NonEmptyEquipSlot =
    NonEmptyPlayerEquipSlot | NonEmptyAbyssalEquipSlot

export function derive_player_equip_slots(
    ship: PlayerNakedShip,
    normal_equips: (PlayerEquip | 'None')[],
    slot_counts: readonly number[],
    ex_equip: PlayerEquip | 'None',
): PlayerEquipSlot[] {
    if (normal_equips.length > slot_counts.length) throw new Error('スロット数を超える数の装備が渡されました');

    const normal_slots: PlayerEquipSlot[] = slot_counts.map((slot_count, index) => {
        const equip = normal_equips[index] ?? 'None';
        return {
            equip: is_equip_exsist(equip) ? normal_equips[index] : 'None',
            slot_count,
            original_slot_count: slot_count,
            slot_index: index,
            equip_bonus: is_equip_exsist(equip)
                ? derive_equip_bonus_addition(ship, [equip])
                : DEFAULT_STATUS_COMPONENT,
        }
    });

    const ex_slot: PlayerEquipSlot = {
        equip: ex_equip,
        slot_count: 0,
        original_slot_count: 0,
        slot_index: 'ex',
        equip_bonus: is_equip_exsist(ex_equip)
            ? derive_equip_bonus_addition(ship, [ex_equip])
            : DEFAULT_STATUS_COMPONENT,
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

export function is_non_empty_player_equip_slot(
    equip_slot: PlayerEquipSlot,
): equip_slot is NonEmptyPlayerEquipSlot {
    return is_equip_exsist(equip_slot.equip);
}

export function is_non_empty_abyssal_equip_slot(
    equip_slot: AbyssalEquipSlot,
): equip_slot is NonEmptyAbyssalEquipSlot {
    return is_equip_exsist(equip_slot.equip);
}

export function is_player_equip_slot(
    equip_slot: EquipSlot,
): equip_slot is PlayerEquipSlot {
    return is_equip_exsist(equip_slot.equip) &&
        is_player_equip(equip_slot.equip);
}

export function is_player_equip_slots(
    equip_slots: EquipSlot[],
): equip_slots is PlayerEquipSlot[] {
    return equip_slots.every(is_player_equip_slot);
}

export function convert_non_empty_player_equip_slots(
    equip_slots: PlayerEquipSlot[],
): NonEmptyPlayerEquipSlot[] {
    return equip_slots.flatMap(slot => {
        return is_non_empty_player_equip_slot(slot)
            ? slot
            : [];
    });
}

export function convert_non_empty_abyssal_equip_slots(
    equip_slots: AbyssalEquipSlot[],
): NonEmptyAbyssalEquipSlot[] {
    return equip_slots.flatMap(slot => {
        return is_non_empty_abyssal_equip_slot(slot)
            ? slot
            : [];
    });
}