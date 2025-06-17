/// Node単位に持たせる情報
/// Fleetとどっちに持たせるかのラインは微妙
/// ひとまずNode間で引き継いで欲しくない情報はこっちで

import { EngagementType } from "@/logics/engagemenet"
import { SmokeScreenType } from "@/logics/smokeScreen"

type TriggeredSmokeScreenType = SmokeScreenType | null

export type Node = {
    index: number,
    is_detection_success: boolean,
    engagement_type: EngagementType,
    triggered_smoke_screen_type: TriggeredSmokeScreenType,
}