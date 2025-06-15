import { EquippedPlayerShip } from "@/models/ship/equipped/base";
import { GFCS_RADAR, NISHIKI_SCOUT_PLANE, SG_INITIAL_RADAR, SKILLED_SPANNER } from "tests/setups/assets/equip";
import { make_Fletcher, make_Ise_kai_2 } from "tests/setups/assets/ship";
import { describe, expect, it } from "vitest";

describe('射程系テスト', () => {
    it('装備による射程変化チェック', () => {    
        const FLETCHER = make_Fletcher([]);
        const GFCS_FLETCHER = make_Fletcher([GFCS_RADAR]);
        const SG_FLETCHER = make_Fletcher([SG_INITIAL_RADAR]);
        const SG_GFCS_FLETCHER = make_Fletcher([GFCS_RADAR, SG_INITIAL_RADAR]);

        const ISE = make_Ise_kai_2([]);
        const NISHIKI_ISE = make_Ise_kai_2([NISHIKI_SCOUT_PLANE]);
        const SPANNER_ISE = make_Ise_kai_2([SKILLED_SPANNER]);
        const FULL_ISE = make_Ise_kai_2([NISHIKI_SCOUT_PLANE, SKILLED_SPANNER]);

        const test = (expected: number, ship: EquippedPlayerShip) => {
            expect(expected).toBe(ship.view_status.range);
        };

        test(1, FLETCHER);
        test(2, GFCS_FLETCHER);
        test(3, SG_FLETCHER);
        test(3, SG_GFCS_FLETCHER);

        test(2, ISE);
        test(3, NISHIKI_ISE);
        test(4, SPANNER_ISE);
        test(5, FULL_ISE);
    });
});