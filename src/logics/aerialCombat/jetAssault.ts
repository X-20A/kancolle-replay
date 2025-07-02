import { Rand } from "@/effects/random";
import { is_jet_bomber_equip } from "@/models/equip/basic";
import { JetSquadron, LBAS } from "@/models/LBAS";
import { EquippedShip } from "@/models/ship/equipped";
import { CombinedFleetFormationType, SingleFleetFormationType } from "@/types";
import { ExtractedShipStruct } from "@/types/fleet";
import { extract_jet_assault_targets_from_single_fleet, calc_general_target_fleet, choice_target_in_single_vs_single } from "../target/target";
import { calc_jet_assault_damage } from "../damage";
import { produce } from "immer";
import { AbyssalCombinedFleet, AbyssalFleet, AbyssalSingleFleet, is_combined_fleet } from "@/models/fleet/Fleet";

/**
 * 基地航空隊の平均航空機熟練度を返す
 * @param lbas 
 * @returns 
 */
const calc_average_lbas_proficiency = (
    lbas: LBAS,
): number => {
    return lbas.squadrons.reduce((total, squdron) => {
        return total + squdron.proficiency;
    }, 0);
}

/**
 * ジェット機スロットだけを抽出した基地航空隊を返す
 */
export function derive_jet_only_lbas(bases: LBAS[]): JetSquadron[] {
    const jet_only_squadrons: JetSquadron[] = [];

    bases.forEach((base, base_index) => {
        base.squadrons.forEach((squadron, slot_index) => {
            if (is_jet_bomber_equip(squadron.unit)) {
                jet_only_squadrons.push({
                    unit: squadron.unit,
                    slot_count: squadron.slot_count,
                    original_lbas_average_proficiency: calc_average_lbas_proficiency(base),
                    original_lbas_index: base_index,
                    original_squadron_index: slot_index,
                });
            }
        });
    });

    return jet_only_squadrons;
}

/**
 * 抽出した基地航空隊を所属元に返還した新しいLBAS[]を返す
 * @param jet_only_squadrons 
 * @param original_lbases 
 * @returns 
 */
export function calc_returned_origin_lbas(
    jet_only_squadrons: readonly JetSquadron[],
    original_lbases: readonly LBAS[],
): LBAS[] {
    return original_lbases.map((lbas, lbas_index) => {
        const match_jet_squadrons = jet_only_squadrons.filter(
            jet_squadron => jet_squadron.original_lbas_index === lbas_index
        );
        if (match_jet_squadrons.length === 0) return lbas;

        const new_squadrons = lbas.squadrons.map((squadron, squadron_index) => {
            const jet_squadron = match_jet_squadrons.find(jet_squadron =>
                jet_squadron.original_squadron_index === squadron_index
            );

            if (!jet_squadron) return squadron;

            return {
                ...squadron,
                slot_count: jet_squadron.slot_count,
            };
        });

        return {
            ...lbas,
            squadrons: new_squadrons,
        }
    });
}

export function calc_basic_jet_assault_attack_power(
    squadron: JetSquadron,
): number {
    return 1.0 * (squadron.unit.natural_addition.aerial_bomb_power * Math.sqrt(squadron.slot_count))
        + 25;
}

/**
 * 攻撃後の敵通常艦隊を返す
 * @param jet_only_squadrons 
 * @param enemy_fleet 
 * @param formation 
 * @param rand 
 */
export function calc_attacked_enemy_single_fleet(
    jet_only_squadrons: JetSquadron[],
    enemy_fleet: AbyssalSingleFleet,
    formation: SingleFleetFormationType,
    rand: Rand,
): AbyssalSingleFleet {
    return jet_only_squadrons.reduce((current_fleet, squadron) => {
        const target_ship_structs = extract_jet_assault_targets_from_single_fleet(enemy_fleet.main_fleet_ships);
        const target_ship_struct = choice_target_in_single_vs_single(
            target_ship_structs,
            formation,
            current_fleet,
            rand,
        );

        const damage = calc_jet_assault_damage(
            squadron,
            current_fleet,
            target_ship_struct.ship,
            rand,
        );

        return produce(current_fleet, (draft) => {
            const new_hp_remain = Math.max(
                0,
                draft.main_fleet_ships[target_ship_struct.original_index].state.hp_remain - damage
            );
            draft.main_fleet_ships[target_ship_struct.original_index].state.hp_remain = new_hp_remain;
        });
    }, enemy_fleet);
}

/**
 * 攻撃後の敵連合艦隊を返す
 * @param jet_only_squadrons 
 * @param enemy_fleet 
 * @param formation 
 * @param rand 
 */
export function calc_attacked_enemy_combined_fleet(
    jet_only_squadrons: JetSquadron[],
    enemy_fleet: AbyssalCombinedFleet,
    formation: CombinedFleetFormationType,
    rand: Rand,
): AbyssalCombinedFleet {
    jet_only_squadrons.forEach(squadron => {
        const target_fleet_ships = calc_general_target_fleet(
            enemy_fleet,
            rand,
            'lbas',
        ) === 'main'
            ? enemy_fleet.main_fleet_ships
            : enemy_fleet.escort_fleet_ships;

        const target_ship_structs = extract_jet_assault_targets_from_single_fleet(target_fleet_ships);

        const target_ship_struct = choice_target_in_single_vs_single(
            target_ship_structs,
            formation,
            enemy_fleet,
            rand,
        );

        // NOTE: 基地噴式強襲の命中率について、航空戦 | 基地航空隊 どちらの形式をとるか
        // NOTE: wikiでは見つけられなかった。Sortie sim では基地航空隊を採用してるっぽい
        // NOTE: 橘花改 → 景雲 にするとおおよそ命中 1 * 7 分、上昇が見られる
        // NOTE: ひとまず基地航空隊式を採用

        const basic_attack_power = calc_basic_jet_assault_attack_power(squadron);
    })
}
