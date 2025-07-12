import { __test__ } from "@/logics/LBAS/basePower";
import { derive_equip, Equip, is_plane_equip } from "@/models/equip/basic";
import { derive_LBAS, LBAS } from "@/models/LBAS";
import { AbyssalEquippedShip } from "@/models/ship/equipped";
import { brandEquipId } from "@/types/brands/equip";
import { DO_217_INITIAL, F4U_1D, FLITZ_X, HAYABUSA_65, HO_229, JET_KEIUN, KI_102_B, KI_102_B_MISSILE, LB_TYPE_1, NOMAL_HAYABUSA_20, NORMAL_HIRYUU_MISSILE, RYUUSEI_IKKOUSEN_SKILLED, SHINZAN, SKILLED_HAYABUSA_20, SKILLED_HIRYUU_MISSILE, SUISEI_EGUSA, TOUKAI, TYPE_3_COMMAND, ZUIUN } from "tests/setups/assets/equips/plane";
import { BB_RE, CA_NE, CL_HO, DD_I, LANDING_WA, SO_FLAGSHIP } from "tests/setups/assets/ship/abyssal";
import { describe, expect, it } from "vitest";

const {
    calc_core_base_power_set,
    calc_mod_sp2_flat,
    calc_applied_mod_sp1_raw_base_power,
    calc_basic_LBAS_attack_power,
} = __test__;

const short_derive_LBAS = (
    equip: Equip,
): LBAS => {
    if (!is_plane_equip(equip)) throw new Error('PlaneEquip を渡してください');
    
    return derive_LBAS([equip], 0)
}
// ENwikiに倣ってチェックしていく
describe('基地航空隊 攻撃力系', () => {
    it('核ステータス', () => {
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
        };

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
        };

        // 正例
        test(25, HAYABUSA_65, DD_I);
        test(30, SKILLED_HAYABUSA_20, DD_I);

        // 負例
        test(0, LB_TYPE_1, DD_I);
        test(0, HAYABUSA_65, CL_HO);
        test(0, SKILLED_HAYABUSA_20, CL_HO);
    });
    it('Mod Sp1', () => {
        const test = (
            expected: number,
            equip: Equip,
            target_ship: AbyssalEquippedShip,
            base_power: number,
        ): void => {
            if (!is_plane_equip(equip)) throw new Error('PlaneEquip を渡してください');
            
            const applied_mod_sp1_raw_base_power = calc_applied_mod_sp1_raw_base_power(
                equip,
                target_ship,
                base_power,
            );
            expect(expected).toBe(applied_mod_sp1_raw_base_power);
        };

        const MULTIPLICATIVE_IDENTITY = 1;
        test(1.15, NORMAL_HIRYUU_MISSILE, DD_I, MULTIPLICATIVE_IDENTITY);
        test(1.13, NORMAL_HIRYUU_MISSILE, BB_RE, MULTIPLICATIVE_IDENTITY);
        test(1.16, KI_102_B_MISSILE, CA_NE, MULTIPLICATIVE_IDENTITY);
        test(1.14, KI_102_B_MISSILE, BB_RE, MULTIPLICATIVE_IDENTITY);
        test(1.1, DO_217_INITIAL, DD_I, MULTIPLICATIVE_IDENTITY);
        test(1.5, FLITZ_X, BB_RE, MULTIPLICATIVE_IDENTITY);

        const ADDITIVE_IDENTITY = 0;
        test(2.6, SKILLED_HIRYUU_MISSILE, CA_NE, ADDITIVE_IDENTITY);
        test(2.25, SKILLED_HIRYUU_MISSILE, BB_RE, ADDITIVE_IDENTITY);
    });
    it('基本項', () => {
        const test = (
            expected: number,
            equip: Equip,
            target_ship: AbyssalEquippedShip,
        ): void => {
            const result = calc_basic_LBAS_attack_power(
                short_derive_LBAS(equip).squadrons[0],
                target_ship
            );

            expect(expected).toBe(result);
        };

        // さらっと
        test(81.92099788303082, LB_TYPE_1, LANDING_WA); // 補正系なし
        test(81.92099788303082, TOUKAI, SO_FLAGSHIP);
        test(134.57292092483436, SKILLED_HIRYUU_MISSILE, BB_RE);

        const LEVEL_9_LB_TYPE_1 = derive_equip(9, brandEquipId(169));
        test(93.8744074384673, LEVEL_9_LB_TYPE_1, LANDING_WA); // 改修値9
    });
});