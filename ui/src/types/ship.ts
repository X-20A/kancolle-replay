// TODO: 制空シミュにAO_2が入ってるのでとりあえずこの形
// TODO: そのうち詰めてデータ照合テストとかは調停するようにしたい
/** 艦種 */
export const ShipType = {
    DE: 1,
    DD: 2,
    CL: 3,
    CLT: 4,
    CA: 5,
    CAV: 6,
    CVL: 7,
    FBB: 8,
    BB: 9,
    BBV: 10,
    CV: 11,
    BBB: 12,
    SS: 13,
    SSV: 14,
    // AO_2: 15,
    AV: 16,
    LHA: 17,
    CVB: 18,
    AR: 19,
    AS: 20,
    CT: 21,
    AO: 22,
    AT: 23,
} as const;
export type ShipType = typeof ShipType[keyof typeof ShipType];

export const enum UnclearLevel {
    Caution = 2,
    Alert = 3,
}

export type UnknownStatus = {
    EV?: UnclearLevel,
    ASW?: UnclearLevel,
    LOS?: UnclearLevel,
    LUK?: UnclearLevel,
    TP_ACC?: UnclearLevel,
}

// TODO: ユニオン共はconst enumにしたい

export type ShipClass =
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
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | 25
    | 26
    | 27
    | 28
    | 29
    | 30
    | 31
    | 32
    | 33
    | 34
    | 35
    | 36
    | 37
    | 38
    | 39
    | 40
    | 41
    // 42 // 欠番 霧の艦隊?
    | 43
    | 44
    | 45
    | 46
    | 47
    | 48
    | 49
    | 50
    | 51
    | 52
    | 53
    | 54
    | 55
    | 56
    | 57
    | 58
    | 59
    | 60
    | 61
    | 62
    | 63
    | 64
    | 65
    | 66
    | 67
    | 68
    | 69
    | 70
    | 71
    | 72
    | 73
    | 74
    | 75
    | 76
    | 77
    | 78
    | 79
    | 80
    | 81
    | 82
    | 83
    | 84
    | 85
    | 86
    | 87
    | 88
    | 89
    | 90
    | 91
    | 92
    | 93
    | 94
    | 95
    | 96
    | 97
    | 98
    | 99
    | 100
    | 101
    | 102
    | 103
    | 104
    | 105
    | 106
    | 107
    | 108
    | 109
    | 110
    | 111
    | 112
    | 113
    | 114
    | 115
    | 116
    | 117
    | 118
    | 119
    | 120
    | 121
    | 122
    | 123
    | 124
    | 125
    | 126
    | 127
    | 128
    | 129

export type ShipFitClass =
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
    | 12
    | 13

export type SpecialAttckId =
    | 100
    | 101
    | 102
    | 103
    | 104
    | 105

export enum SpecialItemId {
    None = 0, // なし
    Ribbon = 1, // 海色リボン
    Sash = 2, // 白たすき
}

export type InstallType = 1 | 2 | 3 | 4 | 5 | 6

// TODO: 追々はデータからオブジェクトまでPlayerとAbyssalで分けるべきだと思う
export type ShipData = {
    name: string,
    nameJP: string,
    type: ShipType,
    ship_class?: ShipClass,
    fit_class?: ShipFitClass,
    nid?: number,
    HP: number,
    HPmax?: number,
    FP: number,
    FPbase?: number,
    TP: number,
    TPbase?: number,
    AA: number,
    AAbase?: number,
    AR: number,
    ARbase?: number,
    EV: number,
    EVbase?: number,
    ASW: number,
    ASWbase?: number,
    LOS: number,
    LOSbase?: number,
    LUK: number,
    LUKmax?: number,
    RNG: number,
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
    always_OASW?: true,
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
    has_built_in_nightC_crew?: true,
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
    /** 開幕雷撃不可な潜水艦 */
    can_not_op_torpedo_submarine?: true,
    /** 無条件開幕雷撃可能な水上艦 */
    can_op_torpedo_surface_ship?: true,
    /** レーザー攻撃可能な艦であるか */
    can_laser?: true,
    canASW?: false | "either",
    canOASW?: false | "either",
    nightattack?: 1 | 2 | 3,
    attackSpecial?: SpecialAttckId,
    installtype?: InstallType,
    planeasw?: 0 | 2,
    unknownstats?: UnknownStatus,
    EQUIPS?: Array<number>,
    ACCbonus?: number,
}

export type ShipDatas = Record<number, ShipData>;

export type ShipFlags = {

}