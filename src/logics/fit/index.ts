import { PlayerEquip } from "@/models/equip/basic";
import { is_married, PlayerNakedShip } from "@/models/ship/naked";
import { Brand } from "@/types/brands";
import { calc_ship_type_fit_mod, FitPreInfo } from "./accuracy/preInfo";
import { calc_fit } from "./accuracy/condition";
import { calc_fit_shell_power_mod } from "./shellPower";

const calc_married_mod = (
    ship: PlayerNakedShip,
): number => {
    return is_married(ship)
        ? 0.6
        : 1;
}

export function calc_fit_mold(
    coeffinent_constant: number,
    count: number,
    married_mod: number = 1,
): number {
    return coeffinent_constant * Math.sqrt(count) * married_mod;
}

export type FitAccuracyMod = Brand<number, 'FitAccuracyMod'>

const calc_fit_accuracy_mod = (
    ship: PlayerNakedShip,
    info: FitPreInfo,
): FitAccuracyMod => {
    if (ship.fit_class === 'None') return 0 as FitAccuracyMod;

    const married_mod = calc_married_mod(ship);

    return calc_fit(info, ship, married_mod) as FitAccuracyMod;
}

export type FitShellPowerMod = Brand<number, 'FitShellPowerMod'>

export function calc_fit_mod_set(
    ship: PlayerNakedShip,
    equips: PlayerEquip[],
): {
    fit_accuracy_mod: FitAccuracyMod,
    fit_shell_power_mod: FitShellPowerMod,
} {
    const info = calc_ship_type_fit_mod(equips);

    const fit_accuracy_mod = calc_fit_accuracy_mod(
        ship,
        info,
    );

    const fit_shell_power_mod = calc_fit_shell_power_mod(
        ship,
        equips,
    );

    return {
        fit_accuracy_mod,
        fit_shell_power_mod,
    };
}