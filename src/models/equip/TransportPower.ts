import { EquipType } from "@/datas/equip/base/player";
import { TRANSPORT_EQUIP_DATAS } from "@/datas/equip/transportEquip";
import { EquipId } from "@/types/brands/equip";
import { PlayerEquipMaster } from "./master";

export type TransportAddition = {
    model_A: number,
    model_B: number,
    model_C: number,
}

const findEquipById = (id: EquipId) =>
    TRANSPORT_EQUIP_DATAS.find(data => data.equip_id === id);

const findEquipByTypeId = (type_id: EquipType) =>
    TRANSPORT_EQUIP_DATAS.find(equip => equip.equip_type_id === type_id);

const calcTransportPowerModelA = (
    equip: PlayerEquipMaster,
): number =>
    findEquipByTypeId(equip.type_id)?.model_A ?? 0;

const calcTransportPowerModelB = (
    equip: PlayerEquipMaster,
): number =>
    findEquipById(equip.master_id)?.model_B ??
    findEquipByTypeId(equip.type_id)?.model_B ??
    0;

const calcTransportPowerModelC = (
    equip: PlayerEquipMaster,
): number =>
    findEquipById(equip.master_id)?.model_C ??
    findEquipByTypeId(equip.type_id)?.model_C ??
    0;

export function deriveTransportAddition(
    equip_master: PlayerEquipMaster,
): TransportAddition {
    const model_A = calcTransportPowerModelA(equip_master);
    const model_B = calcTransportPowerModelB(equip_master);
    const model_C = calcTransportPowerModelC(equip_master);

    return {
        model_A,
        model_B,
        model_C,
    }
}