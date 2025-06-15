import { ShipId, ShipLv, ShipUniqueId } from "@/types/brands/ship";
import { EquippedPlayerShip, merge_status_components_with_max_range, sum_statusC_components } from "./base";
import { EquipBase } from "@/models/equip/Equip";
import { ModernizationType, SpecialItemId } from "@/types/ship/ship";
import { TStatusComponent } from "@/types";
import { derive_player_naked_ship } from "../naked/player";
import { deriveAswFlags } from "../aswFlags";
import { DEFAULT_STATUS_COMPONENT } from "@/datas";
import { sumEquipImprovementAdditions } from "@/models/equip/EquipImprovement";
import { deriveSpecialItemAddition } from "@/models/equip/SpecialItem";
import { deriveEquipBonusAddition } from "@/models/equip/EquipBonus";

export function derive_equipped_player_ship(
    unique_id: ShipUniqueId,
    lv: ShipLv,
    special_item_id: SpecialItemId,
    ship_id: ShipId,
    equips: EquipBase[],
    modernizations?: ModernizationType,
    edit_input?: TStatusComponent,
    slots?: number[],
): EquippedPlayerShip {
    const naked_ship = derive_player_naked_ship(
        lv,
        ship_id,
    );

    const naked_status = naked_ship.status;
    const total_natural_equip_addition = equips
        .map(equip => equip.natural_addition)
        .reduce(merge_status_components_with_max_range, DEFAULT_STATUS_COMPONENT);
    const total_equip_bonus_addition = deriveEquipBonusAddition(naked_ship, equips);
    const total_equip_improvement_addition =
        sumEquipImprovementAdditions(equips.map(equip => equip.improvement_addition));
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
    ].reduce(sum_statusC_components, DEFAULT_STATUS_COMPONENT);

    const total_valid_asw = equips
        .map(equip => equip.contribute_asw_attack_power)
        .reduce((acc, curr) => {
            return acc + curr;
        }, 0);

    const edited_status = edit_input ?? view_status;

    const asw_flags = deriveAswFlags(equips);
    const flags = {
        ...naked_ship.flags,
        asw_equip: asw_flags,
    };

    return {
        master_id: naked_ship.master_id,
        base_id: naked_ship.base_id,
        unique_id,
        name_en: naked_ship.name_en,
        name_jp: naked_ship.name_jp,
        lv,
        type_id: naked_ship.type_id,
        ship_class: naked_ship.ship_class,
        country: naked_ship.country,
        equips: equips,
        slots: slots ?? naked_ship.slots,
        flags,
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