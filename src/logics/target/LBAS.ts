import { Equip, is_dive_bomber, is_jet_bomber, is_land_based_bomber, is_torpedo_bomber, PlayerPlaneEquip } from "@/models/equip/basic"
import { AbyssalSingleFleet } from "@/models/fleet/Fleet"
import { LbasSquadron } from "@/models/LBAS"
import { AbyssalEquippedShip, is_install_type, is_submarine_category, is_sunk } from "@/models/ship/equipped"
import { calc_vanguard_target, protect_flagship_in_single_fleet, select_random_target } from "."
import { AbyssalFleetUnit, FleetUnit } from "@/models/fleet/FleetUnit"
import { RandGenerator } from "@/effects/random"
import { COMBINED_FLEET_FORMATION_PROTECT_RATIO_DATA, SINGLE_FLEET_FORMATION_PROTECT_RATIO_DATA } from "./data"
import { SingleFleetFormationType } from "@/types"

export type AirstrikeType =
    | 'torpedo'
    | 'bomb'
    | 'asw'

const can_LBAS_bombing = (
    equip: Equip,
): boolean => {
    return equip.flags.can_bombing;
}

/**
 * 敵艦への攻撃種別を返す    
 * ! 攻撃可能な組み合わせしか考慮しない
 * @param attacker_squadron 
 * @param target_unit 
 * @returns 
 */
const calc_LBAS_attack_type = (
    attacker_squadron: LbasSquadron,
    target_unit: AbyssalFleetUnit,
): AirstrikeType => {
    const { ship } = target_unit;
    const { equip: plane } = attacker_squadron;
    if (is_submarine_category(ship)) return 'asw';
    if (is_torpedo_bomber(plane)) return 'torpedo';
    if (can_LBAS_bombing(plane) && !is_land_based_bomber(plane)) return 'bomb';
    if (is_install_type(ship) && can_LBAS_bombing(plane)) return 'bomb';
    
    return 'torpedo';
}

/**
 * 基地航空隊に配備したときに、潜水艦を攻撃可能な機体であるか判定して返す
 * @param plane 
 * @returns 
 */
const can_LBAS_ASW_attack_plane = (
    plane: PlayerPlaneEquip,
): boolean => {
    return plane.natural_addition.asw_power >= 7;
}

/**
 * 機体が攻撃可能な目標艦を配列で返す
 * @param attacker_squadron 
 * @param target_fleet 
 * @returns 
 */
const calc_valid_squadron_targets = (
    attacker_squadron: LbasSquadron,
    target_fleet: AbyssalSingleFleet,
): AbyssalFleetUnit[] => {
    const { equip: plane } = attacker_squadron;
    const alive_units =
        target_fleet.main_fleet_units.filter(unit => !is_sunk(unit.ship));

    const alive_submarine_units =
        alive_units.filter(unit => is_submarine_category(unit.ship));

    // ? 対潜7以上なら装備種別は問わないのか分からない
    // 1艦づつ、ひとつの評価関数で振り分けられるとテストしやすそうだが、これがあるせいでそうもいかない
    if (can_LBAS_ASW_attack_plane(plane) && alive_submarine_units.length > 0) {
        return alive_submarine_units;
    }
    if (plane.type_id === 'AUTOGYRO') return [];
    if (
        plane.type_id === 'ASW_PLANE' &&
        // 爆装がある、20戦隊系や三式指揮連絡機改二は水上艦も攻撃可能
        plane.natural_addition.aerial_bomb_power === 0
    ) return [];

    return alive_units.filter(unit => !is_submarine_category(unit.ship));
}

/**
 * 基地航空隊攻撃における、中隊とターゲットの攻撃可能な組み合わせ
 */
export type ValidLbasCombination = {
    attacker_squadron: LbasSquadron,
    target_unit: AbyssalFleetUnit,
    attack_type: AirstrikeType,
}

/**
 * 基地航空隊攻撃における、中隊とターゲットの攻撃可能な組み合わせを返す    
 * 
 * @param attacker_squadron 
 */
export function derive_valid_LBAS_combination(
    attacker_squadron: LbasSquadron,
    target_fleet: AbyssalSingleFleet,
    formation: SingleFleetFormationType,
    rand: RandGenerator,
): ValidLbasCombination | 'not_applicable' {
    const valid_target_units = calc_valid_squadron_targets(attacker_squadron, target_fleet);
    if (valid_target_units.length === 0) return 'not_applicable';

    const first_target_unit = select_random_target(valid_target_units, rand.next());

    const post_vanguard_target_unit = calc_vanguard_target(
        first_target_unit,
        valid_target_units,
        formation,
        target_fleet.main_fleet_units.length,
        first_target_unit.original_index,
        rand,
    );

    const target_unit = protect_flagship_in_single_fleet(
        post_vanguard_target_unit,
        valid_target_units,
        SINGLE_FLEET_FORMATION_PROTECT_RATIO_DATA[formation],
        rand
    );

    const attack_type = calc_LBAS_attack_type(
        attacker_squadron,
        target_unit,
    );

    return {
        attacker_squadron,
        target_unit,
        attack_type,
    };
}

export const __target_LBAS_test__ = {
    calc_LBAS_attack_type,
} as const;