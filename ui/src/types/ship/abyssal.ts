import { DeepReadonly } from "..";
import { CVsNightAttackType, InstallType, PlayerShipClass, ShipFitClass, ShipType, SpecialAttckId, UnknownStatus } from "./ship";

export type AbyssalShipData = {
    name: string,
    nameJP: string,
    type: ShipType,
    ship_class?: PlayerShipClass,
    fit_class?: ShipFitClass,
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
    /** 最大燃料消費量 */
    fuel?: number,
    /** 最大弾薬消費量 */
    ammo?: number,
    /** 改造後艦ID */
    next_id?: number,
    /** 改造前艦ID */
    prev_id?: number,
    /** 艦爆被弱点キャップ前補正値 */
    dive_bomb_weak_mod?: number,
    /** 陸攻被弱点キャップ前補正値 */
    land_based_weak_mod?: number,
    /**
     * 無条件開幕対潜艦はtrue    
     * 大鷹型改/改二, 加賀改二護 にも付与されているが、    
     * 対潜値1以上の艦攻/艦爆 or 三式指揮連絡機(対潜) or 回転翼機を装備している場合のみ発動する    
     * ロジック側で実装すること
     */
    has_potential_always_OASW?: true,
    /** 高射装置内蔵艦(秋月型のみ 25/06/04)であるか */
    has_buil_in_fire_director?: true,
    /**
     *  航空攻撃可能な補給艦であるか    
     *  実際の攻撃には航空機が必要
     */
    can_air_attack?: true,
    /** 水上機が搭載可能な戦艦であるか */
    is_air_craft_carrier_BB?: true,
    /** 対潜劣後な軽空(鈴熊のみ 25/06/04)であるか */
    is_ASW_subordinated_CVL?: true,
    /** 海空立体攻撃 | 瑞雲立体攻撃 発動可能な艦であるか */
    can_zuiun_CI?: true,
    /** 夜間作戦航空要員 内蔵艦であるか */
    has_built_in_night_crew?: true,
    /** 対PT特効 かつ 対PT優先ターゲティング 艦であるか */
    is_anti_PT_ship?: true,
    /** 対陸上型優先ターゲティング 艦であるか */
    is_anti_install_ship?: true,
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
    /** 集積地棲姫III バカンスmode系であるか */
    is_Supply_Depot?: true,
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
    /** 条件次第で対潜攻撃可能なCV(加賀改二護) */
    has_potential_ASW_CV?: true,
    /** 空母系の夜戦における振る舞いの型のID */
    CVs_night_attack_type?: CVsNightAttackType,
    /** 旗艦時に発動する特殊砲撃の種別ID */
    attack_special_ids?: SpecialAttckId[],

    install_type?: InstallType,

    planeasw?: 0 | 2,
    /** 正確な値が不明なステータス */
    unknownstats?: UnknownStatus,

    EQUIPS?: Array<number>,

    ACCbonus?: number,
}

export type AbyssalShipDatas = DeepReadonly<Record<number, AbyssalShipData>>;

export type AbyssalShipFlags = {
    has_potential_always_OASW: boolean,
    /** 高射装置内蔵艦(秋月型のみ 25/06/04)であるか */
    has_built_in_fire_director: boolean,
    /**
     *  航空攻撃可能な補給艦であるか    
     *  実際の攻撃には航空機が必要
     */
    can_air_attack: boolean,
    /** 水上機が搭載可能な戦艦であるか */
    is_ASW_subordinated_CVL: boolean,
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
    /** 集積地棲姫III バカンスmode系であるか */
    is_Supply_Depot: boolean,
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
    /** 条件次第で対潜攻撃可能なCV(加賀改二護) */
    has_ASW_potential_CV: boolean,
}