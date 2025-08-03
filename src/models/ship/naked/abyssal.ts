import { brandShipNameEN, ShipId } from "@/types/brands/ship";
import { AbyssalNakedShip } from "./base";
import { AbyssalNakedShipFlags } from "@/types/ship/abyssal";
import { TStatusComponent } from "@/types";
import { ABYSSAL_SHIP_DATAS } from "@/datas/ship/abyssal";
import { AbyssalShipId } from "@/types/ship/abyssalId";

export function derive_abyssal_naked_ship(
    id: AbyssalShipId,
    is_faraway?: boolean,
): AbyssalNakedShip {
    const ship_data = ABYSSAL_SHIP_DATAS[id];
    if (!ship_data) throw new Error(`id: ${id}の艦が見つかりませんでした`);

    const status: TStatusComponent = {
        hp: ship_data.HP,
        fire_power: ship_data.FP,
        armor: ship_data.AR,
        torpedo_power: ship_data.TP,
        evasion: ship_data.EV,
        anti_air: ship_data.AA,
        asw: ship_data.ASW,
        los: ship_data.LOS,
        luck: ship_data.LUK,
        range: ship_data.RNG,
        shell_accuracy: 0,
        torpedo_accuracy: ship_data.TP_ACC ?? 0,
        night_battle_accuracy: 0,
        aerial_bomb_power: 0,
        aerial_torpedo_power: 0,
    }

    const flags: AbyssalNakedShipFlags = {
        can_OASW: ship_data.can_OASW ?? false,
        has_built_in_night_crew: ship_data.has_built_in_night_crew ?? false,
        can_not_CVCI: ship_data.can_not_CVCI ?? false,
        is_PT: ship_data.is_PT ?? false,
        is_Summer_BB: ship_data.is_Summer_BB ?? false,
        is_Summer_CA: ship_data.is_Summer_CA ?? false,
        is_French_BB: ship_data.is_French_BB ?? false,
        is_Anchorage: ship_data.is_Anchorage ?? false,
        is_Summer_CV: ship_data.is_Summer_CV ?? false,
        is_Dock: ship_data.is_Dock ?? false,
        is_float_Supply_Depot: ship_data.is_float_Supply_Depot ?? false,
        can_op_torpedo_from_main_fleet: ship_data.can_op_torpedo_from_main_fleet ?? false,
        can_not_NB: ship_data.can_not_NB ?? false,
        can_not_shell: ship_data.can_not_shell ?? false,
        can_not_op_torpedo_submarine: ship_data.can_not_op_torpedo_submarine ?? false,
        can_op_torpedo_surface_ship: ship_data.can_op_torpedo_surface_ship ?? false,

        is_faraway: is_faraway ?? false,
    };

    return {
        master_id: id,
        name_en: brandShipNameEN(ship_data.name),
        name_jp: ship_data.name_jp,
        type_id: ship_data.type,
        install_type: ship_data.install_type ?? 'No',
        unknown_status: ship_data.unknown_status ?? {},
        EQUIPS: ship_data.EQUIPS ?? [],
        slots: ship_data.SLOTS,
        status,
        flags,
        dive_bomb_weak_mod: ship_data.dive_bomb_weak_mod ?? 1,
        land_based_weak_mod: ship_data.land_based_weak_mod ?? 1,
    }
}