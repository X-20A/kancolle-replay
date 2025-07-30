import { FleetUnit } from "@/models/fleet/FleetUnit";
import { Accuracy } from ".";
import { calc_total_improvement_value } from "@/models/ship/equipped";
import { EquipSlot, is_equip_exsist } from "@/models/ship/EquipSlot";
import { is_sonar } from "@/models/equip/basic";
import { AccuracyMoraleMod } from "../morale";
import { ASWAccuracySmokeMod } from "../smokeScreen";
import { ASWAccuracyFormationMod } from "../formation";
import { ShellAccuracyVanguardMod } from "../vanguard";

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
        if (!is_equip_exsist(equip)) return total;

        return is_sonar(equip)
            ? total + equip.natural_addition.asw // 対潜火力でいいみたい
            : total;
    }, 0);
}

/**
 * 対潜戦の命中項を返す    
 * // ? 対潜命中に警戒陣補正が掛かるか? 日wiki: 記述無, ENwiki: ?付きで記載(詳細無), Sortie Sim: 処理無 暫定: 補正無
 * @param attacker_unit 
 * @param vanguard_mod 
 * @param formation_mod 
 * @param morale_mod 
 * @param smoke_mod 
 * @returns 
 */
export function calc_asw_accuracy(
    attacker_unit: FleetUnit,
    // ? wikiに記載なし
    // ? Sortie Simはshellのものを使用している
    vanguard_mod: ShellAccuracyVanguardMod,
    formation_mod: ASWAccuracyFormationMod,
    morale_mod: AccuracyMoraleMod,
    smoke_mod: ASWAccuracySmokeMod,
): Accuracy {
    const attacker_ship = attacker_unit.ship;
    const total_improvement_asw_accuracy =
        calc_total_improvement_value(attacker_ship, 'asw_accuracy');
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