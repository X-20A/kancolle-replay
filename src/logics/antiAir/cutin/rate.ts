import { AACI_DATAS } from "@/datas/aaci";
import { AntiAirCutinType } from "./conditions";
import Big from "big.js";
import { RandGenerator } from "@/effects/random";

/**
 * AACIを優先度で比較して返す(より値の小さい順)
 * @param a 
 * @param b 
 * @returns 
 */
const priority_comparator = (
    a: AntiAirCutinType,
    b: AntiAirCutinType,
) => {
    return AACI_DATAS[a].priority - AACI_DATAS[b].priority
}

/**
 * 発動可能なAACIの配列から実際に発動したAACIのIDを返す    
 * 発動したものが無ければ 'Misfire' を返す
 * @param aaci_types 
 * @param rand 
 * @returns 
 */
export function calc_triggered_AACI(
    aaci_types: AntiAirCutinType[],
    rand: RandGenerator,
): AntiAirCutinType | 'Misfire' {
    const triggered =
        aaci_types
        .sort(priority_comparator)
        .find(aaci_type => rand.next() < AACI_DATAS[aaci_type].rate);

    return triggered
        ? triggered
        : 'Misfire'
}

type AaciRateBuilt = {
    CI_id: AntiAirCutinType,
    rate: Big,
}
export type ShipAaciRate = {
    AACI_rates: AaciRateBuilt[],
    misfire_rate: Big,
}

/**
 * 表示用に百分率で各AACIが占める発動率を返す
 * @param aaci_types 
 * @returns 
 */
export function calc_AACI_rates(
    aaci_types: AntiAirCutinType[],
): ShipAaciRate {
    const sorted_AACI_built: AaciRateBuilt[] =
        aaci_types
        .sort(priority_comparator)
        .map((aaci_type) => ({
            CI_id: aaci_type,
            rate: new Big(AACI_DATAS[aaci_type].rate),
        }));

    const initial: ShipAaciRate = {
        AACI_rates: [],
        misfire_rate: new Big(1),
    };

    return sorted_AACI_built.reduce((acc, { CI_id, rate }) => {
        const actual_rate = acc.misfire_rate.times(rate);
        const newRates = actual_rate.gt(0)
            ? [...acc.AACI_rates, { CI_id, rate: actual_rate }]
            : acc.AACI_rates;
        return {
            AACI_rates: newRates,
            misfire_rate: acc.misfire_rate.times(new Big(1).minus(rate)),
        };
    }, initial);
}