import { Equip } from "@/models/equip/basic";
import { PlayerEquippedShip } from "@/models/ship/equipped";
import { every_slots_empty, is_equip_exsist } from "@/models/ship/EquipSlot";
import { calc_mod_equip_ship } from ".";

/// 艦娘の加重対空値
/// https://en.kancollewiki.net/Aerial_Combat#Adjusted_Anti-Air > Allied Fleet > Ship Adj AA

/**
 * 改修係数(加重対空) を返す
 * @param equip 
 * @returns 
 */
const calc_improvement_coeffient = (
    equip: Equip,
): number => {
    const {
        aaci_trigger_type,
        natural_addition,
    } = equip;
    const { anti_air } = natural_addition;
    if (aaci_trigger_type === 'A_HAGUN') {
        return 1;
    }
    if (aaci_trigger_type === 'A_HAFD') {
        return 1.5;
    }
    if (aaci_trigger_type === 'A_AAGUN') {
        return anti_air >= 8
            ? 3
            : 2;
    }
    if (aaci_trigger_type === 'A_AAFD') {
        return anti_air >= 8
            ? 1.5
            : 1;
    }

    return 0;
}

const EQUIP_BONUS_COEFFIENT = 0.75;

/**
 * 艦娘の加重対空値を返す
 * @param ship 
 */
export function calc_weighted_anti_air_of_player_ship(
    ship: PlayerEquippedShip,
): number {
    // ? 日wiki: AAship + Σ(AAEquip * Mod_Equip_Ship + AA★-Equip) + 0.75 * total_equip_bonuses
    // ? ENwiki: AAship + Σ(AAEquip * Mod_Equip_Ship + AA★-Equip) ※ AAEquip は装備ボーナスを含む
    // ? Sortie Sim: AAship + Σ(AAequip * Mod_Equip_Ship + AA★-Equip + equip_bonus * 0.75) ※ 実処理は日wikiと同じ
    // ? 暫定: 日wiki式

    // ? また、日wikiでは装備の有無に関わらず必ず最後にfloorするがENwikiでは装備有の場合のみfloor
    // ? この点はENwik式を採用するので .5 のような値が返り得る
    const AA_ship = ship.naked_status.anti_air / 2;

    if (every_slots_empty(ship.equip_slots)) {
        // 装備無しの場合、装備加算だけでなく最後のfloorも無い
        return AA_ship;
    }

    const all_equip_addition = ship.equip_slots.reduce((total, equip_slot) => {
        const { equip } = equip_slot;
        if (!is_equip_exsist(equip)) return total;

        return total + (
            equip.natural_addition.anti_air * calc_mod_equip_ship(equip)
            + calc_improvement_coeffient(equip) * Math.sqrt(equip.improvement_lv)
        );
    }, 0);

    return Math.floor(
        AA_ship
        + all_equip_addition
        + EQUIP_BONUS_COEFFIENT * ship.total_equip_bonus_addition.anti_air
    );
}

export const __weighted_ship_player__ = {
    calc_improvement_coeffient,
};