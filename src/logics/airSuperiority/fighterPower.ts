import { EquippedShip, is_ship_on_the_front_line } from "@/models/ship/equipped";
import { Equip, is_player_equip, PlayerEquip, AbyssalEquip } from "@/models/equip/basic";
import { concat_fleet_ships, Fleet, map_units_to_ships } from "@/models/fleet/Fleet";
import { Squadron } from "@/models/LBAS";
import { EquipSlot, is_equip_exsist } from "@/models/ship/EquipSlot";
import { calc_carrier_based_proficiency_flat, CalcFighterPowerProficiencyFn, FighterPowerProficiencyFlat } from "../proficiency/fighterPower";

/// 制空系
/// 制空値は 配備: 艦|基地, 敵: 通常艦隊|連合艦隊 で変化するので装備単体では決まらない

type PlayerAntiAir = Readonly<{
    natural: number;
    improvement: number;
}>;

type AbyssalAntiAir = Readonly<{
    natural: number;
}>;

const calc_player_plane_fighter_power = (
    anti_air: PlayerAntiAir,
    remain_plane_count: number,
    proficiency_flat: FighterPowerProficiencyFlat,
): number => {
    const equip_fighter_power =
        anti_air.natural + anti_air.improvement;

    return Math.floor(
        equip_fighter_power * Math.sqrt(remain_plane_count)
        + proficiency_flat
    );
};

const calc_abyssal_plane_fighter_power = (
    anti_air: AbyssalAntiAir,
    remain_plane_count: number,
): number => {
    return Math.floor(
        anti_air.natural * Math.sqrt(remain_plane_count)
    );
};

const to_player_anti_air = (
    equip: PlayerEquip,
): PlayerAntiAir => {
    return {
        natural: equip.natural_addition.anti_air,
        improvement: equip.improvement_addition.anti_air,
    };
};

const to_abyssal_anti_air = (
    equip: AbyssalEquip,
): AbyssalAntiAir => {
    return {
        natural: equip.natural_addition.anti_air,
    };
};

/**
 * 装備と残スロット数から制空値を返す
 * @param equip 
 * @param remain_plane_count 
 * @returns 
 */
const calc_equip_air_superiority_power = (
    equip: Equip,
    remain_plane_count: number,
    calc_fighter_power_proficiency_fn: CalcFighterPowerProficiencyFn,
): number => {
    return is_player_equip(equip)
        ? calc_player_plane_fighter_power(
            to_player_anti_air(equip),
            remain_plane_count,
            calc_fighter_power_proficiency_fn(equip),
        )
        : calc_abyssal_plane_fighter_power(
            to_abyssal_anti_air(equip),
            remain_plane_count,
        );
};

/**
 * 装備群の制空値を返す
 * @param equips 
 * @param slots 
 * @returns 
 */
export function calc_equips_air_superiority_power(
    equip_slots: EquipSlot[],
    calc_fighter_power_proficiency_fn: CalcFighterPowerProficiencyFn,
): number {
    return equip_slots.reduce((total, slot) => {
        const {
            equip,
            slot_count,
        } = slot;
        if (
            !is_equip_exsist(equip) ||
            !equip.flags.is_involve_air_superiority ||
            slot_count === 0
        ) return total;

        return total
            + calc_equip_air_superiority_power(
            equip,
            slot.slot_count,
            calc_fighter_power_proficiency_fn,
        );
    }, 0);
}

/**
 * 艦の制空値を返す
 * @param ship 
 * @returns 
 */
export function calc_ship_air_superiority_power(
    ship: EquippedShip,
): number {
    return calc_equips_air_superiority_power(
        ship.equip_slots,
        calc_carrier_based_proficiency_flat,
    );
}

/**
 * 艦群の制空値を返す
 * @param ships 
 * @returns 
 */
const calc_ships_air_superiority_power = (
    ships: EquippedShip[],
): number => {
    return ships.reduce((total, ship) => {
        if (!is_ship_on_the_front_line(ship)) return total;

        return total
            + calc_ship_air_superiority_power(
                ship,
            );
    }, 0);
}

/**
 * 対通常艦隊戦における艦隊の制空値を返す
 * @param fleet 
 * @returns 
 */
export function calc_fleet_fighter_power_in_anti_single_fleet(
    fleet: Fleet,
): number {
    const ships = map_units_to_ships(fleet.main_fleet_units);
    return calc_ships_air_superiority_power(
        ships,
    );
}

/**
 * 対連合艦隊戦における艦隊の制空値を返す    
 * ? プレイヤー: 通常, 深海: 連合 時において敵随伴艦隊の艦載機の制空値は含まれるか？    
 * ? 暫定: 含まれない(プレイヤー側の条件と同じ)
 * @param fleet 
 * @returns 
 */
export function calc_fleet_fighter_power_in_anti_combined_fleet(
    fleet: Fleet,
): number {
    const ships = concat_fleet_ships(fleet);
    return calc_ships_air_superiority_power(
        ships,
    );
}

/**
 * 基地航空隊の制空値を返す
 * @param squadrons 
 * @returns 
 */
export function calc_squadrons_air_superriority_power(
    squadrons: Squadron[],
): number {
    return squadrons.reduce((total, squadron) => {
        return total + calc_equip_air_superiority_power(
            squadron.equip,
            squadron.slot_count,
            calc_carrier_based_proficiency_flat(squadron.equip)
        );
    }, 0);
}

