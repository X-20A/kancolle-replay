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

export const ADD_STATUS_KEYS = [
    "shell_power",
    "shell_accuracy",
    "shell_evasion",
    "night_battle_power",
    "night_battle_accuracy",
    "torpedo_power",
    "torpedo_accuracy",
    "torpedo_evasion",
    "asw_power",
    "asw_accuracy",
    // ! 加重対空は対空値によって分岐するのでデータ駆動不可 削除予定
    "self_anti_air",
    "fleet_anti_air",
    "anti_air",
    "los",
    "armor",
    "anti_pill_box_mod",
    "aerial_bomb_power",
    "aerial_torpedo_power",
    "smokescreen_rate_flat",
] as const;

export type AddStatusKey = typeof ADD_STATUS_KEYS[number];

export type EquipImprovementAddition = Record<AddStatusKey, number>;

export type ImprovementData = Partial<Record<AddStatusKey, {
    coeffient: number;
    is_sqrt: boolean;
}>>;

export type EquipImprovementDatas = Readonly<Record<EquipImprovementType, ImprovementData>>;

/**
 * 改修による上昇値の計算に必要なデータ    
 * 参考: https://akashi-list.me/
 */
export const EQUIP_IMPLOVEMENT_DATAS: EquipImprovementDatas = {
    [EquipImprovementType.MAIN_GUN_S]: {
        shell_power: {
            coeffient: 1,
            is_sqrt: true,
        },
        night_battle_power: {
            coeffient: 1,
            is_sqrt: true,
        },
        shell_accuracy: {
            coeffient: 1,
            is_sqrt: true,
        },
        night_battle_accuracy: {
            coeffient: 1.3,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.MAIN_GUN_S_AA]: {
        shell_power: {
            coeffient: 1,
            is_sqrt: true,
        },
        night_battle_power: {
            coeffient: 1,
            is_sqrt: true,
        },
        shell_accuracy: {
            coeffient: 1,
            is_sqrt: true,
        },
        night_battle_accuracy: {
            coeffient: 1.3,
            is_sqrt: true,
        },
        self_anti_air: {
            coeffient: 0.7,
            is_sqrt: true,
        },
        fleet_anti_air: {
            coeffient: 2,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.MAIN_GUN_M]: {
        shell_power: {
            coeffient: 1,
            is_sqrt: true,
        },
        night_battle_power: {
            coeffient: 1,
            is_sqrt: true,
        },
        shell_accuracy: {
            coeffient: 1,
            is_sqrt: true,
        },
        night_battle_accuracy: {
            coeffient: 1.3,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.MAIN_GUN_L]: {
        shell_power: {
            coeffient: 1.5,
            is_sqrt: true,
        },
        night_battle_power: {
            coeffient: 1,
            is_sqrt: true,
        },
        shell_accuracy: {
            coeffient: 1,
            is_sqrt: true,
        },
        night_battle_accuracy: {
            coeffient: 1.3,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.MAIN_GUN_XL]: {
        shell_power: {
            coeffient: 1.5,
            is_sqrt: true,
        },
        night_battle_power: {
            coeffient: 1,
            is_sqrt: true,
        },
        shell_accuracy: {
            coeffient: 1,
            is_sqrt: true,
        },
        night_battle_accuracy: {
            coeffient: 1.3,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.SECONDARY_GUN]: { // (分類A)
        shell_power: {
            coeffient: 1,
            is_sqrt: true,
        },
        night_battle_power: {
            coeffient: 1,
            is_sqrt: true,
        },
        shell_accuracy: {
            coeffient: 1,
            is_sqrt: true,
        },
        night_battle_accuracy: {
            coeffient: 1.3,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.SECONDARY_GUN_AA]: { // (分類B)
        shell_power: {
            coeffient: 1,
            is_sqrt: false,

        },
        night_battle_power: {
            coeffient: 1,
            is_sqrt: false,
        },
        shell_accuracy: {
            coeffient: 1,
            is_sqrt: false,
        },
        night_battle_accuracy: {
            coeffient: 1.3,
            is_sqrt: false,
        },
        fleet_anti_air: {
            coeffient: 2,
            is_sqrt: false,
        },
        self_anti_air: {
            coeffient: 1,
            is_sqrt: false,
        },
    },
    [EquipImprovementType.SECONDARY_GUN_L]: { // (分類C)
        shell_power: {
            coeffient: 1,
            is_sqrt: false,
        },
        night_battle_power: {
            coeffient: 1,
            is_sqrt: false,
        },
        shell_accuracy: {
            coeffient: 1,
            is_sqrt: true,
        },
        night_battle_accuracy: {
            coeffient: 1.3,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.AP_SHELL]: {
        shell_power: {
            coeffient: 1,
            is_sqrt: true,
        },
        night_battle_power: {
            coeffient: 1,
            is_sqrt: true,
        }, shell_accuracy: {
            coeffient: 1,
            is_sqrt: true,
        },
        night_battle_accuracy: {
            coeffient: 1.3,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.TORPEDO]: {
        torpedo_power: {
            coeffient: 1.2,
            is_sqrt: true,
        },
        night_battle_power: {
            coeffient: 1,
            is_sqrt: true,
        },
        torpedo_accuracy: {
            coeffient: 2,
            is_sqrt: true,
        },
        night_battle_accuracy: {
            coeffient: 1.3,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.TORPEDO_SS]: {
        torpedo_power: {
            coeffient: 1.2,
            is_sqrt: true,
        },
        night_battle_power: {
            coeffient: 1,
            is_sqrt: true,
        }, torpedo_accuracy: { // ! 明石にはない
            coeffient: 2,
            is_sqrt: true,
        }, night_battle_accuracy: {
            coeffient: 1.3,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.MIDGET_SUBMARINE]: {
        night_battle_power: {
            coeffient: 1,
            is_sqrt: true,
        },
        night_battle_accuracy: { // ! 明石にはない
            coeffient: 1.3,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.AA_GUN]: {
        shell_power: {
            coeffient: 1,
            is_sqrt: true,
        },
        torpedo_power: {
            coeffient: 1.2,
            is_sqrt: true,
        },
        torpedo_accuracy: { // ! 明石にはない
            coeffient: 2,
            is_sqrt: true,
        },
        self_anti_air: {
            coeffient: 2,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.ANTI_AIR_FIRE_DIRECTOR]: {
        shell_power: {
            coeffient: 1,
            is_sqrt: true,
        },
        night_battle_power: {
            coeffient: 1,
            is_sqrt: true,
        },
        shell_accuracy: {
            coeffient: 1,
            is_sqrt: true,
        },
        night_battle_accuracy: {
            coeffient: 1.3,
            is_sqrt: true,
        },
        fleet_anti_air: {
            coeffient: 2,
            is_sqrt: true,
        },
        self_anti_air: { // ! 明石の対空と異なる そもそも SELF_ANTI_AIR は 明石の 対空 を指すか？
            coeffient: 1,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.SONAR_S]: {
        shell_power: {
            coeffient: 0.75,
            is_sqrt: true,
        },
        asw_power: { // ! 明石0.66
            coeffient: 1,
            is_sqrt: true,
        },
        asw_accuracy: {
            coeffient: 1.3,
            is_sqrt: true,
        },
        torpedo_evasion: {
            coeffient: 1.5,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.SONAR_L]: {
        shell_power: {
            coeffient: 0.75, // ! 明石0.66
            is_sqrt: true,
        },
        asw_power: {
            coeffient: 1,
            is_sqrt: true,
        },
        asw_accuracy: {
            coeffient: 1.3,
            is_sqrt: true,
        },
        torpedo_evasion: {
            coeffient: 1.5,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.DEPTH_CHARGE]: { // ! 明石では爆雷と爆雷投射機で上昇の挙動が異なる
        shell_power: { // ! 明石に無い
            coeffient: 0.75,
            is_sqrt: true,
        },
        asw_power: {
            coeffient: 1, // ! 明石0.66
            is_sqrt: true,
        },
        asw_accuracy: { // ! 明石に無い
            coeffient: 1.3,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.FIGHTER]: {
        anti_air: {
            coeffient: 0.2,
            is_sqrt: false,
        },
    },
    [EquipImprovementType.TORPEDO_BOMBER]: {
        aerial_torpedo_power: {
            coeffient: 0.2,
            is_sqrt: false,
        },
        asw_power: {
            coeffient: 0.2,
            is_sqrt: false,
        },
    },
    [EquipImprovementType.DIVE_BOMBER]: {
        aerial_bomb_power: {
            coeffient: 0.2,
            is_sqrt: false,
        },
        asw_power: {
            coeffient: 0.2,
            is_sqrt: false,
        },
    },
    [EquipImprovementType.FIGHTER_BOMBER]: {
        anti_air: {
            coeffient: 0.25,
            is_sqrt: false,
        },
    },
    [EquipImprovementType.SEAPLANE]: {
        los: {
            coeffient: 1.2,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.SEAPLANE_BOMBER]: {
        los: { // ! 爆装がない
            coeffient: 1.15,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.CARRIER_SCOUT]: {
        los: {
            coeffient: 1.2,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.CARRIER_SCOUT_2]: {
        los: {
            coeffient: 1.2,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.AUTOGYRO_LOW]: {
        asw_power: {
            coeffient: 0.2,
            is_sqrt: false,
        },
    },
    [EquipImprovementType.AUTOGYRO_HIGH]: {
        asw_power: {
            coeffient: 0.3,
            is_sqrt: false,
        },
    },
    [EquipImprovementType.ASW_PLANE_LOW]: {
        asw_power: {
            coeffient: 0.2,
            is_sqrt: false,
        },
        los: {
            coeffient: 1,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.ASW_PLANE_HIGH]: {
        asw_power: {
            coeffient: 0.3,
            is_sqrt: false,
        },
        los: {
            coeffient: 1,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.RADAR_S_MODEL_A]: {
        shell_accuracy: {
            coeffient: 1,
            is_sqrt: true,
        },
        night_battle_accuracy: {
            coeffient: 1.3,
            is_sqrt: true,
        },
        fleet_anti_air: {
            coeffient: 1.5,
            is_sqrt: true,
        },
        los: {
            coeffient: 1.25,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.RADAR_S_MODEL_B]: {
        shell_accuracy: {
            coeffient: 1.7,
            is_sqrt: true,
        },
        night_battle_accuracy: {
            coeffient: 1.6,
            is_sqrt: true,
        },
        los: {
            coeffient: 1.25,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.RADAR_S_MODEL_C]: {
        shell_accuracy: {
            coeffient: 1.7,
            is_sqrt: true,
        },
        night_battle_accuracy: {
            coeffient: 1.6,
            is_sqrt: true,
        },
        fleet_anti_air: {
            coeffient: 1.5,
            is_sqrt: true,
        },
        los: {
            coeffient: 1.25,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.RADAR_S_MODEL_D]: {
        shell_accuracy: {
            coeffient: 1.7,
            is_sqrt: true,
        },
        night_battle_accuracy: {
            coeffient: 1.6,
            is_sqrt: true,
        },
        los: {
            coeffient: 1.4,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.RADAR_L]: { // ! 艦隊防空が無い 大型電探もモデルを分ける必要がありそう
        shell_accuracy: {
            coeffient: 1, // ! 明石: 1.7
            is_sqrt: true,
        },
        night_battle_accuracy: {
            coeffient: 1.3, // ! 明石: 1.6
            is_sqrt: true,
        },
        los: {
            coeffient: 1.4,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.RADAR_XL]: { // ! 艦隊防空がない
        shell_accuracy: {
            coeffient: 1, // ! 明石: 1.7
            is_sqrt: true,
        },
        night_battle_accuracy: {
            coeffient: 1.3, // ! 明石1.6
            is_sqrt: true,
        },
        los: {
            coeffient: 1.4,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.ENGINE]: {
        shell_evasion: {
            coeffient: 1.5,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.TYPE_3_SHELL]: {
        shell_power: {
            coeffient: 1,
            is_sqrt: true,
        },
        night_battle_power: {
            coeffient: 1,
            is_sqrt: true,
        },
        shell_accuracy: {
            coeffient: 1,
            is_sqrt: true,
        }, night_battle_accuracy: {
            coeffient: 1.3,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.BULGE_M]: {
        armor: {
            coeffient: 0.2,
            is_sqrt: false,
        },
    },
    [EquipImprovementType.BULGE_L]: {
        armor: {
            coeffient: 0.3,
            is_sqrt: false,
        },
    },
    [EquipImprovementType.LANDING_CRAFT]: { // ! 砲台特効倍率がない
        shell_power: {
            coeffient: 1,
            is_sqrt: true,
        },
        night_battle_power: {
            coeffient: 1,
            is_sqrt: true,
        },
        shell_accuracy: {
            coeffient: 1,
            is_sqrt: true,
        },
        night_battle_accuracy: {
            coeffient: 1.3,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.SEARCHLIGHT_S]: {
        shell_power: {
            coeffient: 1,
            is_sqrt: true,
        },
        night_battle_power: {
            coeffient: 1,
            is_sqrt: true,
        },
        shell_accuracy: {
            coeffient: 1,
            is_sqrt: true,
        },
        night_battle_accuracy: {
            coeffient: 1.3,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.SEARCHLIGHT_L]: {
        shell_power: {
            coeffient: 1,
            is_sqrt: true,
        },
        night_battle_power: {
            coeffient: 1,
            is_sqrt: true,
        },
        shell_accuracy: {
            coeffient: 1,
            is_sqrt: true,
        },
        night_battle_accuracy: {
            coeffient: 1.3,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.STARSHELL]: {

    },
    [EquipImprovementType.PICKET]: {
        shell_power: {
            coeffient: 1,
            is_sqrt: true,
        },
        night_battle_power: {
            coeffient: 1,
            is_sqrt: true,
        },
        shell_accuracy: {
            coeffient: 1,
            is_sqrt: true,
        },
        night_battle_accuracy: { // ! 明石にはない
            coeffient: 1.3,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.WG42]: {
        shell_power: {
            coeffient: 1,
            is_sqrt: true,
        },
        night_battle_power: {
            coeffient: 1,
            is_sqrt: true,
        },
        shell_accuracy: { // ! 明石にはない
            coeffient: 1,
            is_sqrt: true,
        },
        night_battle_accuracy: { // ! 明石にはない
            coeffient: 1.3,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.SRF]: {

    },
    [EquipImprovementType.FCF]: { // ! 明石にはない
        shell_power: {
            coeffient: 1,
            is_sqrt: true,
        },
        night_battle_power: {
            coeffient: 1,
            is_sqrt: true,
        },
        shell_accuracy: {
            coeffient: 1,
            is_sqrt: true,
        },
        night_battle_accuracy: {
            coeffient: 1.3,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.DRUM]: {

    },
    [EquipImprovementType.SCAMP]: {

    },
    [EquipImprovementType.FLYING_BOAT]: { // ! 明石にはない
        los: {
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
        shell_power: {
            coeffient: 1,
            is_sqrt: true,
        },
        night_battle_power: {
            coeffient: 1,
            is_sqrt: true,
        },
        shell_accuracy: {
            coeffient: 1,
            is_sqrt: true,
        },
        night_battle_accuracy: {
            coeffient: 1.3,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.OILDRUM]: {

    },
    [EquipImprovementType.LAND_BASED_BOMBER]: {
        aerial_bomb_power: {
            coeffient: 0.7,
            is_sqrt: true,
        },
        torpedo_power: {
            coeffient: 0.7,
            is_sqrt: true,
        },
        anti_air: {
            coeffient: 0.5,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.INTERCEPTOR]: {
        anti_air: {
            coeffient: 0.2,
            is_sqrt: false,
        },
    },
    [EquipImprovementType.LAND_BASED_SCOUT]: { // ! 明石にはない
        anti_air: {
            coeffient: 0.2,
            is_sqrt: false,
        },
        los: {
            coeffient: 1.2,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.TRANSPORT_ITEM]: {

    },
    [EquipImprovementType.SUBMARINE_RADAR]: { // ! 未検証？

    },
    [EquipImprovementType.LAND_BASED_BOMBER_L]: {
        aerial_bomb_power: {
            coeffient: 0.7,
            is_sqrt: true,
        },
        aerial_torpedo_power: {
            coeffient: 0.7,
            is_sqrt: true,
        },
        anti_air: {
            coeffient: 0.5,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.JET_BOMBER]: {

    },
    [EquipImprovementType.ARMY_UNIT]: { // ! 明石に無い
        shell_power: {
            coeffient: 1,
            is_sqrt: true,
        }, night_battle_power: {
            coeffient: 1,
            is_sqrt: true,
        }, shell_accuracy: {
            coeffient: 1,
            is_sqrt: true,
        },
        night_battle_accuracy: {
            coeffient: 1.3,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.SMOKESCREEN]: {
        shell_power: {
            coeffient: 1,
            is_sqrt: true,
        },
        night_battle_power: {
            coeffient: 1,
            is_sqrt: true,
        },
        shell_accuracy: {
            coeffient: 1,
            is_sqrt: true,
        },
        night_battle_accuracy: {
            coeffient: 1.3,
            is_sqrt: true,
        },
        smokescreen_rate_flat: {
            coeffient: 0.3, // ! 制空シミュより
            is_sqrt: false,
        }
    },
    [EquipImprovementType.BARRAGE_BALLOON]: {

    },
    [EquipImprovementType.OTHER]: {

    }
};