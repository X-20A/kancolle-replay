import { CombinedFleet, Fleet, SingleFleet } from "@/models/fleet/Fleet";
import { brand, Brand } from ".";

export type OwnSingleFleet = Brand<SingleFleet, 'OwnSingleFleet'>

export type OwnCombinedFleet = Brand<CombinedFleet, 'OwnCombinedFleet'>

export type OwnFleet = OwnSingleFleet | OwnCombinedFleet

export type EnemySingleFleet = Brand<SingleFleet, 'EnemySingleFleet'>

export type EnemyCombinedFleet = Brand<CombinedFleet, 'EnemyCombinedFleet'>

export type EnemyFleet = EnemySingleFleet | EnemyCombinedFleet

export type DetectionPower = Brand<number, 'DetectionPower'>

export type ReconPower = Brand<number, 'ReconPower'>

export const brandOwnSingleFleet =
    (value: SingleFleet) => brand<SingleFleet, 'OwnSingleFleet'>(value);

export const brandOwnCombinedFleet =
    (value: CombinedFleet) => brand<CombinedFleet, 'OwnCombinedFleet'>(value);

export const brandEnemySingleFleet =
    (value: SingleFleet) => brand<SingleFleet, 'EnemySingleFleet'>(value);

export const brandEnemyCombinedFleet =
    (value: CombinedFleet) => brand<CombinedFleet, 'EnemyCombinedFleet'>(value);

export const brandDetectionPower =
    (value: number) => brand<number, 'DetectionPower'>(value);

export const brandReconPower =
    (value: number) => brand<number, 'ReconPower'>(value);