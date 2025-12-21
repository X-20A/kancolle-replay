import { __adjusted_fleet_player__ } from "@/logics/antiAir/adjusted.ts/fleet/player";
import { calc_weighted_anti_air_of_player_ship } from "@/logics/antiAir/adjusted.ts/weighted/player";
import { calc_AACI_multiplier } from "@/logics/antiAir/cutin";
import { AACIType, TriggeredAACIType } from "@/logics/antiAir/cutin/conditions";
import { calc_abyssal_fixed_shootdown_count } from "@/logics/antiAir/shootdown/fixed/abyssal";
import { calc_player_fixed_shootdown_count } from "@/logics/antiAir/shootdown/fixed/player";
import { __shootdown_util__ } from "@/logics/antiAir/shootdown/utils";
import { get_single_fleet_formation_mods } from "@/logics/formation";
import { PlaneEquip } from "@/models/equip/basic";
import { derive_abyssal_equip } from "@/models/equip/basic/abyssal";
import { calc_formation_updated_fleet, derive_abyssal_fleet, derive_player_fleet } from "@/models/fleet/Fleet";
import { AffiliationFleetType } from "@/models/fleet/FleetUnit";
import { PlayerEquippedShip } from "@/models/ship/equipped";
import { SingleFleetFormationType } from "@/types";
import { HIGH_10 } from "tests/setups/assets/equips/gun";
import { F4U_1D } from "tests/setups/assets/equips/plane";
import { SURFACE_22 } from "tests/setups/assets/equips/radar";
import { LANDING_WA_FLAGSHIP } from "tests/setups/assets/ship/abyssal";
import { AKIZUKI } from "tests/setups/assets/ship/player";
import { derive_PES } from "tests/setups/generator/ship";
import { describe, expect, it } from "vitest";

const {
    calc_player_fleet_anti_air_core,
} = __adjusted_fleet_player__;
const {
    calc_combined_fleet_mod_core,
} = __shootdown_util__;

/**
 * No.1548 深海地獄艦爆    
 * https://en.kancollewiki.net/Abyssal_Hell_Dive_Bomber
 */
const JIGOKU_BOMBER = derive_abyssal_equip(1548); // 射撃回避なし

describe('固定撃墜数', () => {
    it('プレイヤー', () => {
        const test = (
            expected: number,
            defender_ship: PlayerEquippedShip,
            defender_ship_index: number,
            defender_ships: PlayerEquippedShip[],
            formation: SingleFleetFormationType,
            triggered_AACI_type: TriggeredAACIType,
            affiliation_type: AffiliationFleetType,
            is_air_raid_only: {
                is_air_raid_only: boolean;
            },
            target_unit: PlaneEquip,
        ): void => {
            const weighted_anti_air = calc_weighted_anti_air_of_player_ship(defender_ship);
            const formation_mod = get_single_fleet_formation_mods(formation, defender_ships.length, defender_ship_index).anti_air_mod;
            const fleet_anti_air = calc_player_fleet_anti_air_core(defender_ships, formation_mod);
            const combined_fleet_mod = calc_combined_fleet_mod_core(affiliation_type, is_air_raid_only);
            const AACI_multiplier = calc_AACI_multiplier(triggered_AACI_type);
            console.log('weighted_anti_air: ', weighted_anti_air);
            console.log('formation_mod :', formation_mod);
            console.log('fleet_anti_air :', fleet_anti_air);
            console.log('combined_fleet_mod :', combined_fleet_mod);
            console.log('AACI_multiplier :', AACI_multiplier);
            expect(expected).toBe(calc_player_fixed_shootdown_count(
                weighted_anti_air,
                fleet_anti_air,
                AACI_multiplier,
                combined_fleet_mod,
                target_unit,
            ));
        };

        const AACI_AKIZUKI = derive_PES(AKIZUKI, [HIGH_10, SURFACE_22]); // AACI種別: [2]

        test(24, // 制空シミュ、sortie simだと23になる
            AACI_AKIZUKI,
            0,
            [AACI_AKIZUKI],
            'Diamond',
            2 as TriggeredAACIType,
            'single',
            { is_air_raid_only: false },
            JIGOKU_BOMBER as PlaneEquip,
        );
    });
    it('深海', () => {
        const Wa_fleet = calc_formation_updated_fleet(derive_abyssal_fleet([LANDING_WA_FLAGSHIP]), 'Diamond');

        expect(37).toBe(calc_abyssal_fixed_shootdown_count(
            Wa_fleet.main_fleet_units[0],
            8 as AACIType,
            Wa_fleet as AbyssalSingleFleet,
            F4U_1D as PlaneEquip,
            node,
        ));
    });
});
