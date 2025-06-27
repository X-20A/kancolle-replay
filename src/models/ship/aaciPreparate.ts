import { Equip } from "../equip/basic";

export type PrepareAaciInfo = {
    /** 機銃の数 */
    anti_air_gun_count: number,
    /** 高角砲の数 */
    high_angle_gun_count: number,
    /** 特殊高角砲の数 */
    special_high_angle_gun_count: number,
    /** 特殊機銃の数 */
    special_anti_air_gun_count: number,
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
    /** 高射装置(含内蔵) が含まれるか */
    has_fire_director: boolean,
    /** 対空電探 が含まれるか */
    has_anti_air_radar: boolean,
    /** 対空値4以上の電探 が含まれるか */
    has_aa4_radar: boolean,
    /** 対空値3以上の機銃 が含まれるか */
    has_aa3_gun: boolean,
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

export function derive_prepare_AACI_info(
    equips: Equip[],
): PrepareAaciInfo { // 対空カットインはシミュ前に静的に決定できそうだから無理にreduceとかしなくていいかも
    const anti_air_gun_count = equips
        .filter(equip => equip.aaci_trigger_type === 'A_AAGUN')
        .length;

    const high_angle_gun_count = equips
        .filter(equip_built => equip_built.aaci_trigger_type === 'A_HAGUN')
        .length;

    const special_high_angle_gun_count = equips
        .filter(equip => equip.aaci_trigger_type === 'A_HAFD')
        .length;

    const special_anti_air_gun_count = equips
        .filter(equip => equip.flags.is_concentrated)
        .length;

    const hatsuzuki_gun_count = equips
        .filter(equip => equip.name_jp === '10cm連装高角砲改+高射装置改')
        .length;

    const Shigure_gun_cluster_count = equips
        .filter(equip => equip.name_jp === '25mm対空機銃増備')
        .length;

    const UP_rocket_count = equips
        .filter(equip => equip.name_jp === '20連装7inch UP Rocket Launchers')
        .length;

    const Shirayuki_gun_count = equips
        .filter(equip => equip.name_jp === '10cm連装高角砲改')
        .length;

    const Mk30_count = equips
        .filter(equip => equip.name_jp === '5inch単装砲 Mk.30')
        .length;

    const Mk30_kai_count = equips
        .filter(equip => equip.name_jp === '5inch単装砲 Mk.30改')
        .length;

    const Mk30_GFCS_count = equips
        .filter(equip => equip.name_jp === '5inch単装砲 Mk.30改+GFCS Mk.37')
        .length;

    const C_H_gun_count = equips
        .filter(equip => equip.name_jp === '12.7cm連装砲C型改三H')
        .length;

    const Atlanta_gun_count = equips
        .filter(equip => equip.name_jp === '5inch連装両用砲(集中配備)')
        .length;

    const Atlanta_GFCS_gun_count = equips
        .filter(equip => equip.name_jp === 'GFCS Mk.37+5inch連装両用砲(集中配備)')
        .length;

    const Yamato_10cm_cluster_count = equips
        .filter(equip => equip.name_jp === '10cm連装高角砲群 集中配備')
        .length;

    const has_any_L_gun =
        equips.some(equip => ['MAIN_GUN_L', 'MAIN_GUN_XL'].includes(equip.type_id));

    const has_any_radar =
        equips.some(equip => equip.skill_trigger_type === 'B_RADAR');

    const has_fire_director =
        equips.some(equip => ['A_AAFD', 'A_HAFD'].includes(equip.aaci_trigger_type));

    const has_anti_air_radar =
        equips.some(equip => equip.aaci_trigger_type === 'A_AIRRADAR');

    const has_aa4_radar = equips.some(equip =>
        equip.skill_trigger_type === 'B_RADAR' &&
        equip.natural_addition.anti_air >= 4
    );

    const has_aa3_gun = equips.some(equip =>
        equip.aaci_trigger_type === 'A_AAGUN' &&
        equip.natural_addition.anti_air >= 3
    );

    const has_aa6_gun = equips.some(equip =>
        equip.aaci_trigger_type === 'A_AAGUN' &&
        equip.natural_addition.anti_air >= 6
    );

    const has_hunshin_kai_ni = equips.some(equip =>
        equip.name_jp === '12cm30連装噴進砲改二'
    );

    const has_ohyodo_gun = equips.some(equip =>
        equip.name_jp === '10cm連装高角砲改+増設機銃'
    );

    const has_FCR_284 = equips.some(equip =>
        equip.name_jp === '16inch Mk.I三連装砲改+FCR type28'
    );

    const has_kai_3_gun = equips.some(equip =>
        equip.name_jp === '35.6cm連装砲改三(ダズル迷彩仕様)'
    );

    const has_kai_4_gun = equips.some(equip =>
        equip.name_jp === '35.6cm連装砲改四'
    );

    const has_ponpon = equips.some(equip =>
        equip.name_jp === 'QF 2ポンド8連装ポンポン砲'
    );

    const has_type_3_shell = equips.some(equip =>
        equip.type_id === 'TYPE_3_SHELL'
    );

    const has_GFCS_radar = equips.some(equip =>
        equip.name_jp === 'GFCS Mk.37'
    );

    const has_yamato_radar = equips.some(equip =>
        equip.name_jp === '15m二重測距儀+21号電探改二'
    );

    const has_skilled_yamato_radar = equips.some(equip =>
        equip.name_jp === '15m二重測距儀改+21号電探改二+熟練射撃指揮所'
    );

    const has_94_FD = equips.some(equip =>
        equip.name_jp === '94式高射装置'
    );

    return {
        anti_air_gun_count,
        high_angle_gun_count,
        special_high_angle_gun_count,
        special_anti_air_gun_count,
        hatsuzuki_gun_count,
        Shigure_gun_cluster_count,
        UP_rocket_count,
        Shirayuki_gun_count,
        Mk30_count,
        Mk30_kai_count,
        Mk30_GFCS_count,
        C_H_gun_count,
        Atlanta_gun_count,
        Atlanta_GFCS_gun_count,
        Yamato_10cm_cluster_count,
        has_any_L_gun,
        has_any_radar,
        has_fire_director,
        has_anti_air_radar,
        has_aa4_radar,
        has_aa3_gun,
        has_aa6_gun,
        has_hunshin_kai_ni,
        has_ohyodo_gun,
        has_FCR_284,
        has_kai_3_gun,
        has_kai_4_gun,
        has_ponpon,
        has_type_3_shell,
        has_GFCS_radar,
        has_yamato_radar,
        has_skilled_yamato_radar,
        has_94_FD,
    }
}