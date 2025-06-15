import { Country } from "@/datas/equip/bonus";
import { TStatusComponent } from "@/types";
import { ShipBaseId, ShipId, ShipNameEN, ShipNameJP } from "@/types/brands/ship";
import { PlayerNakedShipFlags, ShipType, UnknownStatus } from "@/types/ship/ship";
import { PlayerShipClass } from "@/types/ship/shipClass";
import { AbyssalShipFlags, AbyssalShipType } from "@/types/ship/abyssal";

type NakedShipBase = {
    readonly master_id: ShipId,
    readonly name_en: ShipNameEN,
    readonly name_jp: ShipNameJP,
    readonly slots: Readonly<number[]>,
    readonly status: TStatusComponent,
}

export type PlayerNakedShip = NakedShipBase & {
    readonly base_id: ShipBaseId,
    readonly type_id: ShipType,
    readonly ship_class: PlayerShipClass,
    readonly country: Country,
    readonly flags: PlayerNakedShipFlags,
}

export type AbyssalNakedShip = NakedShipBase & {
    readonly type_id: AbyssalShipType,
    readonly unknown_status: UnknownStatus,
    readonly EQUIPS: Array<number>,
    readonly flags: AbyssalShipFlags,
}

/** 装備を持ってない && 運・対潜 未改修状態の艦諸元 */
export type NakedShip = PlayerNakedShip | AbyssalNakedShip