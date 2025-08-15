import { Brand } from "@/types/brands"
import { AntiInstallPreInfo } from "../preInfo";
import { AntiInstallImprovementMods } from "../improvementBonus";

export type AntiDockPostCapMultiplier =
    Brand<number, 'AntiDockPostCapMultiplier'>

/**
 * 対船渠棲姫系の一般対地乗算補正(A1)を返す
 * @param ship 
 * @param info 
 * @param type_1_install_bonus 
 * @param type_3_install_bonus 
 * @returns 
 */
export function calc_anti_Dock_multiplier(
    info: AntiInstallPreInfo,
    bonuses: AntiInstallImprovementMods,
): AntiDockPostCapMultiplier {
    const {
        Landing_force_count,
        Amphibious_tank_count,
        Toku_11_tank_count,
        Isshiki_tank_count,
        Panzer_3_count,
        carrier_bomber_count,
        seaplane_bomber_count,
        WG_count,
        Type_3_shell_count,
        Katsu_tank_kai_count,
        chiha_count,
        chiha_kai_count,
        m4a1_count,
        J_tank_count,
        African_tank_count,
        has_special_LC,
        armed_boats_count,
    } = info;
    const {
        LC_and_Katsu_improvement_mod,
        Kami_tank_improvement_mod,
    } = bonuses;

    let total = 1;

    if (carrier_bomber_count) total *= 1.1;
    if (carrier_bomber_count >= 2) total *= 1.1;

    if (seaplane_bomber_count) total *= 1.1;

    if (WG_count) total *= 1.1;
    if (WG_count >= 2) total *= 1.1;

    if (Type_3_shell_count) total *= 1.3;
    if (Amphibious_tank_count) total *= 1.2 * Kami_tank_improvement_mod;
    if (
        Amphibious_tank_count >= 2 ||
        Katsu_tank_kai_count //? 省略できるか？
    ) total *= 1.2;
    if (has_special_LC) total *= 1.1;
    if (
        Toku_11_tank_count
        + Isshiki_tank_count
        + Panzer_3_count
    ) total *= 1.4;
    if (Landing_force_count) total *= 1.15 * LC_and_Katsu_improvement_mod;
    if (
        Landing_force_count + chiha_count + chiha_kai_count >= 2
    ) total *= 1.15;
    if (m4a1_count + chiha_kai_count + J_tank_count) total *= 1.1;

    if (African_tank_count) total *= 1.15;
    if (African_tank_count >= 2) total *= 1.15;

    if (armed_boats_count) total *= 1.1;

    return total as AntiDockPostCapMultiplier;
}