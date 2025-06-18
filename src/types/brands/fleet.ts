import { Fleet } from "@/models/fleet/Fleet";
import { brand, Brand } from ".";
import { FleetState } from "@/models/fleet/fleetState";

export type OwnFleet = Brand<Fleet, 'OwnFleet'>

export type OwnFleetState = Brand<FleetState, 'OwnFleetState'>

export type EnemyFleet = Brand<Fleet, 'EnemyFleet'>

export type EnemyFleetState = Brand<FleetState, 'EnemyFleetState'>

export type DetectionPower = Brand<number, 'DetectionPower'>

export type ReconPower = Brand<number, 'ReconPower'>

export const brandOwnFleet =
    (value: Fleet) => brand<Fleet, 'OwnFleet'>(value);

export const brandOwnFleetState =
    (value: FleetState) => brand<FleetState, 'OwnFleetState'>(value);

export const brandEnemyFleet =
    (value: Fleet) => brand<Fleet, 'EnemyFleet'>(value);

export const brandEnemyFleetState =
    (value: FleetState) => brand<FleetState, 'EnemyFleetState'>(value);

export const brandDetectionPower =
    (value: number) => brand<number, 'DetectionPower'>(value);

export const brandReconPower =
    (value: number) => brand<number, 'ReconPower'>(value);