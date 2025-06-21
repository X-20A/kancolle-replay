import { Rand } from "@/effects/random";
import { concat_fleet_ships, Fleet } from "@/models/fleet/Fleet"
import { LBAS } from "@/models/LBAS";
import { EquippedShip, is_player_ship } from "@/models/ship/equipped"
import { EnemyFleet } from "@/types/brands/fleet";
import { JetOnlyLBAS } from "./aerialCombat/jetAssault";
import { Equip } from "@/models/equip/basic";
import { FormationType } from "@/types";
import { match, P } from "ts-pattern";

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
 * 装備倍率を返す    
 * NOTE: wikiでは4,6,3となっているが、それは艦これ改解析前の検証であるらしい
 * NOTE: どちらにせよ、割合撃墜と固定撃墜では帳尻が合う
 * @param equip 
 * @returns 
 */
const calc_equip_type_mod_for_weighted_anti_air = (
    equip: Equip,
): number => {
    switch (equip.aaci_trigger_type) {
        case 'A_HAGUN':
        case 'A_HAFD':
        case 'A_AAFD':
            return 2;
        case 'A_AAGUN':
            return 3;
        case 'A_AIRRADAR':
            return 1.5;
        default:
            return 0;
    }
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
 * 単艦の加重対空値を返す    
 * TODO: たぶん静的に決まるのでsim前に持たせてもいいかも
 */
export function calc_weighted_anti_air(
    ship: EquippedShip,
): number {
    if (is_player_ship(ship)) {
        const X = ship.naked_status.anti_air / 2
            + calc_total_N(ship.equips)
            + (ship.total_equip_improvement_addition.self_anti_air)
            + (0.75 * ship.total_equip_bonus_addition.anti_air);
        // wikiの A を使った処理は2倍である為に必要になるのであって、半値ならfloorでok
        return Math.floor(X);
    } else {
        const X = ship.naked_status.anti_air + calc_total_N(ship.equips);
        return Math.floor(X);
    }
}

/**
 * 加重対空値計算の為の装備倍率を返す
 * @param equip 
 * @returns 
 */
const calc_equip_type_mod_for_fleet_anti_air = (
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
    const equips_fleet_anti_air = ship.equips.reduce((total, equip) => {
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
const calc_formation_mod = (
    formation: FormationType,
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
    formation: FormationType,
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
const calc_prop_shotdown_count_rate = (
    weighted_anti_air: number
): number => {
    return weighted_anti_air / 200;
}

/**
 * 対空射撃を受けた後のLBASを返す
 * @param lbas 
 * @param enemy_fleet 
 * @param rand 
 */
export function calc_anti_air_fired_lbas<T extends LBAS | JetOnlyLBAS>(
    lbas: T,
    enemy_fleet: EnemyFleet,
    formation: FormationType,
    rand: Rand,
): T {
    const defender_ships = extract_defender_ships(enemy_fleet);

    const new_slot_counts = lbas.slot_counts.map((slot_count, index) => {
        if (slot_count === 0) return slot_count;

        const defender_ship =
            defender_ships[Math.floor(rand.next() * defender_ships.length)];

        const weighted_anti_air = calc_weighted_anti_air(defender_ship);

        /** 割合撃墜数 */
        const prop_shootdown_count = rand.next() < 0.5 // 発動率
            ? Math.floor(calc_prop_shotdown_count_rate(weighted_anti_air) * slot_count)
            : 0;
        
        // NOTE: 基地航空隊に対して対空CIは発動しない https://wikiwiki.jp/kancolle/対空砲火#enemy_AAfire
        /** 固定撃墜数 */
        const flat_shootdown_count = rand.next() < 0.5
            ? Math.floor(weighted_anti_air + calc_fleet_anti_air(enemy_fleet, formation) / 10)
            : 0;

        return slot_count
            - prop_shootdown_count
            - flat_shootdown_count;
    });

    return {
        ...lbas,
        slot_counts: new_slot_counts,
    }
}