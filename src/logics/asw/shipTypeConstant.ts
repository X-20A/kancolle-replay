import { PlayerEquippedShip } from "@/models/ship/equipped";
import { ShipTypeBase } from "@/types/ship/ship";

const calcBasicAswAttackStrategies = (type_id: ShipTypeBase) => {
    const WITH_DROP_EFFECT = 13;
    const NON_DROP_EFFECT = 8;

    return 1;
};


export function calcShipTypeConstant(ship: PlayerEquippedShip): number {
    
    return calcBasicAswAttackStrategies(ship.type_id);
}