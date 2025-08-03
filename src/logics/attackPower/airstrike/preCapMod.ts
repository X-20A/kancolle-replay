import { is_random_successful, RandGenerator } from "@/effects/random";
import { can_bombing, is_jet_bomber, is_skip_bomber, is_torpedo_bomber, PlaneEquip } from "@/models/equip/basic";
import { EquippedShip, includes_ship_type, is_install_type, is_submarine_category } from "@/models/ship/equipped";
import { Brand } from "@/types/brands"

type PreCapModBase = Brand<number, 'PreCapModBase'>

const calc_pre_cap_mod_base = (
    attacker_plane: PlaneEquip,
    target_ship: EquippedShip,
    phase_type: 'normal_strike' | 'jet_assault',
    rand: RandGenerator,
): PreCapModBase => {
    // ? wikiに記載なし
    // また、加算乗算でなく上書きしてるので解釈もやや異なるかも
    if (is_submarine_category(target_ship)) {
        return attacker_plane.natural_addition.asw >= 10
            ? 0.7 + rand.next() * 0.3 as PreCapModBase
            : 0.35 + rand.next() * 0.45 as PreCapModBase;
    }
    if (is_torpedo_bomber(attacker_plane)) {
        return is_random_successful(0.5, rand.next())
            ? 1.5 as PreCapModBase
            : 0.8 as PreCapModBase;
    }
    if (is_jet_bomber(attacker_plane)) {
        return phase_type === 'normal_strike'
            ? 1 as PreCapModBase
            : 0.7 as PreCapModBase;
    }
    if (can_bombing(attacker_plane)) return 1 as PreCapModBase;

    return 1 as PreCapModBase;
}

type SkipBomberMod = 0.9 | 1 | 1.3 | 1.6 | 1.75 | 1.9

const calc_skip_bomber_mod = (
    attacker_plane: PlaneEquip,
    defender_ship: EquippedShip,
): SkipBomberMod => {
    if (!is_skip_bomber(attacker_plane)) return 1;

    if (is_install_type(defender_ship)) return 0.9;

    const { type_id } = defender_ship;
    if (type_id === 'DD') return 1.9;
    if (includes_ship_type(['CL', 'CLT', 'AV'], type_id)) return 1.75;
    if (includes_ship_type(['CA', 'CAV'], type_id)) return 1.6;
    if (
        includes_ship_type(['CVL', 'FBB', 'BB', 'BBV', 'CV', 'CVB', 'AT'], type_id)
    ) return 1.3;

    return 1;
}

export type AirstrikeAttackPowerPreMod = Brand<number, 'AirstrikeAttackPowerPreMod'>

const calc_airstrike_attack_power_pre_mod = (
    base_mod: PreCapModBase,
    skip_bomber_mod: SkipBomberMod,
): AirstrikeAttackPowerPreMod => {
    return base_mod * skip_bomber_mod as AirstrikeAttackPowerPreMod;
}