import { PlayerFleetUnit } from "@/models/fleet/FleetUnit";
import { calc_Yamato_Trio_special_accuracy_mod } from "./accuracy";
import { calc_Yamato_Trio_special_power_mod } from "./power";
import { SpecialAttackMods } from "@/logics/SpecialAttack";

export function calc_Yamato_Trio_special_mods(
    attacker_unit: PlayerFleetUnit,
    second_unit: PlayerFleetUnit,
    third_unit: PlayerFleetUnit,
): SpecialAttackMods {
    const special_attack_power_mod =
        calc_Yamato_Trio_special_power_mod(attacker_unit, second_unit, third_unit);

    const special_attack_accuracy_mod =
        calc_Yamato_Trio_special_accuracy_mod(special_attack_power_mod);

    const mods: SpecialAttackMods = {
        special_attack_power_mod,
        special_attack_accuracy_mod,
    };

    return mods;
}