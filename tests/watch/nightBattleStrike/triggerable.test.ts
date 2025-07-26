import { calc_night_battle_CI_types, NightBattleStrikeType } from "@/logics/nightBattleStrike";
import { EquippedShip } from "@/models/ship/equipped";
import { D_2_GUN } from "tests/setups/assets/equips/gun";
import { DRUM, TSSL } from "tests/setups/assets/equips/other";
import { GFCS_RADAR } from "tests/setups/assets/equips/radar";
import { FIVE_BARREL_TORPEDO } from "tests/setups/assets/equips/torpedo";
import { LANDING_WA } from "tests/setups/assets/ship/abyssal";
import { make_Akizuki, make_Fletcher, make_Tash } from "tests/setups/assets/ship/player";
import { describe, expect, it } from "vitest";

describe('夜戦CI系', () => {
    it('D型砲組み合わせによる火力補正', () => {
        const SUPPIN_FLETCHER = make_Fletcher([]);
        const GTR_AKIZUKI = make_Akizuki([D_2_GUN, FIVE_BARREL_TORPEDO, GFCS_RADAR]);
        const ALL_DDCI_TASH = make_Tash([D_2_GUN, FIVE_BARREL_TORPEDO, GFCS_RADAR, DRUM], TSSL);
        
        const test = (
            expected: NightBattleStrikeType[],
            attacker_ship: EquippedShip,
            defender_ship: EquippedShip = LANDING_WA,
        ) => {
            const result = calc_night_battle_CI_types(
                attacker_ship,
                defender_ship,
            );
            console.log(result);

            expect(result).toHaveLength(expected.length);
            // DDCI, CVCI, NightZuiunは発動優先度順に判定するようにしてるので順番も確認
            expect(result).toEqual(expected);
        };

        // 正例
        // test([], SUPPIN_FLETCHER);
        // test(['DDCI_GTR', 'Mixed_CI'], GTR_AKIZUKI);
        test(['DDCI_GTR', 'DDCI_LTR', 'DDCI_TTL', 'DDCI_RDL', 'Mixed_CI'], ALL_DDCI_TASH);


        // 負例
    });
});