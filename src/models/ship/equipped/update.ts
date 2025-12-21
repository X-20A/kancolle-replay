import { PlayerEquippedShip } from ".";
import { PlayerShipState } from "../state";

export const update_ship_state = (
    ship: PlayerEquippedShip,
    updates: Partial<PlayerShipState>
): PlayerEquippedShip => ({
    ...ship,
    state: {
        ...ship.state,
        ...updates
    }
});