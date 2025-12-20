import { RandGenerator } from "@/effects/random";
import { AbyssalFleet, concat_fleet_ships, concat_fleet_units, Fleet,  PlayerFleet } from "@/models/fleet/Fleet"
import { is_player_equipped_ship, PlayerEquippedShip } from "@/models/ship/equipped"
import { Equip, includes_equip_type, is_anti_air_radar } from "@/models/equip/basic";
import { FormationType } from "@/types";
import { match } from "ts-pattern";
import { LbasJetSquadron, ShipJetSquadron } from "@/models/LBAS";
import { calc_enemy_defence_guaranteed } from "./guaranteed";
import { calc_prop_shootdown_count } from "./prop";
import { calc_abyssal_fixed_shootdown_count } from "./fixed";
import { Node } from "@/models/Node";
import { AbyssalFleetUnit, FleetUnit, PlayerFleetUnit } from "@/models/fleet/FleetUnit";
import { AntiAirCutinType } from "./cutin/conditions";
import { is_equip_exsist } from "@/models/ship/EquipSlot";
import { AntiAirFormationMod } from "../formation";

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
    if (fleet_unit.affiliation_type === 'single') return 1
    if (fleet_unit.affiliation_type === 'escort') return 0.48; 
    if (node.type.is_air_raid_only) return 0.72;
    return 0.8;
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
            defender_units[Math.floor(rand.next() * defender_units.length)]!;

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
            defender_units[Math.floor(rand.next() * defender_units.length)]!;

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