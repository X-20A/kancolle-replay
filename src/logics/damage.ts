import { JetSquadron } from "@/models/LBAS";
import { calc_final_jet_assault_accuracy, calc_hit_type } from "./accuracy";
import { Rand } from "@/effects/random";
import { EquippedShip } from "@/models/ship/equipped";
import { calc_defence } from "./defense";
import { AbyssalFleet, Fleet, is_combined_fleet, PlayerFleet } from "@/models/fleet/Fleet";
import { produce } from "immer";
import { FleetUnit } from "@/models/fleet/FleetUnit";
import { calc_jet_lbas_critical_rate, calc_post_critical_mod_jet_LBAS_attack_power } from "./critical";
import { Node } from "@/models/Node";
import { UserSettings } from "@/core/flows/SimExecuter";
import { calc_basic_LBAS_attack_power } from "./LBAS/basicAttackPower";

/**
 * 割合ダメージ(カスダメ)を返す
 * @param target_ship 
 * @param rand 
 * @returns 
 */
const calc_scrach_damage = (
    target_ship: EquippedShip,
    rand: Rand,
): number => {
    return Math.floor(
        target_ship.state.hp_remain * 0.06
            + Math.floor(Math.floor(target_ship.state.hp_remain) * rand.next()) * 0.08
    )
}

/**
 * 噴式強襲後の艦隊を返す    
 * S & C
 * @param squadron 
 * @param enemy_fleet 
 * @param target_ship 
 * @param rand 
 * @returns 
 */
export function calc_jet_assault_damage(
    squadron: JetSquadron,
    player_fleet: PlayerFleet,
    enemy_fleet: AbyssalFleet,
    target_ship: EquippedShip,
    node: Node,
    settings: UserSettings,
    rand: Rand,
): number {
    const final_jet_assault_accuracy = calc_final_jet_assault_accuracy(
        squadron.plane,
        player_fleet,
        enemy_fleet,
        target_ship,
        node,
        settings,
    );

    const critical_rate = calc_jet_lbas_critical_rate(final_jet_assault_accuracy);

    const hit_type = calc_hit_type(critical_rate, final_jet_assault_accuracy, rand.next());

    if (hit_type === 'Miss') return 0; // 特殊攻撃、カットインではないので回避されればカスダメも無し

    const basic_attack_power = calc_basic_LBAS_attack_power(squadron);
    // ? 基地噴式にキャップ処理があるのか不明 暫定: キャップなし
    // ? 徹甲弾補正のあるターゲットはこちらが徹甲弾を持っていなくてもfloor処理だけは発生するが、基地噴式でも同様であるかは不明 暫定: floorなし
    // ? 阻塞気球補正が基地噴式でも有効であるか不明 暫定: 補正あり
    // TODO: 海域特効付与
    // TODO: 対地上型補正
    // TODO: 対PT補正
    const post_critical_attack_power = calc_post_critical_mod_jet_LBAS_attack_power(
        basic_attack_power,
        hit_type,
    );

    const defence = calc_defence(target_ship, rand);
    const damage = Math.floor((post_critical_attack_power - defence) * 1);
    if (damage >= 1) return damage;

    return calc_scrach_damage(target_ship, rand);
}

/**
 * 艦隊の任意の艦にダメージを適用して返す(不変)    
 * S & C
 * @param current_fleet 
 * @param original_index 
 * @param damage 
 * @returns 
 */
export function calc_appllied_damage_fleet<T extends Fleet>(
    fleet: T,
    fleet_unit: FleetUnit,
    damage: number
): T {
    return produce(fleet, (draft) => {
        if (!is_combined_fleet(draft) || fleet_unit.fleet_type !== 'escort') {
            const unit = draft.main_fleet_units[fleet_unit.original_index];
            unit.ship.state.hp_remain = Math.max(0, unit.ship.state.hp_remain - damage);
            return;
        }

        const unit = draft.escort_fleet_units[fleet_unit.original_index];
        unit.ship.state.hp_remain = Math.max(0, unit.ship.state.hp_remain - damage);
    });
}