import { AntiAirCutinType } from "@/logics/antiAir/cutin/conditions";
import { calc_abyssal_fixed_shootdown_count, calc_player_fixed_shootdown_count } from "@/logics/antiAir/fixed";
import { calc_enemy_defence_guaranteed, calc_player_defence_guaranteed } from "@/logics/antiAir/guaranteed";
import { calc_prop_shootdown_count } from "@/logics/antiAir/prop";
import { AbyssalPlaneEquip, PlaneEquip, PlayerPlaneEquip } from "@/models/equip/basic";
import { derive_abyssal_equip } from "@/models/equip/basic/abyssal";
import { AbyssalSingleFleet, derive_abyssal_fleet, derive_player_fleet, PlayerSingleFleet } from "@/models/fleet/Fleet";
import { PlayerEquippedShip } from "@/models/ship/equipped";
import { brandEquipId } from "@/types/brands/equip";
import { HIGH_10 } from "tests/setups/assets/equips/gun";
import { F4U_1D, SUISEI_EGUSA } from "tests/setups/assets/equips/plane";
import { SURFACE_22 } from "tests/setups/assets/equips/radar";
import { LANDING_WA, make_Akizuki } from "tests/setups/assets/ship";
import { describe, expect, it } from "vitest";

const AKIZUKI = make_Akizuki([HIGH_10, SURFACE_22]); // AACI種別: [2]

const JIGOKU_BOMBER = derive_abyssal_equip(brandEquipId(1548)); // 射撃回避なし

// ! スロット数は17以下を使用する
// ! 制空状態による被撃墜があるのでSortie Sim等と合わなくなる
const HIRYUU_SLOT_COUNT = 12;

describe('対空系テスト', () => {
    it('割合撃墜数', () => {
        expect(4).toBe(calc_prop_shootdown_count(
            AKIZUKI.weighted_anti_air,
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
        expect(23).toBe(calc_player_fixed_shootdown_count(
            AKIZUKI as PlayerEquippedShip,
            2 as AntiAirCutinType,
            derive_player_fleet([AKIZUKI]) as PlayerSingleFleet,
            'Diamond',
            JIGOKU_BOMBER as AbyssalPlaneEquip,
        ));

        expect(37).toBe(calc_abyssal_fixed_shootdown_count(
            LANDING_WA,
            8 as AntiAirCutinType,
            derive_abyssal_fleet([LANDING_WA]) as AbyssalSingleFleet,
            'Diamond',
            F4U_1D as PlaneEquip,
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