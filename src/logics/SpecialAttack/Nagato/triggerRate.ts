import { FirstShip, SecondShip } from "@/types/fleet/ship";

export function calc_Nagato_special_trigger_rate(
    first_ship: FirstShip,
    second_ship: SecondShip,
): number {
    const lv_mod = Math.sqrt(first_ship.lv)
        + Math.sqrt(second_ship.lv);
    const luck_mod = Math.sqrt(first_ship.edited_status.luck)
        + Math.sqrt(second_ship.edited_status.luck);

    return Math.floor(
        lv_mod
        + 1.5 * luck_mod
        + 25
    );
}