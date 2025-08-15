import { Brand } from "@/types/brands";
import { AntiInstallImprovementMods } from "../../improvementBonus";
import { AntiInstallPreInfo, ArmedBoatsCount, KatsuTanksCount } from "../../preInfo";

type DayIsolatedIslandMultiplier =
    Brand<number, 'DayIsolatedIslandMultiplier'>

const calc_day_multiplier = (
    armed_boats_count: ArmedBoatsCount,
    Katsu_tanks_count: KatsuTanksCount,
): DayIsolatedIslandMultiplier => {
    let total = 1;
    if (armed_boats_count) total *= 1.3;
    if (
        armed_boats_count >= 2 ||
        Katsu_tanks_count >= 2
    ) total *= 1.1;

    return total as DayIsolatedIslandMultiplier;
}

type NormalIsolatedIslandMultiplier =
    Brand<number, 'NormalIsolatedIslandMultiplier'>

const calc_normal_multiplier = (
    info: AntiInstallPreInfo,
    improvement_mods: AntiInstallImprovementMods,
): NormalIsolatedIslandMultiplier => {
    const {
        WG_count,
        Type_4_rocket_count,
        special_LC1_count,
        m4a1_count,
        chiha_count,
        chiha_kai_count,
        J_tank_count,
        African_tank_count,
        Landing_force_count,
        Amphibious_tank_count,
        Katsu_tank_kai_count,
        carrier_bomber_count,
        Type_3_shell_count,
        total_mortars_count,
        has_special_LC,
    } = info;
    const {
        LC_and_Katsu_improvement_mod,
    } = improvement_mods;

    let total = 1;

    total *= LC_and_Katsu_improvement_mod;

    if (WG_count) total *= 1.4;
    if (WG_count >= 2) total *= 1.5;

    if (total_mortars_count) total *= 1.2;
    if (total_mortars_count >= 2) total *= 1.4;

    if (Type_4_rocket_count) total *= 1.3;
    if (Type_4_rocket_count) total *= 1.65;

    if (has_special_LC) total *= 1.8;
    if (special_LC1_count) total *= 1.15;
    if (
        m4a1_count + chiha_kai_count + J_tank_count
    ) total *= 1.8;
    if (African_tank_count) total *= 1.2;
    if (Landing_force_count) total *= 1.2;
    if (
        Landing_force_count + chiha_count + chiha_kai_count >= 2
    ) total *= 1.4;
    if (Amphibious_tank_count) total *= 2.4;
    if (
        Amphibious_tank_count >= 2 ||
        Katsu_tank_kai_count // ? 省略できる?
    ) total *= 1.35;
    if (carrier_bomber_count) total *= 1.4;
    if (carrier_bomber_count >= 2) total *= 1.75;
    if (Type_3_shell_count) total *= 1.75;

    return total as NormalIsolatedIslandMultiplier;
}

export type IsolatedIslandMultipliers = {
    day_multiplier: DayIsolatedIslandMultiplier,
    normal_multiplier: NormalIsolatedIslandMultiplier,
}

/**
 * 対離島棲姫系の一般対地乗算補正(A1)を返す
 * @param pre_info 
 * @param improvement_mods 
 * @returns 
 */
export function calc_anti_IsolatedIsland_multipliers(
    pre_info: AntiInstallPreInfo,
    improvement_mods: AntiInstallImprovementMods,
): IsolatedIslandMultipliers {
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

    const multipliers: IsolatedIslandMultipliers = {
        day_multiplier,
        normal_multiplier,
    };

    return multipliers;
}