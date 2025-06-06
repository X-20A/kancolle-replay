import { StatusComponent } from "@/types";
import { ShipLv } from "@/types/brands/ship";
import { ShipDatas, ShipFlags, ShipType } from "@/types/ship";

/** 装備を持ってない && 運・対潜 未改修状態の艦諸元 */
export type NakedPlayerShip = {
    name_en: string,
    name_jp: string,
    type: ShipType,
    status: StatusComponent,
    flags: ShipFlags,
}

function calcStatusFromLevel(
    min: number,
    max: number,
    level: ShipLv,
): number {
    if (min >= max) throw new Error('最小値が最大値以上になっています');

    if (level === 99) return max;
    if (level === 1) return min;
    
    return Math.floor((max - min) * (level / 99) + min);
}

export function createNakedPlayerShip(
    master_id: number,
    ship_lv: number,
    ship_datas: ShipDatas,
): NakedPlayerShip {
    const ship_data = ship_datas[master_id];
    if (!ship_data) throw new Error(`id: ${master_id}の艦が見つかりませんでした`);

    const name_en = ship_data.name;
    const name_jp = ship_data.nameJP;
    const type = ship_data.type;

    const status: StatusComponent = {
        hp: ship_data.HP,
        fire_power: ship_data.FP,
        armor: ship_data.AR,
        torpedo_power: ship_data.TP,
        evasion: calcStatusFromLevel(ship_data.EVbase, ship_data.EV, ship_lv),
        anti_air: ship_data.AA,
        asw: calcStatusFromLevel(ship_data.ASWbase, ship_data.ASW, ship_lv),
        los: calcStatusFromLevel(ship_data.LOSbase, ship_data.LOS, ship_lv),
        luck: ship_data.LUK,
        accuracy: 0,
    }

    const flags: ShipFlags = {
        
    };

    return {
        name_en,
        name_jp,
        type,
        status,
        flags,
    }
}