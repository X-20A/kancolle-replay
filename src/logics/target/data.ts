import { CombinedFleetFormationType, SingleFleetFormationType } from "@/types";
import { TargetFromCombinedFleet } from "./target";

/**
 * 連合艦隊ターゲット時における、phase_typeごとの主力艦隊選出率
 */
export const MAIN_FLEET_RATE_MAP: Record<TargetFromCombinedFleet, number> = {
    lbas: 0.45,
    aerial_combat: 0.5,
    support_shelling: 0.4,
    opening_torpedo: 0.5,
    shelling: 0.61,
    torpedo: 0.35,
    friend_fleet: 0.5,
};

/**
 * 通常艦隊における陣形ごとのかばうの発動率    
 * https://wikiwiki.jp/kancolle/陣形#coverProbability
 */
export const SINGLE_FLEET_FORMATION_PROTECT_RATIO_DATA: Record<SingleFleetFormationType, number> = {
    LineAhead: 0.45,
    DoubleLine: 0.6,
    Diamond: 0.75,
    Echelon: 0.6,
    LineAbreast: 0.6,
    Vanguard: 0.75,
};

/**
 * 連合艦隊における陣形ごとのかばうの発動率    
 * https://en.kancollewiki.net/Shooting_Order_and_Targeting#Combined_Fleets_FP
 */
export const COMBINED_FLEET_FORMATION_PROTECT_RATIO_DATA: Record<CombinedFleetFormationType, number> = {
    CruisingFormation_1: 0.6, // ! 暫定
    CruisingFormation_2: 0.6,
    CruisingFormation_3: 0.75, // ! 暫定
    CruisingFormation_4: 0.6,
}