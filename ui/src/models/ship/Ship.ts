import { StatusComponent } from "@/types";
import { UniqueId } from "@/types/brands/ship";
import { ShipClass, ShipType } from "@/types/ship";
import { Equip } from "../equip/Equip";
import { Country } from "@/datas/equip/bonus";
import { createNakedPlayerShip } from "./ShipMaster";

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
    readonly class: ShipClass;
    /** 国籍ID */
    readonly country: Country;
    /** 装備スロット、および搭載数 */
    readonly slots: number[],
    /** フラグ類 */
    readonly flags: boolean[],
    /** マスターデータままの艦ステータス(lv適用済み) */
    readonly master_status: StatusComponent,
    /** 白襷, 海色リボン加算値 */
    readonly special_item_addition: StatusComponent,
    /** 艦マスターデータの艦データ(lv適用済み)に全ての加算値を適用したステータス */
    readonly total_natural_status: StatusComponent,
    /** ユーザーによって編集された後の艦ステータス */
    readonly edited_status: StatusComponent,
};

export function createShip(
    master_id: number,
    lv: number,
    equips: Equip,
    edit_input: StatusComponent,
): PlayerShip {
    const ship_master = createNakedPlayerShip
}