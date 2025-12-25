import { extract_flagship, PlayerFleet } from "@/models/fleet/Fleet";
import { is_damage_moderatery_or_more, is_ship_on_the_front_line, is_submarine_category, PlayerEquippedShip } from "@/models/ship/equipped";
import { has_at_least } from "@/types";
import { SpecialAttackIneligible, SpecialAttackMisfire, ValidSpecialAttack } from "..";
import { DayOrNight } from "@/types/battle";
import { is_random_successful } from "@/effects/random";
import { RandValue } from "@/types/brands/other";
import { PlayerFleetUnit } from "@/models/fleet/FleetUnit";
import { can_activate_Submarine_special } from "./active";

/// 潜水艦隊攻撃
// https://en.kancollewiki.net/Special_Attacks/Submarine_Touch#Trigger_Rate
// NOTE: 発動しても資源の追加徴収は無い

const TRIGGER_RATE = 0.8;

const calc_trigger_rate = (): number => {
    return TRIGGER_RATE;
}

export type SubmarineSpecialAttack = ValidSpecialAttack<
    | "Submarine_Fleet_Special_2_3"
    | "Submarine_Fleet_Special_3_4"
    | "Submarine_Fleet_Special_2_4"
>

/**
 * 潜水艦隊攻撃が発動可能か判定して返す
 * @param fleet 
 * @param phase_type 
 * @returns 
 */
export function evaluate_submarine_fleet_attack(
    fleet: PlayerFleet,
    phase_type: DayOrNight,
    rand_value: RandValue,
): SubmarineSpecialAttack | SpecialAttackIneligible | SpecialAttackMisfire {
    if (!has_at_least(fleet.main_fleet_units, 3)) return 'Ineligible';

    const { ship: flagship } = extract_flagship(fleet, phase_type);
    const second_ship = fleet.main_fleet_units[1].ship;
    const third_ship = fleet.main_fleet_units[2].ship;
    const fourth_ship: PlayerEquippedShip | undefined = fleet.main_fleet_units[3]?.ship;

    if (
        !can_activate_Submarine_special(fleet, flagship, second_ship, third_ship, fourth_ship, phase_type)
    ) return 'Ineligible';

    const trigger_rate = calc_trigger_rate();

    if (
        !is_random_successful(trigger_rate, rand_value)
    ) return 'Misfire';

    // TODO: 要テスト
    if (
        fourth_ship &&
        is_submarine_category(fourth_ship) &&
        !is_ship_on_the_front_line(fourth_ship) &&
        !is_damage_moderatery_or_more(second_ship) &&
        !is_damage_moderatery_or_more(fourth_ship)
    ) return 'Submarine_Fleet_Special_2_4';
    if (
        fourth_ship &&
        is_submarine_category(fourth_ship) &&
        !is_ship_on_the_front_line(fourth_ship) &&
        !is_damage_moderatery_or_more(third_ship) &&
        !is_damage_moderatery_or_more(fourth_ship)
    ) return 'Submarine_Fleet_Special_3_4';
    if (
        !is_damage_moderatery_or_more(second_ship) &&
        !is_damage_moderatery_or_more(third_ship)
    ) return 'Submarine_Fleet_Special_2_3';

    throw new Error('潜水艦隊攻撃がトリガーされましたが攻撃種別判定に不備があります');
}

export function extract_participate_submarine_fleet_attack_units(
    fleet: PlayerFleet,
    special_attack_type: SubmarineSpecialAttack,
): PlayerFleetUnit[] {
    const ERROR_MESSAGE = '潜水艦隊攻撃の参加艦を抽出しようとしましたが、該当艦が存在しませんでした';
    const attacker_units = fleet.main_fleet_units;

    if (special_attack_type === 'Submarine_Fleet_Special_2_3') {
        if (
            !has_at_least(attacker_units, 3)
        ) throw Error(ERROR_MESSAGE);

        return [
            attacker_units[1],
            attacker_units[2],
        ];
    }

    if (
        !has_at_least(attacker_units, 4)
    ) throw Error(ERROR_MESSAGE);
    
    if (special_attack_type === 'Submarine_Fleet_Special_2_4') {
        return [
            attacker_units[1],
            attacker_units[3],
        ];
    }

    // Submarine_Fleet_Special_3_4
    return [
        attacker_units[2],
        attacker_units[3],
    ];
}