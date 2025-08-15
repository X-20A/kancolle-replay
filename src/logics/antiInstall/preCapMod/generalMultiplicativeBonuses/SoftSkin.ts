import { Brand } from "@/types/brands";
import { AntiInstallImprovementMods } from "../../improvementBonus";
import { AntiInstallPreInfo, ArmedBoatsCount, KatsuTanksCount } from "../../preInfo";

type DaySoftSkinMultiplier =
    Brand<number, 'DaySoftSkinMultiplier'>

const calc_day_multiplier = (
    armed_boats_count: ArmedBoatsCount,
    Katsu_tanks_count: KatsuTanksCount,
): DaySoftSkinMultiplier => {
    let total = 1;
    if (armed_boats_count) total *= 1.1;
    if (
        armed_boats_count >= 2 ||
        Katsu_tanks_count >= 2
    ) total *= 1.1;

    return total as DaySoftSkinMultiplier;
}

type NormalSoftSkinMultiplier =
    Brand<number, 'NormalSoftSkinMultiplier'>

const calc_normal_multiplier = (
    info: AntiInstallPreInfo,
    improvement_mods: AntiInstallImprovementMods,
): NormalSoftSkinMultiplier => {
    const {
        Type_3_shell_count,
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
        seaplane_bomber_count,
        Armys_count,
        total_mortars_count,
        total_Type4_rocket_count,
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

    if (Type_3_shell_count) total *= 2.5;

    if (WG_count) total *= 1.3;
    if (WG_count >= 2) total *= 1.4;

    if (total_mortars_count) total *= 1.2;
    if (total_mortars_count >= 2) total *= 1.3;

    if (total_Type4_rocket_count) total *= 1.25;
    if (total_Type4_rocket_count >= 2) total *= 1.5;
    
    if (has_special_LC) total *= 1.4;
    if (special_LC1_count) total *= 1.15;
    if (
        m4a1_count + chiha_kai_count + J_tank_count
    ) total *= 1.1;
    if (African_tank_count) total *= 1.5;

    if (Landing_force_count) total *= 1.5;
    if (
        Landing_force_count + chiha_count + chiha_kai_count >= 2
    ) total *= 1.3;

    if (Amphibious_tank_count) total *= 1.5;
    if (
        Amphibious_tank_count >= 2 ||
        Katsu_tank_kai_count // ?省略できる？
    ) total *= 1.2;

    if (seaplane_bomber_count) total *= 1.2;

    if (armed_boats_count) total *= 1.1;
    if (armed_boats_count >= 2) total *= 1.1;

    if (Armys_count) total *= 1.4;
    if (Armys_count >= 2) total *= 1.1;
    if (Armys_count >= 3) total *= 1.1;

    return total as NormalSoftSkinMultiplier;
}

export type SoftSkinMultipliers = {
    day_multiplier: DaySoftSkinMultiplier,
    normal_multiplier: NormalSoftSkinMultiplier,
}

/**
 * 対砲台系の一般対地乗算補正(A1)を返す
 * @param pre_info 
 * @param improvement_mods 
 * @returns 
 */
export function calc_anti_SoftSkin_multipliers(
    pre_info: AntiInstallPreInfo,
    improvement_mods: AntiInstallImprovementMods,
): SoftSkinMultipliers {
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

    const multipliers: SoftSkinMultipliers = {
        day_multiplier,
        normal_multiplier,
    };

    return multipliers;
}