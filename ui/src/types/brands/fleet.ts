import { brand, Brand } from ".";

export type DetectionPower = Brand<number, 'DetectionPower'>

export type ReconPower = Brand<number, 'ReconPower'>

export const brandDetectionPower =
    (value: number) => brand<number, 'DetectionPower'>(value);

export const brandReconPower =
    (value: number) => brand<number, 'ReconPower'>(value);