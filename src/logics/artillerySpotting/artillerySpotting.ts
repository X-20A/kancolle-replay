import { EquippedShip, is_heavily_damaged } from "@/models/ship/equipped";
import { AirStateType, is_air_state_superiotity_or_more } from "../airSuperiority/compare";
import { calc_gun_ship_artillery_spotting_types } from "./gunShip";
import { calc_CVs_artillery_spotting_types } from "./CVs";
import { Brand } from "@/types/brands";

/// 航空優勢以上で発動する特殊攻撃

const ARTILLERY_SPOTTING_TYPE = {
    double_attack: 2,
    Sec_CI: 3,
    Radar_CI: 4,
    AP_Sec_CI: 5,
    AP_CI: 6,

    CVCI_FBA: 71,
    CVCI_BBA: 72,
    CVCI_BA: 73,

    Zuiun_CI: 200,
    Suisei_CI: 201,
} as const;
export type ArtillerySpottingType = keyof typeof ARTILLERY_SPOTTING_TYPE

type ArtillerySpottingData = {
    attack_power_mod: number,
    accuracy_mod: number,
    chance_mod: number,
}

type ArtillerySpottingDatas =
    Record<ArtillerySpottingType, ArtillerySpottingData>

const ARTILLERY_SPOTTING_DATAS: ArtillerySpottingDatas = {
    double_attack: { attack_power_mod: 1.2, accuracy_mod: 1.1, chance_mod: 1.3 },
    Sec_CI: { attack_power_mod: 1.1, accuracy_mod: 1.3, chance_mod: 1.2 },
    Radar_CI: { attack_power_mod: 1.2, accuracy_mod: 1.5, chance_mod: 1.3 },
    AP_Sec_CI: { attack_power_mod: 1.3, accuracy_mod: 1.3, chance_mod: 1.4 },
    AP_CI: { attack_power_mod: 1.5, accuracy_mod: 1.2, chance_mod: 1.5 },
    CVCI_FBA: { attack_power_mod: 1.25, accuracy_mod: 1.35, chance_mod: 1.25 },
    CVCI_BBA: { attack_power_mod: 1.2, accuracy_mod: 1.2, chance_mod: 1.4 },
    CVCI_BA: { attack_power_mod: 1.15, accuracy_mod: 1.18, chance_mod: 1.55 },
    Zuiun_CI: { attack_power_mod: 1.35, accuracy_mod: 1.2, chance_mod: 1.2 },
    Suisei_CI: { attack_power_mod: 1.3, accuracy_mod: 1.2, chance_mod: 1.3 },
};

/**
 * 航空優勢以上で発動する特殊攻撃のID群を返す
 * @param attacker_ship 
 * @param air_state 
 * @returns 
 */
export function calc_artillery_spotting_types(
    attacker_ship: EquippedShip,
    air_state: AirStateType,
): ArtillerySpottingType[] {
    const triggerables: ArtillerySpottingType[] = [];
    if (
        is_heavily_damaged(attacker_ship) ||
        !is_air_state_superiotity_or_more(air_state)
    ) return triggerables;

    const CVs_artillery_spotting_types =
        calc_CVs_artillery_spotting_types(attacker_ship);
    if (CVs_artillery_spotting_types.length >= 1) return CVs_artillery_spotting_types;

    return calc_gun_ship_artillery_spotting_types(attacker_ship);
}

export type ArtillerySpottingChanceMod =
    Brand<number, 'ArtillerySpottingChanceMod'>

export function calc_artillery_spotting_chance_mod(
    artillery_spotting_type: ArtillerySpottingType,
): ArtillerySpottingChanceMod {
    return (
        ARTILLERY_SPOTTING_DATAS[artillery_spotting_type].chance_mod
    ) as ArtillerySpottingChanceMod;
}

export type ArtillerySpottingAttackPowerMod =
    Brand<number, 'ArtillerySpottingAttackPowerMod'>

export function calc_artillery_spotting_attack_power_mod(
    artillery_spotting_type: ArtillerySpottingType,
): ArtillerySpottingAttackPowerMod {
    return (
        ARTILLERY_SPOTTING_DATAS[artillery_spotting_type].attack_power_mod
    ) as ArtillerySpottingAttackPowerMod;
}

export type ArtillerySpottingAccuracyMod =
    Brand<number, 'ArtillerySpottingAccuracyMod'>

export function calc_artillery_spotting_accuracy_mod(
    artillery_spotting_type: ArtillerySpottingType,
): ArtillerySpottingAccuracyMod {
    return (
        ARTILLERY_SPOTTING_DATAS[artillery_spotting_type].accuracy_mod
    ) as ArtillerySpottingAccuracyMod;
}