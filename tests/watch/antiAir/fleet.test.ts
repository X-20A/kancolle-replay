import { calc_abyssal_fleet_anti_air } from "@/logics/antiAir/adjusted.ts/fleet/abyssasl";
import { __adjusted_fleet_player__, calc_player_fleet_anti_air } from "@/logics/antiAir/adjusted.ts/fleet/player";
import { calc_mod_equip_fleet } from "@/logics/antiAir/adjusted.ts/fleet/utils";
import { get_single_fleet_formation_mods } from "@/logics/formation";
import { Equip, PlayerEquip } from "@/models/equip/basic";
import { derive_player_equip } from "@/models/equip/basic/player";
import { AbyssalFleet, AbyssalSingleFleet, derive_abyssal_fleet, derive_player_fleet, PlayerFleet, PlayerSingleFleet } from "@/models/fleet/Fleet";
import { SingleFleetFormationType } from "@/types";
import { EquipId } from "@/types/brands/equip";
import { FD_91, FD_94, GUN_77 } from "tests/setups/assets/equips/antiAir";
import { D_2_GUN, GUN_51, GUN_TRIPLE_51, HATSUZUKI_GUN, MK30_GFCS, MK30_KAI, PROTO_YAMATO_46, TANYAN_GUN, YAMATO_10CM_CLUSTER, YAMATO_46, YAMATO_46_KAI } from "tests/setups/assets/equips/gun";
import { TYPE_3_SHELL } from "tests/setups/assets/equips/other";
import { REPPUU, RYUUSEI_IKKOUSEN_SKILLED, SUISEI_EGUSA, YURA_SEAPLANE_SCOUT_SLILLED } from "tests/setups/assets/equips/plane";
import { GFCS_RADAR, RADAR_13_KAI, SURFACE_22 } from "tests/setups/assets/equips/radar";
import { SEC_155_KAI } from "tests/setups/assets/equips/secGun";
import { LANDING_WA_FLAGSHIP } from "tests/setups/assets/ship/abyssal";
import { AKIZUKI } from "tests/setups/assets/ship/player";
import { derive_PES } from "tests/setups/generator/ship";
import { describe, expect, it } from "vitest";

const {
    calc_improvement_coeffient,
} = __adjusted_fleet_player__;

describe('艦隊防空', () => {
    it('装備倍率', () => {
        const test = (
            expected: number,
            equip: Equip,
        ): void => {
            expect(expected).toBe(calc_mod_equip_fleet(equip));
        }
        // 三式弾
        test(0.6, TYPE_3_SHELL);
        // 電探(大型/小型) 日wikiには記載が無いが対空電探のみ有効
        test(0.4, GFCS_RADAR);
        // 高角砲(全て)、高射装置
        test(0.35, MK30_KAI);
        test(0.35, FD_91);
        test(0.35, YAMATO_10CM_CLUSTER);
        // 46cm三連装砲
        test(0.25, YAMATO_46);
        // それ以外の装備
        test(0.2, D_2_GUN);
        test(0.2, SEC_155_KAI);
        test(0.2, GUN_77);
        test(0.2, REPPUU);
        test(0.2, SUISEI_EGUSA);
        test(0.2, RYUUSEI_IKKOUSEN_SKILLED);
        test(0.2, YURA_SEAPLANE_SCOUT_SLILLED);
        // 46cm三連装砲以外の主砲
        test(0.2, PROTO_YAMATO_46);
        test(0.2, YAMATO_46_KAI);
        test(0.2, GUN_51);
        test(0.2, GUN_TRIPLE_51);
        // 対空でない電探
        test(0.2, SURFACE_22);
    });
    it('改修係数', () => {
        const test = (
            expected: number,
            equip: PlayerEquip,
        ): void => {
            expect(expected).toBe(calc_improvement_coeffient(equip));
        };

        // 高角砲(素対空8以上)
        test(3, TANYAN_GUN);
        test(3, MK30_GFCS);
        // 高角砲(素対空7以下)、高射装置
        test(2, MK30_KAI);
        test(2, FD_94);
        test(1.5, RADAR_13_KAI);

        test(0, SURFACE_22);
    });
    it('プレイヤー艦隊 艦隊防空値', () => {
        const test = (
            expected: number,
            fleet: PlayerFleet,
            formation: SingleFleetFormationType,
        ) => {
            const mods =
                get_single_fleet_formation_mods(formation, fleet.main_fleet_units.length, 0);
            const result = calc_player_fleet_anti_air(
                fleet as PlayerSingleFleet,
                mods.anti_air_mod,
            );

            expect(expected).toBe(result);
        };

        const NORMAL_AKIZUKI = derive_PES(AKIZUKI, [HATSUZUKI_GUN, HATSUZUKI_GUN, RADAR_13_KAI]);

        const IMPROVED_HATSUZUKI_GUN = derive_player_equip(1, 533 as EquipId);
        const IMPROVED_AKIZUKI = derive_PES(AKIZUKI, [IMPROVED_HATSUZUKI_GUN, HATSUZUKI_GUN, RADAR_13_KAI]);

        test(10, derive_player_fleet([NORMAL_AKIZUKI]), 'LineAhead');
        test(12.307692307692307, derive_player_fleet([IMPROVED_AKIZUKI]), 'LineAhead');
        // TODO: 陣形, 装備ボーナス
    });
    it('深海艦隊 艦隊防空値', () => {
        const test = (
            expected: number,
            fleet: AbyssalFleet,
            formation: SingleFleetFormationType,
        ) => {
            const mods =
                get_single_fleet_formation_mods(formation, fleet.main_fleet_units.length, 0);
            const result = calc_abyssal_fleet_anti_air(
                fleet as AbyssalSingleFleet,
                mods.anti_air_mod,
            );

            expect(expected).toBe(result);
        };

        test(32, derive_abyssal_fleet([LANDING_WA_FLAGSHIP]), 'Diamond');
        // TODO: 陣形
    });
});