import { PlayerEquip } from "@/models/equip/basic";
import { is_married, PlayerNakedShip } from "@/models/ship/naked/base";
import { Brand } from "@/types/brands";
import { calc_ship_type_fit_mod } from "./preInfo";
import { calc_fit } from "./condition";

const calc_married_mod = (
    ship: PlayerNakedShip,
): number => {
    return is_married(ship)
        ? 0.6
        : 1;
}

export type FitAccuracyMod = Brand<number, 'FitAccuracyMod'>

export function calc_fit_accuracy_mod(
    ship: PlayerNakedShip,
    equips: PlayerEquip[],
): FitAccuracyMod {
    if (ship.fit_class === 'None') return 0 as FitAccuracyMod;

    const info = calc_ship_type_fit_mod(equips);
    const married_mod = calc_married_mod(ship);

    return calc_fit(info, ship, married_mod) as FitAccuracyMod;
}