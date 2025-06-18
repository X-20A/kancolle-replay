import { Rand } from "@/effects/random";
import { calc_detection_phase, calc_engagement_phase, calc_maritime_resupply_phase, calc_smoke_screen_phase } from "./phase";
import { EnemyFleet, OwnFleet, OwnFleetState } from "@/types/brands/fleet";
import { Node } from "@/models/Node";
import { LBAS } from "@/models/LBAS";
import { FleetState } from "@/models/fleet/fleetState";

/// 1つのNodeにおいて実行する処理

export type UserSettings = {
    /** 煙幕発動Node 0オリジン */
    smoke_screen_trigger_node_index: number[],
}

export function sim_execute(
    node: Node,
    settings: UserSettings,
    own_fleet: OwnFleet,
    own_fleet_state: OwnFleetState,
    enemy_fleet: EnemyFleet,
    enemy_fleet_state: FleetState,
    lbases: LBAS[],
    rand: Rand,
) { // NOTE: 更新していくデータをcontextにまとめてpipeすると見やすくなるかもだけど、コピーコスト嵩みそう

    // NOTE: この関数内でFleetやLBASはいわば定数で、参照するだけで再生成もしない
    // NOTE: 変更は対応するStateに反映していく

    const post_maritime_resupply_phase_own_fleet_state = calc_maritime_resupply_phase(
        own_fleet,
        own_fleet_state,
        node,
    )

    const detection_phase_result = calc_detection_phase(
        node,
        own_fleet,
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