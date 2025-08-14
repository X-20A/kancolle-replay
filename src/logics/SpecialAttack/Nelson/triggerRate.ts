import { PlayerEquippedShip } from "@/models/ship/equipped";
import { FifthShip, FirstShip, ThirdShip } from "@/types/fleet/ship";

export function calc_Nelson_special_trigger_rate(
    first_ship: FirstShip,
    third_ship: ThirdShip,
    fifth_ship: FifthShip,
): number {
    return Math.floor(
        + 1.1 * Math.sqrt(first_ship.lv)
        + Math.sqrt(third_ship.lv)
        + Math.sqrt(fifth_ship.lv)
        + 1.4 * Math.sqrt(first_ship.edited_status.luck)
        + 25
    );
}