import { PlayerEquip } from "@/models/equip/basic";
import { derive_player_fleet, PlayerFleet } from "@/models/fleet/Fleet";
import { PlayerEquippedShip } from "@/models/ship/equipped";
import { PlayerNakedShip } from "@/models/ship/naked";
import { __player_equipped_ship__, derive_player_equipped_ship, PlayerEquippedShipOptions } from "@/models/ship/equipped/player";
import { ShipLv } from "@/types/brands/ship";
import { SpecialItemId } from "@/types/ship/ship";

export type PlayerFleetFixture = {
    main: PlayerShipFixture[];
    escort?: PlayerShipFixture[];
}

export type PlayerShipFixture = {
    ship: PlayerNakedShip;
    lv?: number,
    equips?: PlayerEquip[];
    ex_equip?: PlayerEquip;
    fuel_remain_ratio?: number,
    ammo_remain_ratio?: number,
}

const build_ship_from_ship_fixture = (
    ship_fixture: PlayerShipFixture,
): PlayerEquippedShip => {
    const options: PlayerEquippedShipOptions = {
        fuel_remain_ratio: ship_fixture.fuel_remain_ratio ?? 1,
        ammo_remain_ratio: ship_fixture.ammo_remain_ratio ?? 1,
    };
    return derive_player_equipped_ship(
        (ship_fixture.lv ?? 99) as ShipLv,
        SpecialItemId.None,
        ship_fixture.ship.master_id,
        options,
        ship_fixture.equips ?? [],
        ship_fixture.ex_equip ?? 'None',
    );
};

/**
 * テスト用: 艦隊Fixtureから PlayerFleet を構築する
 * @param fixture 
 * @returns 
 */
export function build_fleet_from_fixture(
    fixture: PlayerFleetFixture,
): PlayerFleet {
    const main_ships = fixture.main.map(build_ship_from_ship_fixture);

    const escort_ships = fixture.escort
        ? fixture.escort.map(build_ship_from_ship_fixture)
        : undefined;

    return derive_player_fleet(main_ships, escort_ships);
}
