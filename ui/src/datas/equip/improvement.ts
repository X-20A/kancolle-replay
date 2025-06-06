import { DeepReadonly } from "@/types";

/** 装備種別ID */
export const enum EquipImprovementType {
    MAIN_GUN_S = 1,
    MAIN_GUN_S_AA = 101,
    MAIN_GUN_M = 2,
    MAIN_GUN_L = 3,
    SECONDARY_GUN = 4,
    SECONDARY_GUN_AA = 104,
    TORPEDO = 5,
    FIGHTER = 6,
    DIVE_BOMBER = 7,
    TORPEDO_BOMBER = 8,
    CARRIER_SCOUT = 9,
    SEAPLANE = 10,
    SEAPLANE_BOMBER = 11,
    // RADARS = 12,
    RADAR_L = 13,
    SONAR_S = 14,
    /** 爆雷 && 爆雷投射機 */
    DEPTH_CHARGE = 15,
    ENGINE = 17,
    TYPE_3_SHELL = 18,
    AP_SHELL = 19,
    AA_GUN = 21,
    MIDGET_SUBMARINE = 22,
    REPAIR = 23,
    LANDING_CRAFT = 24,
    // AUTOGYRO = 25,
    // ASWPLANE = 26,
    BULGE_M = 27,
    BULGE_L = 28,
    SEARCHLIGHT_S = 29,
    DRUM = 30,
    /** 艦艇修理施設 */
    SRF = 31,
    TORPEDO_SS = 32,
    STARSHELL = 33,
    FCF = 34,
    SCAMP = 35,
    ANTI_AIR_FIRE_DIRECTOR = 36,
    WG42 = 37,
    MAIN_GUN_XL = 38,
    PICKET = 39,
    SONAR_L = 40,
    FLYING_BOAT = 41,
    SEARCHLIGHT_L = 42,
    RATION = 43,
    OILDRUM = 44,
    SEAPLANE_FIGHTER = 45,
    LANDING_TANK = 46,
    LAND_BASED_BOMBER = 47,
    INTERCEPTOR = 48,
    LAND_BASED_SCOUT = 49,
    TRANSPORT_ITEM = 50,
    SUBMARINE_RADAR = 51,
    ARMY_UNIT = 52,
    LAND_BASED_BOMBER_L = 53,
    SMOKESCREEN = 54,
    JET_BOMBER = 57,
    // JETSCOUT = 59,
    RADAR_XL = 93,
    CARRIER_SCOUT_2 = 94,
    SECONDARY_GUN_L = 95,
    OTHER = 99,

    // 新規

    /** 爆戦 */
    FIGHTER_BOMBER = 70,
    /** 対潜哨戒機(素対潜8未満) */
    ASW_PLANE_LOW = 71,
    /** 対潜哨戒機(素対潜8以上) */
    ASW_PLANE_HIGH = 72,
    /** 回転翼機(素対潜11未満) */
    AUTOGYRO_LOW = 73,
    /** 回転翼機(素対潜11以上) */
    AUTOGYRO_HIGH = 74,
    /** 小型電探 改修タイプA(含改修不可) */
    RADAR_S_MODEL_A = 75,
    /** 小型電探 改修タイプB */
    RADAR_S_MODEL_B = 76,
    /** 小型電探 改修タイプC */
    RADAR_S_MODEL_C = 77,
    /** 小型電探 改修タイプD */
    RADAR_S_MODEL_D = 78,
    /** 阻塞気球 */
    BARRAGE_BALLOON = 79,
};

export const enum AddStatusType {
    /** 昼砲戦火力 */
    SHELL_POWER = 1,
    /** 昼砲戦命中 */
    SHELL_ACCURACY = 2,
    /** 昼砲戦回避 */
    SHELL_EVASION = 3,
    /** 夜戦火力 */
    NIGHT_BATTLE_POWER = 4,
    /** 夜戦命中 */
    NIGHT_BATTLE_ACCURACY = 5,
    /** 雷装 */
    TORPEDO_POWER = 6,
    /** 雷撃命中 */
    TORPEDO_ACCURACY = 7,
    /** 雷撃回避 */
    TORPEDO_EVASION = 8,
    /** 対潜 */
    ASW_POWER = 9,
    /** 対潜命中 */
    ASW_ACCURACY = 10,
    /** 加重対空 */
    SELF_ANTI_AIR = 11,
    /** 艦隊防空 */
    FLEET_ANTI_AIR = 12,
    /** 制空力 */
    AIR_SUPERIORITY = 13,
    /** 索敵 */
    LOS = 14,
    /** 装甲 */
    ARMOR = 15,
    /** 対砲台補正 */
    ANTI_PILLBOX_MOD = 16,
    /** 陸攻爆装 */
    LAND_BASE_BOMB = 17,
    /** 陸攻雷撃 */
    LAND_BASE_TORPEDO = 18,
    /** 煙幕発動率 */
    SMOKESCREEN_RATE_FLAT = 19,
}

export type ImprovementData = Partial<Record<AddStatusType, {
    /** 改修係数 */
    coeffient: number,
    /** sqrt処理を行うか */
    is_sqrt: boolean,
}>>

export type EquipImprovementDatas = DeepReadonly<Record<EquipImprovementType, ImprovementData>>;

/**
 * 改修による上昇値の計算に必要なデータ    
 * 参考: https://akashi-list.me/
 */
export const EQUIP_IMPLOVEMENT_DATAS: EquipImprovementDatas = {
    [EquipImprovementType.MAIN_GUN_S]: {
        [AddStatusType.SHELL_POWER]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.NIGHT_BATTLE_POWER]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.SHELL_ACCURACY]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.NIGHT_BATTLE_ACCURACY]: {
            coeffient: 1.3,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.MAIN_GUN_S_AA]: {
        [AddStatusType.SHELL_POWER]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.NIGHT_BATTLE_POWER]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.SHELL_ACCURACY]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.NIGHT_BATTLE_ACCURACY]: {
            coeffient: 1.3,
            is_sqrt: true,
        },
        [AddStatusType.SELF_ANTI_AIR]: {
            coeffient: 0.7,
            is_sqrt: true,
        },
        [AddStatusType.FLEET_ANTI_AIR]: {
            coeffient: 2,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.MAIN_GUN_M]: {
        [AddStatusType.SHELL_POWER]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.NIGHT_BATTLE_POWER]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.SHELL_ACCURACY]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.NIGHT_BATTLE_ACCURACY]: {
            coeffient: 1.3,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.MAIN_GUN_L]: {
        [AddStatusType.SHELL_POWER]: {
            coeffient: 1.5,
            is_sqrt: true,
        },
        [AddStatusType.NIGHT_BATTLE_POWER]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.SHELL_ACCURACY]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.NIGHT_BATTLE_ACCURACY]: {
            coeffient: 1.3,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.MAIN_GUN_XL]: {
        [AddStatusType.SHELL_POWER]: {
            coeffient: 1.5,
            is_sqrt: true,
        },
        [AddStatusType.NIGHT_BATTLE_POWER]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.SHELL_ACCURACY]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.NIGHT_BATTLE_ACCURACY]: {
            coeffient: 1.3,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.SECONDARY_GUN]: { // (分類A)
        [AddStatusType.SHELL_POWER]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.NIGHT_BATTLE_POWER]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.SHELL_ACCURACY]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.NIGHT_BATTLE_ACCURACY]: {
            coeffient: 1.3,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.SECONDARY_GUN_AA]: { // (分類B)
        [AddStatusType.SHELL_POWER]: {
            coeffient: 1,
            is_sqrt: false,

        },
        [AddStatusType.NIGHT_BATTLE_POWER]: {
            coeffient: 1,
            is_sqrt: false,
        },
        [AddStatusType.SHELL_ACCURACY]: {
            coeffient: 1,
            is_sqrt: false,
        },
        [AddStatusType.NIGHT_BATTLE_ACCURACY]: {
            coeffient: 1.3,
            is_sqrt: false,
        },
        [AddStatusType.FLEET_ANTI_AIR]: {
            coeffient: 2,
            is_sqrt: false,
        },
        [AddStatusType.SELF_ANTI_AIR]: {
            coeffient: 1,
            is_sqrt: false,
        },
    },
    [EquipImprovementType.SECONDARY_GUN_L]: { // (分類C)
        [AddStatusType.SHELL_POWER]: {
            coeffient: 1,
            is_sqrt: false,
        },
        [AddStatusType.NIGHT_BATTLE_POWER]: {
            coeffient: 1,
            is_sqrt: false,
        },
        [AddStatusType.SHELL_ACCURACY]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.NIGHT_BATTLE_ACCURACY]: {
            coeffient: 1.3,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.AP_SHELL]: {
        [AddStatusType.SHELL_POWER]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.NIGHT_BATTLE_POWER]: {
            coeffient: 1,
            is_sqrt: true,
        }, [AddStatusType.SHELL_ACCURACY]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.NIGHT_BATTLE_ACCURACY]: {
            coeffient: 1.3,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.TORPEDO]: {
        [AddStatusType.TORPEDO_POWER]: {
            coeffient: 1.2,
            is_sqrt: true,
        },
        [AddStatusType.NIGHT_BATTLE_POWER]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.TORPEDO_ACCURACY]: {
            coeffient: 2,
            is_sqrt: true,
        },
        [AddStatusType.NIGHT_BATTLE_ACCURACY]: {
            coeffient: 1.3,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.TORPEDO_SS]: {
        [AddStatusType.TORPEDO_POWER]: {
            coeffient: 1.2,
            is_sqrt: true,
        },
        [AddStatusType.NIGHT_BATTLE_POWER]: {
            coeffient: 1,
            is_sqrt: true,
        }, [AddStatusType.TORPEDO_ACCURACY]: { // ! 明石にはない
            coeffient: 2,
            is_sqrt: true,
        }, [AddStatusType.NIGHT_BATTLE_ACCURACY]: {
            coeffient: 1.3,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.MIDGET_SUBMARINE]: {
        [AddStatusType.NIGHT_BATTLE_POWER]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.NIGHT_BATTLE_ACCURACY]: { // ! 明石にはない
            coeffient: 1.3,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.AA_GUN]: {
        [AddStatusType.SHELL_POWER]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.TORPEDO_POWER]: {
            coeffient: 1.2,
            is_sqrt: true,
        },
        [AddStatusType.TORPEDO_ACCURACY]: { // ! 明石にはない
            coeffient: 2,
            is_sqrt: true,
        },
        [AddStatusType.SELF_ANTI_AIR]: {
            coeffient: 2,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.ANTI_AIR_FIRE_DIRECTOR]: {
        [AddStatusType.SHELL_POWER]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.NIGHT_BATTLE_POWER]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.SHELL_ACCURACY]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.NIGHT_BATTLE_ACCURACY]: {
            coeffient: 1.3,
            is_sqrt: true,
        },
        [AddStatusType.FLEET_ANTI_AIR]: {
            coeffient: 2,
            is_sqrt: true,
        },
        [AddStatusType.SELF_ANTI_AIR]: { // ! 明石の対空と異なる そもそも SELF_ANTI_AIR は 明石の 対空 を指すか？
            coeffient: 1,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.SONAR_S]: {
        [AddStatusType.SHELL_POWER]: {
            coeffient: 0.75,
            is_sqrt: true,
        },
        [AddStatusType.ASW_POWER]: { // ! 明石0.66
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.ASW_ACCURACY]: {
            coeffient: 1.3,
            is_sqrt: true,
        }, [AddStatusType.TORPEDO_EVASION]: {
            coeffient: 1.5,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.SONAR_L]: {
        [AddStatusType.SHELL_POWER]: {
            coeffient: 0.75, // ! 明石0.66
            is_sqrt: true,
        },
        [AddStatusType.ASW_POWER]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.ASW_ACCURACY]: {
            coeffient: 1.3,
            is_sqrt: true,
        },
        [AddStatusType.TORPEDO_EVASION]: {
            coeffient: 1.5,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.DEPTH_CHARGE]: { // ! 明石では爆雷と爆雷投射機で上昇の挙動が異なる
        [AddStatusType.SHELL_POWER]: { // ! 明石に無い
            coeffient: 0.75,
            is_sqrt: true,
        },
        [AddStatusType.ASW_POWER]: {
            coeffient: 1, // ! 明石0.66
            is_sqrt: true,
        },
        [AddStatusType.ASW_ACCURACY]: { // ! 明石に無い
            coeffient: 1.3,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.FIGHTER]: {
        [AddStatusType.AIR_SUPERIORITY]: {
            coeffient: 0.2,
            is_sqrt: false,
        },
    },
    [EquipImprovementType.TORPEDO_BOMBER]: {
        [AddStatusType.SHELL_POWER]: {
            coeffient: 0.2,
            is_sqrt: false,
        },
        [AddStatusType.ASW_POWER]: {
            coeffient: 0.2,
            is_sqrt: false,
        },
    },
    [EquipImprovementType.DIVE_BOMBER]: {
        [AddStatusType.SHELL_POWER]: {
            coeffient: 0.2,
            is_sqrt: false,
        },
        [AddStatusType.ASW_POWER]: {
            coeffient: 0.2,
            is_sqrt: false,
        },
    },
    [EquipImprovementType.FIGHTER_BOMBER]: {
        [AddStatusType.AIR_SUPERIORITY]: {
            coeffient: 0.25,
            is_sqrt: false,
        },
    },
    [EquipImprovementType.SEAPLANE]: {
        [AddStatusType.LOS]: {
            coeffient: 1.2,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.SEAPLANE_BOMBER]: {
        [AddStatusType.LOS]: { // ! 爆装がない
            coeffient: 1.15,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.CARRIER_SCOUT]: {
        [AddStatusType.LOS]: {
            coeffient: 1.2,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.CARRIER_SCOUT_2]: {
        [AddStatusType.LOS]: {
            coeffient: 1.2,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.AUTOGYRO_LOW]: {
        [AddStatusType.ASW_POWER]: {
            coeffient: 0.2,
            is_sqrt: false,
        },
    },
    [EquipImprovementType.AUTOGYRO_HIGH]: {
        [AddStatusType.ASW_POWER]: {
            coeffient: 0.3,
            is_sqrt: false,
        },
    },
    [EquipImprovementType.ASW_PLANE_LOW]: {
        [AddStatusType.ASW_POWER]: {
            coeffient: 0.2,
            is_sqrt: false,
        },
        [AddStatusType.LOS]: {
            coeffient: 1,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.ASW_PLANE_HIGH]: {
        [AddStatusType.ASW_POWER]: {
            coeffient: 0.3,
            is_sqrt: false,
        },
        [AddStatusType.LOS]: {
            coeffient: 1,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.RADAR_S_MODEL_A]: {
        [AddStatusType.SHELL_ACCURACY]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.NIGHT_BATTLE_ACCURACY]: {
            coeffient: 1.3,
            is_sqrt: true,
        },
        [AddStatusType.FLEET_ANTI_AIR]: {
            coeffient: 1.5,
            is_sqrt: true,
        },
        [AddStatusType.LOS]: {
            coeffient: 1.25,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.RADAR_S_MODEL_B]: {
        [AddStatusType.SHELL_ACCURACY]: {
            coeffient: 1.7,
            is_sqrt: true,
        },
        [AddStatusType.NIGHT_BATTLE_ACCURACY]: {
            coeffient: 1.6,
            is_sqrt: true,
        },
        [AddStatusType.LOS]: {
            coeffient: 1.25,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.RADAR_S_MODEL_C]: {
        [AddStatusType.SHELL_ACCURACY]: {
            coeffient: 1.7,
            is_sqrt: true,
        },
        [AddStatusType.NIGHT_BATTLE_ACCURACY]: {
            coeffient: 1.6,
            is_sqrt: true,
        },
        [AddStatusType.FLEET_ANTI_AIR]: {
            coeffient: 1.5,
            is_sqrt: true,
        },
        [AddStatusType.LOS]: {
            coeffient: 1.25,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.RADAR_S_MODEL_D]: {
        [AddStatusType.SHELL_ACCURACY]: {
            coeffient: 1.7,
            is_sqrt: true,
        },
        [AddStatusType.NIGHT_BATTLE_ACCURACY]: {
            coeffient: 1.6,
            is_sqrt: true,
        },
        [AddStatusType.LOS]: {
            coeffient: 1.4,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.RADAR_L]: { // ! 艦隊防空が無い 大型電探もモデルを分ける必要がありそう
        [AddStatusType.SHELL_ACCURACY]: {
            coeffient: 1, // ! 明石: 1.7
            is_sqrt: true,
        },
        [AddStatusType.NIGHT_BATTLE_ACCURACY]: {
            coeffient: 1.3, // ! 明石: 1.6
            is_sqrt: true,
        },
        [AddStatusType.LOS]: {
            coeffient: 1.4,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.RADAR_XL]: { // ! 艦隊防空がない
        [AddStatusType.SHELL_ACCURACY]: {
            coeffient: 1, // ! 明石: 1.7
            is_sqrt: true,
        },
        [AddStatusType.NIGHT_BATTLE_ACCURACY]: {
            coeffient: 1.3, // ! 明石1.6
            is_sqrt: true,
        },
        [AddStatusType.LOS]: {
            coeffient: 1.4,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.ENGINE]: {
        [AddStatusType.SHELL_EVASION]: {
            coeffient: 1.5,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.TYPE_3_SHELL]: {
        [AddStatusType.SHELL_POWER]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.NIGHT_BATTLE_POWER]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.SHELL_ACCURACY]: {
            coeffient: 1,
            is_sqrt: true,
        }, [AddStatusType.NIGHT_BATTLE_ACCURACY]: {
            coeffient: 1.3,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.BULGE_M]: {
        [AddStatusType.ARMOR]: {
            coeffient: 0.2,
            is_sqrt: false,
        },
    },
    [EquipImprovementType.BULGE_L]: {
        [AddStatusType.ARMOR]: {
            coeffient: 0.3,
            is_sqrt: false,
        },
    },
    [EquipImprovementType.LANDING_CRAFT]: { // ! 砲台特効倍率がない
        [AddStatusType.SHELL_POWER]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.NIGHT_BATTLE_POWER]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.SHELL_ACCURACY]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.NIGHT_BATTLE_ACCURACY]: {
            coeffient: 1.3,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.SEARCHLIGHT_S]: {
        [AddStatusType.SHELL_POWER]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.NIGHT_BATTLE_POWER]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.SHELL_ACCURACY]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.NIGHT_BATTLE_ACCURACY]: {
            coeffient: 1.3,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.SEARCHLIGHT_L]: {
        [AddStatusType.SHELL_POWER]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.NIGHT_BATTLE_POWER]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.SHELL_ACCURACY]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.NIGHT_BATTLE_ACCURACY]: {
            coeffient: 1.3,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.STARSHELL]: {

    },
    [EquipImprovementType.PICKET]: {
        [AddStatusType.SHELL_POWER]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.NIGHT_BATTLE_POWER]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.SHELL_ACCURACY]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.NIGHT_BATTLE_ACCURACY]: { // ! 明石にはない
            coeffient: 1.3,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.WG42]: {
        [AddStatusType.SHELL_POWER]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.NIGHT_BATTLE_POWER]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.SHELL_ACCURACY]: { // ! 明石にはない
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.NIGHT_BATTLE_ACCURACY]: { // ! 明石にはない
            coeffient: 1.3,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.SRF]: {

    },
    [EquipImprovementType.FCF]: { // ! 明石にはない
        [AddStatusType.SHELL_POWER]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.NIGHT_BATTLE_POWER]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.SHELL_ACCURACY]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.NIGHT_BATTLE_ACCURACY]: {
            coeffient: 1.3,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.DRUM]: {

    },
    [EquipImprovementType.SCAMP]: {

    },
    [EquipImprovementType.FLYING_BOAT]: { // ! 明石にはない
        [AddStatusType.LOS]: {
            coeffient: 1.2,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.REPAIR]: {

    },
    [EquipImprovementType.RATION]: {

    },
    [EquipImprovementType.SEAPLANE_FIGHTER]: {

    },
    [EquipImprovementType.LANDING_TANK]: { // ! 明石では砲台特効倍率が陸戦隊と内火艇で異なる
        [AddStatusType.SHELL_POWER]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.NIGHT_BATTLE_POWER]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.SHELL_ACCURACY]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.NIGHT_BATTLE_ACCURACY]: {
            coeffient: 1.3,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.OILDRUM]: {

    },
    [EquipImprovementType.LAND_BASED_BOMBER]: {
        [AddStatusType.TORPEDO_POWER]: {
            coeffient: 0.7,
            is_sqrt: true,
        },
        [AddStatusType.SHELL_POWER]: {
            coeffient: 0.7,
            is_sqrt: true,
        },
        [AddStatusType.AIR_SUPERIORITY]: {
            coeffient: 0.5,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.INTERCEPTOR]: {
        [AddStatusType.AIR_SUPERIORITY]: {
            coeffient: 0.2,
            is_sqrt: false,
        },
    },
    [EquipImprovementType.LAND_BASED_SCOUT]: { // ! 明石にはない
        [AddStatusType.AIR_SUPERIORITY]: {
            coeffient: 0.2,
            is_sqrt: false,
        },
        [AddStatusType.LOS]: {
            coeffient: 1.2,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.TRANSPORT_ITEM]: {

    },
    [EquipImprovementType.SUBMARINE_RADAR]: { // ! 未検証？

    },
    [EquipImprovementType.LAND_BASED_BOMBER_L]: {
        [AddStatusType.LAND_BASE_TORPEDO]: {
            coeffient: 0.7,
            is_sqrt: true,
        },
        [AddStatusType.LAND_BASE_BOMB]: {
            coeffient: 0.7,
            is_sqrt: true,
        },
        [AddStatusType.AIR_SUPERIORITY]: {
            coeffient: 0.5,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.JET_BOMBER]: {

    },
    [EquipImprovementType.ARMY_UNIT]: { // ! 明石に無い
        [AddStatusType.SHELL_POWER]: {
            coeffient: 1,
            is_sqrt: true,
        }, [AddStatusType.NIGHT_BATTLE_POWER]: {
            coeffient: 1,
            is_sqrt: true,
        }, [AddStatusType.SHELL_ACCURACY]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.NIGHT_BATTLE_ACCURACY]: {
            coeffient: 1.3,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.SMOKESCREEN]: {
        [AddStatusType.SHELL_POWER]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.NIGHT_BATTLE_POWER]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.SHELL_ACCURACY]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.NIGHT_BATTLE_ACCURACY]: {
            coeffient: 1.3,
            is_sqrt: true,
        },
        [AddStatusType.SMOKESCREEN_RATE_FLAT]: {
            coeffient: 0.3, // ! 制空シミュより
            is_sqrt: false,
        }
    },
    [EquipImprovementType.BARRAGE_BALLOON]: {

    },
    [EquipImprovementType.OTHER]: {

    }
};