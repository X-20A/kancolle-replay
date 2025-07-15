import { __LBAS_pre_cap_test__ } from "@/logics/attackPower/LBAS/preCap";
import { Equip, is_player_plane_equip, is_player_plane_equips } from "@/models/equip/basic";
import { derive_LBAS } from "@/models/LBAS";
import { AbyssalEquippedShip } from "@/models/ship/equipped";
import { B_25, LB_TYPE_1, MOSQUITE_LBR, NORMAL_NISHIKI_LBR, SKILLED_NISHIKI_LBR } from "tests/setups/assets/equips/plane";
import { BB_RE, CA_NE, CL_HO, DD_I, LANDING_WA, SYUUSEKI } from "tests/setups/assets/ship/abyssal";
import { describe, expect, it } from "vitest"
import { Rand, RandGenerator } from "@/effects/random";
import { __target_LBAS_test__, ValidLbasCombination } from "@/logics/target/LBAS";
import { derive_abyssal_fleet } from "@/models/fleet/Fleet";

const {
    calc_mod_sp3_multiplier,
    calc_land_based_scout_mod,
    calc_pre_cap_LBAS_attack_power,
} = __LBAS_pre_cap_test__;

const { calc_LBAS_attack_type } = __target_LBAS_test__;

describe('基地航空隊 攻撃力系', () => {
    it('Mod Sp3', () => {
        const test = (
            expected: number,
            equip: Equip,
            target_ship: AbyssalEquippedShip,
        ): void => {
            if (!is_player_plane_equip(equip)) throw new Error('PlaneEquipを渡してください');

            const result = calc_mod_sp3_multiplier(
                equip,
                target_ship,
            );

            expect(expected).toBe(result);
        };

        test(1, LB_TYPE_1, LANDING_WA);
        test(1.9, B_25, DD_I);
        test(1.75, B_25, CL_HO);
        test(1.6, B_25, CA_NE);
        test(1.3, B_25, BB_RE);
        test(0.9, B_25, SYUUSEKI);
    });
    it('陸偵補正', () => {
        const test = (
            expected: number,
            equips: Equip[],
        ): void => {
            if (!is_player_plane_equips(equips)) throw new Error('艦娘 && 航空機 でない装備が含まれています');

            const lbas = derive_LBAS(equips, 0);
            const result = calc_land_based_scout_mod(lbas);
            expect(expected).toBe(result);
        };

        test(1, [B_25]);
        test(1.12, [NORMAL_NISHIKI_LBR]);
        test(1.12, [MOSQUITE_LBR]);
        test(1.15, [SKILLED_NISHIKI_LBR]);
        test(1.15, [MOSQUITE_LBR, SKILLED_NISHIKI_LBR]);
        test(1.15, [SKILLED_NISHIKI_LBR, MOSQUITE_LBR]);
    });
    it('キャップ前攻撃力', () => {
        const rand = new Rand('1');
        const test = (
            expected: number,
            equips: Equip[],
            target_ship: AbyssalEquippedShip,
        ): void => {
            if (!is_player_plane_equips(equips)) throw new Error('艦娘 && 航空機 でない装備が含まれています');

            const lbas = derive_LBAS(equips, 0);
            const attacker_squadron = lbas.squadrons[0];
            const fleet = derive_abyssal_fleet([target_ship]);
            const target_unit = fleet.main_fleet_units[0];
            const combination: ValidLbasCombination = {
                attacker_squadron,
                target_unit,
                attack_type: calc_LBAS_attack_type(attacker_squadron, target_unit),
            }
            const result = calc_pre_cap_LBAS_attack_power(
                combination,
                lbas,
                rand, // 対潜時以外影響なし
            );

            expect(expected).toBe(result);
        };
    });
});