import { PlayerShip } from "@/models/ship/Ship";
import { ShipType } from "@/types/ship/ship";

type CalcBasicAswAttackStrategy = (ship: PlayerShip) => number;

const WITH_DROP_EFFECT_VALUE = 13;

const NON_DROP_EFFECT_VALUE = 8;
/*
const calcBasicAswAttackStrategies: Record<ShipType, CalcBasicAswAttackStrategy> = {
    [ShipType.DE]: (ship) => WITH_DROP_EFFECT_VALUE,
    [ShipType.DD]: (ship) => WITH_DROP_EFFECT_VALUE,
    [ShipType.CL]: (ship) => WITH_DROP_EFFECT_VALUE,
    [ShipType.CLT]: (ship) => WITH_DROP_EFFECT_VALUE,
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


export function calcBasicAswAttackPower(ship: PlayerShip): number {
    const strategy = calcBasicAswAttackStrategies[ship.type_id];
    
    return strategy(ship);
}*/