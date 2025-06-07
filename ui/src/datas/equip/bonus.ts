import { EquipType } from "@/datas/equip/base/player";
import { EquipBonusType } from "@/types/equip/player";
import { PlayerShipClass, ShipType as ST } from "@/types/ship/ship";

/** 国籍ID */
export const enum Country {
    /** 日本 */
    Japan = 1,
    /** アメリカ */
    USA = 2,
    /** イタリア */
    Italia = 3,
    /** イギリス */
    UK = 4,
    /** ドイツ */
    Germany = 5,
    /** フランス */
    France = 6,
    /** ソ連 */
    USSR = 7,
    /** オーストラリア */
    Australia = 8,
    /** スウェーデン */
    Sweden = 9,
    /** オランダ */
    Netherlands = 10,
}

export type Bonus = {
    bonus: Partial<Record<EquipBonusType, number>>,
    /** 艦ID */
    ship_ids?: number[],
    /** 未改造状態での艦ID */
    ship_base_ids?: number[],
    /** 艦種ID */
    ship_type_ids?: ST[],
    /** 艦型ID */
    ship_class_ids?: PlayerShipClass[],
    /** 艦の国籍ID */
    ship_country_ids?: Country[],
    /** 重ね掛け上限数 */
    stack_limit?: number,
    /** 必要なシナジー装備のID */
    requires_synergy_equip_id?: number[],
    /** 必要な シナジー装備の数 requires_equip_idを指向 */
    requires_synergy_equip_count?: number,
    /** 必要なシナジー装備の改修値 requires_equip_idを指向 */
    requires_synergy_equip_improvement?: number,
    /** 必要なシナジー装備の種別ID */
    requires_synergy_equip_type_ids?: EquipType[],
    /** 必要改修値 */
    required_improvement?: number,
    /** 水上電探(素索敵5以上)が必要であるか */
    requires_surface_radar?: true,
    /** 対空電探(素対空2以上)が必要であるか */
    requires_air_radar?: true,
    /** 命中8以上の電探が必要であるか */
    requires_high_precision_radar?: true,
}

export type EquipBonusData = {
    ids?: number[],
    types?: EquipType[],
    bonuses: Bonus[],
}

export const EQUIP_BONUS_DATAS: EquipBonusData[] = [
    {
        types: [EquipType.CARRIER_SCOUT],
        bonuses: [
            {
                bonus: { los: 1 },
                ship_type_ids: [ST.CVL, ST.BBV, ST.CV, ST.CVB],
                stack_limit: 1,
                required_improvement: 2
            },
            {
                bonus: { fire_power: 1 },
                ship_type_ids: [ST.CVL, ST.BBV, ST.CV, ST.CVB],
                stack_limit: 1,
                required_improvement: 4
            },
            {
                bonus: { los: 1 },
                ship_type_ids: [ST.CVL, ST.BBV, ST.CV, ST.CVB],
                stack_limit: 1,
                required_improvement: 6
            },
            {
                bonus: { fire_power: 1, los: 1 },
                ship_type_ids: [ST.CVL, ST.BBV, ST.CV, ST.CVB],
                stack_limit: 1,
                required_improvement: 10
            }
        ]
    },
    {
        types: [EquipType.SEAPLANE],
        bonuses: [
            {
                bonus: { fire_power: 2, asw: 3, evasion: 1 },
                ship_ids: [662, 663, 668],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2 },
                ship_ids: [501, 502, 506, 507],
                stack_limit: 1
            }
        ]
    },
    {
        types: [EquipType.SEAPLANE_BOMBER],
        bonuses: [
            {
                bonus: { fire_power: 1, asw: 1, evasion: 1 },
                ship_ids: [662, 663, 668],
                stack_limit: 1
            },

            {
                bonus: { fire_power: 1, evasion: 1 },
                ship_ids: [501, 502, 506, 507],
                stack_limit: 1
            }
        ]
    },
    {
        types: [EquipType.RADAR_S, EquipType.RADAR_L],
        bonuses: [
            {
                bonus: { fire_power: 1, anti_air: 2, evasion: 3 },
                ship_ids: [569, 648, 951, 961],
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                bonus: { anti_air: 2, evasion: 1 },
                ship_ids: [955, 956, 960, 981, 983],
                requires_air_radar: true,
                stack_limit: 1
            }
        ]
    },
    {
        types: [EquipType.AUTOGYRO],
        bonuses: [
            {
                bonus: { asw: 4, evasion: 1 },
                ship_ids: [662],
                stack_limit: 1
            },
            {
                bonus: { asw: 3, evasion: 1 },
                ship_ids: [663, 668],
                stack_limit: 1
            }
        ]
    },
    {
        types: [EquipType.SEARCHLIGHT_S],
        bonuses: [
            {
                bonus: { fire_power: 4, evasion: -1 },
                ship_base_ids: [34, 55, 69, 85, 86],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 4, torpedo: 8 },
                ship_base_ids: [55],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2 },
                ship_base_ids: [132]
            },
            {
                bonus: { fire_power: 1, anti_air: 1 },
                ship_base_ids: [20]
            },
            {
                bonus: { fire_power: 4, torpedo: 2 },
                ship_ids: [662, 663, 668],
                stack_limit: 1
            }
        ]
    },
    {
        types: [EquipType.SEARCHLIGHT_L],
        bonuses: [
            {
                bonus: { fire_power: 6, evasion: -2 },
                ship_base_ids: [85, 86],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 4, evasion: -1 },
                ship_base_ids: [131, 143],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 3, torpedo: 3 },
                ship_ids: [592],
                stack_limit: 1
            },
            {
                bonus: { torpedo: 5 },
                ship_ids: [592],
                requires_synergy_equip_id: [174],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 4, torpedo: 1 },
                ship_ids: [694],
                stack_limit: 1
            },
            {
                bonus: { torpedo: 7 },
                ship_ids: [694],
                requires_synergy_equip_id: [174],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [
            3, // 12.7cm連装砲B型改二
            122, // 10cm連装高角砲+高射装置
            533, // 10cm連装高角砲改+高射装置改
            553, // ! 該当装備なし？
        ],
        bonuses: [
            {
                bonus: { fire_power: 1, anti_air: 2, evasion: 1 },
                ship_class_ids: [54]
            },
            {
                bonus: { fire_power: 1, shell_accuracy: 1, evasion: 1 },
                ship_ids: [968]
            },
            {
                bonus: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_ids: [981, 983]
            }
        ]
    },
    {
        ids: [533, 553],
        bonuses: [
            {
                bonus: { fire_power: 1, anti_air: 1 },
                ship_ids: [426, 986, 987]
            },
            {
                bonus: { anti_air: 1 },
                ship_ids: [426, 986, 987],
                required_improvement: 4
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [426, 986, 987],
                required_improvement: 6
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [426, 986, 987],
                required_improvement: 8
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [426, 986, 987],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [5],
        bonuses: [
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [9, 52]
            },
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [52]
            }
        ]
    },
    {
        ids: [15],
        bonuses: [
            {
                bonus: { torpedo: 2 },
                ship_ids: [566, 567, 568, 648, 651, 656, 670, 915, 951],
                stack_limit: 1
            },
            {
                bonus: { torpedo: 2 },
                ship_ids: [566, 567, 568, 648, 651, 656, 670, 915, 951],
                stack_limit: 2
            },
            {
                bonus: { torpedo: 5, evasion: 1 },
                ship_base_ids: [642],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [18, 52],
        bonuses: [
            {
                bonus: { fire_power: 1 },
                ship_ids: [156, 277, 278]
            },
            {
                bonus: { fire_power: 1, evasion: 1 },
                ship_ids: [594, 646, 698]
            },
            {
                bonus: { fire_power: 2, evasion: 1 },
                ship_ids: [599, 610]
            }
        ]
    },
    {
        ids: [19],
        bonuses: [
            {
                bonus: { anti_air: 1, evasion: 1 },
                ship_type_ids: [ST.CVL]
            },
            {
                bonus: { fire_power: 2, asw: 3 },
                ship_class_ids: [75, 76]
            },
            {
                bonus: { fire_power: 2, anti_air: 2, asw: 2, evasion: 2 },
                ship_base_ids: [89]
            },
            {
                bonus: { fire_power: 1, evasion: 1, asw: 1, anti_air: 1 },
                ship_ids: [894, 899]
            }
        ]
    },
    {
        ids: [24, 57, 111],
        bonuses: [
            {
                bonus: { fire_power: 2 },
                ship_ids: [553, 554]
            }
        ]
    },
    {
        ids: [26, 62, 79, 80, 81, 207, 208],
        bonuses: [
            {
                bonus: { fire_power: 2, evasion: 1 },
                ship_ids: [662],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2 },
                ship_ids: [501, 506, 663, 668],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [502, 507],
                stack_limit: 1
            },
            {
                bonus: { anti_air: 1, evasion: 1 },
                ship_ids: [501, 502, 506, 507, 663, 668]
            }
        ]
    },
    {
        ids: [30, 410],
        bonuses: [
            {
                bonus: { anti_air: 3, evasion: 2, los: 2 },
                ship_ids: [73, 501, 502, 506, 507],
                stack_limit: 1
            },
            {
                bonus: { anti_air: 3, evasion: 2, los: 2 },
                ship_class_ids: [54],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [410],
        bonuses: [
            {
                bonus: { fire_power: 1, anti_air: 2, armor: 1, evasion: 2 },
                ship_ids: [73, 501, 502, 506, 507],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, anti_air: 2, armor: 1, evasion: 2 },
                ship_class_ids: [54],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_ids: [968],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [35],
        bonuses: [
            {
                bonus: { fire_power: 1, anti_air: 1 },
                ship_ids: [149, 591, 592, 694],
                stack_limit: 1
            },
            {
                bonus: { anti_air: 1 },
                ship_ids: [150],
                stack_limit: 1
            },
            {
                bonus: { anti_air: 1, evasion: 1 },
                ship_ids: [151, 593, 954],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [152],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [39, 40, 49, 131],
        bonuses: [
            {
                bonus: { anti_air: 2, evasion: 1 },
                ship_ids: [662, 663]
            },
            {
                bonus: { anti_air: 3, evasion: 2 },
                ship_ids: [668]
            },
            {
                bonus: { fire_power: 1, anti_air: 2, evasion: 2 },
                ship_class_ids: [56]
            },
            {
                bonus: { anti_air: 2, evasion: 2 },
                ship_class_ids: [56],
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                bonus: { anti_air: 2, evasion: 3 },
                ship_ids: [979]
            }
        ]
    },
    {
        ids: [39],
        bonuses: [
            {
                bonus: { evasion: 1 },
                ship_ids: [979],
                required_improvement: 8
            },
            {
                bonus: { anti_air: 2 },
                ship_ids: [979],
                required_improvement: 9
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [979],
                required_improvement: 10
            },
            {
                bonus: { evasion: 1, anti_air: 1 },
                ship_ids: [986, 987]
            },
            {
                bonus: { shell_accuracy: 1, anti_air: 1 },
                ship_ids: [986, 987],
                requires_synergy_equip_id: [533, 553],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [986, 987],
                required_improvement: 7
            },
            {
                bonus: { anti_air: 1 },
                ship_ids: [986, 987],
                required_improvement: 8
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [986, 987],
                required_improvement: 9
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [986, 987],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [40],
        bonuses: [
            {
                bonus: { anti_air: 2 },
                ship_ids: [979],
                required_improvement: 9
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [979],
                required_improvement: 10
            },
            {
                bonus: { evasion: 1, anti_air: 1 },
                ship_ids: [986, 987]
            }
        ]
    },
    {
        ids: [49],
        bonuses: [
            {
                bonus: { evasion: 2 },
                ship_ids: [979]
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [979],
                required_improvement: 6
            },
            {
                bonus: { anti_air: 1 },
                ship_ids: [979],
                required_improvement: 7
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [979],
                required_improvement: 8
            },
            {
                bonus: { anti_air: 1 },
                ship_ids: [979],
                required_improvement: 9
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [979],
                required_improvement: 10
            },
            {
                bonus: { evasion: 1, anti_air: 1 },
                ship_ids: [986, 987]
            }
        ]
    },
    {
        ids: [131],
        bonuses: [
            {
                bonus: { anti_air: 2 },
                ship_ids: [979],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [44, 45, 287, 288],
        bonuses: [
            {
                bonus: { asw: 3, evasion: 2 },
                ship_class_ids: [56]
            }
        ]
    },
    {
        ids: [46, 47, 132, 149, 438],
        bonuses: [
            {
                bonus: { asw: 2, evasion: 3 },
                ship_class_ids: [56],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [47, 438],
        bonuses: [
            {
                bonus: { fire_power: 1, asw: 3, evasion: 2 },
                ship_base_ids: [43, 425, 471, 473, 457, 122]
            },
            {
                bonus: { asw: 2, evasion: 2 },
                ship_base_ids: [16, 36, 414, 167, 170, 527]
            }
        ]
    },
    {
        ids: [50], // 20.3cm(3号)連装砲
        bonuses: [
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [7, 13]
            },
            {
                bonus: { fire_power: 1, torpedo: 1, evasion: 1 },
                ship_class_ids: [7, 13],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: -1, torpedo: -1, evasion: -1 },
                ship_class_ids: [7, 13],
                requires_surface_radar: true,
                requires_synergy_equip_id: [90],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2, evasion: 1 },
                ship_class_ids: [8, 9, 29, 31]
            },
            {
                bonus: { fire_power: 3, torpedo: 2, evasion: 2 },
                ship_class_ids: [8, 9, 29, 31],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [9, 31],
                requires_synergy_equip_id: [50],
                requires_synergy_equip_count: 2
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [501, 502, 506, 507]
            },
            {
                bonus: { fire_power: 1, evasion: 1 },
                ship_ids: [501, 506],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, anti_air: 3, evasion: 2 },
                ship_ids: [501, 502, 506, 507],
                requires_synergy_equip_id: [30, 410],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2 },
                ship_ids: [501, 502, 506, 507],
                requires_synergy_equip_id: [410],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [58], // 61cm五連装(酸素)魚雷
        bonuses: [
            {
                bonus: { torpedo: 1 },
                ship_class_ids: [22, 54]
            },
            {
                bonus: { torpedo: 1 },
                ship_type_ids: [ST.CLT]
            }
        ]
    },
    {
        ids: [59],
        bonuses: [
            {
                bonus: { anti_air: 1, evasion: 1 },
                ship_ids: [501, 502, 506, 507],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [60, 154, 219, 557, 558],
        bonuses: [
            {
                bonus: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_base_ids: [75, 92, 102, 103, 116]
            },
            {
                bonus: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_ids: [185, 282, 318]
            },
            {
                bonus: { fire_power: 2, anti_air: 1, evasion: 2 },
                ship_ids: [883, 888]
            }
        ]
    },
    {
        ids: [61],
        bonuses: [
            {
                bonus: { fire_power: 3, armor: 1, shell_accuracy: 5, evasion: 2, range: 1 },
                ship_ids: [553],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 3, armor: 3, shell_accuracy: 5, evasion: 3, range: 1 },
                ship_ids: [554],
                stack_limit: 1
            },
            {
                bonus: { shell_accuracy: 5, range: 1 },
                ship_ids: [196, 197],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 3, los: 3 },
                ship_base_ids: [90],
                stack_limit: 1,
                required_improvement: 1
            },
            {
                bonus: { fire_power: 2, los: 2 },
                ship_base_ids: [91],
                stack_limit: 1,
                required_improvement: 1
            },
            {
                bonus: { fire_power: 1, los: 1 },
                ship_ids: [508, 509, 560],
                stack_limit: 1,
                required_improvement: 1
            },
            {
                bonus: { fire_power: 1, los: 1 },
                ship_ids: [197],
                stack_limit: 1,
                required_improvement: 8
            }
        ]
    },
    {
        ids: [63],
        bonuses: [
            {
                bonus: { anti_air: 1 },
                ship_class_ids: [1, 5, 10]
            },
            {
                bonus: { fire_power: 1, anti_air: 1, evasion: 2 },
                ship_base_ids: [45]
            },
            {
                bonus: { torpedo: 1 },
                ship_ids: [144]
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [145, 627, 961]
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [242, 244, 497, 498, 975]
            },
            {
                bonus: { evasion: 2 },
                ship_ids: [469]
            },
            {
                bonus: { fire_power: 2 },
                ship_ids: [903, 908]
            }
        ]
    },
    {
        ids: [66, 220],
        bonuses: [
            {
                bonus: { anti_air: 2, evasion: 1 },
                ship_ids: [662, 663, 668]
            },
            {
                bonus: { fire_power: 1, anti_air: 2, evasion: 2 },
                ship_ids: [501, 502, 506, 507]
            },
            {
                bonus: { anti_air: 1, evasion: 2 },
                ship_ids: [501, 502, 506, 507, 662, 663, 668],
                requires_air_radar: true,
                stack_limit: 1
            }
        ]
    },
    {
        ids: [220],
        bonuses: [
            {
                bonus: { fire_power: 1, anti_air: 3, evasion: 2 },
                ship_ids: [501, 502, 506, 507, 662, 663, 668]
            },
            {
                bonus: { anti_air: 3, evasion: 3 },
                ship_ids: [501, 502, 506, 507, 662, 663, 668, 894, 899],
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                bonus: { anti_air: 2, evasion: 2 },
                ship_ids: [894, 899]
            },
            {
                bonus: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_ids: [894, 899],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [67],
        bonuses: [
            {
                bonus: { torpedo: -5 }
            },
            {
                bonus: { torpedo: 5 },
                ship_type_ids: [ST.SS, ST.SSV]
            }
        ]
    },
    {
        ids: [69],
        bonuses: [
            {
                bonus: { fire_power: 1, asw: 2 },
                ship_ids: [554, 646]
            },
            {
                bonus: { fire_power: 1, asw: 1 },
                ship_ids: [553]
            }
        ]
    },
    {
        ids: [78],
        bonuses: [
            {
                bonus: { fire_power: 1, evasion: 1 },
                ship_class_ids: [48]
            },
            {
                bonus: { fire_power: 2, torpedo: 2, evasion: 2 },
                ship_class_ids: [48],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [48],
                required_improvement: 7
            },
            {
                bonus: { armor: 1 },
                ship_class_ids: [48],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [79, 81],
        bonuses: [
            {
                bonus: { fire_power: 3 },
                ship_ids: [553, 554]
            },
            {
                bonus: { fire_power: 2 },
                ship_ids: [82, 88, 411, 412]
            }
        ]
    },
    {
        ids: [82],
        bonuses: [
            {
                bonus: { asw: 1, evasion: 1 },
                ship_class_ids: [76]
            }
        ]
    },
    {
        ids: [87],
        bonuses: [
            {
                bonus: { torpedo: 1, evasion: 2 },
                ship_ids: [591, 592, 593, 694, 954],
                stack_limit: 1
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [591, 592, 593, 694, 954],
                stack_limit: 1,
                required_improvement: 6
            },
            {
                bonus: { torpedo: 1 },
                ship_ids: [591, 592, 593, 694, 954],
                stack_limit: 1,
                required_improvement: 8
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [591, 592, 593, 694, 954],
                stack_limit: 1,
                required_improvement: 10
            },
            {
                bonus: { fire_power: 1, torpedo: 1, shell_accuracy: 1, evasion: 1 },
                ship_ids: [951]
            },
            {
                bonus: { anti_air: 1 },
                ship_ids: [951],
                required_improvement: 6
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [951],
                required_improvement: 7
            },
            {
                bonus: { torpedo: 1 },
                ship_ids: [951],
                required_improvement: 8
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [951],
                required_improvement: 9
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [951],
                required_improvement: 10
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [50, 181, 229, 316, 961],
                required_improvement: 6
            },
            {
                bonus: { torpedo: 1 },
                ship_ids: [50, 181, 229, 316, 961],
                required_improvement: 7
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [50, 181, 229, 316, 961],
                required_improvement: 8
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [50, 181, 229, 316, 961],
                required_improvement: 9
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [50, 181, 229, 316, 961],
                required_improvement: 10
            },
            {
                bonus: { evasion: 1 },
                ship_class_ids: [38, 54, 101],
                required_improvement: 7
            },
            {
                bonus: { torpedo: 1 },
                ship_class_ids: [38, 54, 101],
                required_improvement: 8
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_class_ids: [38, 54, 101],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [90],
        bonuses: [
            {
                bonus: { fire_power: 2, evasion: 1 },
                ship_ids: [142]
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [295, 416, 417]
            },
            {
                bonus: { fire_power: 1, anti_air: 1 },
                ship_ids: [264]
            },
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [7, 8, 9, 13, 29, 31]
            },
            {
                bonus: { anti_air: 5, evasion: 2 },
                ship_base_ids: [61],
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 3, torpedo: 2, evasion: 2 },
                ship_class_ids: [7, 13],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [501, 502, 506, 507]
            }
        ]
    },
    {
        ids: [93],
        bonuses: [
            {
                bonus: { fire_power: 1 },
                ship_base_ids: [90],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 3 },
                ship_base_ids: [91],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [94],
        bonuses: [
            {
                bonus: { fire_power: 3 },
                ship_ids: [197],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 7 },
                ship_ids: [196],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [99],
        bonuses: [
            {
                bonus: { fire_power: 4 },
                ship_base_ids: [90],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1 },
                ship_base_ids: [91],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [100],
        bonuses: [
            {
                bonus: { fire_power: 6 },
                ship_ids: [197],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 3 },
                ship_ids: [196],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 4 },
                ship_ids: [553, 554]
            }
        ]
    },
    {
        ids: [104],
        bonuses: [
            {
                bonus: { fire_power: 2 },
                ship_ids: [149, 591]
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [150, 152, 592, 694]
            },
            {
                bonus: { fire_power: 2, anti_air: 1, evasion: 2 },
                ship_ids: [151, 593, 954]
            }
        ]
    },
    {
        ids: [106, 450],
        bonuses: [
            {
                bonus: { fire_power: 1, anti_air: 2, armor: 1, evasion: 3 },
                ship_ids: [145, 151, 407, 419, 541, 593, 911, 916, 954, 961, 975]
            },
            {
                bonus: { anti_air: 1, armor: 1, evasion: 3 },
                ship_base_ids: [35, 183, 465]
            },
            {
                bonus: { anti_air: 2, armor: 1, evasion: 2 },
                ship_base_ids: [20, 49, 139, 167, 170, 425, 532]
            },
            {
                bonus: { fire_power: 1, anti_air: 1, armor: 1, evasion: 1 },
                ship_ids: [663, 668],
                stack_limit: 1
            },
            {
                bonus: { anti_air: 1, evasion: 1 },
                ship_ids: [668],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [450], // 13号対空電探改(後期型)
        bonuses: [
            {
                bonus: { fire_power: 1, anti_air: 2, armor: 1, evasion: 3 },
                ship_class_ids: [101]
            },
            {
                bonus: { anti_air: 1, armor: 1, evasion: 2 },
                ship_type_ids: [ST.DE]
            },
            {
                bonus: { fire_power: 1, shell_accuracy: 1, anti_air: 1, evasion: 2 },
                ship_ids: [955, 956, 960, 981, 983],
                required_improvement: 4,
                stack_limit: 1
            }
        ]
    },
    {
        ids: [115],
        bonuses: [
            {
                bonus: { fire_power: 2, evasion: 1, los: 2 },
                ship_class_ids: [47, 55]
            },
            {
                bonus: { fire_power: 1, evasion: 1 },
                ship_class_ids: [47, 55],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [118],
        bonuses: [
            {
                bonus: { fire_power: 1, evasion: 2, los: 2 },
                ship_class_ids: [52]
            },
            {
                bonus: { fire_power: 2, los: 1 },
                ship_class_ids: [52],
                required_improvement: 10
            },
            {
                bonus: { fire_power: 3, evasion: 1, los: 2 },
                ship_ids: [507]
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [507],
                required_improvement: 2
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [507],
                required_improvement: 5
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [507],
                required_improvement: 7
            },
            {
                bonus: { fire_power: 1, torpedo: 1, anti_air: 1, los: 1, evasion: 1 },
                ship_ids: [507],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [119],
        bonuses: [
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [34, 56]
            },
            {
                bonus: { fire_power: 2, torpedo: 1 },
                ship_class_ids: [90]
            }
        ]
    },
    {
        ids: [121],
        bonuses: [
            {
                bonus: { anti_air: 4, evasion: 2 },
                ship_class_ids: [54],
                stack_limit: 1
            },
            {
                bonus: { anti_air: 2, evasion: 2 },
                ship_class_ids: [54],
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_ids: [968]
            },
            {
                bonus: { fire_power: 1, shell_accuracy: 1 },
                ship_ids: [968],
                requires_air_radar: true
            },
            {
                bonus: { anti_air: 1, evasion: 1 },
                ship_ids: [981, 983]
            },
            {
                bonus: { anti_air: 2, evasion: 2 },
                ship_ids: [981, 983],
                requires_air_radar: true,
                stack_limit: 1
            }
        ]
    },
    {
        ids: [122],
        bonuses: [
            {
                bonus: { fire_power: 5, anti_air: 3, evasion: 2 },
                ship_ids: [656],
                required_improvement: 4
            },
            {
                bonus: { fire_power: 4, evasion: 3 },
                ship_ids: [656],
                requires_surface_radar: true,
                stack_limit: 1,
                required_improvement: 4
            },
            {
                bonus: { anti_air: 4, evasion: 3 },
                ship_ids: [656],
                requires_air_radar: true,
                stack_limit: 1,
                required_improvement: 4
            },
            {
                bonus: { evasion: 1 },
                ship_class_ids: [54],
                required_improvement: 6
            },
            {
                bonus: { anti_air: 1 },
                ship_class_ids: [54],
                required_improvement: 7
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_class_ids: [54],
                required_improvement: 8
            },
            {
                bonus: { evasion: 1 },
                ship_class_ids: [54],
                required_improvement: 9
            },
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [54],
                required_improvement: 10
            },
            {
                bonus: { anti_air: 1 },
                ship_ids: [426, 981, 983, 986, 987],
                required_improvement: 7
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [426, 981, 983, 986, 987],
                required_improvement: 8
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [426, 981, 983, 986, 987],
                required_improvement: 9
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [426, 981, 983, 986, 987],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [129],
        bonuses: [
            {
                bonus: { fire_power: 1, torpedo: 2, asw: 2, evasion: 2, los: 1 },
                ship_class_ids: [1, 5, 10, 12, 18, 22, 23, 28, 30, 38, 54, 66, 101]
            },
            {
                bonus: { fire_power: 1, torpedo: 2, evasion: 2, los: 3 },
                ship_class_ids: [4, 16, 20, 21, 34, 41, 52, 56]
            },
            {
                bonus: { fire_power: 1, evasion: 2, los: 3 },
                ship_class_ids: [7, 8, 9, 13, 29, 31]
            }
        ]
    },
    {
        ids: [139],
        bonuses: [
            {
                bonus: { fire_power: 2, anti_air: 1 },
                ship_ids: [662, 663, 668]
            }
        ]
    },
    {
        ids: [143],
        bonuses: [
            {
                bonus: { fire_power: 3 },
                ship_base_ids: [83],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2 },
                ship_base_ids: [84, 110],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1 },
                ship_base_ids: [76, 111],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [144],
        bonuses: [
            {
                bonus: { fire_power: 3 },
                ship_base_ids: [83],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2 },
                ship_base_ids: [84, 110],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2 },
                ship_ids: [461, 466],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1 },
                ship_base_ids: [76, 111],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [462, 467],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [147],
        bonuses: [
            {
                bonus: { fire_power: 1, evasion: 1 },
                ship_class_ids: [61]
            }
        ]
    },
    {
        ids: [149],
        bonuses: [
            {
                bonus: { asw: 1, evasion: 3 },
                ship_ids: [141, 160, 488, 622, 623, 656, 961],
                stack_limit: 1
            },
            {
                bonus: { asw: 3, evasion: 5 },
                ship_ids: [624],
                stack_limit: 1
            },
            {
                bonus: { asw: 2, evasion: 4 },
                ship_ids: [662],
                stack_limit: 1
            },
            {
                bonus: { asw: 1, evasion: 2 },
                ship_class_ids: [54],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [165, 216],
        bonuses: [
            {
                bonus: { anti_air: 2, evasion: 2 },
                ship_ids: [501, 502, 506, 507],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [171],
        bonuses: [
            {
                bonus: { evasion: 1 },
                ship_country_ids: [Country.USA],
                stack_limit: 1,
                required_improvement: 5
            },
            {
                bonus: { fire_power: 1 },
                ship_country_ids: [Country.USA],
                stack_limit: 1,
                required_improvement: 10
            },
            {
                bonus: { fire_power: 1, los: 1 },
                ship_class_ids: [65, 93, 102, 107, 125],
                stack_limit: 1
            },
            {
                bonus: { los: 1 },
                ship_class_ids: [65, 93, 102, 107, 125],
                stack_limit: 1,
                required_improvement: 3
            },
            {
                bonus: { los: 1 },
                ship_class_ids: [65, 93, 102, 107, 125],
                stack_limit: 1,
                required_improvement: 8
            }
        ]
    },
    {
        ids: [174],
        bonuses: [
            {
                bonus: { torpedo: 1, evasion: 2 },
                ship_class_ids: [66]
            },
            {
                bonus: { torpedo: 6, evasion: 3 },
                ship_ids: [591, 592, 694, 954]
            },
            {
                bonus: { torpedo: 5, evasion: 2 },
                ship_ids: [593]
            },
            {
                bonus: { fire_power: 2, torpedo: 4, evasion: 4 },
                ship_ids: [488, 622, 623, 624]
            }
        ]
    },
    {
        ids: [179],
        bonuses: [
            {
                bonus: { torpedo: 1 },
                ship_class_ids: [54]
            }
        ]
    },
    {
        ids: [184],
        bonuses: [
            {
                bonus: { fire_power: 1, anti_air: 2, evasion: 3 },
                ship_class_ids: [68]
            }
        ]
    },
    {
        ids: [188],
        bonuses: [
            {
                bonus: { fire_power: 3, anti_air: 1, evasion: 1 },
                ship_class_ids: [68]
            }
        ]
    },
    {
        ids: [189],
        bonuses: [
            {
                bonus: { anti_air: 1, evasion: 2 },
                ship_class_ids: [63, 68]
            }
        ]
    },
    {
        ids: [194],
        bonuses: [
            {
                bonus: { fire_power: 3, evasion: 2, los: 2 },
                ship_class_ids: [70]
            },
            {
                bonus: { evasion: 1, los: 2 },
                ship_class_ids: [62, 72]
            },
            {
                bonus: { fire_power: 1, evasion: 2, los: 2 },
                ship_ids: [392, 969]
            }
        ]
    },
    {
        ids: [204],
        bonuses: [
            {
                bonus: { torpedo: 1, armor: 1 },
                ship_ids: [591, 592, 593, 694, 954],
                stack_limit: 1
            },
            {
                bonus: { armor: 1 },
                ship_ids: [591, 592, 593, 694, 954],
                stack_limit: 1,
                required_improvement: 7
            },
            {
                bonus: { armor: 1 },
                ship_ids: [694],
                stack_limit: 1,
                required_improvement: 7
            },
            {
                bonus: { torpedo: 1 },
                ship_ids: [591, 592, 593, 694, 954],
                stack_limit: 1,
                required_improvement: 10
            },
            {
                bonus: { torpedo: 1 },
                ship_ids: [694],
                stack_limit: 1,
                required_improvement: 10
            }
        ]
    },
    {
        ids: [217],
        bonuses: [
            {
                bonus: { fire_power: 1, anti_air: 5, evasion: 3 },
                ship_ids: [501, 506]
            },
            {
                bonus: { fire_power: 1, anti_air: 4, evasion: 2 },
                ship_ids: [502, 507]
            }
        ]
    },
    {
        ids: [228],
        bonuses: [
            {
                bonus: { fire_power: 3, anti_air: 3, asw: 4, evasion: 4 },
                ship_base_ids: [89]
            },
            {
                bonus: { fire_power: 1, evasion: 2, asw: 2, anti_air: 1 },
                ship_ids: [894, 899]
            },
            {
                bonus: { fire_power: 2, anti_air: 1, asw: 5, evasion: 1 },
                ship_class_ids: [75, 76]
            },
            {
                bonus: { anti_air: 1, asw: 2, evasion: 1 },
                ship_type_ids: [ST.CVL]
            }
        ]
    },
    {
        ids: [229],
        bonuses: [
            {
                bonus: { fire_power: 1, anti_air: 1 },
                ship_ids: [622, 623, 624]
            },
            {
                bonus: { fire_power: 1, evasion: 1 },
                ship_ids: [622, 623, 624],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { anti_air: 2, evasion: 2 },
                ship_ids: [622, 623, 624],
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2, anti_air: 3, asw: 2 },
                ship_ids: [656]
            },
            {
                bonus: { fire_power: 2, evasion: 2 },
                ship_ids: [656],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { anti_air: 3, evasion: 2 },
                ship_ids: [656],
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                bonus: { anti_air: 2 },
                ship_ids: [160, 487, 488],
                required_improvement: 7
            },
            {
                bonus: { fire_power: 3, evasion: 2 },
                ship_ids: [160, 487, 488],
                requires_surface_radar: true,
                stack_limit: 1,
                required_improvement: 7
            },
            {
                bonus: { anti_air: 2 },
                ship_ids: [220],
                required_improvement: 7
            },
            {
                bonus: { anti_air: 1 },
                ship_ids: [23, 224, 289, 488],
                required_improvement: 7
            },
            {
                bonus: { fire_power: 1, anti_air: 1 },
                ship_class_ids: [28, 66],
                required_improvement: 7
            },
            {
                bonus: { fire_power: 2, evasion: 3 },
                ship_class_ids: [28, 66],
                requires_surface_radar: true,
                stack_limit: 1,
                required_improvement: 7
            },
            {
                bonus: { fire_power: 1, anti_air: 1 },
                ship_type_ids: [ST.DE],
                required_improvement: 7
            },
            {
                bonus: { fire_power: 1, evasion: 4 },
                ship_type_ids: [ST.DE],
                requires_surface_radar: true,
                stack_limit: 1,
                required_improvement: 7
            },
            {
                bonus: { fire_power: 2 },
                ship_base_ids: [23, 56, 113],
                required_improvement: 7
            }
        ]
    },
    {
        ids: [235],
        bonuses: [
            {
                bonus: { fire_power: 2, anti_air: 1 },
                ship_class_ids: [9, 52]
            },
            {
                bonus: { fire_power: 1, evasion: 1 },
                ship_ids: [321]
            },
            {
                bonus: { fire_power: 3, evasion: 2 },
                ship_ids: [321],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { anti_air: 3, evasion: 3 },
                ship_ids: [321],
                requires_air_radar: true,
                stack_limit: 1
            }
        ]
    },
    {
        ids: [237],
        bonuses: [
            {
                bonus: { fire_power: 4, evasion: 2 },
                ship_ids: [553, 554]
            },
            {
                bonus: { fire_power: 3, evasion: 1 },
                ship_ids: [82, 88]
            },
            {
                bonus: { fire_power: 2 },
                ship_ids: [411, 412]
            }
        ]
    },
    {
        ids: [237, 322, 323, 490],
        bonuses: [
            {
                bonus: { fire_power: 3, evasion: 1 },
                ship_ids: [662],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 3, anti_air: 1, evasion: 2 },
                ship_ids: [501, 506, 553, 554, 663, 668]
            },
            {
                bonus: { fire_power: 2, anti_air: 1, evasion: 2 },
                ship_ids: [502, 507]
            }
        ]
    },
    {
        ids: [238, 239],
        bonuses: [
            {
                bonus: { torpedo: 1, evasion: 1 },
                ship_ids: [501, 502, 506, 507],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [242],
        bonuses: [
            {
                bonus: { fire_power: 2, evasion: 1 },
                ship_class_ids: [78]
            },
            {
                bonus: { fire_power: 1 },
                ship_base_ids: [89]
            }
        ]
    },
    {
        ids: [243],
        bonuses: [
            {
                bonus: { fire_power: 3, evasion: 1 },
                ship_class_ids: [78]
            },
            {
                bonus: { fire_power: 2 },
                ship_base_ids: [89]
            }
        ]
    },
    {
        ids: [244],
        bonuses: [
            {
                bonus: { fire_power: 4, evasion: 2 },
                ship_class_ids: [78]
            },
            {
                bonus: { fire_power: 3 },
                ship_base_ids: [89]
            },
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [78],
                required_improvement: 3
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_class_ids: [78],
                required_improvement: 5
            },
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [78],
                required_improvement: 7
            },
            {
                bonus: { evasion: 1 },
                ship_class_ids: [78],
                required_improvement: 8
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_class_ids: [78],
                required_improvement: 9
            },
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [78],
                required_improvement: 10
            },
            {
                bonus: { evasion: 1 },
                ship_base_ids: [89],
                required_improvement: 3
            },
            {
                bonus: { fire_power: 1 },
                ship_base_ids: [89],
                required_improvement: 7
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_base_ids: [89],
                required_improvement: 9
            },
            {
                bonus: { fire_power: 1 },
                ship_base_ids: [89],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [266],
        bonuses: [
            {
                bonus: { fire_power: 1 },
                ship_ids: [566, 567, 568, 656, 670, 915, 951],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2 },
                ship_ids: [566, 567, 568, 656, 670, 915, 951],
                stack_limit: 2
            },
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [18, 23]
            },
            {
                bonus: { fire_power: 1, torpedo: 3, evasion: 1 },
                ship_class_ids: [18, 23],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [30]
            },
            {
                bonus: { fire_power: 2, torpedo: 3, evasion: 1 },
                ship_class_ids: [30],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { evasion: 1 },
                ship_base_ids: [20, 43, 167]
            },
            {
                bonus: { fire_power: 1, shell_accuracy: 1, evasion: 1 },
                ship_ids: [961]
            }
        ]
    },
    {
        ids: [267],
        bonuses: [
            {
                bonus: { fire_power: 2, evasion: 1 },
                ship_class_ids: [22, 38]
            },
            {
                bonus: { fire_power: 1, evasion: 1 },
                ship_class_ids: [30]
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [566, 567, 568, 656, 670, 915, 951],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [542, 543, 563, 564, 569, 578, 981, 983]
            },
            {
                bonus: { fire_power: 1, torpedo: 3, evasion: 2 },
                ship_ids: [229, 542, 543, 563, 564, 569, 578, 648, 649, 955, 956, 960, 981, 983],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2, torpedo: 3, evasion: 1 },
                ship_class_ids: [38],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { torpedo: -1 },
                ship_ids: [955, 956],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { torpedo: -2 },
                ship_ids: [960],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2 },
                ship_ids: [648, 649, 955, 956, 960, 961]
            },
            {
                bonus: { fire_power: 2, torpedo: 3, evasion: 1 },
                ship_ids: [648],
                requires_surface_radar: true,
                stack_limit: 1
            }
        ]
    },
    {
        ids: [366],
        bonuses: [
            {
                bonus: { fire_power: 2, evasion: 1 },
                ship_class_ids: [22, 38]
            },
            {
                bonus: { fire_power: 1, evasion: 1 },
                ship_class_ids: [30]
            },
            {
                bonus: { fire_power: 1, anti_air: 2 },
                ship_ids: [566, 567, 568, 656, 670, 915, 951],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, anti_air: 2 },
                ship_ids: [566, 567, 568, 656, 670, 915, 951],
                stack_limit: 2
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [542, 543, 563, 564, 569, 578, 981, 983]
            },
            {
                bonus: { fire_power: 2 },
                ship_ids: [648, 649, 955, 956, 960, 961]
            },
            {
                bonus: { anti_air: 3, fire_power: 1, shell_accuracy: 1 },
                ship_ids: [229, 542, 543, 563, 564, 569, 578, 648, 649, 955, 956, 960, 961, 981, 983],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2, torpedo: 4, evasion: 2, shell_accuracy: 2 },
                ship_ids: [229, 542, 543, 563, 564, 569, 578, 648, 649, 955, 956, 960, 961, 981, 983],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, torpedo: -1 },
                ship_ids: [960],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, anti_air: 5, evasion: 3, shell_accuracy: 1 },
                ship_ids: [229, 542, 543, 563, 564, 569, 578, 648, 649, 955, 956, 960, 961, 981, 983],
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                bonus: { anti_air: 2, fire_power: 2 },
                ship_ids: [229, 542, 543, 563, 564, 569, 578, 648, 649, 955, 956, 960, 961, 981, 983],
                stack_limit: 2
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [955],
                stack_limit: 2
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [229, 542, 543, 563, 564, 569, 578, 648, 649, 955, 956, 960, 961, 981, 983],
                required_improvement: 5
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [229, 542, 543, 563, 564, 569, 578, 648, 649, 955, 956, 960, 961, 981, 983],
                required_improvement: 8
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [229, 542, 543, 563, 564, 569, 578, 648, 649, 955, 956, 960, 961, 981, 983],
                required_improvement: 10
            },
            {
                bonus: { fire_power: 1, anti_air: 2 },
                ship_ids: [569, 648],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [267, 366],
        bonuses: [
            {
                bonus: { fire_power: 2, anti_air: 2, evasion: 3 },
                ship_ids: [648, 961],
                requires_synergy_equip_id: [129, 412],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 3, evasion: -3 },
                ship_ids: [648, 961],
                requires_synergy_equip_id: [74],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [268],
        bonuses: [
            {
                bonus: { evasion: 7, armor: 2 },
                ship_base_ids: [100, 101, 511],
                stack_limit: 1
            },
            {
                bonus: { evasion: 7, armor: 2 },
                ship_ids: [200, 290],
                stack_limit: 1
            },
            {
                bonus: { evasion: 1 },
                required_improvement: 7
            },
            {
                bonus: { shell_accuracy: 1 },
                required_improvement: 8
            },
            {
                bonus: { fire_power: 1 },
                required_improvement: 9
            },
            {
                bonus: { evasion: 1 },
                required_improvement: 10
            },
            {
                bonus: { shell_accuracy: 1, evasion: 2, asw: 1 },
                ship_base_ids: [35, 63, 64, 100, 101, 114, 511, 516, 574, 1001],
                required_improvement: 7
            },
            {
                bonus: { shell_accuracy: 1, evasion: 4, asw: 2 },
                requires_synergy_equip_id: [402],
                required_improvement: 7
            }
        ]
    },
    {
        ids: [278],
        bonuses: [
            {
                bonus: { anti_air: 1, evasion: 3, los: 1 },
                ship_country_ids: [Country.USA],
                stack_limit: 1
            },
            {
                bonus: { anti_air: 1, evasion: 2 },
                ship_class_ids: [67, 78, 82, 88, 108, 112],
                stack_limit: 1
            },
            {
                bonus: { anti_air: 1, evasion: 1 },
                ship_class_ids: [96],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [279],
        bonuses: [
            {
                bonus: { fire_power: 2, anti_air: 2, evasion: 3, los: 2 },
                ship_country_ids: [Country.USA],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, anti_air: 1, evasion: 2, los: 1 },
                ship_class_ids: [67, 78, 82, 88, 108, 112],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_class_ids: [96],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [282],
        bonuses: [
            {
                bonus: { fire_power: 2, armor: 1 },
                ship_country_ids: [Country.USSR]
            },
            {
                bonus: { fire_power: 2, armor: 1 },
                ship_ids: [147]
            },
            {
                bonus: { fire_power: 2, armor: 1 },
                ship_base_ids: [115]
            }
        ]
    },
    {
        ids: [283],
        bonuses: [
            {
                bonus: { fire_power: 1, torpedo: 6, armor: 1 },
                ship_country_ids: [Country.USSR]
            },
            {
                bonus: { fire_power: 1, torpedo: 6, armor: 1 },
                ship_ids: [147]
            }
        ]
    },
    {
        ids: [285],
        bonuses: [
            {
                bonus: { torpedo: 2, evasion: 1 },
                ship_ids: [147, 195, 326, 407, 419, 420, 426, 437, 627, 647, 665, 666, 903, 908, 959, 986, 987],
                stack_limit: 1
            },
            {
                bonus: { torpedo: 2, evasion: 1 },
                ship_ids: [147, 195, 326, 407, 419, 420, 426, 437, 627, 647, 665, 666, 903, 908, 959, 986, 987],
                stack_limit: 2
            },
            {
                bonus: { fire_power: 1, torpedo: 1 },
                ship_ids: [147, 195, 326, 407, 419, 420, 426, 437, 627, 647, 665, 666, 903, 908, 959, 986, 987],
                stack_limit: 1,
                required_improvement: 10
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [147, 195, 326, 407, 419, 420, 426, 437, 627, 647, 665, 666, 903, 908, 959, 986, 987],
                stack_limit: 2,
                required_improvement: 10
            },
            {
                bonus: { torpedo: 3 },
                ship_ids: [147, 195, 326, 407, 419, 420, 426, 437, 627, 647, 665, 666, 903, 908, 959, 986, 987],
                stack_limit: 3,
                required_improvement: 10
            },
            {
                bonus: { torpedo: 2 },
                ship_ids: [903],
                stack_limit: 2
            },
            {
                bonus: { torpedo: 2 },
                ship_ids: [903],
                stack_limit: 3
            },
            {
                bonus: { torpedo: 1 },
                ship_ids: [908, 959],
                stack_limit: 2
            },
            {
                bonus: { torpedo: 1 },
                ship_ids: [908, 959],
                stack_limit: 3
            }
        ]
    },
    {
        ids: [286],
        bonuses: [
            {
                bonus: { torpedo: 2, evasion: 1 },
                ship_ids: [144, 145, 198, 199, 463, 464, 468, 469, 470, 489, 490, 497, 498, 542, 543, 563, 564, 566, 567, 568, 569, 578, 587, 588, 648, 649, 651, 656, 667, 670, 915, 951, 955, 956, 960, 961, 975, 981, 983],
                stack_limit: 1
            },
            {
                bonus: { torpedo: 2, evasion: 1 },
                ship_ids: [144, 145, 198, 199, 463, 464, 468, 469, 470, 489, 490, 497, 498, 542, 543, 563, 564, 566, 567, 568, 569, 578, 587, 588, 648, 649, 651, 656, 667, 670, 915, 951, 955, 956, 960, 961, 975, 981, 983],
                stack_limit: 2
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [144, 145, 198, 199, 463, 464, 468, 469, 470, 489, 490, 497, 498, 542, 543, 563, 564, 566, 567, 568, 569, 578, 587, 588, 648, 649, 651, 656, 667, 670, 915, 951, 955, 956, 960, 961, 975, 981, 983],
                stack_limit: 1,
                required_improvement: 10
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [144, 145, 198, 199, 463, 464, 468, 469, 470, 489, 490, 497, 498, 542, 543, 563, 564, 566, 567, 568, 569, 578, 587, 588, 648, 649, 651, 656, 667, 670, 915, 951, 955, 956, 960, 961, 975, 981, 983],
                stack_limit: 2,
                required_improvement: 10
            },
            {
                bonus: { torpedo: 1 },
                ship_ids: [144, 145, 198, 199, 463, 464, 468, 469, 470, 489, 490, 497, 498, 542, 543, 563, 564, 566, 567, 568, 569, 578, 587, 588, 648, 649, 651, 656, 667, 670, 915, 951, 955, 956, 960, 961, 975, 981, 983],
                ship_class_ids: [30],
                stack_limit: 1,
                required_improvement: 5
            },
            {
                bonus: { torpedo: 1 },
                ship_ids: [144, 145, 198, 199, 463, 464, 468, 469, 470, 489, 490, 497, 498, 542, 543, 563, 564, 566, 567, 568, 569, 578, 587, 588, 648, 649, 651, 656, 667, 670, 915, 951, 955, 956, 960, 961, 975, 981, 983],
                ship_class_ids: [30],
                stack_limit: 2,
                required_improvement: 5
            },
            {
                bonus: { torpedo: 1 },
                ship_ids: [961],
                stack_limit: 1,
                required_improvement: 5
            },
            {
                bonus: { torpedo: 1 },
                ship_ids: [961],
                stack_limit: 2,
                required_improvement: 5
            },
            {
                bonus: { torpedo: 7, evasion: 2 },
                ship_base_ids: [642],
                stack_limit: 1
            },
            {
                bonus: { torpedo: 2 },
                ship_base_ids: [642],
                stack_limit: 1,
                required_improvement: 7
            },
            {
                bonus: { torpedo: 2 },
                ship_base_ids: [642],
                stack_limit: 1,
                required_improvement: 10
            },
            {
                bonus: { torpedo: 2 },
                ship_ids: [662, 663, 668]
            },
            {
                bonus: { torpedo: 3, evasion: 2 },
                ship_ids: [662, 663, 668],
                requires_surface_radar: true,
                stack_limit: 1
            }
        ]
    },
    {
        ids: [287],
        bonuses: [
            {
                bonus: { asw: 1, evasion: 1 },
                ship_ids: [141, 160, 488, 624, 656]
            },
            {
                bonus: { asw: 3 },
                ship_ids: [662, 961]
            }
        ]
    },
    {
        ids: [288],
        bonuses: [
            {
                bonus: { asw: 2, evasion: 1 },
                ship_ids: [141, 160, 488, 656]
            },
            {
                bonus: { fire_power: 1, asw: 3, evasion: 2 },
                ship_ids: [624]
            },
            {
                bonus: { asw: 4, evasion: 1 },
                ship_ids: [662, 961]
            }
        ]
    },
    {
        ids: [289],
        bonuses: [
            {
                bonus: { fire_power: 2, anti_air: 1 },
                ship_ids: [149, 591]
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [150, 152, 592, 694]
            },
            {
                bonus: { fire_power: 2, anti_air: 2, evasion: 2 },
                ship_ids: [151, 593, 954]
            },
            {
                bonus: { fire_power: 2, evasion: 2 },
                ship_ids: [149, 151, 591, 593, 954],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [151, 593, 954],
                required_improvement: 1
            },
            {
                bonus: { anti_air: 1 },
                ship_ids: [151, 593, 954],
                required_improvement: 3
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [151, 593, 954],
                required_improvement: 5
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [151, 593, 954],
                required_improvement: 7
            },
            {
                bonus: { anti_air: 1 },
                ship_ids: [151, 593, 954],
                required_improvement: 8
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [151, 593, 954],
                required_improvement: 9
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [151, 593, 954],
                required_improvement: 10
            },
            {
                bonus: { anti_air: 1 },
                ship_ids: [591],
                required_improvement: 4
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [591],
                required_improvement: 6
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [591],
                required_improvement: 8
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [591],
                required_improvement: 10
            },
            {
                bonus: { anti_air: 1 },
                ship_ids: [149, 150, 152, 592, 694],
                required_improvement: 7
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [149, 150, 152, 592, 694],
                required_improvement: 9
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [149, 150, 152, 592, 694],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [290],
        bonuses: [
            {
                bonus: { fire_power: 3, anti_air: 2, shell_accuracy: 3, evasion: 1 },
                ship_ids: [553, 554]
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [554]
            },
            {
                bonus: { fire_power: 2, anti_air: 2, evasion: 1 },
                ship_ids: [82, 88]
            },
            {
                bonus: { anti_air: 2, evasion: 3 },
                ship_ids: [82, 88, 553, 554],
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [411, 412]
            }
        ]
    },
    {
        ids: [291],
        bonuses: [
            {
                bonus: { fire_power: 6, evasion: 1 },
                ship_ids: [553, 554]
            }
        ]
    },
    {
        ids: [292],
        bonuses: [
            {
                bonus: { fire_power: 8, anti_air: 1, evasion: 2 },
                ship_ids: [553, 554]
            }
        ]
    },
    {
        ids: [293],
        bonuses: [
            {
                bonus: { fire_power: 2, anti_air: 1, evasion: 3 },
                ship_class_ids: [28, 66]
            },
            {
                bonus: { fire_power: 2, torpedo: 1, evasion: 3 },
                ship_class_ids: [28, 66],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2, torpedo: 4 },
                ship_class_ids: [28, 66],
                requires_synergy_equip_id: [174],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, torpedo: 3 },
                ship_class_ids: [28, 66],
                requires_synergy_equip_id: [174],
                requires_synergy_equip_count: 2,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, anti_air: 1, evasion: 2 },
                ship_class_ids: [74, 77]
            },
            {
                bonus: { fire_power: 2, asw: 1, evasion: 3 },
                ship_class_ids: [74, 77],
                requires_surface_radar: true,
                stack_limit: 1
            }
        ]
    },
    {
        ids: [294],
        bonuses: [
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [1, 5, 12]
            },
            {
                bonus: { fire_power: 3, torpedo: 1, evasion: 2 },
                ship_class_ids: [1, 5, 12],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, torpedo: 3 },
                ship_class_ids: [1, 5, 12],
                requires_synergy_equip_id: [13, 125, 285],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, torpedo: 2 },
                ship_class_ids: [1, 5, 12],
                requires_synergy_equip_id: [13, 125, 285],
                requires_synergy_equip_count: 2,
                stack_limit: 1
            },
            {
                bonus: { torpedo: 1 },
                ship_class_ids: [1, 5, 12],
                requires_synergy_equip_id: [285],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [959]
            },
            {
                bonus: { fire_power: 2 },
                ship_ids: [959],
                stack_limit: 2
            },
            {
                bonus: { fire_power: 3 },
                ship_ids: [959],
                stack_limit: 3
            },
            {
                bonus: { shell_accuracy: 4 },
                ship_ids: [959],
                required_improvement: 6
            },
            {
                bonus: { fire_power: 6 },
                ship_ids: [959],
                required_improvement: 7
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [959],
                required_improvement: 8
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [959],
                required_improvement: 9
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [959],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [295],
        bonuses: [
            {
                bonus: { fire_power: 2, anti_air: 2 },
                ship_class_ids: [1, 5, 12]
            },
            {
                bonus: { fire_power: 3, torpedo: 1, evasion: 2 },
                ship_class_ids: [1, 5, 12],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { anti_air: 6 },
                ship_class_ids: [1, 5, 12],
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, anti_air: 1, asw: 1 },
                ship_ids: [666]
            },
            {
                bonus: { fire_power: 1, torpedo: 3 },
                ship_class_ids: [1, 5, 12],
                requires_synergy_equip_id: [13, 125, 285],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, torpedo: 2 },
                ship_class_ids: [1, 5, 12],
                requires_synergy_equip_id: [13, 125, 285],
                requires_synergy_equip_count: 2,
                stack_limit: 1
            },
            {
                bonus: { torpedo: 1 },
                ship_class_ids: [1, 5, 12],
                requires_synergy_equip_id: [285],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2 },
                ship_ids: [959]
            },
            {
                bonus: { fire_power: 2 },
                ship_ids: [959],
                stack_limit: 2
            },
            {
                bonus: { fire_power: 3 },
                ship_ids: [959],
                stack_limit: 3
            }
        ]
    },
    {
        ids: [296],
        bonuses: [
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [1, 5, 10]
            },
            {
                bonus: { fire_power: 1, torpedo: 2, evasion: 2 },
                ship_class_ids: [1, 5, 10],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { anti_air: 5 },
                ship_class_ids: [1, 5, 10],
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                bonus: { evasion: 1 },
                ship_class_ids: [10]
            },
            {
                bonus: { fire_power: 1, evasion: 1 },
                ship_class_ids: [23]
            },
            {
                bonus: { fire_power: 1, torpedo: 3, evasion: 2 },
                ship_class_ids: [23],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { anti_air: 6 },
                ship_class_ids: [23],
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, anti_air: 1 },
                ship_ids: [145, 961]
            },
            {
                bonus: { fire_power: 1, torpedo: 1 },
                ship_ids: [144]
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [242, 244, 469, 587, 588, 667]
            },
            {
                bonus: { fire_power: 1, evasion: 1 },
                ship_ids: [497]
            },
            {
                bonus: { anti_air: 1, evasion: 1 },
                ship_ids: [498, 975]
            },
            {
                bonus: { fire_power: 2, torpedo: 1 },
                ship_ids: [627]
            },
            {
                bonus: { fire_power: 1, torpedo: 3 },
                ship_class_ids: [1, 5, 10],
                requires_synergy_equip_id: [125, 285],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, torpedo: 3 },
                ship_class_ids: [23],
                requires_synergy_equip_id: [15, 286],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 3 },
                ship_ids: [903, 908]
            }
        ]
    },
    {
        ids: [297],
        bonuses: [
            {
                bonus: { evasion: 2 },
                ship_class_ids: [12]
            },
            {
                bonus: { evasion: 1 },
                ship_class_ids: [1, 5]
            }
        ]
    },
    {
        ids: [298, 299, 300],
        bonuses: [
            {
                bonus: { fire_power: 2, armor: 1 },
                ship_class_ids: [67, 78, 82, 88, 108, 112]
            },
            {
                bonus: { evasion: -2 },
                ship_class_ids: [67]
            },
            {
                bonus: { fire_power: 1, armor: 1, evasion: -3 },
                ship_ids: [149, 150, 151, 152]
            },
            {
                bonus: { fire_power: 2, armor: 1, evasion: -2 },
                ship_ids: [591, 592, 694]
            },
            {
                bonus: { fire_power: 1, armor: 1, evasion: -1 },
                ship_ids: [593, 954]
            }
        ]
    },
    {
        ids: [301],
        bonuses: [
            {
                bonus: { anti_air: 2, armor: 1, evasion: 1 },
                ship_class_ids: [67, 78, 82, 88, 108, 112]
            }
        ]
    },
    {
        ids: [302],
        bonuses: [
            {
                bonus: { asw: 1, evasion: 1 },
                ship_class_ids: [76]
            }
        ]
    },
    {
        ids: [303],
        bonuses: [
            {
                bonus: { fire_power: 1, anti_air: 1 },
                ship_class_ids: [4, 16, 20, 41]
            },
            {
                bonus: { fire_power: 1, anti_air: 2, evasion: 1 },
                ship_class_ids: [89]
            }
        ]
    },
    {
        ids: [304],
        bonuses: [
            {
                bonus: { fire_power: 1, asw: 1, evasion: 1 },
                ship_class_ids: [4, 16, 20, 41]
            },
            {
                bonus: { fire_power: 1, asw: 2, evasion: 2 },
                ship_class_ids: [89]
            }
        ]
    },
    {
        ids: [305, 306],
        bonuses: [
            {
                bonus: { asw: 1, evasion: 1 },
                ship_class_ids: [76]
            },
            {
                bonus: { asw: 2, evasion: 1 },
                ship_base_ids: [534]
            },
            {
                bonus: { fire_power: 1, evasion: 1 },
                ship_base_ids: [432, 444]
            }
        ]
    },
    {
        ids: [307],
        bonuses: [
            {
                bonus: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_country_ids: [Country.USA]
            }
        ]
    },
    {
        ids: [308],
        bonuses: [
            {
                bonus: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_country_ids: [Country.USA]
            },
            {
                bonus: { fire_power: 1 },
                ship_type_ids: [ST.DD]
            },
            {
                bonus: { anti_air: 1, evasion: 1 },
                ship_type_ids: [ST.DE]
            },
            {
                bonus: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_ids: [651, 656]
            }
        ]
    },
    {
        ids: [310, 518],
        bonuses: [
            {
                bonus: { fire_power: 2, anti_air: 1, evasion: 1 },
                ship_class_ids: [34]
            },
            {
                bonus: { fire_power: 2 },
                ship_class_ids: [34],
                required_improvement: 10
            },
            {
                bonus: { fire_power: 2, evasion: 1 },
                ship_class_ids: [56]
            },
            {
                bonus: { fire_power: 2, evasion: 2 },
                ship_class_ids: [56],
                required_improvement: 10
            },
            {
                bonus: { fire_power: 3, torpedo: 2, anti_air: 1, evasion: 1 },
                ship_class_ids: [90]
            },
            {
                bonus: { fire_power: 1, torpedo: 1 },
                ship_class_ids: [90],
                required_improvement: 10
            },
            {
                bonus: { fire_power: 2, asw: 1, evasion: 1 },
                ship_ids: [622, 623, 624]
            },
            {
                bonus: { fire_power: 3, torpedo: 2, evasion: 2 },
                ship_ids: [622, 623, 624],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, torpedo: 1 },
                ship_ids: [622, 623, 624],
                required_improvement: 7
            }
        ]
    },
    {
        ids: [518], // 14cm連装砲改二
        bonuses: [
            {
                bonus: { fire_power: 1, anti_air: 1, asw: 1, evasion: 1 },
                ship_class_ids: [34, 56]
            },
            {
                bonus: { fire_power: 1, torpedo: 1, evasion: 1 },
                ship_type_ids: [ST.AV]
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [622, 623, 624]
            },
            {
                bonus: { anti_air: 1 },
                ship_ids: [622, 624]
            },
            {
                bonus: { asw: 2 },
                ship_ids: [624]
            }
        ]
    },
    {
        ids: [313],
        bonuses: [
            {
                bonus: { fire_power: 2, anti_air: 2, armor: 1, evasion: 1 },
                ship_class_ids: [87, 91]
            },
            {
                bonus: { fire_power: 2, anti_air: 2, armor: 1, evasion: 1 },
                ship_ids: [651, 656]
            }
        ]
    },
    {
        ids: [314],
        bonuses: [
            {
                bonus: { fire_power: 1, torpedo: 3 },
                ship_class_ids: [87, 91]
            }
        ]
    },
    {
        ids: [315],
        bonuses: [
            {
                bonus: { fire_power: 2, evasion: 3, los: 4 },
                ship_country_ids: [Country.USA]
            },
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [87, 91]
            },
            {
                bonus: { range: 1 },
                ship_class_ids: [87, 91],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2, evasion: 2, los: 3, range: 1 },
                ship_ids: [651, 656],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [316],
        bonuses: [
            {
                bonus: { fire_power: 4, anti_air: 1, evasion: 1 },
                ship_class_ids: [68]
            }
        ]
    },
    {
        ids: [317],
        bonuses: [
            {
                bonus: { fire_power: 2, anti_air: 1 },
                ship_class_ids: [6],
                stack_limit: 1
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_class_ids: [6],
                required_improvement: 8,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_class_ids: [2],
                stack_limit: 1
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_class_ids: [2],
                required_improvement: 10,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2, anti_air: 2 },
                ship_ids: [149, 591, 592],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, anti_air: 1 },
                ship_ids: [150],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_ids: [151],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, anti_air: 3, evasion: 2 },
                ship_ids: [593],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2, anti_air: 2, evasion: 1 },
                ship_ids: [954],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2, anti_air: 1 },
                ship_ids: [152, 694],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, anti_air: 2 },
                ship_ids: [541],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2, anti_air: 2, evasion: 1 },
                ship_ids: [573],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [318],
        bonuses: [
            {
                bonus: { fire_power: 1 },
                ship_ids: [411, 412]
            },
            {
                bonus: { fire_power: 2, anti_air: 2, evasion: 2 },
                ship_ids: [82, 88]
            },
            {
                bonus: { fire_power: 2, anti_air: 2, shell_accuracy: 3, evasion: 2 },
                ship_ids: [553]
            },
            {
                bonus: { armor: 1, evasion: 2 },
                ship_ids: [553],
                requires_synergy_equip_id: [290],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 3, anti_air: 2, shell_accuracy: 3, evasion: 2 },
                ship_ids: [554]
            },
            {
                bonus: { fire_power: 1, armor: 1, shell_accuracy: 1, evasion: 2 },
                ship_ids: [554],
                requires_synergy_equip_id: [290],
                stack_limit: 1
            },
            {
                bonus: { anti_air: 2, shell_accuracy: 1, evasion: 3 },
                ship_ids: [82, 88, 553, 554],
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                bonus: { anti_air: -2, shell_accuracy: -1, evasion: -3 },
                ship_ids: [82, 88, 553, 554],
                requires_air_radar: true,
                requires_synergy_equip_id: [290],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 3, anti_air: 2, shell_accuracy: 2, evasion: 1 },
                ship_ids: [541, 573]
            },
            {
                bonus: { fire_power: 2, armor: 1, shell_accuracy: 1, evasion: 2 },
                ship_ids: [541, 573],
                requires_synergy_equip_id: [290],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [319],
        bonuses: [
            {
                bonus: { fire_power: 7, anti_air: 3, evasion: 2 },
                ship_ids: [553, 554]
            }
        ]
    },
    {
        ids: [320],
        bonuses: [
            {
                bonus: { fire_power: 2 },
                ship_ids: [553]
            },
            {
                bonus: { fire_power: 3 },
                ship_ids: [196, 197]
            },
            {
                bonus: { fire_power: 4 },
                ship_ids: [508, 509, 554]
            }
        ]
    },
    {
        ids: [322],
        bonuses: [
            {
                bonus: { fire_power: 5, anti_air: 2, asw: 1, evasion: 2 },
                ship_ids: [553, 554]
            }
        ]
    },
    {
        ids: [323],
        bonuses: [
            {
                bonus: { fire_power: 6, anti_air: 3, asw: 2, evasion: 3 },
                ship_ids: [553, 554]
            }
        ]
    },
    {
        ids: [324, 325],
        bonuses: [
            {
                bonus: { fire_power: 2, asw: 3, evasion: 1 },
                ship_ids: [554, 646]
            },
            {
                bonus: { fire_power: 1, asw: 2, evasion: 1 },
                ship_ids: [553]
            }
        ]
    },
    {
        ids: [326],
        bonuses: [
            {
                bonus: { fire_power: 3, asw: 5, evasion: 3 },
                ship_ids: [646]
            },
            {
                bonus: { fire_power: 3, asw: 4, evasion: 2 },
                ship_ids: [554]
            },
            {
                bonus: { fire_power: 1, asw: 3, evasion: 1 },
                ship_ids: [553]
            }
        ]
    },
    {
        ids: [327],
        bonuses: [
            {
                bonus: { fire_power: 5, asw: 6, evasion: 4 },
                ship_ids: [646]
            },
            {
                bonus: { fire_power: 4, asw: 5, evasion: 2 },
                ship_ids: [554]
            },
            {
                bonus: { fire_power: 2, asw: 4, evasion: 1 },
                ship_ids: [553]
            }
        ]
    },
    {
        ids: [328],
        bonuses: [
            {
                bonus: { fire_power: 1, evasion: 1 },
                ship_base_ids: [78, 79, 85, 86]
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [149, 150, 151, 152, 209, 210, 211, 212]
            },
            {
                bonus: { fire_power: 2, torpedo: 1 },
                ship_ids: [591]
            },
            {
                bonus: { fire_power: 2, anti_air: 1 },
                ship_ids: [592, 694, 954]
            },
            {
                bonus: { fire_power: 1, anti_air: 2 },
                ship_ids: [593]
            },
            {
                bonus: { fire_power: 1 },
                ship_base_ids: [26, 27, 77, 87]
            }
        ]
    },
    {
        ids: [329],
        bonuses: [
            {
                bonus: { fire_power: 1, evasion: 1 },
                ship_base_ids: [78, 79, 85, 86]
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [209, 210, 211, 212]
            },
            {
                bonus: { fire_power: 2, anti_air: 1 },
                ship_ids: [149, 150, 151, 152]
            },
            {
                bonus: { fire_power: 3, torpedo: 2, anti_air: 1 },
                ship_ids: [591, 592, 954]
            },
            {
                bonus: { fire_power: 2, torpedo: 1, anti_air: 3 },
                ship_ids: [593]
            },
            {
                bonus: { fire_power: 4, torpedo: 1, anti_air: 1 },
                ship_ids: [694]
            },
            {
                bonus: { fire_power: 1 },
                ship_base_ids: [26, 27, 77, 87]
            }
        ]
    },
    {
        ids: [330],
        bonuses: [
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [93]
            },
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [19, 88]
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [541, 573, 576]
            }
        ]
    },
    {
        ids: [331],
        bonuses: [
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [93]
            },
            {
                bonus: { fire_power: 1, evasion: 1 },
                ship_ids: [918, 1496]
            },
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [19, 88]
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [541, 573, 576]
            }
        ]
    },
    {
        ids: [332],
        bonuses: [
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [93]
            },
            {
                bonus: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_ids: [918, 1496]
            },
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [19, 88]
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [541, 573, 576]
            }
        ]
    },
    {
        ids: [335],
        bonuses: [
            {
                bonus: { anti_air: 1, evasion: 1 },
                ship_ids: [277, 278]
            },
            {
                bonus: { anti_air: 2, evasion: 1 },
                ship_ids: [594, 599, 610, 646, 698]
            }
        ]
    },
    {
        ids: [336],
        bonuses: [
            {
                bonus: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_ids: [277, 278]
            },
            {
                bonus: { fire_power: 1, anti_air: 2, evasion: 1 },
                ship_ids: [594, 599, 610, 646, 698]
            }
        ]
    },
    {
        ids: [337],
        bonuses: [
            {
                bonus: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_ids: [277, 278]
            },
            {
                bonus: { fire_power: 2, anti_air: 2, evasion: 1 },
                ship_ids: [594, 599, 610, 646, 698]
            }
        ]
    },
    {
        ids: [338],
        bonuses: [
            {
                bonus: { fire_power: 1, anti_air: 1, evasion: 2 },
                ship_ids: [277, 278]
            },
            {
                bonus: { fire_power: 1, anti_air: 2, evasion: 3 },
                ship_ids: [594, 646, 698]
            },
            {
                bonus: { fire_power: 4, anti_air: 3, evasion: 4 },
                ship_ids: [599, 610]
            }
        ]
    },
    {
        ids: [339],
        bonuses: [
            {
                bonus: { fire_power: 1, anti_air: 2, evasion: 2 },
                ship_ids: [277, 278]
            },
            {
                bonus: { fire_power: 1, anti_air: 3, evasion: 4 },
                ship_ids: [594, 646, 698]
            },
            {
                bonus: { fire_power: 6, anti_air: 4, evasion: 5 },
                ship_ids: [599, 610]
            }
        ]
    },
    {
        ids: [340],
        bonuses: [
            {
                bonus: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_base_ids: [589, 590]
            }
        ]
    },
    {
        ids: [341],
        bonuses: [
            {
                bonus: { fire_power: 2, anti_air: 1, evasion: 1 },
                ship_base_ids: [589, 590]
            },
            {
                bonus: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_base_ids: [574]
            }
        ]
    },
    {
        ids: [342],
        bonuses: [
            {
                bonus: { fire_power: 1 },
                ship_ids: [277, 278, 461, 462, 466, 467]
            },
            {
                bonus: { fire_power: 2, anti_air: 1, evasion: 1 },
                ship_ids: [594, 646, 698]
            },
            {
                bonus: { fire_power: 3, anti_air: 2, evasion: 2 },
                ship_ids: [599, 610]
            }
        ]
    },
    {
        ids: [343],
        bonuses: [
            {
                bonus: { fire_power: 2 },
                ship_ids: [277, 278]
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [461, 462, 466, 467]
            },
            {
                bonus: { fire_power: 3, anti_air: 2, evasion: 1 },
                ship_ids: [594, 646, 698]
            },
            {
                bonus: { fire_power: 5, anti_air: 3, evasion: 3 },
                ship_ids: [599, 610]
            }
        ]
    },
    {
        ids: [344],
        bonuses: [
            {
                bonus: { fire_power: 3 },
                ship_ids: [599, 610]
            },
            {
                bonus: { fire_power: 2, asw: 2 },
                ship_ids: [555, 560]
            },
            {
                bonus: { fire_power: 4, asw: 1 },
                ship_ids: [318]
            },
            {
                bonus: { fire_power: 2, asw: 1 },
                ship_ids: [282]
            },
            {
                bonus: { fire_power: 4, asw: 2 },
                ship_ids: [888]
            },
            {
                bonus: { fire_power: 5, asw: 2 },
                ship_ids: [883]
            }
        ]
    },
    {
        ids: [345],
        bonuses: [
            {
                bonus: { fire_power: 3, evasion: 1 },
                ship_ids: [599, 610]
            },
            {
                bonus: { fire_power: 3, asw: 2, evasion: 2 },
                ship_ids: [555, 560]
            },
            {
                bonus: { fire_power: 5, asw: 1, evasion: 2 },
                ship_ids: [318]
            },
            {
                bonus: { fire_power: 3, asw: 1, evasion: 1 },
                ship_ids: [282]
            },
            {
                bonus: { fire_power: 4, asw: 2, evasion: 2 },
                ship_ids: [888]
            },
            {
                bonus: { fire_power: 5, asw: 2, evasion: 3 },
                ship_ids: [883]
            }
        ]
    },
    {
        ids: [356, 357],
        bonuses: [
            {
                bonus: { fire_power: 2 },
                ship_class_ids: [95]
            },
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [9]
            }
        ]
    },
    {
        ids: [358],
        bonuses: [
            {
                bonus: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_country_ids: [Country.USA]
            },
            {
                bonus: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_class_ids: [67, 78, 82, 88, 108, 112]
            },
            {
                bonus: { fire_power: 1, anti_air: 2, evasion: 2 },
                ship_class_ids: [95]
            }
        ]
    },
    {
        ids: [359],
        bonuses: [
            {
                bonus: { fire_power: 2, anti_air: 2, evasion: 1 },
                ship_base_ids: [613]
            },
            {
                bonus: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_base_ids: [115]
            },
            {
                bonus: { fire_power: 1, anti_air: 1 },
                ship_ids: [622, 623, 624]
            }
        ]
    },
    {
        ids: [360, 361],
        bonuses: [
            {
                bonus: { fire_power: 2, anti_air: 2, evasion: 1 },
                ship_base_ids: [604]
            },
            {
                bonus: { fire_power: 2, anti_air: 1, evasion: 1 },
                ship_base_ids: [574]
            },
            {
                bonus: { fire_power: 1, anti_air: 1 },
                ship_class_ids: [41]
            }
        ]
    },
    {
        ids: [362, 363],
        bonuses: [
            {
                bonus: { fire_power: 1, anti_air: 2, evasion: 1 },
                ship_class_ids: [99]
            },
            {
                bonus: { fire_power: -3, anti_air: -3, evasion: -8 },
                ship_class_ids: [21, 34]
            },
            {
                bonus: { fire_power: -3, anti_air: -2, evasion: -6 },
                ship_class_ids: [4, 16, 20]
            },
            {
                bonus: { fire_power: -2, anti_air: -1, evasion: -4 },
                ship_class_ids: [56, 89]
            },
            {
                bonus: { anti_air: -1, evasion: -2 },
                ship_class_ids: [41, 52, 98]
            },
            {
                bonus: { anti_air: 1, evasion: 1 },
                ship_country_ids: [Country.USA]
            }
        ]
    },
    {
        ids: [364],
        bonuses: [
            {
                bonus: { fire_power: 1, torpedo: 1, evasion: 5 },
                ship_ids: [118, 119, 506, 507, 586, 623, 657, 668]
            },
            {
                bonus: { torpedo: 1 },
                ship_ids: [119]
            },
            {
                bonus: { torpedo: 2 },
                ship_ids: [507]
            },
            {
                bonus: { fire_power: 1, torpedo: 3 },
                ship_ids: [623]
            },
            {
                bonus: { fire_power: -1, evasion: -7 }
            }
        ]
    },
    {
        ids: [365],
        bonuses: [
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [2, 6, 19, 26, 37],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [136, 148, 541, 546, 573, 593, 911, 916],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2 },
                ship_ids: [591, 592, 694, 954],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [367],
        bonuses: [
            {
                bonus: { fire_power: 2, asw: 1, evasion: 1, los: 1 },
                ship_base_ids: [574]
            },
            {
                bonus: { fire_power: 1, asw: 1, evasion: 1, los: 1 },
                ship_class_ids: [70]
            },
            {
                bonus: { fire_power: 1, evasion: 1, los: 1 },
                ship_class_ids: [62, 72]
            },
            {
                bonus: { fire_power: 2, evasion: 2, los: 2 },
                ship_class_ids: [67, 78, 82, 88, 108, 112]
            }
        ]
    },
    {
        ids: [368],
        bonuses: [
            {
                bonus: { fire_power: 4, asw: 3, evasion: 2, los: 3 },
                ship_base_ids: [574]
            },
            {
                bonus: { fire_power: 2, torpedo: 2, evasion: 1, los: 1 },
                ship_ids: [630],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2, asw: 3, evasion: 1, los: 2 },
                ship_class_ids: [70]
            },
            {
                bonus: { fire_power: 1, asw: 2, evasion: 1, los: 2 },
                ship_class_ids: [62, 72]
            },
            {
                bonus: { fire_power: 2, asw: 2, evasion: 2, los: 2 },
                ship_class_ids: [67, 78, 82, 88, 108, 112]
            }
        ]
    },
    {
        ids: [369],
        bonuses: [
            {
                bonus: { fire_power: 5, asw: 4, evasion: 4, los: 3 },
                ship_base_ids: [574]
            },
            {
                bonus: { fire_power: 3, torpedo: 3, evasion: 2, los: 2 },
                ship_ids: [630],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 3, asw: 3, evasion: 2, los: 3 },
                ship_class_ids: [70]
            },
            {
                bonus: { fire_power: 2, asw: 2, evasion: 1, los: 2 },
                ship_class_ids: [62, 72]
            },
            {
                bonus: { fire_power: 2, asw: 2, evasion: 2, los: 2 },
                ship_class_ids: [67, 78, 82, 88, 108, 112]
            }
        ]
    },
    {
        ids: [370],
        bonuses: [
            {
                bonus: { fire_power: 1, asw: 3, evasion: 1, los: 2 },
                ship_base_ids: [574]
            },
            {
                bonus: { fire_power: 1, asw: 3, evasion: 1, los: 1 },
                ship_class_ids: [70]
            },
            {
                bonus: { fire_power: 1, asw: 2, evasion: 1, los: 1 },
                ship_class_ids: [62, 72]
            },
            {
                bonus: { fire_power: 2, asw: 3, evasion: 2, los: 2 },
                ship_class_ids: [67, 78, 82, 88, 108, 112]
            },
            {
                bonus: { fire_power: 4, evasion: 1, los: 1 },
                ship_base_ids: [439],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 3, evasion: 2, los: 1 },
                ship_base_ids: [927],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [371],
        bonuses: [
            {
                bonus: { fire_power: 4, asw: 2, evasion: 3, los: 6 },
                ship_base_ids: [574]
            },
            {
                bonus: { fire_power: 2, evasion: 2, los: 3 },
                ship_ids: [630],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2, asw: 1, evasion: 2, los: 4 },
                ship_class_ids: [70]
            },
            {
                bonus: { fire_power: 2, evasion: 1, los: 3 },
                ship_class_ids: [79]
            },
            {
                bonus: { fire_power: 3, asw: 1, evasion: 2, los: 3 },
                ship_class_ids: [67, 78, 82, 88, 108, 112]
            },
            {
                bonus: { fire_power: 3, evasion: 2, los: 2 },
                ship_class_ids: [88],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [372],
        bonuses: [
            {
                bonus: { fire_power: 1 },
                ship_base_ids: [75, 92, 110, 111, 153]
            },
            {
                bonus: { torpedo: 1 },
                ship_base_ids: [110, 111, 153],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [108, 109, 291, 292, 296, 297, 508, 509]
            },
            {
                bonus: { asw: 1 },
                ship_ids: [74, 116, 117, 185, 282, 318, 555, 560]
            },
            {
                bonus: { torpedo: 1 },
                ship_ids: [318, 555, 560],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2, asw: 1 },
                ship_ids: [883, 888]
            },
            {
                bonus: { torpedo: 2 },
                ship_ids: [883, 888],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [373],
        bonuses: [
            {
                bonus: { fire_power: 2 },
                ship_base_ids: [110]
            },
            {
                bonus: { fire_power: 1 },
                ship_base_ids: [75, 92, 111, 153]
            },
            {
                bonus: { torpedo: 2, evasion: 2 },
                ship_base_ids: [110, 153],
                stack_limit: 1
            },
            {
                bonus: { torpedo: 2, evasion: 3 },
                ship_base_ids: [111],
                stack_limit: 1
            },
            {
                bonus: { torpedo: 1, evasion: 1 },
                ship_base_ids: [75, 92],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [108, 109, 291, 292, 296, 297, 508, 509]
            },
            {
                bonus: { asw: 1 },
                ship_ids: [74, 116]
            },
            {
                bonus: { fire_power: 1, asw: 1 },
                ship_ids: [117, 185, 282]
            },
            {
                bonus: { fire_power: 1, asw: 2 },
                ship_ids: [318, 555, 560, 883]
            },
            {
                bonus: { fire_power: 2, asw: 2 },
                ship_ids: [888]
            },
            {
                bonus: { torpedo: 1 },
                ship_ids: [117, 185, 282, 291, 292],
                stack_limit: 1
            },
            {
                bonus: { torpedo: 1, evasion: 1 },
                ship_ids: [296, 297, 318, 555, 560],
                stack_limit: 1
            },
            {
                bonus: { torpedo: 2, evasion: 2 },
                ship_ids: [508, 509, 888],
                stack_limit: 1
            },
            {
                bonus: { torpedo: 3, evasion: 4 },
                ship_ids: [883],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [374],
        bonuses: [
            {
                bonus: { fire_power: 3 },
                ship_base_ids: [110]
            },
            {
                bonus: { fire_power: 2 },
                ship_base_ids: [111, 153]
            },
            {
                bonus: { fire_power: 1 },
                ship_base_ids: [75, 92]
            },
            {
                bonus: { torpedo: 3, evasion: 3 },
                ship_base_ids: [110],
                stack_limit: 1
            },
            {
                bonus: { torpedo: 3, evasion: 4 },
                ship_base_ids: [111],
                stack_limit: 1
            },
            {
                bonus: { torpedo: 3, evasion: 2 },
                ship_base_ids: [153],
                stack_limit: 1
            },
            {
                bonus: { torpedo: 2, evasion: 2 },
                ship_base_ids: [75, 92],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [108, 109]
            },
            {
                bonus: { fire_power: 1, asw: 1 },
                ship_ids: [74, 116, 291, 292, 296, 297]
            },
            {
                bonus: { fire_power: 1, asw: 2 },
                ship_ids: [117, 185, 282, 508, 509]
            },
            {
                bonus: { fire_power: 1, asw: 3 },
                ship_ids: [318, 555, 560]
            },
            {
                bonus: { fire_power: 2, asw: 3 },
                ship_ids: [883]
            },
            {
                bonus: { fire_power: 3, asw: 3 },
                ship_ids: [888]
            },
            {
                bonus: { torpedo: 1 },
                ship_ids: [108, 109, 291, 292],
                stack_limit: 1
            },
            {
                bonus: { torpedo: 1, evasion: 1 },
                ship_ids: [117, 185, 282, 296, 297],
                stack_limit: 1
            },
            {
                bonus: { torpedo: 1, evasion: 2 },
                ship_ids: [318, 555, 560],
                stack_limit: 1
            },
            {
                bonus: { torpedo: 2, evasion: 3 },
                ship_ids: [508, 509, 888],
                stack_limit: 1
            },
            {
                bonus: { torpedo: 3, evasion: 5 },
                ship_ids: [883],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [375],
        bonuses: [
            {
                bonus: { fire_power: 3, anti_air: 3, asw: 3, evasion: 3 },
                ship_class_ids: [69, 83, 84, 105, 116, 118]
            },
            {
                bonus: { fire_power: 1, anti_air: 1, asw: 1, evasion: 1 },
                ship_base_ids: [84]
            }
        ]
    },
    {
        ids: [376],
        bonuses: [
            {
                bonus: { fire_power: 2, torpedo: 4 },
                ship_country_ids: [Country.USA]
            },
            {
                bonus: { fire_power: 1, torpedo: 2 },
                ship_class_ids: [67, 78, 82, 88, 108, 112]
            },
            {
                bonus: { fire_power: 1, torpedo: 1 },
                ship_class_ids: [96]
            }
        ]
    },
    {
        ids: [377],
        bonuses: [
            {
                bonus: { asw: 2, evasion: 1 },
                ship_country_ids: [Country.USA],
                stack_limit: 1
            },
            {
                bonus: { asw: 1, evasion: 2 },
                ship_ids: [629, 651, 656],
                stack_limit: 1
            },
            {
                bonus: { asw: 1, evasion: 1 },
                ship_class_ids: [67, 78, 82, 88, 96, 108, 112],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [378],
        bonuses: [
            {
                bonus: { asw: 3, evasion: 1 },
                ship_country_ids: [Country.USA],
                stack_limit: 1
            },
            {
                bonus: { asw: 1, evasion: 1 },
                ship_ids: [629, 651, 656],
                stack_limit: 1
            },
            {
                bonus: { asw: 2, evasion: 1 },
                ship_class_ids: [67, 78, 82, 88, 108, 112],
                stack_limit: 1
            },
            {
                bonus: { asw: 1, evasion: 1 },
                ship_class_ids: [96],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [379],
        bonuses: [
            {
                bonus: { fire_power: 1, anti_air: 2 },
                ship_type_ids: [ST.DE]
            },
            {
                bonus: { fire_power: 1, anti_air: 1 },
                ship_type_ids: [ST.AV, ST.CT]
            },
            {
                bonus: { fire_power: 1, anti_air: 2 },
                ship_class_ids: [28, 66, 101]
            },
            {
                bonus: { fire_power: 2, anti_air: 2 },
                ship_class_ids: [101],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2 },
                ship_base_ids: [22, 23, 56, 113]
            },
            {
                bonus: { fire_power: 2, anti_air: 2 },
                ship_base_ids: [24, 25]
            },
            {
                bonus: { asw: 1 },
                ship_base_ids: [22, 23, 56, 113, 115]
            },
            {
                bonus: { fire_power: 1 },
                ship_base_ids: [51, 52, 115]
            },
            {
                bonus: { anti_air: 4 },
                ship_ids: [488]
            },
            {
                bonus: { anti_air: 3 },
                ship_ids: [141, 160, 220, 487]
            },
            {
                bonus: { anti_air: 2 },
                ship_ids: [22, 23, 56, 113, 219, 224, 289]
            },
            {
                bonus: { fire_power: 3, anti_air: 3 },
                ship_ids: [651, 656]
            },
            {
                bonus: { asw: 2, evasion: 3 },
                ship_ids: [656]
            },
            {
                bonus: { asw: 1 },
                ship_ids: [141, 160, 487, 488]
            },
            {
                bonus: { asw: 2 },
                ship_ids: [477, 478, 624]
            },
            {
                bonus: { anti_air: 2 },
                ship_ids: [477, 478, 622, 624]
            },
            {
                bonus: { fire_power: 2, anti_air: 2 },
                ship_ids: [146, 547, 652, 657],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, evasion: 2 },
                ship_type_ids: [ST.CL, ST.CLT, ST.AV, ST.CT],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, evasion: 4 },
                ship_type_ids: [ST.DE],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2, evasion: 3 },
                ship_class_ids: [21, 28, 34, 66],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 4, evasion: 3 },
                ship_class_ids: [101],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2, evasion: 2 },
                ship_ids: [488, 651, 656],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, evasion: 1 },
                ship_ids: [118, 119, 141, 146, 160, 487, 547, 652, 657],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { anti_air: 3, evasion: 2 },
                ship_ids: [656],
                requires_air_radar: true,
                stack_limit: 1
            }
        ]
    },
    {
        ids: [380], // 12.7cm連装高角砲改二
        bonuses: [
            {
                bonus: { fire_power: 1, anti_air: 2 },
                ship_type_ids: [ST.AV, ST.CT]
            },
            {
                bonus: { fire_power: 1, anti_air: 2 },
                ship_class_ids: [101]
            },
            {
                bonus: { fire_power: 2, anti_air: 2 },
                ship_class_ids: [101],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2 },
                ship_base_ids: [22, 23, 56, 113]
            },
            {
                bonus: { fire_power: 3, anti_air: 2 },
                ship_base_ids: [24, 25]
            },
            {
                bonus: { asw: 1 },
                ship_base_ids: [22, 23, 56, 113, 115]
            },
            {
                bonus: { fire_power: 1 },
                ship_base_ids: [51, 52, 115]
            },
            {
                bonus: { anti_air: 4 },
                ship_ids: [488]
            },
            {
                bonus: { anti_air: 3 },
                ship_ids: [141, 160, 220, 487]
            },
            {
                bonus: { anti_air: 2 },
                ship_ids: [22, 23, 56, 113, 219, 224, 289]
            },
            {
                bonus: { fire_power: 3, anti_air: 3 },
                ship_ids: [651, 656]
            },
            {
                bonus: { fire_power: 2, anti_air: 2 },
                ship_ids: [407, 665]
            },
            {
                bonus: { fire_power: 1, anti_air: 1, evasion: 2 },
                ship_ids: [407, 665],
                stack_limit: 1
            },
            {
                bonus: { asw: 1 },
                ship_ids: [141, 160, 487, 488]
            },
            {
                bonus: { asw: 2 },
                ship_ids: [477, 478, 624]
            },
            {
                bonus: { anti_air: 2 },
                ship_ids: [477, 478, 622, 624]
            },
            {
                bonus: { fire_power: 3 },
                ship_ids: [652, 657]
            },
            {
                bonus: { fire_power: 2 },
                ship_ids: [146, 547],
                stack_limit: 1
            },
            {
                bonus: { anti_air: 2 },
                ship_ids: [146, 547, 652, 657],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2, evasion: 1 },
                ship_type_ids: [ST.CL, ST.CLT, ST.AV, ST.CT],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 4, evasion: 3 },
                ship_class_ids: [101],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, evasion: 2 },
                ship_ids: [118, 119, 141, 160, 487, 488, 651, 656],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, evasion: 3 },
                ship_ids: [146, 547, 652, 657],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2, evasion: 1 },
                ship_ids: [407, 665],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, anti_air: 2, evasion: 1 },
                ship_ids: [407, 665],
                requires_synergy_equip_type_ids: [21],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [381],
        bonuses: [
            {
                bonus: { fire_power: 1 },
                ship_country_ids: [Country.USA]
            },
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [102]
            },
            {
                bonus: { fire_power: 1 },
                ship_country_ids: [Country.USA],
                required_improvement: 6
            }
        ]
    },
    {
        ids: [382, 509],
        bonuses: [
            {
                bonus: { anti_air: 2, asw: 1, evasion: 2 },
                ship_type_ids: [ST.DE]
            },
            {
                bonus: { fire_power: 2, evasion: 3 },
                ship_type_ids: [ST.DE],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { anti_air: 2, evasion: 3 },
                ship_type_ids: [ST.DE],
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                bonus: { anti_air: 2, evasion: 1 },
                ship_class_ids: [28, 66, 101]
            },
            {
                bonus: { fire_power: 1, evasion: 2 },
                ship_class_ids: [28, 66, 101],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { anti_air: 2, evasion: 2 },
                ship_class_ids: [28, 66, 101],
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                bonus: { anti_air: 1 },
                ship_base_ids: [23, 56, 113]
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [220, 224, 289]
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [160, 487, 488]
            },
            {
                bonus: { fire_power: 1, evasion: 1 },
                ship_ids: [160, 487, 488],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { anti_air: 2, evasion: 2 },
                ship_ids: [160, 487, 488],
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                bonus: { anti_air: 3, evasion: 2 },
                ship_ids: [656]
            },
            {
                bonus: { fire_power: 2, evasion: 2 },
                ship_ids: [656],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { anti_air: 3, evasion: 2 },
                ship_ids: [656],
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, anti_air: 1, shell_accuracy: 1, evasion: 1 },
                ship_ids: [979]
            }
        ]
    },
    {
        ids: [509],
        bonuses: [
            {
                bonus: { anti_air: 1 },
                required_improvement: 2
            },
            {
                bonus: { evasion: 2 },
                required_improvement: 4
            },
            {
                bonus: { fire_power: 1 },
                required_improvement: 6
            },
            {
                bonus: { anti_air: 1 },
                required_improvement: 8
            },
            {
                bonus: { shell_accuracy: 1 },
                required_improvement: 10
            },
            {
                bonus: { anti_air: 1 },
                ship_type_ids: [ST.DE],
                required_improvement: 1
            },
            {
                bonus: { evasion: 2, anti_air: -1 },
                ship_type_ids: [ST.DE],
                required_improvement: 2
            },
            {
                bonus: { fire_power: 1, evasion: -2 },
                ship_type_ids: [ST.DE],
                required_improvement: 4
            },
            {
                bonus: { anti_air: 1, fire_power: -1 },
                ship_type_ids: [ST.DE],
                required_improvement: 6
            },
            {
                bonus: { shell_accuracy: 1, anti_air: -1 },
                ship_type_ids: [ST.DE],
                required_improvement: 8
            },
            {
                bonus: { anti_air: 1, shell_accuracy: -1 },
                ship_type_ids: [ST.DE],
                required_improvement: 10
            },
            {
                bonus: { anti_air: 1 },
                ship_class_ids: [28, 66, 101],
                required_improvement: 1
            },
            {
                bonus: { evasion: 2, anti_air: -1 },
                ship_class_ids: [28, 66, 101],
                required_improvement: 2
            },
            {
                bonus: { fire_power: 1, evasion: -2 },
                ship_class_ids: [28, 66, 101],
                required_improvement: 4
            },
            {
                bonus: { anti_air: 1, fire_power: -1 },
                ship_class_ids: [28, 66, 101],
                required_improvement: 6
            },
            {
                bonus: { shell_accuracy: 1, anti_air: -1 },
                ship_class_ids: [28, 66, 101],
                required_improvement: 8
            },
            {
                bonus: { anti_air: 1, shell_accuracy: -1 },
                ship_class_ids: [28, 66, 101],
                required_improvement: 10
            },
            {
                bonus: { anti_air: 1 },
                ship_ids: [145, 488, 656, 961],
                required_improvement: 1
            },
            {
                bonus: { evasion: 2, anti_air: -1 },
                ship_ids: [145, 488, 656, 961],
                required_improvement: 2
            },
            {
                bonus: { fire_power: 1, evasion: -2 },
                ship_ids: [145, 488, 656, 961],
                required_improvement: 4
            },
            {
                bonus: { anti_air: 1, fire_power: -1 },
                ship_ids: [145, 488, 656, 961],
                required_improvement: 6
            },
            {
                bonus: { shell_accuracy: 1, anti_air: -1 },
                ship_ids: [145, 488, 656, 961],
                required_improvement: 8
            },
            {
                bonus: { anti_air: 1, shell_accuracy: -1 },
                ship_ids: [145, 488, 656, 961],
                required_improvement: 10
            },
            {
                bonus: { fire_power: 1, evasion: 1 },
                ship_type_ids: [ST.CL, ST.CLT, ST.CT],
                required_improvement: 2,
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { anti_air: 2, evasion: 1 },
                ship_type_ids: [ST.CL, ST.CLT, ST.CT],
                required_improvement: 2,
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, anti_air: 1, evasion: 2 },
                ship_ids: [145],
                required_improvement: 2,
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { anti_air: 4, evasion: 2 },
                ship_ids: [145],
                required_improvement: 2,
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2, anti_air: 2, evasion: 3 },
                ship_ids: [961, 979],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, anti_air: 5, evasion: 3 },
                ship_ids: [961, 979],
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [979]
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [979],
                required_improvement: 3
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [979],
                required_improvement: 5
            },
            {
                bonus: { anti_air: 2 },
                ship_ids: [979],
                required_improvement: 7
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [979],
                required_improvement: 9
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [979],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [383],
        bonuses: [
            {
                bonus: { torpedo: 2 },
                ship_class_ids: [44]
            },
            {
                bonus: { torpedo: 1 },
                ship_base_ids: [127]
            },
            {
                bonus: { torpedo: 3 },
                ship_ids: [636]
            },
            {
                bonus: { torpedo: 4 },
                ship_ids: [607]
            },
            {
                bonus: { torpedo: 1 },
                ship_class_ids: [44],
                required_improvement: 4,
                stack_limit: 1
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_class_ids: [44],
                required_improvement: 6,
                stack_limit: 1
            },
            {
                bonus: { torpedo: 1 },
                required_improvement: 8,
                stack_limit: 1
            },
            {
                bonus: { shell_accuracy: 1 },
                required_improvement: 10,
                stack_limit: 1
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_base_ids: [127, 636],
                required_improvement: 5,
                stack_limit: 1
            }
        ]
    },
    {
        ids: [384],
        bonuses: [
            {
                bonus: { evasion: 3 },
                ship_class_ids: [44]
            },
            {
                bonus: { evasion: 2 },
                ship_base_ids: [127]
            },
            {
                bonus: { evasion: 3 },
                ship_ids: [636]
            },
            {
                bonus: { evasion: 4 },
                ship_ids: [607]
            },
            {
                bonus: { torpedo: 3, evasion: 2 },
                requires_synergy_equip_id: [213, 214, 383],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [385], // 16inch三連装砲 Mk.6 mod.2
        bonuses: [
            {
                bonus: { fire_power: 1 },
                ship_country_ids: [Country.USA]
            },
            {
                bonus: { fire_power: 1 },
                ship_country_ids: [Country.USA],
                required_improvement: 6
            },
            {
                bonus: { armor: 1 },
                ship_country_ids: [Country.USA],
                required_improvement: 10
            },
            {
                bonus: { fire_power: 1, armor: 1 },
                ship_class_ids: [102, 107]
            },
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [93]
            },
            {
                bonus: { fire_power: 1 },
                ship_type_ids: [ST.FBB]
            }
        ]
    },
    {
        ids: [386, 387],
        bonuses: [
            {
                bonus: { fire_power: 1 },
                ship_country_ids: [Country.USA]
            },
            {
                bonus: { fire_power: 1 },
                ship_country_ids: [Country.USA],
                required_improvement: 2
            },
            {
                bonus: { fire_power: 1 },
                ship_country_ids: [Country.USA],
                required_improvement: 7
            }
        ]
    },
    {
        ids: [389], // TBM-3W+3S
        bonuses: [
            {
                bonus: { fire_power: 2, evasion: 2 },
                ship_ids: [594, 599]
            },
            {
                bonus: { fire_power: 3, evasion: 2 },
                ship_ids: [610, 698]
            },
            {
                bonus: { fire_power: 4, asw: 4, evasion: 3 },
                ship_ids: [646] // 加賀改二護
            },
            {
                bonus: { fire_power: 3, asw: 6 },
                ship_ids: [646],
                requires_synergy_equip_type_ids: [25],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 5, asw: 4 },
                ship_ids: [646],
                requires_synergy_equip_id: [326, 327],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2, asw: 3, evasion: 1 },
                ship_country_ids: [Country.USA]
            }
        ]
    },
    {
        ids: [390],
        bonuses: [
            {
                bonus: { fire_power: 1 },
                ship_country_ids: [Country.USA]
            },
            {
                bonus: { fire_power: 1 },
                ship_country_ids: [Country.USA],
                required_improvement: 3
            },
            {
                bonus: { evasion: 1 },
                ship_country_ids: [Country.USA],
                required_improvement: 6
            },
            {
                bonus: { armor: 1 },
                ship_country_ids: [Country.USA],
                required_improvement: 10
            },
            {
                bonus: { fire_power: 1, armor: 1 },
                ship_class_ids: [102, 107]
            },
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [93]
            },
            {
                bonus: { fire_power: 1 },
                ship_type_ids: [ST.FBB]
            }
        ]
    },
    {
        ids: [391],
        bonuses: [
            {
                bonus: { fire_power: 1 },
                ship_base_ids: [75, 92, 110, 111]
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [116, 117, 185, 282, 318, 883, 888]
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [117, 318, 883, 888],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, evasion: 1 },
                ship_ids: [555, 560]
            }
        ]
    },
    {
        ids: [392],
        bonuses: [
            {
                bonus: { fire_power: 2, evasion: 1 },
                ship_base_ids: [110, 111]
            },
            {
                bonus: { fire_power: 1, evasion: 1 },
                ship_base_ids: [75, 92]
            },
            {
                bonus: { fire_power: 2, evasion: 1 },
                ship_ids: [116, 185, 282]
            },
            {
                bonus: { fire_power: 2, evasion: 2 },
                ship_ids: [117, 318, 883, 888]
            },
            {
                bonus: { fire_power: 3, evasion: 2 },
                ship_ids: [555, 560]
            }
        ]
    },
    {
        ids: [393],
        bonuses: [
            {
                bonus: { fire_power: 2, anti_air: 1, evasion: 1 },
                ship_class_ids: [61]
            }
        ]
    },
    {
        ids: [394],
        bonuses: [
            {
                bonus: { fire_power: 2, anti_air: 1, evasion: 2 },
                ship_class_ids: [61]
            },
            {
                bonus: { evasion: 1 },
                ship_base_ids: [614]
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_class_ids: [61],
                required_improvement: 7
            },
            {
                bonus: { fire_power: 1 },
                ship_base_ids: [614],
                required_improvement: 7
            },
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [61],
                required_improvement: 8
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_class_ids: [61],
                required_improvement: 9
            },
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [61],
                required_improvement: 10
            },
            {
                bonus: { evasion: 1 },
                ship_base_ids: [614],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [397],
        bonuses: [
            {
                bonus: { fire_power: 5, anti_air: 2, evasion: 1 },
                ship_ids: [651]
            },
            {
                bonus: { fire_power: 4, evasion: 1 },
                ship_ids: [651],
                required_improvement: 4
            },
            {
                bonus: { fire_power: 3, anti_air: 1, evasion: 1 },
                ship_ids: [656]
            },
            {
                bonus: { fire_power: 3, evasion: 3 },
                ship_ids: [651, 656],
                requires_surface_radar: true,
                stack_limit: 1
            }
        ]
    },
    {
        ids: [398],
        bonuses: [
            {
                bonus: { fire_power: 4, anti_air: 4, evasion: 2 },
                ship_ids: [651]
            },
            {
                bonus: { fire_power: 3, evasion: 2 },
                ship_ids: [651],
                required_improvement: 4
            },
            {
                bonus: { fire_power: 3, anti_air: 2, evasion: 2 },
                ship_ids: [656]
            },
            {
                bonus: { fire_power: 2, evasion: 1 },
                ship_ids: [656],
                required_improvement: 4
            },
            {
                bonus: { fire_power: 3, evasion: 3 },
                ship_ids: [651, 656],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { anti_air: 3, evasion: 3 },
                ship_ids: [651, 656],
                requires_air_radar: true,
                stack_limit: 1
            }
        ]
    },
    {
        ids: [399],
        bonuses: [
            {
                bonus: { fire_power: 1, evasion: 2 },
                ship_class_ids: [108]
            },
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [108],
                required_improvement: 3
            },
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [108],
                required_improvement: 5
            }
        ]
    },
    {
        ids: [400],
        bonuses: [
            {
                bonus: { fire_power: 1, torpedo: 8, armor: 1, evasion: 2 },
                ship_ids: [147]
            },
            {
                bonus: { fire_power: 2 },
                ship_ids: [147],
                requires_synergy_equip_id: [282],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, torpedo: 8, armor: 1, evasion: 2 },
                ship_country_ids: [Country.USSR]
            },
            {
                bonus: { fire_power: 2 },
                ship_country_ids: [Country.USSR],
                requires_synergy_equip_id: [282],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [407],
        bonuses: [
            {
                bonus: { fire_power: 4, anti_air: 2, evasion: 1 },
                ship_ids: [662, 663, 668]
            },
            {
                bonus: { fire_power: 2, torpedo: 2, evasion: 2 },
                ship_ids: [662, 663, 668],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { anti_air: 2, evasion: 3 },
                ship_ids: [662, 663, 668],
                requires_air_radar: true,
                stack_limit: 1
            }
        ]
    },
    {
        ids: [408],
        bonuses: [
            {
                bonus: { fire_power: 2, evasion: 2, los: 2 },
                ship_base_ids: [621]
            },
            {
                bonus: { fire_power: 1, asw: 1, evasion: 1, los: 1 },
                ship_base_ids: [161]
            },
            {
                bonus: { fire_power: 1, evasion: -5, los: 1 },
                ship_type_ids: [ST.DD]
            }
        ]
    },
    {
        ids: [409],
        bonuses: [
            {
                bonus: { fire_power: 1, anti_air: 2, evasion: 3 },
                ship_base_ids: [621]
            },
            {
                bonus: { fire_power: 1, anti_air: 1, asw: 1, evasion: 2 },
                ship_base_ids: [161]
            }
        ]
    },
    {
        ids: [411],
        bonuses: [
            {
                bonus: { evasion: -9 },
                ship_type_ids: [ST.DD]
            },
            {
                bonus: { evasion: -7 },
                ship_type_ids: [ST.CL, ST.CLT]
            },
            {
                bonus: { evasion: -6 },
                ship_type_ids: [ST.CT]
            },
            {
                bonus: { evasion: -5 },
                ship_type_ids: [ST.CA, ST.CAV]
            },
            {
                bonus: { fire_power: 1, anti_air: 2, evasion: 3 },
                ship_ids: [593],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 3, anti_air: 4 },
                ship_ids: [151, 411, 412, 593, 954],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 4, anti_air: 2 },
                ship_ids: [694],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2, anti_air: 2 },
                ship_ids: [541, 553, 554, 573],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, anti_air: 1 },
                ship_ids: [151, 411, 412, 541, 553, 554, 573, 593, 954],
                required_improvement: 4,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, anti_air: 1 },
                ship_ids: [151, 411, 412, 541, 553, 554, 573, 593, 954],
                required_improvement: 10,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, anti_air: 1 },
                ship_ids: [694],
                required_improvement: 5,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2, anti_air: 1 },
                ship_ids: [694],
                required_improvement: 10,
                stack_limit: 1
            }
        ]
    },
    {
        ids: [412],
        bonuses: [
            {
                bonus: { fire_power: 2, torpedo: 4, asw: 2 },
                ship_class_ids: [1, 5, 10, 12, 18, 22, 23, 28, 30, 38, 54, 66, 101],
                stack_limit: 1
            },
            {
                bonus: { evasion: 3, los: 1 },
                ship_class_ids: [1, 5, 10, 12, 18, 22, 23, 28, 30, 38, 54, 66, 101]
            },
            {
                bonus: { fire_power: 3, torpedo: 3 },
                ship_class_ids: [4, 16, 20, 21, 34, 41, 52, 56],
                stack_limit: 1
            },
            {
                bonus: { evasion: 2, los: 3 },
                ship_class_ids: [4, 16, 20, 21, 34, 41, 52, 56]
            },
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [7, 8, 9, 13, 29, 31],
                stack_limit: 1
            },
            {
                bonus: { evasion: 1, los: 1 },
                ship_class_ids: [7, 8, 9, 13, 29, 31]
            },
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [1, 5, 10, 12, 18, 22, 23, 28, 30, 38, 54, 66, 101, 4, 16, 20, 21, 34, 41, 52, 56],
                stack_limit: 1,
                required_improvement: 4
            },
            {
                bonus: { torpedo: 1 },
                ship_class_ids: [1, 5, 10, 12, 18, 22, 23, 28, 30, 38, 54, 66, 101, 4, 16, 20, 21, 34, 41, 52, 56],
                stack_limit: 1,
                required_improvement: 8
            }
        ]
    },
    {
        ids: [413],
        bonuses: [
            {
                bonus: { fire_power: 2, torpedo: 2, evasion: 4 },
                ship_class_ids: [1, 5, 10, 12, 18, 22, 23, 28, 30, 38, 54, 66, 101],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 4, torpedo: 2, evasion: 2 },
                ship_class_ids: [4, 16, 20, 21, 34, 41, 52, 56],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2, torpedo: 3, evasion: 3 },
                ship_class_ids: [38, 54],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, torpedo: 2, evasion: 2 },
                ship_class_ids: [4, 16, 20, 41, 52],
                stack_limit: 1
            },
            {
                bonus: { torpedo: 1, anti_air: 2, evasion: 1 },
                ship_class_ids: [21, 34],
                stack_limit: 1
            },
            {
                bonus: { anti_air: 1, evasion: 1 },
                ship_base_ids: [23, 41, 50, 56, 138, 139, 410, 484],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, torpedo: 1 },
                ship_base_ids: [54, 55, 135, 422],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, evasion: 1 },
                ship_ids: [543],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2 },
                ship_ids: [159],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [414, 539],
        bonuses: [
            {
                bonus: { los: 1 },
                ship_country_ids: [Country.USA],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, los: 1 },
                ship_country_ids: [Country.USA],
                ship_type_ids: [ST.CL, ST.CA],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [414],
        bonuses: [
            {
                bonus: { evasion: 1 },
                ship_country_ids: [Country.USA],
                stack_limit: 1,
                required_improvement: 5
            },
            {
                bonus: { los: 1 },
                ship_country_ids: [Country.USA],
                ship_type_ids: [ST.CL, ST.CA],
                stack_limit: 1,
                required_improvement: 3
            },
            {
                bonus: { evasion: 1 },
                ship_country_ids: [Country.USA],
                ship_type_ids: [ST.CL, ST.CA],
                stack_limit: 1,
                required_improvement: 8
            },
            {
                bonus: { fire_power: 1 },
                ship_country_ids: [Country.USA],
                ship_type_ids: [ST.CL, ST.CA],
                stack_limit: 1,
                required_improvement: 10
            }
        ]
    },
    {
        ids: [539],
        bonuses: [
            {
                bonus: { shell_accuracy: 1 },
                ship_class_ids: [110],
                stack_limit: 1
            },
            {
                bonus: { evasion: 1 },
                ship_country_ids: [Country.USA],
                stack_limit: 1,
                required_improvement: 3
            },
            {
                bonus: { los: 1 },
                ship_country_ids: [Country.USA],
                stack_limit: 1,
                required_improvement: 5
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_country_ids: [Country.USA],
                stack_limit: 1,
                required_improvement: 7
            },
            {
                bonus: { anti_air: 1 },
                ship_country_ids: [Country.USA],
                ship_type_ids: [ST.CL, ST.CA],
                stack_limit: 1,
                required_improvement: 6
            },
            {
                bonus: { evasion: 1 },
                ship_country_ids: [Country.USA],
                ship_type_ids: [ST.CL, ST.CA],
                stack_limit: 1,
                required_improvement: 8
            },
            {
                bonus: { fire_power: 1 },
                ship_country_ids: [Country.USA],
                ship_type_ids: [ST.CL, ST.CA],
                stack_limit: 1,
                required_improvement: 9
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_country_ids: [Country.USA],
                ship_type_ids: [ST.CL, ST.CA],
                stack_limit: 1,
                required_improvement: 10
            }
        ]
    },
    {
        ids: [415],
        bonuses: [
            {
                bonus: { asw: 1, los: 1 },
                ship_country_ids: [Country.USA],
                stack_limit: 1
            },
            {
                bonus: { evasion: 1 },
                ship_country_ids: [Country.USA],
                stack_limit: 1,
                required_improvement: 5
            },
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [95, 99, 106, 110, 121],
                stack_limit: 1
            },
            {
                bonus: { evasion: 1 },
                ship_class_ids: [95, 99, 106, 110, 121],
                stack_limit: 1,
                required_improvement: 3
            },
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [95, 99, 106, 110, 121],
                stack_limit: 1,
                required_improvement: 8
            }
        ]
    },
    {
        ids: [195],
        bonuses: [
            {
                bonus: { fire_power: 1 },
                ship_country_ids: [Country.USA]
            }
        ]
    },
    {
        ids: [419],
        bonuses: [
            {
                bonus: { fire_power: 2 },
                ship_country_ids: [Country.USA]
            },
            {
                bonus: { fire_power: 1 },
                ship_country_ids: [Country.USA],
                required_improvement: 2
            },
            {
                bonus: { fire_power: 1 },
                ship_country_ids: [Country.USA],
                required_improvement: 7
            }
        ]
    },
    {
        ids: [420],
        bonuses: [
            {
                bonus: { fire_power: 1 },
                ship_country_ids: [Country.USA]
            },
            {
                bonus: { fire_power: 1 },
                required_improvement: 3,
                ship_country_ids: [Country.USA]
            },
            {
                bonus: { shell_accuracy: 1 },
                required_improvement: 7,
                ship_country_ids: [Country.USA]
            },
            {
                bonus: { fire_power: 1 },
                required_improvement: 8,
                ship_country_ids: [Country.USA]
            },
            {
                bonus: { shell_accuracy: 1 },
                required_improvement: 9,
                ship_country_ids: [Country.USA]
            },
            {
                bonus: { fire_power: 1 },
                required_improvement: 10,
                ship_country_ids: [Country.USA]
            },
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [67, 78, 82, 88, 108, 112]
            },
            {
                bonus: { fire_power: 1 },
                required_improvement: 3,
                ship_class_ids: [67, 78, 82, 88, 108, 112]
            },
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [84]
            },
            {
                bonus: { fire_power: -1 },
                ship_class_ids: [78]
            },
            {
                bonus: { fire_power: -2, evasion: -1, armor: -2 },
                ship_type_ids: [ST.CVL]
            }
        ]
    },
    {
        ids: [421],
        bonuses: [
            {
                bonus: { fire_power: 2 },
                ship_country_ids: [Country.USA]
            },
            {
                bonus: { fire_power: 1 },
                required_improvement: 5,
                ship_country_ids: [Country.USA]
            },
            {
                bonus: { shell_accuracy: 1 },
                required_improvement: 6,
                ship_country_ids: [Country.USA]
            },
            {
                bonus: { fire_power: 1 },
                required_improvement: 7,
                ship_country_ids: [Country.USA]
            },
            {
                bonus: { shell_accuracy: 1 },
                required_improvement: 8,
                ship_country_ids: [Country.USA]
            },
            {
                bonus: { fire_power: 1 },
                required_improvement: 9,
                ship_country_ids: [Country.USA]
            },
            {
                bonus: { shell_accuracy: 1 },
                required_improvement: 10,
                ship_country_ids: [Country.USA]
            },
            {
                bonus: { fire_power: 2 },
                ship_class_ids: [67, 78, 82, 88, 108, 112]
            },
            {
                bonus: { fire_power: 1 },
                required_improvement: 5,
                ship_class_ids: [67, 78, 82, 88, 108, 112]
            },
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [84]
            },
            {
                bonus: { fire_power: -1 },
                ship_class_ids: [78]
            },
            {
                bonus: { fire_power: -2, evasion: -1, armor: -2 },
                ship_type_ids: [ST.CVL]
            }
        ]
    },
    {
        ids: [277],
        bonuses: [
            {
                bonus: { fire_power: 1, evasion: 1 },
                ship_country_ids: [Country.USA]
            },
            {
                bonus: { fire_power: 1, evasion: 1 },
                ship_class_ids: [67, 78, 82, 88, 108, 112]
            },
            {
                bonus: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_class_ids: [83]
            }
        ]
    },
    {
        ids: [422],
        bonuses: [
            {
                bonus: { fire_power: 1, evasion: 1 },
                ship_country_ids: [Country.USA]
            },
            {
                bonus: { fire_power: 1, evasion: 1 },
                ship_class_ids: [67, 78, 82, 88, 108, 112]
            },
            {
                bonus: { fire_power: 1, anti_air: 1 },
                ship_class_ids: [84]
            },
            {
                bonus: { fire_power: 2, anti_air: 2, evasion: 2 },
                ship_ids: [707]
            }
        ]
    },
    {
        ids: [423],
        bonuses: [
            {
                bonus: { fire_power: 2, anti_air: 2, evasion: 2, los: 2 },
                ship_class_ids: [78, 112]
            },
            {
                bonus: { fire_power: 2, anti_air: 2, evasion: 2, los: 2 },
                ship_class_ids: [67, 78, 82, 88, 108, 112]
            },
            {
                bonus: { fire_power: 1, anti_air: 1, evasion: 1, los: 1 },
                ship_country_ids: [Country.USA]
            }
        ]
    },
    {
        ids: [424],
        bonuses: [
            {
                bonus: { fire_power: 2, torpedo: 3 },
                ship_class_ids: [67, 78, 82, 88, 108, 112]
            },
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [67, 78, 82, 88, 108, 112],
                required_improvement: 2
            },
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [67, 78, 82, 88, 108, 112],
                required_improvement: 6
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_class_ids: [67, 78, 82, 88, 108, 112],
                required_improvement: 8
            },
            {
                bonus: { shell_accuracy: 1 },
                required_improvement: 10
            }
        ]
    },
    {
        ids: [425],
        bonuses: [
            {
                bonus: { fire_power: 2, asw: 2, torpedo: 1, los: 1 },
                ship_class_ids: [67, 78, 82, 88, 108, 112]
            },
            {
                bonus: { asw: 1 },
                ship_class_ids: [67, 78, 82, 88, 108, 112],
                required_improvement: 2
            },
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [67, 78, 82, 88, 108, 112],
                required_improvement: 4
            },
            {
                bonus: { asw: 1 },
                ship_class_ids: [67, 78, 82, 88, 108, 112],
                required_improvement: 6
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_class_ids: [67, 78, 82, 88, 108, 112],
                required_improvement: 7
            },
            {
                bonus: { torpedo: 1 },
                ship_class_ids: [67, 78, 82, 88, 108, 112],
                required_improvement: 8
            },
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [67, 78, 82, 88, 108, 112],
                required_improvement: 9
            },
            {
                bonus: { asw: 1 },
                ship_class_ids: [67, 78, 82, 88, 108, 112],
                required_improvement: 10
            },
            {
                bonus: { fire_power: 1 },
                required_improvement: 7
            },
            {
                bonus: { asw: 1 },
                required_improvement: 8
            },
            {
                bonus: { shell_accuracy: 1 },
                required_improvement: 9
            },
            {
                bonus: { shell_accuracy: 1 },
                required_improvement: 10
            }
        ]
    },
    {
        ids: [430],
        bonuses: [
            {
                bonus: { anti_air: 1, evasion: 1 },
                ship_class_ids: [113]
            },
            {
                bonus: { anti_air: 2, evasion: 1 },
                ship_class_ids: [58, 61, 64, 68, 80, 92, 113, 124]
            },
            {
                bonus: { evasion: 1 },
                ship_class_ids: [58, 61, 64, 68, 80, 92, 113, 124],
                required_improvement: 2
            },
            {
                bonus: { anti_air: 1 },
                ship_class_ids: [58, 61, 64, 68, 80, 92, 113, 124],
                required_improvement: 4
            },
            {
                bonus: { evasion: 1 },
                ship_class_ids: [58, 61, 64, 68, 80, 92, 113, 124],
                required_improvement: 7
            },
            {
                bonus: { anti_air: 1 },
                ship_class_ids: [58, 61, 64, 68, 80, 92, 113, 124],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [426],
        bonuses: [
            {
                bonus: { fire_power: 3, evasion: 1 },
                ship_class_ids: [113]
            },
            {
                bonus: { fire_power: 2, evasion: 1 },
                ship_class_ids: [73]
            },
            {
                bonus: { fire_power: 1, evasion: 1 },
                ship_class_ids: [113],
                requires_synergy_equip_id: [426, 427],
                requires_synergy_equip_count: 2,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [73],
                requires_synergy_equip_id: [426, 427],
                requires_synergy_equip_count: 2,
                stack_limit: 1
            }
        ]
    },
    {
        ids: [428],
        bonuses: [
            {
                bonus: { fire_power: 3, evasion: 1 },
                ship_class_ids: [113]
            },
            {
                bonus: { fire_power: 2, evasion: 1 },
                ship_class_ids: [73]
            },
            {
                bonus: { fire_power: 1, evasion: 2 },
                ship_class_ids: [58]
            },
            {
                bonus: { fire_power: 2, evasion: 1 },
                ship_class_ids: [58, 113],
                requires_synergy_equip_id: [428, 429],
                requires_synergy_equip_count: 2,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [73],
                requires_synergy_equip_id: [428, 429],
                requires_synergy_equip_count: 2,
                stack_limit: 1
            }
        ]
    },
    {
        ids: [427, 429],
        bonuses: [
            {
                bonus: { fire_power: 2 },
                ship_class_ids: [113]
            },
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [73]
            }
        ]
    },
    {
        ids: [434, 435],
        bonuses: [
            {
                bonus: { fire_power: 1, anti_air: 1, evasion: 2 },
                ship_class_ids: [112]
            },
            {
                bonus: { fire_power: 1, anti_air: 2, evasion: 3 },
                ship_class_ids: [67, 78, 82, 88, 108, 112]
            },
            {
                bonus: { fire_power: 1, anti_air: 1, evasion: 2 },
                ship_country_ids: [Country.USA]
            }
        ]
    },
    {
        ids: [437],
        bonuses: [
            {
                bonus: { fire_power: 3, anti_air: 3, evasion: 4 },
                ship_ids: [285]
            },
            {
                bonus: { fire_power: 4, anti_air: 4, evasion: 4 },
                ship_ids: [894, 899]
            },
            {
                bonus: { fire_power: 2, anti_air: 2, evasion: 3 },
                ship_ids: [196, 197]
            },
            {
                bonus: { fire_power: 2, anti_air: 2, evasion: 2 },
                ship_ids: [508, 509, 646]
            },
            {
                bonus: { fire_power: 1, anti_air: 2, evasion: 2 },
                ship_ids: [888, 883, 553, 554]
            }
        ]
    },
    {
        ids: [271],
        bonuses: [
            {
                bonus: { fire_power: 1 },
                ship_ids: [508, 509, 888, 883],
                required_improvement: 4
            },
            {
                bonus: { anti_air: 2 },
                ship_ids: [508, 509, 888, 883],
                required_improvement: 6
            },
            {
                bonus: { evasion: 2 },
                ship_ids: [508, 509, 888, 883],
                required_improvement: 8
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [508, 509, 888, 883],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [438],
        bonuses: [
            {
                bonus: { asw: 1, evasion: 1 },
                ship_class_ids: [66, 28, 12, 1, 5, 10, 23, 18, 30, 38, 22, 54, 101],
                stack_limit: 1
            },
            {
                bonus: { asw: 1, evasion: 1 },
                ship_ids: [141, 160, 488],
                stack_limit: 1
            },
            {
                bonus: { asw: 1 },
                ship_ids: [145, 363, 476, 578, 588, 667, 961],
                required_improvement: 4,
                stack_limit: 1
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [145, 363, 476, 578, 588, 667, 961],
                required_improvement: 6,
                stack_limit: 1
            },
            {
                bonus: { asw: 1 },
                ship_ids: [145, 363, 476, 578, 588, 667, 961],
                required_improvement: 8,
                stack_limit: 1
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [145, 363, 476, 578, 588, 667, 961],
                required_improvement: 10,
                stack_limit: 1
            },
            {
                bonus: { asw: 1 },
                ship_base_ids: [16, 36, 47, 122, 167, 170, 414, 458, 459],
                stack_limit: 1
            },
            {
                bonus: { asw: 1, evasion: 1 },
                ship_base_ids: [43, 457, 471, 473, 585, 611],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [136],
        bonuses: [
            {
                bonus: { armor: 2, evasion: 1 },
                ship_class_ids: [58, 61, 64, 68, 80, 92, 113, 124],
                stack_limit: 1
            },
            {
                bonus: { armor: 1, evasion: 1 },
                ship_ids: [879],
                stack_limit: 1
            },
            {
                bonus: { armor: 1 },
                ship_class_ids: [58, 61, 64, 68, 80, 92, 113, 124],
                required_improvement: 3
            },
            {
                bonus: { armor: 1 },
                ship_class_ids: [58, 61, 64, 68, 80, 92, 113, 124],
                required_improvement: 6
            },
            {
                bonus: { armor: 1 },
                ship_class_ids: [58, 61, 64, 68, 80, 92, 113, 124],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [439],
        bonuses: [
            {
                bonus: { asw: 1, evasion: 1 },
                ship_type_ids: [ST.DE, ST.DD, ST.CL, ST.CT],
                stack_limit: 1
            },
            {
                bonus: { asw: 1 },
                ship_type_ids: [ST.DE],
                stack_limit: 1
            },
            {
                bonus: { asw: 1 },
                ship_class_ids: [101],
                stack_limit: 1
            },
            {
                bonus: { asw: 2 },
                ship_country_ids: [Country.USA, Country.UK],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [440, 441],
        bonuses: [
            {
                bonus: { torpedo: 2 },
                ship_class_ids: [114],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [442, 443],
        bonuses: [
            {
                bonus: { torpedo: 2 },
                ship_class_ids: [114],
                stack_limit: 1
            },
            {
                bonus: { torpedo: 1, evasion: 2 },
                ship_class_ids: [122],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [447],
        bonuses: [
            {
                bonus: { fire_power: 1 },
                required_improvement: 2
            },
            {
                bonus: { anti_air: 1 },
                required_improvement: 4
            },
            {
                bonus: { asw: 1 },
                required_improvement: 6
            },
            {
                bonus: { evasion: 1 },
                required_improvement: 8
            },
            {
                bonus: { asw: 1 },
                required_improvement: 10
            },
            {
                bonus: { fire_power: 1, asw: 1, evasion: 2 },
                ship_class_ids: [76]
            },
            {
                bonus: { fire_power: 1, asw: 1, evasion: 1 },
                ship_base_ids: [522]
            },
            {
                bonus: { fire_power: 1, asw: 2, evasion: 1 },
                ship_base_ids: [89, 184]
            },
            {
                bonus: { fire_power: 1, evasion: 1, asw: 1, anti_air: 1 },
                ship_ids: [894, 899]
            }
        ]
    },
    {
        ids: [84],
        bonuses: [
            {
                bonus: { anti_air: 1, evasion: 1 },
                required_improvement: 4
            },
            {
                bonus: { anti_air: 1 },
                requires_air_radar: true,
                stack_limit: 1,
                required_improvement: 4
            },
            {
                bonus: { anti_air: 1, evasion: 1 },
                ship_country_ids: [Country.Germany, Country.Italia],
                required_improvement: 4
            },
            {
                bonus: { fire_power: 1, anti_air: 1 },
                required_improvement: 7
            },
            {
                bonus: { anti_air: 1, evasion: 1 },
                required_improvement: 10
            },
            {
                bonus: { fire_power: 1 },
                ship_country_ids: [Country.Germany, Country.Italia],
                required_improvement: 10,
                stack_limit: 1
            }
        ]
    },
    {
        ids: [70],
        bonuses: [
            {
                bonus: { fire_power: 1, asw: 1 },
                ship_base_ids: [900]
            }
        ]
    },
    {
        ids: [346],
        bonuses: [
            {
                bonus: { evasion: 1, asw: 1 },
                ship_base_ids: [900],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [347],
        bonuses: [
            {
                bonus: { evasion: 2, asw: 2 },
                ship_base_ids: [900],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [451],
        bonuses: [
            {
                bonus: { fire_power: 1, asw: 2 },
                ship_base_ids: [161]
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [166],
                required_improvement: 1
            },
            {
                bonus: { asw: 1 },
                ship_ids: [166],
                required_improvement: 3
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [166],
                required_improvement: 5
            },
            {
                bonus: { asw: 1 },
                ship_ids: [166],
                required_improvement: 7
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [166],
                required_improvement: 10
            },
            {
                bonus: { fire_power: 1, asw: 3 },
                ship_base_ids: [900, 943]
            },
            {
                bonus: { fire_power: 2 },
                ship_base_ids: [900, 943],
                required_improvement: 1
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_base_ids: [900, 943],
                required_improvement: 2
            },
            {
                bonus: { asw: 1 },
                ship_base_ids: [900, 943],
                required_improvement: 3
            },
            {
                bonus: { fire_power: 1 },
                ship_base_ids: [900, 943],
                required_improvement: 4
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_base_ids: [900, 943],
                required_improvement: 6
            },
            {
                bonus: { asw: 1 },
                ship_base_ids: [900, 943],
                required_improvement: 8
            },
            {
                bonus: { fire_power: 1 },
                ship_base_ids: [900, 943],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [455],
        bonuses: [
            {
                bonus: { fire_power: 2, anti_air: 1 },
                ship_class_ids: [1, 5, 12]
            },
            {
                bonus: { fire_power: 3, torpedo: 1, evasion: 2 },
                ship_class_ids: [1, 5, 12],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { anti_air: 4 },
                ship_class_ids: [1, 5, 12],
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [12]
            },
            {
                bonus: { fire_power: 1 },
                ship_base_ids: [486]
            },
            {
                bonus: { fire_power: 1, torpedo: 1, asw: 1, evasion: 1 },
                ship_ids: [647]
            },
            {
                bonus: { fire_power: 1, asw: 1 },
                ship_ids: [666]
            },
            {
                bonus: { fire_power: 1, torpedo: 3 },
                ship_class_ids: [1, 5, 12],
                requires_synergy_equip_id: [13, 125, 285],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, torpedo: 2 },
                ship_class_ids: [1, 5, 12],
                requires_synergy_equip_id: [13, 125, 285],
                requires_synergy_equip_count: 2,
                stack_limit: 1
            },
            {
                bonus: { torpedo: 1 },
                ship_class_ids: [1, 5, 12],
                requires_synergy_equip_id: [285],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2 },
                ship_ids: [959]
            },
            {
                bonus: { fire_power: 2 },
                ship_ids: [959],
                stack_limit: 2
            },
            {
                bonus: { fire_power: 3 },
                ship_ids: [959],
                stack_limit: 3
            }
        ]
    },
    {
        ids: [456], // SG レーダー(後期型)
        bonuses: [
            {
                bonus: { fire_power: 3, evasion: 4, los: 4 },
                ship_country_ids: [Country.USA]
            },
            {
                bonus: { shell_accuracy: 3 },
                ship_country_ids: [Country.USA],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2, evasion: 2, los: 2 },
                ship_country_ids: [Country.UK, Country.Australia]
            },
            {
                bonus: { shell_accuracy: 2 },
                ship_country_ids: [Country.UK, Country.Australia],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [87, 91]
            },
            {
                bonus: { range: 1 },
                ship_class_ids: [87, 91],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2, evasion: 2, los: 3, range: 1, shell_accuracy: 2 },
                ship_ids: [651, 656],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [457, 461],
        bonuses: [
            {
                bonus: { torpedo: 3, evasion: 3 },
                ship_class_ids: [109],
                stack_limit: 1
            },
            {
                bonus: { torpedo: 2, evasion: 2 },
                ship_class_ids: [71, 103],
                stack_limit: 1
            },
            {
                bonus: { torpedo: 1, evasion: 4 },
                ship_class_ids: [44],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [461],
        bonuses: [
            {
                bonus: { torpedo: 1 },
                ship_class_ids: [109],
                required_improvement: 2
            },
            {
                bonus: { evasion: 1 },
                ship_class_ids: [71, 103, 109],
                required_improvement: 3
            },
            {
                bonus: { torpedo: 1 },
                ship_class_ids: [44, 71, 103, 109],
                required_improvement: 4
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_class_ids: [109],
                required_improvement: 5
            },
            {
                bonus: { torpedo: 1 },
                ship_class_ids: [44, 71, 103, 109],
                required_improvement: 6
            },
            {
                bonus: { torpedo: 1 },
                ship_class_ids: [44, 71, 103, 109],
                required_improvement: 8
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_class_ids: [44, 71, 103, 109],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [458],
        bonuses: [
            {
                bonus: { torpedo: 3, evasion: 6 },
                ship_class_ids: [109],
                stack_limit: 1
            },
            {
                bonus: { torpedo: 3, evasion: 4 },
                ship_class_ids: [71, 103],
                stack_limit: 1
            },
            {
                bonus: { torpedo: 3, evasion: 3 },
                ship_class_ids: [44],
                stack_limit: 1
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_class_ids: [44, 71, 103, 109],
                required_improvement: 4
            },
            {
                bonus: { evasion: 1 },
                ship_class_ids: [44, 71, 103, 109],
                required_improvement: 6
            },
            {
                bonus: { torpedo: 1 },
                ship_class_ids: [44, 71, 103, 109],
                required_improvement: 8
            },
            {
                bonus: { evasion: 1 },
                ship_type_ids: [ST.SS, ST.SSV],
                required_improvement: 3
            },
            {
                bonus: { torpedo: 1 },
                ship_type_ids: [ST.SS, ST.SSV],
                required_improvement: 5
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_type_ids: [ST.SS, ST.SSV],
                required_improvement: 10
            },
            {
                bonus: { torpedo: 7, shell_accuracy: 5 },
                ship_type_ids: [ST.SS, ST.SSV],
                required_improvement: 2,
                requires_synergy_equip_id: [461],
                requires_synergy_equip_improvement: 4,
                stack_limit: 1
            }
        ]
    },
    {
        ids: [465],
        bonuses: [
            {
                bonus: { fire_power: 2, evasion: 8, shell_accuracy: 2 },
                ship_ids: [916]
            },
            {
                bonus: { evasion: 2, shell_accuracy: 1 },
                ship_ids: [916],
                requires_synergy_equip_id: [460],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, evasion: 2, shell_accuracy: 1 },
                ship_ids: [546, 911]
            },
            {
                bonus: { evasion: 1, shell_accuracy: 1 },
                ship_ids: [546, 911],
                requires_synergy_equip_id: [460],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2, shell_accuracy: 2 },
                ship_class_ids: [37],
                requires_synergy_equip_id: [142, 460],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [464],
        bonuses: [
            {
                bonus: { anti_air: 3, evasion: 2 },
                ship_class_ids: [37]
            },
            {
                bonus: { anti_air: 2, evasion: 1, shell_accuracy: 1 },
                ship_class_ids: [37],
                requires_synergy_equip_id: [142, 460],
                stack_limit: 1
            },
            {
                bonus: { anti_air: -2, evasion: -2 },
                ship_class_ids: [6, 73, 113]
            },
            {
                bonus: { anti_air: 2, evasion: 2 },
                ship_ids: [546, 593, 911, 916, 954]
            },
            {
                bonus: { fire_power: 2, anti_air: 2, evasion: 2, shell_accuracy: 3 },
                ship_ids: [546, 593, 911, 916, 954],
                requires_synergy_equip_id: [460],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [463],
        bonuses: [
            {
                bonus: { fire_power: 1, anti_air: 2, evasion: 1, shell_accuracy: 1 },
                ship_class_ids: [37]
            },
            {
                bonus: { anti_air: 1, evasion: 1, shell_accuracy: 1 },
                ship_class_ids: [37],
                requires_synergy_equip_id: [142, 460],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, evasion: 1, shell_accuracy: 2 },
                ship_ids: [546, 911, 916]
            },
            {
                bonus: { fire_power: 1, evasion: 1, shell_accuracy: 2 },
                ship_ids: [546, 911, 916],
                requires_synergy_equip_id: [460],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [12],
        bonuses: [
            {
                bonus: { fire_power: 1, evasion: 1, shell_accuracy: 1 },
                ship_class_ids: [37]
            },
            {
                bonus: { evasion: 1, shell_accuracy: 1 },
                ship_class_ids: [37],
                requires_synergy_equip_id: [142, 460],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [234],
        bonuses: [
            {
                bonus: { fire_power: 1, anti_air: 1, evasion: 1, shell_accuracy: 1 },
                ship_class_ids: [37]
            },
            {
                bonus: { anti_air: 1, evasion: 1, shell_accuracy: 1 },
                ship_class_ids: [37],
                requires_synergy_equip_id: [142, 460],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [128, 281],
        bonuses: [
            {
                bonus: { fire_power: 1, shell_accuracy: 1 },
                ship_ids: [546, 911, 916]
            },
            {
                bonus: { evasion: 1, shell_accuracy: 1 },
                ship_ids: [546, 911, 916],
                requires_synergy_equip_id: [460],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, shell_accuracy: 2 },
                ship_class_ids: [37],
                requires_synergy_equip_id: [142, 460],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [466],
        bonuses: [
            {
                bonus: { fire_power: 1, shell_accuracy: 1 },
                ship_ids: [112, 156, 277, 278, 279, 280, 288]
            },
            {
                bonus: { fire_power: 2, evasion: 2, shell_accuracy: 1 },
                ship_ids: [461, 462, 466, 467]
            },
            {
                bonus: { fire_power: 1, evasion: 1, shell_accuracy: 2 },
                ship_ids: [196, 197, 594, 599, 610, 646, 698]
            }
        ]
    },
    {
        ids: [467],
        bonuses: [
            {
                bonus: { fire_power: 1, anti_air: 1, evasion: 2 },
                ship_country_ids: [Country.USA]
            },
            {
                bonus: { fire_power: 1, anti_air: 1, evasion: 1, shell_accuracy: 2 },
                ship_country_ids: [Country.USA],
                requires_synergy_equip_id: [279, 307, 315, 456],
                stack_limit: 1
            },
            {
                bonus: { anti_air: 2, evasion: 2 },
                ship_country_ids: [Country.USA],
                requires_synergy_equip_id: [278, 279],
                stack_limit: 1
            },
            {
                bonus: { anti_air: 2, evasion: 1 },
                ship_class_ids: [65, 93, 102, 107, 125]
            }
        ]
    },
    {
        ids: [247],
        bonuses: [
            {
                bonus: { fire_power: 2, shell_accuracy: 2 },
                ship_country_ids: [Country.France]
            },
            {
                bonus: { fire_power: 1, shell_accuracy: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 4
            },
            {
                bonus: { fire_power: 1, evasion: 1, shell_accuracy: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 8
            },
            {
                bonus: { evasion: 1, shell_accuracy: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 10
            },
            {
                bonus: { fire_power: 2, evasion: 2, shell_accuracy: 2 },
                ship_class_ids: [79],
                requires_synergy_equip_id: [245, 246, 468]
            },
            {
                bonus: { evasion: 1, shell_accuracy: 1 },
                ship_class_ids: [79],
                requires_synergy_equip_id: [468],
                requires_synergy_equip_improvement: 9
            },
            {
                bonus: { fire_power: 1, evasion: 1, shell_accuracy: 1 },
                ship_class_ids: [79],
                requires_synergy_equip_id: [468],
                requires_synergy_equip_improvement: 10
            }
        ]
    },
    {
        ids: [245, 246],
        bonuses: [
            {
                bonus: { fire_power: 2, shell_accuracy: 1 },
                ship_class_ids: [79]
            }
        ]
    },
    {
        ids: [468],
        bonuses: [
            {
                bonus: { fire_power: 3, shell_accuracy: 1 },
                ship_class_ids: [79]
            },
            {
                bonus: { fire_power: 1, shell_accuracy: 1 },
                ship_class_ids: [79],
                required_improvement: 4
            },
            {
                bonus: { fire_power: 1, shell_accuracy: 1 },
                ship_class_ids: [79],
                required_improvement: 8
            },
            {
                bonus: { anti_air: 1 },
                ship_class_ids: [79],
                required_improvement: 9
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_class_ids: [79],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [470, 529],
        bonuses: [
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [18, 23]
            },
            {
                bonus: { fire_power: 1, evasion: 1, torpedo: 3, shell_accuracy: 1 },
                ship_class_ids: [18, 23],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2 },
                ship_class_ids: [30]
            },
            {
                bonus: { fire_power: 2, evasion: 1, torpedo: 3, shell_accuracy: 3 },
                ship_class_ids: [30],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { evasion: 2 },
                ship_base_ids: [20, 43, 167]
            },
            {
                bonus: { fire_power: 3, shell_accuracy: 3, evasion: 2 },
                ship_ids: [961]
            },
            {
                bonus: { fire_power: 1, shell_accuracy: 2 },
                ship_ids: [145, 566, 567, 568, 651, 656, 670, 915, 951, 961],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2 },
                ship_ids: [145, 566, 567, 568, 651, 656, 670, 915, 951, 961],
                stack_limit: 2
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [145, 566, 567, 568, 651, 656, 670, 915, 951, 961],
                required_improvement: 5
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [145, 566, 567, 568, 651, 656, 670, 915, 951, 961],
                required_improvement: 8
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [145, 566, 567, 568, 651, 656, 670, 915, 951, 961],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [529],
        bonuses: [
            {
                bonus: { fire_power: 1, anti_air: 1, shell_accuracy: 1, evasion: 1 },
                ship_ids: [144, 145, 246, 405, 497]
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [144, 145, 246, 405, 497],
                stack_limit: 2
            },
            {
                bonus: { fire_power: 2 },
                ship_ids: [144, 145, 246, 405, 497, 323, 498, 961],
                stack_limit: 3
            },
            {
                bonus: { anti_air: 1 },
                ship_ids: [144, 145, 246, 405, 497],
                required_improvement: 8
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [144, 145, 246, 405, 497],
                required_improvement: 10
            },
            {
                bonus: { fire_power: 2, anti_air: 2, shell_accuracy: 1, evasion: 1 },
                ship_ids: [323, 498, 961]
            },
            {
                bonus: { fire_power: 2 },
                ship_ids: [323, 498, 961],
                stack_limit: 2
            },
            {
                bonus: { anti_air: 1 },
                ship_ids: [323, 498, 961],
                required_improvement: 6
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [323, 498, 961],
                required_improvement: 8
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [323, 498, 961],
                required_improvement: 10
            },
            {
                bonus: { fire_power: 3, anti_air: 3, shell_accuracy: 2, evasion: 2 },
                ship_ids: [975]
            },
            {
                bonus: { fire_power: 3 },
                ship_ids: [975],
                stack_limit: 2
            },
            {
                bonus: { fire_power: 3 },
                ship_ids: [975],
                stack_limit: 3
            },
            {
                bonus: { anti_air: 1 },
                ship_ids: [975],
                required_improvement: 4
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [975],
                required_improvement: 6
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [975],
                required_improvement: 8
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [975],
                required_improvement: 10
            },
            {
                bonus: { anti_air: 2, evasion: 2 },
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                bonus: { anti_air: 2 },
                requires_air_radar: true,
                stack_limit: 2
            },
            {
                bonus: { anti_air: 2 },
                requires_air_radar: true,
                stack_limit: 3
            }
        ]
    },
    {
        ids: [471],
        bonuses: [
            {
                bonus: { fire_power: 2, evasion: 2, shell_accuracy: 2 },
                ship_country_ids: [Country.France]
            },
            {
                bonus: { fire_power: 2, shell_accuracy: 1 },
                ship_class_ids: [79]
            },
            {
                bonus: { evasion: 1, shell_accuracy: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 6
            },
            {
                bonus: { fire_power: 1, evasion: 1, shell_accuracy: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 8
            },
            {
                bonus: { fire_power: 1, shell_accuracy: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 10
            },
            {
                bonus: { shell_accuracy: 2 },
                ship_class_ids: [79],
                requires_synergy_equip_id: [468],
                requires_synergy_equip_improvement: 9
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_class_ids: [79],
                requires_synergy_equip_id: [468],
                requires_synergy_equip_improvement: 10
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_class_ids: [79],
                required_improvement: 7,
                requires_synergy_equip_id: [468],
                requires_synergy_equip_improvement: 10
            },
            {
                bonus: { evasion: 1 },
                ship_class_ids: [79],
                required_improvement: 9,
                requires_synergy_equip_id: [468],
                requires_synergy_equip_improvement: 10
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_country_ids: [Country.France],
                requires_synergy_equip_id: [536, 537],
                requires_synergy_equip_improvement: 1
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [970],
                requires_synergy_equip_id: [536, 537],
                requires_synergy_equip_improvement: 1
            }
        ]
    },
    {
        ids: [538],
        bonuses: [
            {
                bonus: { fire_power: 3, evasion: 2, shell_accuracy: 2 },
                ship_country_ids: [Country.France]
            },
            {
                bonus: { fire_power: 2 },
                ship_class_ids: [79]
            },
            {
                bonus: { fire_power: 1, shell_accuracy: 1, evasion: 1 },
                ship_ids: [969]
            },
            {
                bonus: { fire_power: 1, shell_accuracy: 1, anti_air: 2, evasion: 2 },
                ship_class_ids: [70]
            },
            {
                bonus: { evasion: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 3
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 4
            },
            {
                bonus: { fire_power: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 5
            },
            {
                bonus: { evasion: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 6
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 7
            },
            {
                bonus: { fire_power: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 8
            },
            {
                bonus: { evasion: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 9
            },
            {
                bonus: { fire_power: 1, shell_accuracy: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 10
            },
            {
                bonus: { shell_accuracy: 2 },
                ship_class_ids: [79],
                requires_synergy_equip_id: [468],
                requires_synergy_equip_improvement: 9
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_class_ids: [79],
                requires_synergy_equip_id: [468],
                requires_synergy_equip_improvement: 10
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_class_ids: [79],
                required_improvement: 7,
                requires_synergy_equip_id: [468],
                requires_synergy_equip_improvement: 10
            },
            {
                bonus: { evasion: 1 },
                ship_class_ids: [79],
                required_improvement: 8,
                requires_synergy_equip_id: [468],
                requires_synergy_equip_improvement: 10
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_class_ids: [79],
                required_improvement: 9,
                requires_synergy_equip_id: [468],
                requires_synergy_equip_improvement: 10
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_country_ids: [Country.France],
                requires_synergy_equip_id: [536, 537],
                requires_synergy_equip_improvement: 1
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [970],
                requires_synergy_equip_id: [536, 537],
                requires_synergy_equip_improvement: 1
            },
            {
                bonus: { evasion: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 7,
                requires_synergy_equip_id: [536, 537],
                requires_synergy_equip_improvement: 1
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 9,
                requires_synergy_equip_id: [536, 537],
                requires_synergy_equip_improvement: 1
            }
        ]
    },
    {
        ids: [472],
        bonuses: [
            {
                bonus: { asw: 2 },
                ship_country_ids: [Country.USA]
            },
            {
                bonus: { asw: 1 },
                ship_country_ids: [Country.UK]
            },
            {
                bonus: { evasion: 1 },
                ship_type_ids: [ST.DE]
            },
            {
                bonus: { asw: 1, evasion: 1, shell_accuracy: 1 },
                ship_ids: [920],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [227],
        bonuses: [
            {
                bonus: { asw: 1 },
                required_improvement: 8
            },
            {
                bonus: { asw: 1 },
                required_improvement: 10
            }
        ]
    },
    {
        ids: [132],
        bonuses: [
            {
                bonus: { evasion: 1 },
                required_improvement: 3,
                stack_limit: 1
            },
            {
                bonus: { asw: 1 },
                required_improvement: 5,
                stack_limit: 1
            },
            {
                bonus: { evasion: 1 },
                required_improvement: 7,
                stack_limit: 1
            },
            {
                bonus: { asw: 1 },
                required_improvement: 8,
                stack_limit: 1
            },
            {
                bonus: { shell_accuracy: 1 },
                required_improvement: 9,
                stack_limit: 1
            },
            {
                bonus: { asw: 1 },
                required_improvement: 10,
                stack_limit: 1
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [546, 911, 916],
                stack_limit: 1
            },
            {
                bonus: { evasion: 2 },
                ship_ids: [156, 461, 462, 466, 467],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [473],
        bonuses: [
            {
                bonus: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_country_ids: [Country.USA]
            },
            {
                bonus: { fire_power: 1, evasion: 1 },
                ship_country_ids: [Country.UK]
            }
        ]
    },
    {
        ids: [474],
        bonuses: [
            {
                bonus: { fire_power: 2, anti_air: 1, evasion: 1 },
                ship_country_ids: [Country.USA]
            },
            {
                bonus: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_country_ids: [Country.UK]
            },
            {
                bonus: { fire_power: 1, anti_air: 1 },
                ship_country_ids: [Country.France]
            },
            {
                bonus: { fire_power: 1, evasion: 1 },
                ship_ids: [707, 930]
            }
        ]
    },
    {
        ids: [478],
        bonuses: [
            {
                bonus: { fire_power: 1 },
                required_improvement: 1,
                stack_limit: 1
            },
            {
                bonus: { shell_accuracy: 1 },
                required_improvement: 2,
                stack_limit: 1
            },
            {
                bonus: { evasion: 1 },
                required_improvement: 3,
                stack_limit: 1
            },
            {
                bonus: { dive_bomb: 1 },
                required_improvement: 4,
                stack_limit: 1
            },
            {
                bonus: { torpedo: 1 },
                required_improvement: 5,
                stack_limit: 1
            },
            {
                bonus: { anti_air: 1 },
                required_improvement: 6,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1 },
                required_improvement: 7,
                stack_limit: 1
            },
            {
                bonus: { shell_accuracy: 1 },
                required_improvement: 8,
                stack_limit: 1
            },
            {
                bonus: { evasion: 1 },
                required_improvement: 9,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1 },
                required_improvement: 10,
                stack_limit: 1
            }
        ]
    },
    {
        ids: [483],
        bonuses: [
            {
                bonus: { fire_power: 2, anti_air: 3, shell_accuracy: 1 },
                ship_class_ids: [6],
                stack_limit: 1
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_class_ids: [6],
                required_improvement: 6,
                stack_limit: 1
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_class_ids: [6],
                required_improvement: 10,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, anti_air: 2, evasion: 2, shell_accuracy: 1 },
                ship_class_ids: [2],
                stack_limit: 1
            },
            {
                bonus: { evasion: 1 },
                ship_class_ids: [2],
                required_improvement: 5,
                stack_limit: 1
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_class_ids: [2],
                required_improvement: 6,
                stack_limit: 1
            },
            {
                bonus: { evasion: 1 },
                ship_class_ids: [2],
                required_improvement: 10,
                stack_limit: 1
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_class_ids: [37],
                required_improvement: 6,
                stack_limit: 1
            },
            {
                bonus: { evasion: 1 },
                ship_class_ids: [37],
                required_improvement: 10,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2, anti_air: 2 },
                ship_ids: [149],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 3, anti_air: 3, evasion: 1 },
                ship_ids: [591],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, anti_air: 1 },
                ship_ids: [150],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2, anti_air: 2, evasion: 2 },
                ship_ids: [592],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, anti_air: 2, evasion: 2 },
                ship_ids: [151],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2, anti_air: 5, evasion: 3 },
                ship_ids: [593],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2, anti_air: 4, evasion: 2 },
                ship_ids: [954],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2, anti_air: 2 },
                ship_ids: [152],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 3, anti_air: 2, evasion: 1 },
                ship_ids: [694],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2, anti_air: 2, evasion: 2 },
                ship_ids: [546, 911, 916],
                stack_limit: 1
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [546, 911, 916],
                required_improvement: 5,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, anti_air: 2, evasion: 1 },
                ship_ids: [553, 554],
                stack_limit: 1
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [553, 554],
                required_improvement: 1,
                stack_limit: 1
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [553, 554],
                required_improvement: 3,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, anti_air: 2 },
                ship_ids: [541, 411, 412],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2, anti_air: 2, evasion: 1 },
                ship_ids: [573],
                stack_limit: 1
            },
            {
                bonus: { anti_air: 1 },
                ship_type_ids: [ST.FBB, ST.BB, ST.BBV],
                required_improvement: 2,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1 },
                ship_type_ids: [ST.FBB, ST.BB, ST.BBV],
                required_improvement: 4,
                stack_limit: 1
            },
            {
                bonus: { evasion: 1 },
                ship_type_ids: [ST.FBB, ST.BB, ST.BBV],
                required_improvement: 7,
                stack_limit: 1
            },
            {
                bonus: { anti_air: 1 },
                ship_type_ids: [ST.FBB, ST.BB, ST.BBV],
                required_improvement: 8,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1 },
                ship_type_ids: [ST.FBB, ST.BB, ST.BBV],
                required_improvement: 9,
                stack_limit: 1
            },
            {
                bonus: { anti_air: 1 },
                ship_type_ids: [ST.CA, ST.CAV],
                required_improvement: 2,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1 },
                ship_type_ids: [ST.CA, ST.CAV],
                required_improvement: 4,
                stack_limit: 1
            },
            {
                bonus: { evasion: 1 },
                ship_type_ids: [ST.CA, ST.CAV],
                required_improvement: 6,
                stack_limit: 1
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_type_ids: [ST.CA, ST.CAV],
                required_improvement: 8,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1 },
                ship_type_ids: [ST.CA, ST.CAV],
                required_improvement: 10,
                stack_limit: 1
            }
        ]
    },
    {
        ids: [485],
        bonuses: [
            {
                bonus: { fire_power: 1, anti_air: 3, evasion: 2 },
                ship_class_ids: [9]
            },
            {
                bonus: { anti_air: 2, evasion: 1, shell_accuracy: 1 },
                ship_ids: [501, 506]
            },
            {
                bonus: { anti_air: 1, evasion: 1, shell_accuracy: 1 },
                ship_ids: [502, 507]
            },
            {
                bonus: { fire_power: 1 },
                required_improvement: 3
            },
            {
                bonus: { anti_air: 1 },
                required_improvement: 5
            },
            {
                bonus: { evasion: 1 },
                required_improvement: 7
            },
            {
                bonus: { shell_accuracy: 1 },
                required_improvement: 10
            }
        ]
    },
    {
        ids: [275],
        bonuses: [
            {
                bonus: { fire_power: 1, anti_air: 3, evasion: 2 },
                ship_ids: [894, 899]
            },
            {
                bonus: { anti_air: 3, evasion: 3 },
                ship_ids: [894, 899],
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                bonus: { anti_air: 1, evasion: 1 },
                ship_ids: [894, 899],
                required_improvement: 7
            },
            {
                bonus: { fire_power: 1, anti_air: 1, shell_accuracy: 1 },
                ship_ids: [894, 899],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [486],
        bonuses: [
            {
                bonus: { fire_power: 4, anti_air: 4, evasion: 3, shell_accuracy: 2 },
                ship_ids: [894, 899]
            },
            {
                bonus: { fire_power: 2, anti_air: 2, evasion: 2, shell_accuracy: 1 },
                ship_ids: [883, 888]
            },
            {
                bonus: { evasion: 1, shell_accuracy: 1 },
                required_improvement: 6
            },
            {
                bonus: { anti_air: 1, evasion: 1 },
                required_improvement: 8
            },
            {
                bonus: { fire_power: 1, shell_accuracy: 1 },
                required_improvement: 10
            }
        ]
    },
    {
        ids: [487],
        bonuses: [
            {
                bonus: { fire_power: 5, anti_air: 3, evasion: 2, shell_accuracy: 4 },
                ship_ids: [894, 899]
            },
            {
                bonus: { fire_power: 3, anti_air: 1, evasion: 1, shell_accuracy: 2 },
                ship_ids: [883, 888]
            },
            {
                bonus: { fire_power: 1, evasion: 1 },
                required_improvement: 6
            },
            {
                bonus: { anti_air: 1, shell_accuracy: 1 },
                required_improvement: 8
            },
            {
                bonus: { fire_power: 1, shell_accuracy: 1 },
                required_improvement: 10
            }
        ]
    },
    {
        ids: [488],
        bonuses: [
            {
                bonus: { asw: 1, evasion: 1 },
                ship_type_ids: [ST.DD],
                ship_country_ids: [Country.Japan]
            },
            {
                bonus: { asw: 1, evasion: 1 },
                ship_class_ids: [74, 77, 85, 104, 117]
            },
            {
                bonus: { asw: 5, evasion: 4, shell_accuracy: 2 },
                ship_ids: [145, 961]
            },
            {
                bonus: { asw: 2, evasion: 1, shell_accuracy: 1 },
                ship_ids: [228, 243, 557, 558, 651, 656]
            },
            {
                bonus: { asw: 1 },
                ship_ids: [43, 235, 407, 411, 412, 419, 537, 538, 663, 668]
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [145, 961],
                required_improvement: 3
            },
            {
                bonus: { asw: 1 },
                ship_ids: [145, 961],
                required_improvement: 5
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [145, 961],
                required_improvement: 7
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [145, 961],
                required_improvement: 8
            },
            {
                bonus: { asw: 1 },
                ship_ids: [145, 961],
                required_improvement: 9
            },
            {
                bonus: { asw: 1 },
                ship_ids: [145, 961],
                required_improvement: 10
            },
            {
                bonus: { asw: 1 },
                ship_ids: [228, 243, 557, 558, 651, 656, 43, 235, 407, 411, 412, 419, 537, 538, 663, 668],
                required_improvement: 5
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [228, 243, 557, 558, 651, 656, 43, 235, 407, 411, 412, 419, 537, 538, 663, 668],
                required_improvement: 7
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [228, 243, 557, 558, 651, 656, 43, 235, 407, 411, 412, 419, 537, 538, 663, 668],
                required_improvement: 9
            },
            {
                bonus: { asw: 1 },
                ship_ids: [228, 243, 557, 558, 651, 656, 43, 235, 407, 411, 412, 419, 537, 538, 663, 668],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [489, 491],
        bonuses: [
            {
                bonus: { fire_power: 1, anti_air: 2, evasion: 1, asw: 1, shell_accuracy: 1 },
                ship_base_ids: [161, 900, 943]
            },
            {
                bonus: { fire_power: 2, anti_air: 2, evasion: 2, asw: 1, shell_accuracy: 1 },
                ship_ids: [717, 948]
            },
            {
                bonus: { evasion: 1 },
                required_improvement: 3
            },
            {
                bonus: { asw: 1 },
                required_improvement: 6
            },
            {
                bonus: { shell_accuracy: 1 },
                required_improvement: 8
            },
            {
                bonus: { fire_power: 1 },
                required_improvement: 10
            }
        ]
    },
    {
        ids: [500, 501],
        bonuses: [
            {
                bonus: { evasion: 4 },
                ship_ids: [959]
            },
            {
                bonus: { evasion: 3 },
                ship_base_ids: [14, 54, 61, 471, 473, 486, 561, 562]
            },
            {
                bonus: { evasion: 2 },
                ship_base_ids: [9, 37, 41, 49, 65, 67, 479, 484]
            }
        ]
    },
    {
        ids: [502],
        bonuses: [
            {
                bonus: { fire_power: 5, anti_air: 4, evasion: 3 },
                ship_ids: [593]
            },
            {
                bonus: { fire_power: 3, anti_air: 3, evasion: 3 },
                ship_ids: [954]
            },
            {
                bonus: { fire_power: 2, anti_air: 2, evasion: 1 },
                ship_ids: [151]
            },
            {
                bonus: { fire_power: 2, anti_air: 1, evasion: 1 },
                ship_ids: [591]
            },
            {
                bonus: { fire_power: 2, anti_air: 1 },
                ship_ids: [149]
            },
            {
                bonus: { fire_power: 1, anti_air: 1 },
                ship_ids: [592, 694]
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [150, 152]
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [593, 954],
                required_improvement: 1
            },
            {
                bonus: { anti_air: 1 },
                ship_ids: [593, 954],
                required_improvement: 3
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [593, 954],
                required_improvement: 5
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [593, 954],
                required_improvement: 7
            },
            {
                bonus: { anti_air: 1 },
                ship_ids: [593, 954],
                required_improvement: 8
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [593, 954],
                required_improvement: 9
            },
            {
                bonus: { anti_air: 1 },
                ship_ids: [593, 954],
                required_improvement: 10
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [151],
                required_improvement: 2
            },
            {
                bonus: { anti_air: 1 },
                ship_ids: [151, 591],
                required_improvement: 4
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [151, 591],
                required_improvement: 6
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [151, 591],
                required_improvement: 8
            },
            {
                bonus: { anti_air: 1 },
                ship_ids: [151, 591],
                required_improvement: 10
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [149, 150, 152, 592, 694],
                required_improvement: 5
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [149, 150, 152, 592, 694],
                required_improvement: 8
            },
            {
                bonus: { anti_air: 1 },
                ship_ids: [149, 150, 152, 592, 694],
                required_improvement: 10
            },
            {
                bonus: { fire_power: 3, evasion: 4 },
                ship_ids: [593],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2, evasion: 2 },
                ship_ids: [149, 151, 591, 954],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { anti_air: 1 },
                ship_ids: [151, 593, 954],
                requires_synergy_equip_id: [410],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [151, 593, 954],
                requires_synergy_equip_id: [410],
                requires_synergy_equip_improvement: 7,
                stack_limit: 1
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [151, 593, 954],
                requires_synergy_equip_id: [410],
                requires_synergy_equip_improvement: 10,
                stack_limit: 1
            },
            {
                bonus: { anti_air: 2 },
                ship_ids: [151, 593, 954],
                requires_synergy_equip_id: [411],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [151, 593, 954],
                requires_synergy_equip_id: [411],
                requires_synergy_equip_improvement: 2,
                stack_limit: 1
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [151, 593, 954],
                requires_synergy_equip_id: [411],
                requires_synergy_equip_improvement: 4,
                stack_limit: 1
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [151, 593, 954],
                requires_synergy_equip_id: [411],
                requires_synergy_equip_improvement: 6,
                stack_limit: 1
            },
            {
                bonus: { anti_air: 1 },
                ship_ids: [151, 593, 954],
                requires_synergy_equip_id: [411],
                requires_synergy_equip_improvement: 8,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [151, 593, 954],
                requires_synergy_equip_id: [411],
                requires_synergy_equip_improvement: 10,
                stack_limit: 1
            }
        ]
    },
    {
        ids: [503],
        bonuses: [
            {
                bonus: { fire_power: 4, anti_air: 4, shell_accuracy: 2 },
                ship_ids: [593]
            },
            {
                bonus: { fire_power: 4, anti_air: 3, shell_accuracy: 2 },
                ship_ids: [954]
            },
            {
                bonus: { fire_power: 2, anti_air: 2, shell_accuracy: 1 },
                ship_ids: [151]
            },
            {
                bonus: { fire_power: 3, anti_air: 1, shell_accuracy: 1 },
                ship_ids: [591, 592]
            },
            {
                bonus: { fire_power: 2, anti_air: 1 },
                ship_ids: [149]
            },
            {
                bonus: { fire_power: 2 },
                ship_ids: [150, 152]
            },
            {
                bonus: { fire_power: 4, anti_air: 1, shell_accuracy: 1 },
                ship_ids: [694]
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [593, 694, 954],
                required_improvement: 1
            },
            {
                bonus: { anti_air: 1 },
                ship_ids: [593, 954],
                required_improvement: 2
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [593, 954],
                required_improvement: 4
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [593, 694, 954],
                required_improvement: 6
            },
            {
                bonus: { anti_air: 1 },
                ship_ids: [593, 694, 954],
                required_improvement: 8
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [593, 694, 954],
                required_improvement: 10
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [151, 591, 592, 694],
                required_improvement: 2
            },
            {
                bonus: { anti_air: 1 },
                ship_ids: [151, 591, 592],
                required_improvement: 4
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [151, 591, 592],
                required_improvement: 6
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [151, 591, 592],
                required_improvement: 8
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [151, 591, 592],
                required_improvement: 10
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [149, 150, 152, 694],
                required_improvement: 4
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [149, 150, 152],
                required_improvement: 7
            },
            {
                bonus: { anti_air: 1 },
                ship_ids: [149, 150, 152],
                required_improvement: 10
            },
            {
                bonus: { fire_power: 3, shell_accuracy: 3, evasion: 2 },
                ship_ids: [954],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2, shell_accuracy: 2, evasion: 1 },
                ship_ids: [151, 591, 592, 593, 694],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { torpedo: 4 },
                ship_ids: [591, 592, 593, 694, 954],
                requires_synergy_equip_id: [174],
                stack_limit: 1
            },
            {
                bonus: { torpedo: 1 },
                ship_ids: [591, 592, 593, 694, 954],
                requires_synergy_equip_id: [174],
                requires_synergy_equip_improvement: 6,
                stack_limit: 1
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [591, 592, 593, 694, 954],
                requires_synergy_equip_id: [174],
                requires_synergy_equip_improvement: 8,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [591, 592, 593, 694, 954],
                requires_synergy_equip_id: [174],
                requires_synergy_equip_improvement: 10,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2, shell_accuracy: 2, evasion: 2 },
                ship_ids: [591, 592, 593, 694, 954],
                requires_high_precision_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [591],
                requires_high_precision_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2 },
                ship_ids: [954],
                requires_high_precision_radar: true,
                stack_limit: 1
            }
        ]
    },
    {
        ids: [505],
        bonuses: [
            {
                bonus: { fire_power: 1, anti_air: 2, evasion: 2 },
                ship_type_ids: [ST.DD]
            },
            {
                bonus: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_type_ids: [ST.DE]
            },
            {
                bonus: { anti_air: 1, evasion: 2 },
                ship_type_ids: [ST.CL, ST.CLT, ST.CT]
            },
            {
                bonus: { anti_air: 1, evasion: 1 },
                ship_type_ids: [ST.CA, ST.CAV, ST.AV]
            },
            {
                bonus: { fire_power: 2, anti_air: 3, evasion: 4 },
                ship_ids: [961],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, anti_air: 2, evasion: 3 },
                ship_ids: [145, 497, 656, 668, 951, 975],
                stack_limit: 1
            },
            {
                bonus: { anti_air: 2, evasion: 2 },
                ship_ids: [144, 228, 242, 243, 498, 651],
                stack_limit: 1
            },
            {
                bonus: { anti_air: 1, evasion: 2 },
                ship_ids: [244, 245, 323],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_ids: [147, 235, 407, 419, 464, 470, 557, 558, 578, 955, 960],
                stack_limit: 1
            },
            {
                bonus: { anti_air: 1, evasion: 1 },
                ship_ids: [981, 983],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, anti_air: 2, evasion: 3 },
                ship_ids: [961],
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                bonus: { anti_air: 2, evasion: 2 },
                ship_ids: [145, 419, 497, 656, 951, 975],
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                bonus: { anti_air: 1, evasion: 2 },
                ship_ids: [981, 983],
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, evasion: 1 },
                ship_ids: [656, 951, 961, 975],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { evasion: 1, anti_air: 1 },
                ship_ids: [986, 987]
            },
            {
                bonus: { fire_power: 1, evasion: 1 },
                ship_ids: [986, 987]
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [986, 987],
                required_improvement: 8
            }
        ]
    },
    {
        ids: [506],
        bonuses: [
            {
                bonus: { fire_power: 2, shell_accuracy: 3, anti_air: 2, evasion: 4 },
                ship_ids: [961],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, shell_accuracy: 2, anti_air: 1, evasion: 3 },
                ship_ids: [145, 497, 557, 558, 656, 951, 975],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, shell_accuracy: 1, anti_air: 1, evasion: 2 },
                ship_ids: [147, 235, 407, 419, 464, 470, 537, 538, 578, 955, 960],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [507, 508],
        bonuses: [
            {
                bonus: { fire_power: 1, evasion: 1, shell_accuracy: 1 },
                ship_class_ids: [125]
            },
            {
                bonus: { fire_power: 2, evasion: 1, shell_accuracy: 1 },
                ship_country_ids: [Country.USA],
                ship_type_ids: [ST.FBB, ST.BB, ST.BBV]
            },
            {
                bonus: { fire_power: 1, evasion: 1, shell_accuracy: 2 },
                ship_country_ids: [Country.USA],
                ship_type_ids: [ST.FBB, ST.BB, ST.BBV],
                requires_synergy_equip_id: [279, 307, 315, 456],
                stack_limit: 1
            },
            {
                bonus: { evasion: 1, shell_accuracy: 1 },
                ship_class_ids: [2, 6, 26],
                stack_limit: 1
            },
            {
                bonus: { evasion: 1, shell_accuracy: 1 },
                ship_country_ids: [Country.UK],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1 },
                required_improvement: 3
            },
            {
                bonus: { armor: 1 },
                required_improvement: 6
            },
            {
                bonus: { shell_accuracy: 1 },
                required_improvement: 9
            }
        ]
    },
    {
        ids: [508],
        bonuses: [
            {
                bonus: { fire_power: 1, shell_accuracy: 1 },
                ship_class_ids: [125],
                requires_synergy_equip_id: [507],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, evasion: 2, shell_accuracy: 1 },
                ship_country_ids: [Country.USA],
                ship_type_ids: [ST.FBB, ST.BB, ST.BBV],
                requires_synergy_equip_id: [507],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, evasion: 1, shell_accuracy: 1 },
                ship_class_ids: [2, 6, 26],
                requires_synergy_equip_id: [507],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, evasion: 1, shell_accuracy: 1 },
                ship_country_ids: [Country.UK],
                requires_synergy_equip_id: [507],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [510],
        bonuses: [
            {
                bonus: { fire_power: 2, asw: 3, evasion: 2, los: 2 },
                ship_country_ids: [Country.UK]
            },
            {
                bonus: { los: 3, shell_accuracy: 2 },
                ship_class_ids: [88]
            },
            {
                bonus: { fire_power: 4, evasion: 2 },
                ship_class_ids: [88],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [511, 512],
        bonuses: [
            {
                bonus: { torpedo: 3, evasion: 4 },
                ship_class_ids: [122],
                stack_limit: 1
            },
            {
                bonus: { torpedo: 1, evasion: 2 },
                ship_class_ids: [114],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [517],
        bonuses: [
            {
                bonus: { shell_accuracy: 1, evasion: 1, los: 1 },
                ship_class_ids: [1, 5, 10, 12, 18, 22, 23, 28, 30, 38, 54, 66, 101, 74, 77, 85, 104, 117],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, shell_accuracy: 1 },
                ship_class_ids: [38],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2, shell_accuracy: 1, evasion: 3, los: 2 },
                ship_ids: [960],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, shell_accuracy: 1, evasion: 2, los: 1 },
                ship_ids: [147, 235, 407, 419, 464, 470, 578, 656, 955, 961, 975],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, shell_accuracy: 1, evasion: 1 },
                ship_ids: [981, 983],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, shell_accuracy: 1 },
                requires_synergy_equip_id: [267, 366],
                requires_synergy_equip_improvement: 3,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, shell_accuracy: 1 },
                ship_class_ids: [38],
                requires_synergy_equip_id: [267, 366],
                requires_synergy_equip_improvement: 3,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, shell_accuracy: 1, anti_air: 4, evasion: 3 },
                requires_synergy_equip_id: [450],
                requires_synergy_equip_improvement: 4,
                stack_limit: 1
            },
            {
                bonus: { shell_accuracy: 1 },
                required_improvement: 7,
                stack_limit: 1
            },
            {
                bonus: { evasion: 1 },
                required_improvement: 8,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1 },
                required_improvement: 9,
                stack_limit: 1
            },
            {
                bonus: { shell_accuracy: 1 },
                required_improvement: 10,
                stack_limit: 1
            }
        ]
    },
    {
        ids: [85],
        bonuses: [
            {
                bonus: { anti_air: 1, evasion: 1 },
                required_improvement: 6
            },
            {
                bonus: { anti_air: 2 },
                required_improvement: 6,
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1 },
                required_improvement: 8
            },
            {
                bonus: { anti_air: 1, evasion: 1 },
                ship_country_ids: [Country.Germany, Country.Italia],
                required_improvement: 8
            },
            {
                bonus: { evasion: 1, shell_accuracy: 1 },
                required_improvement: 10
            },
            {
                bonus: { fire_power: 1 },
                ship_country_ids: [Country.Germany, Country.Italia],
                required_improvement: 10,
                stack_limit: 1
            }
        ]
    },
    {
        ids: [519],
        bonuses: [
            {
                bonus: { shell_accuracy: 2, evasion: 2 },
                ship_class_ids: [122],
                stack_limit: 1
            },
            {
                bonus: { torpedo: 1, shell_accuracy: 2, evasion: 2 },
                ship_class_ids: [114],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [520],
        bonuses: [
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [7, 13]
            },
            {
                bonus: { fire_power: 2, evasion: 1 },
                ship_class_ids: [8, 29]
            },
            {
                bonus: { fire_power: 3, evasion: 1, shell_accuracy: 1 },
                ship_class_ids: [9, 31]
            },
            {
                bonus: { fire_power: 2 },
                ship_class_ids: [9, 31],
                stack_limit: 2
            },
            {
                bonus: { fire_power: 2 },
                ship_class_ids: [9, 31],
                stack_limit: 3
            },
            {
                bonus: { fire_power: 2, torpedo: 2, evasion: 1, shell_accuracy: 1 },
                ship_class_ids: [7, 13],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 3, torpedo: 2, evasion: 2, shell_accuracy: 1 },
                ship_class_ids: [8, 9, 29, 31],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, anti_air: 4, evasion: 4, shell_accuracy: 1 },
                ship_class_ids: [7, 8, 9, 13, 29, 31],
                requires_synergy_equip_id: [10, 66, 71, 130, 220, 275, 464],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2 },
                ship_ids: [265, 269, 319],
                stack_limit: 2
            },
            {
                bonus: { fire_power: 2 },
                ship_ids: [265, 269, 319],
                stack_limit: 3
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [501, 502, 503, 504, 506, 507]
            },
            {
                bonus: { fire_power: 1, evasion: 1, shell_accuracy: 2 },
                ship_ids: [501, 502, 503, 504, 506, 507],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, anti_air: 3, evasion: 2, shell_accuracy: 1 },
                ship_ids: [501, 502, 503, 504, 506, 507],
                requires_synergy_equip_id: [30, 410],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2, anti_air: 3, evasion: 2, shell_accuracy: 1 },
                ship_ids: [501, 502, 503, 504, 506, 507],
                requires_synergy_equip_id: [410],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, shell_accuracy: 1 },
                ship_ids: [265, 269, 319, 502]
            },
            {
                bonus: { fire_power: 1, shell_accuracy: 2, anti_air: 1 },
                ship_ids: [507]
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [501, 502, 503, 504, 506, 507],
                required_improvement: 7
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [501, 502, 503, 504, 506, 507],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [521],
        bonuses: [
            {
                bonus: { fire_power: 1, evasion: 2, los: 2 },
                ship_class_ids: [52]
            },
            {
                bonus: { fire_power: 3, evasion: 1, los: 2 },
                ship_ids: [507]
            },
            {
                bonus: { fire_power: 1, shell_accuracy: 1, los: 2, evasion: 2 },
                ship_ids: [183]
            },
            {
                bonus: { fire_power: 2, shell_accuracy: 2, los: 3, evasion: 3 },
                ship_ids: [321]
            },
            {
                bonus: { fire_power: 3, anti_air: 1, shell_accuracy: 3, los: 2, evasion: 2 },
                ship_ids: [507]
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_class_ids: [52],
                required_improvement: 1
            },
            {
                bonus: { evasion: 1 },
                ship_class_ids: [52],
                required_improvement: 2
            },
            {
                bonus: { los: 1, torpedo: 1 },
                ship_class_ids: [52],
                required_improvement: 3
            },
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [52],
                required_improvement: 4
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_class_ids: [52],
                required_improvement: 6
            },
            {
                bonus: { los: 1 },
                ship_class_ids: [52],
                required_improvement: 8
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_class_ids: [52],
                required_improvement: 10
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [507],
                required_improvement: 1
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [507],
                required_improvement: 2
            },
            {
                bonus: { los: 1, torpedo: 1 },
                ship_ids: [507],
                required_improvement: 3
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [507],
                required_improvement: 4
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [507],
                required_improvement: 6
            },
            {
                bonus: { los: 1 },
                ship_ids: [507],
                required_improvement: 8
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [507],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [522, 523],
        bonuses: [
            {
                bonus: { torpedo: 1, evasion: 5, shell_accuracy: 1, los: 3 },
                ship_type_ids: [ST.SSV]
            },
            {
                bonus: { torpedo: 1 },
                ship_type_ids: [ST.SSV],
                required_improvement: 1
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_type_ids: [ST.SSV],
                required_improvement: 2
            },
            {
                bonus: { evasion: 1 },
                ship_type_ids: [ST.SSV],
                required_improvement: 3
            },
            {
                bonus: { los: 1 },
                ship_type_ids: [ST.SSV],
                required_improvement: 5
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_type_ids: [ST.SSV],
                required_improvement: 8
            },
            {
                bonus: { evasion: 1 },
                ship_type_ids: [ST.SSV],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [523],
        bonuses: [
            {
                bonus: { torpedo: 2, dive_bomb: 2, evasion: 1, shell_accuracy: 1, los: 1 },
                ship_type_ids: [ST.SSV]
            }
        ]
    },
    {
        ids: [524], // 12cm単装高角砲+25mm機銃増備
        bonuses: [
            {
                bonus: { fire_power: 1, anti_air: 2, evasion: 2, shell_accuracy: 1 },
                ship_type_ids: [ST.LHA, ST.AR, ST.AS, ST.CT, ST.AO]
            },
            {
                bonus: { anti_air: 2, evasion: 2 },
                ship_type_ids: [ST.LHA, ST.AR, ST.AS, ST.CT, ST.AO],
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                bonus: { evasion: 1 },
                ship_type_ids: [ST.LHA, ST.AR, ST.AS, ST.CT, ST.AO],
                required_improvement: 1
            },
            {
                bonus: { evasion: 1 },
                ship_type_ids: [ST.LHA, ST.AR, ST.AS, ST.CT, ST.AO],
                required_improvement: 2
            },
            {
                bonus: { anti_air: 1 },
                ship_type_ids: [ST.LHA, ST.AR, ST.AS, ST.CT, ST.AO],
                required_improvement: 4
            },
            {
                bonus: { evasion: 1 },
                ship_type_ids: [ST.LHA, ST.AR, ST.AS, ST.CT, ST.AO],
                required_improvement: 6
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_type_ids: [ST.LHA, ST.AR, ST.AS, ST.CT, ST.AO],
                required_improvement: 7
            },
            {
                bonus: { anti_air: 1 },
                ship_type_ids: [ST.LHA, ST.AR, ST.AS, ST.CT, ST.AO],
                required_improvement: 8
            },
            {
                bonus: { evasion: 1 },
                ship_type_ids: [ST.LHA, ST.AR, ST.AS, ST.CT, ST.AO],
                required_improvement: 9
            },
            {
                bonus: { fire_power: 1 },
                ship_type_ids: [ST.LHA, ST.AR, ST.AS, ST.CT, ST.AO],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [525, 526],
        bonuses: [
            {
                bonus: { fire_power: 1, torpedo: 2, evasion: -1 },
                ship_type_ids: [ST.SS, ST.SSV]
            },
            {
                bonus: { fire_power: 2, torpedo: 1, shell_accuracy: 2 },
                ship_base_ids: [971, 972],
                stack_limit: 1
            },
            {
                bonus: { torpedo: 1 },
                ship_type_ids: [ST.SS, ST.SSV],
                required_improvement: 1
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_type_ids: [ST.SS, ST.SSV],
                required_improvement: 3
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_type_ids: [ST.SS, ST.SSV],
                required_improvement: 6
            },
            {
                bonus: { torpedo: 1 },
                ship_type_ids: [ST.SS, ST.SSV],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [526],
        bonuses: [
            {
                bonus: { fire_power: 1, torpedo: 1, shell_accuracy: 1 },
                ship_type_ids: [ST.SS, ST.SSV]
            },
            {
                bonus: { fire_power: 1 },
                ship_type_ids: [ST.SS, ST.SSV],
                required_improvement: 2
            },
            {
                bonus: { torpedo: 1 },
                ship_type_ids: [ST.SS, ST.SSV],
                required_improvement: 4
            },
            {
                bonus: { fire_power: 1 },
                ship_type_ids: [ST.SS, ST.SSV],
                required_improvement: 8
            }
        ]
    },
    {
        ids: [527],
        bonuses: [
            {
                bonus: { anti_air: 2, shell_accuracy: 1, evasion: 1, los: 2 },
                ship_country_ids: [Country.UK],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2 },
                ship_class_ids: [88],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [67],
                stack_limit: 1
            },
            {
                bonus: { anti_air: 1 },
                ship_country_ids: [Country.UK],
                required_improvement: 2,
                stack_limit: 1
            },
            {
                bonus: { evasion: 1 },
                ship_country_ids: [Country.UK],
                required_improvement: 4,
                stack_limit: 1
            },
            {
                bonus: { anti_air: 1 },
                ship_country_ids: [Country.UK],
                required_improvement: 7,
                stack_limit: 1
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_country_ids: [Country.UK],
                required_improvement: 10,
                stack_limit: 1
            }
        ]
    },
    {
        ids: [528],
        bonuses: [
            {
                bonus: { fire_power: 1, shell_accuracy: 2, evasion: 1 },
                ship_country_ids: [Country.UK]
            },
            {
                bonus: { fire_power: 1, evasion: 1 },
                ship_class_ids: [108]
            },
            {
                bonus: { fire_power: 1 },
                ship_country_ids: [Country.UK],
                required_improvement: 2
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_country_ids: [Country.UK],
                required_improvement: 4
            },
            {
                bonus: { evasion: 1 },
                ship_country_ids: [Country.UK],
                required_improvement: 7
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_country_ids: [Country.UK],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [76, 114],
        bonuses: [
            {
                bonus: { fire_power: 1 },
                ship_country_ids: [Country.Germany]
            }
        ]
    },
    {
        ids: [114],
        bonuses: [
            {
                bonus: { fire_power: 1 },
                ship_country_ids: [Country.Germany],
                required_improvement: 7
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_country_ids: [Country.Germany],
                required_improvement: 8
            },
            {
                bonus: { armor: 1 },
                ship_country_ids: [Country.Germany],
                required_improvement: 9
            },
            {
                bonus: { fire_power: 1 },
                ship_country_ids: [Country.Germany],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [123],
        bonuses: [
            {
                bonus: { fire_power: 1 },
                ship_country_ids: [Country.Germany],
                required_improvement: 5
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_country_ids: [Country.Germany],
                required_improvement: 7
            },
            {
                bonus: { fire_power: 1 },
                ship_country_ids: [Country.Germany],
                required_improvement: 9
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_country_ids: [Country.Germany],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [124],
        bonuses: [
            {
                bonus: { evasion: 1 },
                ship_country_ids: [Country.Germany],
                requires_synergy_equip_id: [76, 114, 123]
            },
            {
                bonus: { evasion: 1 },
                ship_country_ids: [Country.Germany],
                required_improvement: 8,
                requires_synergy_equip_id: [123]
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_country_ids: [Country.Germany],
                required_improvement: 10,
                requires_synergy_equip_id: [123]
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_country_ids: [Country.Germany],
                required_improvement: 7
            },
            {
                bonus: { fire_power: 1 },
                ship_country_ids: [Country.Germany],
                required_improvement: 8
            },
            {
                bonus: { anti_air: 1 },
                ship_country_ids: [Country.Germany],
                required_improvement: 9
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_country_ids: [Country.Germany],
                required_improvement: 10
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_country_ids: [Country.Italia],
                required_improvement: 8
            },
            {
                bonus: { anti_air: 1 },
                ship_country_ids: [Country.Italia],
                required_improvement: 9
            },
            {
                bonus: { fire_power: 1 },
                ship_country_ids: [Country.Italia],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [252],
        bonuses: [
            {
                bonus: { evasion: 1 },
                ship_class_ids: [78, 112],
                required_improvement: 4
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_class_ids: [78, 112],
                required_improvement: 6
            },
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [78, 112],
                required_improvement: 7
            },
            {
                bonus: { evasion: 1 },
                ship_class_ids: [78, 112],
                required_improvement: 8
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_class_ids: [78, 112],
                required_improvement: 9
            },
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [78, 112],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [530],
        bonuses: [
            {
                bonus: { fire_power: 2 },
                ship_ids: [149, 150, 151, 152, 593]
            },
            {
                bonus: { fire_power: 3 },
                ship_ids: [591, 954]
            },
            {
                bonus: { fire_power: 4 },
                ship_ids: [592, 694]
            },
            {
                bonus: { anti_air: 1 },
                ship_ids: [149, 150, 151, 152]
            },
            {
                bonus: { anti_air: 2 },
                ship_ids: [591, 592, 694, 954]
            },
            {
                bonus: { anti_air: 3 },
                ship_ids: [593]
            },
            {
                bonus: { fire_power: 1, shell_accuracy: 2 },
                ship_ids: [592, 694]
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [592, 694],
                required_improvement: 2
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [592, 694],
                required_improvement: 4
            },
            {
                bonus: { armor: 1 },
                ship_ids: [592, 694],
                required_improvement: 6
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [592, 694],
                required_improvement: 7
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [592, 694],
                required_improvement: 8
            },
            {
                bonus: { armor: 1 },
                ship_ids: [592, 694],
                required_improvement: 9
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [592, 694],
                required_improvement: 10
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [150, 152, 591, 954]
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [150, 152, 591, 954],
                required_improvement: 2
            },
            {
                bonus: { armor: 1 },
                ship_ids: [150, 152, 591, 954],
                required_improvement: 4
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [150, 152, 591, 954],
                required_improvement: 6
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [150, 152, 591, 954],
                required_improvement: 8
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [150, 152, 591, 954],
                required_improvement: 10
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [149, 151, 593],
                required_improvement: 4
            },
            {
                bonus: { armor: 1 },
                ship_ids: [149, 151, 593],
                required_improvement: 7
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [149, 151, 593],
                required_improvement: 10
            },
            {
                bonus: { fire_power: 3, shell_accuracy: 3, evasion: 3 },
                ship_ids: [592, 694],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { shell_accuracy: 2 },
                ship_ids: [592, 694],
                stack_limit: 2
            },
            {
                bonus: { shell_accuracy: 2 },
                ship_ids: [592, 694],
                stack_limit: 3
            },
            {
                bonus: { fire_power: 3 },
                ship_ids: [694],
                stack_limit: 3
            },
            {
                bonus: { shell_accuracy: 2 },
                ship_ids: [592, 694],
                stack_limit: 4
            },
            {
                bonus: { fire_power: 2, shell_accuracy: 2, evasion: 2 },
                ship_ids: [149, 150, 151, 152, 591, 593, 954],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 4 },
                ship_ids: [694],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 3 },
                ship_ids: [152, 591, 592],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2 },
                ship_ids: [150, 954],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [149, 151, 593],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [149, 150, 151, 152, 591, 592, 593, 694, 954],
                requires_high_precision_radar: true,
                stack_limit: 1
            },
            {
                bonus: { torpedo: 6 },
                ship_ids: [591, 592, 593, 694, 954],
                requires_synergy_equip_id: [174],
                stack_limit: 1
            },
            {
                bonus: { torpedo: 1 },
                ship_ids: [591, 592, 593, 694, 954],
                requires_synergy_equip_id: [174],
                requires_synergy_equip_improvement: 6,
                stack_limit: 1
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [591, 592, 593, 694, 954],
                requires_synergy_equip_id: [174],
                requires_synergy_equip_improvement: 8,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [591, 592, 593, 694, 954],
                requires_synergy_equip_id: [174],
                requires_synergy_equip_improvement: 10,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2, torpedo: 2, shell_accuracy: 2, evasion: 3 },
                ship_ids: [591, 592, 593, 694, 954],
                requires_high_precision_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2 },
                ship_ids: [591, 592],
                requires_high_precision_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [593, 954],
                requires_high_precision_radar: true,
                stack_limit: 1
            },
            {
                bonus: { fire_power: 3 },
                ship_ids: [694],
                requires_high_precision_radar: true,
                stack_limit: 1
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [591, 592, 593, 694, 954],
                stack_limit: 2
            }
        ]
    },
    {
        ids: [130],
        bonuses: [
            {
                bonus: { anti_air: 1 },
                ship_ids: [428],
                required_improvement: 1
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [428],
                required_improvement: 3
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [428],
                required_improvement: 5
            },
            {
                bonus: { anti_air: 1 },
                ship_ids: [428],
                required_improvement: 7
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [428],
                required_improvement: 8
            },
            {
                bonus: { anti_air: 1 },
                ship_ids: [428],
                required_improvement: 9
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [428],
                required_improvement: 10
            },
            {
                bonus: { anti_air: 1 },
                ship_ids: [141],
                required_improvement: 2
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [141],
                required_improvement: 4
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [141],
                required_improvement: 6
            },
            {
                bonus: { anti_air: 1 },
                ship_ids: [141],
                required_improvement: 8
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [141],
                required_improvement: 10
            },
            {
                bonus: { anti_air: 1 },
                ship_type_ids: [ST.DE],
                required_improvement: 3
            },
            {
                bonus: { evasion: 1 },
                ship_type_ids: [ST.DE],
                required_improvement: 6
            },
            {
                bonus: { anti_air: 1 },
                ship_type_ids: [ST.DE],
                required_improvement: 9
            },
            {
                bonus: { evasion: 1 },
                ship_type_ids: [ST.DE],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [531],
        bonuses: [
            {
                bonus: { shell_accuracy: 1 },
                required_improvement: 4
            },
            {
                bonus: { fire_power: 1 },
                required_improvement: 5
            },
            {
                bonus: { evasion: 1 },
                required_improvement: 6
            },
            {
                bonus: { shell_accuracy: 1 },
                required_improvement: 7
            },
            {
                bonus: { fire_power: 1 },
                required_improvement: 8
            },
            {
                bonus: { evasion: 1 },
                required_improvement: 9
            },
            {
                bonus: { shell_accuracy: 1 },
                required_improvement: 10
            }
        ]
    },
    {
        ids: [533],
        bonuses: [
            {
                bonus: { anti_air: 1 },
                ship_class_ids: [54],
                required_improvement: 2
            },
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [54],
                required_improvement: 4
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_class_ids: [54],
                required_improvement: 6
            },
            {
                bonus: { anti_air: 1 },
                ship_class_ids: [54],
                required_improvement: 8
            },
            {
                bonus: { evasion: 1 },
                ship_class_ids: [54],
                required_improvement: 10
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [968],
                required_improvement: 1
            },
            {
                bonus: { anti_air: 1 },
                ship_ids: [968],
                required_improvement: 3
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [968],
                required_improvement: 5
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [968],
                required_improvement: 7
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [968],
                required_improvement: 9
            },
            {
                bonus: { anti_air: 1 },
                ship_ids: [981, 983],
                required_improvement: 4
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [981, 983],
                required_improvement: 6
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [981, 983],
                required_improvement: 8
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [981, 983],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [534, 535],
        bonuses: [
            {
                bonus: { fire_power: 2, shell_accuracy: 1 },
                ship_country_ids: [Country.France]
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_class_ids: [129]
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [967],
                requires_synergy_equip_id: [535]
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 2
            },
            {
                bonus: { fire_power: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 4
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 6
            },
            {
                bonus: { fire_power: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 8
            },
            {
                bonus: { fire_power: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [535],
        bonuses: [
            {
                bonus: { fire_power: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 7
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 9
            }
        ]
    },
    {
        ids: [536, 537],
        bonuses: [
            {
                bonus: { fire_power: 2, shell_accuracy: 1 },
                ship_country_ids: [Country.France]
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_class_ids: [128]
            },
            {
                bonus: { fire_power: 1, evasion: 2, shell_accuracy: 1 },
                ship_ids: [970],
                requires_synergy_equip_id: [537]
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 3
            },
            {
                bonus: { fire_power: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 4
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 6
            },
            {
                bonus: { fire_power: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 7
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 9
            },
            {
                bonus: { fire_power: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [537],
        bonuses: [
            {
                bonus: { evasion: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 5
            },
            {
                bonus: { evasion: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 8
            }
        ]
    },
    {
        ids: [540],
        bonuses: [
            {
                bonus: { evasion: 1, los: 1 },
                ship_ids: [546, 662, 663, 668, 911, 916]
            },
            {
                bonus: { shell_accuracy: 1, evasion: 1, los: 1 },
                ship_ids: [73, 121, 188, 189, 503, 504, 506]
            },
            {
                bonus: { fire_power: 1, shell_accuracy: 1, evasion: 1, los: 1 },
                ship_ids: [200, 487, 488, 501, 502, 507]
            },
            {
                bonus: { fire_power: 1, shell_accuracy: 1, anti_air: 2, evasion: 2, los: 2 },
                ship_base_ids: [102, 103, 445, 581]
            },
            {
                bonus: { fire_power: 2, shell_accuracy: 1, anti_air: 2, evasion: 2, los: 2 },
                ship_base_ids: [162, 451]
            }
        ]
    },
    {
        ids: [541, 542],
        bonuses: [
            {
                bonus: { fire_power: 3, shell_accuracy: 2, anti_air: 1, evasion: 2, los: 1 },
                ship_base_ids: [966]
            },
            {
                bonus: { fire_power: 2, shell_accuracy: 1, anti_air: 1, evasion: 1, los: 1 },
                ship_base_ids: [433]
            },
            {
                bonus: { fire_power: 1, shell_accuracy: 1, evasion: 1 },
                ship_base_ids: [603, 931]
            }
        ]
    },
    {
        ids: [541],
        bonuses: [
            {
                bonus: { evasion: 1 },
                ship_country_ids: [Country.USA],
                required_improvement: 7
            },
            {
                bonus: { fire_power: 1 },
                ship_country_ids: [Country.USA],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [542],
        bonuses: [
            {
                bonus: { shell_accuracy: 1 },
                ship_country_ids: [Country.USA],
                required_improvement: 7
            },
            {
                bonus: { fire_power: 1 },
                ship_country_ids: [Country.USA],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [543, 544],
        bonuses: [
            {
                bonus: { fire_power: 4, shell_accuracy: 2, anti_air: 1, evasion: 2, los: 2 },
                ship_base_ids: [966]
            },
            {
                bonus: { fire_power: 2, shell_accuracy: 1, anti_air: 1, evasion: 1, los: 1 },
                ship_base_ids: [433]
            },
            {
                bonus: { fire_power: 1, shell_accuracy: 1, anti_air: 1, evasion: 1 },
                ship_base_ids: [603, 931]
            },
            {
                bonus: { fire_power: 1, evasion: 1 },
                ship_base_ids: [544, 925]
            }
        ]
    },
    {
        ids: [543],
        bonuses: [
            {
                bonus: { shell_accuracy: 1 },
                ship_country_ids: [Country.USA],
                required_improvement: 7
            },
            {
                bonus: { los: 1 },
                ship_country_ids: [Country.USA],
                required_improvement: 8
            },
            {
                bonus: { fire_power: 1 },
                ship_country_ids: [Country.USA],
                required_improvement: 9
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_country_ids: [Country.USA],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [544],
        bonuses: [
            {
                bonus: { fire_power: 1 },
                ship_country_ids: [Country.USA],
                required_improvement: 7
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_country_ids: [Country.USA],
                required_improvement: 8
            },
            {
                bonus: { anti_air: 1 },
                ship_country_ids: [Country.USA],
                required_improvement: 9
            },
            {
                bonus: { fire_power: 1 },
                ship_country_ids: [Country.USA],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [545],
        bonuses: [
            {
                bonus: { fire_power: 4 },
                ship_base_ids: [110],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 3 },
                ship_base_ids: [111],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 2 },
                ship_base_ids: [83],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1 },
                ship_base_ids: [84, 153],
                stack_limit: 1
            },
            {
                bonus: { fire_power: 1, shell_accuracy: 2, evasion: 1, los: 2 },
                ship_ids: [461, 466]
            },
            {
                bonus: { fire_power: 1, shell_accuracy: 1, los: 1 },
                ship_ids: [462, 467, 646]
            },
            {
                bonus: { shell_accuracy: 1, los: 1 },
                ship_ids: [156, 599, 610]
            }
        ]
    },
    {
        ids: [549],
        bonuses: [
            {
                bonus: { fire_power: 2, shell_accuracy: 1, evasion: 1, asw: 4 },
                ship_base_ids: [161, 900, 943]
            },
            {
                bonus: { fire_power: 1, shell_accuracy: 1, asw: 1 },
                ship_class_ids: [27, 76]
            },
            {
                bonus: { fire_power: 1 },
                ship_base_ids: [161, 900, 943],
                required_improvement: 3
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_base_ids: [161, 900, 943],
                required_improvement: 4
            },
            {
                bonus: { asw: 1 },
                ship_base_ids: [161, 900, 943],
                required_improvement: 5
            },
            {
                bonus: { evasion: 1 },
                ship_base_ids: [161, 900, 943],
                required_improvement: 6
            },
            {
                bonus: { fire_power: 1 },
                ship_base_ids: [161, 900, 943],
                required_improvement: 7
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_base_ids: [161, 900, 943],
                required_improvement: 8
            },
            {
                bonus: { asw: 1 },
                ship_base_ids: [161, 900, 943],
                required_improvement: 9
            },
            {
                bonus: { fire_power: 1 },
                ship_base_ids: [161, 900, 943],
                required_improvement: 10
            },
            {
                bonus: { asw: 1 },
                ship_class_ids: [27, 76],
                required_improvement: 4
            },
            {
                bonus: { evasion: 1 },
                ship_class_ids: [27, 76],
                required_improvement: 6
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_class_ids: [27, 76],
                required_improvement: 8
            },
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [27, 76],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [550],
        bonuses: [
            {
                bonus: { shell_accuracy: 1, evasion: 1 },
                ship_base_ids: [89, 116]
            },
            {
                bonus: { fire_power: 1 },
                ship_base_ids: [89, 116],
                required_improvement: 7
            },
            {
                bonus: { evasion: 1 },
                ship_base_ids: [89, 116],
                required_improvement: 8
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_base_ids: [89, 116],
                required_improvement: 9
            },
            {
                bonus: { fire_power: 1 },
                ship_base_ids: [89, 116],
                required_improvement: 10
            },
            {
                bonus: { fire_power: 1, evasion: 1 },
                ship_ids: [116, 117, 285, 318, 555, 560, 883, 888, 894, 899]
            }
        ]
    },
    {
        ids: [551],
        bonuses: [
            {
                bonus: { shell_accuracy: 1, evasion: 1 },
                ship_base_ids: [89, 116]
            },
            {
                bonus: { fire_power: 2, shell_accuracy: 1, evasion: 2 },
                ship_ids: [116, 117, 285, 318, 555, 560, 883, 888, 894, 899]
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [116, 117, 285, 318, 555, 560, 883, 888, 894, 899],
                required_improvement: 7
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [116, 117, 285, 318, 555, 560, 883, 888, 894, 899],
                required_improvement: 8
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [116, 117, 285, 318, 555, 560, 883, 888, 894, 899],
                required_improvement: 9
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [116, 117, 285, 318, 555, 560, 883, 888, 894, 899],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [552],
        bonuses: [
            {
                bonus: { shell_accuracy: 1, evasion: 1 },
                ship_base_ids: [89, 116]
            },
            {
                bonus: { fire_power: 1, evasion: 1 },
                ship_ids: [116, 117, 285, 318, 555, 560, 883, 888, 894, 899]
            },
            {
                bonus: { fire_power: 2, shell_accuracy: 3, evasion: 3 },
                ship_ids: [883, 899]
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [883, 899],
                required_improvement: 3
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [883, 899],
                required_improvement: 6
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [883, 899],
                required_improvement: 7
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [883, 899],
                required_improvement: 8
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [883, 899],
                required_improvement: 9
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [883, 899],
                required_improvement: 10
            },
            {
                bonus: { fire_power: 1, shell_accuracy: 2, evasion: 1 },
                ship_ids: [555, 560, 599, 610, 888]
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [555, 560, 599, 610, 888],
                required_improvement: 7
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [555, 560, 599, 610, 888],
                required_improvement: 8
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [555, 560, 599, 610, 888],
                required_improvement: 9
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [555, 560, 599, 610, 888],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [557],
        bonuses: [
            {
                bonus: { shell_accuracy: 1, evasion: 1 },
                ship_base_ids: [89, 116]
            },
            {
                bonus: { fire_power: 1, evasion: 1 },
                ship_ids: [116, 117, 285, 318, 555, 560, 883, 888, 894, 899]
            },
            {
                bonus: { fire_power: 2, shell_accuracy: 3, evasion: 3 },
                ship_ids: [883, 899]
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [883, 899],
                required_improvement: 1
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [883, 899],
                required_improvement: 2
            },
            {
                bonus: { fire_power: 1, shell_accuracy: 2, evasion: 1 },
                ship_ids: [555, 560, 599, 610, 888]
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [555, 560, 599, 610, 888],
                required_improvement: 2
            }
        ]
    },
    {
        ids: [558],
        bonuses: [
            {
                bonus: { shell_accuracy: 1, evasion: 1 },
                ship_base_ids: [89, 116]
            },
            {
                bonus: { fire_power: 1, evasion: 1 },
                ship_ids: [116, 117, 285, 318, 555, 560, 883, 888, 894, 899]
            },
            {
                bonus: { fire_power: 2, shell_accuracy: 3, evasion: 3 },
                ship_ids: [883, 899]
            },
            {
                bonus: { fire_power: 2 },
                ship_ids: [883, 899],
                required_improvement: 1
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [883, 899],
                required_improvement: 2
            },
            {
                bonus: { fire_power: 1, shell_accuracy: 2, evasion: 1 },
                ship_ids: [555, 560, 599, 610, 888]
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [555, 560, 599, 610, 888],
                required_improvement: 1
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [555, 560, 599, 610, 888],
                required_improvement: 2
            }
        ]
    },
    {
        ids: [258],
        bonuses: [
            {
                bonus: { shell_accuracy: 1, evasion: 1 },
                required_improvement: 2
            },
            {
                bonus: { fire_power: 1, shell_accuracy: 1, evasion: 1 },
                ship_ids: [156, 599, 610, 883, 899],
                required_improvement: 2
            }
        ]
    },
    {
        ids: [553],
        bonuses: [
            {
                bonus: { anti_air: 1 },
                ship_class_ids: [54],
                required_improvement: 2
            },
            {
                bonus: { fire_power: 1 },
                ship_class_ids: [54],
                required_improvement: 4
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_class_ids: [54],
                required_improvement: 6
            },
            {
                bonus: { anti_air: 1 },
                ship_class_ids: [54],
                required_improvement: 8
            },
            {
                bonus: { evasion: 1 },
                ship_class_ids: [54],
                required_improvement: 10
            },
            {
                bonus: { anti_air: 1 },
                ship_ids: [981, 983],
                required_improvement: 2
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [981, 983],
                required_improvement: 4
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_ids: [981, 983],
                required_improvement: 6
            },
            {
                bonus: { anti_air: 1 },
                ship_ids: [981, 983],
                required_improvement: 8
            },
            {
                bonus: { evasion: 1 },
                ship_ids: [981, 983],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [554],
        bonuses: [
            {
                bonus: { fire_power: 1 },
                required_improvement: 2
            },
            {
                bonus: { shell_accuracy: 1 },
                required_improvement: 4
            },
            {
                bonus: { asw: 1 },
                required_improvement: 6
            },
            {
                bonus: { fire_power: 1 },
                required_improvement: 8
            },
            {
                bonus: { shell_accuracy: 1 },
                required_improvement: 10
            },
            {
                bonus: { fire_power: 1, evasion: 1, asw: 1 },
                ship_type_ids: [ST.CVL]
            },
            {
                bonus: { fire_power: 1, shell_accuracy: 1 },
                ship_ids: [117, 285, 318, 555, 560, 883, 888, 894]
            },
            {
                bonus: { fire_power: 1 },
                ship_ids: [894]
            },
            {
                bonus: { shell_accuracy: 1, evasion: 1, asw: 1 },
                ship_class_ids: [27, 76]
            },
            {
                bonus: { fire_power: 3, shell_accuracy: 2, evasion: 1, asw: 3 },
                requires_synergy_equip_id: [402]
            }
        ]
    },
    {
        ids: [555],
        bonuses: [
            {
                bonus: { fire_power: 1 },
                required_improvement: 3
            },
            {
                bonus: { shell_accuracy: 1 },
                required_improvement: 7
            },
            {
                bonus: { evasion: 1 },
                required_improvement: 10
            },
            {
                bonus: { fire_power: 2, shell_accuracy: 1, asw: 1 },
                ship_base_ids: [1001]
            },
            {
                bonus: { fire_power: 1, shell_accuracy: 1, anti_air: 3, evasion: 2 },
                ship_base_ids: [1001],
                requires_synergy_equip_id: [556]
            },
            {
                bonus: { fire_power: 1, evasion: 2, asw: 1 },
                ship_base_ids: [1001],
                requires_synergy_equip_id: [402]
            }
        ]
    },
    {
        ids: [556],
        bonuses: [
            {
                bonus: { fire_power: 1, shell_accuracy: 1, evasion: 1, anti_air: 3 },
                ship_base_ids: [511, 1001]
            }
        ]
    },
    {
        ids: [64],
        bonuses: [
            {
                bonus: { fire_power: 1 },
                ship_country_ids: [Country.Germany],
                required_improvement: 7
            },
            {
                bonus: { shell_accuracy: 1 },
                ship_country_ids: [Country.Germany],
                required_improvement: 8
            },
            {
                bonus: { fire_power: 1, shell_accuracy: 1 },
                ship_country_ids: [Country.Germany],
                required_improvement: 9
            },
            {
                bonus: { anti_air: 1, fire_power: 1, shell_accuracy: 1 },
                ship_country_ids: [Country.Germany],
                required_improvement: 10
            },
            {
                bonus: { fire_power: 1 },
                ship_base_ids: [83, 534],
                required_improvement: 9
            },
            {
                bonus: { fire_power: 1, shell_accuracy: 1 },
                ship_base_ids: [83, 534],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [559],
        bonuses: [
            {
                bonus: { fire_power: 8, shell_accuracy: 6, anti_air: 1, evasion: 2 },
                ship_country_ids: [Country.Germany]
            },
            {
                bonus: { fire_power: 3, shell_accuracy: 2, evasion: 1 },
                ship_base_ids: [83, 534]
            }
        ]
    },
    {
        ids: [158],
        bonuses: [
            {
                bonus: { anti_air: 1 },
                ship_country_ids: [Country.Germany],
                required_improvement: 7
            },
            {
                bonus: { evasion: 1 },
                ship_country_ids: [Country.Germany],
                required_improvement: 8
            },
            {
                bonus: { shell_accuracy: 1, anti_air: 1, evasion: 1 },
                ship_country_ids: [Country.Germany],
                required_improvement: 9
            },
            {
                bonus: { fire_power: 1, shell_accuracy: 1, anti_air: 1, evasion: 2 },
                ship_country_ids: [Country.Germany],
                required_improvement: 10
            },
            {
                bonus: { anti_air: 1, evasion: 1 },
                ship_base_ids: [83, 534],
                required_improvement: 9
            },
            {
                bonus: { shell_accuracy: 1, anti_air: 1, evasion: 1 },
                ship_base_ids: [83, 534],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [560],
        bonuses: [
            {
                bonus: { fire_power: 3, shell_accuracy: 3, anti_air: 4, evasion: 5 },
                ship_country_ids: [Country.Germany]
            },
            {
                bonus: { fire_power: 1, shell_accuracy: 1, anti_air: 2, evasion: 3 },
                ship_base_ids: [83, 534]
            }
        ]
    }
];