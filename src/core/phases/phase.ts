import { RandGenerator } from "@/effects/random";
import { analyze_fleet_detection, calc_detection_success_rate, calc_enemy_fighter_count, calc_shotdowned_recon_fleet } from "@/logics/detection";
import { UserSettings } from "../flows/normal";
import { calc_smoke_screen_activate_rate, calc_triggered_smoke_type } from "@/logics/smokeScreen";
import { Node } from "@/models/Node";
import { calc_engagement } from "@/logics/engagemenet";
import { calc_maritime_resupply_locations, calc_supplied_fleet, calc_supply_ratio } from "@/logics/maritimeResupply";
import { LbasJetSquadron, LBAS, derive_jet_bomber_squadron, is_squadron_destruction, reflect_squadrons_to_origin_fleet, extract_jet_squadrons, calc_returned_origin_lbas } from "@/models/LBAS";
import { calc_jet_attacked_enemy_fleet } from "@/logics/aerialCombat/jetAssault";
import { calc_air_state_shootdowned_enemy_fleet, calc_air_state_shootdowned_lbas, calc_fleet_air_superiority_power, calc_squadrons_air_superriority_power } from "@/logics/airSuperiority/fighterPower";
import { evaluate_air_superiority } from "@/logics/airSuperiority/compare";
import { calc_anti_air_fired_jet_squadrons } from "@/logics/antiAir";
import { AbyssalCombinedFleet, AbyssalFleet, AbyssalSingleFleet, PlayerFleet } from "@/models/fleet/Fleet";
import { RandValue } from "@/types/brands/other";
import { NavalBase } from "@/models/NavalBase";
import { calc_jet_assault_cost } from "@/logics/cost";

/// 各フェイズを制御する
/// sim_execute と logics を繋ぐ
/// 新しい構造体へのマージはここでやって、logics とは必要な値だけやりとりする

export type PhaseType =
    | 'Jet_LBAS'
    | 'JET_strike'


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
    rand: RandGenerator,
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

    const is_detection_success = rand.next() < success_rate;

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

/**
 * 基地噴式強襲後の基地、敵艦隊を返す
 * @param node 
 * @param lbases 
 * @param enemy_fleet 
 * @param settings 
 * @param rand 
 * @returns 
 */
export function calc_lbas_jet_phase<T extends AbyssalSingleFleet | AbyssalCombinedFleet>(
    node: Node,
    lbases: LBAS[],
    enemy_fleet: T,
    naval_base: NavalBase,
    settings: UserSettings,
    rand: RandGenerator,
): {
    post_jet_lbas_phase_lbases: LBAS[],
    post_jet_lbas_phase_enemy_fleet: T,
    post_jet_lbas_phase_naval_base: NavalBase,
} {
    // NOTE: 索敵の成否は問わない
    if (node.type.is_ss_only) return {
        post_jet_lbas_phase_lbases: lbases,
        post_jet_lbas_phase_enemy_fleet: enemy_fleet,
        post_jet_lbas_phase_naval_base: naval_base,
    }

    // NOTE: 相手にも噴式機がいれば迎撃が発生するらしいが演習でしか起きないので棚上げ

    const sent_lbases = lbases.filter(lbas => lbas.target_node.includes(node.index));

    const jet_only_squadrons: LbasJetSquadron[] =
        extract_jet_squadrons(sent_lbases);

    if (jet_only_squadrons.length === 0) return {
        post_jet_lbas_phase_lbases: lbases,
        post_jet_lbas_phase_enemy_fleet: enemy_fleet,
        post_jet_lbas_phase_naval_base: naval_base,
    }

    // 噴式強襲代徴収
    const post_jet_lbas_phase_naval_base = {
        ...naval_base,
        steel: calc_jet_assault_cost(jet_only_squadrons),
    };

    // 1.制空状態の決定

    const jets_air_superiority_power = calc_squadrons_air_superriority_power(
        jet_only_squadrons,
    );
    // NOTE: 敵連合艦隊 > 随伴艦隊の空母が制空に参加するか分からないがとりあえず含める
    const enemy_air_superiority_power =
        calc_fleet_air_superiority_power(enemy_fleet, 'both_fleet');

    const { player_air_state, enemy_air_state } = evaluate_air_superiority(
        jets_air_superiority_power,
        enemy_air_superiority_power,
    );

    const air_state_shootdowned_squadrons = calc_air_state_shootdowned_lbas(
        jet_only_squadrons,
        player_air_state,
        rand,
    );

    const air_state_shootdowned_enemy_fleet = calc_air_state_shootdowned_enemy_fleet(
        enemy_fleet,
        enemy_air_state,
        rand,
    );

    if (air_state_shootdowned_squadrons.every(is_squadron_destruction)) return { // 枯れたらreturn
        post_jet_lbas_phase_lbases: calc_returned_origin_lbas(
            air_state_shootdowned_squadrons,
            lbases,
        ),
        post_jet_lbas_phase_enemy_fleet: air_state_shootdowned_enemy_fleet,
        post_jet_lbas_phase_naval_base,
    }

    // NOTE: 2.触接判定 ジェット基地による強襲では触接は発生しない

    // 3.水上艦の対空砲火による航空機の撃墜

    const anti_air_fired_squadrons = calc_anti_air_fired_jet_squadrons(
        air_state_shootdowned_squadrons,
        air_state_shootdowned_enemy_fleet,
        node,
        'Misfire', // 噴式強襲に対してはAACIは発動しない
        rand,
    );

    // 4.航空機による開幕航空攻撃

    const attacked_enemy_fleet = calc_jet_attacked_enemy_fleet(
        anti_air_fired_squadrons,
        air_state_shootdowned_enemy_fleet,
        node,
        settings,
        rand,
    );

    return {
        post_jet_lbas_phase_lbases: calc_returned_origin_lbas(
            anti_air_fired_squadrons,
            lbases,
        ),
        post_jet_lbas_phase_enemy_fleet: attacked_enemy_fleet,
        post_jet_lbas_phase_naval_base,
    }
}

/**
 * 空母による噴式強襲後の基地、敵艦隊を返す
 * @param player_fleet 
 * @param enemy_fleet 
 * @param node 
 */
export function calc_ship_jet_assault_phase(
    player_fleet: PlayerFleet,
    enemy_fleet: AbyssalFleet,
    naval_base: NavalBase,
    node: Node,
    settings: UserSettings,
    rand: RandGenerator,
): {
    post_CVs_jet_assault_phase_player_fleet: PlayerFleet,
    post_CVs_jet_assault_phase_enemy_fleet: AbyssalFleet,
    post_CVs_jet_assault_phase_naval_base: NavalBase,
} {
    // NOTE: 索敵の成否は問わない
    if (node.type.is_ss_only) return {
        post_CVs_jet_assault_phase_player_fleet: player_fleet,
        post_CVs_jet_assault_phase_enemy_fleet: enemy_fleet,
        post_CVs_jet_assault_phase_naval_base: naval_base,
    }

    // NOTE: 相手にも噴式機がいれば迎撃が発生するらしいが演習でしか起きないので棚上げ

    // NOTE: 随伴艦隊に噴式機搭載可能な空母は配属できない、よって主力艦隊の噴式機のみ収集
    const jet_only_squadrons = derive_jet_bomber_squadron(player_fleet.main_fleet_units);

    if (jet_only_squadrons.length === 0) return {
        post_CVs_jet_assault_phase_player_fleet: player_fleet,
        post_CVs_jet_assault_phase_enemy_fleet: enemy_fleet,
        post_CVs_jet_assault_phase_naval_base: naval_base,
    }

    // 噴式強襲代徴収
    const post_CVs_jet_assault_phase_naval_base = {
        ...naval_base,
        steel: calc_jet_assault_cost(jet_only_squadrons),
    };

    // 1.制空状態の決定

    const jets_air_superiority_power = calc_squadrons_air_superriority_power(
        jet_only_squadrons,
    );

    // NOTE: 敵連合艦隊 > 随伴艦隊の空母が制空に参加するか分からないがとりあえず含める
    const enemy_air_superiority_power =
        calc_fleet_air_superiority_power(enemy_fleet, 'both_fleet');

    const { player_air_state, enemy_air_state } = evaluate_air_superiority(
        jets_air_superiority_power,
        enemy_air_superiority_power,
    );

    const air_state_shootdowned_squadrons = calc_air_state_shootdowned_lbas(
        jet_only_squadrons,
        player_air_state,
        rand,
    );

    const air_state_shootdowned_enemy_fleet = calc_air_state_shootdowned_enemy_fleet(
        enemy_fleet,
        enemy_air_state,
        rand,
    );

    if (air_state_shootdowned_squadrons.every(is_squadron_destruction)) return { // 枯れたらreturn
        post_CVs_jet_assault_phase_player_fleet: reflect_squadrons_to_origin_fleet(
            air_state_shootdowned_squadrons,
            player_fleet,
        ),
        post_CVs_jet_assault_phase_enemy_fleet: air_state_shootdowned_enemy_fleet,
        post_CVs_jet_assault_phase_naval_base,
    }

    // NOTE: 2.触接判定 ジェット基地による強襲では触接は発生しない

    // 3.水上艦の対空砲火による航空機の撃墜

    const anti_air_fired_squadrons = calc_anti_air_fired_jet_squadrons(
        air_state_shootdowned_squadrons,
        air_state_shootdowned_enemy_fleet,
        node,
        'Misfire', // 噴式強襲に対してはAACIは発動しない
        rand,
    );

    // 4.航空機による開幕航空攻撃

    const attacked_enemy_fleet = calc_jet_attacked_enemy_fleet(
        anti_air_fired_squadrons,
        air_state_shootdowned_enemy_fleet,
        node,
        settings,
        rand,
    );

    return {
        post_CVs_jet_assault_phase_player_fleet: reflect_squadrons_to_origin_fleet(
            anti_air_fired_squadrons,
            player_fleet,
        ),
        post_CVs_jet_assault_phase_enemy_fleet: attacked_enemy_fleet,
        post_CVs_jet_assault_phase_naval_base,
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
    rand: RandGenerator,
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
    rand_value: RandValue,
): SmokeScreenPhaseResult {
    if (
        !settings.smoke_screen_trigger_node_index.includes(node.index) ||
        !player_fleet.unused_smoke
    ) return {
        post_smoke_screen_phase_player_fleet: player_fleet,
        post_smoke_screen_phase_node: node,
    };

    const smoke_rates = calc_smoke_screen_activate_rate(player_fleet);

    const triggered_smoke_type = calc_triggered_smoke_type(smoke_rates, rand_value);

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