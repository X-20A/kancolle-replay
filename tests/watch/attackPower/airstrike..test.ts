import { __attack_power_airstrike__ } from "@/logics/attackPower/airstrike";
import { PlayerEquippedShip } from "@/models/ship/equipped";
import { convert_non_empty_player_equip_slots, NonEmptyPlayerEquipSlot } from "@/models/ship/EquipSlot";
import { PlayerEquipNameJP } from "@/types/equip/playerNameJP";
import { GUN_77 } from "tests/setups/assets/equips/antiAir";
import { RYUUSEI_IKKOUSEN_SKILLED, TBM_3W_3S } from "tests/setups/assets/equips/plane";
import { AKAGI_KAI_NI, AQUILA, SARATOGA } from "tests/setups/assets/ship/player";
import { derive_PES } from "tests/setups/generator/ship";
import { describe, expect, it } from "vitest";

const {
    calc_slot_of_most_powerful_plane,
    calc_plane_torpedo_bonus,
} = __attack_power_airstrike__

describe('航空戦攻撃力系', () => {
    it('装備スロット群から最も雷装値が高い装備のスロットが選ばれる', () => {

        const IKKOUSEN_SARATOGA = derive_PES(SARATOGA, [TBM_3W_3S, RYUUSEI_IKKOUSEN_SKILLED]);
        const IREKAE_IKKOUSEN_SARATOGA = derive_PES(SARATOGA, [RYUUSEI_IKKOUSEN_SKILLED, TBM_3W_3S]);

        const SECOND_SLOT_AQUILA =
            derive_PES(AQUILA, [RYUUSEI_IKKOUSEN_SKILLED, RYUUSEI_IKKOUSEN_SKILLED]);
        const FIRST_SLOT_AKAGI_KAI_NI =
            derive_PES(AKAGI_KAI_NI, [RYUUSEI_IKKOUSEN_SKILLED, RYUUSEI_IKKOUSEN_SKILLED]);

        const test = (
            expected_equip_name: PlayerEquipNameJP,
            ship: PlayerEquippedShip,
        ): void => {
            const non_eqmpty_slots = convert_non_empty_player_equip_slots(ship.equip_slots);
            const result_slot = calc_slot_of_most_powerful_plane(non_eqmpty_slots);

            expect(expected_equip_name).toBe(result_slot.equip.name_jp);
        }

        test('流星改(一航戦/熟練)', IKKOUSEN_SARATOGA);
        test('流星改(一航戦/熟練)', IREKAE_IKKOUSEN_SARATOGA);

        // 雷装値が同じならスロット数の大きいスロットが選ばれる
        expect(1).toBe(
            calc_slot_of_most_powerful_plane(
                convert_non_empty_player_equip_slots(SECOND_SLOT_AQUILA.equip_slots)
            ).slot_index,
        );
        // スロット数も同じなら上のスロットが選ばれる
        expect(0).toBe(
            calc_slot_of_most_powerful_plane(
                convert_non_empty_player_equip_slots(FIRST_SLOT_AKAGI_KAI_NI.equip_slots)
            ).slot_index,
        );
    });
});