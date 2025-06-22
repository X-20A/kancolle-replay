import { Rand } from "@/effects/random";
import { is_jet_bomber_equip, JetBomberEquip } from "@/models/equip/basic";
import { JetOnlySquadron, LBAS } from "@/models/LBAS";
import { EquippedShip } from "@/models/ship/equipped";
import { FormationType } from "@/types";
import { EnemyFleet } from "@/types/brands/fleet";
import { ExtractedShip } from "@/types/fleet";
import { calc_selected_target } from "../target";

/**
 * ジェット機スロットだけを抽出した基地航空隊を返す
 */
export function derive_jet_only_lbas(bases: LBAS[]): JetOnlySquadron[] {
    const jet_only_squadrons: JetOnlySquadron[] = [];

    bases.forEach((base, base_index) => {
        base.squadrons.forEach((squadron, slot_index) => {
            if (is_jet_bomber_equip(squadron.unit)) {
                jet_only_squadrons.push({
                    unit: squadron.unit,
                    slot_count: squadron.slot_count,
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
    jet_only_squadrons: readonly JetOnlySquadron[],
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
    squadron: JetOnlySquadron,
): number {
    return 1.0 * (squadron.unit.natural_addition.aerial_bomb_power * Math.sqrt(squadron.slot_count))
        + 25;
}

type TargetShips = {
    main_fleet: ExtractedShip[],
    escort_fleet: ExtractedShip[],
}

/**
 * 敵艦隊から基地ジェット強襲の対象になる艦群を抽出して返す
 * @param enemy_fleet 
 * @returns 
 */
const calc_extract_valid_targets = (
    enemy_fleet: EnemyFleet,
): ExtractedShip[] => {
    const calc_extracted_ships = (ships: EquippedShip[], is_main: boolean): ExtractedShip[] =>
        ships.reduce((acc, ship, index) => {
            if (!['SS', 'SSV'].includes(ship.type_id)) {
                acc.push({
                    ship,
                    is_original_fleet_main: is_main,
                    original_index: index,
                });
            }
            return acc;
        }, [] as ExtractedShip[]);

    const main_fleet_ships = calc_extracted_ships(enemy_fleet.main_fleet_ships, true);

    return enemy_fleet.is_combined
        ? [...main_fleet_ships, ...calc_extracted_ships(enemy_fleet.escort_fleet_ships, false)]
        : main_fleet_ships;
}

export function calc_attacked_single_enemy_fleet(
    jet_only_squadrons: JetOnlySquadron[],
    enemy_fleet: EnemyFleet,
    formation: FormationType,
    rand: Rand,
): EnemyFleet {
    jet_only_squadrons.forEach(squadron => {
        const target_ships = enemy_fleet.main_fleet_ships.reduce((acc, ship, index) => {
            if (!['SS', 'SSV'].includes(ship.type_id)) {
                acc.push({
                    ship,
                    is_original_fleet_main: true,
                    original_index: index,
                    is_flagship: index === 0,
                });
            }
            return acc;
        }, [] as ExtractedShip[]);

        const target_ship = calc_selected_target(
            target_ships,
            formation,
            rand,
        );

        const basic_attack_power = calc_basic_jet_assault_attack_power(squadron);

        // NOTE: 基地噴式強襲の命中率について、航空戦 | 基地航空隊 どちらの形式をとるか
        // NOTE: wikiでは見つけられなかった。Sortie sim では基地航空隊を採用してるっぽい
        // NOTE: 橘花改 → 景雲 にするとおおよそ命中 1 * 7 分、上昇が見られる
        // NOTE: ひとまず基地航空隊式を採用

        
    })
}