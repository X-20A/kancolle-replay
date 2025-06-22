import { brand, Brand } from ".";

export type PreAccuracy = Brand<number, 'PreAccuracy'>

export const brandOwnFleet =
    (value: number) => brand<number, 'PreAccuracy'>(value);