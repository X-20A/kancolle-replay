import { COUNTRY_DATAS } from "./ship/country";
import { SPECIAL_ITEM_BONUS_DATAS } from "./equip/SpecialItem";
import { PLAYER_SHIP_DATAS } from "./ship/player";
import { EquipImprovementAddition } from "./equip/improvement";

/**
 * 装備改修によるボーナス値
 */
export const DEFAULT_IMPROVEMENT_ADDITION: EquipImprovementAddition = {
    shell_power: 0,
    shell_accuracy: 0,
    shell_evasion: 0,
    night_battle_power: 0,
    night_battle_accuracy: 0,
    torpedo_power: 0,
    torpedo_accuracy: 0,
    torpedo_evasion: 0,
    asw_power: 0,
    asw_accuracy: 0,
    self_anti_air: 0,
    fleet_anti_air: 0,
    air_superiority: 0,
    los: 0,
    armor: 0,
    anti_pill_box_mod: 0,
    aerial_bomb_power: 0,
    aerial_torpedo_power: 0,
    smokescreen_rate_flat: 0,
}