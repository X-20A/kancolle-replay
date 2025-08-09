/// 探照灯

import { is_searchlight_L, is_searchlight_S } from "@/models/equip/basic";
import { FleetUnit, PlayerFleetUnit } from "@/models/fleet/FleetUnit";
import { is_retreated } from "@/models/ship/equipped";
import { EquipSlot, is_equip_exsist } from "@/models/ship/EquipSlot";
import { Brand } from "@/types/brands";

type SearchlightInfo = {
    trigger_type: 'SEARCHLIGHT_L' | 'SEARCHLIGHT_S',
    order_of_ship_in_charge: number,
} | {
    trigger_type: 'Inactivate';
}

/**
 * 大型探照灯であるか判定して返す
 * @param equip_slot 
 * @returns 
 */
const has_searchlight_L = (
    equip_slot: EquipSlot,
): boolean => {
    const { equip } = equip_slot;
    return is_equip_exsist(equip) &&
        is_searchlight_L(equip);
}

/**
 * 小型探照灯であるか判定して返す
 * @param equip_slot 
 * @returns 
 */
const has_searchlight_S = (
    equip_slot: EquipSlot,
): boolean => {
    const { equip } = equip_slot;
    return is_equip_exsist(equip) &&
        is_searchlight_S(equip);
}

/**
 * 探照灯発動判定と、発動した場合の担当艦のindexを返す
 * @param fleet_units 
 * @returns 
 */
export function calc_searchlight_info(
    fleet_units: PlayerFleetUnit[],
): SearchlightInfo {
    const has_potential_units = fleet_units.filter(unit =>
        unit.ship.state.hp_remain >= 2 && // 轟沈弾きを兼ねる
        !is_retreated(unit.ship)
    );

    const equip_searchlight_L_unit = has_potential_units.find(unit =>
        unit.ship.equip_slots.some(has_searchlight_L)
    );
    if (equip_searchlight_L_unit !== undefined) {
        return {
            trigger_type: 'SEARCHLIGHT_L',
            order_of_ship_in_charge: equip_searchlight_L_unit.original_index,
        };
    }

    const equip_searchlight_S_unit = has_potential_units.find(unit =>
        unit.ship.equip_slots.some(has_searchlight_S)
    );

    if (equip_searchlight_S_unit !== undefined) {
        return {
            trigger_type: 'SEARCHLIGHT_S',
            order_of_ship_in_charge: equip_searchlight_S_unit.original_index,
        };
    }

    return {
        trigger_type: 'Inactivate',
    };
}

export type CIRateSearchlightMod = Brand<number, 'CIRateSearchlightMod'>

export function calc_CI_rate_searchlight_mod(
    attacker_searchlight_info: SearchlightInfo,
    defender_searchlight_info: SearchlightInfo,
): CIRateSearchlightMod {
    const ATTACKER_CONSTANT = 7;
    const DEFENDER_CONSTANT = 5;

    const attacker_mod = attacker_searchlight_info.trigger_type !== 'Inactivate'
        ? ATTACKER_CONSTANT
        : 0;
    const defender_mod = defender_searchlight_info.trigger_type !== 'Inactivate'
        ? DEFENDER_CONSTANT
        : 0;

    return attacker_mod - defender_mod as CIRateSearchlightMod;
}


export type AccuracySearchlightMod =
    Brand<number, 'AccuracySearchlightMod'>

/**
* 探照灯による命中補正を返す
*/
export function calc_accuracy_searchlight_mod(
    searchlight_info: SearchlightInfo,
): AccuracySearchlightMod {
    return searchlight_info.trigger_type === 'Inactivate'
        ? 0 as AccuracySearchlightMod
        : 7 as AccuracySearchlightMod;
}

export type EvasionSearchlightMod =
    Brand<number, 'EvasionSearchlightMod'>

/**
 * 探照灯担当艦が狙われた場合の回避補正値(Mod_searchlight)を返す
 * @param searchlight_info 
 * @param target_unit 
 * @returns 
 */
export function calc_evasion_searchlight_mod(
    searchlight_info: SearchlightInfo,
    target_unit: FleetUnit,
): EvasionSearchlightMod {
    if (searchlight_info.trigger_type === 'Inactivate') return 1 as EvasionSearchlightMod;

    return searchlight_info.order_of_ship_in_charge === target_unit.original_index
        ? 0.2 as EvasionSearchlightMod
        : 1 as EvasionSearchlightMod;
}

/**
 * 探照灯担当艦以外が狙われた場合の探照灯ごとのリロール回数を返す
 * @param trigger_type 
 * @returns 
 */
export function calc_searchlight_reroll_count(
    trigger_type: 'SEARCHLIGHT_L' | 'SEARCHLIGHT_S',
): number {
    const SEARCHLIGHT_L_REROLL_COUNT = 2;
    const SEARCHLIGHT_S_REROLL_COUNT = 1;

    return trigger_type === 'SEARCHLIGHT_L'
        ? SEARCHLIGHT_L_REROLL_COUNT
        : SEARCHLIGHT_S_REROLL_COUNT;
}