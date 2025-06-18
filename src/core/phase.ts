import { Rand } from "@/effects/random";
import { analyze_fleet_detection, calc_detection_success_rate, calc_enemy_fighter_count, calc_shotdowned_recon_fleet } from "@/logics/detection";
import { UserSettings } from "./SimExecuter";
import { calc_smoke_screen_activate_rate, calc_triggered_smoke_type } from "@/logics/smokeScreen";
import { EnemyFleet, OwnFleet, OwnFleetState } from "@/types/brands/fleet";
import { Node } from "@/models/Node";
import { calc_engagement } from "@/logics/engagemenet";
import { calc_maritime_resupply_count, calc_supplied_fleet_state, calc_supply_ratio } from "@/logics/maritimeResupply";

/// 各フェイズを制御する
/// sim_execute と logics を繋ぐ
/// 新しい構造体へのマージはここでやって、logics とは必要な値だけやりとりする

/**
 * 海上補給フェイズ    
 * NOTE: おにぎり系はひとまず無視
 * NOTE: 残燃料・弾薬条件は無視してボス前自動発動のみ
 * @param own_fleet 
 * @param node 
 * @returns 
 */
export function calc_maritime_resupply_phase(
    own_fleet: OwnFleet,
    own_fleet_state: OwnFleetState,
    node: Node,
): OwnFleetState {
    if (!node.type.is_boss) return own_fleet_state;

    const maritime_resupply_locations = calc_maritime_resupply_count(own_fleet, own_fleet_state);
    if (!maritime_resupply_locations.length) return own_fleet_state;

    const supply_ratio = calc_supply_ratio(
        own_fleet,
        maritime_resupply_locations.length,
    );

    return calc_supplied_fleet_state(
        own_fleet_state,
        supply_ratio,
        maritime_resupply_locations,
    );
}

type DetectionPhaseResult = {
    post_detection_phase_node: Node,
    post_detection_phase_own_fleet: OwnFleet,
}

/**
 * 索敵フェイズ後のNodeとOwnFleetを返す
 * @param node 
 * @param our_fleet 
 * @param enemy_fleet 
 * @param rand 
 * @returns 
 */
export function calc_detection_phase(
    node: Node,
    our_fleet: OwnFleet,
    enemy_fleet: EnemyFleet,
    rand: Rand,
): DetectionPhaseResult {
    const main_fleet_detect_status = analyze_fleet_detection(our_fleet);
    const success_rate = calc_detection_success_rate(main_fleet_detect_status.detection_power);

    const is_detection_success = rand.next() > success_rate;

    const post_detection_phase_node = {
        ...node,
        is_detection_success,
    }

    const total_enemy_fighter_count = calc_enemy_fighter_count(enemy_fleet)

    const post_detection_phase_own_fleet = calc_shotdowned_recon_fleet(
        our_fleet,
        main_fleet_detect_status.recon_power,
        total_enemy_fighter_count,
        rand,
    );

    return {
        post_detection_phase_node,
        post_detection_phase_own_fleet,
    }
}

/**
 * 交戦形態を付与したNodeを返す
 * @param node 
 * @param own_fleet 
 * @param rand 
 * @returns 
 */
export function calc_engagement_phase(
    node: Node,
    own_fleet: OwnFleet,
    rand: Rand,
): Node {
    const engagement_type = calc_engagement(own_fleet, rand);

    return {
        ...node,
        engagement_type,
    }
}

type SmokeScreenPhaseResult = {
    post_smoke_screen_phase_own_fleet: OwnFleet,
    post_smoke_screen_phase_node: Node,
}

/**
 * 煙幕フェイズ後のNodeとFleetを返す
 * @param settings 
 * @param node 
 * @param own_fleet 
 * @param rand 
 * @returns 
 */
export function calc_smoke_screen_phase(
    settings: UserSettings,
    node: Node,
    own_fleet: OwnFleet,
    rand: Rand,
): SmokeScreenPhaseResult {
    if (
        !settings.smoke_screen_trigger_node_index.includes(node.index)
        || !own_fleet.unused_smoke
    ) return {
        post_smoke_screen_phase_own_fleet: own_fleet,
        post_smoke_screen_phase_node: node,
    };

    const smoke_rates = calc_smoke_screen_activate_rate(own_fleet);

    const triggered_smoke_type = calc_triggered_smoke_type(smoke_rates, rand);

    if (triggered_smoke_type === 'Misfire') return {
        post_smoke_screen_phase_own_fleet: own_fleet,
        post_smoke_screen_phase_node: node,
    };

    const post_smoke_screen_phase_node = {
        ...node,
        triggered_smoke_type: triggered_smoke_type,
    }

    const post_smoke_screen_phase_own_fleet = {
        ...own_fleet,
        unused_smoke: false,
    }

    return {
        post_smoke_screen_phase_node,
        post_smoke_screen_phase_own_fleet,
    }
}