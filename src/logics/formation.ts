import { CombinedFleetFormationType, SingleFleetFormationType } from "@/types";
import { Brand } from "@/types/brands";

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

export type ShellPowerFormationMod = Brand<number, 'ShellPowerMod'>;
export type TorpedoPowerFormationMod = Brand<number, 'TorpedoPowerMod'>;
export type ASWFormationMod = Brand<number, 'ASWMod'>;
export type AntiAirFormationMod = Brand<number, 'AntiAirMod'>;
export type ShellAccuracyFormationMod = Brand<number, 'ShellAccuracyMod'>;
export type TorpedoAccuracyFormationMod = Brand<number, 'TorpedoAccuracyMod'>;
export type NightBattleAccuracyFormationMod = Brand<number, 'NightBattleAccuracyMod'>;
export type ASWAccuracyFormationMod = Brand<number, 'ASWAccuracyMod'>;
export type ShellEvasionFormationMod = Brand<number, 'ShellEvasionMod'>;
export type TorpedoEvasionFormationMod = Brand<number, 'TorpedoEvasionMod'>;
export type NightBattleEvasionFormationMod = Brand<number, 'NightBattleEvasionMod'>;
export type ASWEvasionFormationMod = Brand<number, 'ASWEvasionMod'>;

type BrandedFormationData = {
    shell_power_mod: ShellPowerFormationMod;
    torpedo_power_mod: TorpedoPowerFormationMod;
    ASW_mod: ASWFormationMod;
    anti_air_mod: AntiAirFormationMod;
    shell_accuracy_mod: ShellAccuracyFormationMod;
    torpedo_accuracy_mod: TorpedoAccuracyFormationMod;
    night_battle_accuracy_mod: NightBattleAccuracyFormationMod;
    ASW_accuracy_mod: ASWAccuracyFormationMod;
    shell_evasion_mod: ShellEvasionFormationMod;
    torpedo_evasion_mod: TorpedoEvasionFormationMod;
    night_battle_evasion_mod: NightBattleEvasionFormationMod;
    ASW_evasion_mod: ASWEvasionFormationMod;
}

/**
 * 陣形補正データの各項にブランド型を付与して返す
 * @param data 
 * @returns 
 */
function brand_formation_data(data: FormationData): BrandedFormationData {
    return {
        shell_power_mod: data.shell_power_mod as ShellPowerFormationMod,
        torpedo_power_mod: data.torpedo_power_mod as TorpedoPowerFormationMod,
        ASW_mod: data.ASW_mod as ASWFormationMod,
        anti_air_mod: data.anti_air_mod as AntiAirFormationMod,
        shell_accuracy_mod: data.shell_accuracy_mod as ShellAccuracyFormationMod,
        torpedo_accuracy_mod: data.torpedo_accuracy_mod as TorpedoAccuracyFormationMod,
        night_battle_accuracy_mod: data.night_battle_accuracy_mod as NightBattleAccuracyFormationMod,
        ASW_accuracy_mod: data.ASW_accuracy_mod as ASWAccuracyFormationMod,
        shell_evasion_mod: data.shell_evasion_mod as ShellEvasionFormationMod,
        torpedo_evasion_mod: data.torpedo_evasion_mod as TorpedoEvasionFormationMod,
        night_battle_evasion_mod: data.night_battle_evasion_mod as NightBattleEvasionFormationMod,
        ASW_evasion_mod: data.ASW_evasion_mod as ASWEvasionFormationMod,
    };
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
): BrandedFormationData {
    if (formation !== 'Vanguard') return brand_formation_data(FORMATION_MOD_DATAS[formation]);

    const integrated_fleet_type: IntegratedFormationType =
        is_front(ships_length, ship_index)
            ? 'VanguardFront'
            : 'VanguardRear';

    return brand_formation_data(FORMATION_MOD_DATAS[integrated_fleet_type]);
}

/**
 * 連合艦隊の陣形補正値を返す
 * @param formation 
 * @returns 
 */
export function get_combined_fleet_formation_mods(
    formation: CombinedFleetFormationType,
): BrandedFormationData {
    return brand_formation_data(FORMATION_MOD_DATAS[formation]);
}

/**
 * 陣形効果が無効化される組み合わせであるか判定して返す    
 * https://wikiwiki.jp/kancolle/命中と回避について#hitterm1 > 陣形
 * @param attacker_formation 
 * @param defender_formation 
 */
export function is_invlidated_formation_combination(
    attacker_formation: SingleFleetFormationType,
    defender_formation: SingleFleetFormationType,
): boolean {
    if (
        attacker_formation === 'DoubleLine' &&
        defender_formation === 'LineAbreast'
    ) return true;
    if (
        attacker_formation === 'Echelon' &&
        defender_formation === 'LineAhead'
    ) return true;
    if (
        attacker_formation === 'LineAbreast' &&
        defender_formation === 'Echelon'
    ) return true;
    return false;
}