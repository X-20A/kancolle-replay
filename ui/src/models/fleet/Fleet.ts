import { EquippedShip } from "../ship/equipped"

export type Fleet = {
    ships: EquippedShip[],
}

export function derive_fleet(
    ships: EquippedShip[],
): Fleet {
    return {
        ships,
    }
}