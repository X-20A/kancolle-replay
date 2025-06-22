import { brandUniqueId, ShipId, ShipLv, ShipUniqueId } from "@/types/brands/ship";
import { PlayerEquippedShip, merge_status_components_with_max_range, sum_status_components } from ".";
import { Equip, is_player_equip } from "@/models/equip/basic";
import { ModernizationType, SpecialItemId } from "@/types/ship/ship";
import { TStatusComponent } from "@/types";
import { derive_player_naked_ship } from "../naked/player";
import { derive_asw_flags } from "../aswFlags";
import { DEFAULT_STATUS_COMPONENT } from "@/datas";
import { sumEquipImprovementAdditions } from "@/models/equip/EquipImprovement";
import { deriveSpecialItemAddition } from "@/models/equip/SpecialItem";
import { deriveEquipBonusAddition } from "@/models/equip/EquipBonus";
import { derive_player_ship_state } from "../state";

export function derive_equipped_player_ship(
    lv: ShipLv,
    special_item_id: SpecialItemId,
    ship_id: ShipId,
    all_equips: Equip[],
    hp_remain?: number,
    modernizations?: ModernizationType,
    edit_input?: TStatusComponent,
    _slots?: number[],
): PlayerEquippedShip {
    const naked_ship = derive_player_naked_ship(
        lv,
        ship_id,
    );

    const player_equips = all_equips.filter(is_player_equip);

    const naked_status = naked_ship.status;
    const total_natural_equip_addition = all_equips
        .map(equip => equip.natural_addition)
        .reduce(merge_status_components_with_max_range, DEFAULT_STATUS_COMPONENT);
    
    const total_equip_bonus_addition =
        deriveEquipBonusAddition(naked_ship, player_equips);
    const total_equip_improvement_addition =
        sumEquipImprovementAdditions(player_equips.map(equip => equip.improvement_addition));
    const special_item_addition = deriveSpecialItemAddition(special_item_id);
   
    // 射程は素ステータスと装備素射程の最大値に装備ボーナスを加算
    const partial_status = [
        naked_status,
        total_natural_equip_addition,
    ].reduce(merge_status_components_with_max_range, DEFAULT_STATUS_COMPONENT);
    const view_status = [
        partial_status,
        total_equip_bonus_addition,
        special_item_addition,
    ].reduce(sum_status_components, DEFAULT_STATUS_COMPONENT);

    const edited_status = edit_input ?? view_status;

    const total_valid_asw = player_equips
        .reduce((total, equip) => {
            return total + equip.contribute_asw_attack_power;
        }, 0);

    const asw_flags = derive_asw_flags(player_equips);
    const flags = {
        ...naked_ship.flags,
        asw_equip: asw_flags,
    };

    const state = derive_player_ship_state();

    return {
        master_id: naked_ship.master_id,
        base_id: naked_ship.base_id,
        unique_id: brandUniqueId(crypto.randomUUID()),
        name_en: naked_ship.name_en,
        name_jp: naked_ship.name_jp,
        lv,
        type_id: naked_ship.type_id,
        ship_class: naked_ship.ship_class,
        country: naked_ship.country,
        equips: all_equips,
        hp_remain: hp_remain ?? naked_ship.status.hp,
        slot_counts: _slots ?? naked_ship.slots,
        flags,
        state,
        naked_status,
        total_natural_equip_addition,
        total_equip_bonus_addition,
        total_equip_improvement_addition,
        special_item_addition,
        view_status,
        edited_status,
        total_contribute_asw_attack_power: total_valid_asw,
    }
}