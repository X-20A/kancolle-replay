import { StatusComponent } from "@/types";
import { ShipId, ShipLv, ShipNameEN, ShipNameJP, ShipUniqueId } from "@/types/brands/ship";
import { PlayerShipClass, PlayerShipFlags, ShipDatas, ShipType, SpecialItemId } from "@/types/ship/ship";
import { Equip } from "../equip/Equip";
import { Country } from "@/datas/equip/bonus";
import { createNakedPlayerShip } from "./NakedShip";
import { EquipDatas } from "@/types/equip/player";
import { CountryDatas } from "@/datas/ship/country";
import { createEquipBonus } from "../equip/EquipBonus";
import { sumEquipImprovementAdditions } from "../equip/EquipImprovement";
import { EquipImprovementDatas } from "@/datas/equip/improvement";

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
    readonly type: ShipType;
    /** 艦型ID */
    readonly ship_class: PlayerShipClass;
    /** 国籍ID */
    readonly country: Country;
    /** 装備スロット、および搭載数 */
    readonly slots: Readonly<number[]>,
    /** フラグ類 */
    readonly flags: PlayerShipFlags,
    /** 未装備状態の艦ステータス(lv適用済み) */
    readonly naked_status: StatusComponent,
    /** 白襷, 海色リボン加算値 */
    readonly special_item_addition: StatusComponent,
    /** 実機のステータス画面に表示される数値 */
    readonly display_status: StatusComponent,
    /** ユーザーによって編集された後の艦ステータス */
    readonly edited_status: StatusComponent,
};

export function createPlayerShip(
    ship_datas: ShipDatas,
    country_datas: CountryDatas,
    equip_datas: EquipDatas,
    equip_improvement_datas: EquipImprovementDatas,
    unique_id: ShipUniqueId,
    lv: ShipLv,
    ship_id: ShipId,
    special_item: SpecialItemId,
    equips: Equip[],
    edit_input?: StatusComponent,
): PlayerShip {
    const naked_ship = createNakedPlayerShip(
        ship_datas,
        country_datas,
        lv,
        ship_id,
    );

    const master_id = naked_ship.master_id;
    const name_en = naked_ship.name_en;
    const name_jp = naked_ship.name_jp;
    const type = naked_ship.type;
    const ship_class = naked_ship.ship_class;
    const country = naked_ship.country;
    const slots = naked_ship.slots;
    const flags = naked_ship.flags;
    const naked_status = naked_ship.status;

    const equip_bonuses = createEquipBonus(naked_ship, equips);
    const total_equip_improvement_bonus = 
        sumEquipImprovementAdditions(equips.map(equip => equip.improvement_addition));
    const special_item_addition = create

    return {
        master_id,
        unique_id,
        name_en,
        name_jp,
        lv,
        type,
        ship_class,
        country,
        slots,
        flags,
        naked_status,

    }
}