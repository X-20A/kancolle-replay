import { DeepReadonly } from "@/types";

/** 装備種別ID */
export const enum EquipImprovementType {
    MAINGUNS = 1,
    MAINGUNSAA = 101,
    MAINGUNM = 2,
    MAINGUNL = 3,
    SECGUN = 4,
    SECGUNAA = 104,
    TORPEDO = 5,
    FIGHTER = 6,
    DIVEBOMBER = 7,
    TORPBOMBER = 8,
    CARRIERSCOUT = 9,
    SEAPLANE = 10,
    SEAPLANEBOMBER = 11,
    // RADARS = 12,
    RADARL = 13,
    SONARS = 14,
    /** 爆雷 && 爆雷投射機 */
    DEPTHCHARGE = 15,
    ENGINE = 17,
    TYPE3SHELL = 18,
    APSHELL = 19,
    AAGUN = 21,
    MIDGETSUB = 22,
    REPAIR = 23,
    LANDINGCRAFT = 24,
    // AUTOGYRO = 25,
    // ASWPLANE = 26,
    BULGEM = 27,
    BULGEL = 28,
    SEARCHLIGHTS = 29,
    DRUM = 30,
    SRF = 31,
    TORPEDOSS = 32,
    STARSHELL = 33,
    FCF = 34,
    SCAMP = 35,
    AAFD = 36,
    WG42 = 37,
    MAINGUNXL = 38,
    PICKET = 39,
    SONARL = 40,
    FLYINGBOAT = 41,
    SEARCHLIGHTL = 42,
    RATION = 43,
    OILDRUM = 44,
    SEAPLANEFIGHTER = 45,
    LANDINGTANK = 46,
    LANDBOMBER = 47,
    INTERCEPTOR = 48,
    LANDSCOUT = 49,
    TRANSPORTITEM = 50,
    SUBRADAR = 51,
    ARMYUNIT = 52,
    LANDBOMBERL = 53,
    SMOKESCREEN = 54,
    JETBOMBER = 57,
    // JETSCOUT = 59,
    RADARXL = 93,
    CARRIERSCOUT2 = 94,
    SECGUNL = 95,
    OTHER = 99,

    // 新規

    /** 爆戦 */
    FIGHTERBOMBER = 70,
    /** 対潜哨戒機(素対潜8未満) */
    ASWPLANE_LOW = 71,
    /** 対潜哨戒機(素対潜8以上) */
    ASWPLANE_HIGH = 72,
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
    SMOKE_SCREEN_RATE_FLAT = 19,
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
    [EquipImprovementType.MAINGUNS]: {
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
    [EquipImprovementType.MAINGUNSAA]: {
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
    [EquipImprovementType.MAINGUNM]: {
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
    [EquipImprovementType.MAINGUNL]: {
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
    [EquipImprovementType.MAINGUNXL]: {
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
    [EquipImprovementType.SECGUN]: { // (分類A)
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
    [EquipImprovementType.SECGUNAA]: { // (分類B)
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
    [EquipImprovementType.SECGUNL]: { // (分類C)
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
    [EquipImprovementType.APSHELL]: {
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
    [EquipImprovementType.TORPEDOSS]: {
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
    [EquipImprovementType.MIDGETSUB]: {
        [AddStatusType.NIGHT_BATTLE_POWER]: {
            coeffient: 1,
            is_sqrt: true,
        },
        [AddStatusType.NIGHT_BATTLE_ACCURACY]: { // ! 明石にはない
            coeffient: 1.3,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.AAGUN]: {
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
    [EquipImprovementType.AAFD]: {
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
    [EquipImprovementType.SONARS]: {
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
    [EquipImprovementType.SONARL]: {
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
    [EquipImprovementType.DEPTHCHARGE]: { // ! 明石では爆雷と爆雷投射機で上昇の挙動が異なる
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
    [EquipImprovementType.TORPBOMBER]: {
        [AddStatusType.SHELL_POWER]: {
            coeffient: 0.2,
            is_sqrt: false,
        },
        [AddStatusType.ASW_POWER]: {
            coeffient: 0.2,
            is_sqrt: false,
        },
    },
    [EquipImprovementType.DIVEBOMBER]: {
        [AddStatusType.SHELL_POWER]: {
            coeffient: 0.2,
            is_sqrt: false,
        },
        [AddStatusType.ASW_POWER]: {
            coeffient: 0.2,
            is_sqrt: false,
        },
    },
    [EquipImprovementType.FIGHTERBOMBER]: {
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
    [EquipImprovementType.SEAPLANEBOMBER]: {
        [AddStatusType.LOS]: { // ! 爆装がない
            coeffient: 1.15,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.CARRIERSCOUT]: {
        [AddStatusType.LOS]: {
            coeffient: 1.2,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.CARRIERSCOUT2]: {
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
    [EquipImprovementType.ASWPLANE_LOW]: {
        [AddStatusType.ASW_POWER]: {
            coeffient: 0.2,
            is_sqrt: false,
        },
        [AddStatusType.LOS]: {
            coeffient: 1,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.ASWPLANE_HIGH]: {
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
    [EquipImprovementType.RADARL]: { // ! 艦隊防空が無い 大型電探もモデルを分ける必要がありそう
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
    [EquipImprovementType.RADARXL]: { // ! 艦隊防空がない
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
    [EquipImprovementType.TYPE3SHELL]: {
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
    [EquipImprovementType.BULGEM]: {
        [AddStatusType.ARMOR]: {
            coeffient: 0.2,
            is_sqrt: false,
        },
    },
    [EquipImprovementType.BULGEL]: {
        [AddStatusType.ARMOR]: {
            coeffient: 0.3,
            is_sqrt: false,
        },
    },
    [EquipImprovementType.LANDINGCRAFT]: { // ! 砲台特効倍率がない
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
    [EquipImprovementType.SEARCHLIGHTS]: {
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
    [EquipImprovementType.SEARCHLIGHTL]: {
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
    [EquipImprovementType.FLYINGBOAT]: { // ! 明石にはない
        [AddStatusType.LOS]: {
            coeffient: 1.2,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.REPAIR]: {

    },
    [EquipImprovementType.RATION]: {

    },
    [EquipImprovementType.SEAPLANEFIGHTER]: {

    },
    [EquipImprovementType.LANDINGTANK]: { // ! 明石では砲台特効倍率が陸戦隊と内火艇で異なる
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
    [EquipImprovementType.LANDBOMBER]: {
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
    [EquipImprovementType.LANDSCOUT]: { // ! 明石にはない
        [AddStatusType.AIR_SUPERIORITY]: {
            coeffient: 0.2,
            is_sqrt: false,
        },
        [AddStatusType.LOS]: {
            coeffient: 1.2,
            is_sqrt: true,
        },
    },
    [EquipImprovementType.TRANSPORTITEM]: {

    },
    [EquipImprovementType.SUBRADAR]: { // ! 未検証？

    },
    [EquipImprovementType.LANDBOMBERL]: {
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
    [EquipImprovementType.JETBOMBER]: {

    },
    [EquipImprovementType.ARMYUNIT]: { // ! 明石に無い
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
        [AddStatusType.SMOKE_SCREEN_RATE_FLAT]: {
            coeffient: 0.3, // ! 制空シミュより
            is_sqrt: false,
        }
    },
    [EquipImprovementType.BARRAGE_BALLOON]: {

    },
    [EquipImprovementType.OTHER]: {

    }
};