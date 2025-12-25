import { CONSUMPTION_RATIOS } from "@/datas/battle/consumption";
import { derive_player_fleet, is_combined_fleet, PlayerFleet } from "@/models/fleet/Fleet";
import { PlayerFleetUnit } from "@/models/fleet/FleetUnit";
import { NodeType } from "@/models/Node";
import { is_ship_on_the_front_line, PlayerEquippedShip } from "@/models/ship/equipped";

const DECIMAL_PRECISION = 5;
const SCALE = 10 ** DECIMAL_PRECISION;

const calc_remaining_ratio_after_consumption = (
    remain_ratio: number,
    consume_ratio: number,
): number => {
    const raw_value = remain_ratio - consume_ratio;

    const clamped_value = Math.max(0, raw_value);

    return Math.round(clamped_value * SCALE) / SCALE;
}

const consume_ship_resources = (
    ship: PlayerEquippedShip,
    consume_fuel_ratio: number,
    consume_ammo_ratio: number,
): PlayerEquippedShip => {
    if (!is_ship_on_the_front_line(ship)) {
        return ship;
    }

    const { fuel_remain_ratio, ammo_remain_ratio } = ship.state;

    return {
        ...ship,
        state: {
            ...ship.state,
            fuel_remain_ratio: calc_remaining_ratio_after_consumption(
                fuel_remain_ratio,
                consume_fuel_ratio,
            ),
            ammo_remain_ratio: calc_remaining_ratio_after_consumption(
                ammo_remain_ratio,
                consume_ammo_ratio,
            ),
        },
    };
};

const consume_fleet_units = (
    units: readonly PlayerFleetUnit[],
    consume_fuel_ratio: number,
    consume_ammo_ratio: number,
): PlayerEquippedShip[] =>
    units.map(unit =>
        consume_ship_resources(
            unit.ship,
            consume_fuel_ratio,
            consume_ammo_ratio,
        ),
    );

export function consume_cost(
    fleet: PlayerFleet,
    node_type: NodeType,
): PlayerFleet {
    const { fuel_ratio, ammo_ratio } = CONSUMPTION_RATIOS[node_type];

    const new_main_fleet_ships = consume_fleet_units(
        fleet.main_fleet_units,
        fuel_ratio,
        ammo_ratio,
    );

    if (!is_combined_fleet(fleet)) {
        return derive_player_fleet(new_main_fleet_ships);
    }

    const new_escort_fleet_ships = consume_fleet_units(
        fleet.escort_fleet_units,
        fuel_ratio,
        ammo_ratio,
    );

    return derive_player_fleet(
        new_main_fleet_ships,
        new_escort_fleet_ships,
    );
}

