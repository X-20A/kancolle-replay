const calc_capped_evasion = (
    evasion: number,
): number => {
    if (evasion < 40) return evasion;
    if (evasion < 65) return Math.sqrt(40 + 3 * Math.sqrt(evasion - 40));
    return Math.floor(
        55 + 2 * Math.sqrt(evasion - 65)
    );
}

export function 