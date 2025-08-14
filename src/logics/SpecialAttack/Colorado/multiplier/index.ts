import { PlayerFleetUnit } from "@/models/fleet/FleetUnit";
import { SpecialAttackMods } from "../..";
import { calc_Colorado_special_power_mod } from "./power";
import { calc_Colorado_special_accuracy_mod } from "./accuracy";
import { calc_Colorado_special_pre_info, ColoradoSpecialMultiplierPreInfo } from "./preInfo";

/// Coloradoタッチの火力・命中補正

const calc_Colorado_special_mods_core = (
    attacker_unit: PlayerFleetUnit,
    pre_info: ColoradoSpecialMultiplierPreInfo,
): SpecialAttackMods => {
    const special_attack_power_mod =
        calc_Colorado_special_power_mod(attacker_unit, pre_info);
    const special_attack_accuracy_mod =
        calc_Colorado_special_accuracy_mod(pre_info);

    const mods: SpecialAttackMods = {
        special_attack_power_mod,
        special_attack_accuracy_mod,
    };

    return mods;
}

export function calc_Colorado_special_mods(
    unit: PlayerFleetUnit,
): SpecialAttackMods {
    const pre_info =
        calc_Colorado_special_pre_info(unit.ship.equip_slots);

    return calc_Colorado_special_mods_core(unit, pre_info);
}