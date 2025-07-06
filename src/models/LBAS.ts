import { AvgLbasProficiency } from "@/types/brands/other";
import { is_jet_bomber_equip, JetBomberEquip, PlayerPlaneEquip } from "./equip/basic";
import { calc_average_lbas_proficiency } from "@/logics/proficiency";

type SquadronBase = {
    readonly slot_count: number,
    readonly proficiency: number,
    readonly lbas_index: number,
    readonly squadron_index: number,
    readonly avg_lbas_proficiency: AvgLbasProficiency,
}

/** 航空隊 */
export type Squadron = SquadronBase & {
    readonly plane: PlayerPlaneEquip,
    
}

/** ジェット爆撃航空隊 */
export type JetSquadron = SquadronBase & {
    readonly plane: JetBomberEquip,
}

/** 基地航空隊 */
export type LBAS = {
    readonly squadrons: Squadron[],
    readonly hp: number,
    readonly armor: number,
}

function is_jet_squadron(squadron: Squadron): squadron is JetSquadron {
    return is_jet_bomber_equip(squadron.plane);
}

/**
 * 航空隊からジェット爆撃航空隊を抽出して返す
 * @param squadrons 
 * @returns 
 */
export function extract_jet_squadrons(squadrons: Squadron[]): JetSquadron[] {
    return squadrons.filter(is_jet_squadron);
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

    const avg_lbas_proficiency = calc_average_lbas_proficiency(units);

    const squadrons: Squadron[] = units.flatMap((unit, index) => {
        return {
            plane: unit,
            slot_count: slot_counts[index],
            proficiency: unit.plane_proficiency,
            lbas_index: lbas_index,
            squadron_index: index,
            avg_lbas_proficiency: avg_lbas_proficiency,
        }
    })
    return {
        squadrons: squadrons,
        hp: 200,
        armor: 0,
    }
}