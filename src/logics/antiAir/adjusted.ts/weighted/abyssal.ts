import { AbyssalEquippedShip } from "@/models/ship/equipped";
import { every_slots_empty, is_equip_exsist } from "@/models/ship/EquipSlot";
import { calc_mod_equip_ship } from ".";

/// 深海艦の加重対空値
/// https://en.kancollewiki.net/Aerial_Combat#Adjusted_Anti-Air > Enemy Fleet > Ship Adj AA

/**
 * 深海艦の艦隊防空値を返す
 * @param ship 
 */
export function calc_weighted_anti_air_of_abyssal_ship(
    ship: AbyssalEquippedShip,
): number {
    // ? ENwiki: 2 * √(AAship + ΣAAequip) + Σ(AAequip * Mod_Equip-Ship)
    // ? Sortie Sim: √(AAship) + Σ(AAequip * Mod_Equip-Ship)

    const sqrted_edited_anti_air = Math.sqrt(ship.edited_status.anti_air);

    if (every_slots_empty(ship.equip_slots)) {
        // ? ENwikiには深海艦(装備無)のfloorの有無については記述が無い
        // ? 補給ワ級は装備が無いが素対空0なので現状検証不可？
        // ? 暫定: 艦娘と同じでfloor無
        return sqrted_edited_anti_air;
    }

    const all_equip_addition = ship.equip_slots.reduce((total, equip_slot) => {
        const { equip } = equip_slot;
        if (!is_equip_exsist(equip)) return total;

        return total + (
            equip.natural_addition.anti_air * calc_mod_equip_ship(equip)
        );
    }, 0);

    return Math.floor(
        sqrted_edited_anti_air
        + all_equip_addition
    );
}