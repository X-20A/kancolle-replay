import { EquipType } from "@/datas/equip/base/player";
import { Equip, is_plane_equip, PlaneEquip } from "@/models/equip/Equip"
import { PlayerShip } from "@/models/ship/Ship";

export type PlaneProficiencyRank =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7

export function calc_plane_proficiency_rank(plane_proficiency: number): PlaneProficiencyRank {
    return (
        plane_proficiency >= 100 ? 7 :
            plane_proficiency >= 85 ? 6 :
                plane_proficiency >= 70 ? 5 :
                    plane_proficiency >= 55 ? 4 :
                        plane_proficiency >= 40 ? 3 :
                            plane_proficiency >= 25 ? 2 :
                                plane_proficiency >= 10 ? 1 :
                                    0
    );
}

/**
 * 熟練度によるボーナス制空値を返す
 * @param equip 
 * @returns 
 */
function calc_plane_proficiency_flat(
    equip: Equip,
): number {
    if (!is_plane_equip(equip)) throw new Error('航空機でない装備の航空機熟練度ボーナスは計算できません');

    // 基本ボーナス計算
    const calculateBaseBonus = (equip: PlaneEquip): number => {
        const plane_proficiency_rank = equip.plane_proficiency_rank;
        const type_id = equip.type_id;

        const is_fighter = [
            EquipType.FIGHTER,
            EquipType.SEAPLANE_FIGHTER,
            EquipType.INTERCEPTOR
        ].includes(type_id) || equip.flags.is_20th_family;

        const is_seaplane_bomber = type_id === EquipType.SEAPLANE_BOMBER;

        return (
            plane_proficiency_rank >= 7 ? (is_fighter ? 22 : is_seaplane_bomber ? 6 : 0) :
                plane_proficiency_rank >= 5 ? (is_fighter ? 14 : is_seaplane_bomber ? 3 : 0) :
                    plane_proficiency_rank >= 4 ? (is_fighter ? 9 : is_seaplane_bomber ? 1 : 0) :
                        plane_proficiency_rank >= 3 ? (is_fighter ? 5 : is_seaplane_bomber ? 1 : 0) :
                            plane_proficiency_rank >= 2 ? (is_fighter ? 2 : is_seaplane_bomber ? 1 : 0) : 0
        );
    };

    // 内部熟練度ボーナス計算
    const calculateInternalBonus =
        (plane_proficiency: number): number => Math.sqrt(plane_proficiency / 10);

    // メイン処理
    return calculateBaseBonus(equip) + calculateInternalBonus(equip.plane_proficiency);
}


export function calc_ship_air_superiority_power(ship: PlayerShip): number {
    return ship.equips.reduce((total, equip, index) => {
        if (!equip.flags.is_involve_air_superiority) return total;

        const equip_air_superiority_power =
            equip.natural_addition.anti_air
            + equip.improvement_addition.air_superiority;

        const remain_plane_count = ship.slots.edited[index];
        const plane_proficiency_flat = calc_plane_proficiency_flat(equip);

        return total + (
            equip_air_superiority_power * Math.sqrt(remain_plane_count)
            + plane_proficiency_flat
        );
    }, 0);
}