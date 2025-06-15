import { ShipId } from "@/types/brands/ship";
import { EquippedAbyssalShip } from "./base";
import { derive_abyssal_naked_ship } from "../naked/abyssal";

export function derive_equipped_abyssal_ship(
    id: ShipId,
): EquippedAbyssalShip {
    const naked_ship = derive_abyssal_naked_ship(
        lv,
        ship_id,
    );
}