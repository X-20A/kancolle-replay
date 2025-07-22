import { EquippedShip, is_heavily_damaged } from "@/models/ship/equipped";
import { AirStateType, is_air_state_superiority_or_more } from "../airSuperiority/compare";
import { calc_artillery_spotting_types } from "./artillerySpotting";
import { calc_CVCI_types } from "./CVCI";
import { Brand } from "@/types/brands";
import { EquipSlot } from "@/models/ship/EquipSlot";
import { calc_Ise_class_CI_types } from "./IseClassCI";

/// 航空優勢以上で発動する特殊攻撃

const AIR_SUPERIORITY_STRIKE_TYPE = {
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
export type AirSuperiorityStrikeType = keyof typeof AIR_SUPERIORITY_STRIKE_TYPE

type AirSuperiorityStrikeData = {
    attack_power_mod: number,
    accuracy_mod: number,
    chance_mod: number,
}

type ArtillerySpottingDatas =
    Record<AirSuperiorityStrikeType, AirSuperiorityStrikeData>

const AIR_SUPERIORITY_STRIKE_DATAS: ArtillerySpottingDatas = {
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

export type GunShipPreInfo = {
    main_gun_count: number,
    has_sec_gun: boolean,
    has_radar: boolean,
    has_AP_shell: boolean,
}

/**
 * 砲艦系の特殊攻撃の判定に必要な情報を返す
 * @param equip_slots 
 * @returns 
 */
const calc_gun_ship_pre_info = (
    equip_slots: EquipSlot[],
): GunShipPreInfo => {
    return equip_slots.reduce((acc, slot) => {
        const { equip } = slot;
        if (!equip) return acc;

        const skill_type = equip.skill_trigger_type;
        if (skill_type === 'B_MAINGUN') acc.main_gun_count++; // 小中大いずれでも可
        if (skill_type === 'B_SECGUN') acc.has_sec_gun = true;
        if (skill_type === 'B_RADAR') acc.has_radar = true;
        if (skill_type === 'B_APSHELL') acc.has_AP_shell = true;
        return acc;
    }, {
        main_gun_count: 0,
        has_sec_gun: false,
        has_radar: false,
        has_AP_shell: false,
    } as GunShipPreInfo);
}

/**
 * 航空優勢以上で発動する特殊攻撃のID群を返す
 * @param attacker_ship 
 * @param air_state 
 * @returns 
 */
export function calc_air_superiority_strike_types(
    attacker_ship: EquippedShip,
    air_state: AirStateType,
): AirSuperiorityStrikeType[] {
    if (
        is_heavily_damaged(attacker_ship) ||
        !is_air_state_superiority_or_more(air_state)
    ) return [];

    const CVCI_types =
        calc_CVCI_types(attacker_ship);
    if (CVCI_types.length >= 1) return CVCI_types;

    const info = calc_gun_ship_pre_info(attacker_ship.equip_slots);
    const artillery_spotting_types =
        calc_artillery_spotting_types(attacker_ship, info);
    const Ise_class_CI_types =
        calc_Ise_class_CI_types(attacker_ship, info.main_gun_count);

    return artillery_spotting_types.concat(Ise_class_CI_types);
}

export type AirSuperiorityStrikeChanceMod =
    Brand<number, 'AirSuperiorityStrikeChanceMod'>

/**
 * 航空優勢時における特殊攻撃の発動率補正を返す
 * @param artillery_spotting_type 
 * @returns 
 */
export function calc_air_superiority_strike_chance_mod(
    artillery_spotting_type: AirSuperiorityStrikeType,
): AirSuperiorityStrikeChanceMod {
    return (
        AIR_SUPERIORITY_STRIKE_DATAS[artillery_spotting_type].chance_mod
    ) as AirSuperiorityStrikeChanceMod;
}

export type AirSuperiorityStrikeShellPowerMod =
    Brand<number, 'AirSuperiorityStrikeShellPowerMod'>

/**
 * 航空優勢時における特殊攻撃の攻撃力補正を返す
 * @param artillery_spotting_type 
 * @returns 
 */
export function calc_air_superiority_strike_shell_power_mod(
    artillery_spotting_type: AirSuperiorityStrikeType,
): AirSuperiorityStrikeShellPowerMod {
    return (
        AIR_SUPERIORITY_STRIKE_DATAS[artillery_spotting_type].attack_power_mod
    ) as AirSuperiorityStrikeShellPowerMod;
}

export type AirSuperiorityStrikeAccuracyMod =
    Brand<number, 'AirSuperiorityStrikeAccuracyMod'>

/**
 * 航空優勢時における特殊攻撃の命中補正を返す
 * @param artillery_spotting_type 
 * @returns 
 */
export function calc_air_superiority_strike_shell_accuracy_mod(
    artillery_spotting_type: AirSuperiorityStrikeType,
): AirSuperiorityStrikeAccuracyMod {
    return (
        AIR_SUPERIORITY_STRIKE_DATAS[artillery_spotting_type].accuracy_mod
    ) as AirSuperiorityStrikeAccuracyMod;
}