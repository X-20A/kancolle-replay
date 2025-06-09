import { PlayerShip } from "@/models/ship/Ship";
import { ShipType } from "@/types/ship/ship";

type HasPotentialOAswStrategy = (ship: PlayerShip) => boolean;

/**
 * 艦種として対潜攻撃のポテンシャルがあるかを返す    
 * 艦・装備・艦載機残存数の判定はRust    
 * https://wikiwiki.jp/kancolle/戦闘について#AntiSubmarine
 */
const shipStrategies: Record<ShipType, HasPotentialOAswStrategy> = {
    [ShipType.DE]: (ship) => ship.flags.asw_equip.has_sonar && hasViewAsw60(ship),
    [ShipType.DD]: (ship) => hasViewAsw100(ship),
    [ShipType.CL]: (ship) => hasViewAsw100(ship),
    [ShipType.CLT]: (ship) => hasViewAsw100(ship),
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
    [ShipType.CT]: (ship) => hasViewAsw100(ship),
    [ShipType.AO]: (ship) => isNakedAswPositive(ship),
};

/**
 * 艦の表示対潜ステータスが100以上であるか判定して返す
 * @param ship 
 * @returns 
 */
function hasViewAsw100(ship: PlayerShip): boolean {
    return calcViewAsw(ship) >= 100;
}

/**
 * 艦の表示対潜ステータスが60以上であるか判定して返す
 * @param ship 
 * @returns 
 */
function hasViewAsw60(ship: PlayerShip): boolean {
    return calcViewAsw(ship) >= 60;
}

function calcViewAsw(ship: PlayerShip): number {
    return ship.naked_status.asw
        + ship.total_natural_equip_addition.asw
        + ship.total_equip_bonus_addition.asw
}

function calcHasPotentialOASW(ship: PlayerShip): boolean {
    if (ship.flags)

    const strategy = shipStrategies[ship.type_id];

    return strategy(ship);
}