import { is_jet_bomber, JetBomberEquip } from "@/models/equip/basic";
import { JetSquadron } from "@/models/LBAS";
import { EquipSlot } from "@/models/ship/EquipSlot";

/**
 * 噴式機の基地配置コストを返す
 * @param jet 
 * @returns 
 */
const calc_placement_cost = (
    jet: JetBomberEquip,
): number => {
    const name = jet.name_jp;
    if (name === '橘花改') return 13;
    if (name === '噴式景雲改') return 14;
    if (name === 'Ho229') return 14;
    throw new Error(`${name} の配置コストが未設定です`);
}

/**
 * ジェット航空隊の噴式強襲コストを返す
 * @param squadrons 
 * @returns 
 */
export function calc_jet_assault_cost(
    squadrons: JetSquadron[],
): number {
    return squadrons.reduce((total, squadron) => {
        const placement_cost = calc_placement_cost(squadron.equip);
        return total + squadron.slot_count * placement_cost * 0.2;
    }, 0);
}