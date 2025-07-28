import { calc_night_battle_CI_types, NightBattleStrikeType } from "@/logics/nightBattleStrike";
import { EquippedShip } from "@/models/ship/equipped";
import { AKIZUKI_GUN, D_2_GUN, FCR_284 } from "tests/setups/assets/equips/gun";
import { DRUM, TSSL } from "tests/setups/assets/equips/other";
import { FUZE_SUISEI, IWAI_BAKUSEN, NIGHT_CORSAIR, NIGHT_ZUIUN, TBM_3W_3S } from "tests/setups/assets/equips/plane";
import { GFCS_RADAR, SS_RADAR_TELESCOPE } from "tests/setups/assets/equips/radar";
import { FIVE_BARREL_TORPEDO, LATE_MODEL_TORPEDO_SIX } from "tests/setups/assets/equips/torpedo";
import { LANDING_WA, SYUUSEKI } from "tests/setups/assets/ship/abyssal";
import { FLETCHER, AKIZUKI, TASH_KAI, HITOMI_KAI, AKAGI_KAI_NI, ISE_KAI_NI } from "tests/setups/assets/ship/player";
import { derive_PES } from "tests/setups/generator/ship";
import { describe, expect, it } from "vitest";

const test = (
    expected: NightBattleStrikeType[],
    attacker_ship: EquippedShip,
    defender_ship: EquippedShip = LANDING_WA,
) => {
    const result = calc_night_battle_CI_types(
        attacker_ship,
        defender_ship,
    );
    // console.log(result);

    expect(result).toHaveLength(expected.length);
    // DDCI, CVCI, NightZuiunは発動優先度順に判定するようにしてるので順番も確認
    expect(result).toEqual(expected);
};

describe('夜戦CI系', () => {
    it('ターゲットを考慮しない発動可能な夜戦攻撃', () => {
        const SUPPIN_FLETCHER = derive_PES(FLETCHER, []);
        const GTR_AKIZUKI = derive_PES(AKIZUKI, [D_2_GUN, FIVE_BARREL_TORPEDO, GFCS_RADAR]);
        const ALL_DDCI_TASH = derive_PES(TASH_KAI, [D_2_GUN, FIVE_BARREL_TORPEDO, GFCS_RADAR, DRUM], TSSL);
        const SUPPIN_HITOMI = derive_PES(HITOMI_KAI, []);
        const TR_HITOMI = derive_PES(HITOMI_KAI, [LATE_MODEL_TORPEDO_SIX, SS_RADAR_TELESCOPE]);
        const TT_HITOMI = derive_PES(HITOMI_KAI, [LATE_MODEL_TORPEDO_SIX, LATE_MODEL_TORPEDO_SIX]);
        const SUPPIN_AKAGI = derive_PES(AKAGI_KAI_NI, []);
        const FA_AKAGI = derive_PES(AKAGI_KAI_NI, [NIGHT_CORSAIR, TBM_3W_3S]);
        const ALL_CVCI_AKAGI = derive_PES(AKAGI_KAI_NI, [NIGHT_CORSAIR, NIGHT_CORSAIR, TBM_3W_3S, FUZE_SUISEI, IWAI_BAKUSEN]);
        const SUPPIN_ISE_KAI_NI = derive_PES(ISE_KAI_NI, []);
        const Z_ISE_KAI_NI = derive_PES(ISE_KAI_NI, [FCR_284, FCR_284, NIGHT_ZUIUN]);
        const ALL_Z_ISE_KAI_NI = derive_PES(ISE_KAI_NI, [FCR_284, FCR_284, NIGHT_ZUIUN, NIGHT_ZUIUN, GFCS_RADAR]);
        const THREE_MAI_GUN_AKIZUKI = derive_PES(AKIZUKI, [D_2_GUN, D_2_GUN, D_2_GUN]);

        const ALL_SSCI_HITOMI = derive_PES(HITOMI_KAI, [LATE_MODEL_TORPEDO_SIX, LATE_MODEL_TORPEDO_SIX, SS_RADAR_TELESCOPE]);

        // 正例
        test([], SUPPIN_FLETCHER);
        test(['DDCI_GTR', 'Mixed_CI'], GTR_AKIZUKI);
        test(['DDCI_GTR', 'DDCI_LTR', 'DDCI_TTL', 'DDCI_RDL', 'Mixed_CI'], ALL_DDCI_TASH);
        test([], SUPPIN_HITOMI);
        test(['SSCI_TR'], TR_HITOMI);
        test(['SSCI_TT'], TT_HITOMI);
        test([], SUPPIN_AKAGI);
        test(['CVCI_FA'], FA_AKAGI);
        test(['CVCI_FFA', 'CVCI_FA', 'CVCI_FB', 'CVCI_F_DUAL'], ALL_CVCI_AKAGI);
        test([], SUPPIN_ISE_KAI_NI);
        test(['Night_Zuiun_CI_Z', 'double_attack'], Z_ISE_KAI_NI);
        test(['Night_Zuiun_CI_ZZR', 'Night_Zuiun_CI_ZZ', 'Night_Zuiun_CI_ZR', 'Night_Zuiun_CI_Z', 'double_attack'], ALL_Z_ISE_KAI_NI);
        // ? 連撃はでない? ACSim, Sortie Sim では出ない
        test(['Main_Gun_CI'], THREE_MAI_GUN_AKIZUKI);

        // 負例
        // SSCI二種出せる編成でも電探構成しか出ない
        test(['SSCI_TR'], ALL_SSCI_HITOMI);
    });
    it('ターゲットを考慮した発動可能な夜戦攻撃', () => {
        const MIX_AKIZUKI = derive_PES(AKIZUKI, [AKIZUKI_GUN, AKIZUKI_GUN, FIVE_BARREL_TORPEDO]);

        // 本来ならMix_CIが出るが魚雷無効で連撃に化ける
        test(['Mixed_CI'], MIX_AKIZUKI);
        test(['double_attack'], MIX_AKIZUKI, SYUUSEKI);
    });
});