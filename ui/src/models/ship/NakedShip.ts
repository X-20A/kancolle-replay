import { Country } from "@/datas/equip/bonus";
import { CountryDatas } from "@/datas/ship/country";
import { StatusComponent } from "@/types";
import { brandShipNameEN, brandShipNameJP, ShipId, ShipLv, ShipNameEN, ShipNameJP } from "@/types/brands/ship";
import { ShipDatas, PlayerShipFlags, ShipType, PlayerShipClass } from "@/types/ship/ship";

/** 装備を持ってない && 運・対潜 未改修状態の艦諸元 */
export type NakedPlayerShip = {
    readonly master_id: ShipId,
    readonly name_en: ShipNameEN,
    readonly name_jp: ShipNameJP,
    readonly type: ShipType,
    readonly ship_class: PlayerShipClass,
    readonly country: Country,
    readonly slots: Readonly<number[]>,
    readonly status: StatusComponent,
    readonly flags: PlayerShipFlags,
}

function calcStatusFromLevel(
    min: number,
    max: number,
    level: ShipLv,
): number {
    if (min >= max) throw new Error('最小値が最大値以上になっています');

    if (level === 99) return max;
    if (level === 1) return min;
    
    return Math.floor((max - min) * (level / 99) + min);
}

export function deriveNakedPlayerShip(
    ship_datas: ShipDatas,
    country_datas: CountryDatas,
    ship_lv: ShipLv,
    id: ShipId,
): NakedPlayerShip {
    const ship_data = ship_datas[id];
    if (!ship_data) throw new Error(`id: ${id}の艦が見つかりませんでした`);

    const master_id = id;

    const name_en = brandShipNameEN(ship_data.name);
    const name_jp = brandShipNameJP(ship_data.nameJP);
    const type = ship_data.type;
    const ship_class = ship_data.ship_class;
    const country = country_datas[ship_class];
    const slots = ship_data.SLOTS;

    const status: StatusComponent = {
        hp: ship_data.HP,
        fire_power: ship_data.FP,
        armor: ship_data.AR,
        torpedo_power: ship_data.TP,
        evasion: calcStatusFromLevel(ship_data.EVbase, ship_data.EV, ship_lv),
        anti_air: ship_data.AA,
        asw: calcStatusFromLevel(ship_data.ASWbase, ship_data.ASW, ship_lv),
        los: calcStatusFromLevel(ship_data.LOSbase, ship_data.LOS, ship_lv),
        luck: ship_data.LUK,
        shell_accuracy: 0,
    }

    const flags: PlayerShipFlags = {
        has_potential_always_OASW: ship_data.has_potential_always_OASW ?? false,
        has_built_in_fire_director: ship_data.has_built_in_fire_director ?? false,
        has_potential_air_attack: ship_data.has_potential_air_attack ?? false,
        is_air_craft_carrier_BB: ship_data.is_air_craft_carrier_BB ?? false,
        is_ASW_subordinated_CVL: ship_data.is_ASW_subordinated_CVL ?? false,
        has_potential_zuiun_CI: ship_data.has_potential_zuiun_CI ?? false,
        has_built_in_night_crew: ship_data.has_built_in_night_crew ?? false,
        is_anti_PT_ship: ship_data.is_anti_PT_ship ?? false,
        is_anti_install_ship: ship_data.is_anti_install_ship ?? false,
        has_ASW_potential_CV: ship_data.has_ASW_potential_CV ?? false,
    };

    return {
        master_id,
        name_en,
        name_jp,
        type,
        ship_class,
        country,
        slots,
        status,
        flags,
    }
}