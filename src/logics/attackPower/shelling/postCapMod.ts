import { AirSuperiorityStrikeShellPowerMod } from "@/logics/airSuperIorityStrike";
import { ArmorPiercingAttackPowerMod } from "@/logics/armorPiercing";
import { ShellPowerBalloonMod } from "@/logics/balloon";
import { ContactMod } from "@/logics/contact";
import { SpecialAttackPowerMod } from "@/logics/SpecialAttack";

const calc_pre_cap_shelling_attack_power_core = (
    /** ENwikiにおける Mod_Spotting と Mod_CVCI を含める */
    air_superiority_strike_mod: AirSuperiorityStrikeShellPowerMod,
    contact_mod: ContactMod,
    special_attack_mod: SpecialAttackPowerMod,
    balloon_mod: ShellPowerBalloonMod,
    AP_mod: ArmorPiercingAttackPowerMod,
): number => {
    
}