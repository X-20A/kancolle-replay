import { brandShipLv, brandUniqueId } from "@/types/brands/ship";
import { AbyssalEquippedShip, merge_status_components_with_max_range } from ".";
import { derive_abyssal_naked_ship } from "../naked/abyssal";
import { derive_abyssal_equip } from "@/models/equip/basic/abyssal";
import { PlayerEquippedShipOptions } from "./player";
import { derive_AACI_pre_info } from "../../../logics/antiAir/cutin/preInfo";
import { calc_triggerable_AACIs } from "@/logics/antiAir/cutin/conditions";
import { Equip, is_abyssal_equips } from "@/models/equip/basic";
import { derive_abyssal_equip_slots } from "@/models/ship/EquipSlot";
import { derive_abyssal_equipped_ship_flags } from "./flags";
import { AbyssalShipId } from "@/types/ship/abyssalId";
import { INITIAL_STATUS_COMPONENT } from "@/types";

export function derive_equipped_abyssal_ship(
    id: AbyssalShipId,
    input_equips?: Equip[],
    options: PlayerEquippedShipOptions = {},
): AbyssalEquippedShip {
    if (input_equips && !is_abyssal_equips(input_equips)) throw new Error('深海棲艦に艦娘装備は持たせられません');
    const naked_ship = derive_abyssal_naked_ship(
        id,
    );

    const equips = input_equips ?? naked_ship.EQUIPS.map(equip_id => {
        return derive_abyssal_equip(
            equip_id,
        );
    });

    const max_hp = options.hp_remain ?? naked_ship.status.hp;

    const naked_status = naked_ship.status;

    const total_natural_equip_addition = equips
            .map(equip => equip.natural_addition)
        .reduce(merge_status_components_with_max_range, { ...INITIAL_STATUS_COMPONENT });

    const view_status = [
        naked_status,
        total_natural_equip_addition,
    ].reduce(merge_status_components_with_max_range, { ...INITIAL_STATUS_COMPONENT });

    const edited_status = options.edit_input ?? view_status;

    const prepare_AACI_info = derive_AACI_pre_info(equips);
    const triggerable_AACIs = calc_triggerable_AACIs(naked_ship, prepare_AACI_info);

    const ship: AbyssalEquippedShip = {
        master_id: naked_ship.master_id,
        unique_id: brandUniqueId(crypto.randomUUID()),
        name_en: naked_ship.name_en,
        name_jp: naked_ship.name_jp,
        lv: brandShipLv(1),
        type_id: naked_ship.type_id,
        install_type: naked_ship.install_type,
        equip_slots: derive_abyssal_equip_slots(equips, naked_ship.slots),
        max_hp,
        slot_counts: options.slots ?? naked_ship.slots,
        naked_status: naked_ship.status,
        total_natural_equip_addition,
        view_status,
        edited_status,
        triggerable_AACIs,
        flags: derive_abyssal_equipped_ship_flags(naked_ship.flags, equips),
        state: {
            hp_remain: max_hp,
        },
    };

    return ship;
}