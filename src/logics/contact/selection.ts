import { is_player_plane_equip, PlaneEquip } from "@/models/equip/basic";
import { ValidContactAirState } from ".";
import { RandGenerator } from "@/effects/random";
import { EquipSlot, is_equip_exsist } from "@/models/ship/EquipSlot";
import { LbasSquadron } from "@/models/LBAS";

/**
 * 制空状態による補正値を返す
 * @param air_state 
 * @returns 
 */
const calc_air_state_mod = (
    air_state: ValidContactAirState,
): number => {
    if (air_state === 'Superiority') return 14;
    if (air_state === 'Supremacy') return 16;
    return 18; // air_state === 'Denial'
}

/**
 * 機体群から実際に触接を担当する機体を返す　　　　
 * 該当機体がなければ　'None' を返す
 * @param slots 
 * @param air_state 
 * @param rand 
 * @returns 
 */
export function calc_select_contact_plane(
    slots: EquipSlot[] | LbasSquadron[],
    air_state: ValidContactAirState,
    rand: RandGenerator,
): PlaneEquip | 'None' {
    const air_state_mod = calc_air_state_mod(air_state);

    const selected_plane = slots
        .flatMap(slot => {
            return is_equip_exsist(slot.equip) && is_player_plane_equip(slot.equip)
                ? slot.equip
                : []
        })
        .sort((a, b) => b.natural_addition.shell_accuracy - a.natural_addition.shell_accuracy)
        .find(plane => {
            return rand.next() < plane.natural_addition.los / air_state_mod
        });

    return selected_plane
        ? selected_plane
        : 'None';
}