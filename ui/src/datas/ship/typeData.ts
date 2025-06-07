import { DeepReadonly, TransportPowerModel } from "@/types";
import { ShipType } from "@/types/ship/ship";

/**
 * 装備種別ごとの諸元
 */
export type ShipTypeData = {
    /** 艦種ごとの輸送量(TP)定数 */
    transport_power: TransportPowerModel,
    
    // TODO: CI種別なんかもここがいいかな？
}

export type ShipTypeDatas = DeepReadonly<Record<ShipType, ShipTypeData>>;

export const SHIP_TYPE_DATAS: ShipTypeDatas = {
    [ShipType.DE]: {
        transport_power: {
            model_A: 0,
            model_B: 0,
            model_C: 0,
        },
    },
    [ShipType.DD]: {
        transport_power: {
            model_A: 5,
            model_B: 3.25,
            model_C: 4,
        },
    },
    [ShipType.CL]: {
        transport_power: {
            model_A: 2,
            model_B: 1.3,
            model_C: 1.6,
        },
    },
    [ShipType.CLT]: {
        transport_power: {
            model_A: 0,
            model_B: 0,
            model_C: 0,
        },
    },
    [ShipType.CA]: {
        transport_power: {
            model_A: 0,
            model_B: 0,
            model_C: 0,
        },
    },
    [ShipType.CAV]: {
        transport_power: {
            model_A: 4,
            model_B: 2.6,
            model_C: 3.2,
        },
    },
    [ShipType.CVL]: {
        transport_power: {
            model_A: 0,
            model_B: 0,
            model_C: 0,
        },
    },
    [ShipType.FBB]: {
        transport_power: {
            model_A: 0,
            model_B: 0,
            model_C: 0,
        },
    },
    [ShipType.BB]: {
        transport_power: {
            model_A: 0,
            model_B: 0,
            model_C: 0,
        },
    },
    [ShipType.BBV]: {
        transport_power: {
            model_A: 7,
            model_B: 4.55,
            model_C: 5.6,
        },
    },
    [ShipType.CV]: {
        transport_power: {
            model_A: 0,
            model_B: 0,
            model_C: 0,
        },
    },
    [ShipType.SS]: {
        transport_power: {
            model_A: 0,
            model_B: 0,
            model_C: 0,
        },
    },
    [ShipType.SSV]: {
        transport_power: {
            model_A: 1,
            model_B: 0.65,
            model_C: 0.8,
        },
    },
    [ShipType.AV]: {
        transport_power: {
            model_A: 9,
            model_B: 5.85,
            model_C: 7.2,
        },
    },
    [ShipType.LHA]: {
        transport_power: {
            model_A: 12,
            model_B: 7.8,
            model_C: 9.6,
        },
    },
    [ShipType.CVB]: {
        transport_power: {
            model_A: 0,
            model_B: 0,
            model_C: 0,
        },
    },
    [ShipType.AR]: {
        transport_power: {
            model_A: 0,
            model_B: 0,
            model_C: 0,
        },
    },
    [ShipType.AS]: {
        transport_power: {
            model_A: 7,
            model_B: 4.55,
            model_C: 5.6,
        },
    },
    [ShipType.CT]: {
        transport_power: {
            model_A: 6,
            model_B: 3.9,
            model_C: 4.8,
        },
    },
    [ShipType.AO]: {
        transport_power: {
            model_A: 15,
            model_B: 9.75,
            model_C: 12,
        },
    },
}