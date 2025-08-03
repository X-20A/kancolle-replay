import { calc_capped_attack_power } from "@/logics/cap";
import { Brand } from "@/types/brands";



export type AirstrikeAttackPower = Brand<number, 'AirstrikeAttackPower'>

const calc_airstrike_attack_power_core = (
    base: number,
    pre_cap_mod: number,
    post_cap_mod: number,
): AirstrikeAttackPower => {
    const capped = calc_capped_attack_power(
        base * pre_cap_mod,
        'air_combat',
    );

    const attack_power = Math.floor(capped) * post_cap_mod;

    return attack_power as AirstrikeAttackPower;
}