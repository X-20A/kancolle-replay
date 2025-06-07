import { EquipType } from "@/datas/equip/base/player";
import { TransportEquipDatas } from "@/datas/equip/transportEquip";
import { EquipId } from "@/types/brands/equip";
import { EquipMaster } from "./EquipMaster";

const findEquipById = (TransportEquipDatas: TransportEquipDatas, id: EquipId) =>
    TransportEquipDatas.find(data => data.equip_id === id);

const findEquipByTypeId = (TransportEquipDatas: TransportEquipDatas, type_id: EquipType) =>
    TransportEquipDatas.find(equip => equip.equip_type_id === type_id);

export const getTransportPowerModelA = (
    TransportEquipDatas: TransportEquipDatas,
    equip: EquipMaster,
): number =>
    findEquipByTypeId(TransportEquipDatas, equip.type_id)?.model_A ?? 0;

export const getTransportPowerModelB = (
    TransportEquipDatas: TransportEquipDatas,
    equip: EquipMaster,
): number =>
    findEquipById(TransportEquipDatas, equip.master_id)?.model_B ??
    findEquipByTypeId(TransportEquipDatas, equip.type_id)?.model_B ??
    0;

export const getTransportPowerModelC = (
    TransportEquipDatas: TransportEquipDatas,
    equip: EquipMaster,
): number =>
    findEquipById(TransportEquipDatas, equip.master_id)?.model_C ??
    findEquipByTypeId(TransportEquipDatas, equip.type_id)?.model_C ??
    0;
