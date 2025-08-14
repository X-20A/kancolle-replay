import { PlayerFleetUnit } from "@/models/fleet/FleetUnit";
import { calc_Yamato_Trio_special_accuracy_mod } from "./accuracy";
import { calc_Yamato_Trio_special_power_mod } from "./power";
import { SpecialAttackMods } from "@/logics/SpecialAttack";
import { extract_second_ship, extract_third_ship } from "@/types/fleet/ship";
import { SecondUnit, ThirdUnit } from "@/types/fleet/fleetUnit";

export function calc_Yamato_Trio_special_mods(
    attacker_unit: PlayerFleetUnit,
    second_unit: SecondUnit,
    third_unit: ThirdUnit,
): SpecialAttackMods {
    const second_ship = extract_second_ship(second_unit);
    const third_ship = extract_third_ship(third_unit);

    const special_attack_power_mod =
        calc_Yamato_Trio_special_power_mod(attacker_unit, second_ship, third_ship);

    const special_attack_accuracy_mod =
        calc_Yamato_Trio_special_accuracy_mod(special_attack_power_mod);

    const mods: SpecialAttackMods = {
        special_attack_power_mod,
        special_attack_accuracy_mod,
    };

    return mods;
}