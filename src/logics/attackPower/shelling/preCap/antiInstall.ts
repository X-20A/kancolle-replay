import { Brand } from "@/types/brands";
import { ShellingAttackPowerBase } from "./basePower";
import { AbyssalEquippedShip, EquippedShip, is_CVs, is_install_type, PlayerEquippedShip } from "@/models/ship/equipped";
import { AntiInstallGeneralMultiplicativeBonuses } from "@/logics/antiInstall/preCapMod/generalMultiplicativeBonuses";
import { AntiInstallShipTypeBonuses } from "@/logics/antiInstall/preCapMod/shipBonuses";
import { LandingCraftSpecificBonuses } from "@/logics/antiInstall/preCapMod/LandingCraftSpecificBonuses";
import { AntiInstallFlatDamageBonus } from "@/logics/antiInstall/preCapMod/flatDamageBonuses";
import { match } from "ts-pattern";
import { EquipSlot, is_equip_exsist } from "@/models/ship/EquipSlot";

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

const cala_total_dive_bomber_power = (
    equip_slots: EquipSlot[],
): number => {
    return equip_slots.reduce((total, slot) => {
        const { equip } = slot;
        if (
            !is_equip_exsist(equip) ||
            equip.type_id !== 'DIVE_BOMBER'
        ) return total;

        total += equip.natural_addition.aerial_bomb_power;

        return total;
    }, 0);
}

const calc_surface_core = (

): number => {

}

const calc_CVs_core = (

): number => {
    
}

export type AppliedAntiInstallBase = Brand<number, 'AppliedAntiInstallBase'>

const calc_applied_anti_install_base_core = (
    base_power: ShellingAttackPowerBase,
    attacker_ship: PlayerEquippedShip,
    target_ship: EquippedShip,
    ship_type_bonuses: AntiInstallShipTypeBonuses,
    general_multiplicative_bonus: GeneralMultiplicativeBonus,
    landing_craft_specific_bonuses: LandingCraftSpecificBonuses,
    flat_damage_bonus: AntiInstallFlatDamageBonus,
): AppliedAntiInstallBase => {
    if (
        !is_install_type(target_ship)
    ) return base_power as unknown as AppliedAntiInstallBase;

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