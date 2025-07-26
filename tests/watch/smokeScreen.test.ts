import { calc_smoke_screen_activate_rate, calc_triggered_smoke_type, SmokeScreenType, SmokeScreenRates } from "@/logics/smokeScreen";
import { derive_player_fleet } from "@/models/fleet/Fleet";
import { RandValue } from "@/types/brands/other";
import { ENMAKU, ENMAKU_KAI } from "tests/setups/assets/equips/other";
import { FLETCHER } from "tests/setups/assets/ship/player";
import { derive_PES } from "tests/setups/generator/ship";
import { describe, expect, it } from "vitest";

describe('煙幕系テスト', () => {
    it('艦・装備の組み合わせによって正しい煙幕発動率を返すことを確認', () => {
        const SUPPIN_FLETCHER = derive_PES(FLETCHER, []); // 運30
        const ENMAKU_FLETCHER = derive_PES(FLETCHER, [ENMAKU]);
        const DOUBLE_ENMAKU_FLETCHER = derive_PES(FLETCHER, [ENMAKU, ENMAKU]);
        const ENMAKU_KAI_FLETCHER = derive_PES(FLETCHER, [ENMAKU_KAI]);
        const OOMORI_FLETCHER = derive_PES(FLETCHER, [ENMAKU_KAI, ENMAKU_KAI]);

        const fleet_1 = derive_player_fleet([SUPPIN_FLETCHER], []);
        const fleet_2 = derive_player_fleet([ENMAKU_FLETCHER], []);
        const fleet_3 = derive_player_fleet([DOUBLE_ENMAKU_FLETCHER], []);
        const fleet_4 = derive_player_fleet([ENMAKU_KAI_FLETCHER], []);
        const fleet_5 = derive_player_fleet([OOMORI_FLETCHER], []);

        const rates_1 = calc_smoke_screen_activate_rate(fleet_1);
        const rates_2 = calc_smoke_screen_activate_rate(fleet_2);
        const rates_3 = calc_smoke_screen_activate_rate(fleet_3);
        const rates_4 = calc_smoke_screen_activate_rate(fleet_4);
        const rates_5 = calc_smoke_screen_activate_rate(fleet_5);

        const test = (expected: number[], rates: SmokeScreenRates) => {
            expect(expected[0]).toBe(rates.Misfire);
            expect(expected[1]).toBe(rates.Single);
            expect(expected[2]).toBe(rates.Twofold);
            expect(expected[3]).toBe(rates.Threefold);
        };

        test([100,0,0,0], rates_1);
        test([100,0,0,0], rates_2);
        test([0,57,43,0], rates_3);
        test([0,57,43,0], rates_4);
        test([0,27,30,43], rates_5);
        // TODO: 改修値アリとか
    });

    it('渡した発動率で実際に作動することを確認', () => {
        const derive_rates = (
            rates: number[],
        ): SmokeScreenRates => {
            return {
                Misfire: rates[0],
                Single: rates[1],
                Twofold: rates[2],
                Threefold: rates[3],
            }
        }

        const rates_1 = derive_rates([100, 0, 0, 0]);
        const rates_2 = derive_rates([0, 57, 43, 0]);
        const rates_3 = derive_rates([0, 27, 30, 43]);

        const test = (
            expected: SmokeScreenType | 'Misfire',
            rates: SmokeScreenRates,
            rand_value: number,
        ): void => {
            expect(expected).toBe(calc_triggered_smoke_type(rates, rand_value as RandValue));
        }

        test('Misfire', rates_1, 0);
        test('Single', rates_2, 0.56);
        test('Twofold', rates_2, 0.571);
        test('Threefold', rates_3, 1);
    });
});