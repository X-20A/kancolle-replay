import { brandUniqueId, ShipId, ShipLv, ShipUniqueId } from "@/types/brands/ship";
import { PlayerEquippedShip, merge_status_components_with_max_range, sum_status_components } from ".";
import { Equip, is_player_equip, is_player_equips, PlayerEquip } from "@/models/equip/basic";
import { ModernizationType, SpecialItemId } from "@/types/ship/ship";
import { INITIAL_STATUS_COMPONENT, TStatusComponent } from "@/types";
import { derive_player_naked_ship } from "../naked/player";
import { deriveSpecialItemAddition } from "@/models/equip/SpecialItem";
import { derive_equip_bonus_addition } from "@/models/equip/EquipBonus";
import { derive_player_ship_state } from "../state";
import { derive_prepare_AACI_info } from "../aaciPreparate";
import { calc_triggerable_AACIs } from "@/logics/antiAir/cutin/conditions";
import { calc_player_weighted_anti_air } from "@/logics/antiAir/weighted";
import { derive_player_equip_slots } from "@/models/ship/EquipSlot";
import { derive_player_equipped_ship_flags } from "./flags";
import { PlayerNakedShip } from "../naked/base";
import { calc_pre_calculated_anti_install_mods } from "@/logics/antiInstall";

export type PlayerEquippedShipOptions = {
    unique_id?: ShipUniqueId,
    hp_remain?: number,
    modernizations?: ModernizationType,
    edit_input?: TStatusComponent,
    slots?: readonly number[],
}

/**
 * 装備済み艦娘を生成して返す
 * @param naked_ship 
 * @param normal_slot_equips 
 * @param ex_slot_equip 
 * @param special_item_id 
 * @param options 
 * @returns 
 */
const derive_player_equipped_ship_core = (
    naked_ship: PlayerNakedShip,
    equips: PlayerEquip[],
    ex_equip: PlayerEquip | 'None',
    special_item_id: SpecialItemId,
    options: PlayerEquippedShipOptions,
): PlayerEquippedShip => {
    const naked_status = naked_ship.status;
    const total_natural_equip_addition = equips
        .map(equip => equip.natural_addition)
        .reduce(merge_status_components_with_max_range, INITIAL_STATUS_COMPONENT);
    
    const total_equip_bonus_addition =
        derive_equip_bonus_addition(naked_ship, equips);
    const total_equip_improvement_addition = equips
        .map(equip => equip.improvement_addition)
        .reduce(sum_status_components, INITIAL_STATUS_COMPONENT);
    const special_item_addition = deriveSpecialItemAddition(special_item_id);
   
    // 射程は素ステータスと装備素射程の最大値に装備ボーナスを加算
    const partial_status = [
        naked_status,
        total_natural_equip_addition,
    ].reduce(merge_status_components_with_max_range, INITIAL_STATUS_COMPONENT);
    const view_status = [
        partial_status,
        total_equip_bonus_addition,
        special_item_addition,
    ].reduce(sum_status_components, INITIAL_STATUS_COMPONENT);

    const edited_status = options.edit_input ?? view_status;

    const total_valid_asw = equips
        .reduce((total, equip) => {
            return total + equip.contribute_asw_power;
        }, 0);

    const flags = derive_player_equipped_ship_flags(naked_ship.flags, equips)

    const state = derive_player_ship_state(options.hp_remain ?? edited_status.hp);

    const weighted_anti_air = calc_player_weighted_anti_air(
        equips,
        naked_status,
        total_equip_bonus_addition,
        total_equip_improvement_addition,
    );

    const prepare_AACI_info = derive_prepare_AACI_info(equips);
    const triggerable_AACIs = calc_triggerable_AACIs(naked_ship, prepare_AACI_info);

    const pre_calculated_anti_install_mods =
        calc_pre_calculated_anti_install_mods(equips);

    return {
        master_id: naked_ship.master_id,
        base_id: naked_ship.base_id,
        unique_id: brandUniqueId(crypto.randomUUID()),
        name_en: naked_ship.name_en,
        name_jp: naked_ship.name_jp,
        lv: naked_ship.lv,
        type_id: naked_ship.type_id,
        ship_class: naked_ship.ship_class,
        country: naked_ship.country,
        special_item_id,
        modernizations: options.modernizations ?? {},
        equip_slots: derive_player_equip_slots(naked_ship, equips, naked_ship.slots, ex_equip),
        slot_counts: options.slots ?? naked_ship.slots,
        max_hp: naked_status.hp,
        base_fuel: naked_ship.base_fuel,
        base_ammo: naked_ship.base_ammo,
        special_attack_type: naked_ship.special_attack_type,
        pre_calculated_anti_install_mods,
        flags,
        state,
        naked_status,
        total_natural_equip_addition,
        total_equip_bonus_addition,
        total_equip_improvement_addition,
        special_item_addition,
        view_status,
        edited_status,
        weighted_anti_air,
        triggerable_AACIs,
        total_contribute_asw_attack_power: total_valid_asw,
    }
}

export function derive_player_equipped_ship(
    lv: ShipLv,
    special_item_id: SpecialItemId,
    ship_id: ShipId,
    options: PlayerEquippedShipOptions,
    normal_slot_equips: Equip[],
    ex_slot_equip: Equip | 'None',
): PlayerEquippedShip {
    // console.log('ex_slot_equip: ', ex_slot_equip);
    if (
        !is_player_equips(normal_slot_equips) ||
        (ex_slot_equip !== 'None' && !is_player_equip(ex_slot_equip))
    ) throw new Error('艦娘に深海装備は持たせられません');
    const naked_ship = derive_player_naked_ship(
        lv,
        ship_id,
    );

    return derive_player_equipped_ship_core(
        naked_ship,
        normal_slot_equips,
        ex_slot_equip,
        special_item_id,
        options,
    );
}

export const __player_equipped_ship__ = {
    derive_player_equipped_ship_core,
}