import { Equip } from "./basic"

export type EquipBuilt = {
    equip: Equip | null,
    slot_count: number, // スライドがあるので航空機でなくても持たせる
    original_slot_count: number,
}

export function derive_equip_built(
    equips: Equip[],
    slots: readonly number[],
): EquipBuilt[] { // ひとまずslotの数に合わせる
    // TODO: 増設とかの調停
    return slots.map((slot_count, index) => {
        return {
            equip: equips[index] ?? null,
            slot_count,
            original_slot_count: slot_count,
        };
    });
}