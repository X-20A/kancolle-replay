import { calc_abyssal_fleet_weighted_anti_air } from "@/logics/antiAir/weighted";
import { derive_equip, PlayerEquip } from "@/models/equip/basic";
import { AbyssalFleet, AbyssalSingleFleet, derive_abyssal_fleet, Fleet, SingleFleet } from "@/models/fleet/Fleet";
import { EquippedShip } from "@/models/ship/equipped";
import { SingleFleetFormationType } from "@/types";
import { brandEquipId } from "@/types/brands/equip";
import { ZOUBI_25 } from "tests/setups/assets/equips/antiAir";
import { XF5U } from "tests/setups/assets/equips/plane";
import { GFCS_RADAR } from "tests/setups/assets/equips/radar";
import { LANDING_WA } from "tests/setups/assets/ship/abyssal";
import { Maya_kai_ni, Ranger } from "tests/setups/assets/ship/player";
import { derive_PES } from "tests/setups/generator/ship";
import { describe, expect, it } from "vitest";

describe('対空系テスト', () => {
    it('艦加重対空値', () => { // 加重対空値は割合撃墜や固定撃墜の為の過渡的な値に過ぎないけども表示する可能性はある
        const IMPROVED_77mm = derive_equip(9, brandEquipId(37));

        const SUPPIN_RANGER = derive_PES(Ranger, []);
        const GUN_RANGER = derive_PES(Ranger, [IMPROVED_77mm as PlayerEquip]);
        const XF5U_RANGER = derive_PES(Ranger, [XF5U]);
        const GFCS_RANGER = derive_PES(Ranger, [GFCS_RADAR]);
        const BONUS_MAYA = derive_PES(Maya_kai_ni, [ZOUBI_25]);

        const test = (expected: number, ship: EquippedShip) => {
            expect(expected).toBe(ship.weighted_anti_air);
        };

        test(35, SUPPIN_RANGER);
        test(47, GUN_RANGER);
        test(37, XF5U_RANGER);
        test(46, GFCS_RANGER);
        test(74, BONUS_MAYA); // 装備ボーナス

        // 深海
        test(110, LANDING_WA);
    });
    it('艦隊加重対空値', () => {
        const test = (
            expected: number,
            fleet: AbyssalFleet,
            formation: SingleFleetFormationType,
        ) => {
            const result = calc_abyssal_fleet_weighted_anti_air(
                fleet as AbyssalSingleFleet,
                formation,
            )

            expect(expected).toBe(result);
        };

        test(32, derive_abyssal_fleet([LANDING_WA]), 'Diamond');
    });
});