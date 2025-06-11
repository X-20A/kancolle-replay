import { evaluateCanOASW } from "@/logics/asw/OASW/evaluate";
import { PlayerShip } from "@/models/ship/Ship";
import { pipe } from "fp-ts/lib/function";
import { short_make_equip_from_id, short_make_ship_from_id_equips } from "tests/setup";
import { describe, expect, it } from "vitest"

describe('対潜系テスト', () => {
    it('先制対潜判定チェック', () => {
        /** Type144/147 ASDIC asw: 13 */
        const TYPE_144 = short_make_equip_from_id(261);
        /** 対潜短魚雷(試作初期型) asw: 20 */
        const TAN_GYORAI = short_make_equip_from_id(378);
        /** Mk.32 対潜魚雷(Mk.2落射機) asw: 19 */
        const MK_32 = short_make_equip_from_id(472);
        /** F4U-1D asw: 1 */
        const F4U_1D = short_make_equip_from_id(233);

        const MUTSUKI = short_make_ship_from_id_equips(1, []);
        const FLETCHER = short_make_ship_from_id_equips(596, []);
        const OYASHIO = short_make_ship_from_id_equips(456, [TYPE_144, TAN_GYORAI, MK_32]); // 無印 実際は2スロ
        const KIYOSHIMO = short_make_ship_from_id_equips(325, [TYPE_144, TAN_GYORAI]) // 改
        const SHIRATSUYU = short_make_ship_from_id_equips(497, [TAN_GYORAI, MK_32]);
        const KAKO = short_make_ship_from_id_equips(417, [TYPE_144, TAN_GYORAI, MK_32]);
        const NO_EQUIP_KAGA = short_make_ship_from_id_equips(646, []);
        const KAGA = short_make_ship_from_id_equips(646, [F4U_1D]);
        const UKURU = short_make_ship_from_id_equips(926, []);

        const test = (expected: boolean, ship: PlayerShip) => {
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