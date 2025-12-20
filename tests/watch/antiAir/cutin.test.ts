import { AACIType, calc_triggerable_AACIs } from "@/logics/antiAir/cutin/conditions";
import { Equip } from "@/models/equip/basic";
import { derive_AACI_pre_info } from "@/logics/antiAir/cutin/preInfo";
import { NakedShip } from "@/models/ship/naked";
import { FD_91, FD_94, GUN_127, GUN_77, HUNSHIN_KAI_NI, PONPON, SINGLE_25, TRIPLE_25, UP_ROCKET, ZOUBI_25 } from "tests/setups/assets/equips/antiAir";
import { AKIZUKI_GUN, ATLANTA_GUN, HATSUZUKI_GUN, HIGH_10, HIGH_127, LARGE_356, MIKUMA_GUN, FCR_284, OOYODO_GUN, TANYAN_GUN, MK30_GFCS, MK30, MK30_KAI, ATLANTA_GFCS_GUN, YAMATO_10CM_CLUSTER, HARUNA_GUN_3, HARUNA_GUN_4, HARUSAME_GUN, SHIRAYUKI_GUN } from "tests/setups/assets/equips/gun";
import { TYPE_3_SHELL } from "tests/setups/assets/equips/other";
import { GFCS_RADAR, RADAR_13, RADAR_13_KAI, SURFACE_22, YAMATO_RADAR } from "tests/setups/assets/equips/radar";
import { AA_GUN_IMP, AIR_DEFENCE_PRINCESS, LANDING_WA_FLAGSHIP } from "tests/setups/assets/ship/abyssal";
import { derive_naked_ship_from_name } from "tests/setups/generator/ship";
import { describe, expect, it } from "vitest";
import { AbyssalEquippedShip } from "@/models/ship/equipped";

describe('制空系テスト', () => {
    it('艦娘対空CI', () => {
        const AKIZUKI = derive_naked_ship_from_name('秋月');
        const HIEI_KAI = derive_naked_ship_from_name('比叡改');
        const NAGATO = derive_naked_ship_from_name('長門');
        const SHIKINAMI_KAI = derive_naked_ship_from_name('敷波改');
        const MAYA_KAI_NI = derive_naked_ship_from_name('摩耶改二');
        const ISUZU_KAI_NI = derive_naked_ship_from_name('五十鈴改二');
        const KASUMI_KAI_NI_OTSU = derive_naked_ship_from_name('霞改二乙');
        const YUUBARI_KAI_NI = derive_naked_ship_from_name('夕張改二');
        const INAGI_KAI_NI = derive_naked_ship_from_name('稲木改二');
        const SATSUKI_KAI_NI = derive_naked_ship_from_name('皐月改二');
        const KINU_KAI_NI = derive_naked_ship_from_name('鬼怒改二');
        const YURA_KAI_NI = derive_naked_ship_from_name('由良改二');
        const FUMIZUKI_KAI_NI = derive_naked_ship_from_name('文月改二');
        const UIT_25 = derive_naked_ship_from_name('UIT-25');
        const I_504 = derive_naked_ship_from_name('伊504');
        const TENRYUU_KAI_NI = derive_naked_ship_from_name('天龍改二');
        const TATSUTA_KAI_NI = derive_naked_ship_from_name('龍田改二');
        const ISE_KAI = derive_naked_ship_from_name('伊勢改');
        const YAMATO_KAI_NI = derive_naked_ship_from_name('大和改二');
        const OOYODO_KAI = derive_naked_ship_from_name('大淀改');
        const MUSASHI_KAI = derive_naked_ship_from_name('武蔵改');
        const ISOKAZE_OTSU_KAI = derive_naked_ship_from_name('磯風乙改');
        const HAMAKAZE_OTSU_KAI = derive_naked_ship_from_name('浜風乙改');
        const GOTLAND_KAI = derive_naked_ship_from_name('Gotland改');
        const NELSON = derive_naked_ship_from_name('Nelson');
        const KONGOU_KAI_NI = derive_naked_ship_from_name('金剛改二');
        const JERVIS = derive_naked_ship_from_name('Jervis');
        const FLETCHER = derive_naked_ship_from_name('Fletcher');
        const ATLANTA = derive_naked_ship_from_name('Atlanta');
        const HARUNA_KAI_NI_OTSU = derive_naked_ship_from_name('榛名改二乙');
        const SHIRATSUYU_KAI_NI = derive_naked_ship_from_name('白露改二');
        const AKIZUKI_KAI = derive_naked_ship_from_name('秋月改');
        const FUJINAMI_KAI_NI = derive_naked_ship_from_name('藤波改二');

        const test = (
            expected: AACIType[],
            ship: NakedShip,
            equips: Equip[],
        ) => {
            const info = derive_AACI_pre_info(equips);
            const result = calc_triggerable_AACIs(ship, info);

            expect(result).toHaveLength(expected.length);
            expect(result).toEqual(expect.arrayContaining(expected));
        };

        // 最小構成チェック
        test([1, 2, 3], AKIZUKI, [HIGH_10, HIGH_10, SURFACE_22]);
        test([2], AKIZUKI, [HIGH_10, SURFACE_22]);
        test([3], AKIZUKI, [HIGH_10, HIGH_10]);
        test([4, 6], HIEI_KAI, [LARGE_356, TYPE_3_SHELL, FD_91, RADAR_13]);
        test([5, 8], SHIKINAMI_KAI, [TANYAN_GUN, TANYAN_GUN, RADAR_13]);
        test([6], HIEI_KAI, [LARGE_356, TYPE_3_SHELL, FD_91]);
        test([7, 9], SHIKINAMI_KAI, [HIGH_10, FD_91, RADAR_13]);
        test([8], SHIKINAMI_KAI, [TANYAN_GUN, RADAR_13]);
        test([9], SHIKINAMI_KAI, [HIGH_10, FD_91]);
        test([10, 11], MAYA_KAI_NI, [HIGH_127, PONPON, RADAR_13]);
        test([11], MAYA_KAI_NI, [HIGH_127, PONPON]);
        test([12], MAYA_KAI_NI, [PONPON, GUN_127, RADAR_13]);
        test([13, 8], SHIKINAMI_KAI, [TANYAN_GUN, PONPON, RADAR_13]);
        test([14, 15], ISUZU_KAI_NI, [HIGH_10, GUN_77, RADAR_13]);
        test([15], ISUZU_KAI_NI, [HIGH_10, GUN_77]);
        test([16, 17], KASUMI_KAI_NI_OTSU, [HIGH_10, GUN_77, RADAR_13]);
        test([16], YUUBARI_KAI_NI, [HIGH_10, GUN_77, RADAR_13]);
        test([17], KASUMI_KAI_NI_OTSU, [HIGH_10, GUN_77]);
        test([17], INAGI_KAI_NI, [HIGH_10, GUN_77]);
        test([18], SATSUKI_KAI_NI, [PONPON]);
        test([18], INAGI_KAI_NI, [PONPON]);
        test([19, 20], KINU_KAI_NI, [HIGH_10, PONPON]);
        test([20], KINU_KAI_NI, [PONPON]);
        test([21], YURA_KAI_NI, [HIGH_10, RADAR_13]);
        test([22], FUMIZUKI_KAI_NI, [PONPON]);
        test([23], UIT_25, [GUN_127]);
        test([23], I_504, [GUN_127]);
        test([24], TENRYUU_KAI_NI, [HIGH_10, GUN_127]);
        test([24], TATSUTA_KAI_NI, [HIGH_10, GUN_127]);
        test([25, 28], ISE_KAI, [HUNSHIN_KAI_NI, RADAR_13, TYPE_3_SHELL]);
        test([26, 8], YAMATO_KAI_NI, [OOYODO_GUN, RADAR_13]);
        test([27, 8], OOYODO_KAI, [OOYODO_GUN, HUNSHIN_KAI_NI, RADAR_13]);
        test([28], ISE_KAI, [HUNSHIN_KAI_NI, RADAR_13]);
        test([28], MUSASHI_KAI, [HUNSHIN_KAI_NI, RADAR_13]);
        test([29], ISOKAZE_OTSU_KAI, [HIGH_10, RADAR_13]);
        test([29], HAMAKAZE_OTSU_KAI, [HIGH_10, RADAR_13]);
        test([30, 31], TENRYUU_KAI_NI, [HIGH_10, HIGH_10, HIGH_10]);
        test([30], GOTLAND_KAI, [HIGH_10, HIGH_10, HIGH_10]);
        test([31], TENRYUU_KAI_NI, [HIGH_10, HIGH_10]);
        test([31], INAGI_KAI_NI, [HIGH_10, HIGH_10]);
        test([32], NELSON, [FCR_284, PONPON]);
        test([32], KONGOU_KAI_NI, [FCR_284, PONPON]);
        test([32], JERVIS, [UP_ROCKET, PONPON]);
        test([32], JERVIS, [UP_ROCKET, UP_ROCKET]);
        test([32], KONGOU_KAI_NI, [UP_ROCKET, PONPON]);
        test([32], KONGOU_KAI_NI, [UP_ROCKET, UP_ROCKET]);
        test([33], GOTLAND_KAI, [HIGH_10, SINGLE_25]);
        test([34], FLETCHER, [MK30_GFCS, MK30_GFCS]);
        test([35], FLETCHER, [MK30_GFCS, MK30]);
        test([36], FLETCHER, [MK30, MK30, GFCS_RADAR]);
        test([37], FLETCHER, [MK30_KAI, MK30_KAI]);
        test([38, 41], ATLANTA, [ATLANTA_GFCS_GUN, ATLANTA_GFCS_GUN]);
        test([39, 41], ATLANTA, [ATLANTA_GFCS_GUN, ATLANTA_GUN]);
        test([40, 41, 5, 8], ATLANTA, [ATLANTA_GUN, ATLANTA_GUN, GFCS_RADAR]);
        test([41], ATLANTA, [ATLANTA_GUN, ATLANTA_GUN]);
        test([42, 43, 44, 45, 5, 8], YAMATO_KAI_NI, [YAMATO_10CM_CLUSTER, YAMATO_10CM_CLUSTER, YAMATO_RADAR, TRIPLE_25]);
        test([43, 45, 5, 8], YAMATO_KAI_NI, [YAMATO_10CM_CLUSTER, YAMATO_10CM_CLUSTER, YAMATO_RADAR]);
        test([44, 45, 8], YAMATO_KAI_NI, [YAMATO_10CM_CLUSTER, YAMATO_RADAR, TRIPLE_25]);
        test([45, 8], YAMATO_KAI_NI, [YAMATO_10CM_CLUSTER, YAMATO_RADAR]);
        test([46], HARUNA_KAI_NI_OTSU, [HARUNA_GUN_3, PONPON, RADAR_13]);
        test([46], HARUNA_KAI_NI_OTSU, [HARUNA_GUN_4, PONPON, RADAR_13]);
        test([47], SHIRATSUYU_KAI_NI, [HARUSAME_GUN, HARUSAME_GUN]);
        test([47], SHIRATSUYU_KAI_NI, [HARUSAME_GUN, ZOUBI_25]);
        test([47], SHIRATSUYU_KAI_NI, [HARUSAME_GUN, RADAR_13_KAI]);
        test([48, 1, 2, 3], AKIZUKI_KAI, [HATSUZUKI_GUN, HATSUZUKI_GUN, RADAR_13_KAI]);
        test([49, 5, 8], FUJINAMI_KAI_NI, [TANYAN_GUN, TANYAN_GUN, RADAR_13_KAI]);
        test([50, 52, 7, 9], FUJINAMI_KAI_NI, [SHIRAYUKI_GUN, SHIRAYUKI_GUN, RADAR_13_KAI, FD_94]);
        test([50, 52, 1, 2, 3, 9], AKIZUKI, [SHIRAYUKI_GUN, SHIRAYUKI_GUN, RADAR_13_KAI, FD_94]);
        test([51], FUJINAMI_KAI_NI, [SHIRAYUKI_GUN, RADAR_13_KAI, GUN_127]);
        test([52, 9], FUJINAMI_KAI_NI, [SHIRAYUKI_GUN, SHIRAYUKI_GUN, FD_94]);

        // 負例

        // 秋月型では 5,7,8種 は発動しない
        test([1, 2, 3], AKIZUKI, [AKIZUKI_GUN, AKIZUKI_GUN, RADAR_13]);
        // 4,6種は大口径主砲でないと発動しない
        test([], NAGATO, [MIKUMA_GUN, TYPE_3_SHELL, FD_91, RADAR_13]);
        // +高射装置系は高射装置にカウントしない
        // 10cm連装高角砲＋高射装置を高射装置としてカウントしてると7,9が出る
        test([8], SHIKINAMI_KAI, [HIGH_10, AKIZUKI_GUN, RADAR_13]);
        // 摩耶改二では 13種 は発動しない
        test([8, 10, 11], MAYA_KAI_NI, [ATLANTA_GUN, PONPON, RADAR_13]);
        // 秋月型未改では48種は発動しない
        test([1, 2, 3], AKIZUKI, [HATSUZUKI_GUN, HATSUZUKI_GUN, GFCS_RADAR]);
        // 19種は素対空8以上の高角砲では発動しない
        test([20], KINU_KAI_NI, [TANYAN_GUN, PONPON]);
        // 23種は素対空3～8の機銃でしか発動しない
        test([], I_504, [GUN_77]);
        test([], I_504, [PONPON]);
        // 24種は素対空3～8の機銃でしか発動しない
        test([], TENRYUU_KAI_NI, [HIGH_10, GUN_77]);
        test([], TENRYUU_KAI_NI, [HIGH_10, PONPON]);
    });

    it('深海対空CI', () => {
        const test = (
            expected: AACIType[],
            ship: AbyssalEquippedShip,
        ) => {
            const result = ship.triggerable_AACIs;
            expect(result).toHaveLength(expected.length);
            expect(result).toEqual(expect.arrayContaining(expected));
        };

        // 汎用CI系最小構成
        test([5, 8], LANDING_WA_FLAGSHIP);
        // 汎用6種は三式弾系を要求するが現状これを装備した深海艦はいない(しかし装備データはある)
        // 高射装置は内蔵含め深海側には無い？
        // 高射装置が必要な6,7,9はスキップ
        test([12], AA_GUN_IMP);
        test([5, 8], AIR_DEFENCE_PRINCESS);
    });
});