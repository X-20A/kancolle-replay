import { FleetUnit } from "@/models/fleet/FleetUnit";
import { Accuracy } from ".";
import { Fleet, is_combined_fleet } from "@/models/fleet/Fleet";
import { calc_total_improvement_value, EquippedShip, is_player_equipped_ship } from "@/models/ship/equipped";
import { TorpedoAttackPower } from "../attackPower/torpedo";
import { TorpedoAccuracyVanguardMod } from "../vanguard";
import { TorpedoAccuracyFormationMod } from "../formation";
import { AccuracyMoraleMod } from "../morale";
import { TorpedoAccuracySmokeMod } from "../smokeScreen";

type AccuracyBase = 85 | 50 | 45 // ? ENwikiでは45のとこは46

const calc_ACC_base = (
    attacker_fleet: Fleet,
    defender_fleet: Fleet,
    attacker_unit: FleetUnit,
): AccuracyBase => {
    const is_attacker_single_fleet = !is_combined_fleet(attacker_fleet);
    const is_defender_single_fleet = !is_combined_fleet(defender_fleet);
    if (is_player_equipped_ship(attacker_unit.ship)) {
        if (is_attacker_single_fleet) {
            return is_defender_single_fleet
                ? 85
                : 50;
        }
        return  !is_defender_single_fleet
            ? 85
            : 45;
    }
    if (
        !is_attacker_single_fleet &&
        !is_defender_single_fleet
    ) return 50;
    
    return 85;
}

const calc_total_equips_accuracy = (
    attacker_ship: EquippedShip
): number => {
    return attacker_ship.edited_status.torpedo_accuracy
        + calc_total_improvement_value(attacker_ship, 'torpedo_accuracy');
}

export function calc_torpedo_attack_accuracy_core(
    base: AccuracyBase,
    attacker_ship: EquippedShip,
    torpedo_attack_power: TorpedoAttackPower,
    ship_mod: number,
    vanguard_mod: TorpedoAccuracyVanguardMod,
    formation_mod: TorpedoAccuracyFormationMod,
    morale_mod: AccuracyMoraleMod,
    smoke_mod: TorpedoAccuracySmokeMod,
): Accuracy {
    const core = base
        + 2 * Math.sqrt(attacker_ship.lv)
        + 1.5 * Math.sqrt(attacker_ship.edited_status.luck)
        + calc_total_equips_accuracy(attacker_ship)
        + torpedo_attack_power / 5
        + ship_mod;

    const accuracy = core
        * vanguard_mod
        * formation_mod
        * morale_mod
        * smoke_mod;
    
    return accuracy as Accuracy;
}