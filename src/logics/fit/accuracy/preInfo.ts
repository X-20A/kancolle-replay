import { includes_player_equip_name, PlayerEquip } from "@/models/equip/basic";
import { is_player_equipped_ship } from "@/models/ship/equipped";
import { is_married, PlayerNakedShip } from "@/models/ship/naked";
import { PlayerEquipNameJP } from "@/types/equip/playerNameJP";

const EQUIP_COUNT_INITIAL = {
    count_normal_46_gun: 0,
    count_proto_46_gun: 0,
    /**
     * 41cm系主砲の数    
     * 16inch系を含み、Mk7系を除く
     */
    count_41_gun_series: 0,
    /**
     * 35.6cm系主砲の数    
     * 38.1cm系を含み、381mm系を除く
     */
    count_356_gun_series: 0,
    count_381mm_series: 0,
    count_16inch_mk7: 0,
    count_46_gun_kai: 0,
    count_51_gun: 0,
    count_305_gun: 0,
    count_320_gun: 0,

    count_normal_mk7: 0,
    count_GFCS_mk7: 0,
    count_38_quadruple: 0,
    count_41_gun: 0,
    count_Nagato_low_bonus_gun: 0,
    count_381mm_mk1_series: 0,
    count_155_sec_gun_series: 0,
    count_14_and_152_gun_series: 0,
    count_8inch_series: 0,
    count_152_series: 0,
    count_main_gun_M: 0,
    count_155_series: 0,
    count_Atlanta_gun: 0,
    count_127_HA_gun: 0,
    count_130_gun: 0,
    count_QF_XII: 0,
    count_ASDIC_series: 0,
    count_Mk30_gun: 0,
    /** Mk30無印は除く */
    count_Mk30_series: 0,
    count_127_kai_ni: 0,
}
export type FitPreInfo = {
    [K in keyof typeof EQUIP_COUNT_INITIAL]: number
}

export function calc_ship_type_fit_mod(
    equips: PlayerEquip[],
): FitPreInfo {
    const GUN_41_SERIES_NAMES: PlayerEquipNameJP[] = [
        '41cm連装砲',
        '試製41cm三連装砲',
        '41cm三連装砲改',
        '41cm三連装砲改二',
        '16inch Mk.I三連装砲',
        '16inch Mk.I三連装砲+AFCT改',
        '16inch Mk.I三連装砲改+FCR type284',
        '41cm連装砲改二',
        '16inch Mk.I連装砲',
        '16inch Mk.V連装砲',
        '16inch Mk.VIII連装砲改',
        '16inch三連装砲 Mk.6',
        '16inch三連装砲 Mk.6 mod.2',
        '16inch三連装砲 Mk.6+GFCS',
    ];
    const GUN_356_SERIES_NAMES: PlayerEquipNameJP[] = [
        '35.6cm連装砲',
        '38cm連装砲',
        '試製35.6cm三連装砲',
        '35.6cm連装砲(ダズル迷彩)',
        '38cm連装砲改',
        '38.1cm Mk.I連装砲',
        '38.1cm Mk.I/N連装砲改',
        '35.6cm三連装砲改(ダズル迷彩仕様)',
        '35.6cm連装砲改',
        '35.6cm連装砲改二',
        '35.6cm連装砲改三(ダズル迷彩仕様)',
        '35.6cm連装砲改四',
        '35.6cm連装砲改三丙',
    ];
    const GUN_381mm_SERIES_NAMES: PlayerEquipNameJP[] = [
        '381mm/50 三連装砲',
        '381mm/50 三連装砲改',
    ];
    const GUN_16inch_MK7: PlayerEquipNameJP[] = [
        '16inch三連装砲 Mk.7',
        '16inch三連装砲 Mk.7+GFCS',
    ];
    const GUN_51_SERIES_NAMES: PlayerEquipNameJP[] = [
        '試製51cm三連装砲',
        '51cm連装砲',
        '試製51cm三連装砲',
    ];
    const GUN_305mm_SERIES_NAMES: PlayerEquipNameJP[] = [
        '30.5cm三連装砲',
        '30.5cm三連装砲改',
    ];
    const GUN_320mm_SERIES_NAMES: PlayerEquipNameJP[] = [
        '305mm/46 連装砲',
        '305mm/46 三連装砲',
        '320mm/44 連装砲',
        '320mm/44 三連装砲',
    ];
    const GUN_38_QUADRUPLE_SERIES_NAMES: PlayerEquipNameJP[] = [
        '38cm四連装砲',
        '38cm四連装砲改',
        '38cm四連装砲改 deux',
    ];
    const NAGATO_LOW_BONUS_GUN_NAMES: PlayerEquipNameJP[] =
        GUN_41_SERIES_NAMES.filter(name => name !== '41cm連装砲');

    const GUN_381mm_MK1_SERIES: PlayerEquipNameJP[] = [
        '38.1cm Mk.I連装砲',
        '38.1cm Mk.I/N連装砲改',
    ];
    const SEC_GUN_155_SERIES: PlayerEquipNameJP[] = [
        '15.5cm三連装副砲',
        '15.5cm三連装副砲改',
        '15.5cm三連装副砲改二',
    ];
    const GUN_14_AND_152_SERIES_NAMES: PlayerEquipNameJP[] = [
        '14cm単装砲',
        '14cm連装砲',
        '15.2cm連装砲',
        '14cm連装砲改',
        '15.2cm連装砲改',
        '15.2cm連装砲改二',
        'Bofors 15.2cm連装砲 Model 1930',
        '6inch 連装速射砲 Mk.XXI',
        'Bofors 15cm連装速射砲 Mk.9 Model 1938',
        'Bofors 15cm連装速射砲 Mk.9改+単装速射砲 Mk.10改 Model 1938',
    ];
    const GUN_8inch_SERIES_NAMES: PlayerEquipNameJP[] = [
        '8inch三連装砲 Mk.9',
        '8inch三連装砲 Mk.9 mod.2',
    ];
    const GUN_152_SERIES_NAMES: PlayerEquipNameJP[] = [
        '15.2cm連装砲',
        '15.2cm連装砲改',
        '15.2cm連装砲改二',
        'Bofors 15.2cm連装砲 Model 1930',
        '6inch 連装速射砲 Mk.XXI',
        'Bofors 15cm連装速射砲 Mk.9 Model 1938',
        'Bofors 15cm連装速射砲 Mk.9改+単装速射砲 Mk.10改 Model 1938',
    ];
    const GUN_155_SERIES_NAMES: PlayerEquipNameJP[] = [
        '15.5cm三連装砲',
        '15.5cm三連装砲改',
    ];
    const ATLANTA_GUN_NAMES: PlayerEquipNameJP[] = [
        '5inch連装両用砲(集中配備)',
        'GFCS Mk.37+5inch連装両用砲(集中配備)',
    ];
    const ASDIC_SERIES_NAMES: PlayerEquipNameJP[] = [
        'Type124 ASDIC',
        'Type144/147 ASDIC',
        'HF/DF + Type144/147 ASDIC',
    ];
    const Mk30_SERIES_NAMES: PlayerEquipNameJP[] = [
        '5inch単装砲 Mk.30改+GFCS Mk.37',
        '5inch単装砲 Mk.30改',
    ];

    const counts: FitPreInfo = equips.reduce((total, equip) => {
        const equip_name = equip.name_jp;
        if (equip_name === '46cm三連装砲') total.count_normal_46_gun++;
        if (equip_name === '試製46cm連装砲') total.count_proto_46_gun++;
        if (includes_player_equip_name(GUN_41_SERIES_NAMES, equip_name)) total.count_41_gun_series++;
        if (includes_player_equip_name(GUN_356_SERIES_NAMES, equip_name)) total.count_356_gun_series++;
        if (includes_player_equip_name(GUN_381mm_SERIES_NAMES, equip_name)) total.count_381mm_series++;
        if (includes_player_equip_name(GUN_16inch_MK7, equip_name)) total.count_16inch_mk7++;
        if (equip_name === '46cm三連装砲改') total.count_46_gun_kai++;
        if (includes_player_equip_name(GUN_51_SERIES_NAMES, equip_name)) total.count_51_gun++;
        if (includes_player_equip_name(GUN_305mm_SERIES_NAMES, equip_name)) total.count_305_gun++;
        if (includes_player_equip_name(GUN_320mm_SERIES_NAMES, equip_name)) total.count_320_gun++;
        if (equip_name === '16inch三連装砲 Mk.7') total.count_normal_mk7++;
        if (equip_name === '16inch三連装砲 Mk.7+GFCS') total.count_GFCS_mk7++;
        if (includes_player_equip_name(GUN_38_QUADRUPLE_SERIES_NAMES, equip_name)) total.count_38_quadruple++;
        if (equip_name === '41cm連装砲') total.count_41_gun++;
        if (includes_player_equip_name(NAGATO_LOW_BONUS_GUN_NAMES, equip_name)) total.count_Nagato_low_bonus_gun++;
        if (includes_player_equip_name(GUN_381mm_MK1_SERIES, equip_name)) total.count_381mm_mk1_series++;
        if (includes_player_equip_name(SEC_GUN_155_SERIES, equip_name)) total.count_155_sec_gun_series++; 
        if (includes_player_equip_name(GUN_14_AND_152_SERIES_NAMES, equip_name)) total.count_14_and_152_gun_series++;
        if (includes_player_equip_name(GUN_8inch_SERIES_NAMES, equip_name)) total.count_8inch_series++;
        if (includes_player_equip_name(GUN_152_SERIES_NAMES, equip_name)) total.count_152_series++;
        if (equip.type_id === 'MAIN_GUN_M') total.count_main_gun_M++;
        if (includes_player_equip_name(GUN_155_SERIES_NAMES, equip_name)) total.count_155_series++;
        if (includes_player_equip_name(ATLANTA_GUN_NAMES, equip_name)) total.count_Atlanta_gun++;
        if (equip_name === '12.7cm単装高角砲(後期型)') total.count_127_HA_gun++;
        if (equip_name === '130mm B-13連装砲') total.count_130_gun++;
        if (equip_name === 'QF 4.7inch砲 Mk.XII改') total.count_QF_XII++;
        if (includes_player_equip_name(ASDIC_SERIES_NAMES, equip_name)) total.count_ASDIC_series++;
        if (equip_name === '5inch単装砲 Mk.30') total.count_Mk30_gun++;
        if (includes_player_equip_name(Mk30_SERIES_NAMES, equip_name)) total.count_Mk30_series++;
        if (equip_name === '12.7cm単装高角砲改二') total.count_127_kai_ni++;
        return total;
    }, EQUIP_COUNT_INITIAL);

    return counts
}