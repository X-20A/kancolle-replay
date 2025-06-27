import { brand, Brand } from ".";

export type PreAccuracy = Brand<number, 'PreAccuracy'>

export type WeightedAntiAir = Brand<number, 'WeightedAntiAir'>

export const brandOwnFleet =
    (value: number) => brand<number, 'PreAccuracy'>(value);

export const brandWeightedAntiAir =
    (value: number) => brand<number, 'WeightedAntiAir'>(value);