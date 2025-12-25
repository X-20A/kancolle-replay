import { NodeType } from "@/models/Node";

/// ノード種別ごとの資源消費
/// https://en.kancollewiki.net/Combat/Map_Mechanics_and_Nodes#Nodes

type RegacyNodeType =
    | 'World_6_Air_Raid'
    | 'Surface_Based_Anti_Submarine'

type ConsumptionDataKey = NodeType | RegacyNodeType

type ConsumptionData = {
    fuel_ratio: number,
    ammo_ratio: number,
}

type ConsumptionDatas = Record<ConsumptionDataKey, ConsumptionData>;

/**
 * Node種別ごとの消費資源割合
 */
export const CONSUMPTION_RATIOS: ConsumptionDatas = {
    Normal_Battle: { fuel_ratio: 0.2, ammo_ratio: 0.2 },
    Boss_Battle: { fuel_ratio: 0.2, ammo_ratio: 0.2 },
    Submarine_Only: { fuel_ratio: 0.08, ammo_ratio: 0 },
    PT_Only: { fuel_ratio: 0.04, ammo_ratio: 0.08 },
    Night_Battle: { fuel_ratio: 0.1, ammo_ratio: 0.1 },
    Airstrike_Supported_Battle: { fuel_ratio: 0.12, ammo_ratio: 0.06 },
    Air_Raid: { fuel_ratio: 0.06, ammo_ratio: 0.04 },
    Aerial_Combat: { fuel_ratio: 0.2, ammo_ratio: 0.2 },
    Enemy_Ambush: { fuel_ratio: 0.04, ammo_ratio: 0 },

    World_6_Air_Raid: { fuel_ratio: 0.04, ammo_ratio: 0.08 },
    Surface_Based_Anti_Submarine: { fuel_ratio: 0.2, ammo_ratio: 0.2 },
} as const;
