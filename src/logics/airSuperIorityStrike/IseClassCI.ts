import { EquippedShip, has_ship_name, is_player_equipped_ship } from "@/models/ship/equipped";
import { AirSuperiorityStrikeType } from ".";
import { PlayerShipNameJP } from "@/types/ship/playerNameJP";
import { EquipSlot, is_equip_exsist, is_slot_count_positive } from "@/models/ship/EquipSlot";

/// 海空立体攻撃 | 瑞雲立体攻撃

const APPLICABLE_SHIP: Set<PlayerShipNameJP> = new Set([
    '伊勢改二',
    '日向改二',
]);

type PreInfo = {
    zuiun_count: number,
    suisei_count: number,
}
const INITIAL: PreInfo = {
    zuiun_count: 0,
    suisei_count: 0,
} as const;

const calc_pre_info = (
    equip_slots: EquipSlot[],
): PreInfo => {
    return equip_slots.reduce((total, slot) => {
        const { equip } = slot;
        if (
            !is_equip_exsist(equip) ||
            !is_slot_count_positive(slot)
        ) return total;

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
    }, INITIAL);
}

export function calc_Ise_class_CI_types (
    attacker_ship: EquippedShip,
    main_gun_count: number,
): AirSuperiorityStrikeType[] {
    const triggerables: AirSuperiorityStrikeType[] = [];
    if (
        !is_player_equipped_ship(attacker_ship) ||
        !has_ship_name(APPLICABLE_SHIP, attacker_ship.name_jp) ||
        main_gun_count === 0
    ) return triggerables;

    const {
        zuiun_count,
        suisei_count,
    } = calc_pre_info(attacker_ship.equip_slots);

    if (zuiun_count >= 2) triggerables.push('Zuiun_CI');
    if (suisei_count >= 2) triggerables.push('Suisei_CI');
    return triggerables;
}