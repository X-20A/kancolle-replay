import { FleetUnit, is_flag_ship } from "@/models/fleet/FleetUnit";
import { EquippedShip, includes_ship_type, is_damage_moderatery_or_more } from "@/models/ship/equipped";
import { EquipSlot } from "@/models/ship/EquipSlot";
import { Brand } from "@/types/brands";
import { PlayerEquipNameJP } from "@/types/equip/playerNameJP";
import { CIRateSearchlightMod } from "../nightBattleEquips/searchLight";
import { CIRateStarShellMod } from "../nightBattleEquips/starShell";

type FlagshipMod = 15 | 0

/**
 * 旗艦補正を返す
 * @param fleet_unit 
 * @returns 
 */
const calc_flagship_mod = (
    fleet_unit: FleetUnit,
): FlagshipMod => {
    return is_flag_ship(fleet_unit)
        ? 15
        : 0;
}

type TSSLMod = 8 | 5 | 0

/**
 * 指定装備が装備スロットに含まれるか判定して返す
 * @param target_equip_name 
 * @param equip_slots 
 * @returns 
 */
const has_equip = (
    target_equip_name: PlayerEquipNameJP,
    equip_slots: EquipSlot[],
): boolean => {
    return equip_slots.some(slot =>
        slot.equip &&
        slot.equip.name_jp === target_equip_name
    );
}

/**
 * 見張り員補正を返す
 * @param ship 
 * @returns 
 */
const calc_TSSL_mod = (
    ship: EquippedShip,
): TSSLMod => {
    const { equip_slots } = ship;
    if (
        includes_ship_type(['DD', 'CL', 'CLT'], ship.type_id) &&
        has_equip('水雷戦隊 熟練見張員', equip_slots)
    ) return 8;
    if (has_equip('熟練見張員', equip_slots)) return 5;

    return 0;
}

type ShipStatusMod = Brand<number, 'ShipStatusMod'>

/**
 * 艦ステータス補正を返す
 * @param ship 
 * @returns 
 */
const calc_status_mod = (
    ship: EquippedShip,
): ShipStatusMod => {
    const { lv } = ship;
    const { luck } = ship.edited_status;
    if (ship.edited_status.luck >= 50) return Math.floor(
        65
        + Math.sqrt(luck - 50)
        + Math.sqrt(lv) * .8
    ) as ShipStatusMod;

    return Math.floor(
        15
        + luck
        + Math.sqrt(lv) * .75
    ) as ShipStatusMod;
}

type ShipStateMod = 18 | 0

/**
 * 艦状態補正を返す
 * @param ship 
 * @returns 
 */
const calc_ship_state_mod = (
    ship: EquippedShip,
): ShipStateMod => {
    return is_damage_moderatery_or_more(ship)
        ? 18
        : 0;
}

export type NightBattleCIPreRate = Brand<number, 'NightBattleCIPreRate'>

/**
 * CI発動率を返す(コア)
 * @param flagship_mod 
 * @param TSSL_mod 
 * @param ship_status_mod 
 * @param ship_state_mod 
 * @param star_shell_mod 
 * @param searchlight_mod 
 * @param CI_chance_mod 
 * @returns 
 */
const calc_night_battle_CI_pre_rate_core = (
    flagship_mod: FlagshipMod,
    TSSL_mod: TSSLMod,
    ship_status_mod: ShipStatusMod,
    ship_state_mod: ShipStateMod,
    star_shell_mod: CIRateStarShellMod,
    searchlight_mod: CIRateSearchlightMod,
): NightBattleCIPreRate => {
    const rate = flagship_mod
        + TSSL_mod
        + ship_status_mod
        + ship_state_mod
        + star_shell_mod
        + searchlight_mod;

    return rate * 0.01 as NightBattleCIPreRate;
}

/**
 * CI発動率を返す(ファサード)
 * @param fleet_unit 
 * @param star_shell_mod 
 * @param searchlight_mod 
 * @param CI_chance_mod 
 * @returns 
 */
export function calc_night_battle_CI_pre_rate(
    fleet_unit: FleetUnit,
    star_shell_mod: CIRateStarShellMod,
    searchlight_mod: CIRateSearchlightMod,
): NightBattleCIPreRate {
    const { ship } = fleet_unit;
    const flagship_mod = calc_flagship_mod(fleet_unit);
    const TSSL_mod = calc_TSSL_mod(ship);
    const ship_status_mod = calc_status_mod(ship);
    const ship_state_mod = calc_ship_state_mod(ship);

    return calc_night_battle_CI_pre_rate_core(
        flagship_mod,
        TSSL_mod,
        ship_status_mod,
        ship_state_mod,
        star_shell_mod,
        searchlight_mod,
    );
}