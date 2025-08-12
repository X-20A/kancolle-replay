import { SpecialAttackAccuracyMod, SpecialAttackPowerMod } from "@/logics/SpecialAttack";

export function calc_Yamato_Duo_special_accuracy_mod(
    power_mod: SpecialAttackPowerMod,
): SpecialAttackAccuracyMod {
    // ? 暫定的に攻撃力補正をそのまま命中補正として返す
    return power_mod as unknown as SpecialAttackAccuracyMod;
}