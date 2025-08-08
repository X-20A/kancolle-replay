import { PlayerFleet } from "@/models/fleet/Fleet";
import { evaluate_submarine_fleet_attack } from "./Submarine";
import { DayOrNight } from "@/types/battle";

const SPECIAL_ATTACKS = {
    Nelson_Special: 100,
    Nagato_Special: 101,
    Mutsu_Special: 102,
    Colorado_Special: 103,
    Kongou_Special: 104,
    Richelieu_Special: 105,
    Queen_Elizabeth_Special: 106,
    Submarine_Fleet_Special_2_3: 300,
    Submarine_Fleet_Special_3_4: 301,
    Submarine_Fleet_Special_2_4: 302,
    Yamato_3_Ships_Special: 400,
    Yamato_2_Ships_Special: 400,
} as const;
export type SpecialAttackType = keyof typeof SPECIAL_ATTACKS

export type ValidSpecialAttack<K extends SpecialAttackType> = K;

export type SpecialAttacckIneligible = 'Ineligible'

export function calc_triggerable_special_attack_type(
    fleet: PlayerFleet,
    phase_type: DayOrNight,
): SpecialAttackType | 'Ineligible' {
    const submarine_fleet_attack_type = evaluate_submarine_fleet_attack(
        fleet,
        phase_type,
    );
    if (submarine_fleet_attack_type !== 'Ineligible') return submarine_fleet_attack_type;


    return 'Ineligible';
}