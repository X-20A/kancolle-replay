import { AACITriggerEquipType, SkillTriggerEquipType, SpecialIcon } from "./player";
import { DeepReadonly } from "..";
import { EquipType } from "@/datas/equip/base/player";
import { AbyssalEquipNameJP } from "./abyssalNameJP";
import { AbyssalEquipId } from "./abyssalId";

export type AbyssalEquipData = {
    /** 装備名(EN) */
    name: string,
    /** 装備名(日) */
    name_jp: AbyssalEquipNameJP,
    /** 装備種別ID */
    type: EquipType,
    /** 対空CIのトリガーになる装備の種別ID */
    aaci_type: AACITriggerEquipType,
    /**
     * 特殊攻撃のトリガーになる装備の種別ID    
     * ! データ駆動にあらず
     */
    b_type?: SkillTriggerEquipType,
    /** 装備種別とは別制御の装備アイコンID */
    icon?: SpecialIcon,
    /** 火力 */
    FP?: number,
    /** 雷装 */
    TP?: number,
    /** 対空 */
    AA?: number,
    /** 回避 */
    EV?: number,
    /** 装甲 */
    AR?: number,
    /** 対潜 */
    ASW?: number,
    /** 索敵 */
    LOS?: number,
    /** 爆装 */
    AERIAL_BOMB?: number,
    /** 艦攻雷装 */
    AERIAL_TP?: number,
    /** 対爆 */
    AB?: number,
    /** 迎撃 */
    IN?: number,
    /** 射程 */
    RNG?: number,
    /** 命中 */
    ACC?: number,
    /** 加重対空に対する対空射撃回避 */
    AA_resist_ship?: number,
    /** 艦隊防空に対する対空射撃回避 */
    AA_resist_fleet?: number,
    /** 集中配備系の装備であるか */
    is_concentrated?: true,
    /** 反跳爆撃可能な爆撃機であるか */
    is_skip_bomber?: true,
    /** 開幕雷撃"不可"な甲標的系装備であるか */
    can_not_op_torpedo_midgetsub?: true,
    /** 高高度爆撃可能な爆撃機であるか */
    high_altitude_bomber?: true,
}



export type AbyssalEquipDatas = DeepReadonly<Record<AbyssalEquipId, AbyssalEquipData>>

