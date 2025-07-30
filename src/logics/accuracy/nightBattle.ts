import { calc_total_improvement_value, EquippedShip } from "@/models/ship/equipped";
import { Accuracy } from ".";
import { AccuracyStarShellMod } from "../nightBattleEquips/starShell";
import { ShellAccuracyVanguardMod } from "../vanguard";
import { ShellAccuracyFormationMod } from "../formation";
import { AccuracyMoraleMod } from "../morale";
import { AccuracySearchlightMod } from "../nightBattleEquips/searchLight";
import { FitAccuracyMod } from "../fit";
import { AccuracyNightScoutMod } from "../nightBattleEquips/nightScout";
import { CIAccuracyMod } from "../nightBattleStrike";

const calc_total_equips_accuracy = (
    attacker_ship: EquippedShip,
): number => {
    return attacker_ship.edited_status.night_battle_accuracy
        + calc_total_improvement_value(attacker_ship, 'night_battle_accuracy');
}

const calc_night_battle_accuracy_core = (
    attacker_ship: EquippedShip,
    star_shell_mod: AccuracyStarShellMod,
    night_scout_mod: AccuracyNightScoutMod,
    vanguard_mod: ShellAccuracyVanguardMod,// Sortie Simは shell のものを使用している
    formation_mod: ShellAccuracyFormationMod,
    morale_mod: AccuracyMoraleMod,
    cutin_mod: CIAccuracyMod,
    searchlight_mod: AccuracySearchlightMod,
    fit_mod: FitAccuracyMod,
): Accuracy => {
    const ACCURACY_CONSTANT = 69;

    // ? 夜偵補正の適用方法・タイミングはwikiに記載なし Sortie Simより
    const base = ACCURACY_CONSTANT + star_shell_mod;

    const total_equips_accuracy = calc_total_equips_accuracy(attacker_ship);
    const core = base * night_scout_mod
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