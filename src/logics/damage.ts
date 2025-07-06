import { JetSquadron } from "@/models/LBAS";
import { calc_final_jet_assault_accuracy } from "./accuracy";
import { calc_basic_jet_assault_attack_power } from "./aerialCombat/jetAssault";
import { Rand } from "@/effects/random";
import { EquippedShip } from "@/models/ship/equipped";
import { calc_defence } from "./defense";
import { AbyssalFleet, Fleet, is_combined_fleet } from "@/models/fleet/Fleet";
import { produce } from "immer";
import { FleetUnit } from "@/models/fleet/FleetUnit";

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
    enemy_fleet: AbyssalFleet,
    target_ship: EquippedShip,
    rand: Rand,
): number {
    const final_jet_assault_accuracy = calc_final_jet_assault_accuracy(
        squadron.plane,
        squadron.proficiency,
        enemy_fleet,
        target_ship
    );

    const is_hit = rand.next() < final_jet_assault_accuracy;

    if (!is_hit) return 0; // 特殊攻撃、カットインではないので回避されればカスダメも無し

    const basic_attack_power = calc_basic_jet_assault_attack_power(squadron);
    const defence = calc_defence(target_ship, rand);
    const damage = Math.floor((basic_attack_power - defence) * 1);
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