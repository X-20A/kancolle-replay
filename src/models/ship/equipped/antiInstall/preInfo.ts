import { includes_equip_type, includes_player_equip_name, PlayerEquip } from "@/models/equip/basic";

export type AntiInstallPreInfo = {
    type_1_LC_count: number,
    total_type_1_LC_improvement: number,
    type_2_LC_count: number,
    type_3_LC_count: number,
    total_type_3_LC_improvement: number,
    special_LC1_count: number,
    /** 艦爆・噴式爆撃機 の数 */
    carrier_bomber_count: number,
    /** 水爆の数 */
    seaplane_bomber_count: number,
    /** WG42 (Wurfgerat 42) の数 */
    WG_count: number,
    /** 三式弾系 の数 */
    Type_3_shell_count: number,
    /** 特四式内火艇改 の数 */
    Toku_4_tank_count: number,
    /** j陸軍部隊系　を所持しているか */
    has_army_unit: boolean,
}

const calc_pre_info = (
    equips: PlayerEquip[],
): AntiInstallPreInfo => {
    const initial: AntiInstallPreInfo = {
        type_1_LC_count: 0,
        total_type_1_LC_improvement: 0,
        type_2_LC_count: 0,
        type_3_LC_count: 0,
        total_type_3_LC_improvement: 0,
        special_LC1_count: 0,
        carrier_bomber_count: 0,
        seaplane_bomber_count: 0,
        WG_count: 0,
        Type_3_shell_count: 0,
        Toku_4_tank_count: 0,

        has_army_unit: false,
    }

    return equips.reduce((total, equip) => {
        const {
            name_jp,
            improvement_lv,
            type_id,
            skill_trigger_type,
        } = equip;

        if (skill_trigger_type === 'B_LC1') {
            total.type_1_LC_count++;
            total.total_type_1_LC_improvement += improvement_lv;
        }
        if (skill_trigger_type === 'B_LC2') total.type_2_LC_count++;
        if (skill_trigger_type === 'B_LC3') {
            total.type_3_LC_count++;
            total.total_type_3_LC_improvement += improvement_lv;
        }
        if (
            includes_player_equip_name(['特大発動艇', '特大発動艇+Ⅲ号戦車J型'], name_jp)
        ) total.special_LC1_count++;
        if (
            includes_equip_type(['DIVE_BOMBER', 'JET_BOMBER'], type_id)
        ) total.carrier_bomber_count++;
        if (name_jp === 'WG42 (Wurfgerät 42)') total.WG_count++;
        if (type_id === 'TYPE_3_SHELL') total.Type_3_shell_count++;
        if (name_jp === '特四式内火艇改') total.Toku_4_tank_count++;
        if (type_id === 'ARMY_UNIT') total.has_army_unit = true;
        return total;
    }, initial);
}