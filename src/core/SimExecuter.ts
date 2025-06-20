import { Rand } from "@/effects/random";
import { calc_detection_phase, calc_engagement_phase, calc_maritime_resupply_phase, calc_smoke_screen_phase } from "./phase";
import { EnemyFleet, OwnFleet, OwnFleetState } from "@/types/brands/fleet";
import { Node } from "@/models/Node";
import { LBAS } from "@/models/LBAS";

/// 1つのNodeにおいて実行する処理

export type UserSettings = {
    /** 煙幕発動Node 0オリジン */
    smoke_screen_trigger_node_index: number[],
}

export function sim_execute(
    node: Node,
    settings: UserSettings,
    own_fleet: OwnFleet,
    enemy_fleet: EnemyFleet,
    lbases: LBAS[],
    rand: Rand,
) { // NOTE: 更新していくデータをcontextにまとめてpipeすると見やすくなるかもだけど、コピーコスト嵩みそう
    const post_maritime_resupply_phase_own_fleet = calc_maritime_resupply_phase(
        own_fleet,
        node,
    );

    const detection_phase_result = calc_detection_phase(
        node,
        post_maritime_resupply_phase_own_fleet,
        enemy_fleet,
        rand,
    );
    const {
        post_detection_phase_node,
        post_detection_phase_own_fleet,
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
        post_smoke_screen_phase_own_fleet,
    } = smoke_screen_phase_result;

}