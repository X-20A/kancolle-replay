import { __test__ } from "@/logics/LBAS/basePower";
import { Equip, is_plane_equip } from "@/models/equip/basic";
import { derive_LBAS, LBAS } from "@/models/LBAS";
import { AbyssalEquippedShip } from "@/models/ship/equipped";
import { F4U_1D, HAYABUSA_65, HO_229, JET_KEIUN, KI_102_B, LB_TYPE_1, NOMAL_HAYABUSA_20, RYUUSEI_IKKOUSEN_SKILLED, SHINZAN, SKILLED_HAYABUSA_20, SUISEI_EGUSA, TOUKAI, TYPE_3_COMMAND, ZUIUN } from "tests/setups/assets/equips/plane";
import { CL_HO, DD_I, LANDING_WA, SO_FLAGSHIP } from "tests/setups/assets/ship/abyssal";
import { describe, expect, it } from "vitest";

const {
    calc_core_base_power_set,
    calc_mod_sp2_flat,
} = __test__;

const short_derive_LBAS = (
    equip: Equip,
): LBAS => {
    if (!is_plane_equip(equip)) throw new Error('PlaneEquip を渡してください');
    
    return derive_LBAS([equip], 0)
}
// ENwikiに倣ってチェックしていく
describe('基地航空隊 攻撃力系', () => {
    it('核ステータス', async () => {
        const test = (
            expected: number,
            equip: Equip,
            target_ship: AbyssalEquippedShip,
        ): void => {
            const LBAS = short_derive_LBAS(equip);
            const { natural_status } = calc_core_base_power_set(
                LBAS.squadrons[0].equip,
                target_ship,
            );

            expect(expected).toBe(natural_status);
        }

        // 雷装値
        test(10, LB_TYPE_1, LANDING_WA);
        test(11, KI_102_B, LANDING_WA);
        test(0, TOUKAI, LANDING_WA);
        test(16, SHINZAN, LANDING_WA);
        test(15, RYUUSEI_IKKOUSEN_SKILLED, LANDING_WA);
        // 爆装値
        test(13, SUISEI_EGUSA, LANDING_WA);
        test(7, F4U_1D, LANDING_WA);
        test(15, JET_KEIUN, LANDING_WA);
        test(16, HO_229, LANDING_WA);
        test(4, ZUIUN, LANDING_WA);
        test(4, NOMAL_HAYABUSA_20, LANDING_WA);
        // 対潜値
        test(10, TOUKAI, SO_FLAGSHIP);
        test(7, TYPE_3_COMMAND, SO_FLAGSHIP);
        test(8, NOMAL_HAYABUSA_20, SO_FLAGSHIP);
    });
    it('Mod Sp2', () => {
        const test = (
            expected: number,
            equip: Equip,
            target_ship: AbyssalEquippedShip,
        ): void => {
            if (!is_plane_equip(equip)) throw new Error('PlaneEquip を渡してください');

            const mod_sp2 = calc_mod_sp2_flat(equip, target_ship);

            expect(expected).toBe(mod_sp2);
        }

        // 正例
        test(25, HAYABUSA_65, DD_I);
        test(30, SKILLED_HAYABUSA_20, DD_I);

        // 負例
        test(0, LB_TYPE_1, DD_I);
        test(0, HAYABUSA_65, CL_HO);
        test(0, SKILLED_HAYABUSA_20, CL_HO);
    });
});