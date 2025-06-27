import { brandShipLv, brandUniqueId, ShipId, ShipUniqueId } from "@/types/brands/ship";
import { AbyssalEquippedShip, merge_status_components_with_max_range } from ".";
import { derive_abyssal_naked_ship } from "../naked/abyssal";
import { brandEquipId } from "@/types/brands/equip";
import { derive_abyssal_equip } from "@/models/equip/basic/abyssal";
import { DEFAULT_STATUS_COMPONENT } from "@/datas";
import { TStatusComponent } from "@/types";
import { EquippedPlayerShipOptions } from "./player";
import { derive_equip_built } from "@/models/equip/EquipBuilt";
import { derive_prepare_AACI_info } from "../aaciPreparate";

export function derive_equipped_abyssal_ship(
    id: ShipId,
    options: EquippedPlayerShipOptions = {},
): AbyssalEquippedShip {
    const naked_ship = derive_abyssal_naked_ship(
        id,
    );

    const equips = naked_ship.EQUIPS.map(equip_id => {
        return derive_abyssal_equip(
            brandEquipId(equip_id),
        );
    });

    const max_hp = options.hp_remain ?? naked_ship.status.hp;

    const naked_status = naked_ship.status;

    const total_natural_equip_addition = equips
            .map(equip => equip.natural_addition)
            .reduce(merge_status_components_with_max_range, DEFAULT_STATUS_COMPONENT);

    const view_status = [
        naked_status,
        total_natural_equip_addition,
    ].reduce(merge_status_components_with_max_range, DEFAULT_STATUS_COMPONENT);

    const edited_status = options.edit_input ?? view_status;

    return {
        master_id: naked_ship.master_id,
        unique_id: brandUniqueId(crypto.randomUUID()),
        name_en: naked_ship.name_en,
        name_jp: naked_ship.name_jp,
        lv: brandShipLv(1),
        type_id: naked_ship.type_id,
        install_type: naked_ship.install_type,
        equip_builts: derive_equip_built(equips, naked_ship.slots),
        max_hp,
        slot_counts: options.slots ?? naked_ship.slots,
        naked_status: naked_ship.status,
        total_natural_equip_addition,
        view_status,
        edited_status,
        prepare_aaci_info: derive_prepare_AACI_info(equips),
        flags: naked_ship.flags,
        state: {
            hp_remain: max_hp,
        },
    };
}