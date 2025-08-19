import { PlayerEquippedShip } from "@/models/ship/equipped";
import { ShipType } from "@/types/ship/ship";


/**
 * 艦の素の対潜値が1以上か判定して返す
 * @param ship 
 * @returns 
 */
function isNakedAswPositive(ship: PlayerEquippedShip): boolean {
    return ship.naked_status.asw_power >= 1;
}