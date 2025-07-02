import { AbyssalEquip, Equip, is_abyssal_equip, is_player_equip, PlayerEquip } from "./basic"

// TODO: 増設とかの調停
type EquipBuiltBase<T> = {
    slot_count: number; // スライドがあるので航空機でなくても持たせる
    original_slot_count: number;
    equip: T | null;
}

export type PlayerEquipBuilt = EquipBuiltBase<PlayerEquip>;
export type AbyssalEquipBuilt = EquipBuiltBase<AbyssalEquip>;
export type EquipBuilt = PlayerEquipBuilt | AbyssalEquipBuilt;

function create_equip_built_array<T>(
    equips: T[],
    slots: readonly number[]
): Array<EquipBuiltBase<T>> {
    return slots.map((slot_count, index) => ({
        equip: equips[index] ?? null,
        slot_count,
        original_slot_count: slot_count,
    }));
}

export function derive_player_equip_built(
    equips: Equip[],
    slots: readonly number[]
): PlayerEquipBuilt[] {
    if (!equips.every(is_player_equip)) throw new Error('艦娘の装備に深海の装備が含まれています');
    return create_equip_built_array(equips, slots);
}

export function derive_abyssal_equip_built(
    equips: Equip[],
    slots: readonly number[]
): AbyssalEquipBuilt[] {
    if (!equips.every(is_abyssal_equip)) throw new Error('深海棲艦に艦娘の装備が含まれています');
    return create_equip_built_array(equips, slots);
}