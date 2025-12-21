import { AntiAirFormationMod } from "@/logics/formation";
import { concat_fleet_ships, PlayerFleet } from "@/models/fleet/Fleet";
import { calc_mod_equip_fleet } from "./utils";
import { PlayerEquip } from "@/models/equip/basic";
import { is_equip_exsist, PlayerEquipSlot } from "@/models/ship/EquipSlot";
import { PlayerEquippedShip } from "@/models/ship/equipped";
import { FleetAntiAir } from ".";

/// プレイヤー艦隊の艦隊防空値(AdjAAfleet)
/// https://en.kancollewiki.net/Aerial_Combat#Adjusted_Anti-Air > Allied Fleet > Fleet Adj AA

/**
 * 改修係数を返す
 * @param equip 
 * @returns 
 */
const calc_improvement_coeffient = (
    equip: PlayerEquip,
): number => {
    const { type_id, aaci_trigger_type} = equip;
    if (
        aaci_trigger_type === 'A_HAFD'
    ) return 3;
    if (
        aaci_trigger_type === 'A_HAGUN' ||
        type_id === 'ANTI_AIR_FIRE_DIRECTOR'
    ) return 2;
    // ? 日wiki: 電探(大型/小型)
    // ? ENwiki: 対空電探のみ
    // ? 暫定: 対空電探のみ
    if (
        aaci_trigger_type === 'A_AIRRADAR'
    ) return 1.5;

    return 0;
}

/**
 * Σ<equips>を返す
 * @param equip_slots 
 * @returns 
 */
const calc_equips_total = (
    equip_slots: PlayerEquipSlot[],
): number => {
    return equip_slots.reduce((total, slot) => {
        const { equip } = slot;
        if (!is_equip_exsist(equip)) return total;

        return total
            + calc_mod_equip_fleet(equip) * equip.natural_addition.anti_air
            + calc_improvement_coeffient(equip) * Math.sqrt(equip.improvement_lv);
    }, 0);
};

/**
 * Σ<ships>を返す
 * @param ships 
 * @returns 
 */
const calc_ships_total = (
    ships: PlayerEquippedShip[],
): number => {
    return ships.reduce((total, ship) => {
        const equips_total = calc_equips_total(ship.equip_slots);

        return total
            + equips_total
            + ship.total_equip_bonus_addition.anti_air;
    }, 0);
}

/**
 * プレイヤー艦隊の艦隊防空値(AdjAAfleet)を返す(コア)    
 * https://en.kancollewiki.net/Aerial_Combat#Adjusted_Anti-Air > Allied Fleet > Fleet Adj AA
 * @param ship 
 */
const calc_player_fleet_anti_air_core = (
    ships: PlayerEquippedShip[],
    formation_mod: AntiAirFormationMod,
): FleetAntiAir => {
    // 艦隊防空値(AdjAAfleet)先行実装
    // ? 装備ボーナス: EquipBonus
    // ? 日wiki: floor(ModFormation * Σ<ships>(Σ<equips>(floor(AAequip * ModEquipFleet + AA★Fleet + 0.5 * EquipBonus)))) / 1.3
    // ? ENwiki: floor(ModFormation * Σ<ships>(floor(Σ<equips>((AAequip + EquipBonus) * ModEquipFleet + AA★Fleet)))) / 1.3
    // ? ☆ 制空シミュ: floor(ModFormation * floor(Σ<ships>(Σ<equips>(AAequip * ModEquipFleet + AA★Fleet + EquipBonus)))) / 1.3
    // ? Sortie Sim: floor(ModFormation * floor(Σ<ships>(Σ<equips>(floor(AAequip * ModEquipFleet + AA★Fleet) + EquipBonus))))
    // ? さらにAARfleet(射撃回避補正)を掛けてから floor(X / 1.3)。固定撃墜数処理と混ざってる
    // ? 暫定: 制空シミュ式 比較がしやすいのと処理の流れがきれいなので

    const ships_total = calc_ships_total(ships);

    return Math.floor(formation_mod * Math.floor(ships_total)) / 1.3 as FleetAntiAir;
}

/**
 * プレイヤー艦隊の艦隊防空値(AdjAAfleet)を返す
 * @param fleet 
 * @param formation_mod 
 * @returns 
 */
export function calc_player_fleet_anti_air(
    fleet: PlayerFleet,
    formation_mod: AntiAirFormationMod,
): FleetAntiAir {
    const ships = concat_fleet_ships(fleet);
    return calc_player_fleet_anti_air_core(ships, formation_mod);
}

export const __adjusted_fleet_player__ = {
    calc_player_fleet_anti_air_core,
    calc_improvement_coeffient,
};