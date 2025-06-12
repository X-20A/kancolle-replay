import { Country } from "@/datas/equip/bonus";
import { COUNTRY_DATAS } from "@/datas/ship/country";
import { PLAYER_SHIP_DATAS } from "@/datas/ship/player";
import { TStatusComponent } from "@/types";
import { brandShipNameEN, brandShipNameJP, ShipId, ShipLv, ShipNameEN, ShipNameJP } from "@/types/brands/ship";
import { PlayerNakedShipFlags } from "@/types/ship/ship";
import { PlayerShipClass } from "@/types/ship/ship_class";
import { ShipType } from "@/wasm/kssw";

/** 装備を持ってない && 運・対潜 未改修状態の艦諸元 */
export type NakedPlayerShip = {
    readonly master_id: ShipId,
    readonly name_en: ShipNameEN,
    readonly name_jp: ShipNameJP,
    readonly type_id: ShipType,
    readonly ship_class: PlayerShipClass,
    readonly country: Country,
    readonly slots: Readonly<number[]>,
    readonly status: TStatusComponent,
    readonly flags: PlayerNakedShipFlags,
}

function calcStatusFromLevel(
    min: number,
    max: number,
    level: ShipLv,
): number {
    if (min > max) throw new Error('最小値が最大値以上になっています'); // 重巡asw等は 00 なので同値は見逃す

    if (level === 99) return max;
    if (level === 1) return min;
    
    return Math.floor((max - min) * (level / 99) + min);
}

export function deriveNakedPlayerShip(
    ship_lv: ShipLv,
    id: ShipId,
): NakedPlayerShip {
    const ship_data = PLAYER_SHIP_DATAS[id];
    if (!ship_data) throw new Error(`id: ${id}の艦が見つかりませんでした`);

    const master_id = id;

    const name_en = brandShipNameEN(ship_data.name);
    const name_jp = brandShipNameJP(ship_data.nameJP);
    const type_id = ship_data.type;
    const ship_class = ship_data.ship_class;
    const country = COUNTRY_DATAS[ship_class];
    const slots = ship_data.SLOTS;

    const status: TStatusComponent = {
        hp: ship_data.HP,
        fire_power: ship_data.FP,
        armor: ship_data.AR,
        torpedo_power: ship_data.TP,
        evasion: calcStatusFromLevel(ship_data.EVbase, ship_data.EV, ship_lv),
        anti_air: ship_data.AA,
        asw: calcStatusFromLevel(ship_data.ASWbase, ship_data.ASW, ship_lv),
        los: calcStatusFromLevel(ship_data.LOSbase, ship_data.LOS, ship_lv),
        luck: ship_data.LUK,
        range: ship_data.RNG,
        shell_accuracy: 0,
        torpedo_accuracy: 0,
        night_battle_accuracy: 0,
        aerial_bomb_power: 0,
        aerial_torpedo_power: 0,
    }

    const flags: PlayerNakedShipFlags = {
        has_advantage_OASW_CVs: ship_data.has_advantage_OASW_CVs ?? false,
        can_unconditional_OASW: ship_data.can_unconditional_OASW ?? false,
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
        type_id,
        ship_class,
        country,
        slots,
        status,
        flags,
    }
}