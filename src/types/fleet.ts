import { EquippedShip } from "@/models/ship/equipped"

export type ExtractedShipStruct = {
    ship: EquippedShip,
    fleet_type: 'single' | 'main' | 'escort' ,
    original_index: number,
}