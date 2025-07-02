import { Rand } from "@/effects/random";
import { AbyssalFleet, AbyssalSingleFleet, concat_fleet_ships, Fleet, PlayerFleet } from "@/models/fleet/Fleet"
import { AbyssalEquippedShip, EquippedShip, is_player_ship, PlayerEquippedShip } from "@/models/ship/equipped"
import { Equip } from "@/models/equip/basic";
import { SingleFleetFormationType } from "@/types";
import { match, P } from "ts-pattern";
import { JetSquadron } from "@/models/LBAS";
import { calc_enemy_defence_guaranteed } from "./guaranteed";
import { calc_prop_shootdown_count } from "./prop";
import { calc_abyssal_fixed_shootdown_count, calc_player_fixed_shootdown_count } from "./fixed";

/// 対空射撃系

function extract_defender_ships(fleet: PlayerFleet): PlayerEquippedShip[];
function extract_defender_ships(fleet: AbyssalFleet): AbyssalEquippedShip[];
/**
 * 艦隊から対空射撃に参加可能な艦を抽出して返す
 * @param fleet 
 * @returns 
 */
function extract_defender_ships(fleet: Fleet): EquippedShip[] {
    return concat_fleet_ships(fleet).filter(ship =>
        // NOTE: 潜水艦も迎撃艦として選ばれる
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
    return match(equip.aaci_trigger_type)
        .with('A_HAGUN', 'A_HAFD', 'A_AAFD', () => 0.35)
        .with('A_AIRRADAR', () => 0.4)
        .with('A_TYPE3SHELL', () => 0.6)
        .with('A_XLGUN', () => 0.25)
        .with(P.union('NONE', 'A_AAGUN', 'A_GUN', 'A_MAINGUNL'), () => 0.2)
        .exhaustive();
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
 * 敵通常艦隊の対空射撃を受けた後のLBASを返す
 * @param jet_only_squadrons 
 * @param enemy_fleet 
 * @param rand 
 */
export function calc_anti_air_fired_squadrons(
    jet_only_squadrons: JetSquadron[],
    enemy_fleet: AbyssalSingleFleet,
    formation: SingleFleetFormationType,
    rand: Rand,
): JetSquadron[] {
    const defender_ships = extract_defender_ships(enemy_fleet);
    // NOTE: 基地航空隊に対して対空CIは発動しない
    const triggered_aaci = 'Misfire';

    return jet_only_squadrons.map((squadron) => {
        if (squadron.slot_count === 0) return squadron;

        const defender_ship =
            defender_ships[Math.floor(rand.next() * defender_ships.length)];

        /** 割合撃墜数 */
        const prop_shootdown_count = rand.next() < 0.5
            ? calc_prop_shootdown_count(defender_ship.weighted_anti_air, squadron.unit, squadron.slot_count)
            : 0;

        // NOTE: 基地航空隊に対して対空CIは発動しない https://wikiwiki.jp/kancolle/対空砲火#enemy_AAfire
        /** 固定撃墜数 */
        const flat_shootdown_count = rand.next() < 0.5
            ? calc_abyssal_fixed_shootdown_count(defender_ship, triggered_aaci, enemy_fleet, formation, squadron.unit)
            : 0;

        /** 最低保証 */
        const guaranteed = calc_enemy_defence_guaranteed(triggered_aaci, squadron.unit);

        const new_slot_count = squadron.slot_count
            - prop_shootdown_count
            - flat_shootdown_count
            - guaranteed;

        return {
            ...squadron,
            slot_count: new_slot_count,
        }
    });
}