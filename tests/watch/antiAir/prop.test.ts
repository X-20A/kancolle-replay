import { calc_prop_shootdown_rate } from "@/logics/antiAir/shootdown/prop";
import { Equip, is_player_plane_equip } from "@/models/equip/basic";
import { EquippedShip } from "@/models/ship/equipped";
import { pipe } from "fp-ts/lib/function";
import { SAIUN } from "tests/setups/assets/equips/plane";
import { FLETCHER } from "tests/setups/assets/ship/player";
import { derive_PES } from "tests/setups/generator/ship";
import { describe, expect, it } from "vitest";

describe('対空系テスト', () => {
    it('割合撃墜率', () => {
        const SUPPIN_FLETCHER = derive_PES(FLETCHER, []);

        const test = (
            expected: number,
            attacker_ship: EquippedShip,
            attacked_unit: Equip,
        ) => {
            if (!is_player_plane_equip(attacked_unit)) throw new Error(`${attacked_unit.name_jp} は航空機ではありません`);
            const result = pipe(
                calc_prop_shootdown_rate(attacker_ship.weighted_anti_air, attacked_unit),
            );
            expect(expected).toBe(result);
        };

        test(0.155, SUPPIN_FLETCHER, SAIUN);
    });
});