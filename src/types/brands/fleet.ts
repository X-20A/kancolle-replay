import { Fleet } from "@/models/fleet/Fleet";
import { brand, Brand } from ".";

export type OwnFleet = Brand<Fleet, 'OwnFleet'>

export type EnemyFleet = Brand<Fleet, 'EnemyFleet'>

export type DetectionPower = Brand<number, 'DetectionPower'>

export type ReconPower = Brand<number, 'ReconPower'>

export const brandDetectionPower =
    (value: number) => brand<number, 'DetectionPower'>(value);

export const brandReconPower =
    (value: number) => brand<number, 'ReconPower'>(value);

export const brandOwnFleet =
    (value: Fleet) => brand<Fleet, 'OwnFleet'>(value);

export const brandEnemyFleet =
    (value: Fleet) => brand<Fleet, 'EnemyFleet'>(value);