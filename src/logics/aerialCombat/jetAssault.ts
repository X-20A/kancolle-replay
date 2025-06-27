import { Rand } from "@/effects/random";
import { is_jet_bomber_equip } from "@/models/equip/basic";
import { JetSquadron, LBAS } from "@/models/LBAS";
import { EquippedShip } from "@/models/ship/equipped";
import { CombinedFleetFormationType, SingleFleetFormationType } from "@/types";
import { EnemyCombinedFleet, EnemyFleet, EnemySingleFleet } from "@/types/brands/fleet";
import { ExtractedShipStruct } from "@/types/fleet";
import { extract_jet_assault_targets, calc_general_target_fleet, choice_target_in_single_vs_single } from "../target/target";
import { calc_final_jet_assault_accuracy } from "../accuracy";
import { calc_defence } from "../defense";
import { calc_jet_assault_damage } from "../damage";
import { produce } from "immer";

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

type TargetShips = {
    main_fleet: ExtractedShipStruct[],
    escort_fleet: ExtractedShipStruct[],
}

/**
 * 敵艦隊から基地ジェット強襲の対象になる艦群を抽出して返す
 * @param enemy_fleet 
 * @returns 
 */
const calc_extract_valid_targets = (
    enemy_fleet: EnemyFleet,
): ExtractedShipStruct[] => {
    const calc_extracted_ships = (ships: EquippedShip[], is_main: boolean): ExtractedShipStruct[] =>
        ships.reduce((acc, ship, index) => {
            if (!['SS', 'SSV'].includes(ship.type_id)) {
                acc.push({
                    ship,
                    is_original_fleet_main: true,
                    original_index: index,
                    is_flagship: index === 0,
                });
            }
            return acc;
        }, [] as ExtractedShipStruct[]);

    const main_fleet_ships = calc_extracted_ships(enemy_fleet.main_fleet_ships, true);

    return enemy_fleet.is_combined
        ? [...main_fleet_ships, ...calc_extracted_ships(enemy_fleet.escort_fleet_ships, false)]
        : main_fleet_ships;
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
    enemy_fleet: EnemySingleFleet,
    formation: SingleFleetFormationType,
    rand: Rand,
): EnemySingleFleet {
    return jet_only_squadrons.reduce((current_fleet, squadron) => {
        const target_ship_structs = extract_jet_assault_targets(current_fleet.main_fleet_ships);
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
            draft.main_fleet_ships[target_ship_struct.original_index].hp_remain -= damage;
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
    enemy_fleet: EnemyCombinedFleet,
    formation: CombinedFleetFormationType,
    rand: Rand,
): EnemyCombinedFleet {
    jet_only_squadrons.forEach(squadron => {
        const target_fleet_ships = calc_general_target_fleet(
            enemy_fleet,
            rand,
            'lbas',
        ) === 'main'
            ? enemy_fleet.main_fleet_ships
            : enemy_fleet.escort_fleet_ships;

        const target_ship_structs = extract_jet_assault_targets(target_fleet_ships);

        const target_ship_struct = choice_target_from_combined_fleet(
            target_ship_structs,
            formation,
            rand,
        );

        // NOTE: 基地噴式強襲の命中率について、航空戦 | 基地航空隊 どちらの形式をとるか
        // NOTE: wikiでは見つけられなかった。Sortie sim では基地航空隊を採用してるっぽい
        // NOTE: 橘花改 → 景雲 にするとおおよそ命中 1 * 7 分、上昇が見られる
        // NOTE: ひとまず基地航空隊式を採用

        const basic_attack_power = calc_basic_jet_assault_attack_power(squadron);
    })
}
