import { SpecialAttackMods } from "@/logics/SpecialAttack";
import { PlayerFleetUnit } from "@/models/fleet/FleetUnit";
import { calc_Yamato_Duo_special_power_mod } from "./power";
import { calc_Yamato_Duo_special_accuracy_mod } from "./accuracy";
import { extract_second_ship } from "@/types/fleet/ship";
import { SecondUnit } from "@/types/fleet/fleetUnit";

/**
 * 大和型2隻タッチの補正セットを返す
 * @param attacker_unit 
 * @param second_unit 
 * @returns 
 */
export function calc_Yamato_Duo_special_mods(
    attacker_unit: PlayerFleetUnit,
    second_unit: SecondUnit,
): SpecialAttackMods {
    const second_ship = extract_second_ship(second_unit);
    
    const special_attack_power_mod =
        calc_Yamato_Duo_special_power_mod(attacker_unit, second_ship);

    const special_attack_accuracy_mod =
        calc_Yamato_Duo_special_accuracy_mod(special_attack_power_mod);

    const mods: SpecialAttackMods = {
        special_attack_power_mod,
        special_attack_accuracy_mod,
    };

    return mods;
}