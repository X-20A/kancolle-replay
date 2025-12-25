import { concat_fleet_units, Fleet } from "@/models/fleet/Fleet";
import { FleetUnit } from "@/models/fleet/FleetUnit";
import { is_flagship_unit } from "@/models/fleet/predicates";
import { EquippedShip, is_ship_on_the_front_line } from "@/models/ship/equipped";
import { AirSuperiorityStrikeChanceMod } from ".";
import { Brand } from "@/types/brands";
import { is_valid_air_superiority_strike_seaplane } from "./util";
import { EquipSlot, is_equip_exsist } from "@/models/ship/EquipSlot";
import { AirStateType } from "../airSuperiority/compare";

/// 弾着観測射撃・空母カットインの発動率
// https://en.kancollewiki.net/Combat/Artillery_Spotting#Trigger_Rates

/**
 * 水偵・水爆の索敵値加算値を返す(LoS_Recon)
 * @param equip_slots 
 * @returns 
 */
const calc_total_valid_seaplane_LoS = (
    equip_slots: EquipSlot[],
): number => {
    return equip_slots.reduce((total, slot) => {
        const { equip } = slot;
        if (
            !is_equip_exsist(equip) ||
            is_valid_air_superiority_strike_seaplane(equip) ||
            equip.natural_addition.los === 0
        ) return total;

        // 装備ボーナス・改修ボーナスは含めない
        const { los } = equip.natural_addition;
        total += los * Math.floor(Math.sqrt(slot.slot_count));

        return total;
    }, 0);
}

/**
 * 艦隊索敵補正のヘルパー
 * @param attacker_fleet 
 * @returns 
 */
const calc_A = (
    attacker_fleet: Fleet,
): number => {
    const units = concat_fleet_units(attacker_fleet);
    return units.reduce((total, unit) => {
        const { ship } = unit;
        if (!is_ship_on_the_front_line(ship)) return total;

        total += ship.naked_status.los;
        total += calc_total_valid_seaplane_LoS(ship.equip_slots);

        return total;
    }, 0);
}

type LoSFleet = Brand<number, 'LoSFleet'>

/**
 * 艦隊索敵補正を返す    
 * ここだけ日wiki方式で    
 * ⌊√(A) + 0.1×A⌋    
 * までやってしまう    
 * https://wikiwiki.jp/kancolle/戦闘について#FAcutin
 * @param attacker_fleet 
 * @returns 
 */
const calc_LoS_Fleet = (
    attacker_fleet: Fleet,
): LoSFleet => {
    const A = calc_A(attacker_fleet);

    return Math.floor(Math.sqrt(A) + A / 10) as LoSFleet;
}

type LoSEquip = Brand<number, 'LoSEquip'>

/**
 * Σ(水偵or水爆の装備索敵値×⌊√(水偵or水爆の機数)⌋) を返す
 * @param equip_slots 
 * @returns 
 */
const calc_LoS_Equip = (
    equip_slots: EquipSlot[],
): LoSEquip => {
    return equip_slots.reduce((total, slot) => {
        const { equip } = slot;
        if (
            !is_equip_exsist(equip) ||
            is_valid_air_superiority_strike_seaplane(equip) ||
            equip.natural_addition.los === 0
        ) return total;

        // 装備ボーナス・改修ボーナスは含めない
        const { los } = equip.natural_addition;
        total += los * Math.floor(Math.sqrt(slot.slot_count));

        return total;
    }, 0) as LoSEquip;
}

type BaseShip = Brand<number, 'BaseShip'>

/**
 * 航空優勢時の観測項を返す
 * @param attacker_ship 
 * @param LoS_Fleet 
 * @param LoS_Equip 
 * @returns 
 */
const calc_Base_ship_Superiority = (
    attacker_ship: EquippedShip,
    LoS_Fleet: LoSFleet,
    LoS_Equip: LoSEquip,
): BaseShip => {
    const { luck } = attacker_ship.edited_status;

    return Math.floor(
        + Math.floor(Math.sqrt(luck))
        + 0.6 * (1.2 * LoS_Equip + LoS_Fleet)
    ) as BaseShip;
}

/**
 * 航空確保時の観測項を返す
 * @param attacker_ship 
 * @param LoS_Fleet 
 * @param LoS_Equip 
 * @returns 
 */
const calc_Base_ship_Supremacy = (
    attacker_ship: EquippedShip,
    LoS_Fleet: LoSFleet,
    LoS_Equip: LoSEquip,
): BaseShip => {
    const { luck } = attacker_ship.edited_status;

    return Math.floor(
        + Math.floor(Math.sqrt(luck))
        + 0.7 * (1.6 * LoS_Equip + LoS_Fleet)
        + 10
    ) as BaseShip;
}

type FlagshipMod = 0 | 15

/**
 * 旗艦補正を返す
 * @param attacker_unit 
 * @returns 
 */
const calc_flagship_mod = (
    attacker_unit: FleetUnit,
): FlagshipMod => {
    return is_flagship_unit(attacker_unit)
        ? 15
        : 0;
}

/**
 * 発動率を返す(コア)
 * @param Base_ship 
 * @param flagship_mod 
 * @param chance_mod 
 * @returns 
 */
const calc_trigger_rate_core = (
    Base_ship: BaseShip,
    flagship_mod: FlagshipMod,
    chance_mod: AirSuperiorityStrikeChanceMod,
): number => {
    return (
        10 + Base_ship + flagship_mod
    ) / chance_mod * 100;
}

/**
 * 弾着観測射撃・空母カットインの発動率を返す
 * @param attacker_unit 
 * @param attacker_fleet 
 * @param air_state 
 * @param chance_mod 
 * @returns 
 */
export function calc_air_superiority_strike_trigger_rate(
    attacker_unit: FleetUnit,
    attacker_fleet: Fleet,
    air_state: Extract<AirStateType, "Supremacy" | "Superiority">,
    chance_mod: AirSuperiorityStrikeChanceMod,
): number {
    const { ship: attacker_ship } = attacker_unit;

    const LoS_Fleet = calc_LoS_Fleet(attacker_fleet);
    const LoS_Equip = calc_LoS_Equip(attacker_ship.equip_slots);
    
    const Base_ship = air_state === 'Superiority'
        ? calc_Base_ship_Superiority(attacker_ship, LoS_Fleet, LoS_Equip)
        : calc_Base_ship_Supremacy(attacker_ship, LoS_Fleet, LoS_Equip);

    const flagship_mod = calc_flagship_mod(attacker_unit);

    return calc_trigger_rate_core(
        Base_ship,
        flagship_mod,
        chance_mod,
    );
}