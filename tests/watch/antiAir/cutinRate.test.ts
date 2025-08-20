import { calc_triggerable_AACIs } from "@/logics/antiAir/cutin/conditions";
import { calc_AACI_rates } from "@/logics/antiAir/cutin/rate";
import { Equip } from "@/models/equip/basic";
import { derive_AACI_pre_info } from "@/logics/antiAir/cutin/preInfo";
import { NakedShip } from "@/models/ship/naked";
import { ATLANTA_GUN, HIGH_10 } from "tests/setups/assets/equips/gun";
import { GFCS_RADAR, SURFACE_22 } from "tests/setups/assets/equips/radar";
import { derive_naked_ship_from_name } from "tests/setups/generator/ship";
import { describe, expect, it } from "vitest";

describe('制空系テスト', () => {
    it('対空CI率', () => {
        const AKIZUKI = derive_naked_ship_from_name('秋月');
        const ATLANTA = derive_naked_ship_from_name('Atlanta');

        type ResultType = {
            rates: number[],
            missfire_rate: number,
        }
        const test = (
            expected: ResultType,
            ship: NakedShip,
            equips: Equip[],
        ) => {
            const info = derive_AACI_pre_info(equips);
            const aaci_ids = calc_triggerable_AACIs(ship, info);
            const result = calc_AACI_rates(aaci_ids);
            const result_rates = result.AACI_rates;

            expect(expected.rates.length).toBe(result_rates.length);
            expected.rates.forEach((expected_rate, index) => {
                if (!result_rates[index]) throw new Error(`result_rates[${index}] is undefined`);
                expect(expected_rate.toString()).toBe(result_rates[index].rate.toString());
            })
        };

        test(
            {
                rates: [0.65, 0.1925, 0.07875],
                missfire_rate: 0.07875,
            },
            AKIZUKI,
            [HIGH_10, HIGH_10, SURFACE_22],
        );
        test(
            {
                rates: [0.56, 0.242, 0.099, 0.0495],
                missfire_rate: 0.0495,
            },
            ATLANTA,
            [ATLANTA_GUN, ATLANTA_GUN, GFCS_RADAR],
        );
    });
});