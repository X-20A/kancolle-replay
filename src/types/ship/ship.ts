import { AbyssalShipType } from "./abyssal";
import { PlayerShipNameJP } from "./playerNameJP";
import { PlayerShipId } from "./playerShipId";
import { PlayerShipClass } from "./shipClass";

// TODO: 制空シミュにAO_2が入ってるのでとりあえずこの形
// TODO: そのうち詰めてデータ照合テストとかは調停するようにしたい

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

export const SHIP_TYPE = {
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
    SS: 13,
    SSV: 14,
    AV: 16,
    LHA: 17,
    CVB: 18,
    AR: 19,
    AS: 20,
    CT: 21,
    AO: 22,
} as const

export type ShipTypeBase = keyof typeof SHIP_TYPE

export type ShipType = ShipTypeBase | AbyssalShipType

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

export type ModernizationType = {
    hp?: number,
    asw?: number,
    luck?: number,
}

export enum SpecialItemId {
    None = 0, // なし
    Ribbon = 1, // 海色リボン
    Sash = 2, // 白たすき
}

const INSTALL_TYPE_IDS = {
    /** 陸上型でない */
    No: 0,
    /** ソフトスキン(従来型) */
    RegularSoftModel: 1,
    /** 砲台・トーチカ */
    PillboxModel: 2,
    /** 集積地系 */
    SupplyDepotModel: 3,
    /** 離島・中枢棲姫系 */
    IsolatedIslandModel: 4,
    /** 北端上陸姫系 */
    NorthernmostModel: 5,
    /** 港湾棲姫系 */
    HarbourModel: 6,
} as const;
/**
 * 陸上型種別ID    
 * 同じ系統の艦でもバージョンによって変わったりするので命名は目安
 */
export type InstallType = keyof typeof INSTALL_TYPE_IDS

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
    name_jp: PlayerShipNameJP,
    type: ShipTypeBase,
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
    next_id: PlayerShipId | 'None',
    /** 改造前艦ID */
    prev_id: PlayerShipId | 'None',

    // 以下フラグ類

    /**
     * 先制対潜条件が緩い空母級    
     * 大鷹型改/改二, 加賀改二護    
     * https://wikiwiki.jp/kancolle/対潜攻撃#trigger_conditions   
     */
    has_advantage_OASW_CVs?: true,
    /**
     * 無条件開幕対潜艦であるか
     */
    can_unconditional_OASW?: true,
    /** 高射装置内蔵艦(秋月型のみ 25/06/04)であるか */
    has_built_in_fire_director?: true,
    /**
     *  航空攻撃可能な補給艦であるか    
     *  実際の攻撃には航空機が必要
     */
    has_potential_air_attack?: true,
    /**
     *  夜戦航空攻撃可能な補給艦であるか    
     *  実際の攻撃には航空機が必要
     */
    has_potential_air_attack_in_NB?: true,
    /** 水上機が搭載可能な戦艦であるか */
    is_air_craft_carrier_BB?: true,
    /** 対潜劣後な軽空(鈴熊のみ 25/06/04)であるか */
    is_ASW_subordinated_CVL?: true,
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
    /**
     * 空母系の対潜挙動ID    
     * ! データ駆動にあらず
     */
    planeasw?: 0 | 2,
}

export type ShipDatas = Record<PlayerShipId, PlayerShipData>;

export type PlayerNakedShipFlags = {
    /**
     * 先制対潜条件が緩い空母級    
     * 大鷹型改/改二, 加賀改二護    
     * https://wikiwiki.jp/kancolle/対潜攻撃#trigger_conditions   
     */
    has_advantage_OASW_CVs: boolean,
    /**
     * 無条件開幕対潜艦であるか
     */
    can_unconditional_OASW: boolean,
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
    /** 夜間作戦航空要員 内蔵艦であるか */
    has_built_in_night_crew: boolean,
    /** 対PT特効 かつ 対PT優先ターゲティング 艦であるか */
    is_anti_PT_ship: boolean,
    /** 対陸上型優先ターゲティング 艦であるか */
    is_anti_install_ship: boolean,
    /** 条件次第で対潜攻撃可能なCV(加賀改二護) */
    has_ASW_potential_CV: boolean,
}