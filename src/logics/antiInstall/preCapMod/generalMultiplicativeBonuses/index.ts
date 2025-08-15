import { AntiInstallPreInfo } from "../../preInfo";
import { calc_anti_Pillbox_multipliers, PillboxMultipliers } from "./Pillbox";
import { AntiInstallImprovementMods } from "../../improvementBonus";
import { calc_anti_Harbour_multipliers, HarbourMultipliers } from "./Harbour";
import { calc_anti_IsolatedIsland_multipliers, IsolatedIslandMultipliers } from "./IsolatedIsland";
import { calc_anti_Northernmost_multipliers, NorthernmostMultipliers } from "./Northernmost";
import { calc_anti_SoftSkin_multipliers, SoftSkinMultipliers } from "./SoftSkin";
import { PlayerEquip } from "@/models/equip/basic";

export type AntiInstallGeneralMultiplicativeBonuses = {
    Pillbox: PillboxMultipliers,
    IsolatedIsland: IsolatedIslandMultipliers,
    Northernmost: NorthernmostMultipliers,
    Harbour: HarbourMultipliers,
    SoftSkin: SoftSkinMultipliers,
}

export function calc_general_multiplicative_bonuses(
    pre_info: AntiInstallPreInfo,
    improvement_mods: AntiInstallImprovementMods,
): AntiInstallGeneralMultiplicativeBonuses {
    const Pillbox = calc_anti_Pillbox_multipliers(
        pre_info,
        improvement_mods,
    );
    const IsolatedIsland = calc_anti_IsolatedIsland_multipliers(
        pre_info,
        improvement_mods,
    );
    const Northernmost = calc_anti_Northernmost_multipliers(
        pre_info,
    );
    const Harbour = calc_anti_Harbour_multipliers(
        pre_info,
        improvement_mods,
    );
    const SoftSkin = calc_anti_SoftSkin_multipliers(
        pre_info,
        improvement_mods,
    );

    const mods: AntiInstallGeneralMultiplicativeBonuses = {
        Pillbox,
        IsolatedIsland,
        Northernmost,
        Harbour,
        SoftSkin,
    };

    return mods;
}