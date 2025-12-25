import { is_random_successful, RandGenerator } from "@/effects/random";
import { analyze_fleet_detection, calc_detection_success_rate, calc_enemy_fighter_count, calc_shotdowned_recon_fleet } from "@/logics/detection";
import { AbyssalFleet, PlayerFleet } from "@/models/fleet/Fleet";
import { Node } from "@/models/Node";

/**
 * 索敵フェイズ後のNodeと艦隊を返す
 * @param node 
 * @param player_fleet 
 * @param abyssal_fleet 
 * @param rand 
 * @returns 
 */
export function calc_detection_phase<T extends PlayerFleet>(
    node: Node,
    player_fleet: T,
    abyssal_fleet: AbyssalFleet,
    rand: RandGenerator,
): {
    post_detection_phase_node: Node,
    post_detection_phase_player_fleet: T,
} {
    const main_fleet_detect_status = analyze_fleet_detection(player_fleet);
    const success_rate =
        calc_detection_success_rate(main_fleet_detect_status.detection_power);

    const is_detection_success =
        is_random_successful(success_rate, rand.next());

    const post_detection_phase_node = {
        ...node,
        is_detection_success: is_detection_success,
    }

    const total_enemy_fighter_count = calc_enemy_fighter_count(abyssal_fleet)

    const post_detection_phase_player_fleet = calc_shotdowned_recon_fleet(
        player_fleet,
        main_fleet_detect_status.recon_power,
        total_enemy_fighter_count,
        rand,
    );

    return {
        post_detection_phase_node,
        post_detection_phase_player_fleet,
    }
}