import PLAYER_EQUIP_DATAS from "@/datas/equip/base/player";
import { EQUIP_IMPLOVEMENT_DATAS } from "@/datas/equip/improvement";
import { TRANSPORT_EQUIP_DATAS } from "@/datas/equip/transportEquip";
import { EQUIP_TYPE_DATAS } from "@/datas/equip/typeData";
import { calcAswSynergy } from "@/logics/asw/synergy";
import { Equip } from "@/models/equip/Equip";
import { brandEquipId } from "@/types/brands/equip";
import { pipe } from "fp-ts/lib/function";
import { curryCreateEquip, curryDeriveAswFlags } from "tests/setup";
import { describe, expect, it } from "vitest"

describe('対潜系テスト', () => {
    it('装備の組み合わせごとに正しい対潜シナジーボーナスを返すことを確認', () => {
        const makeEquip = curryCreateEquip(
            PLAYER_EQUIP_DATAS,
            EQUIP_TYPE_DATAS,
            EQUIP_IMPLOVEMENT_DATAS,
            TRANSPORT_EQUIP_DATAS
        );

        /** 流星改(一航戦/熟練) */
        const RYUUSEI_KAI_SKILLED = makeEquip(brandEquipId(343), 0);
        /** 三式水中探信儀 */
        const SANSHIKI_SONAR = makeEquip(brandEquipId(47), 0);
        /** 零式水中聴音機 */
        const REISHIKI_SONAR = makeEquip(brandEquipId(132), 0);
        /** 三式爆雷投射機 */
        const SANSHIKI_DCP = makeEquip(brandEquipId(45), 0);
        /** 二式爆雷 */
        const NISHIKI_DC = makeEquip(brandEquipId(227), 0);
        /** 対潜短魚雷(試作初期型) */
        const TAN_GYORAI = makeEquip(brandEquipId(378), 0);
        /** 二式12cm迫撃砲改 */
        const NISHIKI_HAKUGEKI = makeEquip(brandEquipId(346), 0);
        
        const make_flags = curryDeriveAswFlags(EQUIP_TYPE_DATAS);

        const test = (expected: number, equips: Equip[]) => {
            expect(expected).toBe(pipe(equips, make_flags, calcAswSynergy));
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