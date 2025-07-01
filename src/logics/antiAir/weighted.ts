import { EquipImprovementAddition } from "@/datas/equip/improvement";
import { Equip, is_player_equip } from "@/models/equip/basic";
import { Fleet } from "@/models/fleet/Fleet";
import { FormationType, SingleFleetFormationType, TStatusComponent } from "@/types";
import { brandWeightedAntiAir, WeightedAntiAir } from "@/types/brands/other";
import { match } from "ts-pattern";
import { calc_equip_type_mod_for_fleet_anti_air, calc_formation_mod } from "./antiAir";
import { EnemyFleet, OwnFleet } from "@/types/brands/fleet";

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
    equips: Equip[],
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
export function calc_abyssal_weighted_anti_air(
    equips: Equip[],
    naked_status: TStatusComponent,
): WeightedAntiAir {
    const X = naked_status.anti_air + calc_total_N(equips);
    return brandWeightedAntiAir(Math.floor(X));
}

/**
 * プレイヤー側の艦隊加重対空値を返す(艦の加重対空値合計に非ず)
 * @param defender_fleet 
 */
export function calc_own_fleet_weighted_anti_air(
    defender_fleet: OwnFleet,
    formation: SingleFleetFormationType,
): number {
    const ship_total = defender_fleet.main_fleet_ships.reduce((total, ship) => {
        return Math.floor(
            total + ship.equip_builts.reduce((total, equip_built) => {
                const equip = equip_built.equip;
                if (!equip) return total;

                return total + (
                    equip.natural_addition.anti_air * calc_equip_type_mod_for_fleet_anti_air(equip)
                    + (is_player_equip(equip) ? equip.improvement_addition.fleet_anti_air : 0)
                );
            }, 0)
        );
    }, 0);
    
    return Math.floor(ship_total * calc_formation_mod(formation)) / 1.3
}