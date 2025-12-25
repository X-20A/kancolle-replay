import { is_married, PlayerEquippedShip } from "@/models/ship/equipped";

const calc_cost = (
    consumed_ratio: number,
    base_resource: number,
    married_mod: number,
): number => {
    return Math.floor(
        consumed_ratio * base_resource * married_mod
    );
}

const MARRIED_MOD = 0.85;

export function calc_consumed_resources(
    consumed_ratio: number,
    base_resource: number,
    ship: PlayerEquippedShip,
): number {
    return calc_cost(
        consumed_ratio,
        base_resource,
        is_married(ship) ? MARRIED_MOD : 1,
    )
}

export function calc_ship_consumed_resources(
    ship: PlayerEquippedShip,
): {
    fuel_cost: number,
    ammo_cost: number,
} {
    const {
        fuel_remain_ratio,
        ammo_remain_ratio,
    } = ship.state;

    const married_mod = is_married(ship) ? MARRIED_MOD : 1;

    const fuel_cost = calc_cost(
        1 - fuel_remain_ratio,
        ship.base_fuel,
        married_mod,
    );
    const ammo_cost = calc_cost(
        1 - ammo_remain_ratio,
        ship.base_ammo,
        married_mod,
    )
    return {
        fuel_cost,
        ammo_cost,
    }
}