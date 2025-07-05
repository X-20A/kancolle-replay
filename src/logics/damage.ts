import { JetSquadron } from "@/models/LBAS";
import { calc_final_jet_assault_accuracy } from "./accuracy";
import { calc_basic_jet_assault_attack_power } from "./aerialCombat/jetAssault";
import { Rand } from "@/effects/random";
import { EquippedShip } from "@/models/ship/equipped";
import { calc_defence } from "./defense";
import { AbyssalSingleFleet, Fleet } from "@/models/fleet/Fleet";
import { produce } from "immer";

const calc_scrach_damage = (
    target_ship: EquippedShip,
    rand: Rand,
): number => {
    return Math.floor(
        target_ship.state.hp_remain * 0.06
            + Math.floor(Math.floor(target_ship.state.hp_remain) * rand.next()) * 0.08
    )
}

export function calc_jet_assault_damage(
    squadron: JetSquadron,
    enemy_fleet: AbyssalSingleFleet,
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

export function calc_appllied_damage_fleet<T extends Fleet>(
    current_fleet: T,
    original_index: number,
    damage: number
): T {
    return produce(current_fleet, (draft) => {
        const new_hp_remain = Math.max(
            0,
            draft.main_fleet_units[original_index].ship.state.hp_remain - damage
        );

        draft.main_fleet_units[original_index].ship.state.hp_remain = new_hp_remain;
    });
}