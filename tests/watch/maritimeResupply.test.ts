import { calc_maritime_resupply_locations } from "@/logics/maritimeResupply";
import { derive_player_fleet } from "@/models/fleet/Fleet";
import { PlayerEquippedShip } from "@/models/ship/equipped";
import { MARITIME_RESUPPLY } from "tests/setups/assets/equips/other";
import { REPPUU } from "tests/setups/assets/equips/plane";
import { ATLANTA, FLETCHER, GOTLAND, MUTSUKI, SOUYA, YAMASHIOMARU_KAI } from "tests/setups/assets/ship/player";
import { derive_PES } from "tests/setups/generator/ship";
import { describe, expect, it } from "vitest";

const SUPPIN_ATLANTA = derive_PES(ATLANTA, []);
const SUPPIN_GOTLAND = derive_PES(GOTLAND, []);
const SUPPIN_MUTSUKI = derive_PES(MUTSUKI, []);
const SUPPIN_FLETCHER = derive_PES(FLETCHER, []);
const EQ_2_YAMASHIOMARU_KAI =
    derive_PES(YAMASHIOMARU_KAI, [MARITIME_RESUPPLY, REPPUU], MARITIME_RESUPPLY);
const EQ_2_SOUYA = derive_PES(SOUYA, [MARITIME_RESUPPLY, MARITIME_RESUPPLY]);

const main_fleet_ships: PlayerEquippedShip[] = [
    SUPPIN_ATLANTA,
    SUPPIN_GOTLAND,
    SUPPIN_MUTSUKI,
    SUPPIN_FLETCHER,
    EQ_2_YAMASHIOMARU_KAI,
    EQ_2_SOUYA,
] as const;
const escort_fleet_ships: PlayerEquippedShip[] = [];

const single_fleet = derive_player_fleet(main_fleet_ships);
const combined_fleet = derive_player_fleet(main_fleet_ships, escort_fleet_ships);

describe('洋上補給', () => {
    it('洋上補給の位置を特定', () => {
        const locations = calc_maritime_resupply_locations(single_fleet);
        // 3つまでしか数えない
        expect(3).toBe(locations.length);

        expect(EQ_2_YAMASHIOMARU_KAI.unique_id).toBe(locations[0]?.ship_unique_id);
        expect(0).toBe(locations[0]?.equip_index);

        expect(EQ_2_YAMASHIOMARU_KAI.unique_id).toBe(locations[1]?.ship_unique_id);
        expect('ex').toBe(locations[1]?.equip_index);

        expect(EQ_2_SOUYA.unique_id).toBe(locations[2]?.ship_unique_id);
        expect(0).toBe(locations[2]?.equip_index);
    });
    it('洋上補給の数に応じた回復割合', () => {

    });
    it('補給後の残(燃料|弾薬)割合と補給した(燃料|弾薬)割合', () => {

    });
    it('装備スロットのずれ込み(艦戦スライド)', () => {

    });
    it('請求資源', () => {

    });
});