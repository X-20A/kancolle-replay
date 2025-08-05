import { AntiInstallImprovementMods } from "../improvementBonus";
import { AntiInstallPreInfo } from "../preInfo";
import { AntiInstallUtils } from "../util";

export function calc_anti_Anchorage_multiplier(
    info: AntiInstallPreInfo,
    utils: AntiInstallUtils,
    improvement_mods: AntiInstallImprovementMods,
): number {
    const {
        WG_count,
        special_LC1_count,
        Landing_force_count,
        Amphibious_tank_count,
        Katsu_tank_kai_count,
        m4a1_count,
        chiha_count,
        chiha_kai_count,
        J_tank_count,
        African_tank_count,
        Type_3_shell_count,
        carrier_bomber_count,
        jet_bomber_count,
        Katsu_tanks_count,
    } = info;
    const {
        total_mortars_count,
        total_Type4_rocket_count,
        has_special_LC,
        armed_boats_count,
    } = utils;
    const {
        LC_and_Katsu_improvement_mod,
        Kami_tank_improvement_mod,
    } = improvement_mods;

    let total = 1;

    total *= LC_and_Katsu_improvement_mod;
    total *= Kami_tank_improvement_mod;

    if (total_mortars_count) total *= 1.1;
    if (total_Type4_rocket_count) total *= 1.15;
    if (total_Type4_rocket_count >= 2) total *= 1.4;
    if (WG_count) total *= 1.2;
    if (WG_count) total *= 1.3;
    if (has_special_LC) total *= 1.4;
    if (special_LC1_count) total *= 1.15;
    if (Landing_force_count) total *= 1.2;
    if (
        Landing_force_count + chiha_count + chiha_kai_count >= 2
    ) total *= 1.4;
    if (Amphibious_tank_count) total *= 2.4;
    if (
        Amphibious_tank_count >= 2 ||
        Katsu_tank_kai_count >= 1
    ) total *= 1.35;
    if (
        m4a1_count + chiha_kai_count + J_tank_count
    ) total *= 1.8;
    if (African_tank_count) total *= 1.2;
    if (Type_3_shell_count) total *= 1.45;
    if (carrier_bomber_count) total *= 1.4;
    if (
        carrier_bomber_count >= 2 ||
        jet_bomber_count >= 1
    ) total *= 1.75;
    if (armed_boats_count) total *= 1.2;
    if (
        armed_boats_count >= 2 ||
        Katsu_tanks_count >= 2
    ) total *= 1.1;

    return total;
}