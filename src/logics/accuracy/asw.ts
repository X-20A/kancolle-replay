import { FleetUnit } from "@/models/fleet/FleetUnit";
import { Accuracy } from ".";
import { EquippedShip, is_player_ship } from "@/models/ship/equipped";
import { EquipSlot } from "@/models/ship/EquipSlot";
import { is_sonar } from "@/models/equip/basic";

/**
 * ソナー系装備の対潜値総計(ASW_sonar)を返す
 * @param equip_slots 
 * @returns 
 */
const calc_asw_sonar = (
    equip_slots: EquipSlot[],
): number => {
    return equip_slots.reduce((total, slot) => {
        const equip = slot.equip;
        if (!equip) return total;

        return is_sonar(equip)
            ? total + equip.natural_addition.asw // 対潜火力でいいみたい
            : total;
    }, 0)
}

/**
 * 改修による対潜命中上昇値の総計を返す
 * @param attacker_ship 
 * @returns 
 */
const calc_total_improvement_asw_accuracy = (
    attacker_ship: EquippedShip,
): number => {
    if (!is_player_ship(attacker_ship)) return 0;

    return attacker_ship.total_equip_improvement_addition.asw_accuracy;
}

/**
 * 対潜戦の命中項を返す
 * @param attacker_unit 
 * @param vanguard_mod 
 * @param formation_mod 
 * @param morale_mod 
 * @param smoke_mod 
 * @returns 
 */
export function calc_asw_accuracy(
    attacker_unit: FleetUnit,
    vanguard_mod: number,
    formation_mod: number,
    morale_mod: number,
    smoke_mod: number,
): Accuracy {
    const attacker_ship = attacker_unit.ship;
    const total_improvement_asw_accuracy =
        calc_total_improvement_asw_accuracy(attacker_ship);
    const asw_sonar = calc_asw_sonar(attacker_ship.equip_slots);

    const base = 80
        + 2 * Math.sqrt(attacker_ship.lv)
        + 1.5 * Math.sqrt(attacker_ship.edited_status.luck)
        + total_improvement_asw_accuracy
        + 2 * asw_sonar;

    const accuracy = Math.floor(
        base
        * vanguard_mod
        * formation_mod
        * morale_mod
        * smoke_mod
    );

    return accuracy as Accuracy;
}