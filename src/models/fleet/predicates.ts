import { COMBINED_FLEET_TYPES, CombinedFleetType, FleetType } from "./Fleet";
import { FleetUnit } from "./FleetUnit";

/**
 * 艦隊種別が連合艦隊系であるか判定して返す
 * @param fleet_type 
 * @returns 
 */
export function is_combined_fleet_type(
    fleet_type: FleetType,
): fleet_type is CombinedFleetType {
    return Object.keys(COMBINED_FLEET_TYPES).includes(fleet_type);
}

/**
 * 艦が旗艦であるか判定して返す(含 随伴艦隊旗艦)
 * @param unit 
 * @returns 
 */
export function is_flagship_unit(
    unit: FleetUnit,
): boolean {
    return unit.original_index === 0;
}