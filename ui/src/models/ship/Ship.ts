import { TStatusComponent } from "@/types";
import { ShipId, ShipLv, ShipNameEN, ShipNameJP, ShipUniqueId } from "@/types/brands/ship";
import { PlayerShipClass, ShipDatas, ShipType, SpecialItemId, PlayerShipFlags } from "@/types/ship/ship";
import { Equip } from "../equip/Equip";
import { Country } from "@/datas/equip/bonus";
import { deriveNakedPlayerShip as deriveNakedPlayerShip } from "./NakedShip";
import { CountryDatas } from "@/datas/ship/country";
import { deriveEquipBonusAddition } from "../equip/EquipBonus";
import { EquipImprovementAddition, sumEquipImprovementAdditions } from "../equip/EquipImprovement";
import { deriveSpecialItemAddition } from "../equip/SpecialItem";
import { SpecialItemDatas } from "@/datas/equip/SpecialItem";
import { deriveAswFlags } from "./aswFlags";
import { EquipTypeDatas } from "@/datas/equip/typeData";

/**
 * Ship型: 艦船の情報を表現する型
 */
export type PlayerShip = {
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
    /** 艦種ID */
    readonly type_id: ShipType;
    /** 艦型ID */
    readonly ship_class: PlayerShipClass;
    /** 国籍ID */
    readonly country: Country;
    /** 装備スロット、および搭載数 */
    readonly slots: Readonly<number[]>,
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

export function derivePlayerShip(
    ship_datas: ShipDatas,
    country_datas: CountryDatas,
    equip_type_datas: EquipTypeDatas,
    special_item_datas: SpecialItemDatas,
    unique_id: ShipUniqueId,
    lv: ShipLv,
    ship_id: ShipId,
    special_item_id: SpecialItemId,
    equips: Equip[],
    edit_input?: TStatusComponent,
): PlayerShip {
    const naked_ship = deriveNakedPlayerShip(
        ship_datas,
        country_datas,
        lv,
        ship_id,
    );

    const master_id = naked_ship.master_id;
    const name_en = naked_ship.name_en;
    const name_jp = naked_ship.name_jp;
    const type_id = naked_ship.type;
    const ship_class = naked_ship.ship_class;
    const country = naked_ship.country;
    const slots = naked_ship.slots;

    const asw_flags = deriveAswFlags(equip_type_datas, equips);
    const flags = {
        ...naked_ship.flags,
        asw_equip: asw_flags,
    };

    const naked_status = naked_ship.status;
    const total_natural_equip_addition = equips
        .map(equip => equip.natural_addition)
        .reduce(sumStatusComponents);
    const total_equip_bonus_addition = deriveEquipBonusAddition(naked_ship, equips);
    const total_equip_improvement_addition = 
        sumEquipImprovementAdditions(equips.map(equip => equip.improvement_addition));
    const special_item_addition = deriveSpecialItemAddition(
        special_item_datas,
        special_item_id,
    );

    const view_status = [
        naked_status,
        total_natural_equip_addition,
        total_equip_bonus_addition,
        special_item_addition,
    ].reduce(sumStatusComponents);

    const edited_status = edit_input ?? view_status;

    return {
        master_id,
        unique_id,
        name_en,
        name_jp,
        lv,
        type_id,
        ship_class,
        country,
        slots,
        flags,
        naked_status,
        total_natural_equip_addition,
        total_equip_bonus_addition,
        total_equip_improvement_addition,
        special_item_addition,
        view_status,
        edited_status,
    }
}