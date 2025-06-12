use serde::{Deserialize, Serialize};
use tsify::Tsify;/* 

use std::collections::HashMap;

use super::ship_class::PlayerShipClass;*/

/// 艦種ID
#[repr(u8)]
#[derive(Tsify)]
#[tsify(namespace)]
pub enum ShipType {
	/// 海防艦
    DE = 1,
    DD = 2,
    CL = 3,
    CLT = 4,
    CA = 5,
    CAV = 6,
    CVL = 7,
    FBB = 8,
    BB = 9,
    BBV = 10,
    CV = 11,
    SS = 13,
    SSV = 14,
    AV = 16,
    LHA = 17,
    CVB = 18,
    AR = 19,
    AS = 20,
    CT = 21,
    AO = 22,
}/* 

pub enum UnclearLevel {
    Caution = 2,
    Alert = 3,
}

pub enum PlaneCarrierAswBehaviorType {
	Zero,
	One,
	Two,
}

pub struct PlayerShipData {
	name: String,
    nameJP: String,
    type_id: ShipType,
    ship_class: PlayerShipClass,
    fit_class: Option<ShipFitClass>,
    nid: u32,
    HP: u32,
    HPmax: u32,
    FP: u32,
    FPbase: u32,
    TP: u32,
    TPbase: u32,
    AA: u32,
    AAbase: u32,
    AR: u32,
    ARbase: u32,
    EV: u32,
    EVbase: u32,
    ASW: u32,
    ASWbase: u32,
    LOS: u32,
    LOSbase: u32,
    LUK: u32,
    LUKmax: u32,
    RNG: u32,
    SLOTS: Vec<u32>,
    /** 最大燃料消費量 */
    fuel: u32,
    /** 最大弾薬消費量 */
    ammo: u32,
    /** 改造後艦ID */
    next_id: u32,
    /** 改造前艦ID */
    prev_id: u32,

    // 以下フラグ類

    /**
     * 先制対潜条件が緩い空母級    
     * 大鷹型改/改二, 加賀改二護    
     * https://wikiwiki.jp/kancolle/対潜攻撃#trigger_conditions   
     */
    has_advantage_OASW_CVs: Option<()>,
    /**
     * 無条件開幕対潜艦であるか
     */
    can_unconditional_OASW: Option<()>,
    /** 高射装置内蔵艦(秋月型のみ 25/06/04)であるか */
    has_built_in_fire_director: Option<()>,
    /**
     *  航空攻撃可能な補給艦であるか    
     *  実際の攻撃には航空機が必要
     */
    has_potential_air_attack: Option<()>,
    /** 水上機が搭載可能な戦艦であるか */
    is_air_craft_carrier_BB: Option<()>,
    /** 対潜劣後な軽空(鈴熊のみ 25/06/04)であるか */
    is_ASW_subordinated_CVL: Option<()>,
    /** 海空立体攻撃 | 瑞雲立体攻撃 発動可能な艦であるか */
    has_potential_zuiun_CI: Option<()>,
    /** 夜間作戦航空要員 内蔵艦であるか */
    has_built_in_night_crew: Option<()>,
    /** 対PT特効 かつ 対PT優先ターゲティング 艦であるか */
    is_anti_PT_ship: Option<()>,
    /** 対陸上型優先ターゲティング 艦であるか */
    is_anti_install_ship: Option<()>,
    /** 条件次第で対潜攻撃可能なCV(加賀改二護)であるか */
    has_ASW_potential_CV: Option<()>,
    /** 空母系の夜戦における振る舞いの型のID */
    CVs_night_attack_type: Option<CVsNightAttackType>,
    /** 旗艦時に発動する特殊砲撃の種別ID */
    attack_special_ids: Option<Vec<SpecialAttckId>>,
    /**
     * 空母系の対潜挙動ID    
     * ! データ駆動にあらず
     */
    planeasw: Option<Some<PlaneCarrierAswBehaviorType>>,
}

pub type ShipDatas = HashMap<u32, PlayerShipData>;*/