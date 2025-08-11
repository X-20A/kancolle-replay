import { SpecialAttackMods, SpecialAttackType } from "@/logics/SpecialAttack";
import { PlayerFleetUnit } from "./FleetUnit";

export type SpecialAttackUnit = {
    readonly unit: PlayerFleetUnit,
    readonly special_attack_mods: SpecialAttackMods,
    readonly attack_count: number,
}

const derive_special_attack_unit_core = (
    unit: PlayerFleetUnit,
    special_attack_mods: SpecialAttackMods,
    attack_count: number,
): SpecialAttackUnit => {
    const special_attack_unit: SpecialAttackUnit = {
        unit,
        special_attack_mods,
        attack_count,
    };

    return special_attack_unit;
}

export function derive_special_attack_unit(
    unit: PlayerFleetUnit,
    special_attack_mods: SpecialAttackMods,
    attack_count: number,
): SpecialAttackUnit {
    const special_attack_unit: SpecialAttackUnit = {
        unit,
        special_attack_mods,
        attack_count,
    };

    return special_attack_unit;
}