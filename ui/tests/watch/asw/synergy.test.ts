import { calcAswSynergy } from "@/logics/asw/synergy";
import { EquipBase } from "@/models/equip/Equip";
import { pipe } from "fp-ts/lib/function";
import { describe, expect, it } from "vitest"
import { deriveAswFlags } from "@/models/ship/aswFlags";
import { NISHIKI_DC, NISHIKI_HAKUGEKI, REISHIKI_SONAR, RYUUSEI_IKKOUSEN_SKILLED, SANSHIKI_DCP, SANSHIKI_SONAR, TAN_GYORAI_DC } from "tests/setups/assets/equip";

describe('対潜系テスト', () => {
    it('装備の組み合わせごとに正しい対潜シナジーボーナスを返すことを確認', () => {
        const test = (expected: number, equips: EquipBase[]) => {
            expect(expected).toBe(pipe(equips, deriveAswFlags, calcAswSynergy));
        };

        test(1, []);
        test(1, [RYUUSEI_IKKOUSEN_SKILLED]);
        test(1, [SANSHIKI_SONAR]);
        test(1, [REISHIKI_SONAR]);
        test(1, [SANSHIKI_DCP]);
        test(1, [NISHIKI_DC]);
        test(1, [NISHIKI_HAKUGEKI]);
        test(1, [SANSHIKI_SONAR, RYUUSEI_IKKOUSEN_SKILLED]);

        // 以下参考: https://wikiwiki.jp/kancolle/戦闘について#AntiSubmarine
        test(1.15, [SANSHIKI_SONAR, SANSHIKI_DCP]);
        test(1.15, [REISHIKI_SONAR, SANSHIKI_DCP]);
        test(1.15, [SANSHIKI_SONAR, NISHIKI_HAKUGEKI]);
        test(1.15, [REISHIKI_SONAR, NISHIKI_HAKUGEKI]);

        test(1.15, [SANSHIKI_SONAR, NISHIKI_DC]);
        test(1.15, [SANSHIKI_SONAR, TAN_GYORAI_DC]);

        test(1.1, [SANSHIKI_DCP, TAN_GYORAI_DC]);

        test(1.4375, [SANSHIKI_SONAR, SANSHIKI_DCP, TAN_GYORAI_DC]);
        test(1.265, [REISHIKI_SONAR, SANSHIKI_DCP, TAN_GYORAI_DC]);
    });
});