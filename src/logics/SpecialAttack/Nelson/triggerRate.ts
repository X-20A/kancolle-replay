import { PlayerEquippedShip } from "@/models/ship/equipped";

export function calc_Nelson_special_trigger_rate(
    flagship: PlayerEquippedShip,
    third_ship: PlayerEquippedShip,
    fifth_ship: PlayerEquippedShip,
): number {
    return Math.floor(
        + 1.1 * Math.sqrt(flagship.lv)
        + Math.sqrt(third_ship.lv)
        + Math.sqrt(fifth_ship.lv)
        + 1.4 * Math.sqrt(flagship.edited_status.luck)
        + 25
    );
}