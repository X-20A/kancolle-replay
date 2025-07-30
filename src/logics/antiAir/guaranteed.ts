import { AACI_DATAS } from "@/datas/battle/aaci";
import { AntiAirCutinType } from "./cutin/conditions";
import { PlaneEquip } from "@/models/equip/basic";

/// 最低保証

const calc_defence_guaranteed_base = (
    aaci_type: AntiAirCutinType | 'Misfire',
    unit: PlaneEquip,
    initial_guaranteed: number,
): number => {
    let n1 = initial_guaranteed;
    let n2 = 0;
    let guaranteed = initial_guaranteed + (aaci_type !== 'Misfire' ? AACI_DATAS[aaci_type].guaranteed_bonus: 0);

    if (aaci_type !== 'Misfire') {
        n1 = AACI_DATAS[aaci_type].flat_A;
        n2 = initial_guaranteed - AACI_DATAS[aaci_type].flat_A;
    }
    if (unit.anti_air_resist_ship < 1) {
        if (unit.anti_air_resist_ship <= 0.5) { // めちゃつよ射撃回避
            guaranteed = Math.max(
                0,
                initial_guaranteed - 3,
            );
        } else {
            guaranteed = Math.floor(n1 * 0.6 + n2);
        }
    }
    

    return guaranteed;
}

/**
 * 自艦隊による迎撃の最低保証撃墜数を返す
 * @param aaci_type 
 * @param unit 
 */
export function calc_player_defence_guaranteed(
    aaci_type: AntiAirCutinType | 'Misfire',
    unit: PlaneEquip,
): number {
    const PLAYER_INITIAL_GUARANTEE = 1;
    return calc_defence_guaranteed_base(
        aaci_type,
        unit,
        PLAYER_INITIAL_GUARANTEE,
    );
}

/**
 * 敵艦隊による迎撃の最低保証撃墜数を返す
 * @param aaci_type 
 * @param unit 
 */
export function calc_enemy_defence_guaranteed(
    aaci_type: AntiAirCutinType | 'Misfire',
    unit: PlaneEquip,
): number {
    // 敵艦隊でもなんらかのAACIが発動すれば+1
    // ACSim, Sortie Sim共通しているがソースは見つけられなかった
    const ENEMY_INITIAL_GUARANTEE = (aaci_type !== 'Misfire' ? 1 : 0);
    return calc_defence_guaranteed_base(
        aaci_type,
        unit,
        ENEMY_INITIAL_GUARANTEE,
    );
}