import { PlayerEquipType } from "@/datas/equip/base/player";
import { TransportEquipDatas } from "@/datas/equip/transportEquip";
import { EquipId } from "@/types/brands/equip";
import { EquipMaster } from "./EquipMaster";

export type TransportAddition = {
    model_A: number,
    model_B: number,
    model_C: number,
}

const findEquipById = (transport_equip_datas: TransportEquipDatas, id: EquipId) =>
    transport_equip_datas.find(data => data.equip_id === id);

const findEquipByTypeId = (transport_equip_datas: TransportEquipDatas, type_id: PlayerEquipType) =>
    transport_equip_datas.find(equip => equip.equip_type_id === type_id);

const calcTransportPowerModelA = (
    transport_equip_datas: TransportEquipDatas,
    equip: EquipMaster,
): number =>
    findEquipByTypeId(transport_equip_datas, equip.type_id)?.model_A ?? 0;

const calcTransportPowerModelB = (
    transport_equip_datas: TransportEquipDatas,
    equip: EquipMaster,
): number =>
    findEquipById(transport_equip_datas, equip.master_id)?.model_B ??
    findEquipByTypeId(transport_equip_datas, equip.type_id)?.model_B ??
    0;

const calcTransportPowerModelC = (
    transport_equip_datas: TransportEquipDatas,
    equip: EquipMaster,
): number =>
    findEquipById(transport_equip_datas, equip.master_id)?.model_C ??
    findEquipByTypeId(transport_equip_datas, equip.type_id)?.model_C ??
    0;

export function deriveTransportAddition(
    transport_equip_datas: TransportEquipDatas,
    equip_master: EquipMaster,
): TransportAddition {
    const model_A = calcTransportPowerModelA(transport_equip_datas, equip_master);
    const model_B = calcTransportPowerModelB(transport_equip_datas, equip_master);
    const model_C = calcTransportPowerModelC(transport_equip_datas, equip_master);

    return {
        model_A,
        model_B,
        model_C,
    }
}