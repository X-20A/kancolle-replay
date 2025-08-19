import { brandShipBaseId, brandShipId, brandShipNameEN, ShipBaseId, ShipId, ShipLv } from "@/types/brands/ship";
import { PlayerNakedShip } from "./base";
import { PLAYER_SHIP_DATAS } from "@/datas/ship/player";
import { COUNTRY_DATAS } from "@/datas/ship/country";
import { TStatusComponent } from "@/types";
import { PlayerNakedShipFlags } from "@/types/ship/ship";

const calc_base_id = (current_id: ShipId): ShipBaseId => {
    let id = current_id;

    while (true) {
        const data = PLAYER_SHIP_DATAS[id];
        if (data.prev_id === 0) break;
        id = brandShipId(data.prev_id);
    }

    return brandShipBaseId(id);
}

/**
 * レベル時点でのステータスを計算して返す
 * @param min 
 * @param max 
 * @param level 
 * @returns 
 */
const calc_status_from_level = (
    min: number,
    max: number,
    level: ShipLv,
): number => {
    if (min > max) throw new Error('最小値が最大値以上になっています'); // 重巡asw等は 00 なので同値は見逃す

    if (level === 99) return max;
    if (level === 1) return min;

    return Math.floor((max - min) * (level / 99) + min);
}

export function derive_player_naked_ship(
    ship_lv: ShipLv,
    id: ShipId,
): PlayerNakedShip {
    const ship_data = PLAYER_SHIP_DATAS[id];
    if (!ship_data) throw new Error(`id: ${id}の艦が見つかりませんでした`);

    const ship_class = ship_data.ship_class
    const country = COUNTRY_DATAS[ship_class];

    const status: TStatusComponent = {
        hp: ship_data.HP,
        shell_power: ship_data.FP,
        armor: ship_data.AR,
        torpedo_power: ship_data.TP,
        evasion: calc_status_from_level(ship_data.EVbase, ship_data.EV, ship_lv),
        anti_air: ship_data.AA,
        asw_power: calc_status_from_level(ship_data.ASWbase, ship_data.ASW, ship_lv),
        los: calc_status_from_level(ship_data.LOSbase, ship_data.LOS, ship_lv),
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
        has_built_in_night_crew: ship_data.has_built_in_night_crew ?? false,
        is_anti_PT_ship: ship_data.is_anti_PT_ship ?? false,
        is_anti_install_ship: ship_data.is_anti_install_ship ?? false,
        has_ASW_potential_CV: ship_data.has_ASW_potential_CV ?? false,
    };

    return {
        master_id: id,
        lv: ship_lv,
        base_id: calc_base_id(id),
        name_en: brandShipNameEN(ship_data.name),
        name_jp: ship_data.name_jp,
        type_id: ship_data.type,
        ship_class,
        fit_class: ship_data.fit_class ?? 'None',
        country,
        slots: ship_data.SLOTS,
        status,
        base_fuel: ship_data.fuel,
        base_ammo: ship_data.ammo,
        flags,
    }
}