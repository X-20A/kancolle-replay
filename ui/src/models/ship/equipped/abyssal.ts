import { brandShipLv, ShipId, ShipUniqueId } from "@/types/brands/ship";
import { AbyssalEquippedShip, merge_status_components_with_max_range } from ".";
import { derive_abyssal_naked_ship } from "../naked/abyssal";
import { brandEquipId } from "@/types/brands/equip";
import { derive_abyssal_equip } from "@/models/equip/basic/abyssal";
import { DEFAULT_STATUS_COMPONENT } from "@/datas";
import { TStatusComponent } from "@/types";

export function derive_equipped_abyssal_ship(
    unique_id: ShipUniqueId,
    id: ShipId,
    edit_input?: TStatusComponent,
): AbyssalEquippedShip {
    const naked_ship = derive_abyssal_naked_ship(
        id,
    );

    const equips = naked_ship.EQUIPS.map(equip_id => {
        return derive_abyssal_equip(
            brandEquipId(equip_id),
        );
    });

    const naked_status = naked_ship.status;

    const total_natural_equip_addition = equips
            .map(equip => equip.natural_addition)
            .reduce(merge_status_components_with_max_range, DEFAULT_STATUS_COMPONENT);

    const view_status = [
        naked_status,
        total_natural_equip_addition,
    ].reduce(merge_status_components_with_max_range, DEFAULT_STATUS_COMPONENT);

    const edited_status = edit_input ?? view_status;

    return {
        master_id: naked_ship.master_id,
        unique_id: unique_id,
        name_en: naked_ship.name_en,
        name_jp: naked_ship.name_jp,
        lv: brandShipLv(1),
        type_id: naked_ship.type_id,
        equips,
        slots: naked_ship.slots,
        naked_status: naked_ship.status,
        total_natural_equip_addition,
        view_status,
        edited_status,
        flags: naked_ship.flags,
    }
}