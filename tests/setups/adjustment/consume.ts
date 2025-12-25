import { consume_cost } from "@/logics/consume";
import { PlayerFleet } from "@/models/fleet/Fleet";
import { NodeType } from "@/models/Node";

/**
 * 複数ノード分の消費を順に適用する
 * @param fleet 
 * @param node_types 
 * @returns 
 */
export function consume_cost_sequence(
    fleet: PlayerFleet,
    node_types: readonly NodeType[],
): PlayerFleet {
    return node_types.reduce(
        (current_fleet, node_type) =>
            consume_cost(current_fleet, node_type),
        fleet,
    );
}