import { JetBomberEquip } from "@/models/equip/basic";
import { HitType } from "../accuracy";
import { Squadron } from "@/models/LBAS";
import { calc_critical_mod } from "../critical";

export function calc_jet_LBAS_attack_power(
    squadron: Squadron,
    hit_type: HitType,
): number {
    const { equip: plane } = squadron;
    const basic_attack_power =
        plane.natural_addition.aerial_bomb_power * Math.sqrt(squadron.slot_count)
        + 25;

    const critical_mod = calc_critical_mod(hit_type);

    return Math.floor(
        Math.floor(basic_attack_power) * critical_mod
    );  
}