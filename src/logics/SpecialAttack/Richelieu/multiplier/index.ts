import { PlayerFleetUnit } from "@/models/fleet/FleetUnit";
import { SpecialAttackMods } from "../..";
import { calc_Richelieu_special_pre_info } from "./preInfo";
import { calc_Richelieu_special_power_mod } from "./power";
import { calc_Richelieu_special_accuracy_mod } from "./accuracy";
import { FirstUnit } from "@/types/fleet/fleetUnit";
import { extract_first_ship } from "@/types/fleet/ship";

export function calc_Richelieu_special_mods(
    attacker_unit: PlayerFleetUnit,
    first_unit: FirstUnit,
): SpecialAttackMods {
    const pre_info =
        calc_Richelieu_special_pre_info(attacker_unit.ship.equip_slots);

    const first_ship = extract_first_ship(first_unit);

    const special_attack_power_mod = calc_Richelieu_special_power_mod(
        attacker_unit,
        first_ship,
        pre_info,
    );

    const special_attack_accuracy_mod =
        calc_Richelieu_special_accuracy_mod(pre_info);

    const mods: SpecialAttackMods = {
        special_attack_power_mod,
        special_attack_accuracy_mod,
    };

    return mods;
}