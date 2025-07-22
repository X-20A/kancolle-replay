import { EquippedShip, includes_anti_PT_Amagiri, is_abyssal_ship, is_player_ship, is_PT } from "@/models/ship/equipped";
import { Accuracy } from ".";
import { Fleet, is_combined_fleet, is_player_fleet } from "@/models/fleet/Fleet";
import { FleetUnit } from "@/models/fleet/FleetUnit";
import { match } from "ts-pattern";
import { FitAccuracyMod } from "../fit/fit";
import { ArmorPiercingAccuracyMod } from "../armorPiercing";
import { AirSuperiorityStrikeAccuracyMod } from "../airSuperIorityStrike";
import { AccuracyMoraleMod } from "../morale";
import { ShellAccuracyFormationMod } from "../formation";
import { ShellAccuracyVanguardMod } from "../vanguard";
import { ShellAccuracySmokeMod } from "../smokeScreen";

/**
 * 彼我の艦隊種別組み合わせごとの命中基礎値(ACC_base)を返す
 * @param attacker_fleet 
 * @param defender_fleet 
 * @param attacker_unit 
 * @param defender_unit 
 * @returns 
 */
const calc_acc_base = (
    attacker_fleet: Fleet,
    defender_fleet: Fleet,
    attacker_unit: FleetUnit,
    defender_unit: FleetUnit,
): number => {
    if (is_player_fleet(attacker_fleet)) {
        if (!is_combined_fleet(attacker_fleet)) {
            return !is_combined_fleet(defender_fleet)
                ? 90
                : 80;
        }

        match(attacker_fleet.fleet_type)
            .with('Carrier_Task_Force', () => {
                if (attacker_unit.fleet_type !== 'escort') return 78; // 通常|連合 同じ

                return !is_combined_fleet(defender_fleet)
                    ? 45
                    : 67;
            })
            .with('Surface_Task_Force', () => {
                if (attacker_unit.fleet_type !== 'escort') {
                    return !is_combined_fleet(defender_fleet)
                        ? 45
                        : 78;
                }

                return 67; // 通常|連合 同じ
            })
            .with('Transport_Escort_Force', () => {
                if (attacker_unit.fleet_type !== 'escort') return 54; // 通常|連合 同じ

                return is_combined_fleet(defender_fleet)
                    ? 45
                    : 67;
            })
    }
    
    if (!is_combined_fleet(attacker_fleet)) {
        if (!is_combined_fleet(defender_fleet)) return 90;

        match(defender_fleet.fleet_type)
            .with('Carrier_Task_Force', () => {
                return defender_unit.fleet_type !== 'escort'
                    ? 88
                    : 65;
            })
            .with('Surface_Task_Force', () => {
                return defender_unit.fleet_type !== 'escort'
                    ? 65
                    : 75;
            })
            .with('Transport_Escort_Force', () => {
                return defender_unit.fleet_type !== 'escort'
                    ? 88
                    : 65;
            })
            .exhaustive();
    }

    if (attacker_unit.fleet_type !== 'escort') {
        return is_combined_fleet(defender_fleet)
            ? 90
            : 88;
    }
    return 75;
}

/**
 * 装備群の砲撃命中総計を返す
 * @param attacker_ship 
 * @returns 
 */
const calc_acc_equip = (
    attacker_ship: EquippedShip,
): number => {
    const total_natural_equip_accuracy =
        attacker_ship.total_natural_equip_addition.shell_accuracy;
    if (!is_player_ship(attacker_ship)) return total_natural_equip_accuracy;

    return total_natural_equip_accuracy
        + attacker_ship.total_equip_improvement_addition.shell_accuracy;
}

/**
 * 対PTボーナスを返す    
 * 天霧改二/丁 と、その前後の艦にボーナス
 * @param attacker_units 
 * @param attacker_unit 
 * @param defender_ship 
 * @returns 
 */
const calc_Amagiri_mod = (
    attacker_units: FleetUnit[],
    attacker_unit: FleetUnit,
    defender_ship: EquippedShip,
): number => {
    if (!is_PT(defender_ship)) return 0;

    const attacker_ship = attacker_unit.ship;
    if (includes_anti_PT_Amagiri(attacker_ship)) return 65;

    const unit_index = attacker_unit.original_index;
    const previous_unit =attacker_units[unit_index - 1];
    if (
        previous_unit?.ship &&
        includes_anti_PT_Amagiri(previous_unit.ship)
    ) return 35;
    const rear_unit = attacker_units[unit_index + 1];
    if (
        rear_unit?.ship &&
        includes_anti_PT_Amagiri(rear_unit.ship)
    ) return 35;

    return 0;
}

/**
 * 昼砲撃戦の命中項を返す
 * @param attacker_fleet 
 * @param defender_fleet 
 * @param attacker_unit 
 * @param defender_unit 
 * @param attacker_units 
 * @param defender_vanguard_mod 
 * @param formation_mod 
 * @param morale_mod 
 * @param fit_mod 
 * @param spotting_mod 
 * @param AP_mod 
 * @param smoke_mod 
 * @returns 
 */
export function calc_day_shelling_accuracy(
    attacker_fleet: Fleet,
    defender_fleet: Fleet,
    attacker_unit: FleetUnit,
    defender_unit: FleetUnit,
    attacker_units: FleetUnit[],
    defender_vanguard_mod: ShellAccuracyVanguardMod,
    formation_mod: ShellAccuracyFormationMod,
    morale_mod: AccuracyMoraleMod,
    fit_mod: FitAccuracyMod,
    spotting_mod: AirSuperiorityStrikeAccuracyMod,
    AP_mod: ArmorPiercingAccuracyMod,
    smoke_mod: ShellAccuracySmokeMod,
): Accuracy {
    const acc_base = calc_acc_base(
        attacker_fleet,
        defender_fleet,
        attacker_unit,
        defender_unit,
    );

    const attacker_ship = attacker_unit.ship;
    const acc_equip = calc_acc_equip(attacker_ship);
    const amagiri_mod = calc_Amagiri_mod(
        attacker_units,
        attacker_unit,
        defender_unit.ship,
    );
    const core = acc_base
        + 2 * Math.sqrt(attacker_ship.lv)
        + 1.5 * Math.sqrt(attacker_ship.edited_status.luck)
        + acc_equip
        + amagiri_mod;

    const fit_mod_applied = core * defender_vanguard_mod * formation_mod * morale_mod
        + fit_mod;

    const accuracy = fit_mod_applied
        * spotting_mod
        * AP_mod
        * smoke_mod;

    return accuracy as Accuracy;
}