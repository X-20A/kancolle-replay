import { AntiInstallPreInfo } from "./preInfo";

/// 対地乗算補正・対地加算補正
// https://en.kancollewiki.net/Combat/Anti-Installation#Landing_Craft_Specific_Bonuses
/**
 * NOTE: 愚直に実装すると
 * x → (x * A1 + B1) * A2 + B2 ・・・
 * となるが、これでは対地目標をターゲットする度に再計算することになるので、
 * 事前評価できるように変形する
 * x → (x * A1 + B1) * A2 + B2
 * = x * (A1 * A2) + (B1 * A2 + B2)
 */

type LandingCraftSoecufucBonuses = {
    A: number,
    B: number,
};
const INITIAL_MODS: LandingCraftSoecufucBonuses = { A: 1, B: 0 };

/**
 * 線形変換を合成する
 */
const compose_linear_mod =(
    current: LandingCraftSoecufucBonuses,
    mod: LandingCraftSoecufucBonuses,
): LandingCraftSoecufucBonuses => {
    return {
        A: current.A * mod.A,
        B: current.B * mod.A + mod.B,
    };
}

/**
 * 上陸支援舟艇シナジー補正を適用した攻撃力を返す
 * @param info 
 * @param attack_power 
 */
const apply_armed_boats_synergy = (
    info: AntiInstallPreInfo,
    mod: LandingCraftSoecufucBonuses,
): LandingCraftSoecufucBonuses => {
    const {
        AB_count,
        armed_LC_count,
        armed_boats_synergy_type_A_count,
        armed_boats_synergy_type_B_count,
    } = info;

    if (
        (AB_count === 1 || armed_LC_count === 1) &&
        AB_count < 2 &&
        armed_LC_count < 2
    ) {
        if (AB_count === 1 && armed_LC_count === 1) {
            if (armed_boats_synergy_type_A_count + armed_boats_synergy_type_B_count >= 2) {
                return compose_linear_mod(mod, { A: 1.5, B: 25 });
            }
            if (armed_boats_synergy_type_B_count) {
                return compose_linear_mod(mod, { A: 1.4, B: 20 });
            }
            if (armed_boats_synergy_type_A_count) {
                return compose_linear_mod(mod, { A: 1.3, B: 15 });
            }
        } else if (armed_boats_synergy_type_A_count + armed_boats_synergy_type_B_count) {
            return compose_linear_mod(mod, { A: 1.2, B: 10 });
        }
    }

    return mod;
}

/**
 * 対地特効補正を適用した攻撃力返す
 * @param info 
 * @param attack_power 
 * @returns 
 */
export function apply_Landing_Craft_specific_bonuses(
    info: AntiInstallPreInfo,
): LandingCraftSoecufucBonuses {
    const {
        Toku_11_tank_count,
        Isshiki_tank_count,
        Panzer_3_count,
        m4a1_count,
        chiha_count,
        chiha_kai_count,
        Army_infantry_count,
        Army_chiha_count,
        Army_chiha_kai_count,
        Army_infantry_chiha_count,
        Armys_count,
        landing_tank_count,
        Katsu_tanks_count,
        Katsu_tank_kai_count,
    } = info;

    let mods: LandingCraftSoecufucBonuses = INITIAL_MODS;

    // 11連隊 | 一式砲戦車 | III号戦車: f1
    if (
        Toku_11_tank_count
        + Isshiki_tank_count
        + Panzer_3_count
    ) mods = compose_linear_mod(mods, { A: 1.8, B: 25 });

    // M4A1: f2
    if (m4a1_count) {
        mods = compose_linear_mod(mods, { A: 1.4, B: 35 });
    }

    // 特大発動艇+一式砲戦車: f3
    if (Isshiki_tank_count) {
        mods = compose_linear_mod(mods, { A: 1.3, B: 42 });
    }

    // 特大発＋チハ: f4
    if (chiha_count) {
        mods = compose_linear_mod(mods, { A: 1.4, B: 28 });
    }

    // 特大発＋チハ改: f5
    if (chiha_kai_count) {
        mods = compose_linear_mod(mods, { A: 1.5, B: 33 });
    }

    // 陸軍歩兵部隊 | 陸軍歩兵部隊+チハ改: f6
    if (Army_infantry_count + Army_infantry_chiha_count) {
        mods = compose_linear_mod(mods, { A: 1.2, B: 60 });
    }

    // 九七式中戦車(チハ)・九七式中戦車 新砲塔(チハ改): f7
    if (Army_chiha_count + Army_chiha_kai_count) {
        mods = compose_linear_mod(mods, { A: 1.5, B: 70 });
    }

    // 九七式中戦車 新砲塔(チハ改): f8
    if (Army_chiha_kai_count) {
        mods = compose_linear_mod(mods, { A: 1.5, B: 50 });
    }

    // 陸軍歩兵部隊+チハ改: f9
    if (Army_infantry_chiha_count) {
        mods = compose_linear_mod(mods, { A: 1.6, B: 70 });
    }

    // 上陸部隊系: f10
    // ENwikiの multiple of のニュアンス(数?種類?)が掴みかねるが
    // fourinoneさん曰く単純な数でいいらしい DB解析の裏取りもあるとのこと
    if (Armys_count >= 2) {
        mods = compose_linear_mod(mods, { A: 2, B: 100 });
    }

    // TODO: 要テスト
    // 陸上部隊系 | 特四式内火艇系: f11
    if (
        Armys_count >= 2 &&
        (Armys_count + landing_tank_count >= 3 || Army_infantry_chiha_count >= 1)
    ) {
        // ENwikiに特四式内火艇系の組み合わせ表記には不明瞭さがあるが
        // 以下の付与方式が妥当に思える
        // https://docs.google.com/document/d/1-tPbylmX7UDE25M_LSCz2gGuxCIs3OQw9hECeGyLFJk/edit?tab=t.0
        let flat = 150;
        if (Katsu_tanks_count) flat += 100;
        if (Katsu_tank_kai_count) flat += 72;

        mods = compose_linear_mod(mods, { A: 3, B: flat });
    }

    // 特四式内火艇 | 特四式内火艇改: f12
    if (Katsu_tanks_count) {
        mods = compose_linear_mod(mods, { A: 1.2, B: 42 });
    }

    // 特四式内火艇改: f13
    if (Katsu_tank_kai_count) {
        mods = compose_linear_mod(mods, { A: 1.1, B: 28 });
    }

    // TODO: 要テスト
    // 武装大発 | 装甲艇(AB艇): f14
    mods = apply_armed_boats_synergy(info, mods);

    return mods;
}