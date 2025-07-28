import { Accuracy } from ".";
import { Node } from "@/models/Node";
import { FleetUnit, is_combined_fleet } from "@/models/fleet/FleetUnit";
import { EquippedShip, includes_ship_type, is_player_equipped_ship } from "@/models/ship/equipped";
import { match } from "ts-pattern";
import { PlaneEquip } from "@/models/equip/basic";
import { AirstrikeAccuracyBalloonMod } from "../balloon";
import { Brand } from "@/types/brands";
import { AirStrikeAccuracySmokeMod } from "../smokeScreen";

/// 命中計算系

type AccBase = Brand<number, 'AccBase'>

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
): AccBase => {
    if (!is_player_equipped_ship(attacker_unit.ship)) {
        if (node.type.is_air_raid_only) {
            return defender_unit.fleet_type === 'main'
                ? 105 as AccBase
                : 70 as AccBase;
        } else {
            return defender_unit.fleet_type === 'main'
                ? 110 as AccBase
                : 75 as AccBase;
        }
    }

    if (!is_combined_fleet(attacker_unit)) {
        return match(defender_unit.fleet_type)
            .with('single', () => 95)
            .with('main', () => 115)
            .with('escort', () => 80)
            .exhaustive() as AccBase;
    }

    return match(defender_unit.fleet_type)
        .with('single', () => 95)
        .with('main', () => 110)
        .with('escort', () => 80)
        .exhaustive() as AccBase;
}

type SkipBombingMod = Brand<number, 'SkipBombingMod'>

/**
 * 跳躍爆撃系機体の目標艦種別加算値(Mod_skip_bombing)を返す
 * @param attacker_plane 
 * @param defender_ship 
 * @returns 
 */
const calc_skip_bombing_mod = (
    attacker_plane: PlaneEquip,
    defender_ship: EquippedShip,
): SkipBombingMod => {
    if (!attacker_plane.flags.is_skip_bomber) return 0 as SkipBombingMod;

    const ship_type = defender_ship.type_id;
    if (ship_type === 'DD') return 13 as SkipBombingMod;
    // ? CTが怪しいが不明
    if (includes_ship_type(['CL', 'CL', 'CLT'], ship_type)) return 17 as SkipBombingMod;
    if (includes_ship_type(['CA', 'CAV'], ship_type)) return 22 as SkipBombingMod;
    if (includes_ship_type(['FBB', 'BB', 'BBV', 'CVL', 'CV', 'CVB'], ship_type)) return 30 as SkipBombingMod;

    return 0 as SkipBombingMod;
}

/**
 * 航空戦の命中項を返す(コア)
 * @returns 
 */
const calc_air_combat_accuracy_core = (
    acc_base: AccBase,
    skip_bombing_mod: SkipBombingMod,
    smoke_mod: AirStrikeAccuracySmokeMod,
    balloon_mod: AirstrikeAccuracyBalloonMod,
): Accuracy => {
    return acc_base * smoke_mod * balloon_mod
        + skip_bombing_mod as Accuracy;
}

/**
 * 航空戦の命中項を返す(ファサード)
 * @returns 
 */
export function calc_air_combat_accuracy(
    attacker_unit: FleetUnit,
    attacker_plane: PlaneEquip,
    defender_unit: FleetUnit,
    node: Node,
    smoke_mod: AirStrikeAccuracySmokeMod,
    balloon_mod: AirstrikeAccuracyBalloonMod,
): Accuracy {
    const acc_base = calc_acc_base(
        attacker_unit,
        defender_unit,
        node,
    );

    const skip_bombing_mod = calc_skip_bombing_mod(
        attacker_plane,
        defender_unit.ship,
    );

    return calc_air_combat_accuracy_core(
        acc_base,
        skip_bombing_mod,
        smoke_mod,
        balloon_mod,
    );
}

export const __accuracy_aerial_combat_test__ = {
    calc_acc_base,
}