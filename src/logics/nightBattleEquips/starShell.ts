import { PlayerFleetUnit } from "@/models/fleet/FleetUnit";
import { is_retreated } from "@/models/ship/equipped";
import { Brand } from "@/types/brands";
import { RandValue } from "@/types/brands/other";

/// 照明弾
/// もし発動した艦もログで欲しいとかだと書き直さきゃいけない

/**
 * 照明弾を装備している艦の数を返す
 * @param attacker_units 
 * @returns 
 */
export function calc_equip_star_shell_ship_count(
    attacker_units: PlayerFleetUnit[],
): number {
    return attacker_units.filter(unit =>
        !is_retreated(unit.ship) &&
        unit.ship.state.hp_remain >= 5 && // 轟沈弾きを兼ねる
        unit.ship.equip_slots.some(slot =>
            slot.equip?.type_id === 'STARSHELL'
        )
    ).length;
}

export type StarShellType =
    | 'Fire'
    | 'Misfire'

/**
 * 照明弾の発動如何を判定して返す
 * @param equip_star_shell_ship_count 
 * @param rand 
 * @returns 
 */
export function roll_star_shell(
    equip_star_shell_ship_count: number,
    rand_value: RandValue,
): StarShellType {
    if (equip_star_shell_ship_count === 0) return 'Misfire';

    // ? ソース不統一 日wiki: 71, ENwiki & Sortie Sim: 70
    const TRIGGER_RATE = 0.7;

    const total_misfire_rate =
        Math.pow(1 - TRIGGER_RATE, equip_star_shell_ship_count);

    return rand_value < (1 - total_misfire_rate)
        ? 'Fire'
        : 'Misfire';
}

export type AccuracyStarShellMod =
    Brand<number, 'NightBattleAccuracyStarShellMod'>

// NOTE: 以下の補正値はwikiに具体的な記述が無いのでユーザーに提示する価値が高い

/**
 * 夜戦命中における照明弾加算補正を返す
 * @param star_shell_type 
 * @returns 
 */
export function calc_accuracy_star_shell_mod(
    star_shell_type: StarShellType,
): AccuracyStarShellMod {
    return star_shell_type === 'Fire'
        ? 5 as AccuracyStarShellMod
        : 0 as AccuracyStarShellMod; 
}

export type CIRateStarShellMod = Brand<number, 'CIRateStarShellMod'>

/**
 * 夜戦CI発動率における照明弾加算補正を返す
 * @param star_shell_type 
 * @returns 
 */
export function calc_CI_change_star_shell_mod(
    attacker_star_shell_type: StarShellType,
    defender_star_shell_type: StarShellType,
): CIRateStarShellMod {
    const ATTACKER_CONSTANT = 4;
    const DEFENDER_CONSTANT = 10;

    const attacker_mod = attacker_star_shell_type !== 'Misfire'
        ? ATTACKER_CONSTANT
        : 0;
    const defender_mod = defender_star_shell_type !== 'Misfire'
        ? DEFENDER_CONSTANT
        : 0;

    return attacker_mod - defender_mod as CIRateStarShellMod;
}