import { calc_Colorado_special_pre_info } from "@/logics/SpecialAttack/Colorado/multiplier";
import { calc_Colorado_special_power_mod } from "@/logics/SpecialAttack/Colorado/multiplier/power";
import { AffiliationFleetType, derive_player_fleet_unit, PlayerFleetUnit } from "@/models/fleet/FleetUnit";
import { AP_SHELL_91 } from "tests/setups/assets/equips/other";
import { SG_LATE_RADAR, SURFACE_22 } from "tests/setups/assets/equips/radar";
import { COLORADO_KAI, KONGOU_KAI_NI_HEI } from "tests/setups/assets/ship/player";
import { derive_PES } from "tests/setups/generator/ship";
import { describe, expect, it } from "vitest";

describe('Colorado級特殊攻撃テスト', () => {
    it('攻撃力補正', () => {
        // https://en.kancollewiki.net/Special_Attacks#Colorado-class_Special_Attack > Multiplier

        const AFFILIATION_TYPE: AffiliationFleetType = 'single';

        const FLAGSHIP_INDEX = 0;

        const test = (
            expected: number,
            unit: PlayerFleetUnit,
        ): void => {
            const pre_info = calc_Colorado_special_pre_info(unit.ship.equip_slots);
            const power_mod = calc_Colorado_special_power_mod(unit, pre_info);

            // 1.5 * 1.35 * 1.15
            // 1.5 * 1.15 * 1.35
            // のような順序によって不動点小数が一致しないことがある
            // テストではそこまで問わない
            expect(expected).toBeCloseTo(power_mod, 5);
        }

        test(1.5,
            derive_player_fleet_unit(
                derive_PES(COLORADO_KAI, []),
                AFFILIATION_TYPE,
                FLAGSHIP_INDEX,
            ),
        );
        test(1.725,
            derive_player_fleet_unit(
                derive_PES(COLORADO_KAI, [SURFACE_22]),
                AFFILIATION_TYPE,
                FLAGSHIP_INDEX,
            ),
        );
        test(1.98375,
            derive_player_fleet_unit(
                derive_PES(COLORADO_KAI, [SG_LATE_RADAR]),
                AFFILIATION_TYPE,
                FLAGSHIP_INDEX,
            ),
        );
        test(2.025,
            derive_player_fleet_unit(
                derive_PES(COLORADO_KAI, [AP_SHELL_91]),
                AFFILIATION_TYPE,
                FLAGSHIP_INDEX,
            ),
        );
        test(2.32875,
            derive_player_fleet_unit(
                derive_PES(COLORADO_KAI, [AP_SHELL_91, SURFACE_22]),
                AFFILIATION_TYPE,
                FLAGSHIP_INDEX,
            ),
        );

        test(1.5,
            derive_player_fleet_unit(
                derive_PES(COLORADO_KAI, []),
                AFFILIATION_TYPE,
                1,
            ),
        );
        test(1.3,
            derive_player_fleet_unit(
                derive_PES(KONGOU_KAI_NI_HEI, []),
                AFFILIATION_TYPE,
                1,
            ),
        );
    });
});