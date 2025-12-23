import { __proficiency_fighterPower } from "@/logics/proficiency/fighterPower";
import { is_player_plane_equip, PlayerEquip, PlayerPlaneEquip } from "@/models/equip/basic";
import { HIEN, IWAI_BAKUSEN, KIKKA_KAI, LB_TYPE_1, NIGHT_CORSAIR, NIGHT_ZUIUN, NISHIKI_SUISEN_KAI, NISHIKI_TAITEI, NORMAL_NISHIKI_LBR, RAIDEN, REPPUU, RYUUSEI_IKKOUSEN_SKILLED, SAIUN, SCHWALBE, SHINDEN_INTERCEPTER, SKILLED_HAYABUSA_20, SUISEI_EGUSA, TYPE_3_COMMAND_KAI_NI, YURA_SEAPLANE_SCOUT_SLILLED, ZUIUN } from "tests/setups/assets/equips/plane";
import { describe, expect, it } from "vitest";

const {
    calc_additional_air_superiority_bonus,
    calc_internal_bonus,
    calculate_proficiency_breakdown,
    CARRIER_INTERNAL_BONUS_EXCLUDE_TYPES,
} = __proficiency_fighterPower;

const apply_proficiency = (
    equip: PlayerEquip,
    proficiency: number,
): PlayerPlaneEquip => {
    if (
        !is_player_plane_equip(equip)
    ) throw new Error('航空機を渡してください');

    return {
        ...equip,
        plane_proficiency: proficiency,
    };
}

describe('艦載機熟練度', () => {
    it('艦載機の制空ボーナス', () => {
        const test = (
            expected: number,
            equip: PlayerPlaneEquip,
        ): void => {
            expect(expected).toBe(
                calc_additional_air_superiority_bonus(equip)
            );
        };

        // 閾値 自明なので大雑把に
        test(0, apply_proficiency(REPPUU, 0));
        test(22, apply_proficiency(REPPUU, 100));
        test(0, apply_proficiency(ZUIUN, 40));
        test(6, apply_proficiency(ZUIUN, 100));

        // 装備種別
        test(22, apply_proficiency(NIGHT_CORSAIR, 100));
        test(22, apply_proficiency(NISHIKI_SUISEN_KAI, 100));
        test(22, apply_proficiency(SKILLED_HAYABUSA_20, 100));
        test(22, apply_proficiency(RAIDEN, 100));
        test(22, apply_proficiency(HIEN, 100));
        test(22, apply_proficiency(SCHWALBE, 100));
        test(22, apply_proficiency(SHINDEN_INTERCEPTER, 100));

        test(6, apply_proficiency(NIGHT_ZUIUN, 100));

        // のらないの
        test(0, apply_proficiency(TYPE_3_COMMAND_KAI_NI, 100));
        test(0, apply_proficiency(SAIUN, 100));
        test(0, apply_proficiency(YURA_SEAPLANE_SCOUT_SLILLED, 100));
        test(0, apply_proficiency(RYUUSEI_IKKOUSEN_SKILLED, 100));
        test(0, apply_proficiency(SUISEI_EGUSA, 100));
        test(0, apply_proficiency(IWAI_BAKUSEN, 100));
        test(0, apply_proficiency(KIKKA_KAI, 100));
        test(0, apply_proficiency(LB_TYPE_1, 100));
        test(0, apply_proficiency(NISHIKI_TAITEI, 100));
        // TODO: Ho229
    });
    it('内部熟練ボーナス(艦載機)', () => {
        const test = (
            expected: number,
            equip: PlayerEquip,
        ): void => {
            if (
                !is_player_plane_equip(equip)
            ) throw new Error('航空機を渡してください');

            const { internal_bonus } = calculate_proficiency_breakdown(
                equip,
                CARRIER_INTERNAL_BONUS_EXCLUDE_TYPES,
            );
            expect(Math.abs(expected)).toBeCloseTo(internal_bonus, 12);
        };

        // 値より適用されるかが重要
        const VALUE_WHEN_VALID = calc_internal_bonus(100);
        const VALUE_WHEN_INVALID = 0;
        test(VALUE_WHEN_VALID, REPPUU);
        test(VALUE_WHEN_INVALID, SAIUN);
        test(VALUE_WHEN_INVALID, NISHIKI_TAITEI);
        test(VALUE_WHEN_INVALID, NORMAL_NISHIKI_LBR);
    });
    it('内部熟練ボーナス(基地航空隊機)', () => {
        const TOLERANCE = 1e-12; // 許容誤差
        const test = (
            expected: number,
            equip: PlayerEquip,
        ): void => {
            if (
                !is_player_plane_equip(equip)
            ) throw new Error('航空機を渡してください');

            const { internal_bonus } = calculate_proficiency_breakdown(equip);
            expect(Math.abs(expected)).toBeCloseTo(internal_bonus, 12);
        };

        // 値より適用されるかが重要
        const VALUE_WHEN_VALID = calc_internal_bonus(100);
        test(VALUE_WHEN_VALID, REPPUU);
        // 基地航空隊では偵察機、陸上機にも乗る
        test(VALUE_WHEN_VALID, SAIUN);
        test(VALUE_WHEN_VALID, NISHIKI_TAITEI);
        test(VALUE_WHEN_VALID, NORMAL_NISHIKI_LBR);
    });
});