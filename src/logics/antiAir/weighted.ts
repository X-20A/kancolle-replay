import { EquipImprovementAddition } from "@/datas/equip/improvement";
import { AbyssalEquip, Equip, is_player_equip, PlayerEquip } from "@/models/equip/basic";
import { FormationType, SingleFleetFormationType, TStatusComponent } from "@/types";
import { brandWeightedAntiAir, WeightedAntiAir } from "@/types/brands/other";
import { match } from "ts-pattern";
import { calc_equip_type_mod_for_fleet_anti_air, calc_formation_mod } from ".";
import { AbyssalFleet, PlayerSingleFleet } from "@/models/fleet/Fleet";
import { is_sunk } from "@/models/ship/equipped";
import { is_equip_exsist } from "@/models/ship/EquipSlot";

/**
 * 装備倍率を返す    
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

/** N: 装備倍率 ×(装備対空値) の合計を返す */
const calc_total_N = (
    equips: Equip[],
): number => {
    return equips.reduce((total, equip) => {
        return total
            + calc_equip_type_mod_for_weighted_anti_air(equip) * equip.natural_addition.anti_air
    }, 0);
}

/**
 * プレイヤー艦単艦の加重対空値を返す    
 */
export function calc_player_weighted_anti_air(
    equips: PlayerEquip[],
    naked_status: TStatusComponent,
    total_equip_bonus_addition: TStatusComponent,
    total_equip_improvement_addition: EquipImprovementAddition,
): WeightedAntiAir {
    const X = naked_status.anti_air / 2
        + calc_total_N(equips)
        + (total_equip_improvement_addition.self_anti_air)
        + (0.75 * total_equip_bonus_addition.anti_air);
    // wikiの A を使った処理は2倍である為に必要になるのであって、半値ならfloorでok
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
    return equip.natural_addition.anti_air * calc_equip_type_mod_for_fleet_anti_air(equip);
}

/**
 * プレイヤー側の艦隊加重対空値を返す(艦の加重対空値合計に非ず)
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
                    + (is_player_equip(equip) ? equip.improvement_addition.fleet_anti_air : 0)
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
        const ship = unit.ship;
        if (
            is_sunk(ship) ||
            ship.flags.is_faraway
        ) return total;

        return Math.floor(
            total + ship.equip_slots.reduce((total, equip_slot) => {
                const equip = equip_slot.equip;
                if (!equip) return total;

                return total + calc_M(equip);
            }, 0)
        );
    }, 0);

    return Math.floor(ship_total * calc_formation_mod(actual_formation));
}