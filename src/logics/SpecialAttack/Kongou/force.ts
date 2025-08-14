import { extract_first_unit, extract_second_unit, FirstUnit, SecondUnit } from "@/types/fleet/fleetUnit";
import { AtLeast } from "@/types";
import { PlayerFleetUnit } from "@/models/fleet/FleetUnit";
import { EngagementType } from "@/logics/engagemenet";
import { derive_special_attack_unit, SpecialAttackUnit } from "@/models/fleet/SpecialAttackUnit";
import { calc_Kongou_special_mods } from "./multiplier";

const ATTACK_COUNTS = {
    first: 1,
    second: 1,
} as const;

type KongouSpecialComponents = [FirstUnit, SecondUnit]

const extract_components = (
    attacker_units: AtLeast<PlayerFleetUnit, 2>,
): KongouSpecialComponents => {
    const components: KongouSpecialComponents = [
        extract_first_unit(attacker_units),
        extract_second_unit(attacker_units),
    ];

    return components;
}

const derive_Kongou_special_unit = (
    engagement_type: EngagementType,
    unit: PlayerFleetUnit,
    attack_count: number,
): SpecialAttackUnit => {
    const mods = calc_Kongou_special_mods(
        engagement_type,
        unit,
    );
    return derive_special_attack_unit(
        unit,
        mods,
        attack_count,
    );
}

export type KongouSpecialForce =
    [SpecialAttackUnit, SpecialAttackUnit]

export function derive_Kongou_special_force(
    engagement_type: EngagementType,
    attacker_units: AtLeast<PlayerFleetUnit, 2>,
): KongouSpecialForce {
    const components = extract_components(attacker_units);

    const force: KongouSpecialForce = [
        derive_Kongou_special_unit(engagement_type, components[0], ATTACK_COUNTS.first),
        derive_Kongou_special_unit(engagement_type, components[1], ATTACK_COUNTS.second),
    ];

    return force;
}