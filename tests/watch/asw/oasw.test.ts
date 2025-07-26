import { evaluateCanOASW } from "@/logics/asw/OASW/evaluate";
import { EquippedShip } from "@/models/ship/equipped";
import { pipe } from "fp-ts/lib/function";
import { MK_32_DCP, TAN_GYORAI_DC, TYPE_144_SONAR } from "tests/setups/assets/equips/asw";
import { F4U_1D } from "tests/setups/assets/equips/plane";
import { Kiyoshimo_kai, Shiratsuyu_kai_2, Kako_kai_ni, Mutsuki, Oyashio, Kaga_kai_ni_go, Ukuru_kai, FLETCHER } from "tests/setups/assets/ship/player";
import { derive_PES } from "tests/setups/generator/ship";
import { describe, expect, it } from "vitest"


describe('対潜系テスト', () => {
    it('先制対潜判定チェック', () => {
        const MUTSUKI = derive_PES(Mutsuki, []);
        const SUPPIN_FLETCHER = derive_PES(FLETCHER, []);
        const OYASHIO = derive_PES(Oyashio, [TYPE_144_SONAR, TAN_GYORAI_DC, MK_32_DCP]); // 実際は2スロ
        const KIYOSHIMO = derive_PES(Kiyoshimo_kai, [TYPE_144_SONAR, TAN_GYORAI_DC]);
        const SHIRATSUYU = derive_PES(Shiratsuyu_kai_2, [TAN_GYORAI_DC, MK_32_DCP]);
        const KAKO = derive_PES(Kako_kai_ni, [TYPE_144_SONAR, TAN_GYORAI_DC, MK_32_DCP]);
        const NO_EQUIP_KAGA = derive_PES(Kaga_kai_ni_go, []);
        const KAGA = derive_PES(Kaga_kai_ni_go, [F4U_1D]);
        const UKURU = derive_PES(Ukuru_kai, []);

        const test = (expected: boolean, ship: EquippedShip) => {
            expect(expected).toBe(pipe(ship, evaluateCanOASW));
        };

        test(false, MUTSUKI); // 駆逐デフォルト
        test(true, SUPPIN_FLETCHER); // 無条件先制対潜
        test(false, OYASHIO); // 対潜99
        test(true, KIYOSHIMO); // 100ピッタシ
        test(false, SHIRATSUYU); // 対潜100以上 ソナーなし
        test(false, KAKO); // 不可艦種
        test(false, NO_EQUIP_KAGA); // 装備無加賀改二護
        test(true, KAGA); // 対潜1艦爆 加賀改二護
        test(false, UKURU); // 素対潜: 88
        // TODO: ちょいちょい追加していこう
    });
});