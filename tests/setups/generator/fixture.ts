import { derive_player_fleet, PlayerFleet } from "@/models/fleet/Fleet";
import { PlayerEquippedShip } from "@/models/ship/equipped";
import { __player_equipped_ship__, derive_player_equipped_ship, PlayerEquippedShipOptions } from "@/models/ship/equipped/player";
import { ShipLv } from "@/types/brands/ship";
import { SpecialItemId } from "@/types/ship/ship";
import { PlayerShipNameJP } from "@/types/ship/playerNameJP";
import { PlayerEquipNameJP } from "@/types/equip/playerNameJP";
import { find_ship_id_from_name } from "./ship";
import { find_player_equip_id_from_name, make_player_equip_from_name } from "./equip";
import { ImporovementLv, PlayerEquip } from "@/models/equip/basic";
import { derive_player_equip } from "@/models/equip/basic/player";
import { EquipId } from "@/types/brands/equip";

export type PlayerEquipFixture = {
    name: PlayerEquipNameJP,
    improvement_lv?: number,
    proficiency?: number,
}

export type PlayerShipFixture = {
    name: PlayerShipNameJP;
    lv?: number,
    equips?: PlayerEquipFixture[];
    ex_equip?: PlayerEquipFixture;
    fuel_remain_ratio?: number,
    ammo_remain_ratio?: number,
}

export type PlayerFleetFixture = {
    main_fleet_ships: PlayerShipFixture[];
    escort_fleet_ships?: PlayerShipFixture[];
}

export function build_equip_from_fixture(
    equip_fixture: PlayerEquipFixture,
): PlayerEquip {
    return derive_player_equip(
        (equip_fixture.improvement_lv ?? 0) as ImporovementLv,
        find_player_equip_id_from_name(equip_fixture.name) as EquipId,
        (equip_fixture.proficiency ?? 100),
    );
}

/**
 * 艦Fixtureから PlayerEquippedShip を構築する
 * @param ship_fixture 
 * @returns 
 */
export function build_ship_from_fixture(
    ship_fixture: PlayerShipFixture,
): PlayerEquippedShip {
    const options: PlayerEquippedShipOptions = {
        fuel_remain_ratio: ship_fixture.fuel_remain_ratio ?? 1,
        ammo_remain_ratio: ship_fixture.ammo_remain_ratio ?? 1,
    };
    const equips = ship_fixture.equips
        ? ship_fixture.equips.map(equip_fixture => build_equip_from_fixture(equip_fixture))
        : [];
    const ex_equip = ship_fixture.ex_equip
        ? build_equip_from_fixture(ship_fixture.ex_equip)
        : 'None';
    return derive_player_equipped_ship(
        (ship_fixture.lv ?? 99) as ShipLv,
        SpecialItemId.None,
        find_ship_id_from_name(ship_fixture.name),
        options,
        equips,
        ex_equip,
    );
};

/**
 * 艦隊Fixtureから PlayerFleet を構築する
 * @param fixture 
 * @returns 
 */
export function build_fleet_from_fixture(
    fixture: PlayerFleetFixture,
): PlayerFleet {
    const main_ships = fixture.main_fleet_ships.map(build_ship_from_fixture);

    const escort_ships = fixture.escort_fleet_ships
        ? fixture.escort_fleet_ships.map(build_ship_from_fixture)
        : undefined;

    return derive_player_fleet(main_ships, escort_ships);
}
