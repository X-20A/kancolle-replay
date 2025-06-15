import { EquippedPlayerShip } from "@/models/ship/equipped/base";
import { ShipType } from "@/wasm/kssw";

type HasPotentialOAswStrategy = (ship: EquippedPlayerShip) => number;

export const shipTypeStrategies: Record<ShipType, HasPotentialOAswStrategy> = {
    [ShipType.DE]: (ship) => calcSurfaceShellPower(ship),
    [ShipType.DD]: (ship) => calcSurfaceShellPower(ship),
    [ShipType.CL]: (ship) => calcSurfaceShellPower(ship),
    [ShipType.CLT]: (ship) => calcSurfaceShellPower(ship),
    [ShipType.CA]: (ship) => calcSurfaceShellPower(ship),
    [ShipType.CAV]: (ship) => calcSurfaceShellPower(ship),
    [ShipType.CVL]: (ship) => calcCVsShellPower(ship),
    [ShipType.FBB]: (ship) => calcSurfaceShellPower(ship),
    [ShipType.BB]: (ship) => calcSurfaceShellPower(ship),
    [ShipType.BBV]: (ship) => calcSurfaceShellPower(ship),
    [ShipType.CV]: (ship) => calcCVsShellPower(ship),
    [ShipType.SS]: () => 0, // NOTE: 砲戦不可を表す0 追々ちゃんとしたい
    [ShipType.SSV]: () => 0,
    [ShipType.AV]: (ship) => calcSurfaceShellPower(ship),
    [ShipType.LHA]: (ship) => calcSurfaceShellPower(ship),
    [ShipType.CVB]: (ship) => calcCVsShellPower(ship),
    [ShipType.AR]: (ship) => calcSurfaceShellPower(ship),
    [ShipType.AS]: (ship) => calcSurfaceShellPower(ship),
    [ShipType.CT]: (ship) => calcSurfaceShellPower(ship),
    [ShipType.AO]: (ship) => calcSurfaceShellPower(ship),
}

function calcSurfaceShellPower(ship: EquippedPlayerShip): number {
    return ship.view_status.fire_power
        + ship.total_equip_improvement_addition.shell_power
        + 5;
}

function calcCVsShellPower(ship: EquippedPlayerShip): number {
    return ship.view_status.fire_power
        + ship.total_equip_improvement_addition.shell_power
        + ship.view_status.torpedo_power
        + ship.total_equip_improvement_addition.torpedo_power;
}