import { includes_equip_type, includes_player_equip_name, is_AP_shell, PlayerEquip } from "@/models/equip/basic";
import { Brand } from "@/types/brands";
import { PlayerEquipNameJP } from "@/types/equip/playerNameJP";

export type ArmedBoatsCount = Brand<number, 'ArmedBoatsCount'>
export type KatsuTanksCount = Brand<number, 'KatsuTanksCount'>

export type AntiInstallPreInfo = {
    /** 大発系 の数(例外有り) */
    normal_LC_count: number,
    /** 大発系 の改修値総計(例外有り) */
    total_normal_LC_improvement: number,
    /** 陸戦隊系 の数(例外有り) */
    Landing_force_count: number,
    /** 内火艇系 の数(例外有り) */
    Amphibious_tank_count: number,
    /** 内火艇系 の改修値総計(例外有り) */
    total_Amphibious_tank_improvement: number,
    /** 特大発動艇 | 特大発動艇+Ⅲ号戦車J型 | 特大発動艇+Ⅲ号戦車(北アフリカ仕様) の数 */
    special_LC1_count: number,
    /** 特大発動艇+戦車第11連隊 の数 */
    Toku_11_tank_count: number,
    /** 特大発動艇+一式砲戦車 の数 */
    Isshiki_tank_count: number,
    /** 特大発動艇+Ⅲ号戦車(北アフリカ仕様) | 特大発動艇+Ⅲ号戦車J型 の数 */
    Panzer_3_count: number,
    /** 艦爆・噴式爆撃機 の数 */
    carrier_bomber_count: number,
    /** 水爆 の数 */
    seaplane_bomber_count: number,
    /** WG42 (Wurfgerat 42) の数 */
    WG_count: number,
    /** 徹甲弾系 の数 */
    AP_shell_count: number,
    /** 三式弾系 の数 */
    Type_3_shell_count: number,
    /** 特四式内火艇改 の数 */
    Katsu_tank_kai_count: number,
    /** 特四式内火艇 | 特四式内火艇改 の数 */
    Katsu_tanks_count: KatsuTanksCount,
    /** 特四式内火艇 | 特四式内火艇改 の改修値総計 */
    total_Katsu_tanks_improvement: number,
    /** 特大発動艇+チハ の数 */
    chiha_count: number,
    /** 特大発動艇+チハ改 の数 */
    chiha_kai_count: number,
    /** M4A1 DD の数 */
    m4a1_count: number,
    /** 特大発動艇+Ⅲ号戦車J型 の数 */
    J_tank_count: number,
    /** 大発動艇(II号戦車/北アフリカ仕様) の数 */
    African_tank_count: number,
    /** 装甲艇(AB艇) の数 */
    AB_count: number,
    /** 武装大発 の数 */
    armed_LC_count: number,
    /** 二式12cm迫撃砲改 の数 */
    mortar_count: number,
    /** 二式12cm迫撃砲改 集中配備 の数 */
    mortar_concentrated_count: number,
    /** 艦載型 四式20cm対地噴進砲 の数 */
    Type_4_rocket_count: number,
    /** 四式20cm対地噴進砲 集中配備 の数 */
    Type_4_rocket_concentrated_count: number,
    /** 陸軍歩兵部隊 の数 */
    Army_infantry_count: number,
    /** 九七式中戦車(チハ) の数 */
    Army_chiha_count: number,
    /** 九七式中戦車 新砲塔(チハ改) の数 */
    Army_chiha_kai_count: number,
    /** 陸軍歩兵部隊+チハ改 の数 */
    Army_infantry_chiha_count: number,
    /** 陸軍部隊系 の数 */
    Armys_count: number,
    landing_tank_count: number,
    /** 上陸用舟艇シナジー対象装備数 A群 */
    armed_boats_synergy_type_A_count: number,
    /** 上陸用舟艇シナジー対象装備数 B群 */
    armed_boats_synergy_type_B_count: number,
    /** Swordfish(艦攻) の数 */
    torpedo_bomber_swordfish_count: number,
    /** 水戦 の数 */
    seaplane_fighter_count: number,
    /** Laté 298B */
    Late_298_count: number,
    /** 噴式爆撃機 の数 */
    jet_bomber_count: number,

    /** 上陸用舟艇 | カツ車 | 陸軍部隊 */
    has_special_LC: boolean,
    /** 武装大発 | 装甲艇(AB艇) の数 */
    armed_boats_count: ArmedBoatsCount,
    total_mortars_count: number,
    total_Type4_rocket_count: number,
}
const INITIAL: AntiInstallPreInfo = {
    normal_LC_count: 0,
    total_normal_LC_improvement: 0,
    Landing_force_count: 0,
    Amphibious_tank_count: 0,
    total_Amphibious_tank_improvement: 0,
    special_LC1_count: 0,
    Toku_11_tank_count: 0,
    Isshiki_tank_count: 0,
    Panzer_3_count: 0,
    carrier_bomber_count: 0,
    seaplane_bomber_count: 0,
    WG_count: 0,
    AP_shell_count: 0,
    Type_3_shell_count: 0,
    Katsu_tank_kai_count: 0,
    Katsu_tanks_count: 0 as KatsuTanksCount,
    total_Katsu_tanks_improvement: 0,
    chiha_count: 0,
    chiha_kai_count: 0,
    m4a1_count: 0,
    J_tank_count: 0,
    African_tank_count: 0,
    AB_count: 0,
    armed_LC_count: 0,
    mortar_count: 0,
    mortar_concentrated_count: 0,
    Type_4_rocket_count: 0,
    Type_4_rocket_concentrated_count: 0,
    Army_infantry_count: 0,
    Army_chiha_count: 0,
    Army_chiha_kai_count: 0,
    Army_infantry_chiha_count: 0,
    Armys_count: 0,
    landing_tank_count: 0,
    armed_boats_synergy_type_A_count: 0,
    armed_boats_synergy_type_B_count: 0,
    torpedo_bomber_swordfish_count: 0,
    seaplane_fighter_count: 0,
    Late_298_count: 0,
    jet_bomber_count: 0,
    has_special_LC: false,
    armed_boats_count: 0 as ArmedBoatsCount,
    total_mortars_count: 0,
    total_Type4_rocket_count: 0,
} as const;

const add_utils = (
    pre_info: AntiInstallPreInfo,
): AntiInstallPreInfo => {
    const {
        normal_LC_count,
        Landing_force_count,
        Katsu_tank_kai_count,
        AB_count,
        armed_LC_count,
        mortar_count,
        mortar_concentrated_count,
        Type_4_rocket_count,
        Type_4_rocket_concentrated_count,
        Armys_count,
    } = pre_info;

    const has_special_LC = normal_LC_count >= 1 ||
        Landing_force_count >= 1 ||
        Katsu_tank_kai_count >= 1 ||
        Armys_count >= 1;

    const armed_boats_count =
        AB_count + armed_LC_count as ArmedBoatsCount;

    const total_mortars_count = mortar_count
        + mortar_concentrated_count;
    const total_Type4_rocket_count = Type_4_rocket_count
        + Type_4_rocket_concentrated_count;

    const util: AntiInstallPreInfo = {
        ...pre_info,
        has_special_LC,
        armed_boats_count,
        total_mortars_count,
        total_Type4_rocket_count,
    }

    return util;
}

const ARMED_BOATS_SYNERGY_TARGET_NAMES: {
    A: PlayerEquipNameJP[],
    B: PlayerEquipNameJP[],
} = {
    // NOTE: 特大発動艇+Ⅲ号戦車J型 はENwikiではグループBだけだが両グループに含まれる
    // https://bbs.nga.cn/read.php?tid=33769345&rand=689 > (5)[对陆]登陆艇/内火艇套装补正
    A: [
        '大発動艇',
        '大発動艇(八九式中戦車&陸戦隊)',
        '特大発動艇',
        '大発動艇(II号戦車/北アフリカ仕様)',
        '特大発動艇+一式砲戦車',
        '特大発動艇+Ⅲ号戦車J型',
        '特四式内火艇',
        '特四式内火艇改',
    ],
    B: [
        '特二式内火艇',
        '特大発動艇+戦車第11連隊',
        '特大発動艇+Ⅲ号戦車(北アフリカ仕様)',
        '特大発動艇+チハ',
        '特大発動艇+チハ改',
        '特大発動艇+Ⅲ号戦車J型',
    ],
} as const;

export function calc_anti_install_pre_info(
    equips: PlayerEquip[],
): AntiInstallPreInfo {
    const pre_info: AntiInstallPreInfo = equips.reduce((total, equip) => {
        const {
            name_jp,
            improvement_lv,
            type_id,
            skill_trigger_type,
            flags,
        } = equip;

        if (
            skill_trigger_type === 'B_LC1' &&
            name_jp !== '特大発動艇+Ⅲ号戦車(北アフリカ仕様)'
        ) {
            total.normal_LC_count++;
            total.total_normal_LC_improvement += improvement_lv;
        }
        if (
            skill_trigger_type === 'B_LC2' ||
            name_jp === '特大発動艇+Ⅲ号戦車(北アフリカ仕様)'
        )  {
            total.Landing_force_count++;
            total.total_normal_LC_improvement += improvement_lv;
        }
        if (skill_trigger_type === 'B_LC3') {
            total.Amphibious_tank_count++;
            total.total_Amphibious_tank_improvement += improvement_lv;
        }
        if (
            includes_player_equip_name([
                '特大発動艇',
                '特大発動艇+Ⅲ号戦車J型',
                '特大発動艇+Ⅲ号戦車(北アフリカ仕様)'
            ], name_jp)
        ) total.special_LC1_count++;
        if (name_jp === '特大発動艇+戦車第11連隊') total.Toku_11_tank_count++;
        if (name_jp === '特大発動艇+一式砲戦車') total.Isshiki_tank_count++;
        if (
            includes_player_equip_name(['特大発動艇+Ⅲ号戦車(北アフリカ仕様)', '特大発動艇+Ⅲ号戦車J型'], name_jp)
        ) total.Panzer_3_count++;
        if (
            includes_equip_type(['DIVE_BOMBER', 'JET_BOMBER'], type_id)
        ) total.carrier_bomber_count++;
        if (name_jp === 'WG42 (Wurfgerät 42)') total.WG_count++;
        if (is_AP_shell(equip)) total.AP_shell_count++;
        if (type_id === 'TYPE_3_SHELL') total.Type_3_shell_count++;
        if (name_jp === '特四式内火艇改') total.Katsu_tank_kai_count++;
        if (
            includes_player_equip_name(['特四式内火艇', '特四式内火艇改'], name_jp)
        ) {
            total.Katsu_tanks_count++;
            total.total_Katsu_tanks_improvement += improvement_lv;
        }
        if (name_jp === '特大発動艇+チハ') total.chiha_count++;
        if (name_jp === '特大発動艇+チハ改') total.chiha_kai_count++;
        if (name_jp === 'M4A1 DD') total.m4a1_count++;
        if (name_jp === '特大発動艇+Ⅲ号戦車J型') total.J_tank_count++;
        if (name_jp === '大発動艇(II号戦車/北アフリカ仕様)') total.African_tank_count++;
        if (name_jp === '装甲艇(AB艇)') total.AB_count++;
        if (name_jp === '武装大発') total.armed_LC_count++;
        if (name_jp === '二式12cm迫撃砲改') total.mortar_count++;
        if (name_jp === '二式12cm迫撃砲改 集中配備') total.mortar_concentrated_count++;
        if (name_jp === '艦載型 四式20cm対地噴進砲') total.Type_4_rocket_count++;
        if (name_jp === '四式20cm対地噴進砲 集中配備') total.Type_4_rocket_concentrated_count++;
        if (name_jp === '陸軍歩兵部隊') total.Army_infantry_count++;
        if (name_jp === '九七式中戦車(チハ)') total.Army_chiha_count++;
        if (name_jp === '九七式中戦車 新砲塔(チハ改)') total.Army_chiha_kai_count++;
        if (name_jp === '陸軍歩兵部隊+チハ改') total.Army_infantry_chiha_count++;
        if (type_id === 'ARMY_UNIT') total.Armys_count++;
        if (type_id === 'LANDING_TANK') total.landing_tank_count++;
        if (
            includes_player_equip_name(ARMED_BOATS_SYNERGY_TARGET_NAMES.A, name_jp)
        ) total.armed_boats_synergy_type_A_count++;
        if (
            includes_player_equip_name(ARMED_BOATS_SYNERGY_TARGET_NAMES.B, name_jp)
        ) total.armed_boats_synergy_type_B_count++;
        if (
            flags.is_Swordfish_family &&
            type_id === 'TORPEDO_BOMBER'
        ) total.torpedo_bomber_swordfish_count++;
        if (type_id === 'SEAPLANE_FIGHTER') total.seaplane_fighter_count++;
        if (name_jp === 'Laté 298B') total.Late_298_count++;
        if (type_id === 'JET_BOMBER') total.jet_bomber_count++;

        return total;
    }, INITIAL);

    return add_utils(pre_info);
}