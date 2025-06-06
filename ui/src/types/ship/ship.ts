import { DeepReadonly } from "..";

// TODO: 制空シミュにAO_2が入ってるのでとりあえずこの形
// TODO: そのうち詰めてデータ照合テストとかは調停するようにしたい
/** 艦種 */
export const enum ShipType {
    DE = 1,
    DD = 2,
    CL = 3,
    CLT = 4,
    CA = 5,
    CAV = 6,
    CVL = 7,
    FBB = 8, // ?
    BB = 9,
    BBV = 10,
    CV = 11,
    SS = 13,
    SSV = 14,
    // AO_2 = 15,
    AV = 16,
    LHA = 17,
    CVB = 18,
    AR = 19,
    AS = 20,
    CT = 21,
    AO = 22,
};

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

export type PlayerShipClass =
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

/** 旗艦時に発動し得る特殊砲撃の種別ID */
export const enum SpecialAttckId {
    NelsonTouch = 100,
    NagatoTouch = 101,
    MutsuTouch = 102,
    ColoradoTouch = 103,
    KongouTouch = 104,
    RichelieuTouch = 105,

    /** 艦データには無く、発動が確定した段階で付与されてる */
    YamatoTrioTouch = 400,
    YamatoDuoTouch = 401,
}

export enum SpecialItemId {
    None = 0, // なし
    Ribbon = 1, // 海色リボン
    Sash = 2, // 白たすき
}

/**
 * 陸上型種別ID    
 * 同じ系統の艦でもバージョンによって変わったりするので命名は目安
 */
export const enum InstallType {
    /** ソフトスキン(従来型) */
    RegularSoftModel = 1,
    /** 砲台・トーチカ */
    PillboxModel = 2,
    /** 集積地系 */
    SupplyDepotModel = 3,
    /** 離島・中枢棲姫系 */
    IsolatedIslandModel = 4,
    /** 北端上陸姫系 */
    NorthernmostModel = 5,
    /** 港湾棲姫系 */
    HarbourModel = 6,
} 

/**
 * 空母系の夜戦における振る舞いのパターンのID    
 * ややこいのでリンク先を参照のこと
 */
export const enum CVsNightAttackType {
    /** https://wikiwiki.jp/kancolle/大鷹改二#operation */
    TaiyoModel = 1,
    /** https://wikiwiki.jp/kancolle/Graf%20Zeppelin#NightBattle */
    GrafModel = 2,
    /** https://wikiwiki.jp/kancolle/護衛棲姫#about */
    ImohimeModel = 3,
}
/**
 * 対潜攻撃の振る舞いの型のID    
 * 実際に対潜攻撃可能であるかはどうしてもロジックが絡む    
 * https://wikiwiki.jp/kancolle/夜戦#heec6dd0
 */
export const enum PlaneCarrierAswBefavior {
    /** 爆雷投下攻撃のみ可能なタイプ */
    DropMotionModel = 1,
    /** 素対潜が0であるタイプ */
    BaseAswZeroModel = 2,
    /** 素対潜1以上なら対潜可能なタイプ */
    
}

// TODO: DOP的にはデータの型定義からもオプショナルを一掃したい
export type PlayerShipData = {
    name: string,
    nameJP: string,
    type: ShipType,
    ship_class: PlayerShipClass,
    fit_class?: ShipFitClass,
    nid: number,
    HP: number,
    HPmax: number,
    FP: number,
    FPbase: number,
    TP: number,
    TPbase: number,
    AA: number,
    AAbase: number,
    AR: number,
    ARbase: number,
    EV: number,
    EVbase: number,
    ASW: number,
    ASWbase: number,
    LOS: number,
    LOSbase: number,
    LUK: number,
    LUKmax: number,
    RNG: number,
    SLOTS: Array<number>,
    /** 最大燃料消費量 */
    fuel: number,
    /** 最大弾薬消費量 */
    ammo: number,
    /** 改造後艦ID */
    next_id: number,
    /** 改造前艦ID */
    prev_id: number,

    // 以下フラグ類

    /**
     * 無条件開幕対潜艦はtrue    
     * 大鷹型改/改二, 加賀改二護 にも付与されているが、    
     * 対潜値1以上の艦攻/艦爆 or 三式指揮連絡機(対潜) or 回転翼機を装備している場合のみ発動する    
     * ロジック側で実装すること
     */
    has_potential_always_OASW?: true,
    /** 高射装置内蔵艦(秋月型のみ 25/06/04)であるか */
    has_built_in_fire_director?: true,
    /**
     *  航空攻撃可能な補給艦であるか    
     *  実際の攻撃には航空機が必要
     */
    has_potential_air_attack?: true,
    /** 水上機が搭載可能な戦艦であるか */
    is_air_craft_carrier_BB?: true,
    /** 対潜劣後な軽空(鈴熊のみ 25/06/04)であるか */
    is_ASW_subordinated_CVL?: true,
    /** 海空立体攻撃 | 瑞雲立体攻撃 発動可能な艦であるか */
    has_potential_zuiun_CI?: true,
    /** 夜間作戦航空要員 内蔵艦であるか */
    has_built_in_night_crew?: true,
    /** 対PT特効 かつ 対PT優先ターゲティング 艦であるか */
    is_anti_PT_ship?: true,
    /** 対陸上型優先ターゲティング 艦であるか */
    is_anti_install_ship?: true,
    /** 条件次第で対潜攻撃可能なCV(加賀改二護)であるか */
    has_ASW_potential_CV?: true,
    /** 空母系の夜戦における振る舞いの型のID */
    CVs_night_attack_type?: CVsNightAttackType,
    /** 旗艦時に発動する特殊砲撃の種別ID */
    attack_special_ids?: SpecialAttckId[],
    // ?
    planeasw?: 0 | 2,
}

export type ShipDatas = DeepReadonly<Record<number, PlayerShipData>>;

export type PlayerShipFlags = {
    has_potential_always_OASW: boolean,
    /** 高射装置内蔵艦(秋月型のみ 25/06/04)であるか */
    has_built_in_fire_director: boolean,
    /**
     *  航空攻撃可能な補給艦であるか    
     *  実際の攻撃には航空機が必要
     */
    has_potential_air_attack: boolean,
    /** 水上機が搭載可能な戦艦であるか */
    is_air_craft_carrier_BB: boolean,
    /** 対潜劣後な軽空(鈴熊のみ 25/06/04)であるか */
    is_ASW_subordinated_CVL: boolean,
    /** 海空立体攻撃 | 瑞雲立体攻撃 発動可能な艦であるか */
    has_potential_zuiun_CI: boolean,
    /** 夜間作戦航空要員 内蔵艦であるか */
    has_built_in_night_crew: boolean,
    /** 対PT特効 かつ 対PT優先ターゲティング 艦であるか */
    is_anti_PT_ship: boolean,
    /** 対陸上型優先ターゲティング 艦であるか */
    is_anti_install_ship: boolean,
    /** 条件次第で対潜攻撃可能なCV(加賀改二護) */
    has_ASW_potential_CV: boolean,
}