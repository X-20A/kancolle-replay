import { PlayerFleetUnit } from "@/models/fleet/FleetUnit";
import { SpecialAttackMods } from "../..";
import { calc_Nelson_special_power_mod } from "./power";
import { EngagementType } from "@/logics/engagemenet";
import { calc_Nelson_special_accuracy_mod } from "./accuracy";

export function calc_Nelson_special_mods(
    attacker_unit: PlayerFleetUnit,
    third_unit: PlayerFleetUnit,
    fifth_unit: PlayerFleetUnit,
    engagement_type: EngagementType,
): SpecialAttackMods {
    const special_attack_power_mod = calc_Nelson_special_power_mod(
        attacker_unit,
        third_unit,
        fifth_unit,
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