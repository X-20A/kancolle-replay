import { Equip, PlayerEquip } from "@/models/equip/basic";
import { is_CLs } from "@/models/ship/equipped";
import { PlayerNakedShip } from "@/models/ship/naked/base";
import { calc_fit_mold, FitShellPowerMod } from ".";

type PreInfo = {
    class_101_count: number,
    class_102_count: number,
}

const calc_info = (
    equips: PlayerEquip[],
): PreInfo => {
    return equips.reduce((total, equip) => {
        if (equip.fit_class === 101) total.class_101_count++;
        if (equip.fit_class === 102) total.class_102_count++;

        return total;
    }, {
        class_101_count: 0,
        class_102_count: 0,
    } as PreInfo);
}

export function calc_fit_shell_power_mod(
    ship: PlayerNakedShip,
    equips: PlayerEquip[],
): FitShellPowerMod {
    if (!is_CLs(ship.type_id)) return 0 as FitShellPowerMod;

    const {
        class_101_count,
        class_102_count,
    } = calc_info(equips);

    let total = 0;
    total += calc_fit_mold(1, class_101_count);
    total += calc_fit_mold(2, class_102_count);

    return total as FitShellPowerMod;
}