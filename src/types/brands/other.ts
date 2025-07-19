import { brand, Brand } from ".";

export type WeightedAntiAir = Brand<number, 'WeightedAntiAir'>

export type AvgProficiency = Brand<number, 'AvgProficiency'>

export type RandValue = Brand<number, 'RandValue'>

export const brandPreAccuracy =
    (value: number) => brand<number, 'PreAccuracy'>(value);

export const brandWeightedAntiAir =
    (value: number) => brand<number, 'WeightedAntiAir'>(value);

export const brandAvgProficiency =
    (value: number) => brand<number, 'AvgProficiency'>(value)

export const brandRandValue =
    (value: number) => brand<number, 'RandValue'>(value);