import { Brand } from "@/types/brands";
import { ShellingAttackPowerBase } from "../basePower";
import { AbyssalEquippedShip } from "@/models/ship/equipped";
import { AntiInstallGeneralMultiplicativeBonuses } from "@/logics/antiInstall/preCapMod/generalMultiplicativeBonuses";
import { AntiInstallShipTypeBonuses } from "@/logics/antiInstall/preCapMod/shipBonuses";
import { LandingCraftSpecificBonuses } from "@/logics/antiInstall/preCapMod/LandingCraftSpecificBonuses";
import { AntiInstallFlatDamageBonus } from "@/logics/antiInstall/preCapMod/flatDamageBonuses";
import { match } from "ts-pattern";

type GeneralMultiplicativeBonus = Brand<number, 'GeneralMultiplicativeBonus'>

/**
 * 目標艦ごとに対応した一般対地乗算補正を返す
 * @param bonuses 
 * @param target_ship 
 * @returns 
 */
const extract_general_multiplicative_bonus = (
    bonuses: AntiInstallGeneralMultiplicativeBonuses,
    target_ship: AbyssalEquippedShip,
): GeneralMultiplicativeBonus => {
    return match(target_ship.install_type)
        .with('PillboxModel', () => bonuses.Pillbox)
        .with('IsolatedIslandModel', () => bonuses.IsolatedIsland)
        .with('NorthernmostModel', () => bonuses.Northernmost)
        .with('HarbourModel', () => bonuses.Harbour)
        .with('SupplyDepotModel', 'RegularSoftModel', () => bonuses.SoftSkin)
        .with('No', () => { throw new Error('非対地艦は予めフィルタされる必要があります'); })
        .exhaustive() as unknown as GeneralMultiplicativeBonus;
}

export type AppliedAntiInstallBase = Brand<number, 'AppliedAntiInstallBase'>

const calc_applied_anti_install_base_core = (
    base_power: ShellingAttackPowerBase,
    ship_type_bonuses: AntiInstallShipTypeBonuses,
    general_multiplicative_bonus: GeneralMultiplicativeBonus,
    landing_craft_specific_bonuses: LandingCraftSpecificBonuses,
    flat_damage_bonus: AntiInstallFlatDamageBonus,
): AppliedAntiInstallBase => {
    const {
        ship_type_multiplier,
        ship_type_flat,
    } = ship_type_bonuses;
    const {
        multiplier: landing_craft_specific_bonus_multiplier,
        flat: landing_craft_specific_bonus_flat,
    } = landing_craft_specific_bonuses;

    const first_bracket = base_power * ship_type_multiplier + ship_type_flat;
    const second_bracket = first_bracket * general_multiplicative_bonus;

    return second_bracket * landing_craft_specific_bonus_multiplier
        + landing_craft_specific_bonus_flat
        + flat_damage_bonus as AppliedAntiInstallBase;
}