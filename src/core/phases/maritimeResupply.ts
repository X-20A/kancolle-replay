import { calc_maritime_resupply_locations, calc_supply_ratio } from "@/logics/maritimeResupply";
import { PlayerFleet } from "@/models/fleet/Fleet";
import { NavalBase } from "@/models/NavalBase";
import { Node } from "@/models/Node";

/**
 * 洋上補給フェイズ    
 * NOTE: おにぎり系はひとまず無視
 * NOTE: 残燃料・弾薬条件は無視してボス前自動発動のみ
 * @param player_fleet 
 * @param node 
 * @returns 
 */
export function calc_maritime_resupply_phase(
    player_fleet: PlayerFleet,
    naval_base: NavalBase,
    node: Node,
): {
    post_maritime_resupply_phase_player_fleet: PlayerFleet,
    post_maritime_resupply_phase_naval_base: NavalBase,
} {
    if (!node.type.is_boss) return {
        post_maritime_resupply_phase_player_fleet: player_fleet,
        post_maritime_resupply_phase_naval_base: naval_base,
    };

    const maritime_resupply_locations =
        calc_maritime_resupply_locations(player_fleet);
    if (!maritime_resupply_locations.length) return {
        post_maritime_resupply_phase_player_fleet: player_fleet,
        post_maritime_resupply_phase_naval_base: naval_base,
    };

    const supply_ratio = calc_supply_ratio(
        player_fleet,
        maritime_resupply_locations.length,
    );

    const {
        supplied_fleet: post_maritime_resupply_phase_player_fleet,
        billed_naval_base: post_maritime_resupply_phase_naval_base,
    } = calc_supplied_fleet(
        player_fleet,
        supply_ratio,
        maritime_resupply_locations,
        naval_base,
    );

    return {
        post_maritime_resupply_phase_player_fleet,
        post_maritime_resupply_phase_naval_base
    }
}