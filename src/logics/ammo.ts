export function ammo_damage_mod(
    ammo_remain: number,
): number {
    if (ammo_remain >= 0.5) return 1;
    if (ammo_remain >= 0.4) return 0.8;
    if (ammo_remain >= 0.3) return 0.6;
    if (ammo_remain >= 0.2) return 0.4;
    if (ammo_remain >= 0.1) return 0.2;
    return 0;
}