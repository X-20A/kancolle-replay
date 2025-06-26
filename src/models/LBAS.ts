import { JetBomberEquip, PlayerPlaneEquip } from "./equip/basic";

export type Squadron = {
    readonly unit: PlayerPlaneEquip,
    readonly slot_count: number,
    readonly proficiency: number,
}

export type LBAS = {
    readonly squadrons: Squadron[],
    readonly hp: number,
    readonly armor: number,
}

export type JetOnlySquadron = {
    readonly unit: JetBomberEquip,
    readonly slot_count: number,
    readonly original_lbas_average_proficiency: number,
    readonly original_lbas_index: number,
    readonly original_squadron_index: number,
}

export function derive_LBAS(
    param_units: PlayerPlaneEquip[],
    edit_slot_counts?: readonly number[],
): LBAS {
    const DEFAULT_LBAS_SLOTS: readonly number[] = [18, 18, 18, 18];
    const units = param_units.length >= 5 ? param_units.slice(0, 4) : param_units;

    const slot_counts = edit_slot_counts
        ? [
            ...edit_slot_counts.slice(0, 4),
            ...DEFAULT_LBAS_SLOTS.slice(edit_slot_counts.length) // 空きがあれば埋めて
        ].slice(0, 4)  // 最終的に4要素に制限
        : DEFAULT_LBAS_SLOTS;

    const squadrons: Squadron[] = units.flatMap((unit, index) => {
        return {
            unit: unit,
            slot_count: slot_counts[index],
            proficiency: 100,
        }
    })
    return {
        squadrons: squadrons,
        hp: 200,
        armor: 0,
    }
}