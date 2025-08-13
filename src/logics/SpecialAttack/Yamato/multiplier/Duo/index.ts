import { SpecialAttackMods } from "@/logics/SpecialAttack";
import { PlayerFleetUnit } from "@/models/fleet/FleetUnit";
import { calc_Yamato_Duo_special_power_mod } from "./power";
import { calc_Yamato_Duo_special_accuracy_mod } from "./accuracy";

/**
 * 大和型2隻タッチの補正セットを返す
 * @param attacker_unit 
 * @param second_unit 
 * @returns 
 */
export function calc_Yamato_Duo_special_mods(
    attacker_unit: PlayerFleetUnit,
    second_unit: PlayerFleetUnit,
): SpecialAttackMods {
    const special_attack_power_mod =
        calc_Yamato_Duo_special_power_mod(attacker_unit, second_unit);

    const special_attack_accuracy_mod =
        calc_Yamato_Duo_special_accuracy_mod(special_attack_power_mod);

    const mods: SpecialAttackMods = {
        special_attack_power_mod,
        special_attack_accuracy_mod,
    };

    return mods;
}