import { Equip } from "./Equip";
import { SkillTriggerEquipType } from "@/types/equip/player";
import { EQUIP_BONUS_DATAS } from "@/datas/equip/bonus";
import { NakedPlayerShip } from "../ship/NakedShip";

export type EquipBonusAddition = {
    fire_power: number,
    armor: number,
    torpedo_power: number,
    evasion: number,
    anti_air: number,
    asw: number,
    los: number,
    shell_accuracy: number,
    range: number,
    dive_bomb: number,
}

/**
 * ボーナス加算
 * @param acc 現在の合計
 * @param bonus 加算するボーナス
 * @returns 合計
 */
function addBonus(acc: EquipBonusAddition, bonus: Partial<EquipBonusAddition>): EquipBonusAddition {
    return {
        fire_power: acc.fire_power + (bonus.fire_power ?? 0),
        armor: acc.armor + (bonus.armor ?? 0),
        torpedo_power: acc.torpedo_power + (bonus.torpedo_power ?? 0),
        evasion: acc.evasion + (bonus.evasion ?? 0),
        anti_air: acc.anti_air + (bonus.anti_air ?? 0),
        asw: acc.asw + (bonus.asw ?? 0),
        los: acc.los + (bonus.los ?? 0),
        shell_accuracy: acc.shell_accuracy + (bonus.shell_accuracy ?? 0),
        range: acc.range + (bonus.range ?? 0),
        dive_bomb: acc.dive_bomb + (bonus.dive_bomb ?? 0),
    };
}

/**
 * 装備ボーナスデータからトータルのEquipBonusを計算する。
 * stack_limitやシナジー条件も考慮する。
 * @param ship 対象の艦船
 * @param equips 装備一覧
 * @returns 合計されたEquipBonus
 */
export function createEquipBonusAddition(
    ship: NakedPlayerShip,
    equips: Equip[],
): EquipBonusAddition {
    // レーダー系フラグ
    const flags = equips.reduce((acc, equip) => {
        if (equip.skill_trigger_type !== SkillTriggerEquipType.B_RADAR) return acc;
        if (equip.master_addition.los >= 5) acc.has_surface_radar = true;
        if (equip.master_addition.anti_air >= 2) acc.has_anti_air_radar = true;
        if (equip.master_addition.shell_accuracy >= 8) acc.has_high_accuracy_radar = true;
        return acc;
    }, {
        has_surface_radar: false,
        has_anti_air_radar: false,
        has_high_accuracy_radar: false,
    });

    // 合計用初期値
    const initial: EquipBonusAddition = {
        fire_power: 0,
        armor: 0,
        torpedo_power: 0,
        evasion: 0,
        anti_air: 0,
        asw: 0,
        los: 0,
        shell_accuracy: 0,
        range: 0,
        dive_bomb: 0,
    };

    // ボーナス合算処理
    const summary = EQUIP_BONUS_DATAS.reduce((total_bonus_acc, equip_bonus_data) => {
        // 対象装備を抽出
        const matched_equips = equips.filter(equip => {
            if (equip_bonus_data.types && !equip_bonus_data.types.includes(equip.type)) return false;
            if (equip_bonus_data.ids && !equip_bonus_data.ids.includes(equip.master_id)) return false;
            return true;
        });
        if (matched_equips.length === 0) return total_bonus_acc;

        // 各ボーナス条件を判定
        for (const bonus of equip_bonus_data.bonuses) {
            // 艦船条件
            if (bonus.ship_ids && !bonus.ship_ids.includes(ship.master_id)) continue;
            if (bonus.ship_base_ids && !bonus.ship_base_ids.includes(ship.master_id)) continue;
            if (bonus.ship_type_ids && !bonus.ship_type_ids.includes(ship.type)) continue;
            if (bonus.ship_class_ids && !bonus.ship_class_ids.includes(ship.ship_class)) continue;
            if (bonus.ship_country_ids && !bonus.ship_country_ids.includes(ship.country)) continue;

            // レーダー系フラグ条件
            if (bonus.requires_surface_radar && !flags.has_surface_radar) continue;
            if (bonus.requires_air_radar && !flags.has_anti_air_radar) continue;
            if (bonus.requires_high_precision_radar && !flags.has_high_accuracy_radar) continue;

            // シナジー装備条件
            if (bonus.requires_synergy_equip_id) {
                const synergy_count = equips.filter(equip => bonus.requires_synergy_equip_id!.includes(equip.master_id)).length;
                if (synergy_count < (bonus.requires_synergy_equip_count ?? 1)) continue;
            }
            if (bonus.requires_synergy_equip_type_ids) {
                const synergy_type_count = equips.filter(equip => bonus.requires_synergy_equip_type_ids!.includes(equip.type)).length;
                if (synergy_type_count < (bonus.requires_synergy_equip_count ?? 1)) continue;
            }
            if (bonus.requires_synergy_equip_improvement) {
                const synergy_improve_count = equips.filter(equip => equip.improvement_lv >= bonus.requires_synergy_equip_improvement!).length;
                if (synergy_improve_count < (bonus.requires_synergy_equip_count ?? 1)) continue;
            }
            if (bonus.required_improvement) {
                // 装備の改修値条件
                const has_required_improve = matched_equips.some(equip => (equip.improvement_lv ?? 0) >= bonus.required_improvement!);
                if (!has_required_improve) continue;
            }

            // stack_limit考慮
            const stack_limit = bonus.stack_limit ?? matched_equips.length;
            const apply_count = Math.min(matched_equips.length, stack_limit);
            for (let i = 0; i < apply_count; i++) {
                total_bonus_acc = addBonus(total_bonus_acc, bonus.bonus);
            }
        }
        return total_bonus_acc;
    }, initial);

    return summary;
}