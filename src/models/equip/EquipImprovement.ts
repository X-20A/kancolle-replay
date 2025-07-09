import { DEFAULT_IMPROVEMENT_ADDITION } from "@/datas";
import { ADD_STATUS_KEYS, EQUIP_IMPLOVEMENT_DATAS, EquipImprovementDatas, EquipImprovementType } from "@/datas/equip/improvement";

/**
 * 装備改修によるボーナス値
 */
export type EquipImprovementAddition = {
    shell_power: number,
    shell_accuracy: number,
    shell_evasion: number,
    night_battle_power: number,
    night_battle_accuracy: number,
    torpedo_power: number,
    torpedo_accuracy: number,
    torpedo_evasion: number,
    asw_power: number,
    asw_accuracy: number,
    self_anti_air: number,
    fleet_anti_air: number,
    air_superiority: number,
    los: number,
    armor: number,
    anti_pill_box_mod: number,
    aerial_bomb_power: number,
    aerial_torpedo_power: number,
    smokescreen_rate_flat: number,
}

/**
 * 複数の EquipImprovementAddition の合算を返す
 * @param additions 
 * @returns 
 */
export function sumEquipImprovementAdditions(additions: EquipImprovementAddition[]): EquipImprovementAddition {
    return additions.reduce((acc, current) => ({
        shell_power: acc.shell_power + current.shell_power,
        shell_accuracy: acc.shell_accuracy + current.shell_accuracy,
        shell_evasion: acc.shell_evasion + current.shell_evasion,
        night_battle_power: acc.night_battle_power + current.night_battle_power,
        night_battle_accuracy: acc.night_battle_accuracy + current.night_battle_accuracy,
        torpedo_power: acc.torpedo_power + current.torpedo_power,
        torpedo_accuracy: acc.torpedo_accuracy + current.torpedo_accuracy,
        torpedo_evasion: acc.torpedo_evasion + current.torpedo_evasion,
        asw_power: acc.asw_power + current.asw_power,
        asw_accuracy: acc.asw_accuracy + current.asw_accuracy,
        self_anti_air: acc.self_anti_air + current.self_anti_air,
        fleet_anti_air: acc.fleet_anti_air + current.fleet_anti_air,
        air_superiority: acc.air_superiority + current.air_superiority,
        los: acc.los + current.los,
        armor: acc.armor + current.armor,
        anti_pill_box_mod: acc.anti_pill_box_mod + current.anti_pill_box_mod,
        aerial_bomb_power: acc.aerial_bomb_power + current.aerial_bomb_power,
        aerial_torpedo_power: acc.aerial_torpedo_power + current.aerial_torpedo_power,
        smokescreen_rate_flat: acc.smokescreen_rate_flat + current.smokescreen_rate_flat,
    }), DEFAULT_IMPROVEMENT_ADDITION);
}

export function derive_equip_improvement_addition(
    improvement_type: EquipImprovementType,
    improvement_lv: number,
): EquipImprovementAddition {
    const improvement_data = EQUIP_IMPLOVEMENT_DATAS[improvement_type];

    return ADD_STATUS_KEYS.reduce((total, key) => {
        const config = improvement_data[key];
        if (!config) return total;

        const value =
            config.coeffient * (config.is_sqrt ? Math.sqrt(improvement_lv) : improvement_lv)

        return {
            ...total,
            [key]: value,
        };
    }, DEFAULT_IMPROVEMENT_ADDITION);
}