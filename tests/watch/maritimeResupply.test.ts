import { calc_fleet_fighter_power_in_anti_combined_fleet } from "@/logics/airSuperiority/fighterPower";
import { calc_resupplied_fleet } from "@/logics/maritimeResupply";
import { PlayerCombinedFleet } from "@/models/fleet/Fleet";
import { derive_naval_base } from "@/models/NavalBase";
import { consume_cost_sequence } from "tests/setups/adjustment/consume";
import { MARITIME_RESUPPLY } from "tests/setups/assets/equips/other";
import { build_fleet_from_fixture, PlayerFleetFixture } from "tests/setups/generator/fixture";
import { describe, expect, it } from "vitest";

// [燃料,弾薬]
const single_fleet_fixture: PlayerFleetFixture = {
    main_fleet_ships: [
        { name: '睦月' }, // [15,15]
        { name: 'Fletcher' }, // [20,20]
        {
            name: '山汐丸改', // [35,15]
            equips: [{ name: '洋上補給' }, { name: '試製烈風 後期型' }],
            ex_equip: { name: '洋上補給' },
        },
        {
            name: '速吸', // [100,15]
            lv: 100,
            equips: [{ name: '洋上補給' }, { name: '洋上補給' }] },
    ],
} as const;

const combined_fleet_fixture: PlayerFleetFixture = {
    main_fleet_ships: [
        { name: '加古改二' }, // [35,65]
        { name: '摩耶改二' }, // [45,80]
    ],
    escort_fleet_ships: [
        { name: '矢矧' }, // [30,35]
        { name: '朝霜' }, // [15,20]
        { name: '清霜' }, // [15,20]
        {
            name: '山汐丸改', // [35,15]
            equips: [{ name: '洋上補給' }, { name: '試製烈風 後期型' }],
            ex_equip: { name: '洋上補給' },
        },
        {
            name: '速吸', // [100,15]
            lv: 100,
            equips: [{ name: '洋上補給' }, { name: '洋上補給' }],
        },
    ],
} as const;

const pre_supply_single_fleet = consume_cost_sequence(
    build_fleet_from_fixture(single_fleet_fixture),
    ['Normal_Battle', 'Normal_Battle', 'Normal_Battle'],
);
const pre_supply_combined_fleet = consume_cost_sequence(
    build_fleet_from_fixture(combined_fleet_fixture),
    ['Normal_Battle', 'Normal_Battle', 'Normal_Battle'],
) as PlayerCombinedFleet;

const naval_base = derive_naval_base();

const {
    supplied_fleet: supplied_single_fleet,
    billed_naval_base: single_billed_naval_base,
} = calc_resupplied_fleet(pre_supply_single_fleet, naval_base);
const {
    supplied_fleet: supplied_combined_fleet,
    billed_naval_base: combined_billed_naval_base,
} = calc_resupplied_fleet(pre_supply_combined_fleet, naval_base)


describe('洋上補給', () => {
    it('洋上補給は最大3つまでしか消費しない', () => {
        expect(MARITIME_RESUPPLY).toStrictEqual(
            supplied_single_fleet.main_fleet_units[3]?.ship.equip_slots[0]?.equip
        );
        expect(MARITIME_RESUPPLY).toStrictEqual(
            supplied_combined_fleet.escort_fleet_units[4]?.ship.equip_slots[0]?.equip
        );
    });
    it('補給後の残(燃料|弾薬)割合', () => {
        expect(0.4).toBe(
            pre_supply_single_fleet.main_fleet_units[0].ship.state.fuel_remain_ratio
        );
        expect(0.87).toBe(
            supplied_single_fleet.main_fleet_units[0].ship.state.fuel_remain_ratio
        );

        expect(0.4).toBe(
            pre_supply_combined_fleet.main_fleet_units[0].ship.state.fuel_remain_ratio
        );
        expect(0.4).toBe(
            pre_supply_combined_fleet.escort_fleet_units[0].ship.state.fuel_remain_ratio
        );
        expect(0.8).toBe(
            supplied_combined_fleet.main_fleet_units[0].ship.state.fuel_remain_ratio
        );
    });
    it('装備スロットのずれ込み(艦戦スライド)', () => {
        expect(49).toBe(
            calc_fleet_fighter_power_in_anti_combined_fleet(pre_supply_single_fleet)
        );
        // 6スロから8スロに移る
        expect(53).toBe(
            calc_fleet_fighter_power_in_anti_combined_fleet(supplied_single_fleet)
        );

        expect(49).toBe(
            calc_fleet_fighter_power_in_anti_combined_fleet(pre_supply_combined_fleet)
        );
        expect(53).toBe(
            calc_fleet_fighter_power_in_anti_combined_fleet(supplied_combined_fleet)
        );
    });
    it('請求資源', () => {
        expect(71).toBe(single_billed_naval_base.fuel);
        expect(104).toBe(combined_billed_naval_base.fuel);

        expect(28).toBe(single_billed_naval_base.ammo);
        expect(99).toBe(combined_billed_naval_base.ammo);
    });
});