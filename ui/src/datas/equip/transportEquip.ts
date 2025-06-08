import { PlayerEquipType } from "./base/player";

type TransportEquipData = {
    equip_id?: number;
    equip_type_id?: number;
    model_A?: number; // calcTransportPowerModelA()
    model_B?: number; // calcTransportPowerModelB()
    model_C?: number; // calcTransportPowerModelC()
}

export type TransportEquipDatas = TransportEquipData[]

export const TRANSPORT_EQUIPS: TransportEquipDatas = [
    // equip_type_idベース
    {
        equip_type_id: PlayerEquipType.LANDING_CRAFT,
        model_A: 8,
        model_B: 5.2,
        model_C: 6.4,
    },
    {
        equip_type_id: PlayerEquipType.DRUM,
        model_A: 5,
        model_B: 3.25,
        model_C: 4,
    },
    {
        equip_type_id: PlayerEquipType.RATION,
        model_A: 1,
        model_B: 0.65,
        model_C: 0.8,
    },
    {
        equip_type_id: PlayerEquipType.LANDING_TANK,
        model_A: 2,
    },

    // equip_idベース（装備個別）
    {
        equip_id: 230, // 特大発動艇+戦車第11連隊
        model_B: 46.2,
        model_C: 18.4,
    },
    {
        equip_id: 449, // 特大発動艇+一式砲戦車
        model_B: 40.2,
        model_C: 28.4,
    },
    {
        equip_id: 499,// 陸軍歩兵部隊+チハ改
        model_B: 38,
        model_C: 13,
    },
    {
        equip_id: 514, // 特大発動艇+Ⅲ号戦車J型
        model_B: 32.2,
        model_C: 21.4,
    },
    {
        equip_id: 495, // 特大発動艇+チハ改
        model_B: 28.2,
        model_C: 19.4,
    },
    {
        equip_id: 482, // 特大発動艇+Ⅲ号戦車(北アフリカ仕様)
        model_B: 27.2,
        model_C: 16.4,
    },
    {
        equip_id: 355, // M4A1 DD
        model_B: 24.2,
        model_C: 20.4,
    },
    {
        equip_id: 498, // 九七式中戦車 新砲塔(チハ改)
        model_B: 23,
        model_C: 10,
    },
    {
        equip_id: 494, // 特大発動艇+チハ
        model_B: 22.2,
        model_C: 17.4,
    },
    {
        equip_id: 436, // 大発動艇(II号戦車/北アフリカ仕様)
        model_B: 21.2,
        model_C: 14.4,
    },
    {
        equip_id: 497, // 九七式中戦車(チハ)
        model_B: 17,
        model_C: 8,
    },
    {
        equip_id: 496, // 陸軍歩兵部隊
        model_B: 15,
        model_C: 5,
    },
    {
        equip_id: 166, // 大発動艇(八九式中戦車&陸戦隊)
        model_B: 14.2,
        model_C: 12.4,
    },
    {
        equip_id: 167, // 特二式内火艇
        model_B: 9.3,
        model_C: 19.6,
    },
    {
        equip_id: 526, // 特四式内火艇改
        model_B: 8.3,
        model_C: 19.6,
    },
    {
        equip_id: 525, // 特四式内火艇
        model_B: 6.3,
        model_C: 16.6,
    },
];
  