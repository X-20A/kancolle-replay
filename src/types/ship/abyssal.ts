import { AbyssalEquipId } from "../equip/abyssalId";
import { AbyssalShipId } from "./abyssalId";
import { AbyssalShipNameJP } from "./abyssalNameJP";
import { CVsNightAttackType, InstallType, ShipTypeBase, UnknownStatus } from "./ship";

// TODO: CVB, LHAは含まないがまあそのうち
export type AbyssalShipType = ShipTypeBase | 'AT'

export type WarningType =
    | 'LBAS_Mod_Boss_unknown'

export type AbyssalShipData = {
    name: string,
    name_jp: AbyssalShipNameJP,
    type: AbyssalShipType,
    HP: number,
    FP: number,
    TP: number,
    AA: number,
    AR: number,
    EV: number,
    ASW: number,
    LOS: number,
    LUK: number,
    RNG: number,
    /** 雷撃命中 */
    TP_ACC?: number,
    SLOTS: Array<number>,
    EQUIPS?: AbyssalEquipId[],
    warning?: WarningType,
    /** 無条件開幕対潜艦はtrue */
    can_OASW?: true,
    /**
     *  航空攻撃可能な補給艦であるか    
     *  実際の攻撃には航空機が必要
     */
    /** 夜間作戦航空要員 内蔵艦であるか */
    has_built_in_night_crew?: true,
    /** 空母CI"不可能"艦であるか */
    can_not_CVCI?: true,
    /** PT系(含S boat)の艦であるか */
    is_PT?: true,
    /** 戦艦夏姫系であるか */
    is_Summer_BB?: true,
    /** 重巡夏姫系であるか */
    is_Summer_CA?: true,
    /** 戦艦仏棲姫系であるか */
    is_French_BB?: true,
    /** 泊地水鬼 バカンスmode系であるか */
    is_Anchorage?: true,
    /** 空母夏鬼であるか */
    is_Summer_CV?: true,
    /** 船渠棲姫系であるか */
    is_Dock?: true,
    /** 水上型の集積地であるか */
    is_float_Supply_Depot?: true,
    /** 連合艦隊主力艦隊からでも開幕雷撃可能な艦であるか */
    can_op_torpedo_from_main_fleet?: true,
    /** 夜戦行動不可な艦であるか */
    can_not_NB?: true,
    /** 砲撃戦不可な艦であるか */
    can_not_shell?: true,
    /** 開幕雷撃不可な潜水艦であるか */
    can_not_op_torpedo_submarine?: true,
    /** 無条件開幕雷撃可能な水上艦であるか */
    can_op_torpedo_surface_ship?: true,
    /** 空母系の夜戦における振る舞いの型のID */
    CVs_night_attack_type?: CVsNightAttackType,

    install_type?: InstallType,

    planeasw?: 0 | 2,
    /** 正確な値が不明なステータス */
    unknown_status?: UnknownStatus,
}

export type AbyssalShipDatas = Record<AbyssalShipId, AbyssalShipData>

export type AbyssalNakedShipFlags = {
    /** 無条件開幕対潜艦はtrue */
    can_OASW: boolean,
    /**
     *  航空攻撃可能な補給艦であるか    
     *  実際の攻撃には航空機が必要
     */
    /** 夜間作戦航空要員 内蔵艦であるか */
    has_built_in_night_crew: boolean,
    /** 空母CI"不可能"艦であるか */
    can_not_CVCI: boolean,
    /** PT系(含S boat)の艦であるか */
    is_PT: boolean,
    /** 戦艦夏姫系であるか */
    is_Summer_BB: boolean,
    /** 重巡夏姫系であるか */
    is_Summer_CA: boolean,
    /** 戦艦仏棲姫系であるか */
    is_French_BB: boolean,
    /** 泊地水鬼 バカンスmode系であるか */
    is_Anchorage: boolean,
    /** 空母夏鬼であるか */
    is_Summer_CV: boolean,
    /** 船渠棲姫系であるか */
    is_Dock: boolean,
    /** 水上型の集積地であるか */
    is_float_Supply_Depot: boolean,
    /** 連合艦隊主力艦隊からでも開幕雷撃可能な艦であるか */
    can_op_torpedo_from_main_fleet: boolean,
    /** 夜戦行動不可な艦であるか */
    can_not_NB: boolean,
    /** 砲撃戦不可な艦であるか */
    can_not_shell: boolean,
    /** 開幕雷撃不可な潜水艦であるか */
    can_not_op_torpedo_submarine: boolean,
    /** 無条件開幕雷撃可能な水上艦であるか */
    can_op_torpedo_surface_ship: boolean,

    /** 対潜空襲マスにおける無敵空母であるか */
    is_faraway: boolean,
}