import { EquippedShip, is_CVs, is_damage_heavily } from "@/models/ship/equipped";
import { AirStateType, is_air_state_superiority_or_more } from "../airSuperiority/compare";
import { calc_artillery_spotting_types } from "./artillerySpotting";
import { Brand } from "@/types/brands";
import { EquipSlot, is_equip_exsist } from "@/models/ship/EquipSlot";
import { calc_Ise_class_CI_types } from "./IseClassCI";
import { is_AP_shell, is_radar_category } from "@/models/equip/basic";
import { calc_CVCI_types } from "./CVCI";
import { calc_air_superiority_strike_trigger_rate } from "./triggerRate";
import { FleetUnit } from "@/models/fleet/FleetUnit";
import { Fleet } from "@/models/fleet/Fleet";
import { is_random_successful, Rand } from "@/effects/random";

/// 弾着観測射撃・空母カットイン

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
    shell_power_mod: number,
    accuracy_mod: number,
    /** 観測種別定数 */
    chance_mod: number,
}

type ArtillerySpottingDatas =
    Record<AirSuperiorityStrikeType, AirSuperiorityStrikeData>

const AIR_SUPERIORITY_STRIKE_DATAS: ArtillerySpottingDatas = {
    double_attack: { shell_power_mod: 1.2, accuracy_mod: 1.1, chance_mod: 1.3 },
    Sec_CI: { shell_power_mod: 1.1, accuracy_mod: 1.3, chance_mod: 1.2 },
    Radar_CI: { shell_power_mod: 1.2, accuracy_mod: 1.5, chance_mod: 1.3 },
    AP_Sec_CI: { shell_power_mod: 1.3, accuracy_mod: 1.3, chance_mod: 1.4 },
    AP_CI: { shell_power_mod: 1.5, accuracy_mod: 1.2, chance_mod: 1.5 },

    CVCI_FBA: { shell_power_mod: 1.25, accuracy_mod: 1.35, chance_mod: 1.25 },
    CVCI_BBA: { shell_power_mod: 1.2, accuracy_mod: 1.2, chance_mod: 1.4 },
    CVCI_BA: { shell_power_mod: 1.15, accuracy_mod: 1.18, chance_mod: 1.55 },

    Zuiun_CI: { shell_power_mod: 1.35, accuracy_mod: 1.2, chance_mod: 1.2 },
    Suisei_CI: { shell_power_mod: 1.3, accuracy_mod: 1.2, chance_mod: 1.3 },
} as const;

export type GunShipPreInfo = {
    main_gun_count: number,
    has_sec_gun: boolean,
    has_radar: boolean,
    has_AP_shell: boolean,
}
const INITIAL: GunShipPreInfo = {
    main_gun_count: 0,
    has_sec_gun: false,
    has_radar: false,
    has_AP_shell: false,
} as const;

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
        if (!is_equip_exsist(equip)) return acc;

        const skill_type = equip.skill_trigger_type;
        if (skill_type === 'B_MAIN_GUN') acc.main_gun_count++; // 小中大いずれでも可
        if (skill_type === 'B_SEC_GUN') acc.has_sec_gun = true;
        if (is_radar_category(equip)) acc.has_radar = true;
        if (is_AP_shell(equip)) acc.has_AP_shell = true;
        return acc;
    }, { ...INITIAL });
}

/**
 * 弾着観測射撃・空母カットインのID群を返す
 * @param attacker_ship 
 * @param air_state 
 * @returns 
 */
export function calc_air_superiority_strike_types(
    attacker_ship: EquippedShip,
    target_ship: EquippedShip,
    air_state: AirStateType,
): AirSuperiorityStrikeType[] {
    if (
        is_damage_heavily(attacker_ship) ||
        !is_air_state_superiority_or_more(air_state)
    ) return [];

    if (is_CVs(attacker_ship)) {
        return calc_CVCI_types(
            attacker_ship,
            target_ship,
        );
    }

    const info = calc_gun_ship_pre_info(attacker_ship.equip_slots);
    const artillery_spotting_types =
        calc_artillery_spotting_types(attacker_ship, info);
    const Ise_class_CI_types =
        calc_Ise_class_CI_types(attacker_ship, info.main_gun_count);

    return [
        ...artillery_spotting_types,
        ...Ise_class_CI_types,
    ];
}

export type AirSuperiorityStrikeChanceMod =
    Brand<number, 'AirSuperiorityStrikeChanceMod'>

/**
 * 観測種別定数を返す
 * @param artillery_spotting_type 
 * @returns 
 */
const get_chance_mod = (
    artillery_spotting_type: AirSuperiorityStrikeType,
): AirSuperiorityStrikeChanceMod => {
    return (
        AIR_SUPERIORITY_STRIKE_DATAS[artillery_spotting_type].chance_mod
    ) as AirSuperiorityStrikeChanceMod;
}

export type AirSuperiorityStrikeShellPowerMod =
    Brand<number, 'AirSuperiorityStrikeShellPowerMod'>

/**
 * 弾着観測射撃・空母カットインの攻撃力補正を返す
 * @param artillery_spotting_type 
 * @returns 
 */
const get_shell_power_mod = (
    artillery_spotting_type: AirSuperiorityStrikeType,
): AirSuperiorityStrikeShellPowerMod => {
    return (
        AIR_SUPERIORITY_STRIKE_DATAS[artillery_spotting_type].shell_power_mod
    ) as AirSuperiorityStrikeShellPowerMod;
}

export type AirSuperiorityStrikeShellAccuracyMod =
    Brand<number, 'AirSuperiorityStrikeAccuracyMod'>

/**
 * 弾着観測射撃・空母カットインの命中補正を返す
 * @param artillery_spotting_type 
 * @returns 
 */
const get_shell_accuracy_mod = (
    artillery_spotting_type: AirSuperiorityStrikeType,
): AirSuperiorityStrikeShellAccuracyMod => {
    return (
        AIR_SUPERIORITY_STRIKE_DATAS[artillery_spotting_type].accuracy_mod
    ) as AirSuperiorityStrikeShellAccuracyMod;
}

type AirSuperiorityStrikeMods = {
    shell_power_mod: AirSuperiorityStrikeShellPowerMod,
    shell_accuracy_mod: AirSuperiorityStrikeShellAccuracyMod,
}
const INITIAL_MODS: AirSuperiorityStrikeMods = {
    shell_power_mod: 1 as AirSuperiorityStrikeShellPowerMod,
    shell_accuracy_mod: 1 as AirSuperiorityStrikeShellAccuracyMod,
} as const;

/**
 * 弾着観測射撃・空母カットインの火力・命中補正値を返す
 * @param attacker_unit 
 * @param attacker_fleet 
 * @param target_ship 
 * @param air_state 
 * @param rand 
 * @returns 
 */
export function calc_air_superiority_strike_mods(
    attacker_unit: FleetUnit,
    attacker_fleet: Fleet,
    target_ship: EquippedShip,
    air_state: Extract<AirStateType, 'Supremacy' | 'Superiority'>,
    rand: Rand,
): AirSuperiorityStrikeMods {
    const triggerable_types = calc_air_superiority_strike_types(
        attacker_unit.ship,
        target_ship,
        air_state,
    );

    for (const triggerable_type of triggerable_types) {
        const chance_mod = get_chance_mod(triggerable_type);
        const trigger_rate = calc_air_superiority_strike_trigger_rate(
            attacker_unit,
            attacker_fleet,
            air_state,
            chance_mod,
        );

        if (is_random_successful(trigger_rate, rand.next())) {
            const mods: AirSuperiorityStrikeMods = {
                shell_power_mod: get_shell_power_mod(triggerable_type),
                shell_accuracy_mod: get_shell_accuracy_mod(triggerable_type),
            };

            return mods;
        } 
    }

    return INITIAL_MODS;
}