import { Brand } from "@/types/brands"
import { AntiInstallPreInfo } from "./preInfo";
import { Type1InstallBonus, Type3InstallBonus } from "./generalBonus";
import { PlayerShipClass } from "@/types/ship/shipClass";
import { includes_ship_class } from "../predicates";
import { PlayerNakedShip } from "../../naked/base";

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
    type_1_install_bonus: Type1InstallBonus,
    type_3_install_bonus: Type3InstallBonus,
): AntiDockMultiplier {
    const { ship_class } = ship;
    const {
        type_1_LC_count,
        type_2_LC_count,
        type_3_LC_count,
        Toku_11_tank_count,
        Isshiki_tank_count,
        Panzer_3_count,
        carrier_bomber_count,
        seaplane_bomber_count,
        WG_count,
        Type_3_shell_count,
        Toku_4_tank_kai_count,
        chiha_count,
        chiha_kai_count,
        m4a1_count,
        J_tank_count,
        African_tank_count,
        AB_count,
        armed_LC_count,
        has_army_unit,
    } = info;
    const has_special_LC = type_1_LC_count ||
        type_2_LC_count ||
        Toku_4_tank_kai_count ||
        has_army_unit;
    const AB_or_armed_count = AB_count + armed_LC_count;

    let total = 1;

    if (carrier_bomber_count) total *= 1.1;
    if (carrier_bomber_count >= 2) total *= 1.1;
    if (seaplane_bomber_count) total *= 1.1;
    if (WG_count) total *= 1.1;
    if (WG_count >= 2) total *= 1.1;
    if (Type_3_shell_count) total *= 1.3;
    if (type_3_LC_count) total *= 1.2 * type_3_install_bonus;
    if (
        type_3_LC_count >= 2 ||
        Toku_4_tank_kai_count
    ) total *= 1.2;
    if (has_special_LC) total *= 1.1;
    if (
        Toku_11_tank_count ||
        Isshiki_tank_count ||
        Panzer_3_count
    ) total *= 1.4;
    if (type_2_LC_count) total *= 1.15 * type_1_install_bonus;
    if (
        type_2_LC_count + chiha_count + chiha_kai_count >= 2
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