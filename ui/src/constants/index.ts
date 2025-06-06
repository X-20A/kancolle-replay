import { ShipType } from "@/types/ship/ship";


/**
 * 航空機による対潜攻撃(planeasw)が可能な艦種のみを対象とした型
 * 必ずShipTypeのうち航空機運用可能な艦種のみを列挙すること
 * AO（補給艦）は航空機装備時のみ例外的に2となるため、ここには含めない
 */
export type PlaneAswCapableShipType =
    | typeof ShipType.CAV
    | typeof ShipType.CVL
    | typeof ShipType.BBV
    | typeof ShipType.AV
    | typeof ShipType.LHA;

/**
 * 各航空機運用艦種ごとのplaneaswデフォルト値
 * - CAV: 1
 * - CVL: 2
 * - BBV: 1
 * - AV: 1
 * - LHA: 1
 *
 * AO（補給艦）は 艦攻 | 艦爆 装備時のみ2となるため、ロジック側で個別に判定すること
 */
export const PLANE_ASW_BEHAVIOR_TYPE_DEFAULT: Record<PlaneAswCapableShipType, number> = {
    [ShipType.CAV]: 1,
    [ShipType.CVL]: 2,
    [ShipType.BBV]: 1,
    [ShipType.AV]: 1,
    [ShipType.LHA]: 1,
};