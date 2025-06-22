import { EquippedShip } from "@/models/ship/equipped"

export type ExtractedShip = {
    ship: EquippedShip,
    is_original_fleet_main: boolean,
    original_index: number,
    is_flagship: boolean,
}