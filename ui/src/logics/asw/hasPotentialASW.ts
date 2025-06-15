import { EquippedPlayerShip } from "@/models/ship/equipped/base";
import { ShipType } from "@/types/ship/ship";
type HasPotentialAswStrategy = (ship: EquippedPlayerShip) => boolean;

/**
 * 艦種として対潜攻撃のポテンシャルがあるかを返す    
 * 艦・装備・艦載機残存数の判定はRust    
 * https://wikiwiki.jp/kancolle/戦闘について#AntiSubmarine
 */
const hasPotentialAswStrategies: Record<ShipType, HasPotentialAswStrategy> = {
    [ShipType.DE]: (ship) => isNakedAswPositive(ship),
    [ShipType.DD]: (ship) => isNakedAswPositive(ship),
    [ShipType.CL]: (ship) => isNakedAswPositive(ship),
    [ShipType.CLT]: (ship) => isNakedAswPositive(ship),
    [ShipType.CA]: (ship) => false,
    [ShipType.CAV]: (ship) => true,
    [ShipType.CVL]: (ship) => true,
    [ShipType.FBB]: (ship) => false,
    [ShipType.BB]: (ship) => false,
    [ShipType.BBV]: (ship) => true,
    [ShipType.CV]: (ship) => true,
    [ShipType.SS]: (ship) => false,
    [ShipType.SSV]: (ship) => false,
    [ShipType.AV]: (ship) => true,
    [ShipType.LHA]: (ship) => true,
    [ShipType.CVB]: (ship) => false,
    [ShipType.AR]: (ship) => false,
    [ShipType.AS]: (ship) => false,
    [ShipType.CT]: (ship) => isNakedAswPositive(ship),
    [ShipType.AO]: (ship) => isNakedAswPositive(ship),
};

/**
 * 艦の素の対潜値が1以上か判定して返す
 * @param ship 
 * @returns 
 */
function isNakedAswPositive(ship: EquippedPlayerShip): boolean {
    return ship.naked_status.asw >= 1;
}