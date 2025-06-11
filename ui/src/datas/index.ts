import { COUNTRY_DATAS } from "./ship/country";
import { SPECIAL_ITEM_BONUS_DATAS } from "./equip/SpecialItem";
import { PLAYER_SHIP_DATAS } from "./ship/player";
import { TStatusComponent } from "@/types";

export const DEFAULT_STATUS_COMPONENT: TStatusComponent = {
    hp: 0,
    fire_power: 0,
    armor: 0,
    torpedo_power: 0,
    evasion: 0,
    anti_air: 0,
    asw: 0,
    los: 0,
    luck: 0,
    range: 0,
    shell_accuracy: 0,
    torpedo_accuracy: 0,
    night_battle_accuracy: 0,
    aerial_bomb_power: 0,
    aerial_torpedo_power: 0,
};

export const SHIP_DATA_SET = {
    ship_datas: PLAYER_SHIP_DATAS,
    country_datas: COUNTRY_DATAS,
    special_item_datas: SPECIAL_ITEM_BONUS_DATAS,
    default_status_component: DEFAULT_STATUS_COMPONENT,
}

export type TShipDataSet = typeof SHIP_DATA_SET