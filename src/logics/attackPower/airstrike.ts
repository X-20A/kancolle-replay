import { calc_equip_improvement_addition, can_bombing, includes_player_equip_name, is_dive_bomber, is_plane_equip, is_player_equip, is_torpedo_bomber, PlaneEquip } from "@/models/equip/basic";
import { VaidAirstrikeCombination } from "../target/airstrike";
import { match } from "ts-pattern";
import { is_install_type } from "@/models/ship/equipped";
import { RawBasePowerResult } from "./LBAS/basePower";
import { convert_non_empty_player_equip_slots, EquipSlot, is_equip_exsist, is_non_empty_player_equip_slot, is_player_equip_slots, NonEmptyPlayerEquipSlot, PlayerEquipSlot } from "@/models/ship/EquipSlot";
import { ShipSquadron } from "@/models/LBAS";
import { PlayerEquipNameJP } from "@/types/equip/playerNameJP";

const calc_base = (
    combination: VaidAirstrikeCombination,
): RawBasePowerResult => {
const {
        attacker_squadron,
        target_unit,
        attack_type,
    } = combination;
    const { equip } = attacker_squadron;
    const { natural_addition } = equip;
    const { asw, aerial_bomb_power, aerial_torpedo_power } = natural_addition;
    const improve_asw = calc_equip_improvement_addition(equip, 'asw_power');
    const improve_bomb = calc_equip_improvement_addition(equip, 'aerial_bomb_power');
    const improve_torpedo = calc_equip_improvement_addition(equip, 'aerial_torpedo_power');

    return match(attack_type)
        .with('asw', () => ({ natural_status: asw, improvement_bonus: improve_asw }))
        .with('bomb', () => ({ natural_status: aerial_bomb_power, improvement_bonus: improve_bomb }))
        .with('torpedo', () => {
            return {
                natural_status: is_install_type(target_unit.ship)
                    ? 0
                    : aerial_torpedo_power,
                improvement_bonus: improve_torpedo,
            }
        })
        .exhaustive();
}

/**
 * 最も雷装値|爆装値の高い機体が装備された装備スロットを返す
 * @param equip_slots 
 * @returns 
 */
const calc_slot_of_most_powerful_plane = (
    equip_slots: NonEmptyPlayerEquipSlot[],
): NonEmptyPlayerEquipSlot => {
    if (
        equip_slots.length === 0
    ) throw new Error('有効な機体が見つかりませんでした');

    const calc_status = (
        slot: NonEmptyPlayerEquipSlot,
    ): number => {
        return can_bombing(slot.equip)
            ? slot.equip.natural_addition.aerial_bomb_power
            : slot.equip.natural_addition.aerial_torpedo_power;
    }

    // 最も強力なスロットを選択
    return equip_slots.reduce((highest_slot, current_slot) => {
        const current_torpedo = calc_status(current_slot);
        const highest_torpedo = calc_status(highest_slot);

        return current_torpedo > highest_torpedo ||
            (current_torpedo === highest_torpedo && current_slot.slot_count > highest_slot.slot_count)
            ? current_slot
            : highest_slot;
    });
}

/** 装備ボーナス優先度リスト */
const PRIORITY_LIST: PlayerEquipNameJP[] = [
    '零式水上偵察機11型乙',
    '零式水上偵察機11型乙(熟練)',
    '紫雲(熟練)',
    '紫雲',
    'Swordfish Mk.III改(水上機型/熟練)',
    'Swordfish Mk.III改(水上機型)',
    '天山一二型甲',
    '天山一二型甲改(空六号電探改装備機)',
    '天山一二型甲改(熟練/空六号電探改装備機)',
    'Barracuda Mk.III',
    'Barracuda Mk.II',
];

const calc_plane_torpedo_bonus = (
    attacker_squadron: ShipSquadron,
    equip_slots: EquipSlot[],
): number => {
    if (
        !is_player_equip_slots(equip_slots)
    ) return 0;
    const { equip } = attacker_squadron;
    if (
        !is_torpedo_bomber(equip) &&
        !can_bombing(equip)
    ) return 0;

    const non_empty_slots = convert_non_empty_player_equip_slots(equip_slots);

    // 最も強力な艦攻を特定
    const slot_of_most_powerful_plane = calc_slot_of_most_powerful_plane(non_empty_slots);
    // 攻撃実施機が該当機であるかチェック
    if (slot_of_most_powerful_plane.slot_index !== attacker_squadron.slot_index) return 0;

    // 優先度リストを照合して最初にヒットした機体のボーナスを返す
    const slot_of_most_priority_plane = equip_slots.find(slot => {
        const { equip } = slot;
        if (!is_equip_exsist(equip)) return false;

        if (
            includes_player_equip_name(PRIORITY_LIST, equip.name_jp)
        ) return true;
    });

    if (
        slot_of_most_priority_plane
    ) return slot_of_most_priority_plane.equip_bonus.aerial_torpedo_power;

    // 優先度リストに無い(未検証)場合は暫定的に装備IDの大きい機体の装備ボーナスを返す
    const highest_slot = non_empty_slots.reduce((highest_slot, current_slot) => {
        return (
            current_slot.equip.master_id > highest_slot.equip.master_id)
            ? current_slot
            : highest_slot;
    });
    return highest_slot.equip_bonus.aerial_torpedo_power;
}

export const __attack_power_airstrike__ = {
    calc_slot_of_most_powerful_plane,
    calc_plane_torpedo_bonus,
}