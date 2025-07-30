import { NightBattleStrikeType } from "@/logics/nightBattleStrike"

type NightBattleStrikeDataBase = {
    dmgMod: number,
    accMod: number,
    chanceMod: number,
    numHits: number,
}

type DDStrikeData = NightBattleStrikeDataBase & {
    replace_rate: number,
    replaced_chance_mod: number,
    replaced_hit_count: number,
}

type NightBattleStrikeData =
    | NightBattleStrikeDataBase
    | DDStrikeData

type NightBattleStrikeDatas = Record<NightBattleStrikeType, NightBattleStrikeData>

export function is_DDCI(
    strike_data: NightBattleStrikeData,
): strike_data is DDStrikeData {
    return 'replace_rate' in strike_data;
}

/**
 * 夜戦特殊攻撃データ
 */
export const NIGHT_BATTLE_STRIKE_DATAS: NightBattleStrikeDatas = {
    // ! 潜水CIの命中補正、発動率に根拠はない
    SSCI_TR: {
        dmgMod: 1.75,
        accMod: 1.65,
        chanceMod: 1.05,
        numHits: 2,
    },
    SSCI_TT: {
        dmgMod: 1.6,
        accMod: 1.65,
        chanceMod: 1.1,
        numHits: 2,
    },

    double_attack: {
        dmgMod: 1.2,
        accMod: 1.1,
        // ! 連撃は計算でなく、ロジック側で99%で固定
        chanceMod: 0,
        numHits: 2,
    },
    Mixed_CI: {
        dmgMod: 1.3,
        accMod: 1.5,
        chanceMod: 1.15,
        numHits: 2,
    },
    Torpedo_CI: {
        dmgMod: 1.5,
        accMod: 1.65,
        chanceMod: 1.22,
        numHits: 2,
    },
    Sec_Gun_CI: {
        dmgMod: 1.75,
        accMod: 1.5,
        chanceMod: 1.3,
        numHits: 1,
    },
    Main_Gun_CI: {
        dmgMod: 2,
        accMod: 2,
        chanceMod: 1.4,
        numHits: 1,
    },

    DDCI_GTR: {
        dmgMod: 1.3,
        accMod: 1.1,
        chanceMod: 1.15,
        numHits: 1,
        replace_rate: 0.65,
        replaced_chance_mod: 1.3,
        replaced_hit_count: 2,
    },
    DDCI_LTR: {
        dmgMod: 1.2,
        accMod: 1.65,
        chanceMod: 1.4,
        numHits: 1,
        replace_rate: 0.5,
        replaced_chance_mod: 1.4,
        replaced_hit_count: 2,
    },
    DDCI_TTL: {
        dmgMod: 1.5,
        accMod: 1.65,
        chanceMod: 1.25,
        numHits: 1,
        replace_rate: 0.875,
        replaced_chance_mod: 1.25,
        replaced_hit_count: 2,
    },
    DDCI_RDL: {
        dmgMod: 1.3,
        accMod: 1.5,
        chanceMod: 1.22,
        numHits: 1,
        replace_rate: 0.55,
        replaced_chance_mod: 1.22,
        replaced_hit_count: 2,
    },

    CVCI_FFA: {
        dmgMod: 1.25,
        accMod: 1.25,
        chanceMod: 1.05,
        numHits: 1,
    },
    CVCI_FA: {
        dmgMod: 1.2,
        accMod: 1.2,
        chanceMod: 1.2,
        numHits: 1,
    },
    CVCI_FB: {
        dmgMod: 1.2,
        accMod: 1.2,
        chanceMod: 1.2,
        numHits: 1,
    },
    CVCI_F_DUAL: {
        dmgMod: 1.18,
        accMod: 1.2,
        chanceMod: 1.3,
        numHits: 1,
    },

    Night_Zuiun_CI_ZZR: {
        dmgMod: 1.36,
        accMod: 1.07,
        chanceMod: 1.35,
        numHits: 2,
    },
    Night_Zuiun_CI_ZZ: {
        dmgMod: 1.32,
        accMod: 1.07,
        chanceMod: 1.35,
        numHits: 2,
    },
    Night_Zuiun_CI_ZR: {
        dmgMod: 1.28,
        accMod: 1.07,
        chanceMod: 1.35,
        numHits: 2,
    },
    Night_Zuiun_CI_Z: {
        dmgMod: 1.24,
        accMod: 1.07,
        chanceMod: 1.35,
        numHits: 2,
    }
};