import { ABYSSAL_EQUIP_DATAS } from "@/datas/equip/base/abyssal";
import { EQUIP_TYPE, EquipType, PLAYER_EQUIP_DATAS } from "@/datas/equip/base/player";
import { ABYSSAL_SHIP_DATAS } from "@/datas/ship/abyssal";
import { PLAYER_SHIP_DATAS } from "@/datas/ship/player";
import { AbyssalEquipId } from "@/types/equip/abyssalId";
import { AbyssalShipId } from "@/types/ship/abyssalId";
import { SHIP_TYPE, ShipType } from "@/types/ship/ship";
import axios from "axios";
import { describe, expect, it } from "vitest"

function calc_ship_type_key(value: number): ShipType | undefined {
    return (Object.keys(SHIP_TYPE) as Array<keyof typeof SHIP_TYPE>).find(
        key => SHIP_TYPE[key] === value
    );
}

function calc_equip_type_key(value: number): EquipType | undefined {
    return (Object.keys(EQUIP_TYPE) as Array<keyof typeof EQUIP_TYPE>).find(
        key => EQUIP_TYPE[key] === value
    );
}

type MasterShip = {
    id: number,
    name: string,
    type: number,
    min_scout: number,
    scout: number,
}
type MasterItem = {
    id: number,
    name: string,
    type: number,
    scout: number,
}

type MissingShip = {
    id: number,
    ship_name: string,
    type: ShipType | undefined,
    seek: number,
    seek2: number,
}
type MismatchShipParam = {
    param: 'name' | 'type' | 'seek' | 'seek2',
    ship_name: string,
    master_param: number | string,
}

type MissingEquip = {
    id: number,
    name: string,
    seek: number,
    equip_type: EquipType | undefined,
}
type MismatchEquipParam = {
    name: string,
    param: 'type' | 'seek',
    master_param: number | string,
}

// Cors回避のために別途プロキシサーバを起動してから
const response = await axios.get(
    'http://localhost:3000/proxy'
);

describe('データ系テスト', () => {
    it('data-test: 制空シミュのデータと照合して艦や装備に抜けや不一致が無いか確認', async () => {
        const master = response.data;

        const ac_ships: MasterShip[] = master.ships;
        const ac_items: MasterItem[] = master.items;

        const missing_ships = [] as MissingShip[];
        const mismatch_ship_params = [] as MismatchShipParam[];
        for (const ac_ship of ac_ships) { // 艦データ照合
            const id = ac_ship.id;

            const ss_ship = PLAYER_SHIP_DATAS[id];
            if (!ss_ship) {
                missing_ships.push({
                    id: id,
                    ship_name: ac_ship.name,
                    type: calc_ship_type_key(ac_ship.type),
                    seek: ac_ship.min_scout,
                    seek2: ac_ship.scout,
                });
                continue;
            }

            if (ac_ship.name !== ss_ship.name_jp) {
                mismatch_ship_params.push({
                    param: 'name',
                    ship_name: ac_ship.name,
                    master_param: ac_ship.name,
                });
            }

            if (calc_ship_type_key(ac_ship.type) !== ss_ship.type) {
                mismatch_ship_params.push({
                    param: 'type',
                    ship_name: ac_ship.name,
                    master_param: ac_ship.type,
                });
            }

            if (ac_ship.min_scout !== ss_ship.LOSbase) {
                mismatch_ship_params.push({
                    param: 'seek',
                    ship_name: ac_ship.name,
                    master_param: ac_ship.min_scout,
                });
            }

            if (ac_ship.scout !== ss_ship.LOS) {
                mismatch_ship_params.push({
                    param: 'seek2',
                    ship_name: ac_ship.name,
                    master_param: ac_ship.scout,
                });
            }
        }
        if (missing_ships.length) console.log('艦に不足: ', missing_ships);
        if (mismatch_ship_params.length) console.log('艦パラメータ不一致: ', mismatch_ship_params);

        // 空であることを確認
        expect(0).toBe(missing_ships.length);
        expect(0).toBe(mismatch_ship_params.length);

        const missing_equips = [] as MissingEquip[];
        const mismatch_equip_params = [] as MismatchEquipParam[];
        for (const ac_item of ac_items) { // 装備データ照合
            const id = ac_item.id;
            if (id > 1500) continue;
            
            const ss_equip = PLAYER_EQUIP_DATAS[id];
            if (!ss_equip) {
                missing_equips.push({
                    id: id,
                    name: ac_item.name,
                    seek: ac_item.scout,
                    equip_type: calc_equip_type_key(ac_item.type),
                });
                continue;
            }

            if (
                calc_equip_type_key(ac_item.type) !== ss_equip.type &&
                ss_equip.type !== 'MAIN_GUN_XL' && // L | XL をACSimでは区別しない
                ss_equip.type !== 'SECONDARY_GUN_L' &&
                ss_equip.type !== 'CARRIER_SCOUT_2' &&
                ss_equip.type !== 'FIGHTER_BOMBER' &&
                ss_equip.type !== 'BARRAGE_BALLOON' && // ACSimでは煙幕カテゴリ
                ss_equip.type !== 'RADAR_XL'
            ) {
                mismatch_equip_params.push({
                    name: ac_item.name,
                    param: 'type',
                    master_param: ac_item.type,
                });
            }

            if (ac_item.scout !== (ss_equip.LOS || 0)) {
                mismatch_equip_params.push({
                    name: ac_item.name,
                    param: 'seek',
                    master_param: ac_item.scout,
                });
            }
        }

        if (missing_equips.length) console.log('装備に不足: ', missing_equips);
        if (mismatch_equip_params.length) console.log('装備パラメータ不一致: ', mismatch_equip_params);

        // 空であることを確認
        expect(0).toBe(missing_equips.length);
        expect(0).toBe(mismatch_equip_params.length);
    });

    it('data-test: 制空シミュのデータと照合して艦や装備に抜けや不一致が無いか確認', async () => {
        const master = response.data;

        const ac_ships: MasterShip[] = master.ships;
        const ac_items: MasterItem[] = master.items;

        const missing_ships = [] as MissingShip[];
        const mismatch_ship_params = [] as MismatchShipParam[];
        for (const ac_ship of ac_ships) { // 艦データ照合
            const id = ac_ship.id;
            if (id < 1500) continue;

            const ss_ship = ABYSSAL_SHIP_DATAS[id as AbyssalShipId];
            if (!ss_ship) {
                missing_ships.push({
                    id: id,
                    ship_name: ac_ship.name,
                    type: calc_ship_type_key(ac_ship.type),
                    seek: ac_ship.min_scout,
                    seek2: ac_ship.scout,
                });
                continue;
            }

            if (ac_ship.name !== ss_ship.name_jp) {
                mismatch_ship_params.push({
                    param: 'name',
                    ship_name: ac_ship.name,
                    master_param: ac_ship.name,
                });
            }

            if (calc_ship_type_key(ac_ship.type) !== ss_ship.type) {
                mismatch_ship_params.push({
                    param: 'type',
                    ship_name: ac_ship.name,
                    master_param: ac_ship.type,
                });
            }

            if (ac_ship.scout !== ss_ship.LOS) {
                mismatch_ship_params.push({
                    param: 'seek',
                    ship_name: ac_ship.name,
                    master_param: ac_ship.min_scout,
                });
            }
        }
        if (missing_ships.length) console.log('艦に不足: ', missing_ships);
        if (mismatch_ship_params.length) console.log('艦パラメータ不一致: ', mismatch_ship_params);

        // 空であることを確認
        expect(0).toBe(missing_ships.length);
        expect(0).toBe(mismatch_ship_params.length);

        const missing_equips = [] as MissingEquip[];
        const mismatch_equip_params = [] as MismatchEquipParam[];
        for (const ac_item of ac_items) { // 装備データ照合
            const id = ac_item.id;
            if (id < 1500) continue;

            const ss_equip = ABYSSAL_EQUIP_DATAS[id as AbyssalEquipId];
            if (!ss_equip) {
                missing_equips.push({
                    id: id,
                    name: ac_item.name,
                    seek: ac_item.scout,
                    equip_type: calc_equip_type_key(ac_item.type),
                });
                continue;
            }

            if (
                calc_equip_type_key(ac_item.type) !== ss_equip.type &&
                ss_equip.type !== 'MAIN_GUN_XL' && // L | XL をACSimでは区別しない
                ss_equip.type !== 'SECONDARY_GUN_L' &&
                ss_equip.type !== 'CARRIER_SCOUT_2' &&
                ss_equip.type !== 'FIGHTER_BOMBER' &&
                ss_equip.type !== 'BARRAGE_BALLOON' && // ACSimでは煙幕カテゴリ
                ss_equip.type !== 'RADAR_XL'
            ) {
                mismatch_equip_params.push({
                    name: ac_item.name,
                    param: 'type',
                    master_param: ac_item.type,
                });
            }

            if (ac_item.scout !== (ss_equip.LOS || 0)) {
                mismatch_equip_params.push({
                    name: ac_item.name,
                    param: 'seek',
                    master_param: ac_item.scout,
                });
            }
        }

        if (missing_equips.length) console.log('装備に不足: ', missing_equips);
        if (mismatch_equip_params.length) console.log('装備パラメータ不一致: ', mismatch_equip_params);

        // 空であることを確認
        expect(0).toBe(missing_equips.length);
        expect(0).toBe(mismatch_equip_params.length);
    });
});