import { AACI_DATAS } from "@/datas/aaci";
import { AntiAirCutinType } from "./conditions";
import Big from "big.js";

type AaciRate = {
    CI_id: AntiAirCutinType,
    rate: Big,
}
export type ShipAaciRate = {
    AACI_rates: AaciRate[],
    misfire_rate: Big,
}

export function calc_AACI_rates(
    aaci_types: AntiAirCutinType[],
): ShipAaciRate {
    // 発動率の高い順に並べる
    const sorted: AaciRate[] = aaci_types
        .map((aaci_type) => ({
            CI_id: aaci_type,
            rate: new Big(AACI_DATAS[aaci_type].rate),
            priority: new Big(AACI_DATAS[aaci_type].priority),
        }))
        .sort((a, b) => a.priority.minus(b.priority).toNumber());

    const initial: ShipAaciRate = {
        AACI_rates: [],
        misfire_rate: new Big(1),
    };

    const AACI_rates = sorted.reduce((acc, { CI_id, rate }) => {
        const actual_rate = acc.misfire_rate.times(rate);
        const newRates = actual_rate.gt(0)
            ? [...acc.AACI_rates, { CI_id, rate: actual_rate }]
            : acc.AACI_rates;
        return {
            AACI_rates: newRates,
            misfire_rate: acc.misfire_rate.times(new Big(1).minus(rate)),
        };
    }, initial);

    return {
        AACI_rates: AACI_rates.AACI_rates.map(item => ({
            CI_id: item.CI_id,
            rate: item.rate,
        })),
        misfire_rate: AACI_rates.misfire_rate,
    };
}