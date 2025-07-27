import { analyze_ships_detection, FleetDetectionStatus } from "@/logics/detection";
import { SAIUN } from "tests/setups/assets/equips/plane";
import { Fletcher, Ranger } from "tests/setups/assets/ship/player";
import { derive_PES } from "tests/setups/generator/ship";
import { describe, expect, it } from "vitest";

describe('索敵系テスト', () => {
    it('detection_power と recon_power チェック', () => {
        const EQUIPPED_FLETCHER = derive_PES(Fletcher, []);
        const RANGER = derive_PES(Ranger, []);
        const SAIUN_RANGER = derive_PES(Ranger, [SAIUN])

        const result_1 = analyze_ships_detection([EQUIPPED_FLETCHER]);
        const result_2 = analyze_ships_detection([RANGER]);
        const result_3 = analyze_ships_detection([EQUIPPED_FLETCHER, RANGER]);
        const result_4 = analyze_ships_detection([EQUIPPED_FLETCHER, SAIUN_RANGER]);

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