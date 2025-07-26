import { RandGenerator } from "@/effects/random";
import { AbyssalFleet, AbyssalSingleFleet, concat_fleet_ships, concat_fleet_units, Fleet,  PlayerFleet } from "@/models/fleet/Fleet"
import { EquippedShip, is_player_equipped_ship } from "@/models/ship/equipped"
import { Equip } from "@/models/equip/basic";
import { FormationType, SingleFleetFormationType } from "@/types";
import { match } from "ts-pattern";
import { LbasJetSquadron, LbasSquadron, ShipJetSquadron } from "@/models/LBAS";
import { calc_enemy_defence_guaranteed } from "./guaranteed";
import { calc_prop_shootdown_count } from "./prop";
import { calc_abyssal_fixed_shootdown_count } from "./fixed";
import { Node } from "@/models/Node";
import { AbyssalFleetUnit, FleetUnit, PlayerFleetUnit } from "@/models/fleet/FleetUnit";
import { AntiAirCutinType } from "./cutin/conditions";

/// 対空射撃系

/**
 * 艦隊から対空射撃に参加可能な艦を抽出して返す
 * @param fleet 
 * @returns 
 */
function extract_defender_ships(fleet: PlayerFleet): PlayerFleetUnit[];
function extract_defender_ships(fleet: AbyssalFleet): AbyssalFleetUnit[];
function extract_defender_ships(fleet: Fleet): FleetUnit[] {
    return concat_fleet_units(fleet).filter(unit =>
        // NOTE: 潜水艦も迎撃艦として選ばれる
        is_player_equipped_ship(unit.ship) || !unit.ship.flags.is_faraway
    );
}

/**
 * 割合撃墜と固定撃墜の為の連合艦隊補正を返す
 * @param fleet_unit 
 * @param node 
 * @returns 
 */
export function calc_combined_fleet_mod(
    fleet_unit: FleetUnit,
    node: Node,
): number {
    if (fleet_unit.fleet_type === 'single') return 1
    if (fleet_unit.fleet_type === 'escort') return 0.48; 
    if (node.type.is_air_raid_only) return 0.72;
    return 0.8;
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
        .with('NONE', 'A_AAGUN', 'A_GUN', 'A_MAINGUNL', () => 0.2)
        .exhaustive();
}

/**
 * 単艦の艦隊防空値を返す
 * @param ship 
 */
export function calc_ship_fleet_anti_air(
    ship: EquippedShip,
): number {
    const equips_fleet_anti_air = ship.equip_slots.reduce((total, equip_built) => {
        const equip = equip_built.equip;
        if (!equip) return total;

        return total + calc_equip_type_mod_for_fleet_anti_air(equip);
    }, 0);

    if (!is_player_equipped_ship(ship)) return equips_fleet_anti_air;

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
    formation: FormationType,
): number => {
    return match(formation)
        .with('LineAhead', 'Echelon', 'LineAbreast', () => 1)
        .with('Vanguard', () => 1.1)
        .with('DoubleLine', () => 1.2)
        .with('Diamond', () => 1.6)
        .with('CruisingFormation_1', () => 1.1)
        .with('CruisingFormation_2', () => 1)
        .with('CruisingFormation_3', () => 1.5)
        .with('CruisingFormation_4', () => 1)
        .exhaustive();
}

/**
 * 艦隊の艦隊防空値を返す
 * @param ship 
 */
export function calc_fleet_anti_air(
    fleet: Fleet,
): number {
    const ships_total = concat_fleet_ships(fleet).reduce((total, ship) => {
        return total
            + calc_ship_fleet_anti_air(ship);
    }, 0);

    return Math.floor(calc_formation_mod(fleet.formation) * ships_total) * (2 / 1.3);
}

/**
 * 防御艦隊の対空射撃を受けた後の航空隊群を返す
 * @param squadrons 
 * @param enemy_fleet 
 * @param rand 
 */
export function calc_anti_air_fired_jet_squadrons<T extends ShipJetSquadron[] | LbasJetSquadron[]>(
    squadrons: T,
    enemy_fleet: AbyssalFleet,
    node: Node,
    triggered_aaci_type: AntiAirCutinType | 'Misfire',
    rand: RandGenerator,
): T {
    const defender_units = extract_defender_ships(enemy_fleet);
    // NOTE: 基地航空隊に対して対空CIは発動しない https://wikiwiki.jp/kancolle/対空砲火#enemy_AAfire
    
    return squadrons.map((squadron) => {
        if (squadron.slot_count <= 0) return squadron;

        const defender_unit =
            defender_units[Math.floor(rand.next() * defender_units.length)];

        /** 割合撃墜数 */
        const prop_shootdown_count = rand.next() < 0.5
            ? calc_prop_shootdown_count(defender_unit.ship.weighted_anti_air, squadron.equip, squadron.slot_count)
            : 0;

        /** 固定撃墜数 */
        const flat_shootdown_count = rand.next() < 0.5
            ? calc_abyssal_fixed_shootdown_count(defender_unit, triggered_aaci_type, enemy_fleet, squadron.equip, node)
            : 0;

        /** 最低保証 */
        const guaranteed = calc_enemy_defence_guaranteed(triggered_aaci_type, squadron.equip);

        const new_slot_count = squadron.slot_count
            - prop_shootdown_count
            - flat_shootdown_count
            - guaranteed;

        return {
            ...squadron,
            slot_count: new_slot_count,
        }
    }) as T;
}

/**
 * 
 * @param squadrons 
 * @param enemy_fleet 
 * @param node 
 * @param rand 
 * @returns 
 */
export function calc_anti_air_fired_squadrons<T extends ShipJetSquadron[] | LbasJetSquadron[]>(
    squadrons: T,
    enemy_fleet: AbyssalFleet,
    node: Node,
    rand: RandGenerator,
): T {
    const defender_units = extract_defender_ships(enemy_fleet);
    // NOTE: 基地航空隊に対して対空CIは発動しない https://wikiwiki.jp/kancolle/対空砲火#enemy_AAfire
    const triggered_aaci = 'Misfire';

    return squadrons.map((squadron) => {
        if (squadron.slot_count <= 0) return squadron;

        const defender_unit =
            defender_units[Math.floor(rand.next() * defender_units.length)];

        /** 割合撃墜数 */
        const prop_shootdown_count = rand.next() < 0.5
            ? calc_prop_shootdown_count(defender_unit.ship.weighted_anti_air, squadron.equip, squadron.slot_count)
            : 0;

        /** 固定撃墜数 */
        const flat_shootdown_count = rand.next() < 0.5
            ? calc_abyssal_fixed_shootdown_count(defender_unit, triggered_aaci, enemy_fleet, squadron.equip, node)
            : 0;

        /** 最低保証 */
        const guaranteed = calc_enemy_defence_guaranteed(triggered_aaci, squadron.equip);

        const new_slot_count = squadron.slot_count
            - prop_shootdown_count
            - flat_shootdown_count
            - guaranteed;

        return {
            ...squadron,
            slot_count: new_slot_count,
        }
    }) as T;
}