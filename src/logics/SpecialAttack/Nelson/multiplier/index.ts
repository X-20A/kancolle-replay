import { PlayerFleetUnit } from "@/models/fleet/FleetUnit";
import { SpecialAttackMods } from "../..";
import { calc_Nelson_special_power_mod } from "./power";
import { EngagementType } from "@/logics/engagemenet";
import { calc_Nelson_special_accuracy_mod } from "./accuracy";
import { extract_fifth_ship, extract_third_ship } from "@/types/fleet/ship";
import { FifthUnit, ThirdUnit } from "@/types/fleet/fleetUnit";

export function calc_Nelson_special_mods(
    attacker_unit: PlayerFleetUnit,
    third_unit: ThirdUnit,
    fifth_unit: FifthUnit,
    engagement_type: EngagementType,
): SpecialAttackMods {
    const third_ship = extract_third_ship(third_unit);
    const fifth_ship = extract_fifth_ship(fifth_unit);

    const special_attack_power_mod = calc_Nelson_special_power_mod(
        attacker_unit,
        third_ship,
        fifth_ship,
        engagement_type,
    );

    const special_attack_accuracy_mod =
        calc_Nelson_special_accuracy_mod();

    const mods: SpecialAttackMods = {
        special_attack_power_mod,
        special_attack_accuracy_mod,
    };

    return mods;
}