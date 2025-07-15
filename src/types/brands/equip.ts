import { PlaneEquip } from "@/models/equip/basic";
import { brand, Brand } from ".";

/**
 * 装備ID
 */
export type EquipId = Brand<number, 'EquipId'>

export type EquipImprovementLv = Brand<number, 'EquipImprovementLv'>

export const brandEquipId =
    (value: number) => brand<number, 'EquipId'>(value);

export const equipImprovementLv =
    (value: number) => brand<number, 'EquipImprovementLv'>(value);
