import { TStatusComponent } from "@/types";
import { ShipBaseId, ShipId, ShipLv, ShipNameEN, ShipNameJP, ShipUniqueId } from "@/types/brands/ship";
import { SpecialItemId, PlayerShipFlags, ModernizationType, ShipType, ShipTypeBase } from "@/types/ship/ship";
import { Equip } from "../../equip/basic";
import { Country } from "@/datas/equip/bonus";
import { EquipImprovementAddition } from "../../equip/EquipImprovement";
import { PlayerShipClass } from "@/types/ship/shipClass";
import { derive_equipped_player_ship } from "./player";
import { derive_equipped_abyssal_ship } from "./abyssal";
import { AbyssalShipFlags } from "@/types/ship/abyssal";

export function is_player_ship(ship: EquippedShip): ship is PlayerEquippedShip {
    return ship.master_id < 1500;
}

type EquipedShipBase = {
    /** 艦ID(データ由来) */
    readonly master_id: number;
    /** 艦隊内における一意の識別ID */
    readonly unique_id: ShipUniqueId;
    /** 艦名(EN) */
    readonly name_en: ShipNameEN;
    /** 艦名(日) */
    readonly name_jp: ShipNameJP;
    /** レベル */
    readonly lv: ShipLv;
    /** 所持装備 */
    readonly equips: Equip[];
    /** 装備スロット、および搭載数 */
    readonly slots: ReadonlyArray<number>,
    /** 未装備状態の艦ステータス(lv適用済み) */
    readonly naked_status: TStatusComponent,
    /** 装備の素加算値の総計 */
    readonly total_natural_equip_addition: TStatusComponent,
    /** 実機のステータス画面に表示される数値 */
    readonly view_status: TStatusComponent,
    /** ユーザーによって編集された後の艦ステータス */
    readonly edited_status: TStatusComponent,
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
};

export type AbyssalEquippedShip = EquipedShipBase & {
    /** 艦種ID */
    readonly type_id: ShipType;
    /** フラグ類 */
    readonly flags: AbyssalShipFlags,
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
 * 2つのステータスコンポーネントを合成する。
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
    unique_id: ShipUniqueId,
    lv: ShipLv,
    special_item_id: SpecialItemId,
    ship_id: ShipId,
    equips: Equip[],
    modernizations?: ModernizationType,
    edit_input?: TStatusComponent,
    slots?: number[],
): EquippedShip {
    return ship_id < 1500
        ? derive_equipped_player_ship(
            unique_id,
            lv,
            special_item_id,
            ship_id,
            equips,
            modernizations,
            edit_input,
            slots,
        )
        : derive_equipped_abyssal_ship(
            unique_id,
            ship_id,
        );
}