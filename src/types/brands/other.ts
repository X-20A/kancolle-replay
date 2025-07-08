import { brand, Brand } from ".";

export type PreAccuracy = Brand<number, 'PreAccuracy'>

export type WeightedAntiAir = Brand<number, 'WeightedAntiAir'>

export type AvgLbasProficiency = Brand<number, 'AvgLbasProficiency'>

export type RandValue = Brand<number, 'RandValue'>

export const brandPreAccuracy =
    (value: number) => brand<number, 'PreAccuracy'>(value);

export const brandWeightedAntiAir =
    (value: number) => brand<number, 'WeightedAntiAir'>(value);

export const brandAvgLbasProficiency =
    (value: number) => brand<number, 'AvgLbasProficiency'>(value)

export const brandRandValue =
    (value: number) => brand<number, 'RandValue'>(value);