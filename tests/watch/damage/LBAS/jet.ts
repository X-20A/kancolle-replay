import { calc_jet_LBAS_assault_damage } from "@/logics/damage";
import { Equip, is_player_plane_equips } from "@/models/equip/basic";
import { derive_LBAS } from "@/models/LBAS";
import { AbyssalEquippedShip } from "@/models/ship/equipped";
import { describe, it } from "vitest";

describe('ダメージ系', () => {
    it('噴式基地強襲', () => {
        const test = (
            expected: number,
            attacker_plane: Equip,
            target_ship: AbyssalEquippedShip,
        ) => {
            if (is_player_plane_equips)
            const lbas = derive_LBAS()
            const damage = calc_jet_LBAS_assault_damage(

            )
            expect(expected).toBe();
        };

        test(0, SUPPIN_RANGER);
    });

    it('制空状態による被撃墜', () => {

    });
});