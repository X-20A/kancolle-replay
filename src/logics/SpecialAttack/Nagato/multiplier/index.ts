import { PlayerFleetUnit } from "@/models/fleet/FleetUnit";
import { SpecialAttackMods } from "../..";
import { calc_Nagato_special_power_mod } from "./power";
import { calc_Nagato_special_pre_info } from "./preInfo";
import { calc_Nagato_special_accuracy_mod } from "./accuracy";

export function calc_Nagato_special_mods(
    attacker_unit: PlayerFleetUnit,
    second_unit: PlayerFleetUnit,
): SpecialAttackMods {
    const pre_info =
        calc_Nagato_special_pre_info(attacker_unit.ship.equip_slots);

    const special_attack_power_mod = calc_Nagato_special_power_mod(
        attacker_unit,
        second_unit,
        pre_info,
    );

    const special_attack_accuracy_mod =
        calc_Nagato_special_accuracy_mod(pre_info);

    const mods: SpecialAttackMods = {
        special_attack_power_mod,
        special_attack_accuracy_mod,
    };

    return mods;
}