import { calc_resupplied_fleet } from "@/logics/maritimeResupply";
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
): {
    post_maritime_resupply_phase_player_fleet: PlayerFleet,
    post_maritime_resupply_phase_naval_base: NavalBase,
} {
    const {
        supplied_fleet,
        billed_naval_base,
    } = calc_resupplied_fleet(
        player_fleet,
        naval_base,
    );

    return {
        post_maritime_resupply_phase_player_fleet: supplied_fleet,
        post_maritime_resupply_phase_naval_base: billed_naval_base,
    };
}