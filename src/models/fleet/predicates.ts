import { COMBINED_FLEET_TYPES, CombinedFleetType, FleetType } from "./Fleet";

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