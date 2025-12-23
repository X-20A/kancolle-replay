import { __maritime_resuply__, calc_maritime_resupply_locations, calc_supply_ratio } from "@/logics/maritimeResupply";
import { PlayerCombinedFleet } from "@/models/fleet/Fleet";
import { MARITIME_RESUPPLY } from "tests/setups/assets/equips/other";
import { REPPUU } from "tests/setups/assets/equips/plane";
import { AKIZUKI, ATLANTA, FLETCHER, GOTLAND, KAKO_KAI_NI, MAYA_KAI_NI, MUTSUKI, SOUYA, YAMASHIOMARU_KAI } from "tests/setups/assets/ship/player";
import { build_fleet_from_fixture, PlayerFleetFixture } from "tests/setups/generator/fleet";
import { describe, expect, it } from "vitest";

const {
    calc_supply_ratio_set,
} = __maritime_resuply__;

const single_fleet_fixture: PlayerFleetFixture = {
    main: [
        { ship: ATLANTA },
        { ship: GOTLAND },
        { ship: MUTSUKI },
        { ship: FLETCHER },
        {
            ship: YAMASHIOMARU_KAI,
            equips: [MARITIME_RESUPPLY, REPPUU], ex_equip: MARITIME_RESUPPLY,
        },
        { ship: SOUYA, equips: [MARITIME_RESUPPLY, MARITIME_RESUPPLY] },
    ],
} as const;

const combined_fleet_fixture: PlayerFleetFixture = {
    main: [
        { ship: KAKO_KAI_NI },
        { ship: MAYA_KAI_NI },
        { ship: ATLANTA },
        { ship: GOTLAND },
        { ship: MUTSUKI },
        { ship: FLETCHER },
    ],
    escort: [
        { ship: ATLANTA },
        { ship: MUTSUKI },
        { ship: FLETCHER },
        {
            ship: YAMASHIOMARU_KAI,
            equips: [MARITIME_RESUPPLY, REPPUU], ex_equip: MARITIME_RESUPPLY,
        },
        { ship: SOUYA, equips: [MARITIME_RESUPPLY, MARITIME_RESUPPLY] },
        { ship: AKIZUKI },
    ],
} as const;

const single_fleet = build_fleet_from_fixture(single_fleet_fixture);
const combined_fleet =
    build_fleet_from_fixture(combined_fleet_fixture) as PlayerCombinedFleet;

describe('洋上補給', () => {
    it('通常艦隊の洋上補給の位置を特定', () => {
        const locations = calc_maritime_resupply_locations(single_fleet);
        // 3つまでしか数えない
        expect(3).toBe(locations.length);

        expect(single_fleet.main_fleet_units[4]?.ship.unique_id)
            .toBe(locations[0]?.ship_unique_id);
        expect(0).toBe(locations[0]?.equip_index);

        expect(single_fleet.main_fleet_units[4]?.ship.unique_id)
            .toBe(locations[1]?.ship_unique_id);
        expect('ex').toBe(locations[1]?.equip_index);

        expect(single_fleet.main_fleet_units[5]?.ship.unique_id)
            .toBe(locations[2]?.ship_unique_id);
        expect(0).toBe(locations[2]?.equip_index);
    });
    it('連合艦隊の洋上補給の位置を特定', () => {
        const locations = calc_maritime_resupply_locations(combined_fleet);
        // 3つまでしか数えない
        expect(3).toBe(locations.length);

        expect(combined_fleet.escort_fleet_units[3]?.ship.unique_id)
            .toBe(locations[0]?.ship_unique_id);
        expect(0).toBe(locations[0]?.equip_index);

        expect(combined_fleet.escort_fleet_units[3]?.ship.unique_id)
            .toBe(locations[1]?.ship_unique_id);
        expect('ex').toBe(locations[1]?.equip_index);

        expect(combined_fleet.escort_fleet_units[4]?.ship.unique_id)
            .toBe(locations[2]?.ship_unique_id);
        expect(0).toBe(locations[2]?.equip_index);
    });
    it('洋上補給の数に応じた回復割合', () => {
        expect(0.25).toBe(calc_supply_ratio(single_fleet, 1));
        expect(0.36).toBe(calc_supply_ratio(single_fleet, 2));
        expect(0.47).toBe(calc_supply_ratio(single_fleet, 3));

        expect(0.15).toBe(calc_supply_ratio(combined_fleet, 1));
        expect(0.275).toBe(calc_supply_ratio(combined_fleet, 2));
        expect(0.40).toBe(calc_supply_ratio(combined_fleet, 3));
    });
    it('補給後の残(燃料|弾薬)割合と補給した(燃料|弾薬)割合', () => {
        const result_1 = calc_supply_ratio_set(0.4, 0.47);
        expect(0.87).toBe(result_1.post_supply_ratio);
        expect(0.47).toBe(result_1.real_supply_ratio);

        const result_2 = calc_supply_ratio_set(0.6, 0.47);
        expect(1).toBe(result_2.post_supply_ratio);
        expect(0.4).toBe(result_2.real_supply_ratio);
    });
    it('装備スロットのずれ込み(艦戦スライド)', () => {

    });
    it('請求資源', () => {

    });
});