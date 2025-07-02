import { AbyssalEquippedShip, EquippedShip, PlayerEquippedShip } from "@/models/ship/equipped";
import { AntiAirCutinType } from "./cutin/conditions";
import { AbyssalSingleFleet, PlayerSingleFleet, SingleFleet } from "@/models/fleet/Fleet";
import { SingleFleetFormationType } from "@/types";
import { PlaneEquip } from "@/models/equip/basic";
import { AACI_DATAS } from "@/datas/aaci";
import { calc_abyssal_fleet_weighted_anti_air, calc_player_fleet_weighted_anti_air } from "./weighted";

/**
 * 自艦隊による固定撃墜数を返す
 * @param weighted_anti_air 
 * @param target_unit 
 */
export function calc_player_fixed_shootdown_count(
    defender_ship: PlayerEquippedShip,
    aaci_type: AntiAirCutinType | 'Misfire',
    defender_fleet: PlayerSingleFleet,
    formation: SingleFleetFormationType,
    target_unit: PlaneEquip,
): number {
    return Math.floor(
        (
            Math.floor(defender_ship.weighted_anti_air * target_unit.anti_air_resist_ship)
            + Math.floor(calc_player_fleet_weighted_anti_air(defender_fleet, formation) * target_unit.anti_air_resist_fleet)
        ) * (aaci_type === 'Misfire' ? 1 : AACI_DATAS[aaci_type].mod) / 5
    );
}

/**
 * 敵艦隊による固定撃墜数を返す
 * @param weighted_anti_air 
 * @param target_unit 
 */
export function calc_abyssal_fixed_shootdown_count(
    defender_ship: AbyssalEquippedShip,
    aaci_type: AntiAirCutinType | 'Misfire',
    defender_fleet: AbyssalSingleFleet,
    formation: SingleFleetFormationType,
    target_unit: PlaneEquip,
): number {
    const abyssal_fleet_weighted_anti_air =
        calc_abyssal_fleet_weighted_anti_air(defender_fleet, formation);

    console.log('艦隊防空: ', abyssal_fleet_weighted_anti_air);
    return Math.floor(
        (
            Math.floor(defender_ship.weighted_anti_air * target_unit.anti_air_resist_ship)
            + Math.floor(abyssal_fleet_weighted_anti_air * target_unit.anti_air_resist_fleet)
        ) * (aaci_type === 'Misfire' ? 1 : AACI_DATAS[aaci_type].mod) * 0.1875 // * 0.75 / 4
    );
}