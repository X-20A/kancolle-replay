import { StatusComponent } from "@/types";
import { ShipDatas, ShipType } from "@/types/ship";

export type ShipMaster = {
    name_en: string,
    name_jp: string,
    type: ShipType,
    status: StatusComponent,
    flags: 
}

export function createMasterShip(
    master_id: number,
    ship_datas: ShipDatas,
): ShipMaster {
    const ship_data = ship_datas[master_id];
    if (!ship_data) throw new Error(`id: ${master_id}の艦が見つかりませんでした`);


}