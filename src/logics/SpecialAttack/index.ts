import { AbyssalFleet, PlayerFleet } from "@/models/fleet/Fleet";
import { evaluate_submarine_fleet_attack } from "./Submarine";
import { DayOrNight } from "@/types/battle";
import { RandGenerator } from "@/effects/random";
import { evaluate_Yamato_class_special_attack } from "./Yamato";
import { calc_valid_component_ship_length, extract_attacker_units } from "./util";
import { evaluate_Nelson_class_special_attack } from "./Nelson";
import { evaluate_Nagato_class_special_attack } from "./Nagato";
import { evaluate_Richelieu_class_special_attack } from "./Richelieu";
import { evaluate_Queen_Elizabeth_class_special_attack } from "./QueenElizabeth";
import { evaluate_Kongou_class_special_attack } from "./Kongou";
import { evaluate_Colorado_class_special_attack_type } from "./Colorado";

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

export type SpecialAttackIneligible = 'Ineligible'

export type SpecialAttackMisfire = 'Misfire'

export function calc_triggerable_special_attack_type(
    attacker_fleet: PlayerFleet,
    defender_fleet: AbyssalFleet,
    phase_type: DayOrNight,
    rand: RandGenerator,
): SpecialAttackType | SpecialAttackIneligible | SpecialAttackMisfire {
    const general_attacker_units =
        extract_attacker_units(attacker_fleet, phase_type);
    const valid_component_ship_length =
        calc_valid_component_ship_length(general_attacker_units);

    // 大和タッチが2隻|3隻両方を満たす場合に多重判定になっているので
    // wikiにおける Activation requirements と Trigger Rate を分離するのは難しい
    
    const Yamato_class_special_attack_result = evaluate_Yamato_class_special_attack(
        attacker_fleet,
        general_attacker_units,
        valid_component_ship_length,
        [rand.next(), rand.next()],
    );
    if (Yamato_class_special_attack_result !== 'Ineligible') return Yamato_class_special_attack_result;

    const Nelson_class_special_attack_result = evaluate_Nelson_class_special_attack(
        attacker_fleet,
        general_attacker_units,
        valid_component_ship_length,
        rand.next(),
    );
    if (Nelson_class_special_attack_result !== 'Ineligible') return Nelson_class_special_attack_result;

    const Nagato_class_special_attack_result = evaluate_Nagato_class_special_attack(
        attacker_fleet,
        defender_fleet,
        general_attacker_units,
        valid_component_ship_length,
        rand.next(),
    );
    if (Nagato_class_special_attack_result !== 'Ineligible') return Nagato_class_special_attack_result;

    const Richelieu_class_special_attack_result = evaluate_Richelieu_class_special_attack(
        attacker_fleet,
        general_attacker_units,
        valid_component_ship_length,
        rand.next(),
    );
    if (Richelieu_class_special_attack_result !== 'Ineligible') return Richelieu_class_special_attack_result;

    const Queen_Elizabeth_class_special_attack_result = evaluate_Queen_Elizabeth_class_special_attack(
        attacker_fleet,
        general_attacker_units,
        valid_component_ship_length,
        rand.next(),
    );
    if (Queen_Elizabeth_class_special_attack_result !== 'Ineligible') return Queen_Elizabeth_class_special_attack_result;

    const Kongou_class_special_attack_result = evaluate_Kongou_class_special_attack(
        attacker_fleet,
        phase_type,
        rand.next(),
    );
    if (Kongou_class_special_attack_result !== 'Ineligible') return Kongou_class_special_attack_result;

    const Colorado_class_special_attack_result = evaluate_Colorado_class_special_attack_type(
        attacker_fleet,
        general_attacker_units,
        valid_component_ship_length,
        rand.next(),
    );
    if (Colorado_class_special_attack_result !== 'Ineligible') return Colorado_class_special_attack_result;

    const submarine_fleet_attack_result = evaluate_submarine_fleet_attack(
        attacker_fleet,
        phase_type,
        rand.next(),
    );
    if (submarine_fleet_attack_result !== 'Ineligible') return submarine_fleet_attack_result;

    return 'Ineligible';
}