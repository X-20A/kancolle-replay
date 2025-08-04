import { Brand } from "@/types/brands"
import { AntiInstallPreInfo } from "../preInfo";
import { AntiInstallImprovementMods, LCAndKatsuImprovementMod, KamiTankImprovementMod } from "../improvementBonus";
import { PlayerShipClass } from "@/types/ship/shipClass";
import { includes_ship_class } from "../../predicates";
import { PlayerNakedShip } from "../../../naked/base";
import { AntiInstallUtils } from "../util";

const BONUS_SHIP_CLASSES: PlayerShipClass[] = [
    'Vittorio_Veneto',
    'Maestrale',
    'Zara',
    'Aquila',
    'Guglielmo_Marconi',
    'Abruzzi',
    'Conte_di_Cavour',
];

export type AntiDockMultiplier = Brand<number, 'AntiDockMultiplier'>

/**
 * 対船渠棲姫系砲撃補正値を返す
 * @param ship 
 * @param info 
 * @param type_1_install_bonus 
 * @param type_3_install_bonus 
 * @returns 
 */
export function calc_anti_Dock_multiplier(
    ship: PlayerNakedShip,
    info: AntiInstallPreInfo,
    util: AntiInstallUtils,
    bonuses: AntiInstallImprovementMods,
): AntiDockMultiplier {
    const { ship_class } = ship;
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
    } = info;
    const {
        has_special_LC,
        AB_or_armed_count,
    } = util;
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
        Katsu_tank_kai_count
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
    if (AB_or_armed_count) total *= 1.1;
    if (
        includes_ship_class(BONUS_SHIP_CLASSES, ship_class)
    ) total *= 1.1;

    return total as AntiDockMultiplier;
}