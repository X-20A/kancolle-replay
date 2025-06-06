import { ShipType } from "@/types/ship/ship";
import { PlayerShip } from "../Ship";

type ShipStrategy = (ship: PlayerShip) => boolean;

const shipStrategies: Record<ShipType, ShipStrategy> = {
    [ShipType.DE]: (ship) => isNakedAswPositive(ship),
    [ShipType.DD]: (ship) => isNakedAswPositive(ship),
    [ShipType.CL]: (ship) => isNakedAswPositive(ship),
    [ShipType.CLT]: (ship) => isNakedAswPositive(ship),
    [ShipType.CA]: (ship) => ,
    [ShipType.CAV]: (ship) => ,
    [ShipType.CVL]: (ship) => ,
    [ShipType.FBB]: (ship) => ,
    [ShipType.BB]: (ship) => ,
    [ShipType.BBV]: (ship) => ,
    [ShipType.CV]: (ship) => ,
    [ShipType.SS]: (ship) => ,
    [ShipType.SSV]: (ship) => ,
    [ShipType.AV]: (ship) => ,
    [ShipType.LHA]: (ship) => ,
    [ShipType.CVB]: (ship) => ,
    [ShipType.AR]: (ship) => ,
    [ShipType.AS]: (ship) => ,
    [ShipType.CT]: (ship) => ,
    [ShipType.AO]: (ship) => ,
};

/**
 * 艦の素の対潜値が1以上か判定して返す
 * @param ship 
 * @returns 
 */
function isNakedAswPositive(ship: PlayerShip): boolean {
    return ship.naked_status.asw >= 1;
}