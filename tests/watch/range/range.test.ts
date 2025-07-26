import { EquippedShip } from "@/models/ship/equipped";
import { SKILLED_SPANNER } from "tests/setups/assets/equips/other";
import { NISHIKI_SCOUT_PLANE } from "tests/setups/assets/equips/plane";
import { GFCS_RADAR, SG_INITIAL_RADAR } from "tests/setups/assets/equips/radar";
import { FLETCHER, Ise_kai_ni } from "tests/setups/assets/ship/player";
import { derive_PES } from "tests/setups/generator/ship";
import { describe, expect, it } from "vitest";

describe('射程系テスト', () => {
    it('装備による射程変化チェック', () => {    
        const SUPPIN_FLETCHER = derive_PES(FLETCHER, []);
        const GFCS_FLETCHER = derive_PES(FLETCHER, [GFCS_RADAR]);
        const SG_FLETCHER = derive_PES(FLETCHER, [SG_INITIAL_RADAR]);
        const SG_GFCS_FLETCHER = derive_PES(FLETCHER, [GFCS_RADAR, SG_INITIAL_RADAR]);

        const ISE = derive_PES(Ise_kai_ni, []);
        const NISHIKI_ISE = derive_PES(Ise_kai_ni, [NISHIKI_SCOUT_PLANE]);
        const SPANNER_ISE = derive_PES(Ise_kai_ni, [SKILLED_SPANNER]);
        const FULL_ISE = derive_PES(Ise_kai_ni, [NISHIKI_SCOUT_PLANE, SKILLED_SPANNER]);

        const test = (expected: number, ship: EquippedShip) => {
            expect(expected).toBe(ship.view_status.range);
        };

        test(1, SUPPIN_FLETCHER);
        test(2, GFCS_FLETCHER);
        test(3, SG_FLETCHER);
        test(3, SG_GFCS_FLETCHER);

        test(2, ISE);
        test(3, NISHIKI_ISE);
        test(4, SPANNER_ISE);
        test(5, FULL_ISE);
    });
});