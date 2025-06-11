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
    land_base_bomb: number,
    land_base_torpedo: number,
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
        land_base_bomb: acc.land_base_bomb + current.land_base_bomb,
        land_base_torpedo: acc.land_base_torpedo + current.land_base_torpedo,
        smokescreen_rate_flat: acc.smokescreen_rate_flat + current.smokescreen_rate_flat,
    }), {
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
        land_base_bomb: 0,
        land_base_torpedo: 0,
        smokescreen_rate_flat: 0,
    });
}

export function deriveEquipImprovementAddition(
    improvement_type: EquipImprovementType,
    improvement_lv: number,
): EquipImprovementAddition {
    const base = EQUIP_IMPLOVEMENT_DATAS[improvement_type] ?? {};

    return ADD_STATUS_KEYS.reduce((acc, key) => {
        const config = base[key];
        if (!config) return acc;

        const value =
            config.coeffient * (config.is_sqrt ? Math.sqrt(improvement_lv) : improvement_lv)

        return {
            ...acc,
            [key]: value,
        };
    }, {} as EquipImprovementAddition);
}