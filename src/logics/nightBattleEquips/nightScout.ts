import { RandGenerator } from "@/effects/random";
import { PlayerEquip } from "@/models/equip/basic";
import { PlayerFleetUnit } from "@/models/fleet/FleetUnit";
import { is_sunk, PlayerEquippedShip } from "@/models/ship/equipped";
import { is_equip_exsist } from "@/models/ship/EquipSlot";
import { Brand } from "@/types/brands";

/// 夜偵

/**
 * 夜偵発動率を返す
 * @param ship 
 * @param night_scout 
 * @returns 
 */
const calc_trigger_rate = (
    ship: PlayerEquippedShip,
    night_scout: PlayerEquip,
): number => {
    return Math.floor(
        Math.sqrt(ship.lv * night_scout.natural_addition.los)
    ) * 0.04;
}

/**
 * 発動した夜偵の命中値を返す    
 * 発動しなかったら 'None' を返す
 * @param fleet_units 
 * @param rand 
 * @returns 
 */
export function calc_accuracy_of_triggered_night_scout(
    fleet_units: PlayerFleetUnit[],
    rand: RandGenerator,
): number | 'None' {
    // ? 走査順不明 暫定: 上の艦、上の装備スロットから
    let best_night_scout: PlayerEquip | null = null;
    for (const unit of fleet_units) {
        const { ship } = unit;
        // ? 轟沈状態で飛ばせるか不明 退避艦は飛ばせる
        if (is_sunk(ship)) continue;
        for (const slot of ship.equip_slots) {
            const { equip: night_scout } = slot;
            if (
                slot.slot_count === 0 ||
                !is_equip_exsist(night_scout) ||
                !night_scout.flags.is_night_scout
            ) continue;

            const best_night_scout_accuracy =
                best_night_scout?.natural_addition.accuracy || 0;
            const night_scout_accuracy =
                night_scout.natural_addition.accuracy;
            if (
                // NOTE: 命中値の高いものを優先
                // https://x.com/CC_jabberwock/status/1542501537036939265
                night_scout_accuracy > best_night_scout_accuracy &&
                rand.next() < calc_trigger_rate(ship, night_scout)
            ) best_night_scout = night_scout;
        }
    }

    return best_night_scout === null
        ? 'None'
        : best_night_scout.natural_addition.accuracy;
}

export type ShellPowerNightScoutMod = Brand<number, 'ShellPowerNightScoutMod'>
export type AccuracyNightScoutMod = Brand<number, 'AccuracyNightScoutMod'>
export type CriticalNightScoutMod = Brand<number, 'CriticalNightScoutMod'>

/**
 * 夜偵の命中値別ボーナス値を返す
 * @param night_scout_accuracy 
 * @returns 
 */
export function calc_night_scout_bonus(
    night_scout_accuracy: number | 'None',
): {
    shell_power_mod: ShellPowerNightScoutMod,
    accuracy_mod: AccuracyNightScoutMod,
    critical_rate_mod: CriticalNightScoutMod,
} {
    if (night_scout_accuracy === 'None') return {
        shell_power_mod: 1 as ShellPowerNightScoutMod,
        accuracy_mod: 1 as AccuracyNightScoutMod,
        critical_rate_mod: 1 as CriticalNightScoutMod,
    }

    if (night_scout_accuracy === 1) return {
        shell_power_mod: 5 as ShellPowerNightScoutMod,
        accuracy_mod: 1.1 as AccuracyNightScoutMod,
        critical_rate_mod: 1.57 as CriticalNightScoutMod,
    };
    if (night_scout_accuracy === 2) return {
        shell_power_mod: 7 as ShellPowerNightScoutMod,
        accuracy_mod: 1.15 as AccuracyNightScoutMod,
        critical_rate_mod: 1.64 as CriticalNightScoutMod,
    };
    if (night_scout_accuracy >= 3) return {
        shell_power_mod: 9 as ShellPowerNightScoutMod,
        accuracy_mod: 1.2 as AccuracyNightScoutMod,
        critical_rate_mod: 1.7 as CriticalNightScoutMod,
    }

    throw new Error('夜偵の命中値が不正です');
}