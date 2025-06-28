import { AntiAirCutinType, calc_triggerable_AACIs } from "@/logics/antiAir/cutin";
import { Equip } from "@/models/equip/basic";
import { derive_prepare_AACI_info } from "@/models/ship/aaciPreparate";
import { derive_abyssal_naked_ship } from "@/models/ship/naked/abyssal";
import { NakedShip } from "@/models/ship/naked/base";
import { derive_player_naked_ship } from "@/models/ship/naked/player";
import { brandShipId, brandShipLv } from "@/types/brands/ship";
import { FD_91, GUN_127, PONPON } from "tests/setups/assets/equips/antiAir";
import { AKIZUKI_GUN, ATLANTA_GUN, HIGH_10, HIGH_127, large_356, TANYAN_GUN } from "tests/setups/assets/equips/gun";
import { TYPE_3_SHELL } from "tests/setups/assets/equips/other";
import { RADAR_13, SURFACE_22 } from "tests/setups/assets/equips/radar";
import { calc_ship_id_from_name } from "tests/setups/generator";
import { describe, expect, it } from "vitest";

const derive_naked_ship = (
    id: number,
): NakedShip => {
    const ship_id = brandShipId(id);
    return id < 1500
        ? derive_player_naked_ship(brandShipLv(99), ship_id)
        : derive_abyssal_naked_ship(ship_id)
}

const derive_naked_ship_from_name = (
    name: string,
): NakedShip => {
    const id = calc_ship_id_from_name(name);

    return derive_naked_ship(id);
}

describe('制空系テスト', () => {
    it('対空CI', () => {
        const AKIZUKI = derive_naked_ship_from_name('秋月');
        const HIEI = derive_naked_ship_from_name('比叡改');
        const SHIKINAMI = derive_naked_ship_from_name('敷波改');
        const MAYA_KAI_NI = derive_naked_ship_from_name('摩耶改二');

        const test = (
            expected: AntiAirCutinType[],
            ship: NakedShip,
            equips: Equip[],
        ) => {
            const info = derive_prepare_AACI_info(equips);
            // console.log('info', info);
            const result = calc_triggerable_AACIs(ship, info);

            expect(result).toHaveLength(expected.length);
            expect(result).toEqual(expect.arrayContaining(expected));
        };

        // 最小構成チェック
        test([1, 2, 3], AKIZUKI, [HIGH_10, HIGH_10, SURFACE_22]);
        test([2], AKIZUKI, [HIGH_10, SURFACE_22]);
        test([3], AKIZUKI, [HIGH_10, HIGH_10]);
        test([4, 6], HIEI, [large_356, TYPE_3_SHELL, FD_91, RADAR_13]);
        test([5, 8], SHIKINAMI, [TANYAN_GUN, TANYAN_GUN, RADAR_13]);
        test([6], HIEI, [large_356, TYPE_3_SHELL, FD_91]);
        test([7, 9], SHIKINAMI, [HIGH_10, FD_91, RADAR_13]);
        test([8], SHIKINAMI, [TANYAN_GUN, RADAR_13]);
        test([9], SHIKINAMI, [HIGH_10, FD_91]);
        test([10, 11], MAYA_KAI_NI, [HIGH_127, PONPON, RADAR_13]);
        test([11], MAYA_KAI_NI, [HIGH_127, PONPON]);
        test([12], MAYA_KAI_NI, [PONPON, GUN_127, RADAR_13]);
        test([13, 8], SHIKINAMI, [TANYAN_GUN, PONPON, RADAR_13]); // ACSim check
        

        // 負例

        // 秋月型では 5,7,8種 は発動しない
        test([1,2,3], AKIZUKI, [AKIZUKI_GUN, AKIZUKI_GUN, RADAR_13]);
        // +高射装置系は高射装置にカウントしない
        // 10cm連装高角砲＋高射装置を高射装置としてカウントしてると7,9が出る
        test([8], SHIKINAMI, [HIGH_10, AKIZUKI_GUN, RADAR_13]);
        // 摩耶改二では 13種 は発動しない
        test([8, 10, 11], MAYA_KAI_NI, [ATLANTA_GUN, PONPON, RADAR_13]);
    });
});