import { PlayerShipNameJP } from "@/types/ship/playerNameJP";
import { AbyssalShipNameJP } from "@/types/ship/abyssalNameJP";
import { AbyssalShipId } from "@/types/ship/abyssalId";
import { PlayerShipClass } from "@/types/ship/shipClass";
import { ShipType, ShipTypeBase, InstallType } from "@/types/ship/ship";
import { WeightedAntiAir } from "@/types/brands/other";
import { AbyssalShipFlags, PlayerShipFlags } from "./flags";
import { NakedShip, PlayerNakedShip } from "../naked";
import { AbyssalEquipSlot, PlayerEquipSlot } from "@/models/ship/EquipSlot";
import { AntiAirCutinType } from "@/logics/antiAir/cutin/conditions";
import { ShipStateBase, PlayerShipState } from "../state";
import type { EquippedShip, PlayerEquippedShip, AbyssalEquippedShip } from "./index";

/**
 * 艦が艦娘であるか判定して返す
 * @param ship 
 * @returns 
 */
export function is_player_equipped_ship(ship: EquippedShip): ship is PlayerEquippedShip {
    return 'ship_class' in ship;
}
/**
 * 艦が艦娘であるか判定して返す
 * @param ship 
 * @returns 
 */
export function is_player_naked_ship(ship: NakedShip): ship is PlayerNakedShip {
    return 'ship_class' in ship;
}

/**
 * 艦娘のみの艦群であるか判定して返す
 * @param ships 
 * @returns 
 */
export function is_player_ships(ships: EquippedShip[]): ships is PlayerEquippedShip[] {
    return ships.every(is_player_equipped_ship);
}
/**
 * 艦が深海棲艦であるか判定して返す
 * @param ship 
 * @returns 
 */
export function is_abyssal_ship(ship: EquippedShip): ship is AbyssalEquippedShip {
    return !is_player_equipped_ship(ship);
}
/**
 * 深海棲艦のみの艦群であるか判定して返す
 * @param ships 
 * @returns 
 */
export function is_abyssal_ships(ships: EquippedShip[]): ships is AbyssalEquippedShip[] {
    return ships.every(is_abyssal_ship);
}

/**
 * 艦が撃沈されているか判定して返す
 * @param ship 
 * @returns 
 */
export function is_sunk(ship: EquippedShip): boolean {
    return ship.state.hp_remain <= 0;
}

/**
 * 艦が退避しているか判定して返す
 * @param ship 
 * @returns 
 */
export function is_retreated(ship: EquippedShip): boolean {
    return is_player_equipped_ship(ship) && ship.state.is_retreated;
}

export function is_operational(ship: EquippedShip): boolean {
    return !is_sunk(ship) &&
        !is_retreated(ship);
}

/**
 * PT系の艦であるか判定して返す
 * @param ship 
 * @returns 
 */
export function is_PT(
    ship: EquippedShip,
): boolean {
    return is_abyssal_ship(ship) && ship.flags.is_PT;
}

export function is_Pillbox(
    ship: EquippedShip,
): boolean {
    return is_abyssal_ship(ship) &&
        ship.install_type === 'PillboxModel';
}

export function is_Dock(
    ship: EquippedShip,
): boolean {
    return is_abyssal_ship(ship) &&
        ship.flags.is_Dock;
}

export function is_Harbour_vacation(
    ship: EquippedShip,
): boolean {
    return is_abyssal_ship(ship) &&
        ship.install_type === 'HarbourModel';
}

export function is_Summer_BB(
    ship: EquippedShip,
): boolean {
    return is_abyssal_ship(ship) &&
        ship.flags.is_Summer_BB;
}

export function is_Summer_CV(
    ship: EquippedShip,
): boolean {
    return is_abyssal_ship(ship) &&
        ship.flags.is_Summer_CV;
}

export function is_Summer_CA(
    ship: EquippedShip,
): boolean {
    return is_abyssal_ship(ship) &&
        ship.flags.is_Summer_CA;
}

export function is_French_BB(
    ship: EquippedShip,
): boolean {
    return is_abyssal_ship(ship) &&
        ship.flags.is_French_BB;
}

export function is_Anchorage(
    ship: EquippedShip,
): boolean {
    return is_abyssal_ship(ship) &&
        ship.flags.is_Anchorage;
}

/**
 * 集積地系の艦であるか判定して返す    
 * 陸上型・水上型 両方を含む
 * @param ship 
 */
export function is_Supply_depot(
    ship: EquippedShip,
): boolean {
    return is_abyssal_ship(ship) &&
        (ship.install_type === 'SupplyDepotModel' || ship.flags.is_float_Supply_Depot);
}

/**
 * 陸上型の艦であるか判定して返す
 * @param ship 
 * @returns 
 */
export function is_install_type(
    ship: EquippedShip,
): boolean {
    return is_abyssal_ship(ship) && ship.install_type !== 'No';
}

/**
 * 艦名が艦娘名と等しいか判定して返す
 * @param player_ship_name 
 * @param ship_name 
 * @returns 
 */
export function equal_ship_name(
    player_ship_name: PlayerShipNameJP,
    ship_name: PlayerShipNameJP,
): boolean {
    return player_ship_name === ship_name;
}

/**
 * 指定艦娘名が艦娘名群に含まれるか判定して返す
 * @param match_ship_names 
 * @param search_ship_name 
 * @returns 
 */
export function includes_ship_name(
    match_ship_names: PlayerShipNameJP[],
    search_ship_name: PlayerShipNameJP,
): boolean {
    return match_ship_names.includes(search_ship_name);
}

/**
 * 指定艦娘名が艦娘名群に含まれるか判定して返す(Set&has版)    
 * ! Setを用いる場合は必ず一度だけSetが生成されるようにすること(都度生成だとhas使っても赤字)
 * @param match_ship_names 
 * @param search_ship_name 
 * @returns 
 */
export function has_ship_name(
    match_ship_names: Set<PlayerShipNameJP>,
    search_ship_name: PlayerShipNameJP,
): boolean {
    return match_ship_names.has(search_ship_name);
}

/**
 * 対PT特効を持った天霧系であるか判定して返す
 * @param ship_name 
 * @returns 
 */
export function includes_anti_PT_Amagiri(
    ship: EquippedShip,
): boolean {
    return is_player_equipped_ship(ship) &&
        includes_ship_name(['天霧改二', '天霧改二丁'], ship.name_jp);
}

/**
 * 指定深海艦IDが艦ID群に含まれるか判定して返す
 * @param match_ship_ids 
 * @param search_ship_id 
 * @returns 
 */
export function includes_abyssal_ship_id(
    match_ship_ids: AbyssalShipId[],
    search_ship_id: AbyssalShipId,
): boolean {
    return match_ship_ids.includes(search_ship_id);
}

/**
 * 指定艦種が艦種群に含まれるか判定して返す
 * @param match_ship_types 
 * @param search_ship_type 
 * @returns 
 */
export function includes_ship_type(
    match_ship_types: ShipType[],
    search_ship_type: ShipType,
): boolean {
    return match_ship_types.includes(search_ship_type);
}

export function has_ship_type(
    match_ship_types: Set<ShipType>,
    search_ship_type: ShipType,
): boolean {
    return match_ship_types.has(search_ship_type);
}

/**
 * 艦が戦艦級であるか判定して返す
 * @param ship 
 * @returns 
 */
export function is_battle_ship_category(ship_type: ShipType): boolean {
    const BATTLE_SHIP_CATEGORY: ShipType[] = ['FBB', 'BB', 'BBV'];
    
    return BATTLE_SHIP_CATEGORY.includes(ship_type);
}

/**
 * 空母系であるか判定して返す
 * @param ship 
 * @returns 
 */
export function is_CVs(
    ship: EquippedShip,
): boolean {
    const CARRIER_VESSEL_CATEGORY: ShipType[] = ['CV', 'CVB', 'CVL'];

    return CARRIER_VESSEL_CATEGORY.includes(ship.type_id);
}

export function is_CLs(
    ship_type: ShipType,
): boolean {
    const LIGHT_CRUISERS_CATEGORY: ShipType[] = ['CL', 'CLT', 'CT'];

    return LIGHT_CRUISERS_CATEGORY.includes(ship_type);
}

/**
 * 艦が潜水艦系であるか判定して返す
 * @param ship 
 * @returns 
 */
export function is_submarine_category(ship: EquippedShip): boolean {
    const SUBMARINE_CATEGORY: ShipType[] = ['SS', 'SSV'];

    return SUBMARINE_CATEGORY.includes(ship.type_id);
}

export function is_DD(ship: EquippedShip): boolean {
    return ship.type_id === 'DD';
}

/**
 * 艦のダメージが小破以上であるか判定して返す
 * @param ship 
 * @returns 
 */
export function is_damage_lightly_or_more(ship: EquippedShip): boolean {
    return ship.state.hp_remain / ship.edited_status.hp <= 0.75;
}

/**
 * 艦のダメージが中破以上であるか判定して返す
 * @param ship 
 * @returns 
 */
export function is_damage_moderatery_or_more(
    ship: EquippedShip,
): boolean {
    return ship.state.hp_remain / ship.edited_status.hp <= 0.5;
}

/**
 * 艦が大破状態であるか判定して返す
 * @param ship 
 * @returns 
 */
export function is_damage_heavily(ship: EquippedShip): boolean {
    return ship.state.hp_remain / ship.edited_status.hp <= 0.25;
}

/**
 * 艦がケッカリ済みか判定して返す
 * @param ship
 * @returns 
 */
export function is_married(ship: EquippedShip): boolean {
    return is_player_equipped_ship(ship) && ship.lv >= 100;
}

/**
 * 指定艦級が艦級群に含まれるか判定して返す
 * @param match_classes 
 * @param search_class 
 * @returns 
 */
export function includes_ship_class(
    match_classes: PlayerShipClass[],
    search_class: PlayerShipClass,
): boolean {
    return match_classes.includes(search_class);
}
