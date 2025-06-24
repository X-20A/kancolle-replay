import { EngagementType } from "@/logics/engagemenet"
import { SmokeScreenType } from "@/logics/smokeScreen"
import { FormationType } from "@/types"

/// Node単位に持たせる情報
/// Fleetとどっちに持たせるかのラインは微妙
/// ひとまずNode間で引き継いで欲しくない情報はこっちで

/** Node種別 */
type NodeType = {
    /** ボスマスであるか */
    is_boss: boolean,
    /** 開幕夜戦マスであるか */
    is_night_battle_only: boolean,
    /** 空襲戦マスであるか */
    is_air_raid_only: boolean,
    /** 航空戦マスであるか */
    is_aerial_combat: boolean,
    /** 対潜空襲マスであるか */
    is_airstrike_supported: boolean,
    /** レーダー射撃マスであるか */
    is_ambush: boolean,

    /** 潜水艦のみのマスであるか */
    is_ss_only: boolean,
}

type EachFormation = {
    own_formation: FormationType,
    enemy_formation: FormationType,
}

export type Node = {
    /** 何番目のNodeか 0オリジン */
    index: number,
    /** Node種別 */
    type: NodeType,
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