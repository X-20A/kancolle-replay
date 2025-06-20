import { calc_weighted_anti_air } from "@/logics/antiAir";
import { derive_equip } from "@/models/equip/basic";
import { EquippedShip } from "@/models/ship/equipped";
import { brandEquipId } from "@/types/brands/equip";
import { pipe } from "fp-ts/lib/function";
import { GFCS_RADAR, XF5U } from "tests/setups/assets/equip";
import { make_Ranger } from "tests/setups/assets/ship";
import { describe, expect, it } from "vitest";

describe('制空系テスト', () => {
    it('加重対空値チェック', () => {
        const IMPROVED_77mm = derive_equip(10, brandEquipId(37));
        const HAGE_REPPUU = derive_equip(0, brandEquipId(22), 0);
        const IMPROVED_SHIDEN = derive_equip(10, brandEquipId(55), 100);

        const SUPPIN_RANGER = make_Ranger([]);
        const GUN_RANGER = make_Ranger([IMPROVED_77mm]);
        const XF5U_RANGER = make_Ranger([XF5U]);
        const GFCS_RANGER = make_Ranger([GFCS_RADAR]);


        const test = (expected: number, ship: EquippedShip) => {
            expect(expected).toBe(pipe(ship, calc_weighted_anti_air));
        };

        //test(70, SUPPIN_RANGER);
        test(82, GUN_RANGER);
        //test(72, XF5U_RANGER);
        //test(90, GFCS_RANGER);
    });
});