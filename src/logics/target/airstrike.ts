import { FleetUnit } from "@/models/fleet/FleetUnit";
import { Squadron } from "@/models/LBAS";
import { AirstrikeType } from "./LBAS";

export type VaidAirstrikeCombination = {
    attacker_squadron: Squadron,
    target_unit: FleetUnit,
    attack_type: AirstrikeType,
}