import { AntiInstallImprovementMods } from "../improvementBonus";
import { AntiInstallPreInfo } from "../preInfo";
import { AntiAnchoragePostCapMultiplier, calc_anti_Anchorage_multiplier } from "./Anchorage";
import { AntiDockPostCapMultiplier, calc_anti_Dock_multiplier } from "./Dock";
import { AntiFrenchBBPostCapMultiplier, calc_anti_FrenchBB_multiplier } from "./FrenchBB";
import { AntisummerBBPostCapMultiplier, calc_anti_summberBB_multiplier } from "./SummerBB";
import { AntiSummerCAPostCapMultiplier, calc_anti_SummerCA_multiplier } from "./SummerCA";
import { AntiSummerCVPostCapMultiplier, calc_anti_SummerCV_multiplier } from "./SummerCV";

export type AntiInstallPostMods = {
    Anchorage: AntiAnchoragePostCapMultiplier,
    Dock: AntiDockPostCapMultiplier,
    FrenchBB: AntiFrenchBBPostCapMultiplier,
    SummerBB: AntisummerBBPostCapMultiplier,
    SummerCA: AntiSummerCAPostCapMultiplier,
    SummerCV: AntiSummerCVPostCapMultiplier,
}

export function calc_anti_install_post_cap_bonuses(
    pre_info: AntiInstallPreInfo,
    improvement_mods: AntiInstallImprovementMods,
): AntiInstallPostMods {
    const Anchorage = calc_anti_Anchorage_multiplier(
        pre_info,
        improvement_mods,
    );
    const Dock = calc_anti_Dock_multiplier(
        pre_info,
        improvement_mods,
    );
    const FrenchBB = calc_anti_FrenchBB_multiplier(
        pre_info,
    );
    const SummerBB = calc_anti_summberBB_multiplier(
        pre_info,
    );
    const SummerCA = calc_anti_SummerCA_multiplier(
        pre_info,
    );
    const SummerCV = calc_anti_SummerCV_multiplier(
        pre_info,
    );

    const mods: AntiInstallPostMods = {
        Anchorage,
        Dock,
        FrenchBB,
        SummerBB,
        SummerCA,
        SummerCV,
    };

    return mods;
}