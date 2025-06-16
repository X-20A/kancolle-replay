import { DeepReadonly, TransportPowerModel } from "@/types";
import { ShipTypeBase } from "@/types/ship/ship";

/**
 * 装備種別ごとの諸元
 */
export type ShipTypeData = {
    /** 艦種ごとの輸送量(TP)定数 */
    transport_power: TransportPowerModel,
    
    // TODO: CI種別なんかもここがいいかな？
}

export type ShipTypeDatas = DeepReadonly<Record<ShipTypeBase, ShipTypeData>>;

export const SHIP_TYPE_DATAS: ShipTypeDatas = {
    "DE": {
        transport_power: {
            model_A: 0,
            model_B: 0,
            model_C: 0,
        },
    },
    "DD": {
        transport_power: {
            model_A: 5,
            model_B: 3.25,
            model_C: 4,
        },
    },
    "CL": {
        transport_power: {
            model_A: 2,
            model_B: 1.3,
            model_C: 1.6,
        },
    },
    "CLT": {
        transport_power: {
            model_A: 0,
            model_B: 0,
            model_C: 0,
        },
    },
    "CA": {
        transport_power: {
            model_A: 0,
            model_B: 0,
            model_C: 0,
        },
    },
    "CAV": {
        transport_power: {
            model_A: 4,
            model_B: 2.6,
            model_C: 3.2,
        },
    },
    "CVL": {
        transport_power: {
            model_A: 0,
            model_B: 0,
            model_C: 0,
        },
    },
    "FBB": {
        transport_power: {
            model_A: 0,
            model_B: 0,
            model_C: 0,
        },
    },
    "BB": {
        transport_power: {
            model_A: 0,
            model_B: 0,
            model_C: 0,
        },
    },
    "BBV": {
        transport_power: {
            model_A: 7,
            model_B: 4.55,
            model_C: 5.6,
        },
    },
    "CV": {
        transport_power: {
            model_A: 0,
            model_B: 0,
            model_C: 0,
        },
    },
    "SS": {
        transport_power: {
            model_A: 0,
            model_B: 0,
            model_C: 0,
        },
    },
    "SSV": {
        transport_power: {
            model_A: 1,
            model_B: 0.65,
            model_C: 0.8,
        },
    },
    "AV": {
        transport_power: {
            model_A: 9,
            model_B: 5.85,
            model_C: 7.2,
        },
    },
    "LHA": {
        transport_power: {
            model_A: 12,
            model_B: 7.8,
            model_C: 9.6,
        },
    },
    "CVB": {
        transport_power: {
            model_A: 0,
            model_B: 0,
            model_C: 0,
        },
    },
    "AR": {
        transport_power: {
            model_A: 0,
            model_B: 0,
            model_C: 0,
        },
    },
    "AS": {
        transport_power: {
            model_A: 7,
            model_B: 4.55,
            model_C: 5.6,
        },
    },
    "CT": {
        transport_power: {
            model_A: 6,
            model_B: 3.9,
            model_C: 4.8,
        },
    },
    "AO": {
        transport_power: {
            model_A: 15,
            model_B: 9.75,
            model_C: 12,
        },
    },
}