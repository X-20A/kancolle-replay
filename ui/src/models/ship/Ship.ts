import { StatusComponent } from "@/types";
import { ShipId, ShipLv, UniqueId } from "@/types/brands/ship";
import { PlayerShipClass, ShipDatas, ShipType } from "@/types/ship/ship";
import { Equip } from "../equip/Equip";
import { Country } from "@/datas/equip/bonus";
import { createNakedPlayerShip } from "./NakedShip";
import { EquipDatas } from "@/types/equip";
import { CountryDatas } from "@/datas/ship/country";
import { createEquipBonus } from "../equip/EquipBonus";
import { createEquipImprovement } from "../equip/EquipImprovement";

/**
 * Ship型: 艦船の情報を表現する型
 */
export type PlayerShip = {
    /** 艦ID(データ由来) */
    readonly master_id: number;
    /** 艦隊内における一意の識別ID */
    readonly unique_id: UniqueId;
    /** 艦名 */
    readonly name: string;
    /** レベル */
    readonly lv: number;
    /** 艦種ID */
    readonly type: ShipType;
    /** 艦型ID */
    readonly class: PlayerShipClass;
    /** 国籍ID */
    readonly country: Country;
    /** 装備スロット、および搭載数 */
    readonly slots: number[],
    /** フラグ類 */
    readonly flags: boolean[],
    /** 未装備状態の艦ステータス(lv適用済み) */
    readonly naked_status: StatusComponent,
    /** 白襷, 海色リボン加算値 */
    readonly special_item_addition: StatusComponent,
    /** 艦マスターデータの艦データ(lv適用済み)に全ての加算値を適用したステータス */
    readonly total_natural_status: StatusComponent,
    /** ユーザーによって編集された後の艦ステータス */
    readonly edited_status: StatusComponent,
};

export function createPlayerShip(
    ship_datas: ShipDatas,
    country_datas: CountryDatas,
    equip_datas: EquipDatas,
    lv: ShipLv,
    ship_id: ShipId,
    equips: Equip[],
    edit_input?: StatusComponent,
): PlayerShip {
    const naked_ship = createNakedPlayerShip(
        ship_datas,
        country_datas,
        lv,
        ship_id,
    );

    const equip_bonuses = createEquipBonus(naked_ship, equips);
    const equip_improvement_bonus = createEquipImprovement();
}