import { FleetUnit } from "@/models/fleet/FleetUnit";
import { brand, Brand } from ".";

export type MainFleetUnits = Brand<FleetUnit, 'MainFleetUnits'>

export type EscortFleetUnits = Brand<FleetUnit, 'EscortFleetUnits'>

export type DetectionPower = Brand<number, 'DetectionPower'>

export type ReconPower = Brand<number, 'ReconPower'>

export const brandMainFleetUnits =
    (value: FleetUnit[]) => brand<FleetUnit[], 'MainFleetUnits'>(value);

export const brandEscortFleetUnits =
    (value: FleetUnit[]) => brand<FleetUnit[], 'EscortFleetUnits'>(value);

export const brandDetectionPower =
    (value: number) => brand<number, 'DetectionPower'>(value);

export const brandReconPower =
    (value: number) => brand<number, 'ReconPower'>(value);