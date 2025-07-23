import { EquippedShip, is_abyssal_ship } from "@/models/ship/equipped";
import { Accuracy } from ".";
import { AccuracyStarShellMod } from "../nightBattleEquips/starShell";
import { ShellAccuracyVanguardMod } from "../vanguard";
import { ShellAccuracyFormationMod } from "../formation";
import { AccuracyMoraleMod } from "../morale";
import { AccuracySearchlightMod } from "../nightBattleEquips/searchLight";
import { FitAccuracyMod } from "../fit/fit";
import { AccuracyNightScoutMod } from "../nightBattleEquips/nightScout";

const calc_total_equips_accuracy = (
    attacker_ship: EquippedShip,
): number => {
    const total_natural_accuracy =
        attacker_ship.edited_status.night_battle_accuracy;
    if (is_abyssal_ship(attacker_ship)) return total_natural_accuracy;

    return total_natural_accuracy
        + attacker_ship.total_equip_improvement_addition.night_battle_accuracy;
}

export function calc_night_battle(
    attacker_ship: EquippedShip,
    star_shell_mod: AccuracyStarShellMod,
    night_contact_mod: AccuracyNightScoutMod,
    vanguard_mod: ShellAccuracyVanguardMod,
    formation_mod: ShellAccuracyFormationMod,
    morale_mod: AccuracyMoraleMod,
    cutin_mod: number,
    searchlight_mod: AccuracySearchlightMod,
    fit_mod: FitAccuracyMod,
): Accuracy {
    const ACCURACY_CONSTANT = 69;

    const base = ACCURACY_CONSTANT + star_shell_mod;

    const total_equips_accuracy = calc_total_equips_accuracy(attacker_ship);
    const core = base * night_contact_mod
        + 2 * Math.sqrt(attacker_ship.lv)
        + 1.5 * Math.sqrt(attacker_ship.edited_status.luck)
        + total_equips_accuracy;

    const accuracy = core
        * vanguard_mod
        * formation_mod
        * morale_mod
        * cutin_mod
        * searchlight_mod
        + fit_mod;

    return accuracy as Accuracy;
}