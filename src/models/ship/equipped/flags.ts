import { AbyssalEquip, PlayerEquip } from "@/models/equip/basic";
import { AswEquipFlags, PlayerNakedShipFlags } from "@/types/ship/ship";
import { derive_asw_flags } from "../aswFlags";
import { AbyssalNakedShipFlags } from "@/types/ship/abyssal";

export type PlayerShipFlags = PlayerNakedShipFlags & {
    asw_equip: AswEquipFlags;
    /** 阻塞気球を装備しているか */
    has_balloon: boolean,
}

export type AbyssalShipFlags = AbyssalNakedShipFlags & {
    has_balloon: boolean,
}

export function derive_player_equipped_ship_flags(
    naked_ship_flags: PlayerNakedShipFlags,
    equips: PlayerEquip[],
): PlayerShipFlags {
    const asw_equip = derive_asw_flags(equips);

    const has_balloon = equips.some(equip => equip.type_id === 'BARRAGE_BALLOON');

    return {
        ...naked_ship_flags,
        asw_equip,
        has_balloon,
    };
}

export function derive_abyssal_equipped_ship_flags(
    naked_ship_flags: AbyssalNakedShipFlags,
    equips: AbyssalEquip[],
): AbyssalShipFlags {
    const has_balloon = equips.some(equip => equip.type_id === 'BARRAGE_BALLOON');

    return {
        ...naked_ship_flags,
        has_balloon,
    }
}