import { calc_weighted_anti_air_of_ship, calc_mod_equip_ship } from "@/logics/antiAir/adjusted.ts/weighted";
import { __weighted_ship_player__ } from "@/logics/antiAir/adjusted.ts/weighted/player";
import { derive_equip, Equip, PlayerEquip } from "@/models/equip/basic";
import { EquippedShip } from "@/models/ship/equipped";
import { brandEquipId } from "@/types/brands/equip";
import { FD_91, GUN_77, HUNSHIN_KAI_NI, ZOUBI_25 } from "tests/setups/assets/equips/antiAir";
import { HATSUZUKI_GUN, MK30_GFCS, MK30_KAI, YAMATO_10CM_CLUSTER } from "tests/setups/assets/equips/gun";
import { REPPUU, XF5U } from "tests/setups/assets/equips/plane";
import { GFCS_RADAR } from "tests/setups/assets/equips/radar";
import { SEC_155_KAI } from "tests/setups/assets/equips/secGun";
import { LANDING_WA_FLAGSHIP } from "tests/setups/assets/ship/abyssal";
import { MAYA_KAI_NI, RANGER } from "tests/setups/assets/ship/player";
import { derive_PES } from "tests/setups/generator/ship";
import { describe, expect, it } from "vitest";

const {
    calc_improvement_coeffient,
} = __weighted_ship_player__;

describe('加重対空', () => {
    it('装備倍率', () => {
        const test = (expected: number, equip: Equip) => {
            expect(expected).toBe(calc_mod_equip_ship(equip));
        };

        test(3, GUN_77);
    });
    it('改修係数', () => {
        const test = (expected: number, equip: Equip) => {
            expect(expected).toBe(calc_improvement_coeffient(equip));
        };

        // 対空機銃(素対空8以上)
        test(3, HUNSHIN_KAI_NI);
        // 対空機銃(素対空7以下)
        test(2, ZOUBI_25);
        // 高角砲(素対空8以上)、高射装置(日wikiには記載が無いがENwikiにはある)
        test(1.5, MK30_GFCS);
        test(1.5, HATSUZUKI_GUN);
        // 高角副砲には乗る たぶん
        test(1.5, YAMATO_10CM_CLUSTER);
        // 高角砲(素対空7以下)、高射装置
        test(1, MK30_KAI);
        test(1, FD_91);
        // それ以外の装備
        test(0, GFCS_RADAR);
        test(0, SEC_155_KAI);
        test(0, REPPUU);
    });
    it('艦の加重対空値', () => { // 加重対空値は割合撃墜や固定撃墜の為の過渡的な値に過ぎないけども表示する可能性はある
        const IMPROVED_77mm = derive_equip(9, brandEquipId(37));

        const SUPPIN_RANGER = derive_PES(RANGER, []);
        const GUN_RANGER = derive_PES(RANGER, [IMPROVED_77mm as PlayerEquip]);
        const XF5U_RANGER = derive_PES(RANGER, [XF5U]);
        const GFCS_RANGER = derive_PES(RANGER, [GFCS_RADAR]);
        const BONUS_MAYA = derive_PES(MAYA_KAI_NI, [ZOUBI_25]);

        const test = (expected: number, ship: EquippedShip) => {
            expect(expected).toBe(calc_weighted_anti_air_of_ship(ship));
        };

        test(35, SUPPIN_RANGER);
        test(47, GUN_RANGER);
        test(37, XF5U_RANGER);
        test(46, GFCS_RANGER);
        test(74, BONUS_MAYA); // 装備ボーナス

        // 深海
        test(110, LANDING_WA_FLAGSHIP);
    });
});