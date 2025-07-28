import { evaluateCanOASW } from "@/logics/asw/OASW/evaluate";
import { EquippedShip } from "@/models/ship/equipped";
import { pipe } from "fp-ts/lib/function";
import { MK_32_DCP, TAN_GYORAI_DC, TYPE_144_SONAR } from "tests/setups/assets/equips/asw";
import { F4U_1D } from "tests/setups/assets/equips/plane";
import { KIYOSHIMO_KAI, SHIRATSUYU_KAI_NI, KAKO_KAI_NI, MUTSUKI, KAGA_KAI_NI_GO, UKURU_KAI, FLETCHER, TAMANAMI_KAI } from "tests/setups/assets/ship/player";
import { derive_PES } from "tests/setups/generator/ship";
import { describe, expect, it } from "vitest"


describe('対潜系テスト', () => {
    it('先制対潜判定チェック', () => {
        const SUPPIN_MUTSUKI = derive_PES(MUTSUKI, []);
        const SUPPIN_FLETCHER = derive_PES(FLETCHER, []);
        const TAMANAMI = derive_PES(TAMANAMI_KAI, [TYPE_144_SONAR, TAN_GYORAI_DC]);
        const KIYOSHIMO = derive_PES(KIYOSHIMO_KAI, [TYPE_144_SONAR, TAN_GYORAI_DC]);
        const SHIRATSUYU = derive_PES(SHIRATSUYU_KAI_NI, [TAN_GYORAI_DC, MK_32_DCP]);
        const KAKO = derive_PES(KAKO_KAI_NI, [TYPE_144_SONAR, TAN_GYORAI_DC, MK_32_DCP]);
        const NO_EQUIP_KAGA = derive_PES(KAGA_KAI_NI_GO, []);
        const KAGA = derive_PES(KAGA_KAI_NI_GO, [F4U_1D]);
        const UKURU = derive_PES(UKURU_KAI, []);

        const test = (expected: boolean, ship: EquippedShip) => {
            expect(expected).toBe(pipe(ship, evaluateCanOASW));
        };

        test(false, SUPPIN_MUTSUKI); // 駆逐デフォルト
        test(true, SUPPIN_FLETCHER); // 無条件先制対潜
        test(false, TAMANAMI); // 対潜99
        test(true, KIYOSHIMO); // 100ピッタシ
        test(false, SHIRATSUYU); // 対潜100以上 ソナーなし
        test(false, KAKO); // 不可艦種
        test(false, NO_EQUIP_KAGA); // 装備無加賀改二護
        test(true, KAGA); // 対潜1艦爆 加賀改二護
        test(false, UKURU); // 素対潜: 88
        // TODO: ちょいちょい追加していこう
    });
});