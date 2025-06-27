import { TStatusComponent } from "@/types";
import { ShipBaseId, ShipId, ShipLv, ShipNameEN, ShipNameJP, ShipUniqueId } from "@/types/brands/ship";
import { SpecialItemId, PlayerShipFlags, ModernizationType, ShipType, ShipTypeBase, InstallType } from "@/types/ship/ship";
import { Equip } from "../../equip/basic";
import { Country } from "@/datas/equip/bonus";
import { EquipImprovementAddition } from "../../equip/EquipImprovement";
import { PlayerShipClass } from "@/types/ship/shipClass";
import { derive_equipped_player_ship, EquippedPlayerShipOptions } from "./player";
import { derive_equipped_abyssal_ship } from "./abyssal";
import { AbyssalShipFlags } from "@/types/ship/abyssal";
import { PlayerShipState, ShipStateBase } from "../state";
import { EquipBuilt } from "@/models/equip/EquipBuilt";
import { PrepareAaciInfo } from "../aaciPreparate";
import { NakedShip, PlayerNakedShip } from "../naked/base";

export function is_player_ship(ship: EquippedShip): ship is PlayerEquippedShip;
export function is_player_ship(ship: NakedShip): ship is PlayerNakedShip;
/**
 * 艦がPlayer艦であるか判定して返す
 * @param ship 
 * @returns 
 */
export function is_player_ship(ship: EquippedShip | NakedShip): ship is PlayerEquippedShip {
    return ship.master_id < 1500;
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
 * PT系の艦であるか判定して返す
 * @param ship 
 * @returns 
 */
export function is_PT(
    ship: EquippedShip,
): boolean {
    return !is_player_ship(ship) && ship.flags.is_PT;
}

/**
 * 陸上型の艦であるか判定して返す
 * @param ship 
 * @returns 
 */
export function is_install(
    ship: EquippedShip,
): boolean {
    return !is_player_ship(ship) && ship.install_type !== 'No';
}

/**
 * 艦が潜水艦系であるか判定して返す
 * @param ship 
 * @returns 
 */
export function is_submarine_category(ship: EquippedShip): boolean {
    return ['SS', 'SSV'].includes(ship.type_id)
}

/**
 * 艦のダメージが小破以上であるか判定して返す
 * @param ship 
 * @returns 
 */
export function is_damage_lightly_or_more(ship: EquippedShip): boolean {
    return ship.state.hp_remain / ship.edited_status.hp <= 0.75;
}

type EquipedShipBase = {
    /** 艦ID(データ由来) */
    readonly master_id: ShipId;
    /** 艦隊内における一意の識別ID */
    readonly unique_id: ShipUniqueId;
    /** 艦名(EN) */
    readonly name_en: ShipNameEN;
    /** 艦名(日) */
    readonly name_jp: ShipNameJP;
    /** レベル */
    readonly lv: ShipLv;
    /** 所持装備 */
    readonly equip_builts: EquipBuilt[];
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
    readonly prepare_aaci_info: PrepareAaciInfo,
}

export type PlayerEquippedShip = EquipedShipBase & {
    /** 艦種ID */
    readonly type_id: ShipTypeBase;
    /** 未改造時 艦ID */
    readonly base_id: ShipBaseId,
    /** 艦型ID */
    readonly ship_class: PlayerShipClass;
    /** 国籍ID */
    readonly country: Country;

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
    /** フラグ類 */
    readonly flags: PlayerShipFlags,
    /** simで更新されるあれこれ */
    readonly state: PlayerShipState,
};

export type AbyssalEquippedShip = EquipedShipBase & {
    /** 艦種ID */
    readonly type_id: ShipType;
    /**
     * 陸上型種別ID    
     * 同じ系統の艦でもバージョンによって変わったりするので命名は目安
     */
    readonly install_type: InstallType,
    /** フラグ類 */
    readonly flags: AbyssalShipFlags,
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

export function derive_equipped_ship(
    lv: ShipLv,
    special_item_id: SpecialItemId,
    ship_id: ShipId,
    equips: Equip[],
    options: EquippedPlayerShipOptions,
): EquippedShip {
    return ship_id < 1500
        ? derive_equipped_player_ship(
            lv,
            special_item_id,
            ship_id,
            equips,
            options,
        )
        : derive_equipped_abyssal_ship(
            ship_id,
        );
}