import { is_jet_bomber, JetBomberEquip } from "@/models/equip/basic";
import { EquipSlot } from "@/models/ship/EquipSlot";

const calc_placement_cost = (
    jet: JetBomberEquip,
): number => {
    const name = jet.name_jp;
    if (name === '橘花改') return 13;
    if (name === '噴式景雲改') return 14;
    if (name === 'Ho229') return 14;
    throw new Error(`${name} の配置コストが未設定です`);
}

export function calc_jet_assault_cost(
    slot: EquipSlot,
): number {
    const equip = slot.equip;
    if (!equip || !is_jet_bomber(equip)) return 0;

    const placement_cost = calc_placement_cost(equip);
    return slot.slot_count * placement_cost * 0.2;
}