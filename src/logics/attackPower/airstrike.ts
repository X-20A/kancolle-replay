import { calc_equip_improvement_addition, PlaneEquip } from "@/models/equip/basic";
import { VaidAirstrikeCombination } from "../target/airstrike";
import { match } from "ts-pattern";
import { is_install_type } from "@/models/ship/equipped";
import { RawBasePowerResult } from "./LBAS/basePower";

const calc_base = (
    combination: VaidAirstrikeCombination,
): RawBasePowerResult => {
const {
        attacker_squadron,
        target_unit,
        attack_type,
    } = combination;
    const { equip } = attacker_squadron;
    const { natural_addition } = equip;
    const { asw, aerial_bomb_power, aerial_torpedo_power } = natural_addition;
    const improve_asw = calc_equip_improvement_addition(equip, 'asw_power');
    const improve_bomb = calc_equip_improvement_addition(equip, 'aerial_bomb_power');
    const improve_torpedo = calc_equip_improvement_addition(equip, 'aerial_torpedo_power');

    return match(attack_type)
        .with('asw', () => ({ natural_status: asw, improvement_bonus: improve_asw }))
        .with('bomb', () => ({ natural_status: aerial_bomb_power, improvement_bonus: improve_bomb }))
        .with('torpedo', () => {
            return {
                natural_status: is_install_type(target_unit.ship)
                    ? 0
                    : aerial_torpedo_power,
                improvement_bonus: improve_torpedo,
            }
        })
        .exhaustive();
}