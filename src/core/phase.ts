import { Rand } from "@/effects/random";
import { analyze_fleet_detection, calc_detection_success_rate, calc_enemy_fighter_count, calc_shotdowned_recon_fleet } from "@/logics/detection";
import { UserSettings } from "./SimExecuter";
import { calc_smoke_screen_activate_rate, calc_triggered_smoke_type } from "@/logics/smokeScreen";
import { EnemyFleet, OwnFleet } from "@/types/brands/fleet";
import { Node } from "@/models/Node";
import { calc_engagement } from "@/logics/engagemenet";
import { calc_maritime_resupply_count, calc_supplied_fleet, calc_supply_ratio } from "@/logics/maritimeResupply";
import { LBAS } from "@/models/LBAS";
import { derive_jet_only_lbas } from "@/logics/aerialCombat/jetAssault";
import { calc_air_state_shootdowned_enemy_fleet, calc_air_state_shootdowned_lbas, calc_equips_air_superiority_power, calc_fleet_air_superiority_power } from "@/logics/airSuperiority/air_superiority";
import { evaluate_air_superiority } from "@/logics/airSuperiority/compare";
import { concat_fleet_ships } from "@/models/fleet/Fleet";
import { is_player_ship } from "@/models/ship/equipped";

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
    node: Node,
): OwnFleet {
    if (!node.type.is_boss) return own_fleet;

    const maritime_resupply_locations = calc_maritime_resupply_count(own_fleet);
    if (!maritime_resupply_locations.length) return own_fleet;

    const supply_ratio = calc_supply_ratio(
        own_fleet,
        maritime_resupply_locations.length,
    );

    return calc_supplied_fleet(
        own_fleet,
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
 * @param own_fleet 
 * @param enemy_fleet 
 * @param rand 
 * @returns 
 */
export function calc_detection_phase(
    node: Node,
    own_fleet: OwnFleet,
    enemy_fleet: EnemyFleet,
    rand: Rand,
): DetectionPhaseResult {
    const node_type = node.type;
    if ( // NOTE: 発生条件の資料が見つからなかったので推測
        node_type.is_night_battle_only
        || node_type.is_ambush
    ) return {
        post_detection_phase_node: node,
        post_detection_phase_own_fleet: own_fleet,
    }

    const main_fleet_detect_status = analyze_fleet_detection(own_fleet);
    const success_rate = calc_detection_success_rate(main_fleet_detect_status.detection_power);

    const is_detection_success = rand.next() > success_rate;

    const post_detection_phase_node = {
        ...node,
        is_detection_success,
    }

    const total_enemy_fighter_count = calc_enemy_fighter_count(enemy_fleet)

    const post_detection_phase_own_fleet = calc_shotdowned_recon_fleet(
        own_fleet,
        main_fleet_detect_status.recon_power,
        total_enemy_fighter_count,
        rand,
    );

    return {
        post_detection_phase_node,
        post_detection_phase_own_fleet,
    }
}

type JetLbasPhaseResult = {
    post_jet_lbas_phase_lbases: LBAS[],
    post_jet_lbas_phase_enemy_fleet: EnemyFleet,
}

export function jet_lbas_phase(
    node: Node,
    lbases: LBAS[],
    enemy_fleet: EnemyFleet,
    rand: Rand,
): JetLbasPhaseResult {
    // NOTE: 索敵の成否は関係ない
    if (node.type.is_ss_only) return {
        post_jet_lbas_phase_lbases: lbases,
        post_jet_lbas_phase_enemy_fleet: enemy_fleet,
    }

    // NOTE: 相手にも噴式機がいれば迎撃が発生するらしいが棚上げ

    const jet_only_lbas = derive_jet_only_lbas(lbases);

    if (jet_only_lbas.units.length === 0) return {
        post_jet_lbas_phase_lbases: lbases,
        post_jet_lbas_phase_enemy_fleet: enemy_fleet,
    }

    // 1.制空状態の決定

    const jets_air_superiority_power = calc_equips_air_superiority_power(
        jet_only_lbas.units,
        jet_only_lbas.slot_counts,
    );
    const enemy_air_superiority_power =
        calc_fleet_air_superiority_power(enemy_fleet);

    const { own_air_state, enemy_air_state } = evaluate_air_superiority(
        jets_air_superiority_power,
        enemy_air_superiority_power,
    );

    const air_state_shootdowned_lbas = calc_air_state_shootdowned_lbas(
        jet_only_lbas,
        own_air_state,
        rand,
    );
    const air_state_shootdowned_enemy_fleet = calc_air_state_shootdowned_enemy_fleet(
        enemy_fleet,
        enemy_air_state,
        rand,
    );

    // NOTE: 2.触接判定 ジェット基地による強襲では触接は発生しない

    // 3.水上艦の対空砲火による航空機の撃墜
    const defender_ships = concat_fleet_ships(enemy_fleet).filter(ship => {
        return !is_player_ship(ship) && !ship.flags.is_faraway
    });

    // 4.航空機による開幕航空攻撃

    const anti_air_fired_lbas = calc_anti_air_fired_lbas
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