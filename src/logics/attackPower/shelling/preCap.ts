import { AntiInstallMod } from "@/logics/antiInstall";
import { ShellingAttackPowerBase } from "./basePower";
import { Brand } from "@/types/brands";
import { ShellPowerFormationMod } from "@/logics/formation";
import { EngagementAttackPowerMod } from "@/logics/engagemenet";
import { DamageShellingPowerMod } from "@/logics/damage";

export type ShellingPowerPreMod = Brand<number, 'ShellingPowerPreMod'>

export function calc_pre_cap_shelling_attack_power_core(
    base_power: ShellingAttackPowerBase,
    formation_mod: ShellPowerFormationMod,
    engage_mod: EngagementAttackPowerMod,
    damage_mod: DamageShellingPowerMod,
    anti_install_mod: AntiInstallMod,
): ShellingPowerPreMod {
    return base_power
        * formation_mod
        * engage_mod
        * damage_mod
        * anti_install_mod as ShellingPowerPreMod;
}