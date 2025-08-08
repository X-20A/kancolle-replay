import { extract_flagship, is_already_special_attack_activated, is_combined_fleet, PlayerFleet } from "@/models/fleet/Fleet";
import { is_damage_moderatery_or_more, is_operational, is_submarine_category, PlayerEquippedShip } from "@/models/ship/equipped";
import { includes_formation_type } from "../formation";
import { has_at_least } from "@/types";
import { SpecialAttacckIneligible, ValidSpecialAttack } from ".";
import { DayOrNight } from "@/types/battle";
import { ShipType } from "@/types/ship/ship";

/// 潜水艦隊攻撃
// https://en.kancollewiki.net/Special_Attacks/Submarine_Touch#Trigger_Rate
// NOTE: 発動しても資源の追加徴収は無い

const TRIGGERABLE_SHIP_TYPE: ShipType = 'AS';

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
        flagship.lv >= 30 ||
        !is_damage_moderatery_or_more(flagship) &&
        valid_SS_length >= 2 &&
        is_valid_joining_ship(second_ship) &&
        is_valid_joining_ship(third_ship) &&
        !is_combined_fleet(fleet) &&
        includes_formation_type(['Echelon', 'LineAbreast'], fleet.formation) &&
        (!is_already_special_attack_activated(fleet) || phase_type === 'Night')
    );
}

type SubmarineSpecialAttack = ValidSpecialAttack<
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
): SubmarineSpecialAttack | SpecialAttacckIneligible {
    if (!has_at_least(fleet.main_fleet_units, 3)) return 'Ineligible';

    const { ship: flagship } = extract_flagship(fleet, phase_type);
    const second_ship = fleet.main_fleet_units[1].ship;
    const third_ship = fleet.main_fleet_units[2].ship;
    const fourth_ship: PlayerEquippedShip | undefined = fleet.main_fleet_units[3]?.ship;

    if (
        can_trigger(fleet, flagship, second_ship, third_ship, fourth_ship, phase_type)
    ) return 'Ineligible';

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

    throw new Error('潜水艦隊攻撃がトリガーされましたが有効な参加艦が不足しています');
}

/**
 * 潜水艦隊攻撃の発動率を計算する
 * @param fleet 
 * @returns 
 */
export function calc_submarine_touch_rate(_: PlayerFleet): number {
    // wikiにはレベルと運の影響を受けるとあるが計算式は無い。よって暫定値
    const TRIGGER_RATE = 0.8;
    return TRIGGER_RATE;
}