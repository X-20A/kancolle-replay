import { extract_flagship, is_combined_fleet, PlayerFleet } from "@/models/fleet/Fleet";
import { is_damage_moderatery_or_more, is_retreated, is_submarine_category, PlayerEquippedShip } from "@/models/ship/equipped";
import { includes_formation_type } from "../formation";
import { has_at_least } from "@/types";
import { SpecialAttackType } from ".";
import { DayOrNight } from "@/types/battle";

/// 潜水艦隊攻撃
// https://en.kancollewiki.net/Special_Attacks/Submarine_Touch#Trigger_Rate
// NOTE: 発動しても資源の追加徴収は無い

/**
 * 潜水艦隊攻撃の随伴として参加可能か判定して返す
 * @param ship 
 * @returns 
 */
const is_valid_partner = (
    ship: PlayerEquippedShip | undefined,
): boolean => {
    return ship !== undefined &&
        !is_damage_moderatery_or_more(ship) &&
        is_submarine_category(ship) &&
        !is_retreated(ship)
}

/**
 * 潜水艦隊攻撃が発動可能か判定して返す
 * @param fleet 
 * @param phase_type 
 * @returns 
 */
export function can_submarine_touch(
    fleet: PlayerFleet,
    phase_type: DayOrNight,
): boolean {
    if (!has_at_least(fleet.main_fleet_units, 3)) return false;
    const { ship: flagship } = extract_flagship(fleet, phase_type);
    const second_ship = fleet.main_fleet_units[1].ship;
    const third_ship = fleet.main_fleet_units[2].ship;
    const fourth_ship = fleet.main_fleet_units[3]?.ship;
    if (!second_ship || !third_ship) return false;

    const valid_SS_length = [second_ship, third_ship, fourth_ship]
        .filter(is_valid_partner)
        .length;

    return valid_SS_length <= 1 ||
        is_combined_fleet(fleet) ||
        flagship.lv < 30 ||
        flagship.type_id !== 'AS' ||
        is_damage_moderatery_or_more(flagship) ||
        !is_valid_partner(second_ship) ||
        !is_valid_partner(third_ship) ||
        !includes_formation_type(['Echelon', 'LineAbreast'], fleet.formation) ||
        (fleet.is_activated_special_attack && phase_type === 'Day');
}

type SubmarineSpecialAttack = Extract<SpecialAttackType,
    | "Submarine_Fleet_Special_2_3"
    | "Submarine_Fleet_Special_3_4"
    | "Submarine_Fleet_Special_2_4"
>

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

export function extract_participate_ships(
    fleet: PlayerFleet,
): SubmarineSpecialAttack {
    const second_unit = fleet.main_fleet_units[1];
    const second_ship = second_unit?.ship;

    const third_unit = fleet.main_fleet_units[2];
    const third_ship = third_unit?.ship;

    const fourth_unit = fleet.main_fleet_units[3];
    const fourth_ship = fourth_unit?.ship;

    // TODO: 要テスト
    if (
        fourth_ship &&
        is_submarine_category(fourth_ship) &&
        !is_retreated(fourth_ship) &&
        second_ship &&
        !is_damage_moderatery_or_more(second_ship) &&
        !is_damage_moderatery_or_more(fourth_ship)
    ) return 'Submarine_Fleet_Special_2_4';
    if (
        fourth_ship &&
        is_submarine_category(fourth_ship) &&
        !is_retreated(fourth_ship) &&
        third_ship &&
        !is_damage_moderatery_or_more(third_ship) &&
        !is_damage_moderatery_or_more(fourth_ship)
    ) return 'Submarine_Fleet_Special_3_4';
    if (
        second_ship &&
        !is_damage_moderatery_or_more(second_ship) &&
        third_ship &&
        !is_damage_moderatery_or_more(third_ship)
    ) return 'Submarine_Fleet_Special_2_3';

    throw new Error('潜水艦隊攻撃がトリガーされましたが有効な参加艦が不足しています');
}

export function evaluate_submarine_fleet_attack(
    fleet: PlayerFleet,
    phase_type: DayOrNight,
): SubmarineSpecialAttack | 'impossible' {
    if (!can_submarine_touch(fleet, phase_type)) return 'impossible';

    return extract_participate_ships(fleet);
}