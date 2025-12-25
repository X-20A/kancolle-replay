import { UserSettings } from "@/core/flows/normal"
import { EngagementType } from "@/logics/engagemenet"
import { SmokeScreenType } from "@/logics/smokeScreen"
import { FormationType } from "@/types"

/// Node単位に持たせる情報
/// Fleetとどっちに持たせるかのラインは微妙
/// ひとまずNode間で引き継いで欲しくない情報はこっちで

/**
 * Node種別    
 * 払暁戦は一旦見送り
 */
export type NodeType =
    | 'Normal_Battle'
    | 'Boss_Battle'
    | 'Submarine_Only'
    | 'PT_Only'
    | 'Night_Battle'
    | 'Airstrike_Supported_Battle'
    | 'Air_Raid'
    | 'Aerial_Combat'
    | 'Enemy_Ambush'
    | 'World_6_Air_Raid'
    | 'Surface_Based_Anti_Submarine'

type EachFormation = {
    own_formation: FormationType,
    enemy_formation: FormationType,
}

export type Node = {
    /** 何番目のNodeか 0オリジン */
    index: number,
    /** Node種別 */
    node_type: NodeType,
    /** 
     * 索敵フェイズ成否    
     * 索敵フェイズ以前はnull
     */
    is_detection_success: boolean | null,
    /**
     * 交戦形態    
     * 決定前はnull
     */
    engagement_type: EngagementType | null,
    /**
     * 発動した煙幕種別    
     * 煙幕フェイズ前はnull
     */
    triggered_smoke_screen_type: SmokeScreenType | null,
    /**
     * 彼我の指定陣形
     */
    each_formation: EachFormation,
}

export function derive_node(
    node_type?: NodeType,
): Node {
    return {
        index: 0,
        node_type: node_type ?? 'Normal_Battle',
        is_detection_success: null,
        engagement_type: null,
        triggered_smoke_screen_type: null,
        each_formation: {
            own_formation: 'LineAhead',
            enemy_formation: 'LineAhead',
        },
    };
}