import { AbyssalEquip, Equip, is_player_equip, PlayerEquip } from "@/models/equip/basic";
import { FormationType, SingleFleetFormationType, TStatusComponent } from "@/types";
import { brandWeightedAntiAir, WeightedAntiAir } from "@/types/brands/other";
import { match } from "ts-pattern";
import { calc_equip_type_mod_for_fleet_anti_air, calc_formation_mod } from ".";
import { AbyssalFleet, PlayerSingleFleet } from "@/models/fleet/Fleet";
import { is_sunk } from "@/models/ship/equipped";
import { is_equip_exsist, is_non_empty_abyssal_equip_slot } from "@/models/ship/EquipSlot";

/**
 * 装備倍率を返す    
 * https://en.kancollewiki.net/Aerial_Combat#Adjusted_Anti-Air > Mod Equip-Ship    
 * NOTE: wikiでは4,6,3となっているが、それは艦これ改解析前の検証であるらしい    
 * NOTE: どちらにせよ、割合撃墜と固定撃墜では帳尻が合う    
 * @param equip 
 * @returns 
 */
const calc_equip_type_mod_for_weighted_anti_air = (
    equip: Equip,
): number => {
    return match(equip.aaci_trigger_type)
        .with('A_HAGUN', 'A_HAFD', 'A_AAFD', () => 2)
        .with('A_AAGUN', () => 3)
        .with('A_AIRRADAR', () => 1.5)
        .with('NONE', 'A_MAINGUNL', 'A_TYPE3SHELL', 'A_GUN', 'A_XLGUN', () => 0,
        )
        .exhaustive();
}

/**
 * N: 装備倍率 ×(装備対空値) の合計を返す
 */
const calc_total_N = (
    equips: Equip[],
): number => {
    return equips.reduce((total, equip) => {
        return total
            + calc_equip_type_mod_for_weighted_anti_air(equip) * equip.natural_addition.anti_air
    }, 0);
}

/**
 * 改修係数(加重対空) を返す
 * @param equip 
 * @returns 
 */
const calc_improved_coeffient = (
    equip: Equip,
): number => {
    // NOTE: 対空機銃について対空値8を閾値とする一般的な分類は無い
    if (!is_player_equip(equip)) return 0;
    const {
        aaci_trigger_type,
        natural_addition,
    } = equip;
    const { anti_air } = natural_addition;

    if (aaci_trigger_type === 'A_HAGUN') {
        return 1;
    }
    if (aaci_trigger_type === 'A_HAFD') {
        return 1.5;
    }
    if (aaci_trigger_type === 'A_AAGUN') {
        return anti_air >= 8
            ? 3
            : 2;
    }
    if (aaci_trigger_type === 'A_AAFD') {
        return anti_air >= 8
            ? 1.5
            : 1;
    }

    return 0;
}

/**
 * 改修係数(加重対空) ×√(★改修値)}の合計 を返す
 * @param equips 
 * @returns 
 */
const calc_total_O = (
    equips: PlayerEquip[],
): number => {
    return equips.reduce((total, equip) => {
        return total + (
            calc_improved_coeffient(equip) * Math.sqrt(equip.improvement_lv)
        );
    }, 0);
}

/**
 * プレイヤー艦単艦の加重対空値を返す    
 * 艦の素対空値
 * + 各装備の{装備倍率 ×(装備対空値): N
 * + 改修係数(加重対空) ×√(★改修値)}の合計: O
 * + 0.75 ×各装備の装備ボーナス(対空)の合計 (端数切捨て一切無し)
 */
export function calc_player_weighted_anti_air(
    equips: PlayerEquip[],
    naked_status: TStatusComponent,
    total_equip_bonus_addition: TStatusComponent,
): WeightedAntiAir {
    console.log('total_N: ', calc_total_N(equips));
    console.log('total_O: ', calc_total_O(equips));
    const X = naked_status.anti_air / 2
        + calc_total_N(equips)
        + calc_total_O(equips)
        + (0.75 * total_equip_bonus_addition.anti_air);
    // 日wikiの A を使った処理(A ×[X /A])は2倍である為に必要になるのであって、半値ならfloorでok
    return brandWeightedAntiAir(Math.floor(X));
}

/**
 * 深海艦単艦の加重対空値を返す    
 */
export function calc_abyssal_ship_weighted_anti_air(
    equips: AbyssalEquip[],
    naked_status: TStatusComponent,
): WeightedAntiAir {
    const equip_total_anti_air = equips.reduce((total, equip) => {
        return total + equip.natural_addition.anti_air;
    }, 0);

    const X = Math.sqrt(naked_status.anti_air + equip_total_anti_air)
        + calc_total_N(equips);

    return brandWeightedAntiAir(Math.floor(X));
}

/**
 * M: AA_Equip * Mod(Equip-Fleet) を返す
 */
const calc_M = (
    equip: Equip,
): number => {
    return equip.natural_addition.anti_air
        * calc_equip_type_mod_for_fleet_anti_air(equip);
}

/**
 * 装備倍率(艦隊防空) を返す
 * @param equip 
 * @returns 
 */
const calc_mod_equip_fleet = (
    equip: Equip,
): number => {
    return match(equip.aaci_trigger_type)
        .with('A_HAGUN', 'A_HAFD', 'A_AAFD', () => 0.35)
        .with('A_AIRRADAR', () => 0.4)
        .with('A_TYPE3SHELL', () => 0.6)
        .with('A_XLGUN', () => 0.25)
        .with('A_AAGUN', 'A_GUN', 'A_MAINGUNL', 'NONE', () => 0.2)
        .exhaustive();
}

/**
 * プレイヤー側の艦隊加重対空値を返す(艦の加重対空値合計に非ず)    
 * https://en.kancollewiki.net/Aerial_Combat#Adjusted_Anti-Air > Allied Fleet> Fleet Adj AA
 * @param defender_fleet 
 */
export function calc_player_fleet_weighted_anti_air(
    defender_fleet: PlayerSingleFleet,
    formation: SingleFleetFormationType,
): number {
    const ship_total = defender_fleet.main_fleet_units.reduce((total, unit) => {
        const { ship } = unit;
        if (
            is_sunk(ship) ||
            ship.state.is_retreated
        ) return total;

        return Math.floor(
            total + ship.equip_slots.reduce((total, slot) => {
                const { equip } = slot;
                if (!is_equip_exsist(equip)) return total;

                return total + (
                    calc_M(equip)
                    + equip.natural_addition.anti_air * calc_mod_equip_fleet(equip)
                );
            }, 0)
        );
    }, 0);
    
    return Math.floor(ship_total * calc_formation_mod(formation)) / 1.3
}

/**
 * 深海側の艦隊加重対空値を返す(艦の加重対空値合計に非ず)
 * @param defender_fleet 
 */
export function calc_abyssal_fleet_weighted_anti_air(
    defender_fleet: AbyssalFleet,
    formation?: FormationType, // テスト用。コードベースではAbyssalFleetから取るので必要ない
): number {
    const actual_formation = formation ?? defender_fleet.formation;
    const ship_total = defender_fleet.main_fleet_units.reduce((total, unit) => {
        const { ship } = unit;
        if (
            is_sunk(ship) ||
            ship.flags.is_faraway
        ) return total;

        return Math.floor(
            total + ship.equip_slots.reduce((total, slot) => {
                if (!is_non_empty_abyssal_equip_slot(slot)) return total;

                return total + calc_M(slot.equip);
            }, 0)
        );
    }, 0);

    return Math.floor(ship_total * calc_formation_mod(actual_formation));
}