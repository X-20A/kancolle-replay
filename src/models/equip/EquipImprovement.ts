import { ADD_STATUS_KEYS, EQUIP_IMPLOVEMENT_DATAS, EquipImprovementType } from "@/datas/equip/improvement";
import { INITIAL_STATUS_COMPONENT, TStatusComponent } from "@/types";
import { Equip, is_player_equip } from "./basic";

export function derive_equip_improvement_addition(
    improvement_type: EquipImprovementType,
    improvement_lv: number,
): TStatusComponent {
    const improvement_data = EQUIP_IMPLOVEMENT_DATAS[improvement_type];

    return ADD_STATUS_KEYS.reduce((total, key) => {
        const config = improvement_data[key];
        if (!config) return total;

        const value =
            config.coeffient * (config.is_sqrt ? Math.sqrt(improvement_lv) : improvement_lv)

        return {
            ...total,
            [key]: value,
        };
    }, INITIAL_STATUS_COMPONENT);
}

export function calc_equip_improvement_addition(
    equip: Equip,
    key: keyof TStatusComponent,
): number {
    return is_player_equip(equip)
        ? equip.improvement_addition[key]
        : 0;
}