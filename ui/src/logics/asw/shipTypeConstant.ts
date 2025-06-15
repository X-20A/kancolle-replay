import { EquippedPlayerShip } from "@/models/ship/equipped/base";
import { ShipType } from "@/types/ship/ship";

type calcShipTypeConstantStrategy = (ship: EquippedPlayerShip) => number;

const calcBasicAswAttackStrategies: Record<ShipType, calcShipTypeConstantStrategy> = (() => {
    const WITH_DROP_EFFECT = 13;
    const NON_DROP_EFFECT = 8;

    /**
     * 対潜攻撃不可なものの目印として一旦0を返すように    
     * TODO: 型かなんかでいい感じに縛りたい
     */
    const IMPOSSIBLE_ASW = 0;

    return {
        [ShipType.DE]: () => WITH_DROP_EFFECT,
        [ShipType.DD]: () => WITH_DROP_EFFECT,
        [ShipType.CL]: () => WITH_DROP_EFFECT,
        [ShipType.CLT]: () => WITH_DROP_EFFECT,
        [ShipType.CA]: () => IMPOSSIBLE_ASW,
        [ShipType.CAV]: () => NON_DROP_EFFECT,
        [ShipType.CVL]: () => NON_DROP_EFFECT,
        [ShipType.FBB]: () => NON_DROP_EFFECT,
        [ShipType.BB]: () => IMPOSSIBLE_ASW,
        [ShipType.BBV]: () => NON_DROP_EFFECT,
        [ShipType.CV]: () => NON_DROP_EFFECT,
        [ShipType.SS]: () => IMPOSSIBLE_ASW,
        [ShipType.SSV]: () => IMPOSSIBLE_ASW,
        [ShipType.AV]: () => NON_DROP_EFFECT,
        [ShipType.LHA]: () => NON_DROP_EFFECT,
        [ShipType.CVB]: () => IMPOSSIBLE_ASW,
        [ShipType.AR]: () => NON_DROP_EFFECT,
        [ShipType.AS]: () => NON_DROP_EFFECT,
        [ShipType.CT]: () => NON_DROP_EFFECT,
        [ShipType.AO]: (ship) => {
            return ship.flags.asw_equip.has_any_plane_bomber ? WITH_DROP_EFFECT : NON_DROP_EFFECT;
        },
    };
})();


export function calcShipTypeConstant(ship: EquippedPlayerShip): number {
    const strategy = calcBasicAswAttackStrategies[ship.type_id];
    
    return strategy(ship);
}