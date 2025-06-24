import { CombinedFleetFormationType, SingleFleetFormationType } from "@/types";

export type IntegratedFormationType = Exclude<SingleFleetFormationType, 'Vanguard'>
    | 'VanguardFront'
    | 'VanguardRear'
    | CombinedFleetFormationType

type FormationData = {
    shell_power_mod: number,
    torpedo_power_mod: number,
    ASW_mod: number,
    anti_air_mod: number,
    shell_accuracy_mod: number,
    torpedo_accuracy_mod: number,
    night_battle_accuracy_mod: number,
    ASW_accuracy_mod: number,
    shell_evasion_mod: number,
    torpedo_evasion_mod: number,
    night_battle_evasion_mod: number,
    ASW_evasion_mod: number,
}

type FormationDatas = Record<IntegratedFormationType, FormationData>
/**
 * 各陣形における補正値    
 * ! 取得関数を通させたいので export しない
 */
const FORMATION_MOD_DATAS: FormationDatas = {
    LineAhead: {
        shell_power_mod: 1,
        torpedo_power_mod: 1,
        ASW_mod: 0.6,
        anti_air_mod: 1,
        shell_accuracy_mod: 1,
        torpedo_accuracy_mod: 1,
        night_battle_accuracy_mod: 1,
        ASW_accuracy_mod: 1,
        shell_evasion_mod: 1,
        torpedo_evasion_mod: 1,
        night_battle_evasion_mod: 1,
        ASW_evasion_mod: 1,
    },
    DoubleLine: {
        shell_power_mod: 0.8,
        torpedo_power_mod: 0.8,
        ASW_mod: 0.8,
        anti_air_mod: 1.2,
        shell_accuracy_mod: 1.2,
        torpedo_accuracy_mod: 0.8,
        night_battle_accuracy_mod: 0.9,
        ASW_accuracy_mod: 1,
        shell_evasion_mod: 1,
        torpedo_evasion_mod: 1,
        night_battle_evasion_mod: 1,
        ASW_evasion_mod: 1,
    },
    Diamond: {
        shell_power_mod: 0.7,
        torpedo_power_mod: 0.7,
        ASW_mod: 1.2,
        anti_air_mod: 1.6,
        shell_accuracy_mod: 1,
        torpedo_accuracy_mod: 0.4,
        night_battle_accuracy_mod: 0.7,
        ASW_accuracy_mod: 1,
        shell_evasion_mod: 1.1,
        torpedo_evasion_mod: 1.1,
        night_battle_evasion_mod: 1,
        ASW_evasion_mod: 1,
    },
    Echelon: {
        shell_power_mod: 0.75,
        torpedo_power_mod: 0.6,
        ASW_mod: 1.1,
        anti_air_mod: 1,
        shell_accuracy_mod: 1.2,
        torpedo_accuracy_mod: 0.75,
        night_battle_accuracy_mod: 0.9,
        ASW_accuracy_mod: 1,
        shell_evasion_mod: 1.4,
        torpedo_evasion_mod: 1.3,
        night_battle_evasion_mod: 1.3,
        ASW_evasion_mod: 1.3,
    },
    LineAbreast: {
        shell_power_mod: 0.6,
        torpedo_power_mod: 0.6,
        ASW_mod: 1.3,
        anti_air_mod: 1,
        shell_accuracy_mod: 1.2,
        torpedo_accuracy_mod: 0.3,
        night_battle_accuracy_mod: 0.8,
        ASW_accuracy_mod: 1,
        shell_evasion_mod: 1.3,
        torpedo_evasion_mod: 1.4,
        night_battle_evasion_mod: 1.2,
        ASW_evasion_mod: 1.1,
    },
    VanguardFront: {
        shell_power_mod: 0.5,
        torpedo_power_mod: 1,
        ASW_mod: 1,
        anti_air_mod: 1.1,
        shell_accuracy_mod: 0.8,
        torpedo_accuracy_mod: 0.7,
        night_battle_accuracy_mod: 0.8,
        ASW_accuracy_mod: 1,
        shell_evasion_mod: 1,
        torpedo_evasion_mod: 1,
        night_battle_evasion_mod: 1,
        ASW_evasion_mod: 1,
    },
    VanguardRear: {
        shell_power_mod: 1,
        torpedo_power_mod: 1,
        ASW_mod: 0.6,
        anti_air_mod: 1.1,
        shell_accuracy_mod: 1.2,
        torpedo_accuracy_mod: 0.9,
        night_battle_accuracy_mod: 1.2,
        ASW_accuracy_mod: 1.1,
        shell_evasion_mod: 1,
        torpedo_evasion_mod: 1,
        night_battle_evasion_mod: 1,
        ASW_evasion_mod: 1,
    },
    CruisingFormation_1: {
        shell_power_mod: 0.8,
        torpedo_power_mod: 0.7,
        ASW_mod: 1.3,
        anti_air_mod: 1.1,
        shell_accuracy_mod: 0.9,
        torpedo_accuracy_mod: 0.6,
        night_battle_accuracy_mod: 0.8,
        ASW_accuracy_mod: 1.25,
        shell_evasion_mod: 1,
        torpedo_evasion_mod: 1,
        night_battle_evasion_mod: 1,
        ASW_evasion_mod: 1,
    },
    CruisingFormation_2: {
        shell_power_mod: 1,
        torpedo_power_mod: 0.9,
        ASW_mod: 1.1,
        anti_air_mod: 1,
        shell_accuracy_mod: 1,
        torpedo_accuracy_mod: 1,
        night_battle_accuracy_mod: 0.9,
        ASW_accuracy_mod: 1,
        shell_evasion_mod: 1.2,
        torpedo_evasion_mod: 1,
        night_battle_evasion_mod: 1,
        ASW_evasion_mod: 1,
    },
    CruisingFormation_3: {
        shell_power_mod: 0.7,
        torpedo_power_mod: 0.6,
        ASW_mod: 1,
        anti_air_mod: 1.5,
        shell_accuracy_mod: 0.8,
        torpedo_accuracy_mod: 0.35,
        night_battle_accuracy_mod: 0.7,
        ASW_accuracy_mod: 1.1,
        shell_evasion_mod: 1.1,
        torpedo_evasion_mod: 1,
        night_battle_evasion_mod: 1.1,
        ASW_evasion_mod: 1,
    },
    CruisingFormation_4: {
        shell_power_mod: 1.1,
        torpedo_power_mod: 1,
        ASW_mod: 0.7,
        anti_air_mod: 1,
        shell_accuracy_mod: 1.1,
        torpedo_accuracy_mod: 1.2,
        night_battle_accuracy_mod: 1,
        ASW_accuracy_mod: 0.7,
        shell_evasion_mod: 1,
        torpedo_evasion_mod: 1,
        night_battle_evasion_mod: 1,
        ASW_evasion_mod: 1,
    },
}

/**
 * 警戒陣における主力艦であるか
 * @param ships_length 
 * @param ship_index 
 * @returns 
 */
export function is_front(
    ships_length: number,
    ship_index: number,
): boolean {
    return (
        (ships_length >= 6 && ship_index <= 2) ||
        (ships_length <= 5 && ship_index <= 1)
    )
}

/**
 * 通常艦隊(含遊撃)の陣形補正値を返す
 * @param formation 
 * @param ships_length 
 * @param ship_index 
 * @returns 
 */
export function get_single_fleet_formation_mods(
    formation: SingleFleetFormationType,
    ships_length: number,
    ship_index: number,
): FormationData {
    if (formation !== 'Vanguard') return FORMATION_MOD_DATAS[formation];

    const integrated_fleet_type: IntegratedFormationType =
        is_front(ships_length, ship_index)
            ? 'VanguardFront'
            : 'VanguardRear';

    return FORMATION_MOD_DATAS[integrated_fleet_type];
}

/**
 * 連合艦隊の陣形補正値を返す
 * @param formation 
 * @returns 
 */
export function get_combined_fleet_formation_mods(
    formation: CombinedFleetFormationType,
): FormationData {
    return FORMATION_MOD_DATAS[formation];
}