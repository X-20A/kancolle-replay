import { AntiInstallPreInfo, ArmedBoatsCount, KatsuTanksCount } from "../../preInfo";
import { AntiInstallImprovementMods } from "../../improvementBonus";
import { Brand } from "@/types/brands";

type DayPillboxMultiplier =
    Brand<number, 'DayPillboxMultiplier'>

const calc_day_multiplier = (
    armed_boats_count: ArmedBoatsCount,
    Katsu_tanks_count: KatsuTanksCount,
): DayPillboxMultiplier => {
    let total = 1;
    if (armed_boats_count) total *= 1.3;
    if (
        armed_boats_count >= 2 ||
        Katsu_tanks_count >= 2
    ) total *= 1.2;

    return total as DayPillboxMultiplier;
}

type NormalPillboxMultiplier =
    Brand<number, 'NormalPillboxMultiplier'>

const calc_normal_multiplier = (
    info: AntiInstallPreInfo,
    improvement_mods: AntiInstallImprovementMods,
): NormalPillboxMultiplier => {
    const {
        Landing_force_count,
        Amphibious_tank_count,
        special_LC1_count,
        WG_count,
        m4a1_count,
        chiha_kai_count,
        J_tank_count,
        African_tank_count,
        chiha_count,
        Katsu_tank_kai_count,
        carrier_bomber_count,
        seaplane_bomber_count,
        AP_shell_count,
        has_special_LC,
        total_mortars_count,
        total_Type4_rocket_count,
    } = info;
    const {
        LC_and_Katsu_improvement_mod,
        Kami_tank_improvement_mod,
    } = improvement_mods;
    

    let total = 1;

    total *= LC_and_Katsu_improvement_mod;
    total *= Kami_tank_improvement_mod;

    if (WG_count) total *= 1.6;
    if (WG_count >= 2) total *= 2.72;
    
    if (total_mortars_count) total *= 1.3;
    if (total_mortars_count >= 2) total *= 1.5;

    if (total_Type4_rocket_count) total *= 1.5;
    if (total_Type4_rocket_count >= 2) total *= 1.8;

    if (has_special_LC) total *= 1.8;
    if (special_LC1_count) total *= 1.15;
    if (m4a1_count + chiha_kai_count + J_tank_count) total *= 2;
    if (African_tank_count) total *= 1.5;
    if (Landing_force_count) total *= 1.5;
    if (
        Landing_force_count
        + chiha_count
        + chiha_kai_count >= 2
    ) total *= 1.4;
    if (Amphibious_tank_count) total *= 2.4;
    if (
        Amphibious_tank_count ||
        Katsu_tank_kai_count
    ) total *= 1.35;

    if (AP_shell_count) total *= 1.85;

    if (carrier_bomber_count) total *= 1.5;
    if (carrier_bomber_count >= 2) total *= 2;

    if (seaplane_bomber_count) total *= 1.5;

    return total as NormalPillboxMultiplier;
}

export type PillboxMultipliers = {
    day_multiplier: DayPillboxMultiplier,
    normal_multiplier: NormalPillboxMultiplier,
}

/**
 * 対砲台系の一般対地乗算補正(A1)を返す
 * @param pre_info 
 * @param improvement_mods 
 * @returns 
 */
export function calc_anti_Pillbox_multipliers(
    pre_info: AntiInstallPreInfo,
    improvement_mods: AntiInstallImprovementMods,
): PillboxMultipliers {
    const {
        armed_boats_count,
        Katsu_tanks_count,
    } = pre_info;

    const day_multiplier = calc_day_multiplier(
        armed_boats_count,
        Katsu_tanks_count,
    );
    const normal_multiplier = calc_normal_multiplier(
        pre_info,
        improvement_mods,
    );

    const multipliers: PillboxMultipliers = {
        day_multiplier,
        normal_multiplier,
    };

    return multipliers;
}