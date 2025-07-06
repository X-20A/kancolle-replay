import { brand, Brand } from ".";

export type PreAccuracy = Brand<number, 'PreAccuracy'>

export type WeightedAntiAir = Brand<number, 'WeightedAntiAir'>

export type AvgLbasProficiency = Brand<number, 'AvgLbasProficiency'>

export const brandOwnFleet =
    (value: number) => brand<number, 'PreAccuracy'>(value);

export const brandWeightedAntiAir =
    (value: number) => brand<number, 'WeightedAntiAir'>(value);

export const brandAvgLbasProficiency =
    (value: number) => brand<number, 'AvgLbasProficiency'>(value)