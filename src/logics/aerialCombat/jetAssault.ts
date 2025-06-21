import { Rand } from "@/effects/random";
import { is_jet_bomber_equip } from "@/models/equip/basic";
import { concat_fleet_ships } from "@/models/fleet/Fleet";
import { JetOnlySquadron, LBAS } from "@/models/LBAS";
import { EquippedShip } from "@/models/ship/equipped";
import { EnemyFleet } from "@/types/brands/fleet";
import { ExtractedFleet } from "@/types/fleet";

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

): number {

}

/**
 * 敵艦隊から基地ジェット強襲の対象になる艦群を抽出して返す
 * @param enemy_fleet 
 * @returns 
 */
const calc_extract_valid_targets = (
    enemy_fleet: EnemyFleet,
): ExtractedFleet => {
    const ships: EquippedShip[] = [];
    return concat_fleet_ships(enemy_fleet).flatMap(ship => {
        if (ship.type_id !== 'SS' && ship.type_id !== 'SSV') {
            return {

            }
        }
    });
}

export function calc_attacked_enemy_fleet(
    jet_only_squadrons: JetOnlySquadron[],
    enemy_fleet: EnemyFleet,
    rand: Rand,
): EnemyFleet {
    const target_ships = calc_extract_valid_targets(enemy_fleet);
    jet_only_squadrons.units.forEach(unit => {

    })
}