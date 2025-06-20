import { is_jet_bomber_equip, JetBomberEquip } from "@/models/equip/basic";
import { LBAS } from "@/models/LBAS";

export type JetSlotView = {
    /** 所属していた基地のindex */
    original_base_index: number;
    /** 所属していた中隊のindex */
    original_slot_index: number;
    /** 機体 */
    unit: JetBomberEquip;
    /** スロット数 */
    slot_count: number,
}

export type JetOnlyLBAS = {
    readonly units: JetBomberEquip[],
    readonly slot_counts: readonly number[],
    readonly original_base_indexes: number[],
    readonly original_slot_indexes: number[],
}

/**
 * ジェット機スロットだけを抽出した基地航空隊を返す
 */
export function derive_jet_only_lbas(bases: LBAS[]): JetOnlyLBAS {
    const jet_units: JetBomberEquip[] = [];
    const slot_counts: number[] = [];
    const original_base_indexes: number[] = [];
    const original_slot_indexes: number[] = [];

    bases.forEach((base, base_index) => {
        base.units.forEach((unit, slot_index) => {
            if (is_jet_bomber_equip(unit)) {
                jet_units.push(unit);
                slot_counts.push(base.slot_counts[slot_index]);
                original_base_indexes.push(base_index);
                original_slot_indexes.push(slot_index);
            }
        });
    });

    return {
        units: jet_units,
        slot_counts,
        original_base_indexes,
        original_slot_indexes,
    };
}

type LossResult = {
    base_index: number;
    slot_index: number;
    lost_count: number;
};

/**
 * 被撃墜を反映した新しい基地構造を返す
 */
function apply_losses_to_bases(bases: LBAS[], losses: LossResult[]): LBAS[] {
    return bases.map((base, base_index) => {
        const updated_slots = base.slot_counts.map((slot, slot_index) => {
            const loss = losses.find(loss =>
                loss.base_index === base_index
                && loss.slot_index === slot_index
            );

            if (!loss) return slot;  // 該当する損失がない場合は現在のスロット数を返す

            return Math.max(slot - loss.lost_count, 0);
        });

        return {
            ...base,
            slots: updated_slots,
        };
    });
}