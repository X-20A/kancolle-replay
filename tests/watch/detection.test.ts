import { analyze_ships_detection, FleetDetectionStatus } from "@/logics/detection";
import { SAIUN } from "tests/setups/assets/equips/plane";
import { make_Fletcher, make_Ranger } from "tests/setups/assets/ship/player";
import { describe, expect, it } from "vitest";

describe('索敵系テスト', () => {
    it('detection_power と recon_power チェック', () => {
        const FLETCHER = make_Fletcher([]);
        const RANGER = make_Ranger([]);
        const SAIUN_RANGER = make_Ranger([SAIUN])

        const result_1 = analyze_ships_detection([FLETCHER]);
        const result_2 = analyze_ships_detection([RANGER]);
        const result_3 = analyze_ships_detection([FLETCHER, RANGER]);
        const result_4 = analyze_ships_detection([FLETCHER, SAIUN_RANGER]);

        const test = (expected: number[], result: FleetDetectionStatus) => {
            expect(expected[0]).toBe(result.recon_power);
            expect(expected[1]).toBe(result.detection_power);
        };

        test([0, -3.5], result_1);
        test([30, 31], result_2);
        test([30, 27.1], result_3);
        test([61, 35.9], result_4);
    });
});