import { calc_weighted_anti_air } from "@/logics/antiAir";
import { derive_equip } from "@/models/equip/basic";
import { EquippedShip } from "@/models/ship/equipped";
import { brandEquipId } from "@/types/brands/equip";
import { pipe } from "fp-ts/lib/function";
import { GFCS_RADAR, XF5U, ZOUBI_25 } from "tests/setups/assets/equip";
import { make_Maya_kai_ni, make_Ranger } from "tests/setups/assets/ship";
import { describe, expect, it } from "vitest";

describe('制空系テスト', () => {
    it('加重対空値チェック', () => {
        const IMPROVED_77mm = derive_equip(9, brandEquipId(37));

        const SUPPIN_RANGER = make_Ranger([]);
        const GUN_RANGER = make_Ranger([IMPROVED_77mm]);
        const XF5U_RANGER = make_Ranger([XF5U]);
        const GFCS_RANGER = make_Ranger([GFCS_RADAR]);
        const BONUS_MAYA = make_Maya_kai_ni([ZOUBI_25]);


        const test = (expected: number, ship: EquippedShip) => {
            expect(expected).toBe(pipe(ship, calc_weighted_anti_air));
        };

        test(35, SUPPIN_RANGER);
        test(47, GUN_RANGER);
        test(37, XF5U_RANGER);
        test(46, GFCS_RANGER);
        test(74, BONUS_MAYA); // 装備ボーナス
    });
});