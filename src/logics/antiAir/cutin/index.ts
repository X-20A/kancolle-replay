import { AACI_DATAS } from "@/datas/battle/aaci";
import { Brand } from "@/types/brands";
import { TriggeredAACIType } from "./conditions";

export type AACIMultiplier =
    Brand<number, 'AACIMultiplier'>

export function calc_AACI_multiplier(
    triggerd_aaci_type: TriggeredAACIType,
): AACIMultiplier {
    return triggerd_aaci_type === 'Misfire'
        ? 1 as AACIMultiplier
        : AACI_DATAS[triggerd_aaci_type].mod as AACIMultiplier;
}