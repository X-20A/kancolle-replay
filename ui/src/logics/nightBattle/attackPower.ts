import { EquippedPlayerShip } from "@/models/ship/equipped/base";

export const enum NightScountAdditionType {
    model_5 = 1,
    model_7 = 2,
    model_9 = 3,
}

export type NightBattlePowers = {
    [NightScountAdditionType.model_5]: number,
    [NightScountAdditionType.model_7]: number,
    [NightScountAdditionType.model_9]: number,
}

export function calcNightBattlePower(ship: EquippedPlayerShip): NightBattlePowers {
    const base_power =
        ship.naked_status.fire_power
        + ship.total_natural_equip_addition.fire_power
        + ship.total_equip_bonus_addition.fire_power
        + ship.naked_status.torpedo_power
        + ship.total_natural_equip_addition.torpedo_power
        + ship.total_equip_bonus_addition.torpedo_power
        + ship.total_equip_improvement_addition.night_battle_power;

    return {
        [NightScountAdditionType.model_5]: base_power + 5,
        [NightScountAdditionType.model_7]: base_power + 7,
        [NightScountAdditionType.model_9]: base_power + 9,
    }
}