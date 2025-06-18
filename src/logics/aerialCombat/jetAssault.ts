import { is_jet_bomber_equip, JetBomberEquip } from "@/models/equip/basic";
import { LBAS } from "@/models/LBAS";

export type JetSlotView = {
    /** 所属していた基地のindex */
    base_index: number;
    /** 所属していた中隊のindex */
    slot_index: number;
    /** 機体 */
    unit: JetBomberEquip;
}

type LossResult = {
    base_index: number;
    slot_index: number;
    lost_count: number;
};

/**
 * ジェット機スロットだけを抽出したビューを返す
 */
function extract_jet_slots(bases: LBAS[]): JetSlotView[] {
    return bases.flatMap((base, base_index) =>
        base.slots.flatMap((_, slot_index) => {
            const unit = base.equips[slot_index];
            return is_jet_bomber_equip(unit)
                ? [{ base_index, slot_index, unit }]
                : [];
        })
    );
}

/**
 * 被撃墜を反映した新しい基地構造を返す
 */
function apply_losses_to_bases(bases: LBAS[], losses: LossResult[]): LBAS[] {
    return bases.map((base, base_index) => {
        const updated_slots = base.slots.map((slot, slot_index) => {
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