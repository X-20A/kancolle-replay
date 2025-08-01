import { NightBattleStrikeType } from "@/logics/nightBattleStrike";
import { calc_D_gun_mod } from "@/logics/nightBattleStrike/Dgun";
import { Equip, PlayerEquip } from "@/models/equip/basic";
import { derive_player_equip_slots, EquipSlot } from "@/models/ship/EquipSlot";
import { D_2_GUN, D_3_GUN } from "tests/setups/assets/equips/gun";
import { AKIZUKI } from "tests/setups/assets/ship/player";
import { describe, expect, it } from "vitest";

const SLOT_COUNTS = [0, 0, 0, 0];
const derive_slot = (
    equips: PlayerEquip[],
): EquipSlot[] => {
    return derive_player_equip_slots(
        AKIZUKI,
        equips,
        SLOT_COUNTS,
        'None',
    );
}

describe('夜戦CI系', () => {
    it('D型砲組み合わせによる火力補正', () => {
        const test = (expected: number, equips: PlayerEquip[]) => {
            const CI_TYPE: NightBattleStrikeType = 'DDCI_GTR';
            const result = calc_D_gun_mod(
                CI_TYPE,
                derive_slot(equips),
            );
            expect(expected).toBe(result);
        };

        test(1, []);
        test(1.25, [D_2_GUN]);
        test(1.4, [D_2_GUN, D_2_GUN]);
        test(1.25 * 1.05, [D_3_GUN]);
        test(1.4 * 1.05, [D_2_GUN, D_3_GUN]);
        test(1.4 * 1.1, [D_3_GUN, D_3_GUN]);

        test(1.4 * 1.05, [D_2_GUN, D_2_GUN, D_3_GUN]);
        test(1.4 * 1.1, [D_3_GUN, D_3_GUN, D_3_GUN]);
    });
    it('主魚電、魚電見 にしか乗らない', () => {
        const test = (expected: number, CI_type: NightBattleStrikeType) => {
            const EQUIPS: PlayerEquip[] = [D_2_GUN];
            const result = calc_D_gun_mod(
                CI_type,
                derive_slot(EQUIPS),
            );
            expect(expected).toBe(result);
        };

        test(1.25, 'DDCI_GTR');
        test(1.25, 'DDCI_LTR');
        test(1, 'DDCI_RDL');
        test(1, 'DDCI_TTL');
    });
});