import { Brand } from "@/types/brands";
import { AntiInstallImprovementMods } from "../../improvementBonus";
import { AntiInstallPreInfo, ArmedBoatsCount, KatsuTanksCount } from "../../preInfo";

type DayHarbourMultiplier =
    Brand<number, 'DayHarbourMultiplier'>

const calc_day_multiplier = (
    armed_boats_count: ArmedBoatsCount,
    Katsu_tanks_count: KatsuTanksCount,
): DayHarbourMultiplier => {
    let total = 1;
    if (
        armed_boats_count >= 1
    ) total *= 1.5;
    if (
        armed_boats_count >= 2 ||
        Katsu_tanks_count >= 2
    ) total *= 1.1;

    return total as DayHarbourMultiplier;
}

type NormalHarbourMultiplier =
    Brand<number, 'NormalHarbourMultiplier'>

const calc_normal_multiplier = (
    pre_info: AntiInstallPreInfo,
    improvement_mods: AntiInstallImprovementMods,
): NormalHarbourMultiplier => {
    const {
        WG_count,
        special_LC1_count,
        m4a1_count,
        chiha_count,
        chiha_kai_count,
        J_tank_count,
        African_tank_count,
        Landing_force_count,
        Amphibious_tank_count,
        Katsu_tank_kai_count,
        Type_3_shell_count,
        AP_shell_count,
        carrier_bomber_count,
        seaplane_bomber_count,
        Katsu_tanks_count,
        total_Type4_rocket_count,
        total_mortars_count,
        has_special_LC,
        armed_boats_count,
    } = pre_info;
    const {
        LC_and_Katsu_improvement_mod,
        Kami_tank_improvement_mod,
    } = improvement_mods;

    let total = 1;

    total *= LC_and_Katsu_improvement_mod;
    total *= Kami_tank_improvement_mod;

    if (WG_count) total *= 1.4;
    if (WG_count >= 2) total *= 1.2;

    if (total_Type4_rocket_count) total *= 1.25;
    if (total_Type4_rocket_count >= 2) total *= 1.4;

    if (total_mortars_count) total *= 1.1;
    if (total_mortars_count >= 2) total *= 1.15;

    if (has_special_LC) total *= 1.7;
    if (special_LC1_count) total *= 1.2;
    if (m4a1_count + chiha_kai_count + J_tank_count) total *= 2;
    if (African_tank_count) total *= 1.6;
    if (Landing_force_count) total *= 1.6;
    if (
        Landing_force_count + chiha_count + chiha_kai_count >= 2
    ) total *= 1.5;
    if (
        Amphibious_tank_count >= 2 ||
        Katsu_tank_kai_count
    ) total *= 1.5;
    if (Type_3_shell_count) total *= 1.75;
    if (AP_shell_count) total *= 1.3;

    if (carrier_bomber_count) total *= 1.3;
    if (carrier_bomber_count >= 2) total *= 1.25;

    if (seaplane_bomber_count) total *= 1.3;

    return total as NormalHarbourMultiplier;
}

export type HarbourMultipliers = {
    day_multiplier: DayHarbourMultiplier,
    normal_multiplier: NormalHarbourMultiplier,
}

export function calc_anti_Harbour_multipliers(
    pre_info: AntiInstallPreInfo,
    improvement_mods: AntiInstallImprovementMods,
): HarbourMultipliers {
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

    const multipliers: HarbourMultipliers = {
        day_multiplier,
        normal_multiplier,
    };

    return multipliers;
}