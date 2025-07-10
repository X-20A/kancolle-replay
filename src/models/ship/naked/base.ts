import { Country } from "@/datas/equip/bonus";
import { TStatusComponent } from "@/types";
import { ShipBaseId, ShipId, ShipNameEN } from "@/types/brands/ship";
import { InstallType, PlayerNakedShipFlags, ShipTypeBase, UnknownStatus } from "@/types/ship/ship";
import { PlayerShipClass } from "@/types/ship/shipClass";
import { AbyssalNakedShipFlags, AbyssalShipType } from "@/types/ship/abyssal";
import { PlayerShipNameJP } from "@/types/ship/playerNameJP";
import { AbyssalShipNameJP } from "@/types/ship/abyssalNameJP";
import { AbyssalShipId } from "@/types/ship/abyssalId";
import { AbyssalEquipId } from "@/types/equip/abyssalId";

type NakedShipBase = {
    readonly name_en: ShipNameEN,
    readonly slots: Readonly<number[]>,
    readonly status: TStatusComponent,
}

export type PlayerNakedShip = NakedShipBase & {
    readonly master_id: ShipId,
    readonly base_id: ShipBaseId,
    readonly name_jp: PlayerShipNameJP,
    readonly type_id: ShipTypeBase,
    readonly ship_class: PlayerShipClass,
    readonly country: Country,
    readonly flags: PlayerNakedShipFlags,
}

export type AbyssalNakedShip = NakedShipBase & {
    readonly master_id: AbyssalShipId,
    readonly name_jp: AbyssalShipNameJP,
    readonly type_id: AbyssalShipType,
    readonly install_type: InstallType,
    readonly unknown_status: UnknownStatus,
    readonly EQUIPS: AbyssalEquipId[],
    readonly flags: AbyssalNakedShipFlags,
    readonly dive_bomb_weak_mod: number,
    readonly land_based_weak_mod: number,
}

/** 装備を持ってない && 運・対潜 未改修状態の艦諸元 */
export type NakedShip = PlayerNakedShip | AbyssalNakedShip