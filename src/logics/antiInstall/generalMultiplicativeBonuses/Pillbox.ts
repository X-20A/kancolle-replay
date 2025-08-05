import { Brand } from "@/types/brands";
import { AntiInstallPreInfo } from "../preInfo";
import { AntiInstallUtils } from "../util";
import { AntiInstallImprovementMods } from "../improvementBonus";

export type AntiPillboxMultiplier = Brand<number, 'AntiPillboxMultiplier'>

type PhaseType =
    | 'DayShelling'
    | 'NightBattle'

/**
 * 対砲台系の一般対地乗算補正(A1)を返す
 * @param info 
 * @param util 
 * @param bonuses 
 * @param phase_type 
 * @returns 
 */
export function calc_Pillbox_Multiplier(
    info: AntiInstallPreInfo,
    util: AntiInstallUtils,
    bonuses: AntiInstallImprovementMods,
    phase_type: PhaseType,
): AntiPillboxMultiplier {
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
    } = info;
    const {
        has_special_LC,
        total_mortars_count,
        total_Type4_rocket_count,
        armed_boats_count,
    } = util;
    const {
        LC_and_Katsu_improvement_mod,
        Kami_tank_improvement_mod,
    } = bonuses;
    

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

    if (phase_type === 'DayShelling') {
        if (armed_boats_count) total *= 1.3;
        if (armed_boats_count >= 2) total *= 1.2;
    }

    if (AP_shell_count) total *= 1.85;

    if (carrier_bomber_count) total *= 1.5;
    if (carrier_bomber_count >= 2) total *= 2;

    if (seaplane_bomber_count) total *= 1.5;

    return total as AntiPillboxMultiplier;
}