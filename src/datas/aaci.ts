/// 対空カットイン諸元

import { AntiAirCutinType } from "@/logics/antiAir/cutin"

type AaciData = {
    /** 固定ボーナス */
    flat_bonus: number,
    /** 発動率 */
    rate: number,
    /** 変動ボーナス */
    mod: number,
    /** 最低保証A */
    flat_A: number,
}
type AaciDatas = Record<AntiAirCutinType, AaciData>

export const AACI_DATAS: AaciDatas = {
    1: { flat_bonus: 7, rate: 0.65, mod: 1.7, flat_A: 3 },
    2: { flat_bonus: 6, rate: 0.58, mod: 1.7, flat_A: 3 },
    3: { flat_bonus: 4, rate: 0.5, mod: 1.6, flat_A: 2 },
    4: { flat_bonus: 6, rate: 0.52, mod: 1.5, flat_A: 5 },
    5: { flat_bonus: 4, rate: 0.55, mod: 1.5, flat_A: 2 },
    6: { flat_bonus: 4, rate: 0.4, mod: 1.45, flat_A: 4 },
    7: { flat_bonus: 3, rate: 0.45, mod: 1.35, flat_A: 2 },
    8: { flat_bonus: 4, rate: 0.5, mod: 1.4, flat_A: 2 },
    9: { flat_bonus: 2, rate: 0.4, mod: 1.3, flat_A: 1 },
    10: { flat_bonus: 8, rate: 0.6, mod: 1.65, flat_A: 3 },
    11: { flat_bonus: 6, rate: 0.55, mod: 1.5, flat_A: 2 },
    12: { flat_bonus: 3, rate: 0.45, mod: 1.25, flat_A: 1 },
    13: { flat_bonus: 4, rate: 0.35, mod: 1.35, flat_A: 1 },
    14: { flat_bonus: 4, rate: 0.63, mod: 1.45, flat_A: 1 },
    15: { flat_bonus: 3, rate: 0.55, mod: 1.3, flat_A: 1 },
    16: { flat_bonus: 4, rate: 0.62, mod: 1.4, flat_A: 1 },
    17: { flat_bonus: 2, rate: 0.55, mod: 1.25, flat_A: 1 },
    18: { flat_bonus: 2, rate: 0.6, mod: 1.2, flat_A: 1 },
    19: { flat_bonus: 5, rate: 0.55, mod: 1.45, flat_A: 1 },
    20: { flat_bonus: 3, rate: 0.65, mod: 1.25, flat_A: 1 },
    21: { flat_bonus: 5, rate: 0.6, mod: 1.45, flat_A: 1 },
    22: { flat_bonus: 2, rate: 0.6, mod: 1.2, flat_A: 1 },
    23: { flat_bonus: 1, rate: 0.8, mod: 1.05, flat_A: 1 },
    24: { flat_bonus: 3, rate: 0.55, mod: 1.25, flat_A: 1 },
    25: { flat_bonus: 7, rate: 0.6, mod: 1.55, flat_A: 1 },
    26: { flat_bonus: 6, rate: 0.6, mod: 1.4, flat_A: 1 },
    27: { flat_bonus: 5, rate: 0.55, mod: 1.55, flat_A: 1 },
    28: { flat_bonus: 4, rate: 0.55, mod: 1.4, flat_A: 1 },
    29: { flat_bonus: 5, rate: 0.6, mod: 1.55, flat_A: 1 },
    30: { flat_bonus: 3, rate: 0.45, mod: 1.3, flat_A: 1 },
    31: { flat_bonus: 2, rate: 0.5, mod: 1.25, flat_A: 1 },
    32: { flat_bonus: 3, rate: 0.5, mod: 1.2, flat_A: 1 },
    33: { flat_bonus: 3, rate: 0.42, mod: 1.35, flat_A: 1 },
    34: { flat_bonus: 7, rate: 0.6, mod: 1.6, flat_A: 1 },
    35: { flat_bonus: 6, rate: 0.55, mod: 1.55, flat_A: 1 },
    36: { flat_bonus: 6, rate: 0.55, mod: 1.55, flat_A: 1 },
    37: { flat_bonus: 4, rate: 0.4, mod: 1.45, flat_A: 1 },
    38: { flat_bonus: 10, rate: 0.62, mod: 1.85, flat_A: 5 },
    39: { flat_bonus: 10, rate: 0.57, mod: 1.7, flat_A: 5 },
    40: { flat_bonus: 10, rate: 0.56, mod: 1.7, flat_A: 5 },
    41: { flat_bonus: 9, rate: 0.55, mod: 1.65, flat_A: 5 },
    42: { flat_bonus: 10, rate: 0.65, mod: 1.65, flat_A: 1 },
    43: { flat_bonus: 8, rate: 0.58, mod: 1.6, flat_A: 1 },
    44: { flat_bonus: 6, rate: 0.55, mod: 1.6, flat_A: 1 },
    45: { flat_bonus: 5, rate: 0.5, mod: 1.55, flat_A: 1 },
    46: { flat_bonus: 8, rate: 0.6, mod: 1.55, flat_A: 1 },
    47: { flat_bonus: 2, rate: 0.7, mod: 1.3, flat_A: 1 },
    48: { flat_bonus: 8, rate: 0.65, mod: 1.75, flat_A: 1 },
    49: { flat_bonus: 5, rate: 0.5, mod: 1.5, flat_A: 1 },
    50: { flat_bonus: 7, rate: 0.5, mod: 1.5, flat_A: 1 },
    51: { flat_bonus: 5, rate: 0.5, mod: 1.35, flat_A: 1 },
    52: { flat_bonus: 4, rate: 0.5, mod: 1.35, flat_A: 1 },
}