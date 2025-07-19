import { JetSquadron } from "@/models/LBAS";
import { calc_final_jet_assault_accuracy, calc_hit_type } from "../accuracy/aerialCombat";
import { RandGenerator } from "@/effects/random";
import { EquippedShip, is_player_ship, PlayerEquippedShip } from "@/models/ship/equipped";
import { calc_defence } from "../defense";
import { AbyssalFleet, Fleet, is_combined_fleet, PlayerFleet } from "@/models/fleet/Fleet";
import { produce } from "immer";
import { AbyssalFleetUnit, FleetUnit } from "@/models/fleet/FleetUnit";
import { calc_jet_lbas_critical_rate } from "../critical";
import { Node } from "@/models/Node";
import { UserSettings } from "@/core/flows/SimExecuter";
import { calc_jet_LBAS_assault_attack_power } from "../attackPower/LBAS/postCap";
import { RandValue } from "@/types/brands/other";

const calc_base_damage = (
    attack_power: number,
    defence: number,
): number => {
    return attack_power - defence;
}

/**
 * 基地航空隊によるダメージを返す
 * @param attack_power 
 * @param defence 
 * @returns 
 */
const calc_LBAS_attack_damage = (
    attack_power: number,
    defence: number,
): number => {
    return Math.floor(calc_base_damage(attack_power, defence));
}

/**
 * 残弾薬補正を返す
 * @param ammo_remain 
 * @returns 
 */
const calc_ammo_damage_mod = (
    ammo_remain: number,
): number => {
    if (ammo_remain >= 0.5) return 1;
    if (ammo_remain >= 0.4) return 0.8;
    if (ammo_remain >= 0.3) return 0.6;
    if (ammo_remain >= 0.2) return 0.4;
    if (ammo_remain >= 0.1) return 0.2;
    return 0;
}

/**
 * 艦攻撃によるダメージを返す
 * @param attack_power 
 * @param defence 
 * @param attacker_ship 
 * @returns 
 */
const calc_ship_attack_damage = (
    attack_power: number,
    defence: number,
    attacker_ship: PlayerEquippedShip,
): number => {
    const base_damage = calc_base_damage(attack_power, defence);
    return is_player_ship(attacker_ship)
        ? Math.floor(base_damage * calc_ammo_damage_mod(attacker_ship.state.ammo_remain_ratio))
        : Math.floor(base_damage);
}

/**
 * 割合ダメージ(カスダメ)を返す
 * @param target_ship 
 * @param rand 
 * @returns 
 */
const calc_scrach_damage = (
    target_ship: EquippedShip,
    rand_value: RandValue,
): number => {
    const hp_remain = target_ship.state.hp_remain;
    return Math.floor(
        hp_remain * 0.06
            + Math.floor(Math.floor(hp_remain) * rand_value) * 0.08
    )
}

/**
 * 基地噴式強襲後の艦隊を返す    
 * S & C
 * @param attacker_squadron 
 * @param enemy_fleet 
 * @param target_unit 
 * @param rand 
 * @returns 
 */
export function calc_jet_LBAS_assault_damage(
    attacker_squadron: JetSquadron,
    enemy_fleet: AbyssalFleet,
    target_unit: AbyssalFleetUnit,
    node: Node,
    settings: UserSettings,
    rand: RandGenerator,
): number {
    const final_jet_assault_accuracy = calc_final_jet_assault_accuracy(
        attacker_squadron.equip,
        enemy_fleet,
        target_unit.ship,
        node,
        settings,
    );

    const critical_rate = calc_jet_lbas_critical_rate(final_jet_assault_accuracy);

    const hit_type = calc_hit_type(critical_rate, final_jet_assault_accuracy, rand.next());

    if (hit_type === 'Miss') return 0; // 特殊攻撃、カットインではないので回避されればカスダメも無し

    const attack_power = calc_jet_LBAS_assault_attack_power(
        attacker_squadron,
        target_unit.ship,
        hit_type,
        rand.next(),
    );
    // ? 基地噴式にキャップ処理があるのか不明 暫定: キャップなし
    // ? 徹甲弾補正のあるターゲットはこちらが徹甲弾を持っていなくてもfloor処理だけは発生するが、基地噴式でも同様であるかは不明 暫定: floorなし
    // ? 阻塞気球補正が基地噴式でも有効であるか不明 暫定: 補正あり
    // TODO: 海域特効付与

    const defence = calc_defence(target_unit.ship, rand.next());
    const damage = calc_LBAS_attack_damage(attack_power, defence);

    return damage >= 1
        ? damage
        : calc_scrach_damage(target_unit.ship, rand.next());
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