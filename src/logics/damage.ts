import { JetOnlySquadron } from "@/models/LBAS";
import { calc_final_jet_assault_accuracy } from "./accuracy";
import { calc_basic_jet_assault_attack_power } from "./aerialCombat/jetAssault";
import { Rand } from "@/effects/random";
import { EnemySingleFleet } from "@/types/brands/fleet";
import { EquippedShip } from "@/models/ship/equipped";
import { calc_defence } from "./defense";

const calc_scrach_damage = (
    target_ship: EquippedShip,
    rand: Rand,
): number => {
    return Math.floor(
        target_ship.hp_remain * 0.06
            + Math.floor(Math.floor(target_ship.hp_remain) * rand.next()) * 0.08
    )
}

export function calc_jet_assault_damage(
    squadron: JetOnlySquadron,
    enemy_fleet: EnemySingleFleet,
    target_ship: EquippedShip,
    rand: Rand,
): number {
    const final_jet_assault_accuracy = calc_final_jet_assault_accuracy(
        squadron.unit,
        squadron.original_lbas_average_proficiency,
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