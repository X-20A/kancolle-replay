type EquipFlagsBase = {
    can_bombing: boolean,
    /**
     * 航空機であるか    
     * 熟練度をもつ
     */
    is_plane: boolean,
    /** 集中配備系の機銃であるか */
    is_concentrated: boolean,
    /** 反跳爆撃可能な爆撃機であるか */
    is_skip_bomber: boolean,
    /**
     * 対潜攻撃力計算に有効な装備種別であるか    
     * https://wikiwiki.jp/kancolle/戦闘について#AntiSubmarine
     */
    is_contribute_asw_attack_power: boolean,
    can_equip_land_base: boolean,
    /**
     * 制空状態の決定に関与する装備種別であるか    
     * 対空0でも敵の制空値が0の状況では制空に関与する    
     * https://wikiwiki.jp/kancolle/航空戦#AirSupremacy
     */
    is_involve_air_superiority: boolean,
    is_torpedo_bomber: boolean,
    can_contact: boolean,
}

export type PlayerEquipFlags = EquipFlagsBase & {
    /** T字不利回避能力があるか */
    can_avoid_T_disadvantage: boolean,
    /** 対地攻撃可能な艦爆であるか */
    can_shell_install_bomber: boolean,
    /** 夜偵系装備であるか */
    is_night_scout: boolean,
    /** ロケット戦闘機であるか */
    is_rocket_fighter: boolean,
    
    /** 後期型潜水艦魚雷 専用夜戦カットインのトリガー装備であるか */
    is_submarine_CI_trigger: boolean,
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
    /** 隼(20戦隊)系統の装備であるか */
    is_20th_family: boolean,
    can_detect: boolean,
    can_bombing: boolean,
    is_asw_plane: boolean,
    is_land_base_plane: boolean,
    is_jet: boolean,
    can_support_asw: boolean,
}

export type AbyssalEquipFlags = EquipFlagsBase & {
    /** 開幕雷撃"不可"な甲標的系装備であるか */
    can_not_op_torpedo_midgetsub: boolean,
    /** 高高度爆撃可能な爆撃機であるか */
    high_altitude_bomber: boolean,
    
    can_detect: boolean,
    
    is_asw_plane: boolean,
    is_land_base_plane: boolean,
    is_jet: boolean,
    can_support_asw: boolean,
}