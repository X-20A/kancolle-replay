import { EquippedShip } from "@/models/ship/equipped";
import { AntiAirCutinType } from "./cutin/conditions";
import { SingleFleet } from "@/models/fleet/Fleet";
import { SingleFleetFormationType } from "@/types";
import { PlaneEquip } from "@/models/equip/basic";
import { AACI_DATAS } from "@/datas/aaci";
import { calc_own_fleet_weighted_anti_air } from "./weighted";

/**
 * 艦隊の固定撃墜数を返す
 * @param weighted_anti_air 
 * @param target_unit 
 */
export function calc_fixed_shotdown_count(
    defender_ship: EquippedShip,
    aaci_type: AntiAirCutinType | 'Misfire',
    defender_fleet: SingleFleet,
    formation: SingleFleetFormationType,
    target_unit: PlaneEquip,
): number {
    return Math.floor(
        (
            Math.floor(defender_ship.weighted_anti_air * target_unit.anti_air_resist_ship)
            + Math.floor(calc_own_fleet_weighted_anti_air(defender_fleet, formation) * target_unit.anti_air_resist_fleet)
        ) * (aaci_type === 'Misfire' ? 1 : AACI_DATAS[aaci_type].mod) / 5
    );
}