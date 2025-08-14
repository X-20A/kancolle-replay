import { PlayerFleetUnit } from "@/models/fleet/FleetUnit";
import { SpecialAttackMods } from "../..";
import { calc_QueenElizabeth_special_pre_info } from "./preInfo";
import { calc_QueenElizabeth_special_power_mod } from "./power";
import { calc_QueenElizabeth_special_accuracy_mod } from "./accuracy";
import { FirstUnit } from "@/types/fleet/fleetUnit";

export function calc_QueenElizabeth_special_mods(
    attacker_unit: PlayerFleetUnit,
    first_unit: FirstUnit,
): SpecialAttackMods {
    const pre_info =
        calc_QueenElizabeth_special_pre_info(attacker_unit.ship.equip_slots);

    const special_attack_power_mod = calc_QueenElizabeth_special_power_mod(
        attacker_unit,
        first_unit,
        pre_info,
    );

    const special_attack_accuracy_mod =
        calc_QueenElizabeth_special_accuracy_mod(pre_info);

    const mods: SpecialAttackMods = {
        special_attack_power_mod,
        special_attack_accuracy_mod,
    };

    return mods;
}