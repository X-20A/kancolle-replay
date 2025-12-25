import { AffiliationFleetType, FleetUnit } from "@/models/fleet/FleetUnit";
import { Node } from "@/models/Node";

export type ShootdownCombinedFleetMod = 1 | 0.8 | 0.72 | 0.48

/**
 * 割合撃墜と固定撃墜の為の連合艦隊補正を返す(コア)
 * @param affiliation_type 
 * @param is_air_raid_only 
 * @returns 
 */
const calc_combined_fleet_mod_core = (
    affiliation_type: AffiliationFleetType,
    is_air_raid_only: { is_air_raid_only: boolean },
): ShootdownCombinedFleetMod => {
    if (affiliation_type === 'single') return 1
    if (affiliation_type === 'escort') return 0.48;
    if (is_air_raid_only) return 0.72;
    return 0.8;
}

/**
 * 割合撃墜と固定撃墜の為の連合艦隊補正を返す
 * @param fleet_unit 
 * @param node 
 * @returns 
 */
export function calc_combined_fleet_mod(
    fleet_unit: FleetUnit,
    node: Node,
): ShootdownCombinedFleetMod {
    return calc_combined_fleet_mod_core(
        fleet_unit.affiliation_type,
        { is_air_raid_only: node.node_type.is_air_raid_only },
    );
}

export const __shootdown_util__ = {
    calc_combined_fleet_mod_core,
};