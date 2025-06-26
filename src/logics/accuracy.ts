import { PlayerPlaneEquip } from "@/models/equip/basic";
import { EquippedShip, is_player_ship } from "@/models/ship/equipped";
import { EnemyFleet } from "@/types/brands/fleet";
import { PreAccuracy } from "@/types/brands/other";
import { calc_morale_evasion_mod } from "./morale";
import { calc_air_combat_evasion } from "./evasion";
import { calc_plane_proficiency_accuracy_flat } from "./proficiency";

/**
 * 陸攻の目標艦種別の命中加算値を返す
 * @param unit 
 * @param target_ship 
 * @returns 
 */
const calc_bomber_accuracy_flat = (
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
        if (!is_player_ship(target_ship) && target_ship.install_type !== 'No') return -0.09
        if (['FBB', 'BB', 'BBV', 'CVL', 'CV', 'AT'].includes(ship_type)) return 0.31;
        if (['CA', 'CAV'].includes(ship_type)) return 0.22;
        if (['CL', 'CLT', 'AV'].includes(ship_type)) return 0.18;
        if (['DD'].includes(ship_type) && (!is_player_ship(target_ship) && !target_ship.flags.is_PT)) return 0.13;
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
    enemy_fleet: EnemyFleet,
    target_ship: EquippedShip,
): PreAccuracy {
    const ACCURACY_CONSTANT = 0.95;
    const combined_fleet_mod = enemy_fleet.is_combined ? 1.1 : 0;

    // NOTE: 機体の疲労度補正は見送り
    // NOTE: 基地噴式強襲では熟練度補正は無し
    return (
        ACCURACY_CONSTANT
        + 7 * unit.natural_addition.shell_accuracy
        + calc_bomber_accuracy_flat(unit, target_ship)
    ) * combined_fleet_mod as PreAccuracy;
}

/**
 * 噴式強襲の最終命中率を返す
 * @param air_combat_pre_accuracy 
 * @param air_combat_evasion 
 * @param target_ship 
 */
export function calc_final_jet_assault_accuracy(
    unit: PlayerPlaneEquip,
    unit_proficiency: number,
    enemy_fleet: EnemyFleet,
    target_ship: EquippedShip,
): number {
    const pre_accuracy = calc_lbas_pre_accuracy(unit, enemy_fleet, target_ship);
    const evasion = calc_air_combat_evasion(target_ship);

    return Math.min(96,
        Math.max(10,
            (pre_accuracy - evasion)
        * (is_player_ship(target_ship) ? calc_morale_evasion_mod(target_ship) : 0)
        )) + calc_plane_proficiency_accuracy_flat(unit_proficiency);
}