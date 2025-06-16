import { AACITriggerEquipType, SkillTriggerEquipType, SpecialIcon } from "./player";
import { DeepReadonly } from "..";
import { EquipType } from "@/datas/equip/base/player";

export type AbyssalEquipData = {
    /** 装備名(EN) */
    name: string,
    /** 装備名(日) */
    nameJP: string,
    /** 装備種別ID */
    type: EquipType,
    /** 対空CIのトリガーになる装備の種別ID */
    a_type?: AACITriggerEquipType,
    /** 特殊攻撃のトリガーになる装備の種別ID */
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

export type AbyssalEquipFlags = {
    /** 集中配備系の装備であるか */
    is_concentrated: boolean,
    /** 反跳爆撃可能な爆撃機であるか */
    is_skip_bomber: boolean,
    /** 開幕雷撃"不可"な甲標的系装備であるか */
    can_not_op_torpedo_midgetsub: boolean,
    /** 高高度爆撃可能な爆撃機であるか */
    high_altitude_bomber: boolean,

    /**
     * 対潜攻撃力計算に有効な装備種別であるか    
     * https://wikiwiki.jp/kancolle/戦闘について#AntiSubmarine
     */
    is_contribute_asw_attack_power: boolean,
    can_equip_land_base: boolean,
    /**
     * 航空機であるか    
     * 熟練度をもつ
     */
    is_plane: boolean,
    /**
     * 制空状態の決定に関与する装備種別であるか    
     * 対空0でも敵の制空値が0の状況では制空に関与する    
     * https://wikiwiki.jp/kancolle/航空戦#AirSupremacy
     */
    is_involve_air_superiority: boolean,
    is_torpedo_bomber: boolean,
    can_contact: boolean,
    can_detect: boolean,
    is_dive_bomber: boolean,
    is_asw_plane: boolean,
    is_land_base_plane: boolean,
    is_jet: boolean,
    can_support_asw: boolean,
}

export type AbyssalEquipDatas = DeepReadonly<Record<number, AbyssalEquipData>>

