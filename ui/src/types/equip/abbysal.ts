import { AACITriggerEquipType, EquipFitClass, Range, SkillTriggerEquipType, SpecialIcon } from "./player";
import { DeepReadonly } from "..";
import { AbyssalEquipType } from "@/datas/equip/base/abbysal";

export type AbyssalEquipData = {
    /** 装備名(EN) */
    name: string,
    /** 装備名(日) */
    nameJP: string,
    /** 装備種別ID */
    type: AbyssalEquipType,
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
    RNG?: Range,
    /** 命中 */
    ACC?: number,
    /** 加重対空に対する対空射撃回避 */
    AA_resist_ship?: number,
    /** 艦隊防空に対する対空射撃回避 */
    AA_resist_fleet?: number,
    /** 装備フィット種別ID(艦のものとは別?) */
    fit_class?: EquipFitClass,
    /** 重巡級が装備したときの夜戦における命中ボーナス値 */
    CA_NB_bonus?: number,
    /** T字不利回避能力があるか */
    can_avoid_T_disadvantage?: true,
    /** 対地攻撃可能な艦爆であるか */
    can_shell_install_bomber?: true,
    /** ロケット戦闘機であるか */
    is_rocket_fighter?: true,
    /** 夜偵系装備であるか */
    is_night_scout?: true,
    /** 集中配備系の装備であるか */
    is_concentrated?: true,
    /** 後期型潜水艦魚雷 専用夜戦カットインのトリガー装備であるか */
    is_special_submarine_CI_torigger?: true,
    /** 【爆雷】カテゴリであるか(￢含投射機) */
    is_DC_only?: true,
    /** 【爆雷投射機】カテゴリであるか(￢含爆雷) */
    is_DCP?: true,
    /** 爆雷の装甲減少補正 効果を持つか */
    can_ASW_penetrate?: true,
    /** Swordfish系統の装備であるか */
    is_Swordfish_family?: true,
    /** 対空噴進弾幕可能な装備であるか */
    can_barrage?: true,
    /** 反跳爆撃可能な爆撃機であるか */
    is_skip_bomber?: true,
    /** 隼(20戦隊)系統の装備であるか */
    is_20th_family?: true,
    /** 開幕雷撃"不可"な甲標的系装備であるか */
    can_not_op_torpedo_midgetsub?: true,
    /** 高高度爆撃可能な爆撃機であるか */
    high_altitude_bomber?: true,
}

export type AbyssalEquipDatas = DeepReadonly<Record<number, AbyssalEquipData>>