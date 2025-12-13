import { is_jet_bomber, PlaneEquip, PlayerPlaneEquip } from "@/models/equip/basic";
import { AbyssalEquippedShip, includes_ship_type, is_battle_ship_category, is_install_type } from "@/models/ship/equipped";
import { Brand } from "@/types/brands";
import { ValidLbasCombination } from "../../target/LBAS";
import { match } from "ts-pattern";

/// 基地航空隊 基本項

export type BasePowerStatus = Brand<number, 'BasePowerStatus'>
export type BasePowerImprovement = Brand<number, 'BasePowerImprovement'>

export type RawBasePowerResult = {
    natural_status: BasePowerStatus,
    improvement_bonus: BasePowerImprovement,
}

/**
 * 攻撃力の基礎となるステータス値と改修上昇値のセットを返す    
 * ! 陸攻 vs 潜水艦のような攻撃不可な組み合わせは考慮しないので予めフィルタすること
 * @param plane 
 * @param target_ship 
 * @returns 
 */
const calc_core_base_power_set = (
    combination: ValidLbasCombination,
): RawBasePowerResult => {
    const {
        attacker_squadron,
        target_unit,
        attack_type,
    } = combination;
    const { natural_addition, improvement_addition } = attacker_squadron.equip;
    const { asw_power, aerial_bomb_power, torpedo_power } = natural_addition;
    const {
        asw_power: improve_asw,
        aerial_bomb_power: improve_bomb,
        torpedo_power: improve_torpedo,
    } = improvement_addition;

    return match(attack_type)
        .with('asw', () => (
            { natural_status: asw_power, improvement_bonus: improve_asw })
        )
        .with('bomb', () => (
            { natural_status: aerial_bomb_power, improvement_bonus: improve_bomb })
        )
        .with('torpedo', () => {
            return {
                natural_status: is_install_type(target_unit.ship)
                    // NOTE: 艦攻 かつ 対地目標である場合は 雷装 / 2(切り捨て)
                    // https://docs.google.com/spreadsheets/d/1mA8rBhMIn9DRxVIvVH5SiZOXLTumHuZtkNcAjmFsgCY/edit?gid=611010520#gid=611010520&range=A52
                    ? Math.floor(torpedo_power / 2)
                    : torpedo_power,
                improvement_bonus: improve_torpedo,
            }
        })
        .exhaustive() as RawBasePowerResult;
};

/**
 * 特定の目標に対する攻撃力加算値(Mod Sp2)を返す    
 * ? 65戦隊、20戦隊(熟練) 共に素雷装0なので加算なのか上書きなのか判別できない
 * ? ENwikiは加算、Sortie Simは上書き 暫定: 加算
 * @param plane 
 * @param target_ship 
 * @returns 
 */
const calc_mod_sp2_flat = (
    plane: PlayerPlaneEquip,
    target_ship: AbyssalEquippedShip,
): number => {
    if (
        plane.name_jp === '爆装一式戦 隼III型改(65戦隊)' &&
        target_ship.type_id === 'DD'
    ) return 25;
    if (
        plane.name_jp === '一式戦 隼III型改(熟練/20戦隊)' &&
        target_ship.type_id === 'DD'
    ) return 30;

    return 0;
}

/**
 * 特定の目標に対する攻撃力加算値(Mod Sp1)を返す
 * @param plane 
 * @param target_ship 
 * @param raw_base_power 
 * @returns 
 */
const calc_applied_mod_sp1_raw_base_power = (
    plane: PlayerPlaneEquip,
    target_ship: AbyssalEquippedShip,
    raw_base_power: number,
): number => {
    const plane_name = plane.name_jp;
    const target_ship_type = target_ship.type_id;
    
    if (
        plane_name === 'Do 217 E-5+Hs293初期型' &&
        !is_install_type(target_ship) &&
        target_ship.type_id === 'DD'
    ) return raw_base_power * 1.1;
    if (
        plane_name === 'Do 217 K-2+Fritz-X' &&
        !is_install_type(target_ship) &&
        is_battle_ship_category(target_ship.type_id)
    ) return raw_base_power * 1.5;
    if (
        plane_name === '四式重爆 飛龍+イ号一型甲 誘導弾' &&
        !is_install_type(target_ship)
    ) {
        if (
            includes_ship_type(['DD', 'CL', 'CLT', 'CA', 'CAV'], target_ship_type)
        ) return raw_base_power * 1.15;
        if ( // 深海にCVBはなし
            includes_ship_type(['CVL', 'FBB', 'BB', 'BBV', 'CV'], target_ship_type)
        ) return raw_base_power * 1.13;
    }
    if (plane_name === 'キ102乙改+イ号一型乙 誘導弾') {
        if (
            includes_ship_type(['DD', 'CL', 'CLT', 'CA', 'CAV'], target_ship_type)
        ) return raw_base_power * 1.16;
        if (
            includes_ship_type(['CVL', 'FBB', 'BB', 'BBV', 'CV'], target_ship_type)
        ) return raw_base_power * 1.14;
    }
    // NOTE: fourinoneさん曰く、これだけ加算なのは検証値に寄せるためで深い意味はないらしい
    // https://docs.google.com/spreadsheets/d/1mA8rBhMIn9DRxVIvVH5SiZOXLTumHuZtkNcAjmFsgCY/edit?pli=1&gid=717728780#gid=717728780
    if (plane_name === '四式重爆 飛龍(熟練)+イ号一型甲 誘導弾') {
        if (is_install_type(target_ship)) return raw_base_power + 2.1;
        if (
            includes_ship_type(['DD', 'CL', 'CLT', 'CA', 'CAV'], target_ship_type)
        ) return raw_base_power + 2.6;
        if (
            includes_ship_type(['CVL', 'FBB', 'BB', 'BBV', 'CV'], target_ship_type)
        ) return raw_base_power + 2.25;
    }

    return raw_base_power;
}

/**
 * 基地航空隊の基本項計算に使用する基礎能力を返す
 * 基礎能力: (Mod_Sp1 * TP|DB + ★ + Mod_Sp2)
 * @param plane 
 * @param target_ship 
 * @returns 
 */
const calc_base_power = (
    combination: ValidLbasCombination,
): number => {
    const {
        attacker_squadron,
        target_unit,
    } = combination;
    const { equip: plane } = attacker_squadron;
    const { ship: target_ship } = target_unit;

    const {
        natural_status,
        improvement_bonus,
    } = calc_core_base_power_set(combination);

    const applied_mod_sp1_raw_base_power =
        calc_applied_mod_sp1_raw_base_power(plane, target_ship, natural_status);

    const mod_sp2_flat = calc_mod_sp2_flat(plane, target_ship);

    return applied_mod_sp1_raw_base_power
        + improvement_bonus
        + mod_sp2_flat;
}

/**
 * 搭載数係数を返す
 * @param plane 
 * @returns 
 */
const calc_slot_count_coeffient = (
    plane: PlaneEquip,
): number => {
    // ? 日wikiでは深山などの大型陸攻は 1 となっているがfourinoneさん曰く、古い情報らしい 暫定: 1.8
    return is_jet_bomber(plane) 
        ? 1
        : 1.8;
}

export type LbasBasePower = Brand<number, 'LbasBasePower'>

/**
 * 基地航空隊の基本項を返す    
 * 基本項: (Mod_Sp1 * TP|DB + ★ + Mod_Sp2) * √(搭載数係数 * plane_count) + 25
 * ! 基本攻撃力に非ず
 * @param squadron 
 * @param target_ship 
 * @returns 
 */
export function calc_basic_LBAS_attack_power(
    combination: ValidLbasCombination,
): LbasBasePower {
    const { attacker_squadron } = combination;
    const {
        equip: plane,
        slot_count,
    } = attacker_squadron;

    const base_power = calc_base_power(combination);
    const slot_count_coeffient = calc_slot_count_coeffient(plane);
    const DEFAULT_BONUS_FLAT = 25;

    return base_power * Math.sqrt(slot_count_coeffient * slot_count)
        + DEFAULT_BONUS_FLAT as LbasBasePower;
}

export const __LBAS_base_power_test__ = {
    calc_core_base_power_set,
    calc_mod_sp2_flat,
    calc_applied_mod_sp1_raw_base_power,
    calc_basic_LBAS_attack_power,
} as const;