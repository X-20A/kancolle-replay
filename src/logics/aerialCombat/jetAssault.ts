import { RandGenerator } from "@/effects/random";
import { LbasJetSquadron, LBAS } from "@/models/LBAS";
import { calc_general_target_fleet, choice_target_in_single_vs_combined, choice_target_in_single_vs_single } from "../target";
import { calc_appllied_damage_fleet, calc_jet_LBAS_assault_damage } from "../damage";
import { AbyssalCombinedFleet, AbyssalSingleFleet, is_combined_fleet } from "@/models/fleet/Fleet";
import { is_submarine_category } from "@/models/ship/equipped";

/**
 * 攻撃後の敵通常艦隊を返す
 * @param squadrons 
 * @param enemy_fleet 
 * @param formation 
 * @param rand 
 */
function calc_jet_attacked_enemy_single_fleet(
    squadrons: LbasJetSquadron[],
    enemy_fleet: AbyssalSingleFleet,
    rand: RandGenerator,
): AbyssalSingleFleet {
    return squadrons.reduce((current_fleet, squadron) => {
        const target_fleet_units =
            current_fleet.main_fleet_units.filter(unit => !is_submarine_category(unit.ship));;
        const target_fleet_unit = choice_target_in_single_vs_single(
            target_fleet_units,
            enemy_fleet.formation,
            current_fleet,
            rand,
        );

        const damage = calc_jet_LBAS_assault_damage(
            squadron,
            current_fleet,
            target_fleet_unit.ship,
            rand,
        );

        return calc_appllied_damage_fleet(current_fleet, target_fleet_unit, damage);
    }, enemy_fleet);
}

/**
 * 攻撃後の敵連合艦隊を返す
 * @param jet_only_squadrons 
 * @param enemy_fleet 
 * @param formation 
 * @param rand 
 */
function calc_jet_attacked_enemy_combined_fleet(
    jet_only_squadrons: LbasJetSquadron[],
    enemy_fleet: AbyssalCombinedFleet,
    rand: RandGenerator,
): AbyssalCombinedFleet {
    return jet_only_squadrons.reduce((current_fleet, squadron) => {
        const is_target_main = calc_general_target_fleet(
            current_fleet,
            rand,
            'lbas',
        ) === 'main';

        const target_fleet_units = is_target_main
            ? current_fleet.main_fleet_units.filter(unit => !is_submarine_category(unit.ship))
            : current_fleet.escort_fleet_units.filter(unit => !is_submarine_category(unit.ship));

        const target_fleet_unit = choice_target_in_single_vs_combined(
            target_fleet_units,
            enemy_fleet.formation,
            rand,
        );

        // NOTE: 基地噴式強襲の命中率について、航空戦 | 基地航空隊 どちらの形式をとるか
        // NOTE: wikiでは見つけられなかった。Sortie sim では基地航空隊を採用してるっぽい
        // NOTE: 橘花改 → 景雲 にするとおおよそ命中 1 * 7 分、上昇が見られる
        // NOTE: ひとまず基地航空隊式を採用

        const damage = calc_jet_LBAS_assault_damage(
            squadron,
            current_fleet,
            target_fleet_unit.ship,
            rand,
        );

        return calc_appllied_damage_fleet(current_fleet, target_fleet_unit, damage);
    }, enemy_fleet);
}


export function calc_jet_attacked_enemy_fleet<T extends AbyssalSingleFleet | AbyssalCombinedFleet>(
    jet_only_squadrons: LbasJetSquadron[],
    enemy_fleet: T,
    rand: RandGenerator,
): T {
    return is_combined_fleet(enemy_fleet)
        ? calc_jet_attacked_enemy_combined_fleet(jet_only_squadrons, enemy_fleet, rand) as T
        : calc_jet_attacked_enemy_single_fleet(jet_only_squadrons, enemy_fleet, rand) as T;
}