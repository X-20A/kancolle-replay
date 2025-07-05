import { is_jet_bomber_equip, JetBomberEquip, PlayerPlaneEquip } from "./equip/basic";

/** 航空隊 */
export type Squadron = {
    readonly plane: PlayerPlaneEquip,
    readonly slot_count: number,
    readonly proficiency: number,
    readonly lbas_index: number,
    readonly squadron_index: number,
}

/** ジェット爆撃機航空隊 */
export type JetSquadron = {
    readonly plane: JetBomberEquip,
    readonly slot_count: number,
    readonly proficiency: number,
    readonly lbas_index: number,
    readonly squadron_index: number,
}

/** 基地航空隊 */
export type LBAS = {
    readonly squadrons: Squadron[],
    readonly hp: number,
    readonly armor: number,
}

export function extract_jet_squadrons(squadrons: Squadron[]): JetSquadron[] {
    return squadrons.reduce((total: JetSquadron[], squadron) => {
        if (!is_jet_bomber_equip(squadron.plane)) return total;
        
        total.push({
            plane: squadron.plane,
            slot_count: squadron.slot_count,
            proficiency: squadron.proficiency,
            lbas_index: squadron.lbas_index,
            squadron_index: squadron.squadron_index
        });
        return total;
    }, []);
}

export function derive_LBAS(
    param_units: PlayerPlaneEquip[],
    lbas_index: number,
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
            plane: unit,
            slot_count: slot_counts[index],
            proficiency: 100,
            lbas_index: lbas_index,
            squadron_index: index,
        }
    })
    return {
        squadrons: squadrons,
        hp: 200,
        armor: 0,
    }
}