import { AntiAirCutinType } from "@/logics/antiAir/cutin/conditions";
import { calc_abyssal_fixed_shootdown_count, calc_player_fixed_shootdown_count } from "@/logics/antiAir/fixed";
import { calc_enemy_defence_guaranteed, calc_player_defence_guaranteed } from "@/logics/antiAir/guaranteed";
import { calc_prop_shootdown_count } from "@/logics/antiAir/prop";
import { AbyssalPlaneEquip, PlaneEquip, PlayerPlaneEquip } from "@/models/equip/basic";
import { derive_abyssal_equip } from "@/models/equip/basic/abyssal";
import { AbyssalSingleFleet, calc_formation_updated_fleet, derive_abyssal_fleet, derive_player_fleet, PlayerSingleFleet } from "@/models/fleet/Fleet";
import { derive_node } from "@/models/Node";
import { HIGH_10 } from "tests/setups/assets/equips/gun";
import { F4U_1D, SUISEI_EGUSA } from "tests/setups/assets/equips/plane";
import { SURFACE_22 } from "tests/setups/assets/equips/radar";
import { LANDING_WA } from "tests/setups/assets/ship/abyssal";
import { AKIZUKI } from "tests/setups/assets/ship/player";
import { derive_PES } from "tests/setups/generator/ship";
import { describe, expect, it } from "vitest";

const AACI_AKIZUKI = derive_PES(AKIZUKI, [HIGH_10, SURFACE_22]); // AACI種別: [2]

const JIGOKU_BOMBER = derive_abyssal_equip(1548); // 射撃回避なし

const node = derive_node();

// ! スロット数は17以下を使用する
// ! 制空状態による被撃墜があるのでSortie Sim等と合わなくなる
const HIRYUU_SLOT_COUNT = 12;

describe('対空系テスト', () => {
    it('割合撃墜数', () => {
        expect(4).toBe(calc_prop_shootdown_count(
            AACI_AKIZUKI.weighted_anti_air,
            JIGOKU_BOMBER as AbyssalPlaneEquip,
            HIRYUU_SLOT_COUNT,
        ));

        expect(6).toBe(calc_prop_shootdown_count(
            LANDING_WA.weighted_anti_air,
            F4U_1D as PlayerPlaneEquip,
            HIRYUU_SLOT_COUNT,
        ));

        // 彗星(江草) 射撃回避: [艦: 0.6, ]
        expect(3).toBe(calc_prop_shootdown_count(
            LANDING_WA.weighted_anti_air,
            SUISEI_EGUSA as PlayerPlaneEquip,
            HIRYUU_SLOT_COUNT,
        ));
    });

    it('固定撃墜数', () => {
        const Akizuki_fleet = calc_formation_updated_fleet(derive_player_fleet([AACI_AKIZUKI]), 'Diamond');
        const Wa_fleet = calc_formation_updated_fleet(derive_abyssal_fleet([LANDING_WA]), 'Diamond');

        expect(23).toBe(calc_player_fixed_shootdown_count(
            Akizuki_fleet.main_fleet_units[0],
            2 as AntiAirCutinType,
            Akizuki_fleet as PlayerSingleFleet,
            'Diamond',
            JIGOKU_BOMBER as AbyssalPlaneEquip,
            node,
        ));

        expect(37).toBe(calc_abyssal_fixed_shootdown_count(
            Wa_fleet.main_fleet_units[0],
            8 as AntiAirCutinType,
            Wa_fleet as AbyssalSingleFleet,
            F4U_1D as PlaneEquip,
            node,
        ));
    });

    it('最低保証撃墜数', () => {
        expect(5).toBe(calc_enemy_defence_guaranteed(
            8 as AntiAirCutinType,
            F4U_1D as PlaneEquip,
        ));
        
        expect(7).toBe(calc_player_defence_guaranteed(
            2,
            JIGOKU_BOMBER as AbyssalPlaneEquip,
        ));
    });
});