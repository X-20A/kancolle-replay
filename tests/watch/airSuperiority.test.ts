import { calc_ship_air_superiority_power } from "@/logics/airSuperiority/air_superiority";
import { derive_equip, PlayerEquip } from "@/models/equip/basic";
import { EquippedShip } from "@/models/ship/equipped";
import { brandEquipId } from "@/types/brands/equip";
import { pipe } from "fp-ts/lib/function";
import { REPPUU, XF5U } from "tests/setups/assets/equips/plane";
import { RANGER } from "tests/setups/assets/ship/player";
import { derive_PES } from "tests/setups/generator/ship";
import { describe, expect, it } from "vitest";

describe('制空系テスト', () => {
    it('装備によって正しい制空値を返すことを確認', () => {
        const IMPROVED_77mm = derive_equip(10, brandEquipId(37));
        const HAGE_REPPUU = derive_equip(0, brandEquipId(22), 0);
        const IMPROVED_SHIDEN = derive_equip(10, brandEquipId(55), 100);
        
        const SUPPIN_RANGER = derive_PES(RANGER, []);
        const GUN_RANGER = derive_PES(RANGER, [IMPROVED_77mm as PlayerEquip]);
        const REPPUU_RANGER = derive_PES(RANGER, [REPPUU]);
        const HAGE_REPPUU_RANGER = derive_PES(RANGER, [HAGE_REPPUU as PlayerEquip]);
        const XF5U_RANGER = derive_PES(RANGER, [XF5U]);
        const SHIDEN_RANGER = derive_PES(RANGER, [IMPROVED_SHIDEN as PlayerEquip]);
        

        const test = (expected: number, ship: EquippedShip) => {
            expect(expected).toBe(pipe(ship, calc_ship_air_superiority_power));
        };

        test(0, SUPPIN_RANGER);
        test(0, GUN_RANGER); // 機銃の対空値は含まない
        test(74, REPPUU_RANGER); // 単純加算
        test(48, HAGE_REPPUU_RANGER); // 艦載機熟練度
        test(83, XF5U_RANGER); // 装備ボーナスによる対空加算値は含まない
        test(79, SHIDEN_RANGER); // 艦戦の改修による対空上昇値は含む
    });

    it('制空状態による被撃墜', () => {
        
    });
});