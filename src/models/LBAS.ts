import { AvgLbasProficiency } from "@/types/brands/other";
import { is_jet_bomber, JetBomberEquip, PlayerPlaneEquip } from "./equip/basic";
import { calc_average_proficiency } from "@/logics/proficiency";

type SquadronBase = {
    /** 航空隊機数 */
    readonly slot_count: number,
    /** 航空隊熟練度 */
    readonly proficiency: number,
    /** 基地航空隊 index */
    readonly lbas_index: number,
    /** 航空中隊内でのindex */
    readonly squadron_index: number,
    /** 基地の平均航空機熟練度 */
    readonly avg_lbas_proficiency: AvgLbasProficiency,
}

/** 航空隊 */
export type Squadron = SquadronBase & {
    /**
     * 機体    
     * planeとしたいがEquipSlotと互換が効いたほうが便利
     */
    readonly equip: PlayerPlaneEquip,
}

/** ジェット爆撃航空隊 */
export type JetSquadron = SquadronBase & {
    readonly equip: JetBomberEquip,
}

/** 基地航空隊 */
export type LBAS = {
    readonly squadrons: Squadron[],
    /** 出撃Node */
    readonly target_node: [number, number],
    readonly hp: number,
    readonly armor: number,
}

function is_jet_squadron(squadron: Squadron): squadron is JetSquadron {
    return is_jet_bomber(squadron.equip);
}

/**
 * 航空隊からジェット爆撃航空隊を抽出して返す
 * @param squadrons 
 * @returns 
 */
export function extract_jet_squadrons(squadrons: Squadron[]): JetSquadron[] {
    return squadrons.filter(is_jet_squadron);
}

/**
 * 基地航空隊の出撃Nodeを更新して返す
 * @param lbas 
 * @param new_nodes 
 * @returns 
 */
export function calc_updated_target_node_LBAS(
    lbas: LBAS,
    new_nodes: [number, number],
): LBAS {
    return {
        ...lbas,
        target_node: new_nodes,
    };
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

    const avg_lbas_proficiency = calc_average_proficiency(units);

    const squadrons: Squadron[] = units.flatMap((unit, index) => {
        return {
            equip: unit,
            slot_count: slot_counts[index],
            proficiency: unit.plane_proficiency,
            lbas_index: lbas_index,
            squadron_index: index,
            avg_lbas_proficiency: avg_lbas_proficiency,
        }
    })
    return {
        squadrons: squadrons,
        target_node: [0,0],
        hp: 200,
        armor: 0,
    }
}