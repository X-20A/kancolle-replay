import { EquippedShip } from "@/models/ship/equipped";
import { AirStateType } from "../airSuperiority/compare";
import { Rand } from "@/effects/random";
import { Node } from "@/models/Node";
import { calc_phase1_success_rate } from "./trigger";
import { EquipSlot } from "@/models/ship/EquipBuilt";
import { is_plane_equip, PlaneEquip } from "@/models/equip/basic";
import { calc_select_contact_plane } from "./selection";
import { LBAS, Squadron } from "@/models/LBAS";
import { PhaseType } from "@/core/phases/phase";

/// 触接

/**
 * 艦群から触接に参加できる機体群を返す
 * @param ships 
 * @returns 
 */
const calc_candidate_slots_from_ships = (
    ships: EquippedShip[],
): EquipSlot[] => {
    return ships.flatMap(ship =>
        ship.equip_slots.flatMap(slot => {
            const equip = slot.equip;
            if (
                !equip ||
                !is_plane_equip(equip)
            ) return [];

            return equip.flags.can_contact
                ? [slot]
                : [];
        })
    );
}

/**
 * 基地航空隊から触接に参加できる機体群を返す
 * @param lbas 
 * @returns 
 */
const calc_candidate_slots_from_LBAS = (
    lbas: LBAS,
): Squadron[] => {
    return lbas.squadrons.flatMap(squadron => {
        const plane = squadron.equip;
        return plane.flags.can_contact
            ? [squadron]
            : [];
    });
}

/**
 * 機体の触接補正値を返す
 * @param plane 
 * @returns 
 */
const calc_plane_contact_mod = (
    plane: PlaneEquip,
): number => {
    // TODO: この法則がACSimの個別処理と一致するか確認
    const accuracy = plane.natural_addition.shell_accuracy;
    if (accuracy >= 3) return 1.2;
    if (accuracy === 2) return 1.17;
    return 1.12;
}

export type ValidContactAirState =
    Exclude<AirStateType, 'Parity' | 'Incapability'>

/**
 * 艦隊の触接補正値を返す
 * @param node 
 * @param air_state 
 * @param ships 
 * @param rand 
 * @returns 
 */
export function calc_fleet_airstrike_contact_mod(
    node: Node,
    air_state: AirStateType,
    // どの艦を対象にするかも関数内で判定したほうがいいかも
    // これとば別の関数にしたほうがテストはしやすいか？
    ships: EquippedShip[],
    rand: Rand,
): number {
    if (
        !node.is_detection_success ||
        air_state === 'Parity' ||
        air_state === 'Incapability'
    ) return 1;

    const candidate_slots = calc_candidate_slots_from_ships(ships);

    const phase1_success_rate =
        calc_phase1_success_rate(candidate_slots, air_state);

    if (rand.next() >= phase1_success_rate) return 1;

    const selected_plane = calc_select_contact_plane(
        candidate_slots,
        air_state,
        rand,
    );

    if (selected_plane === 'None') return 1;

    return calc_plane_contact_mod(selected_plane);
}

/**
 * 基地航空隊の触接補正値を返す
 */
export function calc_LBAS_contact_mod(
    phase_type: PhaseType,
    node: Node,
    air_state: AirStateType,
    lbas: LBAS,
    rand: Rand,
): number {
    if (
        phase_type === 'Jet_LBAS' ||
        phase_type === 'JET_strike'
    ) throw new Error(
        '基地墳式強襲 | 墳式強襲フェイズでは触接処理を呼び出してはいけません'
    );

    if (
        !node.is_detection_success ||
        air_state === 'Parity' ||
        air_state === 'Incapability'
    ) return 1;

    const candidate_slots = calc_candidate_slots_from_LBAS(lbas);

    const phase1_success_rate =
        calc_phase1_success_rate(candidate_slots, air_state);

    if (rand.next() >= phase1_success_rate) return 1;

    const selected_plane = calc_select_contact_plane(
        candidate_slots,
        air_state,
        rand,
    );

    if (selected_plane === 'None') return 1;

    return calc_plane_contact_mod(selected_plane);
}