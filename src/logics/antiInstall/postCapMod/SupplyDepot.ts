import { Brand } from "@/types/brands";
import { AntiInstallImprovementMods } from "../improvementBonus";
import { AntiInstallPreInfo } from "../preInfo";

export type AntiDockPostCapMultiplier =
    Brand<number, 'AntiDockPostCapMultiplier'>

export function calc_anti_SupplyDepot_multiplier(
    info: AntiInstallPreInfo,
    improvement_mods: AntiInstallImprovementMods,
): AntiDockPostCapMultiplier {
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
        Katsu_tanks_count,
        Armys_count,
        total_Type4_rocket_count,
        total_mortars_count,
        has_special_LC,
        armed_boats_count,
    } = info;
    const {
        LC_and_Katsu_improvement_mod,
        Kami_tank_improvement_mod,
    } = improvement_mods;

    let total = 1;

    total *= LC_and_Katsu_improvement_mod;
    total *= Kami_tank_improvement_mod;

    if (WG_count) total *= 1.25;
    if (WG_count >= 2) total *= 1.3;
    
    if (total_Type4_rocket_count) total *= 1.2;
    if (total_Type4_rocket_count >= 2) total *= 1.4;

    if (total_mortars_count) total *= 1.15;
    if (total_mortars_count >= 2) total *= 1.2;

    if (has_special_LC) total *= 1.7;
    if (special_LC1_count) total *= 1.2;
    if (Landing_force_count) total *= 1.3;
    if (
        Landing_force_count + chiha_count + chiha_kai_count >= 2
    ) total *= 1.6;
    if (
        m4a1_count + chiha_kai_count + J_tank_count
    ) total *= 1.2;
    if (African_tank_count) total *= 1.3;
    if (Amphibious_tank_count) total *= 1.7;
    if (
        Amphibious_tank_count >= 2 ||
        Katsu_tank_kai_count
    ) total *= 1.5;

    if (armed_boats_count) total *= 1.5;
    if (
        armed_boats_count >= 2 ||
        Katsu_tanks_count >= 2 // ? 省略できる?
    ) total *= 1.1;
    
    if (Armys_count) total *= 1.85;
    if (Armys_count >= 2) total *= 1.45;
    if (Armys_count >= 3) total *= 1.2;

    return total as AntiDockPostCapMultiplier;
}