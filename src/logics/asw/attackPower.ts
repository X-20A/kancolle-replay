import { PlayerEquippedShip } from "@/models/ship/equipped";
import { calc_ASW_synergy } from "./synergy";

/*
export function calcAswPower(ship: PlayerEquippedShip): number {
    const ship_type_constant = calc_ship_type_constant(ship);
    
    const base_attack_power =
        2 * Math.sqrt(ship.naked_status.asw)
        + 1.5 * (ship.total_contribute_asw_attack_power + ship.total_equip_bonus_addition.asw)
        + ship.total_equip_improvement_addition.asw_power + ship_type_constant;

    const synergy = calcAswSynergy(ship.flags.asw_equip);

    return base_attack_power * synergy;
}*/