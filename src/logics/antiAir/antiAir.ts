import { Rand } from "@/effects/random";
import { concat_fleet_ships, Fleet, SingleFleet } from "@/models/fleet/Fleet"
import { EquippedShip, is_player_ship } from "@/models/ship/equipped"
import { EnemySingleFleet } from "@/types/brands/fleet";
import { Equip, PlaneEquip } from "@/models/equip/basic";
import { SingleFleetFormationType, TStatusComponent } from "@/types";
import { match, P } from "ts-pattern";
import { JetSquadron } from "@/models/LBAS";
import { brandWeightedAntiAir, WeightedAntiAir } from "@/types/brands/other";
import { AntiAirCutinType } from "./cutin/conditions";
import { EquipImprovementAddition } from "@/datas/equip/improvement";
import { calc_fleet_weighted_anti_air } from "./weighted";
import { AACI_DATAS } from "@/datas/aaci";

/// 対空射撃系

/**
 * 艦隊から対空射撃に参加可能な艦を抽出して返す
 * @param fleet 
 * @returns 
 */
const extract_defender_ships = (fleet: Fleet): EquippedShip[] => {
    return concat_fleet_ships(fleet).filter(ship =>
        is_player_ship(ship) || !ship.flags.is_faraway
    );
}

/**
 * 加重対空値計算の為の装備倍率を返す
 * @param equip 
 * @returns 
 */
export const calc_equip_type_mod_for_fleet_anti_air = (
    equip: Equip,
): number => {
    switch (equip.aaci_trigger_type) {
        case 'A_HAGUN':
        case 'A_HAFD':
        case 'A_AAFD':
            return 0.35;
        case 'A_AIRRADAR':
            return 0.4;
        case 'A_TYPE3SHELL':
            return 0.6;
        case 'A_XLGUN':
            return 0.25;
        default:
            return 0.2;
    }
}

/**
 * 単艦の艦隊防空値を返す
 * @param ship 
 */
export function calc_ship_fleet_anti_air(
    ship: EquippedShip,
): number {
    const equips_fleet_anti_air = ship.equip_builts.reduce((total, equip_built) => {
        const equip = equip_built.equip;
        if (!equip) return total;

        return total + calc_equip_type_mod_for_fleet_anti_air(equip);
    }, 0);

    if (!is_player_ship(ship)) return equips_fleet_anti_air;

    return equips_fleet_anti_air
        + ship.total_equip_improvement_addition.fleet_anti_air
        + ship.total_equip_bonus_addition.anti_air;
}

/**
 * 艦隊防空値計算の為の陣形補正を返す
 * @param formation 
 * @returns 
 */
export const calc_formation_mod = (
    formation: SingleFleetFormationType,
): number => {
    return match(formation)
        .with(P.union('LineAhead', 'Echelon', 'LineAbreast'), () => 1)
        .with('Vanguard', () => 1.1)
        .with('DoubleLine', () => 1.2)
        .with('Diamond', () => 1.6)
        .exhaustive();
}

/**
 * 艦隊の艦隊防空値を返す
 * @param ship 
 */
export function calc_fleet_anti_air(
    fleet: Fleet,
    formation: SingleFleetFormationType,
): number {
    const ships_total = concat_fleet_ships(fleet).reduce((total, ship) => {
        return total
            + calc_ship_fleet_anti_air(ship);
    }, 0);

    return Math.floor(calc_formation_mod(formation) * ships_total) * (2 / 1.3);
}

/**
 * 艦の割合撃墜率を返す
 */
export function calc_prop_shotdown_rate(
    weighted_anti_air: WeightedAntiAir,
    target_unit: PlaneEquip,
): number {
    return weighted_anti_air * target_unit.anti_air_resist_ship / 200;
}

/**
 * 艦の割合撃墜数を返す
 */
export function calc_prop_shootdown_count(
    weighted_anti_air: WeightedAntiAir,
    target_unit: PlaneEquip,
    target_slot_count: number,
): number {
    const prop_shotdown_rate = calc_prop_shotdown_rate(
        weighted_anti_air,
        target_unit,
    )
    console.log('prop_rate: ', prop_shotdown_rate);
    return Math.floor(prop_shotdown_rate * target_slot_count);
}

/**
 * 艦隊の固定撃墜数を返す
 * @param weighted_anti_air 
 * @param target_unit 
 */
export function calc_fixed_shotdown_count(
    defender_ship: EquippedShip,
    aaci_type: AntiAirCutinType | 'Misfire',
    defender_fleet: SingleFleet,
    formation: SingleFleetFormationType,
    target_unit: PlaneEquip,
): number {
    return Math.floor(
        (
            Math.floor(defender_ship.weighted_anti_air * target_unit.anti_air_resist_ship)
            + Math.floor(calc_fleet_weighted_anti_air(defender_fleet, formation) * target_unit.anti_air_resist_fleet)
        ) * (aaci_type === 'Misfire' ? 1 : AACI_DATAS[aaci_type].mod) / 5
    )
}

/**
 * 最低保証値を返す
 * @param aaci_type 
 * @param unit 
 */
export function calc_guaranteed(
    aaci_type: AntiAirCutinType,
    unit: PlaneEquip,
): number {

}

/**
 * 対空射撃を受けた後のLBASを返す
 * @param jet_only_squadrons 
 * @param enemy_fleet 
 * @param rand 
 */
export function calc_anti_air_fired_squadrons(
    jet_only_squadrons: JetSquadron[],
    enemy_fleet: EnemySingleFleet,
    rand: Rand,
): JetSquadron[] {
    const defender_ships = extract_defender_ships(enemy_fleet);

    return jet_only_squadrons.map((squadron) => {
        if (squadron.slot_count === 0) return squadron;

        const defender_ship =
            defender_ships[Math.floor(rand.next() * defender_ships.length)];

        /** 割合撃墜数 */
        const prop_shootdown_count = rand.next() < 0.5 // 発動率
            ? calc_prop_shootdown_count(defender_ship.weighted_anti_air, squadron.unit, squadron.slot_count)
            : 0;

        // NOTE: 基地航空隊に対して対空CIは発動しない https://wikiwiki.jp/kancolle/対空砲火#enemy_AAfire
        /** 固定撃墜数 */
        const flat_shootdown_count = rand.next() < 0.5
            ? calc_fixed_shotdown_count(enemy_fleet, defender_ship.weighted_anti_air, squadron.unit)
            : 0;

        const new_slot_count = squadron.slot_count
            - prop_shootdown_count
            - flat_shootdown_count;

        return {
            ...squadron,
            slot_count: new_slot_count,
        }
    });
}