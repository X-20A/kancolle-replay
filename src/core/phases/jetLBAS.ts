import { AbyssalCombinedFleet, AbyssalSingleFleet } from "@/models/fleet/Fleet";
import { calc_returned_origin_lbas, extract_jet_squadrons, LBAS } from "@/models/LBAS";
import { NavalBase } from "@/models/NavalBase";
import { UserSettings } from "../flows/normal";
import { RandGenerator } from "@/effects/random";
import { Node } from "@/models/Node";
import { calc_jet_assault_cost } from "@/logics/cost";
import { calc_squadrons_air_superriority_power } from "@/logics/airSuperiority/fighterPower";
import { evaluate_air_superiority } from "@/logics/airSuperiority/compare";
import { calc_air_state_shootdowned_enemy_fleet, calc_air_state_shootdowned_lbas } from "@/logics/airSuperiority/airStateShootdown";
import { calc_anti_air_fired_jet_squadrons } from "@/logics/antiAir";
import { calc_jet_attacked_enemy_fleet } from "@/logics/aerialCombat/jetAssault";

/**
 * 基地噴式強襲後の基地、敵艦隊を返す
 * @param node 
 * @param lbases 
 * @param enemy_fleet 
 * @param settings 
 * @param rand 
 * @returns 
 */
export function calc_jet_LBAS_phase<T extends AbyssalSingleFleet | AbyssalCombinedFleet>(
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