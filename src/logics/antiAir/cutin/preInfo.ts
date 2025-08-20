import { Equip, includes_equip_type } from "../../../models/equip/basic";

export type AACIPreInfo = {
    /** 機銃の数 */
    anti_air_gun_count: number,
    /** 高角砲の数 */
    high_angle_gun_count: number,
    /** 特殊高角砲の数 */
    special_high_angle_gun_count: number,
    /** 特殊機銃の数 */
    special_anti_air_gun_count: number,
    /** 対空値3以上の機銃 の数 */
    aa3_gun_count: number,
    /** 初月砲の数 */
    hatsuzuki_gun_count: number,
    /** 25mm対空機銃増備 の数 */
    Shigure_gun_cluster_count: number,
    /** 20連装7inch UP Rocket Launchers の数 */
    UP_rocket_count: number,
    /** 10cm連装高角砲改 の数 */
    Shirayuki_gun_count: number,
    /** 5inch単装砲 Mk.30 の数 */
    Mk30_count: number,
    /** 5inch単装砲 Mk.30改 の数 */
    Mk30_kai_count: number,
    /** 5inch単装砲 Mk.30改+GFCS Mk.37 の数 */
    Mk30_GFCS_count: number,
    /** 12.7cm連装砲C型改三H の数 */
    C_H_gun_count: number,
    /** 5inch連装両用砲(集中配備) の数 */
    Atlanta_gun_count: number,
    /** GFCS Mk.37+5inch連装両用砲(集中配備) の数 */
    Atlanta_GFCS_gun_count: number,
    /** 10cm連装高角砲群 集中配備 の数 */
    Yamato_10cm_cluster_count: number,


    /** 大口径主砲 が含まれるか */
    has_any_L_gun: boolean,
    /** 電探類 が含まれるか */
    has_any_radar: boolean,
    /**
     * 高射装置 が含まれるか    
     * ～ +高射装置 系の装備は含めない
     */
    has_fire_director: boolean,
    /** 対空電探 が含まれるか */
    has_anti_air_radar: boolean,
    /** 対空値4以上の電探 が含まれるか */
    has_aa4_radar: boolean,
    /** 素対空7以下の高角砲 が含まれるか */
    has_aa7_or_less_high_gun: boolean,
    /** 素対空3～8の機銃 が含まれるか */
    has_aa3to8_gun: boolean,
    /** 対空値4以上の機銃 が含まれるか */
    has_aa4_gun: boolean,
    /** 対空値6以上の機銃 が含まれるか */
    has_aa6_gun: boolean,
    /** 12cm30連装噴進砲改二 が含まれるか */
    has_hunshin_kai_ni: boolean,
    /** 10cm連装高角砲改+増設機銃 が含まれるか */
    has_ohyodo_gun: boolean,
    /** 16inch Mk.I三連装砲改+FCR type284 が含まれるか */
    has_FCR_284: boolean,
    /** 35.6cm連装砲改三(ダズル迷彩仕様) が含まれるか */
    has_kai_3_gun: boolean,
    /** 35.6cm連装砲改四 が含まれるか */
    has_kai_4_gun: boolean,
    /** QF 2ポンド8連装ポンポン砲 が含まれるか */
    has_ponpon: boolean,
    /** 三式弾系 が含まれるか */
    has_type_3_shell: boolean,
    /** GFCS Mk.37 が含まれるか */
    has_GFCS_radar: boolean,
    /** 15m二重測距儀+21号電探改二 が含まれるか */
    has_yamato_radar: boolean,
    /** 15m二重測距儀改+21号電探改二+熟練射撃指揮所 が含まれるか */
    has_skilled_yamato_radar: boolean,
    /** 94式高射装置 が含まれるか */
    has_94_FD: boolean,
}
const INITIAL: AACIPreInfo = {
    anti_air_gun_count: 0,
    high_angle_gun_count: 0,
    special_high_angle_gun_count: 0,
    special_anti_air_gun_count: 0,
    aa3_gun_count: 0,
    hatsuzuki_gun_count: 0,
    Shigure_gun_cluster_count: 0,
    UP_rocket_count: 0,
    Shirayuki_gun_count: 0,
    Mk30_count: 0,
    Mk30_kai_count: 0,
    Mk30_GFCS_count: 0,
    C_H_gun_count: 0,
    Atlanta_gun_count: 0,
    Atlanta_GFCS_gun_count: 0,
    Yamato_10cm_cluster_count: 0,
    has_any_L_gun: false,
    has_any_radar: false,
    has_fire_director: false,
    has_anti_air_radar: false,
    has_aa4_radar: false,
    has_aa7_or_less_high_gun: false,
    has_aa3to8_gun: false,
    has_aa4_gun: false,
    has_aa6_gun: false,
    has_hunshin_kai_ni: false,
    has_ohyodo_gun: false,
    has_FCR_284: false,
    has_kai_3_gun: false,
    has_kai_4_gun: false,
    has_ponpon: false,
    has_type_3_shell: false,
    has_GFCS_radar: false,
    has_yamato_radar: false,
    has_skilled_yamato_radar: false,
    has_94_FD: false,
};

/**
 * 装備配列からAACI判定用情報を集計する
 * @param equips 装備配列
 * @returns PrepareAaciInfo
 */
export function derive_AACI_pre_info(
    equips: Equip[],
): AACIPreInfo {
    return equips.reduce<AACIPreInfo>((acc, equip) => {
        const {
            name_jp,
            natural_addition,
            aaci_trigger_type,
            skill_trigger_type,
            type_id,
        } = equip;
        const { anti_air } = natural_addition;
        
        // カウント系
        if (aaci_trigger_type === 'A_AAGUN') acc.anti_air_gun_count++;
        if (aaci_trigger_type === 'A_HAGUN' || aaci_trigger_type === 'A_HAFD') acc.high_angle_gun_count++;
        if (aaci_trigger_type === 'A_HAFD') acc.special_high_angle_gun_count++;
        if (equip.flags.is_concentrated) acc.special_anti_air_gun_count++;
        if (aaci_trigger_type === 'A_AAGUN' && anti_air >= 3) acc.aa3_gun_count++;
        if (name_jp === '10cm連装高角砲改+高射装置改') acc.hatsuzuki_gun_count++;
        if (name_jp === '25mm対空機銃増備') acc.Shigure_gun_cluster_count++;
        if (name_jp === '20連装7inch UP Rocket Launchers') acc.UP_rocket_count++;
        if (name_jp === '10cm連装高角砲改') acc.Shirayuki_gun_count++;
        if (name_jp === '5inch単装砲 Mk.30') acc.Mk30_count++;
        if (name_jp === '5inch単装砲 Mk.30改') acc.Mk30_kai_count++;
        if (name_jp === '5inch単装砲 Mk.30改+GFCS Mk.37') acc.Mk30_GFCS_count++;
        if (name_jp === '12.7cm連装砲C型改三H') acc.C_H_gun_count++;
        if (name_jp === '5inch連装両用砲(集中配備)') acc.Atlanta_gun_count++;
        if (name_jp === 'GFCS Mk.37+5inch連装両用砲(集中配備)') acc.Atlanta_GFCS_gun_count++;
        if (name_jp === '10cm連装高角砲群 集中配備') acc.Yamato_10cm_cluster_count++;

        // フラグ系
        if (includes_equip_type(['MAIN_GUN_L', 'MAIN_GUN_XL'], type_id)) acc.has_any_L_gun = true;
        if (skill_trigger_type === 'B_RADAR') acc.has_any_radar = true;
        if (aaci_trigger_type === 'A_AAFD') acc.has_fire_director = true;
        if (aaci_trigger_type === 'A_AIRRADAR') acc.has_anti_air_radar = true;
        if (skill_trigger_type === 'B_RADAR' && anti_air >= 4) acc.has_aa4_radar = true;
        if (
            (aaci_trigger_type === 'A_HAGUN' || aaci_trigger_type === 'A_HAFD') &&
            anti_air <= 7
        ) acc.has_aa7_or_less_high_gun = true;
        if (
            aaci_trigger_type === 'A_AAGUN' &&
            anti_air >= 3 &&
            anti_air <= 8
        ) acc.has_aa3to8_gun = true;
        if (aaci_trigger_type === 'A_AAGUN' && anti_air >= 4) acc.has_aa4_gun = true;
        if (aaci_trigger_type === 'A_AAGUN' && anti_air >= 6) acc.has_aa6_gun = true;
        if (name_jp === '12cm30連装噴進砲改二') acc.has_hunshin_kai_ni = true;
        if (name_jp === '10cm連装高角砲改+増設機銃') acc.has_ohyodo_gun = true;
        if (name_jp === '16inch Mk.I三連装砲改+FCR type284') acc.has_FCR_284 = true;
        if (name_jp === '35.6cm連装砲改三(ダズル迷彩仕様)') acc.has_kai_3_gun = true;
        if (name_jp === '35.6cm連装砲改四') acc.has_kai_4_gun = true;
        if (name_jp === 'QF 2ポンド8連装ポンポン砲') acc.has_ponpon = true;
        if (type_id === 'TYPE_3_SHELL') acc.has_type_3_shell = true;
        if (name_jp === 'GFCS Mk.37') acc.has_GFCS_radar = true;
        if (name_jp === '15m二重測距儀+21号電探改二') acc.has_yamato_radar = true;
        if (name_jp === '15m二重測距儀改+21号電探改二+熟練射撃指揮所') acc.has_skilled_yamato_radar = true;
        if (name_jp === '94式高射装置') acc.has_94_FD = true;

        return acc;
    }, { ...INITIAL });
}