import { AntiAirFormationMod } from "@/logics/formation";
import { AbyssalFleet, concat_fleet_ships } from "@/models/fleet/Fleet";
import { calc_mod_equip_fleet } from "./utils";
import { AbyssalEquipSlot, is_equip_exsist } from "@/models/ship/EquipSlot";
import { AbyssalEquippedShip } from "@/models/ship/equipped";

/// 深海艦隊の艦隊防空値

/**
 * Σ<equips>を返す
 * @param equip_slots 
 * @returns 
 */
const calc_equips_total = (
    equip_slots: AbyssalEquipSlot[],
): number => {
    return equip_slots.reduce((total, slot) => {
        const { equip } = slot;
        if (!is_equip_exsist(equip)) return total;

        return total
            + calc_mod_equip_fleet(equip) * equip.natural_addition.anti_air;
    }, 0);
};

/**
 * Σ<ships>を返す
 * @param ships 
 * @returns 
 */
const calc_ships_total = (
    ships: AbyssalEquippedShip[],
): number => {
    return ships.reduce((total, ship) => {
        return total + calc_equips_total(ship.equip_slots);
    }, 0)
}

/**
 * 深海艦隊の艦隊防空値を返す    
 * https://en.kancollewiki.net/Aerial_Combat#Adjusted_Anti-Air > Enemy Fleet > Fleet Adj AA
 * @param ship 
 */
export function calc_abyssal_fleet_anti_air(
    fleet: AbyssalFleet,
    formation_mod: AntiAirFormationMod,
): number {
    const ships = concat_fleet_ships(fleet);
    const ships_total = calc_ships_total(ships);

    return Math.floor(formation_mod * Math.floor(ships_total));
}