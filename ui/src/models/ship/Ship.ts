import { TStatusComponent } from "@/types";
import { ShipBaseId, ShipId, ShipLv, ShipNameEN, ShipNameJP, ShipUniqueId } from "@/types/brands/ship";
import { SpecialItemId, PlayerShipFlags, ModernizationType, ShipType, SlotType } from "@/types/ship/ship";
import { EquipBase } from "../equip/Equip";
import { Country } from "@/datas/equip/bonus";
import { deriveNakedPlayerShip as deriveNakedPlayerShip } from "./NakedShip";
import { deriveEquipBonusAddition } from "../equip/EquipBonus";
import { EquipImprovementAddition, sumEquipImprovementAdditions } from "../equip/EquipImprovement";
import { deriveSpecialItemAddition } from "../equip/SpecialItem";
import { deriveAswFlags } from "./aswFlags";
import { DEFAULT_STATUS_COMPONENT } from "@/datas";
import { PlayerShipClass } from "@/types/ship/shipClass";

/**
 * Ship型: 艦船の情報を表現する型
 */
export type PlayerShip = {
    /** 艦ID(データ由来) */
    readonly master_id: number;
    /** 未改造時 艦ID */
    readonly base_id: ShipBaseId,
    /** 艦隊内における一意の識別ID */
    readonly unique_id: ShipUniqueId;
    /** 艦名(EN) */
    readonly name_en: ShipNameEN;
    /** 艦名(日) */
    readonly name_jp: ShipNameJP;
    /** レベル */
    readonly lv: ShipLv;
    /** 艦種ID */
    readonly type_id: ShipType;
    /** 艦型ID */
    readonly ship_class: PlayerShipClass;
    /** 国籍ID */
    readonly country: Country;
    /** 所持装備 */
    readonly equips: EquipBase[];
    /** 装備スロット、および搭載数 */
    readonly slots: SlotType,
    /** フラグ類 */
    readonly flags: PlayerShipFlags,
    /** 未装備状態の艦ステータス(lv適用済み) */
    readonly naked_status: TStatusComponent,
    /** 装備の素加算値の総計 */
    readonly total_natural_equip_addition: TStatusComponent,
    /** 装備ボーナスの総計 */
    readonly total_equip_bonus_addition: TStatusComponent,
    /** 装備改修ボーナスの総計 */
    readonly total_equip_improvement_addition: EquipImprovementAddition,
    /** 白襷, 海色リボン加算値 */
    readonly special_item_addition: TStatusComponent,
    /** 実機のステータス画面に表示される数値 */
    readonly view_status: TStatusComponent,
    /** ユーザーによって編集された後の艦ステータス */
    readonly edited_status: TStatusComponent,
    /** 対潜攻撃力計算に有効な対潜値の総計 */
    readonly total_contribute_asw_attack_power: number,
};

/**
 * StatusComponentの各プロパティを合算したStatusComponentを返す
 */
function sumStatusComponents(
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
function mergeStatusComponentsWithMaxRange(
    a: TStatusComponent,
    b: TStatusComponent,
): TStatusComponent {
    const summed = sumStatusComponents(a, b);
    return {
        ...summed,
        range: Math.max(a.range, b.range),
    };
}

export function derivePlayerShip(
    unique_id: ShipUniqueId,
    lv: ShipLv,
    special_item_id: SpecialItemId,
    ship_id: ShipId,
    _equips: EquipBase[],
    modernizations?: ModernizationType,  
    edit_input?: TStatusComponent & {
        slots: number[],
    },
): PlayerShip {
    const naked_ship = deriveNakedPlayerShip(
        lv,
        ship_id,
    );

    const master_id = naked_ship.master_id;
    const base_id = naked_ship.base_id;
    const name_en = naked_ship.name_en;
    const name_jp = naked_ship.name_jp;
    const type_id = naked_ship.type_id;
    const ship_class = naked_ship.ship_class;
    const country = naked_ship.country;
    const equips = _equips;
    const slots: SlotType = {
        master: naked_ship.slots,
        edited: edit_input?.slots ?? naked_ship.slots,
    }
    
    const asw_flags = deriveAswFlags(_equips);
    const flags = {
        ...naked_ship.flags,
        asw_equip: asw_flags,
    };

    const naked_status = naked_ship.status;
    const total_natural_equip_addition = _equips
        .map(equip => equip.natural_addition)
        .reduce(mergeStatusComponentsWithMaxRange, DEFAULT_STATUS_COMPONENT);
    const total_equip_bonus_addition = deriveEquipBonusAddition(naked_ship, _equips);
    const total_equip_improvement_addition = 
        sumEquipImprovementAdditions(_equips.map(equip => equip.improvement_addition));
    const special_item_addition = deriveSpecialItemAddition(special_item_id);
    
    // 射程は素ステータスと装備素射程の最大値に装備ボーナスを加算
    const partial_status = [
        naked_status,
        total_natural_equip_addition,
    ].reduce(mergeStatusComponentsWithMaxRange, DEFAULT_STATUS_COMPONENT);
    const view_status = [
        partial_status,
        total_equip_bonus_addition,
        special_item_addition,
    ].reduce(sumStatusComponents, DEFAULT_STATUS_COMPONENT);

    const total_valid_asw = _equips
        .map(equip => equip.contribute_asw_attack_power)
        .reduce((acc, curr) => {
            return acc + curr;
        }, 0);

    const edited_status = edit_input ?? view_status;

    return {
        master_id,
        base_id,
        unique_id,
        name_en,
        name_jp,
        lv,
        type_id,
        ship_class,
        country,
        equips,
        slots,
        flags,
        naked_status,
        total_natural_equip_addition,
        total_equip_bonus_addition,
        total_equip_improvement_addition,
        special_item_addition,
        view_status,
        edited_status,
        total_contribute_asw_attack_power: total_valid_asw,
    }
}