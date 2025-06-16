import { evaluateCanOASW } from "@/logics/asw/OASW/evaluate";
import { EquippedShip } from "@/models/ship/equipped";
import { pipe } from "fp-ts/lib/function";
import { F4U_1D, MK_32_DCP, TAN_GYORAI_DC, TYPE_144_SONAR } from "tests/setups/assets/equip";
import { make_Kiyoshimo_kai, make_Shiratsuyu_kai_2, make_Fletcher, make_Kako_kai_ni, make_Mutsuki, make_Oyashio, make_Kaga_kai_ni_go, make_Ukuru_kai } from "tests/setups/assets/ship";
import { describe, expect, it } from "vitest"


describe('対潜系テスト', () => {
    it('先制対潜判定チェック', () => {
        const MUTSUKI = make_Mutsuki([]);
        const FLETCHER = make_Fletcher([]);
        const OYASHIO = make_Oyashio([TYPE_144_SONAR, TAN_GYORAI_DC, MK_32_DCP]); // 実際は2スロ
        const KIYOSHIMO = make_Kiyoshimo_kai([TYPE_144_SONAR, TAN_GYORAI_DC]);
        const SHIRATSUYU = make_Shiratsuyu_kai_2([TAN_GYORAI_DC, MK_32_DCP]);
        const KAKO = make_Kako_kai_ni([TYPE_144_SONAR, TAN_GYORAI_DC, MK_32_DCP]);
        const NO_EQUIP_KAGA = make_Kaga_kai_ni_go([]);
        const KAGA = make_Kaga_kai_ni_go([F4U_1D]);
        const UKURU = make_Ukuru_kai([]);

        const test = (expected: boolean, ship: EquippedShip) => {
            expect(expected).toBe(pipe(ship, evaluateCanOASW));
        };

        test(false, MUTSUKI); // 駆逐デフォルト
        test(true, FLETCHER); // 無条件先制対潜
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