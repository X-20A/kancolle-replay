import { AbyssalEquippedShip, EquippedShip, is_player_ship, PlayerEquippedShip } from "@/models/ship/equipped";
import { AntiAirCutinType } from "./cutin/conditions";
import { AbyssalFleet, AbyssalSingleFleet, Fleet, is_combined_fleet, PlayerSingleFleet, SingleFleet } from "@/models/fleet/Fleet";
import { SingleFleetFormationType } from "@/types";
import { PlaneEquip } from "@/models/equip/basic";
import { AACI_DATAS } from "@/datas/aaci";
import { calc_abyssal_fleet_weighted_anti_air, calc_player_fleet_weighted_anti_air } from "./weighted";
import { AbyssalFleetUnit, FleetUnit, PlayerFleetUnit } from "@/models/fleet/FleetUnit";
import { Node } from "@/models/Node";

const calc_combined_fleet_mod = (
    defender_unit: FleetUnit,
    node: Node,
): number => {
    if (defender_unit.fleet_type === 'single') return 1;
    if (defender_unit.fleet_type === 'escort') return 0.48;
    if (node.type.is_air_raid_only) return 0.72;
    return 0.8;
}

/**
 * 自艦隊による固定撃墜数を返す
 * @param weighted_anti_air 
 * @param target_unit 
 */
export function calc_player_fixed_shootdown_count(
    defender_unit: PlayerFleetUnit,
    aaci_type: AntiAirCutinType | 'Misfire',
    defender_fleet: PlayerSingleFleet,
    formation: SingleFleetFormationType,
    target_unit: PlaneEquip,
    node: Node,
): number {
    const abyssal_fleet_weighted_anti_air =
        calc_player_fleet_weighted_anti_air(defender_fleet, formation);

    const combined_fleet_mod = calc_combined_fleet_mod(defender_unit, node);

    return Math.floor(
        (
            Math.floor(defender_unit.ship.weighted_anti_air * target_unit.anti_air_resist_ship)
            + Math.floor(abyssal_fleet_weighted_anti_air * target_unit.anti_air_resist_fleet)
        ) * (aaci_type === 'Misfire' ? 1 : AACI_DATAS[aaci_type].mod) * combined_fleet_mod / 5
    );
}

/**
 * 敵艦隊による固定撃墜数を返す
 * @param weighted_anti_air 
 * @param target_unit 
 */
export function calc_abyssal_fixed_shootdown_count(
    defender_unit: AbyssalFleetUnit,
    aaci_type: AntiAirCutinType | 'Misfire',
    defender_fleet: AbyssalFleet,
    target_unit: PlaneEquip,
    node: Node,
): number {
    const abyssal_fleet_weighted_anti_air =
        calc_abyssal_fleet_weighted_anti_air(defender_fleet);

    const combined_fleet_mod = calc_combined_fleet_mod(defender_unit, node);

    return Math.floor(
        (
            Math.floor(defender_unit.ship.weighted_anti_air * target_unit.anti_air_resist_ship)
            + Math.floor(abyssal_fleet_weighted_anti_air * target_unit.anti_air_resist_fleet)
        ) * (aaci_type === 'Misfire' ? 1 : AACI_DATAS[aaci_type].mod) * combined_fleet_mod * 0.1875 // * 0.75 / 4
    );
}