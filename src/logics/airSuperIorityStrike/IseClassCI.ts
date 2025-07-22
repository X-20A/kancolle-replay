import { EquippedShip, is_player_ship } from "@/models/ship/equipped";
import { AirSuperiorityStrikeType } from ".";

/// 海空立体攻撃 | 瑞雲立体攻撃

export function calc_Ise_class_CI_types (
    attacker_ship: EquippedShip,
    main_gun_count: number,
): AirSuperiorityStrikeType[] {
    const triggerables: AirSuperiorityStrikeType[] = [];
    if (
        !is_player_ship(attacker_ship) ||
        !attacker_ship.flags.has_potential_zuiun_CI ||
        main_gun_count === 0
    ) return triggerables;

    const { equip_slots } = attacker_ship;
    const {
        zuiun_count,
        suisei_count,
    } = equip_slots.reduce((total, slot) => {
        const { equip } = slot;
        if (!equip || slot.slot_count === 0) return total;

        // ? 両方を満たした場合多重判定になるか? 暫定: 多重判定可
        if (
            equip.type_id === 'SEAPLANE_BOMBER' &&
            equip.name_jp.includes('瑞雲') // IDや名前よりこっちのがいい、かな？
        ) total.zuiun_count++;
        if (
            equip.type_id === 'DIVE_BOMBER' &&
            equip.name_jp.includes('六三四空')
        ) total.suisei_count++;
        return total;
    }, {
        zuiun_count: 0,
        suisei_count: 0,
    });

    if (zuiun_count >= 2) triggerables.push('Zuiun_CI');
    if (suisei_count >= 2) triggerables.push('Suisei_CI');
    return triggerables;
}