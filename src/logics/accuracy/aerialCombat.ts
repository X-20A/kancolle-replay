import { Accuracy } from ".";
import { Node } from "@/models/Node";
import { FleetUnit, is_combined_fleet } from "@/models/fleet/FleetUnit";
import { EquippedShip, includes_ship_type, is_player_ship } from "@/models/ship/equipped";
import { match } from "ts-pattern";
import { PlaneEquip } from "@/models/equip/basic";
import { AirstrikeAccuracyBalloonMod } from "../balloon";

/// 命中計算系

/**
 * 彼我の艦隊種別組み合わせごとの命中基礎値(ACC_base)を返す
 * @param attacker_unit 
 * @param defender_unit 
 * @param node 
 * @returns 
 */
const calc_acc_base = (
    attacker_unit: FleetUnit,
    defender_unit: FleetUnit,
    node: Node,
): number => {
    if (!is_player_ship(attacker_unit.ship)) {
        if (node.type.is_air_raid_only) {
            return defender_unit.fleet_type === 'main'
                ? 105
                : 70;
        } else {
            return defender_unit.fleet_type === 'main'
                ? 110
                : 75;
        }
    }

    if (!is_combined_fleet(attacker_unit)) {
        return match(defender_unit.fleet_type)
            .with('single', () => 95)
            .with('main', () => 115)
            .with('escort', () => 80)
            .exhaustive();
    }

    return match(defender_unit.fleet_type)
        .with('single', () => 95)
        .with('main', () => 110)
        .with('escort', () => 80)
        .exhaustive();
}

/**
 * 跳躍爆撃系機体の目標艦種別加算値(Mod_skip_bombing)を返す
 * @param attacker_plane 
 * @param defender_ship 
 * @returns 
 */
const calc_mod_skip_bombing = (
    attacker_plane: PlaneEquip,
    defender_ship: EquippedShip,
): number => {
    if (!attacker_plane.flags.is_skip_bomber) return 0;

    const ship_type = defender_ship.type_id;
    if (ship_type === 'DD') return 13;
    // ? CTが怪しいが不明
    if (includes_ship_type(['CL', 'CL', 'CLT'], ship_type)) return 17;
    if (includes_ship_type(['CA', 'CAV'], ship_type)) return 22;
    if (includes_ship_type(['FBB', 'BB', 'BBV', 'CVL', 'CV', 'CVB'], ship_type)) return 30;

    return 0;
}

/**
 * 航空戦の命中項を返す
 * @returns 
 */
export function calc_air_combat_accuracy(
    attacker_unit: FleetUnit,
    attacker_plane: PlaneEquip,
    defender_unit: FleetUnit,
    node: Node,
    balloon_mod: AirstrikeAccuracyBalloonMod,
): Accuracy {
    const acc_base = calc_acc_base(
        attacker_unit,
        defender_unit,
        node,
    );

    const mod_skip_bombing = calc_mod_skip_bombing(
        attacker_plane,
        defender_unit.ship,
    );

    return acc_base * balloon_mod
        + mod_skip_bombing as Accuracy;
}

const __accuracy_aerial_combat_test__ = {
    calc_acc_base,
}