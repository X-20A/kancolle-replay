import { extract_flagship, is_already_special_attack_activated, is_combined_fleet, PlayerFleet } from "@/models/fleet/Fleet";
import { is_damage_moderatery_or_more, is_operational, is_submarine_category, PlayerEquippedShip } from "@/models/ship/equipped";
import { has_formation_type } from "../formation";
import { FormationType, has_at_least } from "@/types";
import { SpecialAttackIneligible, SpecialAttackMisfire, SpecialAttackType, ValidSpecialAttack } from ".";
import { DayOrNight } from "@/types/battle";
import { ShipType } from "@/types/ship/ship";
import { is_random_successful } from "@/effects/random";
import { RandValue } from "@/types/brands/other";
import { SpecialAttackUnits } from "./util";
import { PlayerFleetUnit } from "@/models/fleet/FleetUnit";

/// 潜水艦隊攻撃
// https://en.kancollewiki.net/Special_Attacks/Submarine_Touch#Trigger_Rate
// NOTE: 発動しても資源の追加徴収は無い

const TRIGGERABLE_SHIP_TYPE: ShipType = 'AS';

const TRIGGERABLE_FORMATION: Set<FormationType> = new Set([
    'Echelon',
    'LineAbreast',
]);

const REQUIRED_FLAGSHIP_LV = 30;

const REQUIRED_SUBMARINE_COUNT = 2;

const TRIGGER_RATE = 0.8;

/**
 * 潜水艦隊攻撃の随伴として参加可能か判定して返す
 * @param ship 
 * @returns 
 */
const is_valid_joining_ship = (
    ship: PlayerEquippedShip | undefined,
): boolean => {
    return ship !== undefined &&
        !is_damage_moderatery_or_more(ship) &&
        is_submarine_category(ship) &&
        !is_operational(ship)
}

const can_trigger = (
    fleet: PlayerFleet,
    flagship: PlayerEquippedShip,
    second_ship: PlayerEquippedShip,
    third_ship: PlayerEquippedShip,
    fourth_ship: PlayerEquippedShip | undefined,
    phase_type: DayOrNight,
): boolean => {
    const valid_SS_length = [second_ship, third_ship, fourth_ship]
        .filter(is_valid_joining_ship)
        .length;
    
    return (
        flagship.type_id === TRIGGERABLE_SHIP_TYPE &&
        flagship.lv >= REQUIRED_FLAGSHIP_LV &&
        !is_damage_moderatery_or_more(flagship) &&
        valid_SS_length >= REQUIRED_SUBMARINE_COUNT &&
        is_valid_joining_ship(second_ship) &&
        is_valid_joining_ship(third_ship) &&
        !is_combined_fleet(fleet) &&
        has_formation_type(TRIGGERABLE_FORMATION, fleet.formation) &&
        (!is_already_special_attack_activated(fleet) || phase_type === 'Night')
    );
}

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
        can_trigger(fleet, flagship, second_ship, third_ship, fourth_ship, phase_type)
    ) return 'Ineligible';

    const trigger_rate = calc_trigger_rate();

    if (
        !is_random_successful(trigger_rate, rand_value)
    ) return 'Misfire';

    // TODO: 要テスト
    if (
        fourth_ship &&
        is_submarine_category(fourth_ship) &&
        !is_operational(fourth_ship) &&
        !is_damage_moderatery_or_more(second_ship) &&
        !is_damage_moderatery_or_more(fourth_ship)
    ) return 'Submarine_Fleet_Special_2_4';
    if (
        fourth_ship &&
        is_submarine_category(fourth_ship) &&
        !is_operational(fourth_ship) &&
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