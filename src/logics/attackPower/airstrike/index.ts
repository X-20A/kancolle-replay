import { is_random_successful } from "@/effects/random";
import { calc_capped_attack_power } from "@/logics/cap";
import { EquippedShip, is_PT } from "@/models/ship/equipped";
import { Brand } from "@/types/brands";
import { RandValue } from "@/types/brands/other";

type FinalPTMod = 0.5 | 0.8 | 1

const calc_final_PT_mod = (
    target_ship: EquippedShip,
    rand_value: RandValue,
): FinalPTMod => {
    if (!is_PT(target_ship)) return 1;

    return is_random_successful(0.5, rand_value)
        ? 0.5
        : 0.8;
}

export type AirstrikeAttackPower = Brand<number, 'AirstrikeAttackPower'>

const calc_airstrike_attack_power_core = (
    base: number,
    pre_mod: number,
    post_mod: number,
    final_PT_mod: number,
): AirstrikeAttackPower => {
    const first_capped = calc_capped_attack_power(
        base * pre_mod,
        'air_combat',
    );

    const second_capped = calc_capped_attack_power(
        Math.floor(first_capped) * post_mod,
        'air_combat',
    );

    const attack_power = Math.floor(second_capped)
        * final_PT_mod;

    return attack_power as AirstrikeAttackPower;
}