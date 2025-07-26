import { TStatusComponent } from "@/types";
import { ShipBaseId, ShipId, ShipLv, ShipNameEN, ShipUniqueId } from "@/types/brands/ship";
import { SpecialItemId, ModernizationType, ShipType, ShipTypeBase, InstallType } from "@/types/ship/ship";
import { Equip } from "../../equip/basic";
import { Country } from "@/datas/equip/bonus";
import { EquipImprovementAddition } from "../../equip/EquipImprovement";
import { PlayerShipClass } from "@/types/ship/shipClass";
import { derive_player_equipped_ship, PlayerEquippedShipOptions } from "./player";
import { derive_equipped_abyssal_ship } from "./abyssal";
import { PlayerShipState, ShipStateBase } from "../state";
import { AbyssalEquipSlot, PlayerEquipSlot } from "@/models/ship/EquipSlot";
import { NakedShip, PlayerNakedShip } from "../naked/base";
import { AntiAirCutinType } from "@/logics/antiAir/cutin/conditions";
import { WeightedAntiAir } from "@/types/brands/other";
import { AbyssalShipFlags, PlayerShipFlags } from "./flags";
import { PlayerShipNameJP } from "@/types/ship/playerNameJP";
import { AbyssalShipNameJP } from "@/types/ship/abyssalNameJP";
import { AbyssalShipId } from "@/types/ship/abyssalId";

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
    ship_name: AbyssalShipNameJP | PlayerShipNameJP,
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
export function is_carrier_vessel_category(
    ship: EquippedShip,
): boolean {
    const CARRIER_VESSEL_CATEGORY: ShipType[] = ['CV', 'CVB', 'CVL'];

    return CARRIER_VESSEL_CATEGORY.includes(ship.type_id);
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
export function is_heavily_damaged(ship: EquippedShip): boolean {
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

type EquippedShipBase = {
    /** 艦隊内における一意の識別ID */
    readonly unique_id: ShipUniqueId;
    /** 艦名(EN) */
    readonly name_en: ShipNameEN;
    
    /** レベル */
    readonly lv: ShipLv;
    /** 装備スロット、および搭載数 */
    readonly slot_counts: ReadonlyArray<number>,
    readonly max_hp: number,
    /** 未装備状態の艦ステータス(lv適用済み) */
    readonly naked_status: TStatusComponent,
    /** 装備の素加算値の総計 */
    readonly total_natural_equip_addition: TStatusComponent,
    /** 実機のステータス画面に表示される数値 */
    readonly view_status: TStatusComponent,
    /** ユーザーによって編集された後の艦ステータス */
    readonly edited_status: TStatusComponent,
    /** 加重対空値 */
    readonly weighted_anti_air: WeightedAntiAir,
    /** 発動可能な対空CIのID配列 */
    readonly triggerable_AACIs: AntiAirCutinType[],
}

export type PlayerEquippedShip = EquippedShipBase & {
    /** 艦ID(データ由来) */
    readonly master_id: ShipId;
    /** 艦名(日) */
    readonly name_jp: PlayerShipNameJP;
    /** 艦種ID */
    readonly type_id: ShipTypeBase;
    /** 未改造時 艦ID */
    readonly base_id: ShipBaseId,
    /** 艦型ID */
    readonly ship_class: PlayerShipClass;
    /** 国籍ID */
    readonly country: Country;

    /** 所持装備 */
    readonly equip_slots: PlayerEquipSlot[];

    readonly special_item_id: SpecialItemId,
    readonly modernizations: ModernizationType,
    /** 装備ボーナスの総計 */
    readonly total_equip_bonus_addition: TStatusComponent,
    /** 装備改修ボーナスの総計 */
    readonly total_equip_improvement_addition: EquipImprovementAddition,
    /** 白襷, 海色リボン加算値 */
    readonly special_item_addition: TStatusComponent,
    /** 対潜攻撃力計算に有効な対潜値の総計 */
    readonly total_contribute_asw_attack_power: number,
    readonly base_fuel: number,
    readonly base_ammo: number,
    /** フラグ類 */
    readonly flags: PlayerShipFlags,
    /** simで更新されるあれこれ */
    readonly state: PlayerShipState,
};

export type AbyssalEquippedShip = EquippedShipBase & {
    /** 艦ID(データ由来) */
    readonly master_id: AbyssalShipId;
    /** 艦種ID */
    readonly type_id: ShipType;
    /** 艦名(日) */
    readonly name_jp: AbyssalShipNameJP;
    /** 所持装備 */
    readonly equip_slots: AbyssalEquipSlot[];
    /**
     * 陸上型種別ID    
     * 同じ系統の艦でもバージョンによって変わったりするので命名は目安
     */
    readonly install_type: InstallType,
    /** フラグ類 */
    readonly flags: AbyssalShipFlags,
    readonly dive_bomb_weak_mod: number,
    readonly land_based_weak_mod: number,
    readonly state: ShipStateBase,
}

export type EquippedShip = PlayerEquippedShip | AbyssalEquippedShip

/**
 * StatusComponentの各プロパティを合算したStatusComponentを返す
 */
export function sum_status_components(
    a: TStatusComponent,
    b: TStatusComponent,
): TStatusComponent {
    return {
        hp: a.hp + b.hp,
        fire_power: a.fire_power + b.fire_power,
        armor: a.armor + b.armor,
        torpedo_power: a.torpedo_power + b.torpedo_power,
        evasion: a.evasion + b.evasion,
        anti_air: a.anti_air + b.anti_air,
        asw: a.asw + b.asw,
        los: a.los + b.los,
        luck: a.luck + b.luck,
        range: a.range + b.range,
        shell_accuracy: a.shell_accuracy + b.shell_accuracy,
        torpedo_accuracy: a.torpedo_accuracy + b.torpedo_accuracy,
        night_battle_accuracy: a.night_battle_accuracy + b.night_battle_accuracy,
        aerial_bomb_power: a.aerial_bomb_power + b.aerial_bomb_power,
        aerial_torpedo_power: a.aerial_torpedo_power + b.aerial_torpedo_power,
    };
}

/**
 * 2つのStatusComponentを合成する。
 * range のみ Math.max、それ以外は加算される。
 * 
 * @param a - 合成対象のステータス1
 * @param b - 合成対象のステータス2
 * @returns 合成後のステータス
 */
export function merge_status_components_with_max_range(
    a: TStatusComponent,
    b: TStatusComponent,
): TStatusComponent {
    const summed = sum_status_components(a, b);
    return {
        ...summed,
        range: Math.max(a.range, b.range),
    };
}