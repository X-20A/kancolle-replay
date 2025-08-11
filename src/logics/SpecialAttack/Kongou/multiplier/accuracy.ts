import { SpecialAttackAccuracyMod } from "../..";

const ACCURACY_MULTIPLIER = 1.4 as SpecialAttackAccuracyMod;

export function calc_Kongou_special_accuracy_mod(): SpecialAttackAccuracyMod {
    return ACCURACY_MULTIPLIER;
}