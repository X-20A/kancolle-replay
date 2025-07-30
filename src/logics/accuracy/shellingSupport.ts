import { EquippedShip } from "@/models/ship/equipped";
import { Accuracy } from ".";
import { EquipSlot, is_equip_exsist } from "@/models/ship/EquipSlot";
import { ShellAccuracyVanguardMod } from "../vanguard";
import { ShellAccuracyFormationMod } from "../formation";
import { FleetUnit, is_combined_fleet } from "@/models/fleet/FleetUnit";
import { Brand } from "@/types/brands";
import { AccuracyMoraleMod } from "../morale";

type SupportShellAccuracyFormationMod =
    Brand<number, 'SupportShellAccuracyFormationMod'>

const calc_formation_mod = (
    formation_mod: ShellAccuracyFormationMod,
    attacker_unit: FleetUnit,
): SupportShellAccuracyFormationMod => {
    return is_combined_fleet(attacker_unit)
        ? 1 as SupportShellAccuracyFormationMod
        : formation_mod as unknown as SupportShellAccuracyFormationMod;
}

const calc_shelling_support_accuracy_core = (
    attacker_unit: FleetUnit,
    vanguard_mod: ShellAccuracyVanguardMod,
    formation_mod: SupportShellAccuracyFormationMod,
    morale_mod: AccuracyMoraleMod,
): Accuracy => {
    const ACCURACY_CONSTANT = 64;

    const { ship: attacker_ship } = attacker_unit;
    const base = ACCURACY_CONSTANT
        + 2 * Math.sqrt(attacker_ship.lv)
        + 1.5 * Math.sqrt(attacker_ship.edited_status.luck)
        + attacker_ship.edited_status.shell_accuracy;

    const accuracy = base
        * vanguard_mod
        * formation_mod
        * morale_mod;
    
    return accuracy as Accuracy;
}