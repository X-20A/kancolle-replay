import { calc_fixed_shotdown_count } from "@/logics/antiAir/fixed";
import { calc_own_defence_guaranteed } from "@/logics/antiAir/guaranteed";
import { calc_prop_shootdown_count } from "@/logics/antiAir/prop";
import { AbyssalPlaneEquip } from "@/models/equip/basic";
import { derive_abyssal_equip } from "@/models/equip/basic/abyssal";
import { derive_fleet, SingleFleet } from "@/models/fleet/Fleet";
import { brandEquipId } from "@/types/brands/equip";
import { HIGH_10 } from "tests/setups/assets/equips/gun";
import { SURFACE_22 } from "tests/setups/assets/equips/radar";
import { make_Akizuki } from "tests/setups/assets/ship";
import { describe, expect, it } from "vitest";

describe('対空系テスト', () => {
    it('撃墜数', () => {
        const AKIZUKI = make_Akizuki([HIGH_10, SURFACE_22]); // AACI種別: [2]
        // console.log('加重対空: ', AKIZUKI.weighted_anti_air);
        const defender_fleet = derive_fleet([AKIZUKI]);

        const JIGOKU_BOMBER = derive_abyssal_equip(brandEquipId(1548)); // 射撃回避なし

        // 割合撃墜、固定撃墜が両方発動 + 対空CIが発動したとして

        const prop_shootdown_count = calc_prop_shootdown_count(
            AKIZUKI.weighted_anti_air,
            JIGOKU_BOMBER as AbyssalPlaneEquip,
            32,
        );

        const fixed_shotdown_count = calc_fixed_shotdown_count(
            AKIZUKI,
            2,
            defender_fleet as SingleFleet,
            'Diamond',
            JIGOKU_BOMBER as AbyssalPlaneEquip,
        );

        const guaranteed = calc_own_defence_guaranteed(2);

        expect(10).toBe(prop_shootdown_count);
        expect(23).toBe(fixed_shotdown_count);
        expect(7).toBe(guaranteed);
    });
});