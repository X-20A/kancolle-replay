import { Rand } from "@/effects/random";
import { calc_detection_phase, calc_engagement_phase, calc_maritime_resupply_phase, calc_smoke_screen_phase } from "../phases/phase";
import { Node } from "@/models/Node";
import { LBAS } from "@/models/LBAS";
import { AbyssalSingleFleet, PlayerSingleFleet } from "@/models/fleet/Fleet";

/**
 * 戦闘の流れの種類
	通常-通常
	連合(機動|輸送)-通常
	連合(水上)-通常
	通常-連合
	連合(機動|輸送)-連合
	連合(水上)-連合
	航空戦
	空襲戦
 */

/// 通常 vs 通常

export type UserSettings = {
    /** 煙幕発動Node 0オリジン */
    smoke_screen_trigger_node_index: number[],
}

export function sim_execute(
    node: Node,
    settings: UserSettings,
    player_fleet: PlayerSingleFleet,
    enemy_fleet: AbyssalSingleFleet,
    lbases: LBAS[],
    rand: Rand,
) { // NOTE: 更新していくデータをcontextにまとめてpipeすると見やすくなるかもだけど、コピーコスト嵩みそう
    // ひとまずそれぞれの艦隊に陣形は設定されているという前提で
    
    const post_maritime_resupply_phase_player_fleet = calc_maritime_resupply_phase(
        player_fleet,
        node,
    );

    const detection_phase_result = calc_detection_phase(
        node,
        post_maritime_resupply_phase_player_fleet,
        enemy_fleet,
        rand,
    );
    const {
        post_detection_phase_node,
        post_detection_phase_player_fleet: post_detection_phase_own_fleet,
    } = detection_phase_result;

    const post_engagement_phase_node = calc_engagement_phase(
        post_detection_phase_node,
        post_detection_phase_own_fleet,
        rand,
    );

    const smoke_screen_phase_result = calc_smoke_screen_phase(
        settings,
        post_engagement_phase_node,
        post_detection_phase_own_fleet,
        rand,
    );
    const {
        post_smoke_screen_phase_node,
        post_smoke_screen_phase_player_fleet: post_smoke_screen_phase_own_fleet,
    } = smoke_screen_phase_result;

}