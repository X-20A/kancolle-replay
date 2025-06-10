import { COUNTRY_DATAS } from "./ship/country";
import { SPECIAL_ITEM_BONUS_DATAS } from "./equip/SpecialItem";
import { PLAYER_SHIP_DATAS } from "./ship/player";
import PLAYER_EQUIP_DATAS from "./equip/base/player";
import { EQUIP_TYPE_DATAS } from "./equip/typeData";
import { EQUIP_IMPLOVEMENT_DATAS } from "./equip/improvement";
import { TRANSPORT_EQUIP_DATAS } from "./equip/transportEquip";

export const EQUIP_DATA_SET = {
    equip_datas: PLAYER_EQUIP_DATAS,
    equip_type_datas: EQUIP_TYPE_DATAS,
    equip_improvement_datas: EQUIP_IMPLOVEMENT_DATAS,
    transport_equip_datas: TRANSPORT_EQUIP_DATAS,
}

export type TEquipDataSet = typeof EQUIP_DATA_SET

export const SHIP_DATA_SET = {
    ship_datas: PLAYER_SHIP_DATAS,
    country_datas: COUNTRY_DATAS,
    special_item_datas: SPECIAL_ITEM_BONUS_DATAS,
}

export type TShipDataSet = typeof SHIP_DATA_SET