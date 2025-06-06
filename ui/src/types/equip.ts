import { EquipType } from "@/datas/equip/base"
import { DeepReadonly } from "."

/** 特殊攻撃のトリガーになる装備の種別ID */
export const enum SkillTriggerEquipType {
    B_MAINGUN = 1,
    B_SECGUN = 2,
    B_RECON = 3,
    B_RADAR = 4,
    B_APSHELL = 5,
    B_SONAR = 6,
    B_DEPTHCHARGE = 7,
    B_TORPEDO = 8,
    B_TYPE3SHELL = 9,
    B_LC1 = 10,
    B_LC2 = 11,
    B_LC3 = 12,
    B_DEPTHCHARGE2 = 13,
    B_NIGHTFIGHTER = 14,
    B_NIGHTBOMBER = 15,
    B_NIGHTBOMBER2 = 16,
    B_NIGHTCREW = 17,
    B_OTHER = 0,
}

/** 対空CIのトリガーになる装備の種別ID */
export const enum AACITriggerEquipType {
    A_HAGUN = 1,
    A_AAFD = 2,
    A_HAFD = 3,
    A_MAINGUNL = 4,
    A_TYPE3SHELL = 5,
    A_AIRRADAR = 6,
    A_AAGUN = 7,
    A_GUN = 8,
    A_XLGUN = 9,
}

/** 装備フィット種別ID(艦のものとは別?) */
export type EquipFitClass =
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 101
    | 102

export type Range = 1 | 2 | 3 | 4 | 5

/** 装備種別とは別制御の装備アイコンID */
export const enum SpecialIcon {
    /** 深海14inch海峡連装砲 */
    AbyssalLargeCaliberMainGun = 1,
    /** 高角砲 */
    MainHighAngleGun = 16,
    /** 深海水中探信儀 & 深海調整電探 */
    AbyssalSmallSonar = 18,
    /** 橘花改(噴式景雲改とちょっと違う) */
    KikkaKai = 40,
    /** 陸上戦闘機(￢局戦) */
    ArmyLandBasedFighters = 44,
    /** 夜間戦闘機 */
    NightFighters = 45,
    /** 夜間攻撃機 */
    NightTorpedoBombers = 46,
    /** 陸上哨戒機 */
    LandBasedPatrolAircraft = 47,
    /** 陸上襲撃機 */
    LandBasedRaidAircraft = 48,
    /** 夜間偵察機 */
    NightScout = 50,
    /** 夜間瑞雲 */
    NightSeaplaneBombers = 51,
    /** 阻塞気球 */
    BarrageBalloons = 55,
    /** Me262 */
    JetLandBasedFighters = 56,
    /** 試製 震電(局地戦闘機) */
    PropulsionLandBasedFighters = 57,
    /** 夜間爆撃機 */
    NightDiveBombers = 58,
}

export type EquipData = {
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
    DIVEBOMB?: number,
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

export type EquipDatas = DeepReadonly<Record<number, EquipData>>

export type EquipFlags = {
    /** T字不利回避能力があるか */
    can_avoid_T_disadvantage: boolean,
    /** 対地攻撃可能な艦爆であるか */
    can_shell_install_bomber: boolean,
    /** ロケット戦闘機であるか */
    is_rocket_fighter: boolean,
    /** 夜偵系装備であるか */
    is_night_scout: boolean,
    /** 集中配備系の装備であるか */
    is_concentrated: boolean,
    /** 後期型潜水艦魚雷 専用夜戦カットインのトリガー装備であるか */
    is_special_submarine_CI_torigger: boolean,
    /** 【爆雷】カテゴリであるか(￢含投射機) */
    is_DC_only: boolean,
    /** 【爆雷投射機】カテゴリであるか(￢含爆雷) */
    is_DCP: boolean,
    /** 爆雷の装甲減少補正 効果を持つか */
    can_ASW_penetrate: boolean,
    /** Swordfish系統の装備であるか */
    is_Swordfish_family: boolean,
    /** 対空噴進弾幕可能な装備であるか */
    can_barrage: boolean,
    /** 反跳爆撃可能な爆撃機であるか */
    is_skip_bomber: boolean,
    /** 隼(20戦隊)系統の装備であるか */
    is_20th_family: boolean,
    /** 開幕雷撃"不可"な甲標的系装備であるか */
    can_not_op_torpedo_midgetsub: boolean,
    /** 高高度爆撃可能な爆撃機であるか */
    high_altitude_bomber: boolean,
}

export type EquipBonusType =
    | 'fire_power'
    | 'armor'
    | 'torpedo'
    | 'evasion'
    | 'anti_air'
    | 'asw'
    | 'los'
    | 'shell_accuracy'
    | 'range'
    | 'dive_bomb'