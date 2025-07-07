import { PlayerEquippedShip } from "@/models/ship/equipped";



function calcSurfaceShellPower(ship: PlayerEquippedShip): number {
    return ship.view_status.fire_power
        + ship.total_equip_improvement_addition.shell_power
        + 5;
}

function calcCVsShellPower(ship: PlayerEquippedShip): number {
    return ship.view_status.fire_power
        + ship.total_equip_improvement_addition.shell_power
        + ship.view_status.torpedo_power
        + ship.total_equip_improvement_addition.torpedo_power;
}