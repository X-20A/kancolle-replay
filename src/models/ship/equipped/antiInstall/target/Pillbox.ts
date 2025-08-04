import { PlayerNakedShip } from "@/models/ship/naked/base";
import { Brand } from "@/types/brands";
import { includes_ship_type } from "../../predicates";
import { AntiInstallPreInfo } from "../preInfo";
import { AntiInstallUtils } from "../util";
import { AntiInstallImprovementMods } from "../improvementBonus";

export type AntiPillboxMultiplier = Brand<number, 'AntiPillboxMultiplier'>

export function calc_Pillbox_Multiplier(
    ship: PlayerNakedShip,
    info: AntiInstallPreInfo,
    util: AntiInstallUtils,
    bonuses: AntiInstallImprovementMods,
): AntiPillboxMultiplier {
    const { type_id } = ship;
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
        Katsu_tank_kai_count: Toku_4_tank_kai_count,
        carrier_bomber_count,
    } = info;
    const {
        has_special_LC,
        total_mortars_count,
        total_Type4_rocket_count,
    } = util;
    const {
        LC_and_Katsu_improvement_mod: type_1_install_bonus,
        Kami_tank_improvement_mod: type_3_install_bonus,
    } = bonuses;
    

    let total = 1;

    if (includes_ship_type(['DD', 'CL'], type_id)) total *= 1.4;
    if (WG_count) total *= 2.72;
    else if (WG_count >= 2) total *= 1.6;

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
    total *= type_1_install_bonus;
    if (Amphibious_tank_count) total *= 2.4 * type_3_install_bonus;
    if (
        Amphibious_tank_count ||
        Toku_4_tank_kai_count
    ) total *= 1.35;
    if (carrier_bomber_count >= 2) total *= 2;
    

    return total as AntiPillboxMultiplier;
}