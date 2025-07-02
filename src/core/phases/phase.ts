import { Rand } from "@/effects/random";
import { analyze_fleet_detection, calc_detection_success_rate, calc_enemy_fighter_count, calc_shotdowned_recon_fleet } from "@/logics/detection";
import { UserSettings } from "../flows/SimExecuter";
import { calc_smoke_screen_activate_rate, calc_triggered_smoke_type } from "@/logics/smokeScreen";
import { Node } from "@/models/Node";
import { calc_engagement } from "@/logics/engagemenet";
import { calc_maritime_resupply_locations, calc_supplied_fleet, calc_supply_ratio } from "@/logics/maritimeResupply";
import { LBAS } from "@/models/LBAS";
import { calc_attacked_enemy_single_fleet, calc_returned_origin_lbas, derive_jet_only_lbas } from "@/logics/aerialCombat/jetAssault";
import { calc_air_state_shootdowned_enemy_single_fleet, calc_air_state_shootdowned_lbas, calc_fleet_air_superiority_power, calc_squadrons_air_superriority_power } from "@/logics/airSuperiority/air_superiority";
import { evaluate_air_superiority } from "@/logics/airSuperiority/compare";
import { calc_anti_air_fired_squadrons } from "@/logics/antiAir";
import { SingleFleetFormationType } from "@/types";
import { AbyssalFleet, AbyssalSingleFleet, PlayerFleet } from "@/models/fleet/Fleet";

/// 各フェイズを制御する
/// sim_execute と logics を繋ぐ
/// 新しい構造体へのマージはここでやって、logics とは必要な値だけやりとりする

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
    node: Node,
): PlayerFleet {
    if (!node.type.is_boss) return player_fleet;

    const maritime_resupply_locations = calc_maritime_resupply_locations(player_fleet);
    if (!maritime_resupply_locations.length) return player_fleet;

    const supply_ratio = calc_supply_ratio(
        player_fleet,
        maritime_resupply_locations.length,
    );

    return calc_supplied_fleet(
        player_fleet,
        supply_ratio,
        maritime_resupply_locations,
    );
}

type DetectionPhaseResult = {
    post_detection_phase_node: Node,
    post_detection_phase_player_fleet: PlayerFleet,
}

/**
 * 索敵フェイズ後のNodeとOwnFleetを返す
 * @param node 
 * @param player_fleet 
 * @param enemy_fleet 
 * @param rand 
 * @returns 
 */
export function calc_detection_phase(
    node: Node,
    player_fleet: PlayerFleet,
    enemy_fleet: AbyssalFleet,
    rand: Rand,
): DetectionPhaseResult {
    const node_type = node.type;
    if ( // NOTE: 発生条件の資料が見つからなかったので推測
        node_type.is_night_battle_only ||
        node_type.is_ambush
    ) return {
        post_detection_phase_node: node,
        post_detection_phase_player_fleet: player_fleet,
    }

    const main_fleet_detect_status = analyze_fleet_detection(player_fleet);
    const success_rate = calc_detection_success_rate(main_fleet_detect_status.detection_power);

    const is_detection_success = rand.next() >= success_rate;

    const post_detection_phase_node = {
        ...node,
        is_detection_success,
    }

    const total_enemy_fighter_count = calc_enemy_fighter_count(enemy_fleet)

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

type JetLbasPhaseResult = {
    post_jet_lbas_phase_lbases: LBAS[],
    post_jet_lbas_phase_enemy_fleet: AbyssalFleet,
}

export function jet_lbas_phase(
    node: Node,
    lbases: LBAS[],
    enemy_fleet: AbyssalSingleFleet,
    formation: SingleFleetFormationType,
    rand: Rand,
): JetLbasPhaseResult {
    // NOTE: 索敵の成否は関係ない
    if (node.type.is_ss_only) return {
        post_jet_lbas_phase_lbases: lbases,
        post_jet_lbas_phase_enemy_fleet: enemy_fleet,
    }

    // NOTE: 相手にも噴式機がいれば迎撃が発生するらしいが棚上げ

    const jet_only_squadrons = derive_jet_only_lbas(lbases);

    if (jet_only_squadrons.length === 0) return {
        post_jet_lbas_phase_lbases: lbases,
        post_jet_lbas_phase_enemy_fleet: enemy_fleet,
    }

    // 1.制空状態の決定

    const jets_air_superiority_power = calc_squadrons_air_superriority_power(
        jet_only_squadrons,
    );
    const enemy_air_superiority_power =
        calc_fleet_air_superiority_power(enemy_fleet);

    const { own_air_state, enemy_air_state } = evaluate_air_superiority(
        jets_air_superiority_power,
        enemy_air_superiority_power,
    );

    const air_state_shootdowned_squadrons = calc_air_state_shootdowned_lbas(
        jet_only_squadrons,
        own_air_state,
        rand,
    );

    const air_state_shootdowned_enemy_fleet = calc_air_state_shootdowned_enemy_single_fleet(
        enemy_fleet,
        enemy_air_state,
        rand,
    );

    if (air_state_shootdowned_squadrons.every(squadron => squadron.slot_count <= 0)) return { // 枯れたらreturn
        post_jet_lbas_phase_lbases: calc_returned_origin_lbas(
            air_state_shootdowned_squadrons,
            lbases,
        ),
        post_jet_lbas_phase_enemy_fleet: air_state_shootdowned_enemy_fleet,
    }

    // NOTE: 2.触接判定 ジェット基地による強襲では触接は発生しない

    // 3.水上艦の対空砲火による航空機の撃墜

    const anti_air_fired_squadrons = calc_anti_air_fired_squadrons(
        air_state_shootdowned_squadrons,
        air_state_shootdowned_enemy_fleet,
        formation,
        rand,
    );

    // 4.航空機による開幕航空攻撃

    const attacked_enemy_fleet = calc_attacked_enemy_single_fleet(
        anti_air_fired_squadrons,
        air_state_shootdowned_enemy_fleet,
        formation,
        rand,
    );

    return {
        post_jet_lbas_phase_lbases: calc_returned_origin_lbas(
            anti_air_fired_squadrons,
            lbases,
        ),
        post_jet_lbas_phase_enemy_fleet: attacked_enemy_fleet,
    }
}

/**
 * 交戦形態を付与したNodeを返す
 * @param node 
 * @param player_fleet 
 * @param rand 
 * @returns 
 */
export function calc_engagement_phase(
    node: Node,
    player_fleet: PlayerFleet,
    rand: Rand,
): Node {
    return {
        ...node,
        engagement_type: calc_engagement(player_fleet, rand),
    }
}

type SmokeScreenPhaseResult = {
    post_smoke_screen_phase_player_fleet: PlayerFleet,
    post_smoke_screen_phase_node: Node,
}

/**
 * 煙幕フェイズ後のNodeとFleetを返す
 * @param settings 
 * @param node 
 * @param player_fleet 
 * @param rand 
 * @returns 
 */
export function calc_smoke_screen_phase(
    settings: UserSettings,
    node: Node,
    player_fleet: PlayerFleet,
    rand: Rand,
): SmokeScreenPhaseResult {
    if (
        !settings.smoke_screen_trigger_node_index.includes(node.index)
        || !player_fleet.unused_smoke
    ) return {
        post_smoke_screen_phase_player_fleet: player_fleet,
        post_smoke_screen_phase_node: node,
    };

    const smoke_rates = calc_smoke_screen_activate_rate(player_fleet);

    const triggered_smoke_type = calc_triggered_smoke_type(smoke_rates, rand);

    if (triggered_smoke_type === 'Misfire') return {
        post_smoke_screen_phase_player_fleet: player_fleet,
        post_smoke_screen_phase_node: node,
    };

    const post_smoke_screen_phase_node = {
        ...node,
        triggered_smoke_type: triggered_smoke_type,
    }

    const post_smoke_screen_phase_player_fleet = {
        ...player_fleet,
        unused_smoke: false,
    }

    return {
        post_smoke_screen_phase_node,
        post_smoke_screen_phase_player_fleet: post_smoke_screen_phase_player_fleet,
    }
}