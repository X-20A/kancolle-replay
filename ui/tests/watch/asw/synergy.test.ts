import { calcAswSynergy } from "@/logics/asw/synergy";
import { Equip } from "@/models/equip/Equip";
import { pipe } from "fp-ts/lib/function";
import { describe, expect, it } from "vitest"
import { deriveAswFlags } from "@/models/ship/aswFlags";
import { short_make_equip_from_id } from "tests/setup";

describe('対潜系テスト', () => {
    it('装備の組み合わせごとに正しい対潜シナジーボーナスを返すことを確認', () => {
        /** 流星改(一航戦/熟練) */
        const RYUUSEI_KAI_SKILLED = short_make_equip_from_id(343);
        /** 三式水中探信儀 */
        const SANSHIKI_SONAR = short_make_equip_from_id(47);
        /** 零式水中聴音機 */
        const REISHIKI_SONAR = short_make_equip_from_id(132);
        /** 三式爆雷投射機 */
        const SANSHIKI_DCP = short_make_equip_from_id(45);
        /** 二式爆雷 */
        const NISHIKI_DC = short_make_equip_from_id(227);
        /** 対潜短魚雷(試作初期型) */
        const TAN_GYORAI = short_make_equip_from_id(378);
        /** 二式12cm迫撃砲改 */
        const NISHIKI_HAKUGEKI = short_make_equip_from_id(346);

        const test = (expected: number, equips: Equip[]) => {
            expect(expected).toBe(pipe(equips, deriveAswFlags, calcAswSynergy));
        };

        test(1, []);
        test(1, [RYUUSEI_KAI_SKILLED]);
        test(1, [SANSHIKI_SONAR]);
        test(1, [REISHIKI_SONAR]);
        test(1, [SANSHIKI_DCP]);
        test(1, [NISHIKI_DC]);
        test(1, [NISHIKI_HAKUGEKI]);
        test(1, [SANSHIKI_SONAR, RYUUSEI_KAI_SKILLED]);

        // 以下参考: https://wikiwiki.jp/kancolle/戦闘について#AntiSubmarine
        test(1.15, [SANSHIKI_SONAR, SANSHIKI_DCP]);
        test(1.15, [REISHIKI_SONAR, SANSHIKI_DCP]);
        test(1.15, [SANSHIKI_SONAR, NISHIKI_HAKUGEKI]);
        test(1.15, [REISHIKI_SONAR, NISHIKI_HAKUGEKI]);

        test(1.15, [SANSHIKI_SONAR, NISHIKI_DC]);
        test(1.15, [SANSHIKI_SONAR, TAN_GYORAI]);

        test(1.1, [SANSHIKI_DCP, TAN_GYORAI]);

        test(1.4375, [SANSHIKI_SONAR, SANSHIKI_DCP, TAN_GYORAI]);
        test(1.265, [REISHIKI_SONAR, SANSHIKI_DCP, TAN_GYORAI]);
    });
});