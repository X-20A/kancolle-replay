import { EquippedShip } from "@/models/ship/equipped";
import { NightBattleStrikeType } from ".";
import { EquipSlot, is_equip_exsist } from "@/models/ship/EquipSlot";
import { is_player_equip } from "@/models/equip/basic";

type PreInfo = {
    sub_radar_count: number,
    late_model_torpedo_count: number,
}

const calc_pre_info = (
    equip_slots: EquipSlot[],
): PreInfo => {
    return equip_slots.reduce((total, slot) => {
        const { equip } = slot;
        if (
            !is_equip_exsist(equip) ||
            !is_player_equip(equip)
        ) return total;

        if (equip.type_id === 'SUBMARINE_RADAR') total.sub_radar_count++;
        // ? 深海側にも後期型魚雷があるが有効? 暫定: 無効
        if (equip.flags.is_submarine_CI_trigger) total.late_model_torpedo_count++;

        return total;
    }, {
        sub_radar_count: 0,
        late_model_torpedo_count: 0,
    } as PreInfo);
}

export function calc_submarine_CIs(
    attacker_ship: EquippedShip,
): NightBattleStrikeType[] {
    const {
        sub_radar_count,
        late_model_torpedo_count,
    } = calc_pre_info(attacker_ship.equip_slots);

    // NOTE: 双方を満たす場合、電探構成しか発動しない
    // https://wikiwiki.jp/kancolle/夜戦#dfcb6e1f
    if (
        late_model_torpedo_count >= 1 &&
        sub_radar_count >= 1
    ) return ['SSCI_TR'];
    if (late_model_torpedo_count >= 2) return ['SSCI_TT'];
    
    return [];
}