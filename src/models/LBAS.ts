import { PlaneEquip } from "./equip/basic";

export type LBAS = {
    readonly units: PlaneEquip[],
    readonly slot_counts: readonly number[],
    readonly hp: number,
    readonly armor: number,
}

export function derive_LBAS(
    equips: PlaneEquip[],
    edit_slots?: readonly number[],
): LBAS {
    const DEFAULT_LBAS_SLOTS: readonly number[] = [18, 18, 18, 18]
    return {
        units: equips,
        slot_counts: edit_slots ?? DEFAULT_LBAS_SLOTS,
        hp: 200,
        armor: 0,
    }
}