import { Country } from "@/datas/equip/bonus";
import { PrepareAaciInfo } from "@/models/ship/aaciPreparate";
import { equal_ship_name, includes_ship_name, is_battle_ship_category, is_player_equipped_ship } from "@/models/ship/equipped";
import { NakedShip } from "@/models/ship/naked/base";
import { AbyssalShipNameJP } from "@/types/ship/abyssalNameJP";
import { PlayerShipNameJP } from "@/types/ship/playerNameJP";
import { ShipType } from "@/types/ship/ship";
import { PlayerShipClass } from "@/types/ship/shipClass";
import { match } from "ts-pattern";

const ANTI_AIR_CUTIN_TYPES = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
    31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
    51, 52,
] as const;
export type AntiAirCutinType = typeof ANTI_AIR_CUTIN_TYPES[number];

export type AntiAirCutIn = {
    /** カットイン種別id */
    readonly id: AntiAirCutinType;
    /** 割合撃墜ボーナス */
    readonly rateCorr: number;
    /** 固定撃墜ボーナスA */
    readonly fixCorrA: number;
    /** 固定撃墜ボーナスB */
    readonly fixCorrB: number;
    /** 発動率 */
    readonly rate: number;
}

type AaciCondition = (
    ship: {
        name: AbyssalShipNameJP | PlayerShipNameJP,
        type: ShipType,
        class: PlayerShipClass | null,
        country: Country | null,
    },
    info: PrepareAaciInfo,
) => boolean;

/** 秋月型 改/改二のID */
const AKIZUKI_CLASS_KAI_OR_MORE: PlayerShipNameJP[] = [
    '秋月改',
    '照月改',
    '涼月改',
    '初月改',
    '初月改二',
    '冬月改',
];
/** 伊勢型 改/改二のID */
const ISE_CLASS_KAI_OR_MORE: PlayerShipNameJP[] = [
    '伊勢改',
    '伊勢改二',
    '日向改',
    '日向改二',
];
/** 大和型改二 */
const YAMATO_CLASS_KAI_NI: PlayerShipNameJP[] = [
    '大和改二',
    '大和改二重',
    '武蔵改二',
];
/** 金剛型改二/丙 */
const KONGOU_CLASS_KAI_NI: PlayerShipNameJP[] = [
    '金剛改二',
    '金剛改二丙',
    '比叡改二',
    '比叡改二丙',
    '榛名改二',
    '榛名改二丙',
    '霧島改二',
    '霧島改二丙',
];

const AACI_CONDITIONS = (type: AntiAirCutinType): AaciCondition => {
    return match<AntiAirCutinType, AaciCondition>(type)
        .with(1, () => (ship, info) =>
            ship.class === 'Akizuki' &&
            info.high_angle_gun_count >= 2 &&
            info.has_any_radar
        )
        .with(2, () => (ship, info) =>
            ship.class === 'Akizuki' &&
            info.high_angle_gun_count >= 1 &&
            info.has_any_radar
        )
        .with(3, () => (ship, info) =>
            ship.class === 'Akizuki' &&
            info.high_angle_gun_count >= 2
        )
        .with(4, () => (ship, info) =>
            is_battle_ship_category(ship.type) &&
            info.has_any_L_gun &&
            info.has_type_3_shell &&
            info.has_fire_director &&
            info.has_anti_air_radar
        )
        .with(5, () => (ship, info) =>
            ship.class !== 'Akizuki' &&
            info.special_high_angle_gun_count >= 2 &&
            info.has_anti_air_radar
        )
        .with(6, () => (ship, info) =>
            is_battle_ship_category(ship.type) &&
            info.has_any_L_gun &&
            info.has_type_3_shell &&
            info.has_fire_director
        )
        .with(7, () => (ship, info) =>
            ship.class !== 'Akizuki' &&
            info.high_angle_gun_count >= 1 &&
            info.has_fire_director &&
            info.has_anti_air_radar
        )
        .with(8, () => (ship, info) =>
            ship.class !== 'Akizuki' &&
            info.special_high_angle_gun_count >= 1 &&
            info.has_anti_air_radar
        )
        .with(9, () => (_, info) =>
            info.high_angle_gun_count >= 1 &&
            info.has_fire_director
        )
        .with(10, () => (ship, info) =>
            equal_ship_name('摩耶改二', ship.name) &&
            info.special_anti_air_gun_count >= 1 &&
            (info.high_angle_gun_count >= 1 || info.special_high_angle_gun_count >= 1) &&
            info.has_anti_air_radar
        )
        .with(11, () => (ship, info) =>
            equal_ship_name('摩耶改二', ship.name) &&
            info.special_anti_air_gun_count >= 1 &&
            (info.high_angle_gun_count >= 1 || info.special_high_angle_gun_count >= 1)
        )
        .with(12, () => (_, info) =>
            info.special_anti_air_gun_count >= 1 &&
            info.aa3_gun_count >= 2 && // 特殊機銃と条件が重複するので1つ増し
            info.has_anti_air_radar
        )
        .with(13, () => (ship, info) =>
            !equal_ship_name('摩耶改二', ship.name) &&
            info.special_high_angle_gun_count >= 1 &&
            info.special_anti_air_gun_count >= 1 &&
            info.has_anti_air_radar
        )
        .with(14, () => (ship, info) =>
            equal_ship_name('五十鈴改二', ship.name) &&
            info.high_angle_gun_count >= 1 &&
            info.anti_air_gun_count >= 1 &&
            info.has_anti_air_radar
        )
        .with(15, () => (ship, info) =>
            equal_ship_name('五十鈴改二', ship.name) &&
            info.high_angle_gun_count >= 1 &&
            info.anti_air_gun_count >= 1
        )
        .with(16, () => (ship, info) =>
            includes_ship_name(['霞改二乙', '夕張改二'], ship.name) &&
            info.high_angle_gun_count >= 1 &&
            info.anti_air_gun_count >= 1 &&
            info.has_anti_air_radar
        )
        .with(17, () => (ship, info) =>
            includes_ship_name(['霞改二乙', '稲木改二'], ship.name) &&
            info.high_angle_gun_count >= 1 &&
            info.anti_air_gun_count >= 1
        )
        .with(18, () => (ship, info) =>
            includes_ship_name(['皐月改二', '稲木改二'], ship.name) &&
            info.special_anti_air_gun_count >= 1
        )
        .with(19, () => (ship, info) =>
            equal_ship_name('鬼怒改二', ship.name) &&
            info.has_aa7_or_less_high_gun &&
            info.special_anti_air_gun_count >= 1
        )
        .with(20, () => (ship, info) =>
            equal_ship_name('鬼怒改二', ship.name) &&
            info.special_anti_air_gun_count >= 1
        )
        .with(21, () => (ship, info) =>
            equal_ship_name('由良改二', ship.name) &&
            info.high_angle_gun_count >= 1 &&
            info.has_anti_air_radar
        )
        .with(22, () => (ship, info) =>
            equal_ship_name('文月改二', ship.name) &&
            info.special_anti_air_gun_count >= 1
        )
        .with(23, () => (ship, info) =>
            includes_ship_name(['UIT-25', '伊504'], ship.name) &&
            info.has_aa3to8_gun
        )
        .with(24, () => (ship, info) =>
            includes_ship_name(['天龍改二', '龍田改二'], ship.name) &&
            info.has_aa3to8_gun &&
            info.high_angle_gun_count >= 1
        )
        .with(25, () => (ship, info) =>
            ISE_CLASS_KAI_OR_MORE.includes(ship.name) &&
            info.has_hunshin_kai_ni &&
            info.has_anti_air_radar &&
            info.has_type_3_shell
        )
        .with(26, () => (ship, info) =>
            YAMATO_CLASS_KAI_NI.includes(ship.name) &&
            info.has_ohyodo_gun &&
            info.has_anti_air_radar
        )
        .with(27, () => (ship, info) =>
            equal_ship_name('大淀改', ship.name) &&
            info.has_ohyodo_gun &&
            info.has_hunshin_kai_ni &&
            info.has_anti_air_radar
        )
        .with(28, () => (ship, info) =>
            includes_ship_name(['伊勢改','伊勢改二','日向改','日向改二','武蔵改','武蔵改二'], ship.name) &&
            info.has_hunshin_kai_ni &&
            info.has_anti_air_radar
        )
        .with(29, () => (ship, info) =>
            includes_ship_name(['磯風乙改', '浜風乙改'], ship.name) &&
            info.high_angle_gun_count >= 1 &&
            info.has_anti_air_radar
        )
        .with(30, () => (ship, info) =>
            includes_ship_name(['天龍改二', 'Gotland改', 'Gotland andra'], ship.name) &&
            info.high_angle_gun_count >= 3
        )
        .with(31, () => (ship, info) =>
            includes_ship_name(['天龍改二', '稲木改二'], ship.name) &&
            info.high_angle_gun_count >= 2
        )
        .with(32, () => (ship, info) => { // 🤧
            if (
                (ship.country === Country.UK && is_battle_ship_category(ship.type) ||
                KONGOU_CLASS_KAI_NI.includes(ship.name))
                && info.has_FCR_284
                && info.has_ponpon
            ) return true;
            if (
                (ship.country === Country.UK ||
                KONGOU_CLASS_KAI_NI.includes(ship.name))
                && (info.UP_rocket_count >= 2 || (info.UP_rocket_count >= 1 && info.has_ponpon))
            ) return true;
            return false;
        })
        .with(33, () => (ship, info) =>
            includes_ship_name(['Gotland改', 'Gotland andra'], ship.name) &&
            info.high_angle_gun_count >= 1 &&
            info.has_aa4_gun
        )
        .with(34, () => (ship, info) =>
            equal_ship_name('Fletcher', ship.name) &&
            info.Mk30_GFCS_count >= 2
        )
        .with(35, () => (ship, info) =>
            equal_ship_name('Fletcher', ship.name) &&
            info.Mk30_GFCS_count >= 1 &&
            info.Mk30_kai_count + info.Mk30_count >= 1
        )
        .with(36, () => (ship, info) =>
            equal_ship_name('Fletcher', ship.name) &&
            info.Mk30_count + info.Mk30_kai_count >= 2 &&
            info.has_GFCS_radar
        )
        .with(37, () => (ship, info) =>
            equal_ship_name('Fletcher', ship.name) &&
            info.Mk30_kai_count >= 2
        )
        .with(38, () => (ship, info) =>
            includes_ship_name(['Atlanta', 'Atlanta改'], ship.name) &&
            info.Atlanta_GFCS_gun_count >= 2
        )
        .with(39, () => (ship, info) =>
            includes_ship_name(['Atlanta', 'Atlanta改'], ship.name) &&
            info.Atlanta_gun_count >= 1 &&
            info.Atlanta_GFCS_gun_count >= 1
        )
        .with(40, () => (ship, info) =>
            includes_ship_name(['Atlanta', 'Atlanta改'], ship.name) &&
            info.Atlanta_gun_count + info.Atlanta_GFCS_gun_count >= 2 &&
            info.has_GFCS_radar
        )
        .with(41, () => (ship, info) =>
            includes_ship_name(['Atlanta', 'Atlanta改'], ship.name) &&
            info.Atlanta_gun_count + info.Atlanta_GFCS_gun_count >= 2
        )
        .with(42, () => (ship, info) =>
            YAMATO_CLASS_KAI_NI.includes(ship.name) &&
            info.Yamato_10cm_cluster_count >= 2 &&
            (info.has_yamato_radar || info.has_skilled_yamato_radar) &&
            info.has_aa6_gun
        )
        .with(43, () => (ship, info) =>
            YAMATO_CLASS_KAI_NI.includes(ship.name) &&
            info.Yamato_10cm_cluster_count >= 2 &&
            (info.has_yamato_radar || info.has_skilled_yamato_radar)
        )
        .with(44, () => (ship, info) =>
            YAMATO_CLASS_KAI_NI.includes(ship.name) &&
            info.Yamato_10cm_cluster_count >= 1 &&
            (info.has_yamato_radar || info.has_skilled_yamato_radar) &&
            info.has_aa6_gun
        )
        .with(45, () => (ship, info) =>
            YAMATO_CLASS_KAI_NI.includes(ship.name) &&
            info.Yamato_10cm_cluster_count >= 1 &&
            (info.has_yamato_radar || info.has_skilled_yamato_radar)
        )
        .with(46, () => (ship, info) =>
            equal_ship_name('榛名改二乙', ship.name) &&
            (info.has_kai_3_gun || info.has_kai_4_gun) &&
            info.special_anti_air_gun_count >= 1 &&
            info.has_anti_air_radar
        )
        .with(47, () => (ship, info) =>
            includes_ship_name(['白露改二', '時雨改二', '時雨改三', '村雨改二', '春雨改二'], ship.name) &&
            info.C_H_gun_count >= 1 &&
            (info.C_H_gun_count >= 2 || info.Shigure_gun_cluster_count >= 1 || info.has_aa4_radar)
        )
        .with(48, () => (ship, info) =>
            AKIZUKI_CLASS_KAI_OR_MORE.includes(ship.name) &&
            info.hatsuzuki_gun_count >= 2 &&
            info.has_aa4_radar
        )
        .with(49, () => (ship, info) =>
            includes_ship_name(['藤波改二', '吹雪改二', '白雪改二'], ship.name) &&
            info.special_high_angle_gun_count >= 2 &&
            info.has_aa4_radar
        )
        .with(50, () => (ship, info) => 
            (includes_ship_name(['藤波改二', '吹雪改二', '白雪改二'], ship.name) || ship.class === 'Akizuki') &&
            info.Shirayuki_gun_count + info.hatsuzuki_gun_count >= 2 &&
            info.has_aa4_radar &&
            info.has_94_FD
        )
        .with(51, () => (ship, info) =>
            includes_ship_name(['藤波改二', '吹雪改二', '白雪改二'], ship.name) &&
            info.Shirayuki_gun_count + info.hatsuzuki_gun_count >= 1 &&
            info.has_aa4_radar &&
            info.aa3_gun_count >= 1
        )
        .with(52, () => (ship, info) =>
            // 秋月型ok
            // https://x.com/yukicacoon/status/1922247484606210062/photo/1
            (includes_ship_name(['藤波改二', '吹雪改二', '白雪改二'], ship.name) || ship.class === 'Akizuki') &&
            info.Shirayuki_gun_count >= 2 &&
            info.has_94_FD
        )
        .exhaustive();
};

/**
 * 艦の発動可能なAACI種別の配列を返す
 * @param ship 
 * @param info 
 * @returns 
 */
export function calc_triggerable_AACIs(
    ship: NakedShip,
    info: PrepareAaciInfo,
): AntiAirCutinType[] {
    const param_ship = {
        name: ship.name_jp,
        type: ship.type_id,
        class: is_player_equipped_ship(ship) ? ship.ship_class : null,
        country: is_player_equipped_ship(ship) ? ship.country : null,
    }
    return ANTI_AIR_CUTIN_TYPES.filter((cutin_type) => {
        const condition = AACI_CONDITIONS(cutin_type);
        return condition(param_ship, info);
    });
}