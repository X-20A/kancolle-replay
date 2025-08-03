import { is_random_successful, RandGenerator } from "@/effects/random";
import { ContactMod } from "@/logics/contact";
import { EquippedShip, includes_abyssal_ship_id, is_player_equipped_ship, is_PT, is_Supply_depot } from "@/models/ship/equipped";
import { Brand } from "@/types/brands";
import { RandValue } from "@/types/brands/other";

type BossMod = 0.5 | 0.8| 0.9 | 1 | 1.2 | 1.3 | 1.4 | 1.5
    | 1.6 | 1.7 | 1.8 | 1.9 | 2 | 2.2 | 2.4

const calc_boss_mod = (
    target_ship: EquippedShip,
    rand: RandGenerator,
): BossMod => {
    if (is_player_equipped_ship(target_ship)) return 1;

    const { master_id } = target_ship;
    if (master_id === 1557) {
        return is_random_successful(0.4, rand.next())
            ? 2
            : 1.4;
    }
    if (includes_abyssal_ship_id([1586, 1620, 1781, 1782, 2105, 2106, 2107, 2108], master_id)) {
        return is_random_successful(0.4, rand.next())
            ? 2.2
            : 1.7;
    }
    if (is_PT(target_ship)) {
        return is_random_successful(0.4, rand.next())
            ? 0.8
            : 0.5;
    }
    if (is_Supply_depot(target_ship)) {
        return is_random_successful(0.5, rand.next())
            ? 2.4
            : 1.5;
    }
    if (includes_abyssal_ship_id([1665, 1666, 1667], master_id)) {
        return is_random_successful(0.4, rand.next())
            ? 1.7
            : 1.3;
    }
    if (includes_abyssal_ship_id([1696, 1697, 1698], master_id)) {
        return is_random_successful(0.4, rand.next())
            ? 1.8
            : 1.3;
    }
    if (includes_abyssal_ship_id([
        1699, 1700,1701, 1702, 1703, 1704, 2023, 2024,
        2025, 2026, 2027, 2028, 2243, 2244, 2245, 2246,
    ], master_id)) {
        return is_random_successful(0.4, rand.next())
            ? 1.4
            : 1.2;
    }
    if (includes_abyssal_ship_id([1708, 1709, 1710], master_id)) {
        return is_random_successful(0.4, rand.next())
            ? 1.3
            : 1;
    }
    if (master_id === 1751) {
        return is_random_successful(0.4, rand.next())
            ? 1.6
            : 1.3;
    }
    if (includes_abyssal_ship_id([1755, 1756, 1757, 1758, 1759, 1760], master_id)) {
        return is_random_successful(0.4, rand.next())
            ? 1.2
            : 0.9;
    }
    if (includes_abyssal_ship_id([2178, 2179, 2196, 2197], master_id)) {
        return is_random_successful(0.4, rand.next())
            ? 1.6
            : 1.4;
    }
    if (includes_abyssal_ship_id([2188, 2189, 2190, 2191], master_id)) {
        return is_random_successful(0.4, rand.next())
            ? 1.9
            : 1.5;
    } // TODO: これに含まれない深海艦について divebombWeak との帳尻合わせをする

    return 1;
}

type PTMod = 0.5 | 0.8 | 1

const calc_PT_mod = (
    target_ship: EquippedShip,
    rand_value: RandValue,
): PTMod => {
    if (!is_PT(target_ship)) return 1;

    return is_random_successful(0.5, rand_value)
        ? 0.5
        : 0.8;
}

export type AirstrikePostCapMod = Brand<number, 'AirstrikePostCapMod'>

export function calc_airstrike_post_cap_mod(
    boss_mod: BossMod,
    PT_mod: PTMod,
    contact_mod: ContactMod,
)