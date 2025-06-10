import { PlayerShip } from "@/models/ship/Ship";
import { calcShipTypeConstant } from "./shipTypeConstant";
import { calcAswSynergy } from "./synergy";

export function calcAswPower(ship: PlayerShip): number {
    const ship_type_constant = calcShipTypeConstant(ship);
    /** 基本攻撃力 */
    const base_attack_power =
        2 * Math.sqrt(ship.naked_status.asw)
        + 1.5 * (ship.total_valid_asw + ship.total_equip_bonus_addition.asw)
        + ship.total_equip_improvement_addition.asw_power + ship_type_constant;

    const synergy = calcAswSynergy(ship.flags.asw_equip);

    return base_attack_power * synergy;
}