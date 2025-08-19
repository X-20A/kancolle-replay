import { Brand } from "@/types/brands";
import { ShellPowerFormationMod } from "@/logics/formation";
import { EngagementAttackPowerMod } from "@/logics/engagemenet";
import { DamageShellingPowerMod } from "@/logics/damage";
import { AppliedAntiInstallBase } from "./antiInstall";

export type ShellingPowerPreMod = Brand<number, 'ShellingPowerPreMod'>

const calc_pre_cap_shelling_attack_power_core = (
    applied_anti_install_base: AppliedAntiInstallBase,
    formation_mod: ShellPowerFormationMod,
    engage_mod: EngagementAttackPowerMod,
    damage_mod: DamageShellingPowerMod,
): ShellingPowerPreMod => {
    return applied_anti_install_base
        * formation_mod
        * engage_mod
        * damage_mod as ShellingPowerPreMod;
}