import { AACIType } from "@/logics/antiAir/cutin/conditions";
import { calc_enemy_defence_guaranteed, calc_player_defence_guaranteed } from "@/logics/antiAir/guaranteed";
import { calc_prop_shootdown_count } from "@/logics/antiAir/shootdown/prop";
import { AbyssalPlaneEquip, PlaneEquip, PlayerPlaneEquip } from "@/models/equip/basic";
import { derive_abyssal_equip } from "@/models/equip/basic/abyssal";
import { derive_node } from "@/models/Node";
import { HIGH_10 } from "tests/setups/assets/equips/gun";
import { F4U_1D, SUISEI_EGUSA } from "tests/setups/assets/equips/plane";
import { SURFACE_22 } from "tests/setups/assets/equips/radar";
import { LANDING_WA_FLAGSHIP } from "tests/setups/assets/ship/abyssal";
import { AKIZUKI } from "tests/setups/assets/ship/player";
import { derive_PES } from "tests/setups/generator/ship";
import { describe, expect, it } from "vitest";

const AACI_AKIZUKI = derive_PES(AKIZUKI, [HIGH_10, SURFACE_22]); // AACI種別: [2]

/**
 * No.1548 深海地獄艦爆    
 * https://en.kancollewiki.net/Abyssal_Hell_Dive_Bomber
 */
const JIGOKU_BOMBER = derive_abyssal_equip(1548); // 射撃回避なし

const node = derive_node();

// ! スロット数は17以下を使用すること
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
            LANDING_WA_FLAGSHIP.weighted_anti_air,
            F4U_1D as PlayerPlaneEquip,
            HIRYUU_SLOT_COUNT,
        ));

        // 彗星(江草) 射撃回避: [艦: 0.6, ]
        expect(3).toBe(calc_prop_shootdown_count(
            LANDING_WA_FLAGSHIP.weighted_anti_air,
            SUISEI_EGUSA as PlayerPlaneEquip,
            HIRYUU_SLOT_COUNT,
        ));
    });

    it('最低保証撃墜数', () => {
        expect(5).toBe(calc_enemy_defence_guaranteed(
            8 as AACIType,
            F4U_1D as PlaneEquip,
        ));
        
        expect(7).toBe(calc_player_defence_guaranteed(
            2,
            JIGOKU_BOMBER as AbyssalPlaneEquip,
        ));
    });
});