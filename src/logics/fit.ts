import { Equip } from "@/models/equip/basic";
import { NakedShip } from "@/models/ship/naked/base";
import { Brand } from "@/types/brands";

export type FitAccuracyMod = Brand<number, 'FitAccuracyMod'>

export function calc_fit_accuracy_mod(
    ship: NakedShip,
    equips: Equip[],
): FitAccuracyMod {
    
}