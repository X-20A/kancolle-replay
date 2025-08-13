import { PlayerEquippedShip } from "@/models/ship/equipped";

export function calc_Nagato_special_trigger_rate(
    flagship: PlayerEquippedShip,
    second_ship: PlayerEquippedShip,
): number {
    const lv_mod = Math.sqrt(flagship.lv)
        + Math.sqrt(second_ship.lv);
    const luck_mod = Math.sqrt(flagship.edited_status.luck)
        + Math.sqrt(second_ship.edited_status.luck);

    return Math.floor(
        lv_mod
        + 1.5 * luck_mod
        + 25
    );
}