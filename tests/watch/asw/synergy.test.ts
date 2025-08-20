import { calc_ASW_synergy } from "@/logics/asw/synergy";
import { describe, expect, it } from "vitest"
import { derive_ASW_pre_info } from "@/logics/asw/preInfo";
import { PlayerEquip } from "@/models/equip/basic";
import { RYUUSEI_IKKOUSEN_SKILLED } from "tests/setups/assets/equips/plane";
import { NISHIKI_DC, NISHIKI_HAKUGEKI, REISHIKI_SONAR, SANSHIKI_DCP, SANSHIKI_SONAR, TAN_GYORAI_DC } from "tests/setups/assets/equips/asw";

describe('対潜系テスト', () => {
    it('装備の組み合わせごとに正しい対潜シナジーボーナスを返すことを確認', () => {
        const test = (
            expected: number,
            equips: PlayerEquip[],
        ): void => {
            const pre_info = derive_ASW_pre_info(equips);
            const result = calc_ASW_synergy(pre_info);
            //console.log(equips[0]?.name_jp);
            //console.log('pre_info: ', pre_info);
            //console.log('result: ', result);
            expect(expected).toBe(result);

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