import { calc_prop_shotdown_rate } from "@/logics/antiAir/prop";
import { Equip, is_plane_equip } from "@/models/equip/basic";
import { EquippedShip } from "@/models/ship/equipped";
import { pipe } from "fp-ts/lib/function";
import { SAIUN } from "tests/setups/assets/equips/plane";
import { make_Fletcher } from "tests/setups/assets/ship";
import { describe, expect, it } from "vitest";

describe('対空系テスト', () => {
    it('割合撃墜率', () => {
        const FLETCHER = make_Fletcher([]);

        const test = (
            expected: number,
            attacker_ship: EquippedShip,
            attacked_unit: Equip,
        ) => {
            if (!is_plane_equip(attacked_unit)) throw new Error(`${attacked_unit.name_jp} は航空機ではありません`);
            const result = pipe(
                calc_prop_shotdown_rate(attacker_ship.weighted_anti_air, attacked_unit),
            );
            expect(expected).toBe(result);
        };

        test(0.155, FLETCHER, SAIUN);
    });
});