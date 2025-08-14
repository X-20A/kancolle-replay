import { PlayerFleetUnit } from "@/models/fleet/FleetUnit";
import { SpecialAttackMods } from "../..";
import { calc_Nagato_special_power_mod } from "./power";
import { calc_Nagato_special_pre_info } from "./preInfo";
import { calc_Nagato_special_accuracy_mod } from "./accuracy";
import { extract_second_ship, SecondShip } from "@/types/fleet/ship";
import { SecondUnit } from "@/types/fleet/fleetUnit";

export function calc_Nagato_special_mods(
    attacker_unit: PlayerFleetUnit,
    second_unit: SecondUnit,
): SpecialAttackMods {
    const pre_info =
        calc_Nagato_special_pre_info(attacker_unit.ship.equip_slots);

    const second_ship: SecondShip = extract_second_ship(second_unit);

    const special_attack_power_mod = calc_Nagato_special_power_mod(
        attacker_unit,
        second_ship,
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