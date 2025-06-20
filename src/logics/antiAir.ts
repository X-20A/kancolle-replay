import { Rand } from "@/effects/random";
import { concat_fleet_ships, Fleet } from "@/models/fleet/Fleet"
import { LBAS } from "@/models/LBAS";
import { EquippedShip, is_player_ship } from "@/models/ship/equipped"
import { EnemyFleet } from "@/types/brands/fleet";
import { JetOnlyLBAS } from "./aerialCombat/jetAssault";
import { Equip } from "@/models/equip/basic";
import { AACITriggerEquipType } from "@/types/equip/player";



/**
 * 艦隊から対空射撃に参加可能な艦を抽出して返す
 * @param fleet 
 * @returns 
 */
const extract_defender_ships = (fleet: Fleet): EquippedShip[] => {
    return concat_fleet_ships(fleet).filter(ship =>
        is_player_ship(ship) || !ship.flags.is_faraway
    );
}

/**
 * 装備倍率を返す    
 * NOTE: wikiでは4,6,3となっているが、それは艦これ改解析前の検証であるらしい
 * NOTE: どちらにせよ、割合撃墜と固定撃墜では帳尻が合う
 * @param equip 
 * @returns 
 */
const calc_equip_type_mod = (
    equip: Equip,
): number => {
    console.log('a_type: ', equip.aaci_trigger_type);
    switch (equip.type_id) {
        case AACITriggerEquipType.A_HAGUN:
        case AACITriggerEquipType.A_HAFD:
        case AACITriggerEquipType.A_AAFD:
            return 2;
        case AACITriggerEquipType.A_AAGUN:
            return 3;
        case AACITriggerEquipType.A_AIRRADAR:
            return 1.5;
        default:
            return 0;
    }
}

/** N: 装備倍率 ×(装備対空値) の合計を返す */
const calc_total_N = (
    equips: Equip[],
): number => {
    
    return equips.reduce((total, equip) => {
        console.log('mod: ', calc_equip_type_mod(equip));
        return total
            + calc_equip_type_mod(equip) * equip.natural_addition.anti_air
    }, 0);
}

/**
 * 艦の加重対空値を返す
 */
export function calc_weighted_anti_air(
    ship: EquippedShip,
): number {
    const A = ship.equips.length === 0 ? 1 : 2;
    if (is_player_ship(ship)) {
        console.log('improve: ', (ship.total_equip_improvement_addition.self_anti_air));
        const X = ship.naked_status.anti_air
            + calc_total_N(ship.equips)
            + (ship.total_equip_improvement_addition.self_anti_air)
            + (0.75 * ship.total_equip_bonus_addition.anti_air);

        return A * Math.floor(X / A);
    } else {
        const X = ship.naked_status.anti_air + calc_total_N(ship.equips);
        return A * Math.floor(X / A);
    }
}

/**
 * 割合撃墜数を返す
 */
const calc_prop_shotdown_count = (

): number => {

}

/**
 * 対空射撃を受けた後のLBASを返す
 * @param lbas 
 * @param enemy_fleet 
 * @param rand 
 */
export function calc_anti_air_fired_lbas<T extends LBAS | JetOnlyLBAS>(
    lbas: T,
    enemy_fleet: EnemyFleet,
    rand: Rand,
): T {
    const defender_ships = extract_defender_ships(enemy_fleet);

    lbas.slot_counts.map((slot_count, index) => {
        if (slot_count === 0) return slot_count;

        const defender_ship =
            defender_ships[Math.floor(rand.next() * defender_ships.length)];

        /** 割合撃墜数 */
        const prop_shotdown_count = rand.next() < 0.5 // 発動率
            ? calc_prop_shotdown_count()
            : 0;
    });
}