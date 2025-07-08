import { JetBomberEquip, PlayerPlaneEquip } from "@/models/equip/basic";
import { EquippedShip, is_abyssal_ship, is_install_type, is_player_ship, is_PT } from "@/models/ship/equipped";
import { brandPreAccuracy, PreAccuracy, RandValue } from "@/types/brands/other";
import { calc_morale_evasion_mod } from "./morale";
import { calc_air_combat_evasion } from "./evasion";
import { AbyssalFleet, is_combined_fleet, PlayerFleet } from "@/models/fleet/Fleet";
import { is_use_barrage_balloon_node, Node } from "@/models/Node";
import { UserSettings } from "@/core/flows/SimExecuter";
import { calc_airstrike_barrage_balloon_accuracy_mod } from "./balloon";
import { Rand } from "@/effects/random";

/// 命中計算系

// ? 補正値や加算値が独自調査か暫定値か分からない

/**
 * 陸攻の目標艦種別の命中補正値を返す
 * @param unit 
 * @param target_ship 
 * @returns 
 */
const calc_LBAS_bomber_target_specific_accuracy_mod = (
    unit: PlayerPlaneEquip,
    target_ship: EquippedShip,
): number => {
    const target_ship_id = target_ship.master_id;

    if ([1557, 1586].includes(target_ship_id)) { // 戦艦棲姫 | 空母棲姫
        return 1.1;
    }
    if (is_abyssal_ship(target_ship) && target_ship.flags.is_Summer_BB) {
        return 1.1;
    }
    if ([1665, 1666, 1667].includes(target_ship_id)) { // 砲台小鬼系
        return 1.06;
    }
    if ([2178, 2179, 2196, 2197].includes(target_ship_id)) { // トーチカ系
        return 1.06;
    }
    if ([2180, 2181].includes(target_ship_id)) { // 対空小鬼系
        return 1.15;
    }
    if (is_PT(target_ship)) {
        if (unit.master_id === 459) { // B-25
            // ? B-25が他の機体より対PT命中が低いという資料は見当たらない Sortie Simより
            return 0.85;
        }

        return 0.95;
    }

    return 1;
}

/**
 * 陸攻の目標艦種別の命中加算値を返す
 * @param unit 
 * @param target_ship 
 * @returns 
 */
const calc_LBAS_bomber_target_specific_accuracy_flat = (
    unit: PlayerPlaneEquip,
    target_ship: EquippedShip,
): number => {
    const equip_id = unit.master_id;
    const ship_type = target_ship.type_id;

    if (equip_id === 453) { // キ102乙
        if (ship_type === 'DD') return 0.07;
    }
    if (equip_id === 454) { // キ102乙改+イ号一型乙 誘導弾
        if (ship_type === 'DD') return -0.17;
        if (['CL', 'CLT'].includes(ship_type)) return 0.07;
        if (['CA', 'CAV', 'CVL', 'FBB', 'BB', 'BBV', 'CV'].includes(ship_type)) return 0.05;
    }
    if (equip_id === 444) { // 四式重爆 飛龍+イ号一型甲 誘導弾
        if (ship_type === 'DD') return -0.07;
        if (['CL', 'CLT', 'CVL', 'FBB', 'BB', 'BBV', 'CV'].includes(ship_type)) return 0.07;
    }
    if (equip_id === 484) { // 四式重爆 飛龍(熟練)+イ号一型甲 誘導弾
        if (ship_type === 'DD') return -0.05;
        if (['CL', 'CLT', 'CA', 'CAV', 'CVL', 'FBB', 'BB', 'BBV', 'CV'].includes(ship_type)) return 0.05;
    }
    if (unit.flags.is_skip_bomber) { // B-25 & 深海の反跳爆撃系機体
        if (is_install_type(target_ship)) return -0.09
        if (['FBB', 'BB', 'BBV', 'CVL', 'CV', 'AT'].includes(ship_type)) return 0.31;
        if (['CA', 'CAV'].includes(ship_type)) return 0.22;
        if (['CL', 'CLT', 'AV'].includes(ship_type)) return 0.18;
        if (['DD'].includes(ship_type) && !is_PT(target_ship)) return 0.13;
    }

    return 0;
}

/**
 * 航空戦の命中項を返す
 * @returns 
 */
export function calc_air_combat_pre_accuracy(): number {
    const ACCURACY_CONSTANT = 0.95;
    return ACCURACY_CONSTANT as PreAccuracy;
}

/**
 * 基地航空隊の命中項を返す
 * @param unit 
 * @param enemy_fleet 
 * @param target_ship 
 * @returns 
 */
export function calc_lbas_pre_accuracy(
    unit: PlayerPlaneEquip,
    player_fleet: PlayerFleet,
    enemy_fleet: AbyssalFleet,
    target_ship: EquippedShip,
    node: Node,
    settings: UserSettings,
): PreAccuracy {
    /**
     * 命中定数    
     * ? ソース不統一    
     * ? 日wiki: 0.95, ENwiki & Sortie Sim: 0.9
     */
    const ACCURACY_CONSTANT = 0.9;

    const target_specific_accuracy_mod =
        calc_LBAS_bomber_target_specific_accuracy_mod(unit, target_ship);
    const target_specific_accuracy_flat =
        calc_LBAS_bomber_target_specific_accuracy_flat(unit, target_ship);

    const barrage_balloon_mod = is_use_barrage_balloon_node(node, settings)
        ? calc_airstrike_barrage_balloon_accuracy_mod(player_fleet, enemy_fleet, settings)
        : 1;
    
    const combined_fleet_mod = is_combined_fleet(enemy_fleet) ? 1.1 : 0;

    // NOTE: 機体の疲労度補正は見送り
    // NOTE: 熟練度補正は関係無し
    const pre_accuracy = (
        ACCURACY_CONSTANT
        + 0.07 * unit.natural_addition.shell_accuracy * target_specific_accuracy_mod
        + target_specific_accuracy_flat
    ) * barrage_balloon_mod * combined_fleet_mod;

    return brandPreAccuracy(pre_accuracy);
}

/**
 * 基地噴式強襲の最終命中率を返す
 * @param air_combat_pre_accuracy 
 * @param air_combat_evasion 
 * @param target_ship 
 */
export function calc_final_jet_assault_accuracy(
    unit: JetBomberEquip,
    player_fleet: PlayerFleet,
    enemy_fleet: AbyssalFleet,
    target_ship: EquippedShip,
    node: Node,
    settings: UserSettings,
): number {
    // ? どのタイプの命中項を使用するか不明 暫定: 基地命中項
    const pre_accuracy = calc_lbas_pre_accuracy(
        unit,
        player_fleet,
        enemy_fleet,
        target_ship,
        node,
        settings,
    );
    const evasion = calc_air_combat_evasion(target_ship);

    return Math.min(96,
        Math.max(10,
            (pre_accuracy - evasion)
        * (is_player_ship(target_ship) ? calc_morale_evasion_mod(target_ship) : 0)
        )); // 航空機熟練度ボーナスは無し
}

type HitType = 
    | 'Critical'
    | 'Hit'
    | 'Miss'

export function calc_hit_type(
    critical_rate: number,
    hit_rate: number,
    rand_value: RandValue,
): HitType {
    if (rand_value <= critical_rate) return 'Critical';
    if (rand_value <= hit_rate) return 'Hit';
    return 'Miss';
}