import { UserSettings } from "@/core/flows/SimExecuter";
import { FleetUnit } from "@/models/fleet/FleetUnit";
import { is_DD } from "@/models/ship/equipped";
import { SingleFleetFormationType } from "@/types";
import { Brand } from "@/types/brands";

export type ShellAccuracyVanguardMod = Brand<number, 'ShellAccuracyVanguardMod'>

/**
 * ターゲット艦隊が警戒陣であった場合の攻撃側砲撃命中への警戒陣補正を返す
 * @param target_unit 
 */
export function calc_shell_accuracy_vanguard_mod(
    target_fleet_formation: SingleFleetFormationType,
    target_unit: FleetUnit,
    settings: UserSettings,
): ShellAccuracyVanguardMod {
    if (target_fleet_formation !== 'Vanguard') return 1 as ShellAccuracyVanguardMod;

    /** 駆逐以外の警戒陣補正 */
    const OTHER_TYPE_MOD: number[] = [0.95, 0.95, 0.95, 0.95, 0.86, 0.79, 0.7] as const;
    /** 通常海域における駆逐の警戒陣補正 */
    const DD_TYPE_MOD: number[] = [0.95, 0.95, 0.8, 0.8, 0.69, 0.64, 0.64] as const;
    /** イベント海域における駆逐の警戒陣補正 */
    const EVENT_DD_TYPE_MOD: number[] = [0.95, 0.95, 0.66, 0.66, 0.52, 0.48, 0.4] as const;

    const { original_index } = target_unit;
    if (!is_DD(target_unit.ship)) return OTHER_TYPE_MOD[original_index] as ShellAccuracyVanguardMod;

    // 砲戦における、ターゲットが駆逐であった場合の補正値
    // https://docs.google.com/spreadsheets/d/183MFdMfBS7Oc3doCZYyI-R1jxDaCZ-Y9wMt_HW8PFEg/edit?gid=0#gid=0&range=A28
    const ANTI_DD_MOD = 1.1;
    if (settings.is_event_area) return EVENT_DD_TYPE_MOD[original_index] * ANTI_DD_MOD as ShellAccuracyVanguardMod;
    return DD_TYPE_MOD[original_index] * ANTI_DD_MOD as ShellAccuracyVanguardMod;
}

export type TorpedoAccuracyVanguardMod = Brand<number, 'TorpedoAccuracyVanguardMod'>

/**
 * ターゲット艦隊が警戒陣であった場合の攻撃側雷撃命中への警戒陣補正を返す
 * @param target_fleet_formation 
 * @param target_unit 
 * @param settings 
 * @returns 
 */
export function calc_torpedo_accuracy_vanguard_mod(
    target_fleet_formation: SingleFleetFormationType,
    target_unit: FleetUnit,
    settings: UserSettings,
): TorpedoAccuracyVanguardMod {
    if (target_fleet_formation !== 'Vanguard') return 1 as TorpedoAccuracyVanguardMod;

    const OTHER_TYPE_MOD: number[] = [0.9, 0.9, 0.77, 0.67, 0.63, 0.55, 0.51] as const;
    const DD_TYPE_MOD: number[] = [0.9, 0.9, 0.65, 0.58, 0.5, 0.42, 0.42] as const;
    const EVENT_DD_TYPE_MOD: number[] = [0.9, 0.9, 0.54, 0.48, 0.38, 0.33, 0.25] as const;

    const { original_index } = target_unit;
    if (!is_DD(target_unit.ship)) return OTHER_TYPE_MOD[original_index] as TorpedoAccuracyVanguardMod;

    // 雷撃戦における、ターゲットが駆逐であった場合の補正値
    const ANTI_DD_MOD = 1.2;
    if (settings.is_event_area) return EVENT_DD_TYPE_MOD[original_index] * ANTI_DD_MOD as TorpedoAccuracyVanguardMod;
    return DD_TYPE_MOD[original_index] * ANTI_DD_MOD as TorpedoAccuracyVanguardMod;
}